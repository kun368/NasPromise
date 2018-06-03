import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const data = [
  {
    title: '公开透明',
    description:
      '分布式、公开透明、无法作弊',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1RBTKi4rI8KJjy0FpXXb5hVXa-456-456.png',
  },
  {
    title: '安全第一',
    description:
      '不可篡改、信息安全',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1LN_Ai9_I8KJjy0FoXXaFnVXa-450-453.png',
  },
  {
    title: '移动兼容',
    description:
      '同时支持PC电脑端和移动端',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1K3JmgOqAXuNjy1XdXXaYcVXa-450-450.png',
  },
  {
    title: '符合需求',
    description:
      '更人性化、更高效化、更具适应性',
    imgUrl:
      'https://img.alicdn.com/tfs/TB124gfiY_I8KJjy1XaXXbsxpXa-450-453.png',
  },
  {
    title: '维护权益',
    description:
      '防止伪造 防止篡改',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1s4T4i2DH8KJjy1XcXXcpdXXa-450-450.png',
  },
  {
    title: '全新设计',
    description:
      '智能合约，解决痛点',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1oEe3i8fH8KJjy1XbXXbLdXXa-453-453.png',
  },
];

export default class FeatureDisplay extends Component {
  static displayName = 'FeatureDisplay';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="feature-display" style={styles.container}>
        <div style={styles.items}>
          <Row gutter="20" wrap>
            {data.map((item, index) => {
              return (
                <Col key={index} xxs="24" s="12" l="8">
                  <div style={styles.item}>
                    <img src={item.imgUrl} style={styles.image} alt="" />
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.description}>{item.description}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '0 80px',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    textAlign: 'center',
    padding: '0 30px',
    margin: '40px 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
  description: {
    fontSize: '13px',
    lineHeight: '22px',
    color: '#999',
  },
};
