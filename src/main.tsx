import './style.css'
import textureAtlas from '../assets/0x72_DungeonTilesetII_v1.4_e.png'
import atlasJSON from "../assets/atlas.json"
import Phaser from 'phaser'
import ReactDOM from 'react-dom'
import Debugger from './debugger'
import React from 'react'
import { CreatureFactory, Goblin } from './creatures'
import { AnimationName, AssetKeys, AtlasKey, CreateAnimation, Creatures } from './types'


// TODO -- Delete test code
let test: Goblin;
let txt: Phaser.GameObjects.Text;

const atlasKey: AtlasKey = AssetKeys.atlas

/**
 * The top level scene for our game state. 
 * This is where we add our sprites and handle player input (for now?)
 */
class RootGame extends Phaser.Scene {
  constructor() {
    const mainSceneSettings: Phaser.Types.Scenes.SettingsConfig = {}
    super(mainSceneSettings);
  }

  /**
   * Preloads the game assets for the game.
   */
  preload() {
    this.load.atlas(atlasKey, textureAtlas, atlasJSON);
    this.textures.get(atlasKey).setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  create() {
    // Load up animation frames
    Object.entries(AssetKeys.anims).forEach(([creature, animStates]) => {
      Object.entries(animStates).forEach(([animName, frames]) => {
        const key = `${creature}_${animName}_anim`;
        this.anims.create({
          key,
          frames: frames.map((frame: string) => ({
            key: atlasKey,
            frame: frame
          })),
          frameRate: 8,
          repeat: -1
        })
      })
    })
    this.add.sprite(100, 100, atlasKey).play("goblin_idle_anim").setScale(10);
    txt = this.add.text(20, 20, "Hello World", { font: "24px Arial" });
    test = new Goblin(this.add.sprite(300, 300, atlasKey).play("goblin_run_anim").setScale(10));
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

/**
 * This is the starting point for execution. 
 * The function is responsible initializing the game state for Phaser framework and rendering the debugger through React.
 */
function mainGame() {
  const phaserSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    parent: "game",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: [RootGame],
    pixelArt: true,
    backgroundColor: "0xbbbbbb",

  };

  // Initialize Phaser
  new Phaser.Game(phaserSettings)

  // Render the debugger react component
  ReactDOM.render(<Debugger/>, document.getElementById("debugger"));
}

// run mainGame on browser load
window.onload = mainGame