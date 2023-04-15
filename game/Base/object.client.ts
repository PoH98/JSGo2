import { useGameStore } from "~/store/gameStore";
export abstract class GameObjects {
  abstract prefix: string;
  set(key: any, value?: any) {
    let store = useGameStore();
    if (typeof key === "string") {
      // set a single value
      let exist = store.gameData.filter((x) => x.key === this.prefix + key);
      if (exist.length > 0) {
        exist[0].value = value;
      } else {
        store.gameData.push({
          key: this.prefix + key,
          value: value,
        });
      }
    } else if (typeof key === "object" && typeof value === "undefined") {
      // set multiple values
      for (let k in key) {
        this.set(k, key[k]);
      }
    }
  }
  get(key: String) {
    let store = useGameStore();
    return store.gameData.filter((x) => x.key === this.prefix + key)?.[0];
  }

  remove(key: String) {
    let store = useGameStore();
    store.gameData = store.gameData.filter((x) => x.key !== this.prefix + key);
  }
}
