import { Entity, Transform, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { TagComponent } from "../imports/components/tag";


export var panel_timer: Entity
export var panel_objective: Entity
export var panel_objective_disable: Entity
export var panel_score: Entity
export var mole_disable: Entity
export var minigames_floor: Entity
export var panel_text: Entity
export var holes: Entity[] = []
export var npcs: Entity[] = []
export var thoughtBubbles: Entity[] = []
export var showcase: Entity
export var avatar_preview: Entity[] = []
export var avatar_claim: Entity[] = []
export var avatar_frame: Entity[] = []

//leaderboards
export var leaderboard: Entity[] = []
export var leaderboardPrev: Entity[] = []
export var leaderboardNext: Entity[] = []
export var leaderboardPages: Entity[] = []
export var leaderboardBoard: Entity[] = []

export function loadTags() {
    for (const [entity, component] of engine.getEntitiesWith(TagComponent)) {

        if (component.tag == "showcase") {
            showcase = entity
            continue;
        }
        if (component.tag == "avatar_preview") {
            avatar_preview.push(entity)
            continue;
        }
        if (component.tag == "avatar_claim") {
            avatar_claim.push(entity)
            continue;
        }
        if (component.tag == "avatar_frame") {
            avatar_frame.push(entity)
            continue;
        }
        if (component.tag == "panel_timer") {
            panel_timer = entity
            continue;
        }
        if (component.tag == "panel_objective") {
            panel_objective = entity
            continue;
        }
        if (component.tag == "panel_objective_disable") {
            panel_objective_disable = entity
            continue;
        }
        if (component.tag == "minigames_floor") {
            minigames_floor = entity
            continue;
        }
        if (component.tag == "panel_score") {
            panel_score = entity
            continue;
        }
        if (component.tag == "panel_text") {
            panel_text = entity
            continue;
        }
        if (component.tag == "mole_disable") {
            mole_disable = entity
            if (!VisibilityComponent.has(mole_disable)) {
                VisibilityComponent.create(mole_disable, { visible: false })
            }
            continue;
        }
        if (component.tag.includes("hole_")) {
            holes.push(entity)
            continue;
        }
        if (component.tag == "npc_1") {
            npcs[0] = entity
            continue;
        }
        if (component.tag == "npc_2") {
            npcs[1] = entity
            continue;
        }
        if (component.tag == "npc_3") {
            npcs[2] = entity
            continue;
        }
        if (component.tag == "npc_4") {
            npcs[3] = entity
            continue;
        }
        if (component.tag == "npc_5") {
            npcs[4] = entity
            continue;
        }
        if (component.tag == "thoughts_01") {
            thoughtBubbles[0] = entity
            continue;
        }
        if (component.tag == "thoughts_02") {
            thoughtBubbles[1] = entity
            continue;
        }
        if (component.tag == "thoughts_03") {
            thoughtBubbles[2] = entity
            continue;
        }
        if (component.tag == "thoughts_04") {
            thoughtBubbles[3] = entity
            continue;
        }
        if (component.tag == "thoughts_05") {
            thoughtBubbles[4] = entity
            continue;
        }

        //leaderboards
        if (component.tag == "leaderboard_1") {
            leaderboard[0] = entity
            continue;
        }

        if (component.tag == "leaderboard_2") {
            leaderboard[1] = entity
            continue;
        }
        if (component.tag == "leaderboard_3") {
            leaderboard[2] = entity
            continue;
        }

        if (component.tag == "leaderboard_prev") {
            if (Transform.get(entity).parent == leaderboard[0]) {
                leaderboardPrev[0] = entity
            }
            if (Transform.get(entity).parent == leaderboard[1]) {
                leaderboardPrev[1] = entity
            }
            if (Transform.get(entity).parent == leaderboard[2]) {
                leaderboardPrev[2] = entity
            }
            continue;
        }

        if (component.tag == "leaderboard_next") {
            if (Transform.get(entity).parent == leaderboard[0]) {
                leaderboardNext[0] = entity
            }
            if (Transform.get(entity).parent == leaderboard[1]) {
                leaderboardNext[1] = entity
            }
            if (Transform.get(entity).parent == leaderboard[2]) {
                leaderboardNext[2] = entity
            }
            continue;
        }

        if (component.tag == "leaderboard_pages") {
            if (Transform.get(entity).parent == leaderboard[0]) {
                leaderboardPages[0] = entity
            }
            if (Transform.get(entity).parent == leaderboard[1]) {
                leaderboardPages[1] = entity
            }
            if (Transform.get(entity).parent == leaderboard[2]) {
                leaderboardPages[2] = entity
            }
            continue;
        }

        if (component.tag == "leaderboard_board") {
            if (Transform.get(entity).parent == leaderboard[0]) {
                leaderboardBoard[0] = entity
            }
            if (Transform.get(entity).parent == leaderboard[1]) {
                leaderboardBoard[1] = entity
            }
            if (Transform.get(entity).parent == leaderboard[2]) {
                leaderboardBoard[2] = entity
            }
            continue;
        }

    }
}