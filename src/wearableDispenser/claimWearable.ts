import { FlatFetchResponse } from "~system/SignedFetch"
import { UserData } from "../imports/user/user.data"
import { UIGuestMode, uiGuestCanvasData, uiGuestData } from "../imports/guestUI/uiGuest.data"
import { setCallbackClickClaim, uiClaimCanvasData, uiClaimData } from "./ui/uiClaim.data"
import { UIClaimMode } from "./claimWearable.schema"
import { ClaimManager } from "./requestClaim"

// User data is only required if your code is running on a Decentraland scene
export async function claimWearable(campaignKey: string){
  if(!UserData.instance().getUserData()){
      await UserData.instance().loadUserData()
  }
  const userData = UserData.instance().getUserData()
  var url = null
  if (!userData.hasConnectedWeb3){
    uiGuestData.mode = UIGuestMode.WEARABLE
    uiGuestCanvasData.visible = true
    return;
  } 
  claimUI()
  ClaimManager.instance().requestClaim(campaignKey)
}

function claimUI(){
  uiClaimData.mode = UIClaimMode.CONFIRM
  uiClaimCanvasData.visible = true
}
