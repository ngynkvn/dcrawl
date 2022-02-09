import { Scene } from "phaser";
import { AnimationName, Animations, AssetKeys, Creatures, getAnim } from "./types";

export class CreatureFactory extends Phaser.GameObjects.GameObjectFactory {
    constructor(scene: Scene) {
        super(scene);
    }
    goblin() {
        this.sprite(300, 300, AssetKeys.atlas)
    }
}
/**
 * Make all properties of sprite object optional when updating.
 */
type SpriteUpdate = Partial<Phaser.GameObjects.Sprite>;

/**
 * Creatures hold a reference to a sprite and are aware of time passing within the game.
 */
abstract class Creature {

    constructor(
        public sprite: Phaser.GameObjects.Sprite,
        public creatureType?: Creatures,
    ) { }

    get animations(): Animations<Creatures> | undefined {
        return this.creatureType ? getAnim(this.creatureType) : undefined
    }

    abstract update(time: number): void

    assignSprite(other: SpriteUpdate): void {
        this.sprite = Object.assign(this.sprite, other)
    }

    positionSprite(x: number, y: number): void {
        this.assignSprite({ x, y })
    }
}


/**
 * A low level goblin that is very weak.
 */
export class Goblin extends Creature {
    creatureType: Creatures = 'goblin'
    constructor(
        sprite: Phaser.GameObjects.Sprite,
    ) {
        super(sprite)
    }
    update(time: number) {
        const bobble_t = Math.sin(time * 6);
        this.assignSprite({
            angle: bobble_t * 7,
            y: Math.sin(time * 16) * 15 + 200,
            x: (this.sprite.x + 2) % 800,
        })
    }
}

/**
 * Skeletons are low level creatures
 */
class Skeleton extends Creature {
    creatureType: Creatures = 'skeleton'
    constructor(
        sprite: Phaser.GameObjects.Sprite,
    ) {
        super(sprite)
    }
    update(time: number) {
        const bobble_t = Math.sin(time * 6);
        this.sprite.angle = bobble_t * 7;
        this.sprite.y = Math.sin(time * 16) * 15 + 200;
        this.sprite.x += 2;
        this.sprite.x %= 800;
    }
}
