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
import NebUtils from '../../../../util/NebUtils';
import { Dialog } from '@icedesign/base/index';
import QRCode from 'qrcode.react'

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;
const Toast = Feedback.toast;


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
      qrDialogShow: false,
      txHash: '',
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return;
      }

      const content = Base64.encode(values.content);
      const recvAddrs = values.recvAddrs.split('\n').join(',');
      const contract = {
        function: 'createPromise',
        args: `["${values.title}", "${values.author}", "${content}", "${recvAddrs}"]`,
      };
      Toast.success("请确认已安装Chrome扩展，或在手机端安装了手机钱包，并确认交易~");
      NebUtils.nebPayCall(contract.function, contract.args, false, txHash => {
        if (txHash) {
          this.setState({
            qrDialogShow: true,
            txHash: txHash,
          });
        }
      });
    });
  };

  onQRDialogClose = () => {
    this.setState({
      qrDialogShow: false
    });
  };

  renderQRDialog() {
    const url = `http://promise.zzkun.com/#/SingleDetail/${this.state.txHash}`;

    return (
      <Dialog
        visible={this.state.qrDialogShow}
        onOk={this.onQRDialogClose}
        closable="esc,mask,close"
        onCancel={this.onQRDialogClose}
        onClose={this.onQRDialogClose}
        title="已为您生成承诺分享二维码！"
      >
        <div style={{textAlign: 'center'}}>
          <QRCode value={url} renderAs="svg" size={196}/>
          <p>（此二维码交易成功后可用）</p>
          <p>此二维码截图保存后可以分享给朋友</p>
          <p>您还可以到“我的”页面，查看您所有创建可收到的承诺</p>
        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div className="settings-form">
        {this.renderQRDialog()}
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>创建承诺</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  承诺标题：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="title" required max={15} message="请填写1-15字承诺标题">
                    <Input size="large"/>
                  </IceFormBinder>
                  <IceFormError name="title"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  您的姓名：
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
                  承诺内容：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="content">
                    <Input size="large" multiple required placeholder="承诺内容（可添加图片链接等信息）" rows={12} message="请输入承诺内容"/>
                  </IceFormBinder>
                  <IceFormError name="content"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  承诺接收地址：
                </Col>
                <Col s="16" l="16">
                  <IceFormBinder name="recvAddrs">
                    <Input size="large" multiple required placeholder="请输入可接收到承诺内容的NAS钱包地址，支持多个，每行一个" rows={5} message="请输入接受者地址"/>
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
