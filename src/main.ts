import './style.css'
import textureAtlas from '../assets/0x72_DungeonTilesetII_v1.4.png'
import atlasJSON from "../assets/atlas.json"
import Phaser from 'phaser'

const app = document.querySelector<HTMLDivElement>('#app')!

const mainSceneSettings: Phaser.Types.Scenes.SettingsConfig = {
}

class RootGame extends Phaser.Scene {
  constructor()
  {
    super(mainSceneSettings);
  }

  preload() {
    this.load.atlas('tiles', textureAtlas, atlasJSON);
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  create() {
    this.add.sprite(10, 10, 'tiles', "goblin_idle_anim1")
    this.add.sprite(30, 30, 'tiles', "goblin_idle_anim1")
    Object.values(this.textures.list).forEach(texture => {
      console.log(texture)
    })
  }
}

const ZOOM = 4;
const GAME_WIDTH = 800 / ZOOM;
const GAME_HEIGHT = 600 / ZOOM;

window.onload = () => {
  new Phaser.Game({
    type: Phaser.WEBGL,
    parent: "app",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: [RootGame],
    pixelArt: true,
    zoom: ZOOM,
    backgroundColor: "0xbbbbbb",
  })
}