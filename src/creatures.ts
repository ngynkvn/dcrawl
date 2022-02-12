import { AnimationSet, AssetKeys, Creatures } from "./types";

/**
 * Creatures are sprites aware of space and time passing within the game.
 */
abstract class Creature<C extends Creatures> extends Phaser.GameObjects.Sprite {
    animations?: AnimationSet<C>;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
    ) {
        super(scene, x, y, key)
        this.setScale(10)
        scene.add.existing(this);
    }

    abstract update(time: number): void
}


/**
 * A low level goblin that is very weak.
 */
export class Goblin extends Creature<'goblin'> {
    animations: AnimationSet<'goblin'> = AssetKeys.anims.goblin
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
    ) {
        super(scene, x, y, key)
    }
    update(time: number) {
        const bobble_t = Math.sin(time * 6)
        this.angle = bobble_t * 7
        this.y = Math.sin(time * 16) * 15 + 200
        this.x = (this.x + 2) % 800
    }
}

/**
 * Skeletons are low level creatures
 */
class Skeleton extends Creature<'skeleton'> {
    animations: AnimationSet<'skeleton'> = AssetKeys.anims.skeleton
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
    ) {
        super(scene, x, y, key)
    }
    update(time: number) {
        const bobble_t = Math.sin(time * 6)
        this.angle = bobble_t * 7
        this.y = Math.sin(time * 16) * 15 + 200
        this.x = (this.x + 2) % 800
    }
}
