export interface StorageItemType {
  key: string;
  value: any;
}

export class LocalStorageHelper {
  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported =
      typeof window.localStorage !== 'undefined' && window.localStorage != null;
  }

  add(key: string, item: string) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  getAllItems(): Array<StorageItemType> {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i) || '';
      const value = localStorage.getItem(key);

      list.push({
        key: key,
        value: value,
      } as StorageItemType);
    }

    return list;
  }

  getAllValues(): Array<any> {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i) || '';
      const value = localStorage.getItem(key);

      list.push(value);
    }

    return list;
  }

  get(key: string): string | null {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key) || '';
      return item;
    } else {
      return null;
    }
  }

  remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}
