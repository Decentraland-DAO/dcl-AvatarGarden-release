import { AudioSource, Entity, PBAudioSource, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { addDebugPivot } from "../imports/components/debugPivot";
import { delay } from "../imports/delay";
import { randomIntFromInterval } from "../utils";


export type PlayOptions = {
    position?: Vector3
    parent?: Entity
    volume?: number
    pitch?: number
}

export class AudioManager {
    
    private static instanceRef: AudioManager;
    // Singleton Instance of the Object
    static instance(): AudioManager { return this.instanceRef || (this.instanceRef = new this()); }

    private readonly game_music: PBAudioSource = {
        audioClipUrl: 'assets/audio/game_music.mp3',
        playing: false,
        loop: true,
        volume: 0.5,
    }
    private readonly success: PBAudioSource = {
        audioClipUrl: 'assets/audio/success.mp3',
        playing: false,
        volume: 0.5,
    }
    private readonly fail: PBAudioSource = {
        audioClipUrl: 'assets/audio/fail.mp3',
        playing: false,
        volume: 0.5,
    }
    private readonly clock: PBAudioSource = {
        audioClipUrl: 'assets/audio/clock_tick.mp3',
        playing: false,
        loop: true,
        volume: 0.5,
    }

    private readonly au: PBAudioSource = {
        audioClipUrl: 'assets/audio/au.mp3',
        playing: false,
        volume: 1,
    }

    private readonly bonk: PBAudioSource = {
        audioClipUrl: 'assets/audio/bonk1.mp3',
        playing: false,
        volume: 0.5,
    }

    private readonly bonks: PBAudioSource[] = [ this.au, this.bonk ]

    readonly gameMusicEntity: Entity
    readonly successEntity: Entity
    readonly failEntity: Entity
    readonly clockEntity: Entity
    readonly auEntity: Entity
    readonly bonkEntity: Entity
    private readonly bonksEntity: Entity[] = []

    private constructor() { 
        this.gameMusicEntity = engine.addEntity()
        Transform.create(this.gameMusicEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.gameMusicEntity, this.game_music)

        this.successEntity = engine.addEntity()
        Transform.create(this.successEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.successEntity, this.success)

        this.failEntity = engine.addEntity()
        Transform.create(this.failEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.failEntity, this.fail)

        this.clockEntity = engine.addEntity()
        Transform.create(this.clockEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.clockEntity, this.clock)

        this.auEntity = engine.addEntity()
        Transform.create(this.auEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.auEntity, this.au)

        this.bonkEntity = engine.addEntity()
        Transform.create(this.bonkEntity, {
            position: Vector3.create(0, 0, 0),
            scale: Vector3.create(1, 1, 1),
        })
        AudioSource.create(this.bonkEntity, this.bonk)

        this.bonksEntity.push(this.auEntity)
        this.bonksEntity.push(this.bonkEntity)
    }

    playGameMusic(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.game_music.volume
        this.play(this.gameMusicEntity, options)
    }
    stopGameMusic() {
        this.stop(this.gameMusicEntity)
    }
    playSuccess(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.success.volume
        this.playOnce(this.successEntity, options)
        //Workaround to dcl not playing the sound again
        delay(()=>{
            this.stop(this.successEntity)
        }, 1000)
    }
    playFail(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.fail.volume
        this.playOnce(this.failEntity, options)
        //Workaround to dcl not playing the sound again
        delay(()=>{
            this.stop(this.failEntity)
        }, 1000)
    }
    playClock(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.clock.volume
        this.play(this.clockEntity, options)
    }
    stopClock() {
        this.stop(this.clockEntity)
    }
    playAu(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.au.volume
        this.playOnce(this.auEntity, options)
        //Workaround to dcl not playing the sound again
        delay(()=>{
            this.stop(this.auEntity)
        }, 400)
    }
    playBonk(options: PlayOptions) {
        if(!options.hasOwnProperty('volume')) options.volume = this.bonk.volume
        this.playOnce(this.bonkEntity, options)
        //Workaround to dcl not playing the sound again
        delay(()=>{
            this.stop(this.bonkEntity)
        }, 400)
    }

    playRandomBonk(options: PlayOptions) {
        const index = randomIntFromInterval(0, this.bonks.length - 1)
        if(!options.hasOwnProperty('volume')) options.volume = this.bonks[index].volume
        this.playOnce(this.bonksEntity[index], options)
        //Workaround to dcl not playing the sound again
        delay(()=>{
            this.stop(this.bonksEntity[index])
        }, 400)
    }

    playOnce(entity: Entity, options: PlayOptions) {
        
        this.setOptions(entity, options)
        AudioSource.getMutable(entity).loop = false
        AudioSource.getMutable(entity).playing = true
    }
    play(entity: Entity, options: PlayOptions) {

        this.setOptions(entity, options)
        AudioSource.getMutable(entity).loop = true
        AudioSource.getMutable(entity).playing = true
    }

    private setOptions(entity: Entity, options: PlayOptions) {
        Transform.getMutable(entity).position = options?.position || Vector3.Zero()
        Transform.getMutable(entity).parent = options?.parent || null
        AudioSource.getMutable(entity).volume = options?.volume || 1
        AudioSource.getMutable(entity).pitch = options?.pitch || 1
    }
    setVolume(entity: Entity, volume: number) {
        AudioSource.getMutable(entity).volume = volume
    }

    stop(entity: Entity) {
        AudioSource.getMutable(entity).playing = false
    }
    
}
