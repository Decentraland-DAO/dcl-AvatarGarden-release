
export type Captcha = {
    captcha: CaptchaData,
    solved: boolean,
}

export type CaptchaData = {
    base64Representation: string
    height: number
    width: number  
}

export enum FailCaptchaReason {
    FAILED = 0,
    CLOSED = 1
}