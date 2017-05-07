"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const CharacterData = require("./CharacterData.js");
const impl = utils.implSymbol;

function ProcessingInstruction() {
  throw new TypeError("Illegal constructor");
}
Object.setPrototypeOf(ProcessingInstruction.prototype, CharacterData.interface.prototype);
Object.setPrototypeOf(ProcessingInstruction, CharacterData.interface);

Object.defineProperty(ProcessingInstruction.prototype, "target", {
  get() {
    return this[impl].target;
  },
  enumerable: true,
  configurable: true
});


ProcessingInstruction.prototype[Symbol.toStringTag] = "ProcessingInstruction";

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
    let obj = Object.create(ProcessingInstruction.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(ProcessingInstruction.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    CharacterData._internalSetup(obj);

  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: ProcessingInstruction,
  expose: {
    Window: { ProcessingInstruction: ProcessingInstruction }
  }
};
module.exports = iface;

const Impl = require("../nodes/ProcessingInstruction-impl.js");
