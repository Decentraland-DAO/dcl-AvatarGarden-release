import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs"
import { openExternalUrl } from "~system/RestrictedActions"


const buttonPM = () => (
    <UiEntity
        uiTransform={{
            width: 64,
            height: 64,
            alignSelf: 'center',
            flexDirection: 'row',
            margin: { top: '0%' },
            justifyContent: 'space-around',
        }}
    /*uiBackground={{
        color: Color4.create(1, 1, 1, 0.2),
    }}*/
    >

        <UiEntity
            uiTransform={{
                width: '100%',
                height: "100%",
                alignSelf: 'center',
                positionType: 'relative',
                alignItems: 'center',
            }}
            uiBackground={{
                //color: Color4.create(0.8, 0.1, 0.2, 1),
                textureMode: 'stretch',
                texture: {
                    src: 'assets/images/ui/AvatarGarden_UI_SocialMedia_Base.png',
                },
            }}
            onMouseDown={() => {
                openExternalUrl({ url: "https://linktr.ee/polygonalmind" })
            }}
        >
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: "100%",
                    alignSelf: 'center',
                    positionType: 'relative',
                    alignItems: 'center',
                }}
                uiBackground={{
                    //color: Color4.create(0.8, 0.1, 0.2, 1),
                    textureMode: 'stretch',
                    texture: {
                        src: 'assets/images/ui/PM - Symbol Light.png',
                    },
                }}
            >
            </UiEntity>
        </UiEntity>

    </UiEntity>
)

const button100AV = () => (
    <UiEntity
        uiTransform={{
            width: 64,
            height: 64,
            alignSelf: 'center',
            flexDirection: 'row',
            margin: { top: '20%' },
            justifyContent: 'space-around',
        }}
    /*uiBackground={{
        color: Color4.create(1, 1, 1, 0.2),
    }}*/
    >

        <UiEntity
            uiTransform={{
                width: '100%',
                height: "100%",
                alignSelf: 'center',
                positionType: 'relative',
                alignItems: 'center',
            }}
            uiBackground={{
                //color: Color4.create(0.8, 0.1, 0.2, 1),
                textureMode: 'stretch',
                texture: {
                    src: 'assets/images/ui/AvatarGarden_UI_SocialMedia_Base.png',
                },
            }}
            onMouseDown={() => {
                openExternalUrl({ url: "https://www.100avatars.com/es" })
            }}
        >
            <UiEntity
                uiTransform={{
                    width: '80%',
                    height: "80%",
                    alignSelf: 'center',
                    margin: { left: '12%' },
                }}
                uiBackground={{
                    //color: Color4.create(0.8, 0.1, 0.2, 1),
                    textureMode: 'stretch',
                    texture: {
                        src: 'assets/images/ui/logo100av.png',
                    },
                }}
            >
            </UiEntity>
        </UiEntity>

    </UiEntity>
)

export const uiSocialData = {
    visible: true,
}

export const uiSocialComponent = () => (
    <UiEntity
        uiTransform={{
            display: uiSocialData.visible ? 'flex' : 'none',
            width: 64,
            height: 150,
            positionType: 'absolute',
            alignSelf: 'flex-end',
            flexDirection: 'column',
            position: { top: '45%', left: '96.7%' },
        }}
    /*uiBackground={{
        color: Color4.create(1, 0.2, 0.2, 0.2),
    }}*/
    >

        {buttonPM()}
        {button100AV()}

    </UiEntity>

)