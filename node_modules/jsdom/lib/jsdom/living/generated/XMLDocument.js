"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Document = require("./Document.js");
const impl = utils.implSymbol;

function XMLDocument() {
  throw new TypeError("Illegal constructor");
}
Object.setPrototypeOf(XMLDocument.prototype, Document.interface.prototype);
Object.setPrototypeOf(XMLDocument, Document.interface);


XMLDocument.prototype[Symbol.toStringTag] = "XMLDocument";

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
    let obj = Object.create(XMLDocument.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(XMLDocument.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    Document._internalSetup(obj);

  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: XMLDocument,
  expose: {
    Window: { XMLDocument: XMLDocument }
  }
};
module.exports = iface;

const Impl = require("../nodes/XMLDocument-impl.js");
