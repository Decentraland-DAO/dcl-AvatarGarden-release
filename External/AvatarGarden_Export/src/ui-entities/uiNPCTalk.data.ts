export var currentDialogueIndex: number = 0
export var npcDialog: string = ""

export var isMenuVisible: boolean = false
export var isButtonYesVisible: boolean = false
export var isButtonNoVisible: boolean = false
export var isButtonClickVisible: boolean = false
export let playerTalking: boolean = false
export var playerChosingOption: boolean = false

export var callbackClickYes: Function = () => {}
export var callbackClickNo: Function = () => {}
export var callbackClickNext: Function = () => {}

export function setCurrentDialogueIndex(index: number) {
    currentDialogueIndex = index
}

export function setNpcDialog(dialog: string) {
    npcDialog = dialog
}

export function setIsMenuVisible(isVisible: boolean) {
    isMenuVisible = isVisible
}

export function setIsButtonYesVisible(isVisible: boolean) {
    isButtonYesVisible = isVisible
}

export function setIsButtonNoVisible(isVisible: boolean) {
    isButtonNoVisible = isVisible
}

export function setIsButtonClickVisible(isVisible: boolean) {
    isButtonClickVisible = isVisible
}

export function setPlayerTalking(isTalking: boolean) {
    playerTalking = isTalking
}

export function setPlayerChosingOption(isChosing: boolean) {
    playerChosingOption = isChosing
}

export function setCallbackClickYes(callback: Function) {
    callbackClickYes = callback
}

export function setCallbackClickNo(callback: Function) {
    callbackClickNo = callback
}

export function setCallbackClickNext(callback: Function) {
    callbackClickNext = callback
}

export function resetTalk() {
    setIsMenuVisible(false)
    setCurrentDialogueIndex(0)
    setPlayerTalking(false)
    setPlayerChosingOption(false)
    setIsButtonClickVisible(false)
    setIsButtonNoVisible(false)
    setIsButtonYesVisible(false)
    setCallbackClickNo(() => {})
    setCallbackClickYes(() => {})
}

export function activateTalk() {
    setIsMenuVisible(true)
    setPlayerTalking(true)
    setIsButtonClickVisible(true)
}
