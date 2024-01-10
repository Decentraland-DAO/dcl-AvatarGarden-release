import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { callbackClickClaim, imageSrc, isMenuVisible, position, uiClaimCanvasData, uiClaimData } from './uiClaim.data'

const message = () => (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '60px',
            margin: { top: '15%' },
            alignSelf: 'center',
        }}
        uiText={{
            value: uiClaimData.message(),
            color: Color4.White(),
            fontSize: 26,
            textAlign: 'middle-center',
        }}
        /*uiBackground={{
            color: Color4.create(0, 1, 0, 0.1),
        }}*/
    />
)

const wearableImg = () => (
    <UiEntity
        uiTransform={{
            width: '30%',
            height: '40%',
            margin: { top: '6%' },
            display: isMenuVisible ? 'flex' : 'none',
            alignSelf: 'center',
        }}
        
        uiBackground={{
            textureMode: 'stretch',
            //color: Color4.White(),
            texture: {
                src: imageSrc, 
                
            },
        }}
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
                value: "<b>Claim</b>",
                fontSize: 18,
                color: Color4.White(),
            }}
            onMouseDown={() => {
                callbackClickClaim()
            }}
        >
        </UiEntity>
    </UiEntity>
)

const close = (
    <UiEntity
        uiTransform={{
            width: 107*0.3,
            height: 107*0.3,
            alignSelf: 'flex-start',
            positionType: 'absolute',
            margin: { left: "100%" },
            position: { top: "3%", right: "3%" }
        }}
        onMouseDown={() => {
            uiClaimCanvasData.visible = false
        }}
        uiBackground={{
            texture: {
                src: "assets/wearableClaim/roundClose.png"
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

export const uiClaimComponent = () => (
    <UiEntity
        uiTransform={{
            display: (uiClaimCanvasData.visible) ? 'flex' : 'none',
            width: `${uiClaimCanvasData.width}%`,
            height: `${uiClaimCanvasData.height}%`,
            positionType: 'absolute',
            alignSelf: `${uiClaimCanvasData.vAlign}`,
            flexDirection: 'column',
            position: position(uiClaimCanvasData),
        }}
        /*uiBackground={{
            color: Color4.create(1, 0.2, 0.2, 0.2),
        }}*/
    >
        
        <UiEntity
            uiTransform={{
                width: "100%",
                height: "100%",
                alignSelf: `center`,
            }}
            uiBackground={{
                //color: Color4.create(0.4, 0.4, 0.6, 1),
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/wearableClaim/WearablePopUp.png', 
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
                uiBackground={{
                    //color: Color4.create(1, 0, 0, 0.2),
                }}
            >
                {message()}
                {wearableImg()}
            </UiEntity>
        </UiEntity>
        
    </UiEntity>
    
  )