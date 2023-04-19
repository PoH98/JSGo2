import { Tick } from "./tick.client";
import { Application } from "pixi.js";
import { Connection } from "./connection.client";
export class Game {
  tick: Tick;
  app: Application;
  parent: HTMLElement;
  connection: Connection

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.app = new Application({
      antialias: true,
      autoDensity: true,
      clearBeforeRender: true,
      width: this.parent.offsetWidth,
      height: this.parent.offsetHeight,
      resizeTo: parent,
    });
    this.tick = new Tick(this.app);
    this.connection = new Connection("/test");
  }
  connect() {
    return new Promise(async (resolve, reject) => {
      //simulate connection
      try{
        await this.connection.connect();
        resolve({
          success: true
        });
      }
      catch{
        resolve({
          success: false
        });
      }
    });
  }
  play() {
    this.tick.play();
  }
}
