import './style.css'
import textureAtlas from '../assets/0x72_DungeonTilesetII_v1.4_e.png'
import atlasJSON from "../assets/atlas.json"
import Phaser from 'phaser'
import ReactDOM from 'react-dom'
import Debugger from './debugger'
import React from 'react'

const mainSceneSettings: Phaser.Types.Scenes.SettingsConfig = {

}

let test: Phaser.GameObjects.Sprite;
let txt;
let debugInput = {
  bobble: 70 
};

class RootGame extends Phaser.Scene {
  constructor() {
    super(mainSceneSettings);
  }

  preload() {
    this.load.atlas('tiles', textureAtlas, atlasJSON);
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  create() {
    this.anims.create({ key: 'goblin_idle_anim', frames: this.anims.generateFrameNames('tiles', { prefix: 'goblin_idle_anim', start: 0, end: 3 }), frameRate: 8, repeat: -1 });
    this.anims.create({ key: 'goblin_run_anim', frames: this.anims.generateFrameNames('tiles', { prefix: 'goblin_run_anim', start: 0, end: 3 }), frameRate: 8, repeat: -1 });
    this.add.sprite(100, 100, 'tiles').play("goblin_idle_anim").setScale(10);
    txt = this.add.text(20, 20, "Hello World", { font: "24px Arial" });
    test = this.add.sprite(300, 300, 'tiles').play("goblin_run_anim").setScale(10);
  }

  // Time and delta in ms
  update(timeMs: number, delta: number) {
    let time = timeMs / 1000;
    let bobble_t = Math.sin(time*6);
    txt.setText(`${time}\n${delta}\n${bobble_t}`);
    test.angle = bobble_t*8;
    test.y = Math.sin(time*16)*15+200;
    test.x += 2;
    test.x %= 800;
  }
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

window.onload = () => {
  new Phaser.Game({
    type: Phaser.WEBGL,
    parent: "app",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: [RootGame],
    pixelArt: true,
    backgroundColor: "0xbbbbbb",
  })
  console.log(1)
  ReactDOM.render(<Debugger/>, document.getElementById("debugger"));
}