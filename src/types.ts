/**
 * Typing for animation frames 
 * 
 * Template types used to restrict animation frames 
 * for each subset of creatures and animations from the main tile map
 */
export type AtlasKey = 'tiles'
export type Creatures = 'goblin' | 'skeleton'
export type AnimationState = 'idle' | 'run'

export type AnimationName = `${Creatures}_${AnimationState}`

type AssetKeys = {
    atlas: AtlasKey,
    anims: {
        [c in Creatures]: AnimationSet<c> 
    }
}
/**
 * Animation Set for a specific creature
 */
export type AnimationSet<C extends Creatures> = { [key in AnimationState]: `${C}_${key}_anim${number}`[] }

export const AssetKeys: AssetKeys = {
    atlas: 'tiles',
    anims: {
        goblin: {
            idle: ["goblin_idle_anim0", "goblin_idle_anim1", "goblin_idle_anim2", "goblin_idle_anim3"],
            run: ["goblin_run_anim0", "goblin_run_anim1", "goblin_run_anim2", "goblin_run_anim3"],
        },
        skeleton: {
            idle: ["skeleton_idle_anim0", "skeleton_idle_anim1", "skeleton_idle_anim2", "skeleton_idle_anim3"],
            run: ["skeleton_run_anim0", "skeleton_run_anim1", "skeleton_run_anim2", "skeleton_run_anim3"],
        },
    }
}

export function loadAnims(anims: Phaser.Animations.AnimationManager) {
    let k: Creatures
    for (k in AssetKeys.anims) {
        let a: AnimationState
        for (a in AssetKeys.anims[k]) {
            let key: AnimationName = `${k}_${a}`
            let frames = AssetKeys.anims[k][a]
            anims.create({
                key,
                frames: frames.map((frame: string) => ({
                    key: AssetKeys.atlas,
                    frame: frame
                })),
                frameRate: 8,
                repeat: -1
            })
        }
    }
}