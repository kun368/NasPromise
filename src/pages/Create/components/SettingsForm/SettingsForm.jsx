/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';
import { Base64 } from 'js-base64';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;
const Toast = Feedback.toast;

const dappAddress = "n1vgZU7fDxQgjKkeB4W2mXd8UYRhj9jQN9a";


export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        author: '',
        content: '',
        recvAddrs: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== 'undefined';
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return;
      }
      if (!this.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
        return;
      }
      const content = Base64.encode(values.content);
      const recvAddrs = values.recvAddrs.split('\n').join(',');

      const contract = {
        function: 'createWill',
        args: `["${values.title}", "${values.author}", "${content}", "${recvAddrs}"]`,
      };
      window.postMessage({
        'target': 'contentscript',
        'data': {
          'to': dappAddress,
          'value': '0',
          'contract': {
            'function': contract.function,
            'args': contract.args,
          },
        },
        'method': 'neb_sendTransaction',
      }, '*');
      Toast.success('请确认已发起的交易！');
      window.addEventListener('message', resp => {
        console.log('response of push: ', resp);
        try {
          const dat = resp.data.data;
          if (!!dat.txhash) {
            console.log('Transaction hash:\n' + JSON.stringify(dat.txhash, null, '\t'));
            if (JSON.stringify(dat).indexOf('Error') === -1) {
              Toast.success('已提交交易，交易成功后即创建遗嘱成功！');
            }
          }
        } catch (e) {
        }
      });
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>创建遗嘱</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  遗嘱标题：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="title" required max={15} message="请填写1-15字遗嘱标题">
                    <Input size="large"/>
                  </IceFormBinder>
                  <IceFormError name="title"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  姓名：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="author" required max={10} message="请填写1-10字姓名">
                    <Input size="large"/>
                  </IceFormBinder>
                  <IceFormError name="author"/>
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  遗嘱内容：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="content">
                    <Input size="large" multiple required placeholder="遗嘱内容（可添加图片链接等信息）" rows={20} message="请输入遗嘱内容"/>
                  </IceFormBinder>
                  <IceFormError name="content"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  接受者地址：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="recvAddrs">
                    <Input size="large" multiple required placeholder="请输入可接收到遗嘱内容的NAS钱包地址，支持多个，每行一个" rows={5} message="请输入接受者地址"/>
                  </IceFormBinder>
                  <IceFormError name="recvAddrs"/>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
