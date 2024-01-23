import { AlignType } from "@dcl/sdk/react-ecs"
import { ClaimTokenResult } from "./requestClaim"

export enum ClaimState {
    ASSIGNED = 'assigned',
    SENDING = 'sending',
    SUCCESS = 'success',
    CONFIRMED = 'confirmed',
    REJECTED = 'rejected',
}

export enum ClaimCodes {
    BENEFICIARY_OK = 'beneficiary_ok',
    BENEFICIARY_INVALID = 'beneficiary_invalid',
    BENEFICIARY_NOT_CONNECTED = 'beneficiary_not_connected',
    BENEFICIARY_POSITION = 'beneficiary_position',
    CAMPAIGN_UNINITIATED = 'campaign_uninitiated',
    CAMPAIGN_FINISHED = 'campaign_finished',
    BENEFICIARY_WEB3_CONNECTED = 'beneficiary_not_web3_connected',
    OUT_OF_STOCK = 'out_of_stock',
    USER_ALREADY_CLAIMED = 'user_already_claimed',
}

export enum ChainId {
    ETHEREUM_MAINNET = 1,
    ETHEREUM_ROPSTEN = 3,
    ETHEREUM_RINKEBY = 4,
    ETHEREUM_GOERLI = 5,
    ETHEREUM_KOVAN = 42,
    MATIC_MAINNET = 137,
    MATIC_MUMBAI = 80001,
  }

export type UIClaimData = {
    message: ()=>string,
    mode: UIClaimMode,
}

export type UICanvasData = {
    visible: boolean,
    width: number,
    height: number,
    hAlign: 'center' | 'left' | 'right',
    vAlign: AlignType
}
export enum UIClaimMode {
    CLAIMED = 0,
    CONFIRM = 1,
    ERROR = 2,
    RECEIVED = 3,
    NOTRECEIVED = 4,
    HASALREADY = 5,
    CLAIMING = 6,
    OUT_OF_STOCK = 7,
}

export type ClaimTokenRequestArgs={
    claimServer: string
    campaign: string
    campaign_key: string
}

export type WearableEnumConstructorArg = {
    address?: string
    urn?: string
    name?: string
    itemId?: string
}

export type ClaimCallbacks = {
    onOpenUI?: (claimResult: ClaimTokenResult) => void,
    onAcknowledge?: (claimResult: ClaimTokenResult) => void,
    onCloseUI?: (claimResult: ClaimTokenResult) => void
}

export type ItemData = {
    id: string
    user: string
    campaign_id: string
    status: ClaimState
    transaction_hash: string | null
    transaction_id: string | null
    token: string
    value: string
    created_at: string
    updated_at: string
    from_referral: null
    block_number: null
    claim_id: string | null
    target: string
    payload: string | null
    expires_at: string | null
    signature: string | null
    airdrop_type: string
    group: string | null
    priority: string
    campaign_key: string
    assigned_at: string
    image: string
    chain_id: ChainId
}

export type RewardData = {
    ok: boolean
    data: ItemData[]
    code?: string
    error?: string
}