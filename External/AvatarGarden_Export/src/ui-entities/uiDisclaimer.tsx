import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs"
import { openExternalUrl } from "~system/RestrictedActions"


const buttons = () => (
    <UiEntity
        uiTransform={{
            width: "75%",
            height: 40,
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
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/images/ui/PrivacyPolicy_Button_Black.png',
                },
                textureSlices: {
                    left: 0.2,
                    right: 0.2,
                    top: 0.2,
                    bottom: 0.2
                }
            }}
            uiText={{
                value: "<b>Privacy Policy</b>",
                fontSize: 14,
                color: Color4.White(),
                textAlign: 'middle-center',
            }}
            onMouseDown={() => {
                openExternalUrl({ url: "https://polygonalmind.notion.site/Privacy-Policy-63581707cbbf43258ca1a8317ed00dd3" })
                uiDisclaimerData.visible = false
            }}
        >
        </UiEntity>

    </UiEntity>
)


export const uiDisclaimerData = {
    visible: true,
}

export const uiDisclaimerComponent = () => (
    <UiEntity
        uiTransform={{
            display: uiDisclaimerData.visible ? 'flex' : 'none',
            width: `12%`,
            height: `12%`,
            positionType: 'absolute',
            flexDirection: 'column',
            position: { top: '95%', left: '88%' },
        }}
    /*uiBackground={{
        color: Color4.create(1, 0.2, 0.2, 0.2),
    }}*/
    >

        {buttons()}

    </UiEntity>

)