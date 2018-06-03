import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import NebUtils from '../../../../util/NebUtils';
import { Base64 } from 'js-base64';


@withRouter
export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.txHash;
    console.log(id);

    NebUtils.userCallAxios(
      "queryOnePromise",
      `["${id}"]`,
      resp => {
        console.log(resp);
        this.setState({
          dataSource: resp,
        })
      },
    );
  }


  render() {
    const item = this.state.dataSource;

    if (!item) {
      return (
        <div className="detail-table">
          <IceContainer title="承诺详情">
            <p>正在加载中，请稍等...</p>
          </IceContainer>
        </div>
      );
    }

    const content = Base64.decode(item.content).split('\n').join("<br />");
    return (
      <div className="detail-table">
        <IceContainer title="任务详情">
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
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
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
