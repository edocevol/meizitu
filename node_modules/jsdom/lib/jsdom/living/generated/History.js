"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const impl = utils.implSymbol;

function History() {
  throw new TypeError("Illegal constructor");
}


History.prototype.go = function go() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  if (args[0] !== undefined) {
  args[0] = conversions["long"](args[0]);
  } else {
    args[0] = 0;
  }
  return this[impl].go(...args);
};

History.prototype.back = function back() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this[impl].back();
};

History.prototype.forward = function forward() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this[impl].forward();
};

History.prototype.pushState = function pushState(data, title) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'pushState' on 'History': 2 arguments required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["any"](args[0]);
  args[1] = conversions["DOMString"](args[1]);
  if (args[2] === null || args[2] === undefined) {
    args[2] = null;
  } else {
  if (args[2] !== undefined) {
  args[2] = conversions["DOMString"](args[2]);
  } else {
    args[2] = undefined;
  }
  }
  return this[impl].pushState(...args);
};

History.prototype.replaceState = function replaceState(data, title) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'replaceState' on 'History': 2 arguments required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["any"](args[0]);
  args[1] = conversions["DOMString"](args[1]);
  if (args[2] === null || args[2] === undefined) {
    args[2] = null;
  } else {
  if (args[2] !== undefined) {
  args[2] = conversions["DOMString"](args[2]);
  } else {
    args[2] = undefined;
  }
  }
  return this[impl].replaceState(...args);
};
Object.defineProperty(History.prototype, "length", {
  get() {
    return this[impl].length;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(History.prototype, "state", {
  get() {
    return this[impl].state;
  },
  enumerable: true,
  configurable: true
});


History.prototype[Symbol.toStringTag] = "History";

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
    let obj = Object.create(History.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(History.prototype);
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
  interface: History,
  expose: {
    Window: { History: History }
  }
};
module.exports = iface;

const Impl = require("../window/History-impl.js");
