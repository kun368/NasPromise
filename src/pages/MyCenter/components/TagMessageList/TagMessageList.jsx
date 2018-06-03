import React, { Component } from 'react';
import { Tab, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './TagMessageList.scss';
import { Base64 } from 'js-base64';
import NebUtils from '../../../../util/NebUtils';


const Toast = Feedback.toast;

export default class TagMessageList extends Component {
  static displayName = 'TagMessageList';

  constructor(props) {
    super(props);
    this.state = {
      dataSourceSend: [],
      dataSourceRecv: []
    };
  }

  componentDidMount() {
    if (!NebUtils.checkInstalledPlugin()) {
      Toast.error('本功能需要在电脑端安装Chrome扩展，并登陆后使用，谢谢~');
      return;
    }
    const contract = {
      function: 'queryMy',
      args: `[]`,
    };
    Toast.loading("正在获取您的承诺数据");
    NebUtils.pluginSimCall(contract.function, contract.args, item => {
      this.setState({
        dataSourceSend: item.send.arr,
        dataSourceRecv: item.recv.arr,
      });
      Toast.success("获取承诺数据成功");
    });
  }

  renderItem = (item, idx, type) => {
    const content = Base64.decode(item.content).split('\n').join("<br />");

    return (
      <div key={idx} style={styles.articleItem}>
        <ul style={styles.detailTable}>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>承诺人：</div>
            <div style={styles.detailBody}>{ item.author }</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>承诺标题：</div>
            <div style={styles.detailBody}>{ item.title }</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>承诺时间：</div>
            <div style={styles.detailBody}>{ new Date(item.createTime).toLocaleString() }</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>承诺人地址：</div>
            <div style={styles.detailBody}>{ item.sendAddr }</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>接收者地址：</div>
            <div style={styles.detailBody}>{ item.recvAddrs.join(", ") }</div>
          </li>
          <li style={styles.detailItem}>
            <div style={styles.detailTitle}>承诺内容：</div>
            <div style={styles.detailBody} dangerouslySetInnerHTML={{__html: content}}>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div className="tag-message-list">
        <IceContainer>
          <Tab size="small">
            <Tab.TabPane key={0} tab={`我发送的承诺（${this.state.dataSourceSend.length}）`}>
              {this.state.dataSourceSend.map((item, idx) => {
                return this.renderItem(item, idx, 0)
              })}
            </Tab.TabPane>
            <Tab.TabPane key={1} tab={`我收到的承诺（${this.state.dataSourceRecv.length}）`}>
              {this.state.dataSourceRecv.map((item, idx) => {
                return this.renderItem(item, idx, 1)
              })}
            </Tab.TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  allMessage: {
    marginTop: '20px',
    textAlign: 'center',
  },
  item: {
    borderBottom: '1px solid #F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  title: {
    fontSize: '14px',
    lineHeight: '14px',
    color: '#666',
  },
  date: {
    fontSize: '12px',
    color: '#666',
  },
  desc: {
    lineHeight: '14px',
    fontSize: '14px',
    color: '#999',
  },
  articleItem: {
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #f5f5f5',
  },

  detailItem: {
    padding: '8px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};
