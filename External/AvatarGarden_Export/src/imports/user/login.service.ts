import { CaptchaData } from "../captcha/captcha.schema"
import { URL_SERVER } from "../services/env"
import { http } from "../services/http.service"
import { UserData } from "./user.data"

// Answers Types from REQUEST
type LoginCorrectAnswer = {
    userId: string
    token: {
        access_token: string
    }
    captchaExpireDate?: number
    captcha?: CaptchaData
}

type LoginFailedAnswer = {
    statusCode: number;
    message: string;
    error: string;
}

const LOGIN_DCL_URL = URL_SERVER + "/loginWithDcl"

var accessToken: string = ""

export function getAccessToken(): string {
    return accessToken
}

export async function loginWithDcl() {
    if (!UserData.instance().getWallet()) {
        await UserData.instance().loadUserData()
    }

    const body = {
        wallet: UserData.instance().getWallet(),
        username: UserData.instance().getDclName()
    }

    const res = await http.signedPost(LOGIN_DCL_URL, body)
    const data: LoginCorrectAnswer = JSON.parse(res.body)

    //console.log('RES LOGIN', res);
    if (res.ok) {
        accessToken = data.token.access_token
        UserData.instance().setUserLogin(data.userId, accessToken)
    }

    if (data.captcha) {
        //CaptchaService.instance().setCaptcha(data.captcha)
    }
}