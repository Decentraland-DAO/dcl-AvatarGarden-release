import { AlignType, Position } from "@dcl/sdk/react-ecs"
import { CaptchaData } from "../captcha.schema"

type UICanvasData = {
    visible: boolean,
    width: number,
    height: number,
    hAlign: 'center' | 'left' | 'right',
    vAlign: AlignType
}

type UICaptchaData = {
    captcha?: CaptchaData
    inputValue: string
    onCloseClick?: ()=>void
    onSolveClick?: ()=>void
}

export const uiCanvasData: UICanvasData = {
    visible: false,
    width: 40,
    height: 50,
    hAlign: 'center',
    vAlign: 'center'
}

export const uiData: UICaptchaData = {
    inputValue: ''
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

export function uiBackground(data: UICaptchaData) {
    if(data.captcha) {
        return {
            texture:{ src: "data:image/png;base64,"+data.captcha?.base64Representation}
        }
    }
    return {}
}