/**
 * Typing for animation frames 
 * 
 * Template types used to restrict animation frames 
 * for each subset of creatures and animations from the main tile map
 */
export type AtlasKey = 'tiles'
export type Creatures = 'goblin' | 'skeleton'
export type AnimationState = 'idle' | 'run'
export type Animations<C extends Creatures> = {
    [a in AnimationState]?: FrameName<C, a>
}
export type FrameNumber = 0 | 1 | 2 | 3

export type AnimationName<C extends Creatures> = `${C}_${AnimationState}_anim`
/**
 * Animation name and frame count for each animation.
 */
export type CreateAnimation<C extends Creatures> = {
    [name in AnimationName<C>]: number
}

export type FrameName<C extends Creatures, A extends AnimationState> = `${C}_${A}_anim${FrameNumber}`[]
type AssetKeys = {
    atlas: AtlasKey,
    anims: {
        [c in Creatures]: {
            [a in AnimationState]: FrameName<c, a>
        }
    }
}
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

export function getAnim(key: Creatures): Animations<Creatures> {
    return AssetKeys.anims[key] 
}