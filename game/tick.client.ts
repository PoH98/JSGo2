import { Application, Ticker } from "pixi.js";
export class Tick {
  app: Application;
  tick: Ticker;
  constructor(app: Application) {
    this.app = app;
    this.tick = Ticker.shared;
    //pause the game first
    this.tick.autoStart = false;

    //minimum the game should run on 60 FPS
    this.tick.minFPS = 60;

    //ensure all ticks should stop
    this.tick.stop();
    this.tick.add(function () {
      //game rendering here
      
    });
  }
  play(){
    this.tick.start();
  }
}
