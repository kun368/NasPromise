'use strict';


var Promise = function (text) {
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
Promise.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};


var NasPromise = function () {
  LocalContractStorage.defineMapProperty(this, 'sendMap');
  LocalContractStorage.defineMapProperty(this, 'recvMap');
  LocalContractStorage.defineMapProperty(this, 'hashMap', {
    parse: function (text) {
      return new Promise(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

NasPromise.prototype = {
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

  createPromise: function (title, author, content, recvAddrs) {
    var from = Blockchain.transaction.from;
    var time = Blockchain.transaction.timestamp * 1000;

    var item = new Promise();
    item.sendAddr = from;
    item.recvAddrs = recvAddrs.split(',');
    item.txHash = Blockchain.transaction.hash;
    item.title = title;
    item.author = author;
    item.createTime = time;
    item.content = content;

    this.hashMap.put(item.txHash, item);
    this._push('sendMap', item.sendAddr, item);
    for (var obj of item.recvAddrs) {
      this._push('recvMap', obj, item);
    }
    return item;
  },

  querySend: function() {
    var from = Blockchain.transaction.from;
    var send = this.sendMap.get(from);
    if (!send) {
      send = { addr: from, arr: [] };
    }
    return send;
  },

  queryRecv: function() {
    var from = Blockchain.transaction.from;
    var recv = this.recvMap.get(from);
    if (!recv) {
      recv = { addr: from, arr: [] };
    }
    return recv;
  },

  queryMy: function (from) {
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

  queryOnePromise: function (txHash) {
    var item = this.hashMap.get(txHash);
    if (!item) {
      throw new Error('not found');
    }
    return item;
  }

};
module.exports = NasPromise;
