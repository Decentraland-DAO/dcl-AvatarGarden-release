import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs"
import { uiSeasonCanvasData, position, getUnlockPercent } from './uiSeasonpass.data'
import { MAX_INDEX, canUnlockNext, getDailyGameCurrentScore, getDailyGameScore, getTimeRemaining, getUnlockIndex, isAllUnlocked, isLoaded, isPlaying, teleportToGame } from "./seasonpass"
import { millisToMinutesAndSecondsAndHours } from "../../utils"
import { uiGuestCanvasData, uiGuestData } from "../../imports/guestUI/uiGuest.data"

export const uiSeasonComponent = () => (
    <UiEntity
        uiTransform={{
            display: (uiSeasonCanvasData.visible) ? 'flex' : 'none',
            width: `${uiSeasonCanvasData.width}%`,
            height: `${uiSeasonCanvasData.height}%`,
            positionType: 'absolute',
            alignSelf: `${uiSeasonCanvasData.vAlign}`,
            flexDirection: 'column',
            position: position(uiSeasonCanvasData),
            margin: { top: 10 }
        }}
    /*uiBackground={{
        color: Color4.create(1, 0.2, 0.2, 0.2),
    }}*/
    >
        {progressBar()}
        {guest()}
        {goUnlock()}
        {unlockTimmer()}

    </UiEntity>

)

const guest = () => (
    <UiEntity

        uiTransform={{
            width: 400,
            height: 40,
            alignSelf: `flex-end`,
            flexDirection: 'row',
            margin: { right: '0%', top: '1%' },
            display: (isLoaded()) ? 'none' : 'flex',
        }}
        uiBackground={{
            color: Color4.White(),
            textureMode: 'nine-slices',
            texture: {
                src: 'assets/captcha/background_mask.png',
            },
            textureSlices: {
                left: 0.3,
                right: 0.3,
                top: 0.2,
                bottom: 0.2,
            },
        }}
    >
        <UiEntity
            uiTransform={{
                width: '100%',
                height: '100%',
                alignSelf: `center`,
            }}
            uiText={{
                value: '<b>You are logged as Guest</b>',
                fontSize: 18,
                textAlign: 'middle-center',
                color: Color4.fromHexString("#303047"),
            }}

        />

        <UiEntity      
            //Button Play
            uiTransform={{
                width: '40%',
                height: '100%',
                alignSelf: `center`
            }}
            uiBackground={{
                color: Color4.fromHexString("#ff99d3"),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png',
                },
                textureSlices: {
                    left: 0.3,
                    right: 0.3,
                    top: 0.2,
                    bottom: 0.2,
                },
            }}
            onMouseDown={() => {
                uiGuestData.mode = 3
                uiGuestCanvasData.visible = true
                teleportToGame()
            }}
            uiText={{
                value: '<b>PLAY</b>',
                fontSize: 20,
                textAlign: 'middle-center',
            }}
        />

    </UiEntity>
)

const goUnlock = () => (
    <UiEntity

        uiTransform={{
            width: (isAllUnlocked()) ? 600 : 500,
            height: 40,
            alignSelf: `flex-end`,
            flexDirection: 'row',
            margin: { right: '0%', top: '1%' },
            display: (isLoaded() && canUnlockNext()) ? 'flex' : 'none',
        }}
        uiBackground={{
            color: Color4.White(),
            textureMode: 'nine-slices',
            texture: {
                src: 'assets/captcha/background_mask.png',
            },
            textureSlices: {
                left: 0.3,
                right: 0.3,
                top: 0.2,
                bottom: 0.2,
            },
        }}
    >
        <UiEntity
            //Text
            uiTransform={{
                width: '100%',
                height: '100%',
                alignSelf: `center`,
            }}
            uiText={{
                value: '<b>'+((isAllUnlocked()) ? 'Congrats, you have unlocked everything!' : 'Score ' + getDailyGameScore() + ' points to unlock an avatar!') + '</b>',
                fontSize: 18,
                textAlign: 'middle-center',
                color: Color4.fromHexString("#303047"),
            }}
        />
        <UiEntity
            //Button Play
            uiTransform={{
                width: '30%',
                height: '100%',
                alignSelf: `center`,
                display: (!isPlaying()) ? 'flex' : 'none',
            }}
            uiBackground={{
                color: Color4.fromHexString("#ff99d3"),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png',
                },
                textureSlices: {
                    left: 0.3,
                    right: 0.3,
                    top: 0.2,
                    bottom: 0.2,
                },
            }}
            onMouseDown={() => {
                teleportToGame()
            }}
            uiText={{
                value: '<b>PLAY</b>',
                fontSize: 20,
                textAlign: 'middle-center',
            }}
        />
        <UiEntity
            //Button Progress
            uiTransform={{
                width: '30%',
                height: '100%',
                alignSelf: `center`,
                display: (isPlaying()) ? 'flex' : 'none',
            }}
            uiBackground={{
                color: Color4.fromHexString("#ff99d3"),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png',
                },
                textureSlices: {
                    left: 0.3,
                    right: 0.3,
                    top: 0.2,
                    bottom: 0.2,
                },
            }}
            uiText={{
                value: '<b>' + getDailyGameCurrentScore() + '/' + getDailyGameScore() + '</b>',
                fontSize: 22,
                textAlign: 'middle-center',
            }}
        />
    </UiEntity>
)


