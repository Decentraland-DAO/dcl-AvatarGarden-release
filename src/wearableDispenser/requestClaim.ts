import { ClaimConfig } from "./claimConfig";
import { ClaimTokenRequest } from "./claimTokenRequest";
import { ClaimCodes, ClaimState, ClaimTokenRequestArgs, UIClaimMode } from "./claimWearable.schema";
import { setImgSrc, setIsMenuVisible, uiClaimData } from "./ui/uiClaim.data";

export function _isClaimJsonSuccess(json: any) {
    var retVal = false
    if (json && json.ok) {
      retVal = true
    }
    console.log('_isClaimJsonSuccess ' + retVal, json)
    return retVal
}

export function _isOutOfStock(json: any) {
    return json && json.ok && json.data && !json.data[0] && !json.error
}
export class ClaimTokenResult { 
    json: any
    success: boolean = false
    exception: any
    claimCode: any
    requestArgs?: ClaimTokenRequestArgs
  
    getClaimCode(): any {
      const claimJson = this.json
      if(this.claimCode && this.claimCode !== undefined){
        return this.claimCode
      }else if (claimJson !== null && claimJson !== undefined) {
        return claimJson.code
      } else {
        return 'unknown'
      }
    }
  
    isClaimJsonSuccess() {
      return _isClaimJsonSuccess(this.json)
    }

    isClaimJsonOutOfStock(){
      return _isOutOfStock(this.json)
    }
}

export class ClaimManager {

  private static instanceRef: ClaimManager;

  // Singleton Instance of the Object
  static instance(): ClaimManager { return this.instanceRef || (this.instanceRef = new this()); }

  async requestClaim(campaignName: string) {
    uiClaimData.mode = UIClaimMode.CLAIMING

    if (!ClaimConfig.campaign[campaignName]) {
      throw new Error("campaign " + campaignName + " not exists")
    }
  
    const claimReq = new ClaimTokenRequest({
      claimServer: ClaimConfig.rewardsServer,
      campaign: ClaimConfig.campaign[campaignName].campaign,
      campaign_key: ClaimConfig.campaign[campaignName].campaignKeys.mapTShirt
    })
    
    try {
      console.log('URN ', ClaimConfig.campaign[campaignName].wearableUrnsToCheck)
      const claimResult = await claimReq.claimToken()
      setIsMenuVisible(true)
      setImgSrc('https://peer.decentraland.org/lambdas/collections/contents/' + ClaimConfig.campaign[campaignName].wearableUrnsToCheck + '/thumbnail')
      console.log('claimResult, received wearable? ', claimResult)
    } catch {
      console.log('error fetching from Reward server ', ClaimConfig.rewardsServer)
    }
  }
}