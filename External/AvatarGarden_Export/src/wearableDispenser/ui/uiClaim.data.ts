import { Position } from "@dcl/react-ecs"
import { UICanvasData, UIClaimData, UIClaimMode } from "../claimWearable.schema"

export const uiClaimData: UIClaimData = {
    mode: UIClaimMode.CONFIRM,
    message: (error?)=> {
        if(uiClaimData.mode == UIClaimMode.CONFIRM) {
            return 'Do you want to claim this wearable?'
        }
        else if(uiClaimData.mode == UIClaimMode.CLAIMED) {
            return 'Your wearable has been claimed!\nIt will be available in your account soon!'
        }
        else if(uiClaimData.mode == UIClaimMode.ERROR) {
            return error ? error : 'An error ocurred while claiming your wearable.'
        }
        else if(uiClaimData.mode == UIClaimMode.NOTRECEIVED) {
            return 'Couldn´t receive the wearable.\nPlease try again later.'
        }
        else if(uiClaimData.mode == UIClaimMode.HASALREADY) {
            return 'You already have this wearable!'
        }
        else if(uiClaimData.mode == UIClaimMode.CLAIMING) {
            return 'Claiming your wearable...'
        }
        else if(uiClaimData.mode == UIClaimMode.OUT_OF_STOCK) {
            return 'We are sorry,\n this wearable is out of stock.'
        }
    }
}

export var imageSrc: string = ''
export var isMenuVisible: boolean = false

export const uiClaimCanvasData: UICanvasData = {
    visible: false,
    width: 30,
    height: 55,
    hAlign: 'center',
    vAlign: 'center'
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

export var callbackClickClaim: Function = () => {}
export function setCallbackClickClaim(callback: Function) {
    callbackClickClaim = callback
}
export function setImgSrc(src: string) {
    imageSrc = src
}
export function setIsMenuVisible(isVisible: boolean) {
    isMenuVisible = isVisible
}