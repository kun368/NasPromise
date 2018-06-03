import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownDocs.scss';
import IceContainer from '@icedesign/container';

const initialSource = `

# 星云承诺链简介

星云承诺链是情侣、朋友、同事等之间，记录诺言、兑现诺言、增进感情的神器。 

星云承诺链用的是星云智能合约技术，一旦发出诺言，就永久记录的区块链上，就不能反悔，不能篡改，永不丢失！ 

以后再有人说下次请你吃饭 / 给你发红包 / 直播吃屎，让他把诺言纪录在这个DApp上！。 

# 我们的优势

- 诺言数据不可篡改，无法作弊
- 诺言数据永不丢失
- 支持二维码分享诺言，随时查看
- 同时支持PC端和移动端

# 操作演示示例

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/44777183.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/22360600.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/41093807.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/53660232.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/92541918.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/18077322.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/52267962.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-6-3/3631381.jpg)

`;

export default class MarkdownDocs extends Component {
  static displayName = 'MarkdownDocs';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <div>
          <ReactMarkdown className="markdown-docs-body" source={initialSource} />
        </div>
      </IceContainer>
    );
  }
}
