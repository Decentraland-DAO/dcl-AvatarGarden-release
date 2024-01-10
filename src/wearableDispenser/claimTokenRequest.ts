import { FlatFetchResponse, signedFetch } from "~system/SignedFetch"
import { UserData } from "../imports/user/user.data"
import { ClaimTokenResult } from "./requestClaim"
import { ChainId, ClaimCodes, ClaimState, ClaimTokenRequestArgs, RewardData, UIClaimMode } from "./claimWearable.schema"
import { uiGuestCanvasData, uiGuestData } from "../imports/guestUI/uiGuest.data"
import { uiClaimCanvasData, uiClaimData } from "./ui/uiClaim.data"

export class ClaimTokenRequest{
    claimServer: string
    campaign: string
    campaign_key: string
    claimResult:ClaimTokenResult
    
    constructor(args:ClaimTokenRequestArgs){
      this.claimServer = args.claimServer
      this.campaign = args.campaign
      this.campaign_key = args.campaign_key
      this.claimResult = new ClaimTokenResult()
    }
  
    onFetchError(err:any){
      this.claimResult.success = false
      this.claimResult.exception = err
    }
  
    async validate(){
      if (!UserData.instance().getUserData()) {
        await UserData.instance().loadUserData()
      }
      if (!UserData.instance().getRealm()) {
        await UserData.instance().setRealm()
      }
    
      if (!UserData.instance().getUserData().hasConnectedWeb3) {
        this.claimResult.success = false
        this.claimResult.claimCode = ClaimCodes.BENEFICIARY_WEB3_CONNECTED
   
        uiGuestData.mode = 2
        uiGuestCanvasData.visible = true
  
        return false;
      }
  
      return true;
    }
  
    async processResponse(response:FlatFetchResponse){ 
      if (!response || !response.body) {
        throw new Error('Invalid response')
      }
      let json: RewardData = await JSON.parse(response.body)
      
      console.log('Reward received json: ', json)
      this.claimResult.json = json

      this.claimResult.success = this.claimResult.isClaimJsonSuccess()
      if(!this.claimResult.success){
        uiClaimData.mode = UIClaimMode.NOTRECEIVED
        return;
      }
      uiClaimData.mode = UIClaimMode.CLAIMED
      console.log('Reward received: ', this.claimResult.success)
      //uiClaimCanvasData.visible = false
    }
  
    async claimToken() {
      const claimResult = this.claimResult = new ClaimTokenResult() 
      this.claimResult.requestArgs = {claimServer:this.claimServer,campaign:this.campaign,campaign_key:this.campaign_key}
      
      const isValid = await this.validate()
      if(!isValid){
        return this.claimResult
      }
    
      const url = this.claimServer + '/api/campaigns/' + this.campaign + '/rewards'
      console.log('Xsending req to: ', url) 
    
      let body = JSON.stringify({
        campaign_key: this.campaign_key,
        catalyst: UserData.instance().playerRealm.domain,
        beneficiary: UserData.instance().getUserData().publicKey,
        //beneficiary: '0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
      })
    
      try {
        let response = null
        response = await signedFetch({
            url: url, 
            init:{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: body,
            }
        })
        
        console.log('Reward received resp: ', response)

        this.processResponse(response)
      } catch (error) {
        console.log('error fetching from token server ', url)
        uiClaimData.message = () => "Error response: " + this.onFetchError(error)
        this.onFetchError(error)
        console.log(error)
      }
      return claimResult
    }
}