const unlockTimmer = () => (
    <UiEntity
        //Parent container background
        uiTransform={{
            width: 400,
            height: 40,
            alignSelf: `flex-end`,
            display: (!isLoaded() || canUnlockNext() || isAllUnlocked()) ? 'none' : 'flex',
            flexDirection: 'row',
            margin: { right: '0%', top: '1%' },
        }}
        uiBackground={{
            color: Color4.White(),
            textureMode: 'nine-slices',
            texture: {
                src: 'assets/captcha/background_mask.png',
            },
            textureSlices: {
                left: 0.3,
                right: 0.3,
                top: 0.2,
                bottom: 0.2,
            },
        }}
    >
        <UiEntity
            //Title text
            uiTransform={{
                width: '80%',
                height: '100%',
                alignSelf: `center`,
                display: (canUnlockNext()) ? 'none' : 'flex',
            }}
            /*uiBackground={{
                color: Color4.create(1, 0, 0, 0.5),
            }}*/
            uiText={{
                value: '<b>NEXT UNLOCK IN</b>',
                fontSize: 18,
                textAlign: 'middle-center',
                color: Color4.fromHexString("#303047"),
            }}
        />
        <UiEntity
            //Countdown time text
            uiTransform={{
                width: '50%',
                height: '100%',
                alignSelf: `center`,
            }}
            uiBackground={{
                color: Color4.fromHexString("#ff99d3"),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png',
                },
                textureSlices: {
                    left: 0.3,
                    right: 0.3,
                    top: 0.2,
                    bottom: 0.2,
                },
            }}
            uiText={{
                value: '<b>' + millisToMinutesAndSecondsAndHours(getTimeRemaining()) + '</b>',
                fontSize: 20,
                textAlign: 'middle-center',
            }}
        />
    </UiEntity>
)

const progressBar = () => (
    <UiEntity
        //Progress
        uiTransform={{
            width: uiSeasonCanvasData.progressSourceWidth,
            height: 40,
            alignSelf: `flex-end`,
            //padding: { left: 32 }
        }}
        uiBackground={{
            textureMode: 'nine-slices',
            texture: {
                src: 'assets/captcha/background_mask.png',
            },
            textureSlices: {
                left: 0.3,
                right: 0.3,
                top: 0.2,
                bottom: 0.2,
            },
            color: Color4.fromHexString("#70d4ff"),
        }}
    >
        <UiEntity
            uiTransform={{
                width: uiSeasonCanvasData.progressSourceWidth,
                height: 80 - 22 * 2,
                alignSelf: `center`,
                positionType: 'absolute',
            }}
        /*uiBackground={{
            color: Color4.create(0, 0, 1, 1),
        }}*/

        >
            <UiEntity
                uiTransform={{
                    width: `${getUnlockPercent()}%`,
                    //width: `50%`,
                    height: 40,
                    alignSelf: `center`,
                    margin: { left: -0 }
                }}
                uiBackground={{
                    color: Color4.fromHexString("#fbff4a"),
                    textureMode: 'nine-slices',
                    texture: {
                        src: 'assets/captcha/background_mask.png',
                    },
                    textureSlices: {
                        left: (getUnlockPercent() < 10)? 0.1 : 0.2,
                        right: (getUnlockPercent() < 10)? 0 : 0.3,
                        top: 0.2,
                        bottom: 0.2,
                    },
                }}
            />
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    alignSelf: `center`,
                    positionType: 'absolute',
                }}
                uiText={{
                    value: `<b>${Math.floor(getUnlockPercent())} / ${MAX_INDEX}</b>`,
                    fontSize: 16,
                    color: Color4.Black(),
                    textAlign: 'middle-center',
                }}
            />
        </UiEntity>
    </UiEntity>
)