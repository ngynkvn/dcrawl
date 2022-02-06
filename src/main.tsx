import './style.css'
import textureAtlas from '../assets/0x72_DungeonTilesetII_v1.4_e.png'
import atlasJSON from "../assets/atlas.json"
import Phaser from 'phaser'
import ReactDOM from 'react-dom'
import Debugger from './debugger'
import React from 'react'

const mainSceneSettings: Phaser.Types.Scenes.SettingsConfig = {

}

// TODO -- Delete test code
let test: Creature;
let txt: Phaser.GameObjects.Text;

class Creature {
  sprite: Phaser.GameObjects.Sprite;
  constructor(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
  }
  update(time: number) {
      const bobble_t = Math.sin(time*6);
      this.sprite.angle = bobble_t*7;
      this.sprite.y = Math.sin(time*16)*15+200;
      this.sprite.x += 2;
      this.sprite.x %= 800;
  }
}

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
    test = new Creature(this.add.sprite(300, 300, 'tiles').play("goblin_run_anim").setScale(10));
  }

  // Time and delta in ms
  update(timeMs: number, delta: number) {
    const time = timeMs / 1000;
    const bobble_t = Math.sin(time*6);
    txt.setText(`${time}\n${delta}\n${bobble_t}`);
    test.update(time);
  }
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

window.onload = () => {
  // Initialize Phaser game
  new Phaser.Game({
    type: Phaser.WEBGL,
    parent: "game",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: [RootGame],
    pixelArt: true,
    backgroundColor: "0xbbbbbb",
  })
  console.log(1)
  // Render the debugger react component
  // TODO -- Find sensible way to link game to debugger
  ReactDOM.render(<Debugger/>, document.getElementById("debugger"));
}