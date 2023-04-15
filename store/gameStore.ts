import { defineStore } from "pinia";
export const useGameStore = defineStore("gameStore", {
  state: () => {
    let gameData: any[] = [];
    return {
      gameData,
      sessionKey: "",
      loggedInUser: {},
    };
  },
  actions:{
    logout(){
      this.loggedInUser = {};
      this.sessionKey = "";
    }
  },
  persist:  true
});