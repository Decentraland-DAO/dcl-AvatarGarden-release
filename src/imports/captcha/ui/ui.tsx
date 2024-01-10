import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs"
import { uiData, uiCanvasData, position } from './ui.data'

const textTitle = (
    <UiEntity
        uiTransform={{
            width: '100%',
            height: '30px',
            margin: { top: '2%' },
            alignSelf: 'center',
        }}
        uiText={{
            value: "Are you a robot?",
            color: Color4.White(),
            fontSize: 16,
            textAlign: 'middle-center', 
        }}
        /*uiBackground={{
            color: Color4.create(0, 1, 0, 0.1),
        }}*/
    />
)

const image = ()=> (
    
    <UiEntity
        uiTransform={{
            width: uiData.captcha?.width || "400px",
            height: uiData.captcha?.height || "200px",
            alignSelf: 'center',
            margin: { top: '1%' },
        }}
        uiBackground={{
            //color: Color4.create(1, 1, 1, 1),
            texture: {
                src: "data:image/png;base64,"+(uiData.captcha?.base64Representation || "")
            },
        }}
    />
 
)

const input = ()=> (
    <UiEntity
        uiTransform={{
            width: "75%",
            height: 40,
            alignSelf: 'flex-end',
            flexDirection: 'column',
            margin: { top: '3%', right: '10%' },
        }}
        /*uiBackground={{
            color: Color4.create(1, 1, 1, 0.2),
        }}*/
        >
        <Input
            uiTransform={{
                width: (568*0.5)-(33+21),
                //width: "90%",
                height: 40,
                alignSelf: 'flex-start',
                positionType: 'absolute',
            }}
            onSubmit={(value) => {
                uiData.inputValue = value
                if(uiData.onSolveClick) uiData.onSolveClick()
            }}
            onChange={(value) => {
                uiData.inputValue = value
            }}
            fontSize = {15}
            placeholder={'Write captcha here'}
            placeholderColor={Color4.Gray()}
            color={Color4.White()}
            uiBackground={{
                color: Color4.Black(),
            }}
        >
        </Input>
        <UiEntity
            uiTransform={{
                width: 568*0.5,
                //width: "100%",
                height: 80,
                alignSelf: 'flex-start',
                positionType: 'absolute',
                position: { top: -20, left: -33 }
            }}
            uiBackground={{
                //color: Color4.create(1, 1, 1, 0.2),
                texture: {
                    src: "assets/captcha/captcha_write2.png"
                },
                textureMode: 'nine-slices',
                textureSlices: {
                    left: 0.2,
                    right: 0.2,
                    top: 0.2,
                    bottom: 0.2
                }
            }}
        >
        </UiEntity>
        <UiEntity
            uiTransform={{ 
                width: '30%',
                height:  '100%',
                alignSelf: 'flex-end',
                positionType: 'relative',
                alignItems: 'center',
            }}
            uiBackground={{
                textureMode: 'nine-slices',
                texture: {
                    src: 'assets/captcha/captcha_resolve.png', 
                },
            }}
            onMouseDown={() => {
                if(uiData.onSolveClick) uiData.onSolveClick()
            }}
            uiText={{
                value: "<b>Resolve</b>",
                fontSize: 18,
                color: Color4.Black(),
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
                uiCanvasData.visible = false
                if(uiData.onCloseClick) uiData.onCloseClick()
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

export const uiCaptchaComponent = () => (
    <UiEntity
        uiTransform={{
            display: (uiCanvasData.visible) ? 'flex' : 'none',
            width: `${uiCanvasData.width}%`,
            height: `${uiCanvasData.height}%`,
            positionType: 'absolute',
            alignSelf: `${uiCanvasData.vAlign}`,
            flexDirection: 'column',
            position: position(uiCanvasData),
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
                color: Color4.create(0, 0.2, 0.2, 1),
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
                    height: `100%`,
                    alignSelf: `center`,
                    position: position({ hAlign: 'center', width: 100}),
                    flexDirection: 'column'
                }}
                /*uiBackground={{
                    color: Color4.create(1, 0, 0, 0.2),
                }}*/
            >
                {textTitle}
                {image()}
                {input()}
            </UiEntity>
        </UiEntity>
        
    </UiEntity>
    
  )
  
  