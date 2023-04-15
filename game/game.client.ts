import { Tick } from "./tick.client";
import { Application } from "pixi.js";
export class Game {
  tick: Tick;
  app: Application;

  constructor(parent: HTMLElement) {
    this.app = new Application({
      antialias: true,
      autoDensity: true,
      clearBeforeRender: true,
      width: parent.offsetWidth,
      height: parent.offsetHeight,
      resizeTo: parent
    });
    this.tick = new Tick(this.app);
  }
  play() {
    this.tick.play();
  }
}
