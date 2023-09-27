import { FormSpecData } from "../interfaces/form-spec.interface";

interface Store {
  menu: any;
  cart: any;
  formSpec: FormSpecData | undefined;
}

const store: Store = {
  menu: null,
  cart: [],
  formSpec: undefined,
};

export const $store = new Proxy(store, {
  set(target, property, value) {
    (target as any)[property] = value;
    if (property === "menu") {
      window.dispatchEvent(new Event("appMenuChange"));
    }
    return true;
  },
});
