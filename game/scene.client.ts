import { Application, Container } from "pixi.js";
export class SceneManager {
  protected currentScene: Container | null;
  protected app: Application;

  constructor(app: Application, defaultScene: Container | null = null) {
    this.app = app;
    this.currentScene = defaultScene;
  }
  //Scene switcher
  goTo(scene: Container) {
    if(this.currentScene != null){
        this.app.stage.removeChild(this.currentScene);
    }   
    this.currentScene = scene;
    this.app.stage.addChild(this.currentScene);
  }

  getScene() {
    return this.currentScene;
  }
}
