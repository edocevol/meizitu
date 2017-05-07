"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const impl = utils.implSymbol;


const IteratorPrototype = Object.create(utils.IteratorPrototype, {
  next: {
    value: function next() {
      const internal = this[utils.iterInternalSymbol];
      const target = internal.target;
      const kind = internal.kind;
      const index = internal.index;
      const values = Array.from(target[impl]);
      const len = values.length;
      if (index >= len) {
        return { value: undefined, done: true };
      }

      const pair = values[index];
      internal.index = index + 1;

      let result;
      switch (kind) {
        case "key":
          result = pair[0];
          break;
        case "value":
          result = pair[1];
          break;
        case "key+value":
          result = [pair[0], pair[1]];
          break;
      }
      return { value: result, done: false };
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  [Symbol.toStringTag]: {
    value: "FormDataIterator",
    writable: false,
    enumerable: false,
    configurable: true
  }
});

function FormData() {

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }

  iface.setup(this, args);
}


FormData.prototype.append = function append(name, value) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'append' on 'FormData': 2 arguments required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  if (args[2] !== undefined) {
  args[2] = conversions["USVString"](args[2]);
  }
  return this[impl].append(...args);
};

FormData.prototype.delete = function _(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'delete' on 'FormData': 1 argument required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return this[impl].delete(...args);
};

FormData.prototype.get = function get(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'get' on 'FormData': 1 argument required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return utils.tryWrapperForImpl(this[impl].get(...args));
};

FormData.prototype.getAll = function getAll(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'getAll' on 'FormData': 1 argument required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return utils.tryWrapperForImpl(this[impl].getAll(...args));
};

FormData.prototype.has = function has(name) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'has' on 'FormData': 1 argument required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 1; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  return this[impl].has(...args);
};

FormData.prototype.set = function set(name, value) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 2) {
    throw new TypeError("Failed to execute 'set' on 'FormData': 2 arguments required, but only " + arguments.length + " present.");
  }

  const args = [];
  for (let i = 0; i < arguments.length && i < 3; ++i) {
    args[i] = utils.tryImplForWrapper(arguments[i]);
  }
  args[0] = conversions["USVString"](args[0]);
  if (args[2] !== undefined) {
  args[2] = conversions["USVString"](args[2]);
  }
  return this[impl].set(...args);
};

FormData.prototype[Symbol.iterator] = function entries() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "key+value");
}
FormData.prototype.entries = FormData.prototype[Symbol.iterator];
FormData.prototype.keys = function keys() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "key");
}
FormData.prototype.values = function values() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return module.exports.createDefaultIterator(this, "value");
}
FormData.prototype.forEach = function forEach(callback) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to execute 'forEach' on 'FormData': 1 argument required, but only 0 present.");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Failed to execute 'forEach' on 'FormData': The callback provided as parameter 1 is not a function.");
  }
  const thisArg = arguments[1];
  let pairs = Array.from(this[impl]);
  let i = 0;
  while (i < pairs.length) {
    const [key, value] = pairs[i];
    callback.call(thisArg, value, key, this);
    pairs = Array.from(this[impl]);
    i++;
  }
};
FormData.prototype[Symbol.toStringTag] = "FormData";

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
  createDefaultIterator(target, kind) {
    const iterator = Object.create(IteratorPrototype);
    iterator[utils.iterInternalSymbol] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(FormData.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(FormData.prototype);
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
  interface: FormData,
  expose: {
    Window: { FormData: FormData },
    Worker: { FormData: FormData }
  }
};
module.exports = iface;

const Impl = require("../xhr/FormData-impl.js");
