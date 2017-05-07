"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const CharacterData = require("./CharacterData.js");
const impl = utils.implSymbol;

function Text() {

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  if (args[0] !== undefined) {
  args[0] = conversions["DOMString"](args[0]);
  } else {
    args[0] = "";
  }

  iface.setup(this, args);
}
Object.setPrototypeOf(Text.prototype, CharacterData.interface.prototype);
Object.setPrototypeOf(Text, CharacterData.interface);


Text.prototype.splitText = function splitText(offset) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'splitText' on 'Text': 1 argument required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["unsigned long"](args[0]);
  return utils.tryWrapperForImpl(this[impl].splitText(...args));
};
Object.defineProperty(Text.prototype, "wholeText", {
  get() {
    return this[impl].wholeText;
  },
  enumerable: true,
  configurable: true
});


Text.prototype[Symbol.toStringTag] = "Text";

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
    let obj = Object.create(Text.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(Text.prototype);
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
  interface: Text,
  expose: {
    Window: { Text: Text }
  }
};
module.exports = iface;

const Impl = require("../nodes/Text-impl.js");
