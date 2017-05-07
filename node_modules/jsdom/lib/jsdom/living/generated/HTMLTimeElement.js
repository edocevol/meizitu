"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const HTMLElement = require("./HTMLElement.js");
const impl = utils.implSymbol;

function HTMLTimeElement() {
  throw new TypeError("Illegal constructor");
}
Object.setPrototypeOf(HTMLTimeElement.prototype, HTMLElement.interface.prototype);
Object.setPrototypeOf(HTMLTimeElement, HTMLElement.interface);

Object.defineProperty(HTMLTimeElement.prototype, "dateTime", {
  get() {
    const value = this.getAttribute("dateTime");
    return value === null ? "" : value;
  },
  set(V) {
    V = conversions["DOMString"](V);
    this.setAttribute("dateTime", V);
  },
  enumerable: true,
  configurable: true
});


HTMLTimeElement.prototype[Symbol.toStringTag] = "HTMLTimeElement";

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
    let obj = Object.create(HTMLTimeElement.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(HTMLTimeElement.prototype);
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
  interface: HTMLTimeElement,
  expose: {
    Window: { HTMLTimeElement: HTMLTimeElement }
  }
};
module.exports = iface;

const Impl = require("../nodes/HTMLTimeElement-impl.js");
