import { URL_SERVER } from "../services/env";
import { http } from "../services/http.service";
import { UserData } from "../user/user.data";
import { Captcha, CaptchaData, FailCaptchaReason } from "./captcha.schema";
import { uiCanvasData, uiData } from "./ui/ui.data";


export class CaptchaService {

    static readonly CAPTCHA_URL = URL_SERVER+"/captcha"
    private static currentCaptcha: Captcha

    static onSuccessSolveCB: ()=>Promise<void>
    static onFailSolveCB: (reason: FailCaptchaReason)=>Promise<void>

    private static successPromise: (bSolved: boolean)=>void
    private static failPromise: (reason: FailCaptchaReason)=>void

    static async requestCaptcha() {
        try {
            if (!UserData.instance().getWallet()) {
                await UserData.instance().loadUserData()
            }
    
            const res = await http.signedPost(this.CAPTCHA_URL, { wallet: UserData.instance().getWallet() }, UserData.instance().getAccessToken())
    
            if (res.ok) {
                const captcha: CaptchaData = (JSON.parse(res.body)).captcha
                await this.setCurrentCaptcha(captcha)
            }
        }
        catch (error) {
            console.error(error?.message || error);
        }
    }

    static async solveCurrentCaptcha(anwser: string) {
        const body = {
            wallet: UserData.instance().getWallet(),
            anwser: anwser
        }
    
        const res = await http.signedPut(this.CAPTCHA_URL, body, UserData.instance().getAccessToken())
    
        if(res.ok) {
            this.successCaptcha()
        }
        else {
            this.failCaptcha(FailCaptchaReason.FAILED, JSON.parse(res.body).captcha) 
        }
    }

    static async setCurrentCaptcha(captchaData: CaptchaData) {
        this.currentCaptcha = {
            captcha: captchaData,
            solved: false
        }
    
        console.log("Captcha: ", this.currentCaptcha.captcha);
        
        //Captcha UI
        uiData.captcha = this.currentCaptcha.captcha
        uiData.onCloseClick = ()=>{
            CaptchaService.failCaptcha(FailCaptchaReason.CLOSED)
        }
        uiData.onSolveClick = ()=>{
            CaptchaService.solveCurrentCaptcha(uiData.inputValue)
        }
        uiCanvasData.visible = true
    
        return new Promise<boolean>((resolve, reject) => {
            CaptchaService.successPromise = (bSolved: boolean)=>{resolve(bSolved)}
            CaptchaService.failPromise = (reason:FailCaptchaReason)=>{reject(CaptchaService.getErrorFromReason(reason))}
        })
    }

    private static successCaptcha(){
        this.currentCaptcha.solved = true
        uiCanvasData.visible = false
        if(this.successPromise) this.successPromise(true)
        if(this.onSuccessSolveCB) this.onSuccessSolveCB() 
    }

    private static failCaptcha(reason: FailCaptchaReason, newCaptcha?: CaptchaData){
        this.currentCaptcha.solved = false
        if(this.failPromise) this.failPromise(reason)
        if (newCaptcha) {
            this.setCurrentCaptcha(newCaptcha)
        }
    
        if (this.onFailSolveCB) this.onFailSolveCB(reason)
        
    }

    private static getErrorFromReason(reason: FailCaptchaReason) {
        switch (reason) {
            case FailCaptchaReason.FAILED:
                return "Captcha Failed"
            case FailCaptchaReason.CLOSED:
                return "Captcha Closed"
            default:
                return "Unknown Captcha Error"
        }
    }
}
