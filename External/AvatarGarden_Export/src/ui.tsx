import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { uiCaptchaComponent } from './imports/captcha/ui/ui'
import { delay } from './imports/delay'
import *  as  ui from 'dcl-ui-toolkit'
import { uiGuestComponent } from './imports/guestUI/uiGuest'
import { uiClaimComponent } from './wearableDispenser/ui/uiClaim'
import { uiSeasonComponent } from './games/seasonpass/uiSeasonpass'
import { npcTalk } from './ui-entities/uiNPCTalk'
import { uiWelcomingComponent, uiWelcomingData } from './ui-entities/uiWelcoming'
import { uiDisclaimerComponent, uiDisclaimerData } from './ui-entities/uiDisclaimer'
import { uiSocialComponent } from './ui-entities/uiSocials'

var text = ""
//load the UI and show it at the beginning of the scene. THIS WILL UPDATE EVERY FRAME
//Z-ORDER: render order
export function setupUI() {
    ReactEcsRenderer.setUiRenderer(() => [
        ui.render,
        uiCaptchaComponent(),
        uiGuestComponent(),
        uiClaimComponent(),
        uiSeasonComponent(),
        npcTalk(),
        uiSocialComponent(),
        uiWelcomingComponent(),
        uiDisclaimerComponent()
    ])
    delay(() => {
        disableDisclaimerUI()
    }, 60000)
}

export function disableDisclaimerUI() {
    uiWelcomingData.visible = false
    uiDisclaimerData.visible = false
}
