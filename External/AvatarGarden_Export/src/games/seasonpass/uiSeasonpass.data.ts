import { AlignType, Position } from "@dcl/sdk/react-ecs"
import { MAX_INDEX, getUnlockIndex } from "./seasonpass"
import { delay } from "../../imports/delay"

type UICanvasData = {
    visible: boolean,
    width: number,
    height: number,
    hAlign: 'center' | 'left' | 'right',
    vAlign: AlignType,
    position?: Partial<Position>
}

type UISeasonpassData = UICanvasData & {
    readonly progressSourceWidth: number,
    unlockIndex: number,
}

export const uiSeasonCanvasData: UISeasonpassData = {
    visible: true,
    width: 50,
    height: 40,
    hAlign: 'right',
    vAlign: 'flex-start',
    position: {
        left: -7,
    },
    progressSourceWidth: 568,
    unlockIndex: 0,
}

var canTick = true
export function getUnlockPercent(): number {
    if(uiSeasonCanvasData.unlockIndex >= getUnlockIndex()) {
        return uiSeasonCanvasData.unlockIndex / MAX_INDEX * 100
    }
    if(!canTick) {
        return uiSeasonCanvasData.unlockIndex / MAX_INDEX * 100
    }
    
    canTick = false
    delay(()=>{canTick = true}, 10)
    if (uiSeasonCanvasData.unlockIndex < getUnlockIndex()) {  
        uiSeasonCanvasData.unlockIndex += (Math.max(2,getUnlockIndex()-uiSeasonCanvasData.unlockIndex))/10
    }
    return uiSeasonCanvasData.unlockIndex / MAX_INDEX * 100
}


export function position(data: {hAlign: 'center' | 'left' | 'right', width: number, position?: Partial<Position>}): Partial<Position> {
    if(data.hAlign == 'center') {
        return {
            left: `${((50-data.width/2)+((data.position?.left as number) || 0))}%`,
        }
    }
    else if(data.hAlign == 'left') {
        return {
            left: `${((data.position?.left as number) || 0)}%`
        }
    }
    else if(data.hAlign == 'right') {
        return {
            left: `${100-data.width+((data.position?.left as number) || 0)}%`
        }
    }
}

export function transform(data: UICanvasData): any {
    return {
        display: (data.visible) ? 'flex' : 'none',
        width: `${data.width}%`,
        height: `${data.height}%`,
        positionType: 'absolute',
        alignSelf: `${data.vAlign}`,
        position: position(data),
        alignItems: 'center',
    }
}
