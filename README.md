# NasWill: 星云遗嘱托管系统


[![Build Status](https://travis-ci.org/kun368/NasWill.svg?branch=master)](https://travis-ci.org/kun368/NasWill)
[![Language](https://img.shields.io/badge/language-javascript-blue.svg)](https://github.com/kun368/NasFloater)

#### [系统地址](http://will.zzkun.com)

#### [NAS-DAPP开发者注册](https://incentive.nebulas.io/cn/signup.html?invite=OILxo)

## 简介

**NasWill是基于NAS智能合约的去中心化遗嘱平台, 致力于确保老人遗嘱的安全有效**

NasWill遗嘱系统解决了遗嘱遭遇篡改，难以确定遗嘱真实性等传统遗嘱的痛点，为老人的真实意愿提供了切实有力的帮助。

区块链遗嘱在一个可定义且固定的时间内为立遗嘱人的真实意愿提供了更好的证据。大多数与遗嘱相关的诉讼案件都涉及到遗嘱真实性这个问题，区块链可以使一份真实遗嘱的维护变得更容易，使伪造的遗嘱得到排除。

有了区块链之后，因为存款人的身份、存款时间以及“原始状态”的遗嘱都通过区块链来确认，并永久保存不可篡改。

## Snapshot

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/54776365.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/42371947.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/19085483.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/24766027.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/89133301.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-14/38236727.jpg)

## Nebulas智能合约

```javascript
'use strict';


var Will = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.sendAddr = o.sendAddr;
    this.recvAddrs = o.recvAddrs;
    this.txHash = o.txHash;
    this.title = o.title;
    this.author = o.author;
    this.createTime = o.createTime;
    this.content = o.content;
  } else {
    this.sendAddr = '';
    this.recvAddrs = [];
    this.txHash = '';
    this.title = '';
    this.author = '';
    this.createTime = '';
    this.content = '';
  }
};
Will.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};


var NasWill = function () {
  LocalContractStorage.defineMapProperty(this, 'sendMap');
  LocalContractStorage.defineMapProperty(this, 'recvMap');
};

NasWill.prototype = {
  init: function () {
  },

  _push(collectionName, key, value) {
    var item = this[collectionName].get(key);
    if (!item) {
      item = { addr: key, arr: [] };
    }
    item.arr.push(value);
    this[collectionName].put(key, item);
  },

  createWill: function (title, author, content, recvAddrs) {
    var from = Blockchain.transaction.from;
    var time = Blockchain.transaction.timestamp * 1000;

    var item = new Will();
    item.sendAddr = from;
    item.recvAddrs = recvAddrs.split(',');
    item.txHash = Blockchain.transaction.from.hash;
    item.title = title;
    item.author = author;
    item.createTime = time;
    item.content = content;

    this._push('sendMap', item.sendAddr, item);
    for (var obj of item.recvAddrs) {
      this._push('recvMap', obj, item);
    }
    return item;
  },

  queryMy: function () {
    var from = Blockchain.transaction.from;
    var send = this.sendMap.get(from);
    var recv = this.recvMap.get(from);
    if (!send) {
      send = { addr: from, arr: [] };
    }
    if (!recv) {
      recv = { addr: from, arr: [] };
    }
    return { send: send, recv: recv };
  },
};
module.exports = NasWill;
```

---

> 使用文档

使用:

* 启动调试服务: `npm start`
* 构建 dist: `npm run build`

目录结构:

* react-router @4.x 默认采用 hashHistory 的单页应用
* 入口文件: `src/index.js`
* 导航配置: `src/menuConfig.js`
* 路由配置: `src/routerConfig.js`
* 路由入口: `src/router.jsx`
* 布局文件: `src/layouts`
* 通用组件: `src/components`
* 页面文件: `src/pages`
