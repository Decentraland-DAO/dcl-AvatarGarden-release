import { AudioSource, AvatarAnchorPointType, AvatarAttach, AvatarModifierArea, AvatarModifierType, Entity, MeshRenderer, Transform, engine } from "@dcl/sdk/ecs"
import { StatEventType } from "./imports/stats/stats.schema"
import { Vector3 } from "@dcl/sdk/math"
import { createStatEvent } from "./imports/stats/stats.component"
import { setupUI } from "./ui"
import { movementUpdateSystem } from "./imports/tween/movement/movement.system"
import { Leaderboard } from "./imports/leaderboard/leaderboard"
import { loadSeasonPass } from "./games/seasonpass/seasonpass"
import { leaderboard, leaderboardBoard, leaderboardNext, leaderboardPages, leaderboardPrev, loadTags, minigames_floor, npcs } from "./games/tags"
import { createFrames, showPreviewAvatar } from "./games/seasonpass/avatars"
import { NpcBehaviour, loadNpcInZone1 } from "./NPCs/npcBehaviour"

function loadStats() {
    const SCENE_CENTER = Vector3.create(32, 32, 32)
    const SCENE_SIZE = Vector3.create(63, 64, 63)
    const statTriggerEntity = engine.addEntity()
    Transform.create(statTriggerEntity, {
        position: SCENE_CENTER,
        scale: SCENE_SIZE,
    })

    createStatEvent(statTriggerEntity, "avatar-garden-1", "enter-1", StatEventType.TRIGGER)

    //setTriggerDebug(statTriggerEntity, true)
}

function loadLeaderboards() {

    if (leaderboard[0] && leaderboardPages[0] && leaderboardBoard[0] && leaderboardNext[0] && leaderboardPrev[0]) {

        Leaderboard.instance().addLeaderboardPanel("avatar_garden_wanted", leaderboardBoard[0], leaderboardNext[0], leaderboardPrev[0], leaderboardPages[0], "Sticky Business")
    }

    if (leaderboard[1] && leaderboardPages[1] && leaderboardBoard[1] && leaderboardNext[1] && leaderboardPrev[1]) {
        Leaderboard.instance().addLeaderboardPanel("avatar_garden_mole", leaderboardBoard[1], leaderboardNext[1], leaderboardPrev[1], leaderboardPages[1], "Hammercide")
    }

    if (leaderboard[2] && leaderboardPages[2] && leaderboardBoard[2] && leaderboardNext[2] && leaderboardPrev[2]) {
        Leaderboard.instance().addLeaderboardPanel("avatar_garden_cards", leaderboardBoard[2], leaderboardNext[2], leaderboardPrev[2], leaderboardPages[2], "Pair-adise Found")
    }
}

function loadDisableAvatarArea() {
    const areaEnt = engine.addEntity()
    Transform.create(areaEnt, {
        position: Vector3.create(0, 1.5, 0),
        scale: Vector3.create(1, 1, 1),
        parent: minigames_floor
    })
    //MeshRenderer.setBox(areaEnt)
    AvatarModifierArea.create(areaEnt, {
        area: Vector3.create(7, 3, 7),
        excludeIds: [],
        modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
    })
}
export const sourceEntity = engine.addEntity()

AudioSource.create(sourceEntity, {
  audioClipUrl: 'assets/audio/ambientSound.mp3',
  loop: true,
  playing: true,
  volume: 1,
})

AvatarAttach.create(sourceEntity, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
})

function playSound(entity: Entity, bPlaying: boolean) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)
  
    // modify its playing value
    audioSource.playing = bPlaying
}
export function loadInit() {
    playSound(sourceEntity, true)
    setupUI()
    loadTags()
    loadDisableAvatarArea()
    //loadNpcInZone1()
    NpcBehaviour.Instance()
    //claimWearable("voltaire-1")

    //loadRemoteScene("Test", true)

    loadStats()
    engine.addSystem(movementUpdateSystem)
    loadSeasonPass()

    loadLeaderboards()

    showPreviewAvatar(1)
    createFrames()
}
