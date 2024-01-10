import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs"
import { uiGuestCanvasData, position, uiGuestData } from './uiGuest.data'
import { openExternalUrl } from "~system/RestrictedActions"

const message = () => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '60px',
            margin: { top: '6%' },
            alignSelf: 'center',
        }}
        uiText={{
            value: uiGuestData.message(),
            color: Color4.White(),
            fontSize: 26,
            textAlign: 'middle-center', 
        }}
        /*uiBackground={{
            color: Color4.create(0, 1, 0, 0.1),
        }}*/
    />
)

const buttons = ()=> (
    <UiEntity
        uiTransform={{
            width: "75%",
            height: 50,
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
                width: '40%',
                height: "100%",
                alignSelf: 'center',
                positionType: 'relative',
                alignItems: 'center',
            }}
            uiBackground={{
                color: Color4.create(0.8, 0.1, 0.2, 1),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png', 
                },
                textureSlices: {
                    left: 0.2,
                    right: 0.2,
                    top: 0.2,
                    bottom: 0.2
                }
            }}
            uiText={{
                value: "<b>Get a wallet</b>",
                fontSize: 18,
                color: Color4.White(),
            }}
            onMouseDown={() => {
                openExternalUrl({url: "https://metamask.io/"})
            }}
        >
        </UiEntity>
        <UiEntity
            uiTransform={{ 
                width: '40%',
                height:  '100%',
                alignSelf: 'center',
                positionType: 'relative',
                alignItems: 'center',
            }}
            uiBackground={{
                color: Color4.create(0.2, 0.2, 0.25, 1),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png', 
                },
                textureSlices: {
                    left: 0.2,
                    right: 0.2,
                    top: 0.2,
                    bottom: 0.2
                }
            }}
            onMouseDown={() => {
                uiGuestCanvasData.visible = false
            }}
            uiText={{
                value: "<b>Exit</b>",
                fontSize: 18,
                color: Color4.White(),
            }}
        >
        </UiEntity>
    </UiEntity>
)

const close = (
    <UiEntity
            uiTransform={{
                width: 107*0.4,
                height: 107*0.4,
                alignSelf: 'flex-start',
                positionType: 'absolute',
                margin: { left: "100%" },
                position: { top: -107*0.1, right: -107*0.1 }
            }}
            onMouseDown={() => {
                uiGuestCanvasData.visible = false
                
            }}
            uiBackground={{
                texture: {
                    src: "assets/captcha/close.png"
                },
                textureMode: 'nine-slices',
                textureSlices: {
                    left: 1,
                    right: 1,
                    top: 1,
                    bottom: 1
                }
            }}
        />
)

export const uiGuestComponent = () => (
    <UiEntity
        uiTransform={{
            display: (uiGuestCanvasData.visible) ? 'flex' : 'none',
            width: `${uiGuestCanvasData.width}%`,
            height: `${uiGuestCanvasData.height}%`,
            positionType: 'absolute',
            alignSelf: `${uiGuestCanvasData.vAlign}`,
            flexDirection: 'column',
            position: position(uiGuestCanvasData),
        }}
        /*uiBackground={{
            color: Color4.create(1, 0.2, 0.2, 0.2),
        }}*/
    >
        
        <UiEntity
            uiTransform={{
                width: 500,
                height: 350,
                alignSelf: `center`,
            }}
            uiBackground={{
                color: Color4.create(0.4, 0.4, 0.6, 1),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/background_mask.png', 
                },
            }}
        >
            {close}
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
                {buttons()}
            </UiEntity>
        </UiEntity>
        
    </UiEntity>
    
  )