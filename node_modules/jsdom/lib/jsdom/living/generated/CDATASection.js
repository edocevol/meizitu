"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Text = require("./Text.js");
const impl = utils.implSymbol;

function CDATASection() {
  throw new TypeError("Illegal constructor");
}
Object.setPrototypeOf(CDATASection.prototype, Text.interface.prototype);
Object.setPrototypeOf(CDATASection, Text.interface);


CDATASection.prototype[Symbol.toStringTag] = "CDATASection";

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
    let obj = Object.create(CDATASection.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(CDATASection.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    Text._internalSetup(obj);

  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: CDATASection,
  expose: {
    Window: { CDATASection: CDATASection }
  }
};
module.exports = iface;

const Impl = require("../nodes/CDATASection-impl.js");
