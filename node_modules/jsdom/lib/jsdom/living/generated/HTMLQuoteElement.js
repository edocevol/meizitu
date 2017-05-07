"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const HTMLElement = require("./HTMLElement.js");
const impl = utils.implSymbol;

function HTMLQuoteElement() {
  throw new TypeError("Illegal constructor");
}
Object.setPrototypeOf(HTMLQuoteElement.prototype, HTMLElement.interface.prototype);
Object.setPrototypeOf(HTMLQuoteElement, HTMLElement.interface);

Object.defineProperty(HTMLQuoteElement.prototype, "cite", {
  get() {
    const value = this.getAttribute("cite");
    return value === null ? "" : value;
  },
  set(V) {
    V = conversions["DOMString"](V);
    this.setAttribute("cite", V);
  },
  enumerable: true,
  configurable: true
});


HTMLQuoteElement.prototype[Symbol.toStringTag] = "HTMLQuoteElement";

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
    let obj = Object.create(HTMLQuoteElement.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(HTMLQuoteElement.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    HTMLElement._internalSetup(obj);

  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    this._internalSetup(obj);

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: HTMLQuoteElement,
  expose: {
    Window: { HTMLQuoteElement: HTMLQuoteElement }
  }
};
module.exports = iface;

const Impl = require("../nodes/HTMLQuoteElement-impl.js");
