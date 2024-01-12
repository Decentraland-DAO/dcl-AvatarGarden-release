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
      handleClaimJson(claimResult)
      if (ClaimCodes.OUT_OF_STOCK === handleClaimJson(claimResult)) {
        uiClaimData.mode = UIClaimMode.OUT_OF_STOCK
        setIsMenuVisible(true)
        console.log('claimResult, OUT OF STOCK ', claimResult)
        return
      }
      setIsMenuVisible(true)
      setImgSrc('https://peer.decentraland.org/lambdas/collections/contents/' + ClaimConfig.campaign[campaignName].wearableUrnsToCheck + '/thumbnail')
      console.log('claimResult, received wearable? ', claimResult)
    } catch {
      console.log('error fetching from Reward server ', ClaimConfig.rewardsServer)
    }
  }
}

export function handleClaimJson(claimResult:ClaimTokenResult):ClaimCodes{
  const json=claimResult.json
  const overrideCode=claimResult.claimCode
  const error=claimResult.exception
  console.log("handleClaimJson ",json,overrideCode)

  if (json && !json.ok) {
    console.log('ERROR: ', json.code)
    let code = json.code
    if(overrideCode){
      code = overrideCode
    }
    let uiMsg = ''
    
    let tryAgainInMsg = ""
    switch (code) {
      case ClaimCodes.BENEFICIARY_INVALID:
      case ClaimCodes.BENEFICIARY_NOT_CONNECTED:
      case ClaimCodes.BENEFICIARY_POSITION:
        break
      case 'campaign_uninitiated':
      case 'campaign_key_uninitiated':
        uiMsg = 'This campaign has not started yet.'
        tryAgainInMsg = "This campaign has not started.\nTry back in "
        break
      case 'campaign_finished':
      case 'campaign_key_finished':  
        uiMsg = 'This campaign is over.'
        tryAgainInMsg = "Temporarily of stock.\nNext batch will be available in \n"
        break
      default:
        uiMsg = 'An unexpected error occurred: \n' + json.error
        break
    }
  }else if (_isOutOfStock(json)) {
    return ClaimCodes.OUT_OF_STOCK
  } else {
    switch (json.data[0].status) {
      case ClaimState.ASSIGNED:
      case ClaimState.SENDING:
      case ClaimState.SUCCESS:
      case ClaimState.CONFIRMED:
        return ClaimCodes.BENEFICIARY_OK
      case ClaimState.REJECTED:
        return ClaimCodes.BENEFICIARY_INVALID
      default:
        break
    }
  }
  return ClaimCodes.BENEFICIARY_OK
}