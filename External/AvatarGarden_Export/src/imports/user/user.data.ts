
import { EnvironmentRealm, GetCurrentRealmResponse, GetPlatformResponse, getCurrentRealm, getPlatform } from '~system/EnvironmentApi';
import * as ident from '~system/UserIdentity';

// Only used locally
// Payload
type UserInfoDCL = {
    dclUserId: string
    wallet: string
    username: string
}

export class UserData {

    private static instanceRef: UserData;
    playerRealm?: EnvironmentRealm

    private dclUserId: string = '';
    private wallet: string = '';
    private username: string = '';

    private userData: ident.UserData | null = null;
    private platform: string = '';

    private userId: string | null = null;
    private accessToken: string | null = null;

    private promiseUserData?: Promise<ident.GetUserDataResponse>
    private promiseWallet?: Promise<ident.GetUserPublicKeyResponse>
    private promisePlatformData?: Promise<GetPlatformResponse>
    private promiseRealmData?: Promise<GetCurrentRealmResponse>

    private constructor() { }
    // Singleton Instance of the Object
    static instance(): UserData { return this.instanceRef || (this.instanceRef = new this()); }

    /**
     * Load & store user data from DCL, multiple calls after first will return cached data
     * @param bForceLoad - Force reload of data, even if already loaded
     * @returns 
     */
    async loadUserData(bForceLoad = false): Promise<void> {
        if (this.userData && !bForceLoad) return;

        if (!this.promiseUserData) {
            this.promiseUserData = ident.getUserData({})
        }
        if (!this.promiseWallet) {
            this.promiseWallet = ident.getUserPublicKey({})
        }

        this.wallet = (await this.promiseWallet).address || ''
        this.userData = (await this.promiseUserData).data || null

        this.dclUserId = this.userData?.userId || ''

        this.username = ''
        if (this.userData && this.userData.displayName) {
            this.username = this.userData.displayName
        }
        return;
    }
    /**
     * Load & store platform data from DCL, multiple calls after first will return cached data
     * @param bForceLoad - Force reload of data, even if already loaded
     * @returns 
     */
    async loadPlatformData(bForceLoad = false): Promise<string> {
        if (this.platform && !bForceLoad) {
            return this.platform
        }
        if (!this.promisePlatformData) {
            this.promisePlatformData = getPlatform({})
        }

        this.platform = (await this.promisePlatformData)?.platform || ''

        return this.platform
    }
    /**
     * Returns platform data from DCL, if loadPlatformData has been called before
     * @returns Platform data from DCL
     */
    getPlatformData(): string {
        return this.platform
    }
    /**
     * Returns user data from DCL, if loadUserData has been called before 
     * @returns User data from DCL
     */
    getUserData(): ident.UserData | null {
        return this.userData
    }
    /**
     * Returns wallet address from DCL, if loadUserData has been called before and the player has a wallet
     * @returns Wallet address from DCL, undefined if player is guest
     */
    getWallet(): string {
        return this.wallet
    }
    /**
     * Returns wallet address from DCL, if the player has a wallet
     * @returns Wallet address from DCL, undefined if player is guest
     */
    async getWalletAsync(): Promise<string> {
        if (!this.userData) {
            await this.loadUserData()
        }
        return this.wallet
    }
    getDclName(): string {
        return this.username
    }
    /**
     * Returns DCL user id, if the player is not a guest the ID is the same as the wallet address
     * @returns DCL user id
     */
    getDclUserId(): string {
        if (this.getWallet()) {
            return this.getWallet()
        }
        return this.dclUserId
    }

    getUserId(): string | null {
        return this.userId
    }
    /**
     * Returns the access token for the PM services, if the player has logged in
     * @returns Access token string
     */
    getAccessToken(): string | null {
        return this.accessToken
    }
    /**
     * Returns true if the player has logged in the PM server
     */
    userIsAuth(): boolean {
        return this.accessToken ? true : false;
    }

    setUserLogin(userId: string | null, token: string | null) {
        this.userId = userId
        this.accessToken = token
    }
    /**
     * Returns true if the player is a guest
     */
    isGuest() {
        if (this.getWallet()) {
            return false
        }
        return true
    }

    getRealm(): EnvironmentRealm | undefined {
        return this.playerRealm
    }

    async getRealmAsync(): Promise<EnvironmentRealm> {
        if(!this.playerRealm) {
            if(!this.promiseRealmData) await this.setRealm()
            else {
                await this.promiseRealmData
            }
        }
        return this.playerRealm
    }

    async setRealm() {
        this.promiseRealmData = getCurrentRealm({})
        const realm = await this.promiseRealmData
        if (realm && realm.currentRealm) {
            console.log(`You are in the realm: ${JSON.stringify(realm.currentRealm.displayName)}`)
            this.playerRealm = realm.currentRealm
        }
    }

}
