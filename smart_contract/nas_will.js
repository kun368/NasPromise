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
