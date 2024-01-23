import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import * as talkData from "../ui-entities/uiNPCTalk.data"
import { position } from '../imports/captcha/ui/ui.data'

export function npcTalk() {
    return (
        //parent container 
        <UiEntity
            uiTransform={{
                width: '50%',
                height: '35%',
                positionType: 'absolute',
                position: position({ hAlign: 'center', width: 50 }),
                alignSelf: 'flex-end',
                display: talkData.isMenuVisible ? 'flex' : 'none',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        /*uiBackground={{
            color: Color4.Red()
        }}*/
        >
            {/*image bg*/}
            <UiEntity
                uiTransform={{
                    width: 800,
                    height: 280,
                    position: { bottom: '0%', left: '0%' },
                    display: talkData.isMenuVisible ? 'flex' : 'none',
                    alignSelf: 'flex-end',
                }}
                uiBackground={{
                    //color: Color4.Black(),
                    textureMode: 'center',
                    texture: {
                        src: 'assets/images/ui/AvatarGarden_UI_NPC_Base.png',
                    },
                }}
            >
                <Label
                    //NPC name
                    value='<b>Cool Banana</b>'
                    color={Color4.Black()}
                    fontSize={18}
                    font="serif"
                    textAlign="top-left"
                    uiTransform={{
                        width: '100%',
                        height: 'auto',
                        positionType: 'absolute',
                        position: { top: '24%', left: '32%' },
                    }}
                    uiBackground={{
                        //color:Color4.Green()
                    }}
                />
                <Label
                    value={talkData.npcDialog}
                    color={Color4.Black()}
                    fontSize={18}
                    font="serif"
                    textAlign="top-left"
                    uiTransform={{
                        width: '100%',
                        height: 'auto',
                        position: { top: '35%', left: '32%' },
                    }}
                    uiBackground={{
                        //color:Color4.Green()
                    }}
                />
                {/*button Click Next as child of bg*/}
                <UiEntity
                    uiTransform={{
                        width: '30%',
                        height: '60%',
                        alignSelf: 'flex-end',
                        positionType: 'absolute',
                        position: { bottom: '-10%', left: '75%' },
                        display: talkData.isButtonClickVisible ? 'flex' : 'none',
                    }}
                    uiBackground={{
                        textureMode: 'stretch',
                        texture: {
                            src: 'assets/images/ui/AvatarGarden_UI_NPC_Button_Next.png',
                        },
                        //color: Color4.fromHexString("#70ac76ff")
                    }}
                    onMouseDown={() => {
                        talkData.callbackClickNext()
                    }}
                />
                {/*button Yes as child of bg*/}
                <UiEntity
                    uiTransform={{
                        width: '30%',
                        height: '30%',
                        alignSelf: 'flex-end',
                        position: { bottom: '2%', right: '5%' },
                        display: talkData.isButtonYesVisible ? 'flex' : 'none',
                    }}
                    uiBackground={{
                        textureMode: 'stretch',
                        texture: {
                            src: 'assets/images/ui/ANB_UI_Button_02_Text.png',
                        },
                        //color: Color4.fromHexString("#70ac76ff")
                    }}
                    onMouseDown={() => {
                        talkData.resetTalk()
                    }}
                />
                {/*button No as child of bg*/}
                <UiEntity
                    uiTransform={{
                        width: '25%',
                        height: '30%',
                        alignSelf: 'flex-end',
                        positionType: 'absolute',
                        position: { bottom: '2%', right: '27%' },
                        display: talkData.isButtonNoVisible ? 'flex' : 'none',
                    }}
                    uiBackground={{
                        textureMode: 'stretch',
                        texture: {
                            src: 'assets/images/ui/ANB_UI_Button_01_Text.png',
                        },
                        //color: Color4.fromHexString("#70ac76ff")
                    }}
                    onMouseDown={() => {
                        talkData.resetTalk()
                    }}
                />
            </UiEntity>
        </UiEntity>
    )
}
//#region examples
export function rs() {
    return (
        //parent container 
        <UiEntity
            uiTransform={{
                width: 'auto',
                height: 'auto',
                alignSelf: 'center',
                padding: 10,
                positionType: 'absolute',
                position: { top: '75%', left: '31.5%' },
            }}
            uiBackground={{
                //color: Color4.Red(),
            }}
            uiText={{
                value: talkData.npcDialog,
                fontSize: 18,
                textAlign: 'top-left',
            }}
        />
    )
}
export function rs2() {
    return (
        //parent container 
        <UiEntity
            uiTransform={{
                width: '30%',
                height: '10%',
                positionType: 'absolute',
                position: { top: '0%', left: '90%' },
            }}
            uiBackground={{
                color: Color4.Red()
            }}
        >
            {/*image bg*/}
            <UiEntity
                uiTransform={{
                    width: '30%',
                    height: '50%',
                    position: { top: '0%', left: '50%' },
                    display: talkData.isMenuVisible ? 'flex' : 'none',
                    alignSelf: 'center',
                }}
                uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                        src: 'assets/images/ui/scene-thumbnail.png',
                    },
                    //color: Color4.fromHexString("#70ac76ff")
                }}
            />
        </UiEntity>
    )
}
//#endregion