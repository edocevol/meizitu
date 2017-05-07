"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const impl = utils.implSymbol;
const convertBlobPropertyBag = require("./BlobPropertyBag").convert;

function Blob() {

  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[1] = convertBlobPropertyBag(args[1]);

  iface.setup(this, args);
}


Blob.prototype.slice = function slice() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  if (args[0] !== undefined) {
  args[0] = conversions["long long"](args[0], { clamp: true });
  }
  if (args[1] !== undefined) {
  args[1] = conversions["long long"](args[1], { clamp: true });
  }
  if (args[2] !== undefined) {
  args[2] = conversions["DOMString"](args[2]);
  }
  return utils.tryWrapperForImpl(this[impl].slice(...args));
};

Blob.prototype.close = function close() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this[impl].close();
};
Object.defineProperty(Blob.prototype, "size", {
  get() {
    return this[impl].size;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Blob.prototype, "type", {
  get() {
    return this[impl].type;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Blob.prototype, "isClosed", {
  get() {
    return this[impl].isClosed;
  },
  enumerable: true,
  configurable: true
});


Blob.prototype[Symbol.toStringTag] = "Blob";

const iface = {
  mixedInto: [],
  is(obj) {
    if (obj) {
      if (obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (obj instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      const wrapper = utils.wrapperForImpl(obj);
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (wrapper instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(Blob.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(Blob.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: Blob,
  expose: {
    Window: { Blob: Blob },
    Worker: { Blob: Blob }
  }
};
module.exports = iface;

const Impl = require("../file-api/Blob-impl.js");
