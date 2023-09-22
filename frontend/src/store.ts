const store = {
  menu: null,
  cart: [],
};

const $storeProxy = new Proxy(store, {
  set(target, property, value) {
    (target as any)[property] = value;
    if (property === "menu") {
      window.dispatchEvent(new Event("appMenuChange"));
    }
    return true;
  },
});

export default $storeProxy;
