import { AlignType, Position } from "@dcl/sdk/react-ecs"

type UICanvasData = {
    visible: boolean,
    width: number,
    height: number,
    hAlign: 'center' | 'left' | 'right',
    vAlign: AlignType
}

type UIGuestData = {
    readonly message: ()=>string,
    mode: UIGuestMode,
}

export enum UIGuestMode {
    LEADERBOARD = 0,
    SIGNBOOK = 1,
    WEARABLE = 2,
    SEASON = 3
}

export const uiGuestCanvasData: UICanvasData = {
    visible: false,
    width: 40,
    height: 30,
    hAlign: 'center',
    vAlign: 'center'
}

export const uiGuestData: UIGuestData = {
    mode: UIGuestMode.LEADERBOARD,
    message: ()=> {
        if(uiGuestData.mode == UIGuestMode.LEADERBOARD) {
            return 'A MetaMask Digital wallet\n is required to save your score.'
        }
        else if(uiGuestData.mode == UIGuestMode.SIGNBOOK) {
            return 'A MetaMask Digital wallet\n is required to sign.'
        }
        else if(uiGuestData.mode == UIGuestMode.WEARABLE) {
            return 'A MetaMask Digital wallet\n is required to claim this wearable.'
        }
        else if(uiGuestData.mode == UIGuestMode.SEASON) {
            return 'You can play the game,\nbut login with a wallet\n is required to unlock the avatars.'
        }
    }
}

export function position(data: { hAlign: string, width: number}): Partial<Position> {
    if(data.hAlign == 'center') {
        return {
            left: `${50-data.width/2}%`,
        }
    }
    else if(data.hAlign == 'left') {
        return {
            left: '0%'
        }
    }
    else if(data.hAlign == 'right') {
        return {
            left: `${100-data.width}%`
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
