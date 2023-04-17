import { Tick } from "./tick.client";
import { Application } from "pixi.js";
export class Game {
  tick: Tick;
  app: Application;
  parent: HTMLElement;

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
  }
  connect() {
    return new Promise((resolve, reject) => {
      //simulate connection
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 500000);
    });
  }
  play() {
    this.tick.play();
  }
}
