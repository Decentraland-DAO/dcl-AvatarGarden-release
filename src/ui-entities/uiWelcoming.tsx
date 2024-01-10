import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { openExternalUrl } from "~system/RestrictedActions"

const message = () => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '60px',
            alignSelf: 'center',
        }}
        uiText={{
            value: 'Welcome to the <b>Avatar Garden</b>!',
            color: Color4.White(),
            fontSize: 26,
            textAlign: 'middle-center',
        }}
    /*uiBackground={{
        color: Color4.create(0, 1, 0, 0.1),
    }}*/
    />
)

export const uiWelcomingData = {
    visible: true,
}

export const uiWelcomingComponent = () => (
    <UiEntity
        uiTransform={{
            display: uiWelcomingData.visible ? 'flex' : 'none',
            width: `100%`,
            height: `100%`,
            positionType: 'absolute',
            flexDirection: 'column',
            position: { top: '0%', left: '12%' },
        }}
    /*uiBackground={{
        color: Color4.create(1, 0.2, 0.2, 0.2),
    }}*/
    >

        <UiEntity
            uiTransform={{
                width: 500,
                height: 50,
                alignSelf: `flex-start`,
                margin: { top: 10, left: 80 },
            }}
            uiBackground={{
                color: Color4.create(0.4, 0.4, 0.6, 1),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png',
                },
            }}
        >
            <UiEntity
                uiTransform={{
                    width: `100%`,
                    height: `95%`,
                    alignSelf: `flex-start`,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            /*uiBackground={{
                color: Color4.create(1, 0, 0, 0.2),
            }}*/
            >
                {message()}
            </UiEntity>
        </UiEntity>

    </UiEntity>

)