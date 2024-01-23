import { ColliderLayer, Entity, InputAction, MeshCollider, PBTextShape, PointerEvents, TextAlignMode, TextShape, Transform, engine } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { addPmPointerDown } from "../components/pointer"
import * as utils from "../../utils"
import { getLeaderboardConfig, getLeaderboardData } from "./leaderboard.data"
import { Score } from "./leaderboard.schema"
import { Leaderboard } from "./leaderboard"
import { addDebugPivot } from "../components/debugPivot"

export class LeaderboardPanel {
    name: string
    panelEntity: Entity
    nextButton: Entity
    previousButton: Entity
    pagesEntity: Entity
    row1: Entity
    row2: Entity
    row3: Entity
    pagesTextShape: PBTextShape
    panelTextShape1: PBTextShape
    panelTextShape2: PBTextShape
    panelTextShape3: PBTextShape
    constructor(name: string, panelEntity: Entity, nextButton: Entity, backButton: Entity, pagesEntity: Entity, title?: string) {
  
        this.name = name
        this.panelEntity = engine.addEntity()
        Transform.create(this.panelEntity, {
            parent: panelEntity,
            rotation: Quaternion.fromEulerDegrees(0,180,-90)
        }) 

        this.previousButton = engine.addEntity()
        Transform.create(this.previousButton, {
            parent: backButton,
        })
        MeshCollider.setBox(this.previousButton, ColliderLayer.CL_POINTER)

        this.nextButton = engine.addEntity()
        Transform.create(this.nextButton, {
            parent: nextButton,
        })
        MeshCollider.setBox(this.nextButton, ColliderLayer.CL_POINTER)
        
        this.pagesEntity = engine.addEntity()
        Transform.create(this.pagesEntity, {
            parent: pagesEntity,
			rotation: Quaternion.fromEulerDegrees(-90,0,180)
        })
		
        addPmPointerDown(this.nextButton, {
            button: InputAction.IA_POINTER,
            hoverText: "Next page",
            maxDistance: 8,
            cb: ()=>{
                Leaderboard.instance().nextPage(this.name)
            }
        })

        addPmPointerDown(this.previousButton, {
            button: InputAction.IA_POINTER,
            hoverText: "Previous page",
            maxDistance: 8,
            cb: ()=>{
                Leaderboard.instance().previousPage(this.name)
            }
        })

        
        const panelTra = Transform.getMutable(this.panelEntity)
        panelTra.position = Vector3.add(panelTra.position, Vector3.create(-1.3,0,0.01))
        //panelTra.rotation = utils.rotate(panelTra.rotation, Vector3.scale(Vector3.Forward(), 90))

        const pagesTra = Transform.getMutable(this.pagesEntity)
        pagesTra.position = Vector3.add(pagesTra.position, Vector3.create(0,0,0))
        //pagesTra.rotation = utils.rotate(pagesTra.rotation, Vector3.scale(Vector3.Up(), 0))
        TextShape.create(this.pagesEntity, {
            text: "1/1",
            fontSize: 2,
            textColor: Color4.White(),
        })

		if(title) {
			const titleEntity = engine.addEntity()
			Transform.create(titleEntity, {
				parent: this.panelEntity,
				position: Vector3.create(0,0.4,0),
				scale: Vector3.scale(Vector3.One(), 0.6)
			})
			//addDebugPivot(titleEntity)
			TextShape.create(titleEntity, {
				text: title,
				fontSize: 4,
				textColor: Color4.White(),
				textAlign: TextAlignMode.TAM_TOP_CENTER
			})
		}

        const rows = engine.addEntity()
        Transform.create(rows, {
            parent: this.panelEntity,
            scale: Vector3.scale(Vector3.One(), 0.6)
        })
        
        this.row1 = engine.addEntity()
        Transform.create(this.row1, {
            parent: rows,
            position: Vector3.create(-1.6,0,0)
        })
        this.row2 = engine.addEntity()
        Transform.create(this.row2, {
            parent: rows,
            position: Vector3.create(0,0,0)
        })
        this.row3 = engine.addEntity()
        Transform.create(this.row3, {
            parent: rows,
            position: Vector3.create(1.75,0,0)
        })

        TextShape.create(this.row1, {
            text: "",
            fontSize: 2,
            textColor: Color4.White(),
            textAlign: TextAlignMode.TAM_TOP_CENTER
        })

        TextShape.create(this.row2, {
            text: "",
            fontSize: 2,
            textColor: Color4.White(),
            textAlign: TextAlignMode.TAM_TOP_CENTER
        })

        TextShape.create(this.row3, {
            text: "",
            fontSize: 2,
            textColor: Color4.White(),
            textAlign: TextAlignMode.TAM_TOP_CENTER
        })
  
        this.updatePanel()
    }
    enableButtons(bEnable: boolean){
        //PointerEvents.getMutable(this.nextButton).pointerEvents[0].eventInfo.maxDistance = (bEnable)? 5 : 0;
        //PointerEvents.getMutable(this.previousButton).pointerEvents[0].eventInfo.maxDistance = (bEnable)? 5 : 0;

        MeshCollider.getMutable(this.nextButton).collisionMask = (bEnable)? ColliderLayer.CL_POINTER : ColliderLayer.CL_NONE;
        MeshCollider.getMutable(this.previousButton).collisionMask = (bEnable)? ColliderLayer.CL_POINTER : ColliderLayer.CL_NONE;
    }
    setLoadingPanel(){
        TextShape.getMutable(this.row1).text = ""
        TextShape.getMutable(this.row2).text = ""
        TextShape.getMutable(this.row3).text = "Loading ....."
    }
    updatePanel(){
      
        const scoreData = getLeaderboardData(this.name)
        const config = getLeaderboardConfig(this.name)

        this.panelTextShape1 = TextShape.getMutable(this.row1)
        this.panelTextShape2 = TextShape.getMutable(this.row2)
        this.panelTextShape3 = TextShape.getMutable(this.row3)
        this.pagesTextShape = TextShape.getMutable(this.pagesEntity)

        this.pagesTextShape.text = (scoreData.page+1)+"/"+scoreData.nPages

        this.panelTextShape1.text = ""
        this.panelTextShape2.text = ""
        this.panelTextShape3.text = ""

        if (scoreData.myScore) {
            this.panelTextShape1.text = (scoreData.myPos+1)+".\n\n"
            this.panelTextShape2.text = scoreData.myScore.username+"\n\n"
            this.panelTextShape3.text = this.getTextFromSortMode(scoreData.myScore.score)+"\n\n"
        }

        this.panelTextShape1.text += "POSITION\n"
        this.panelTextShape2.text += "NAME\n"
        this.panelTextShape3.text += this.getTextTitleFromSortMode()+"\n"
        
        for (let i = 0; i < scoreData.scores.length; i++) {
            this.panelTextShape1.text += ""+(i+1+(config.LIMIT*scoreData.page))+".\n"
            this.panelTextShape2.text += scoreData.scores[i].username+"\n"
            this.panelTextShape3.text += this.getTextFromSortMode(scoreData.scores[i].score)+"\n"
        }
  
    }
  
    private getTextTitleFromSortMode(){
      switch (getLeaderboardData(this.name).scoreSort) {
        case "bestScore":
          return "SCORE"
        case "bestTime":
          return "TIME"
        default:
          return "SCORE"
      }
    }
  
    private getTextFromSortMode(score: Score){
      switch (getLeaderboardData(this.name).scoreSort) {
        case "bestScore":
          return this.getTextScore(score)
        case "bestTime":
          return this.getTextBestTime(score)
        default:
          return this.getTextScore(score)
      }
    }
  
    private getTextBestTime(score: Score){
      if (!score.hasOwnProperty("bestTime")) {
        return ""
      }
      return utils.millisToMinutesAndSecondsAndMilis(score.bestTime*-1)
    }
    private getTextScore(score: Score){
      if (!score.hasOwnProperty("bestScore")) {
        return ""
      }
      return score.bestScore
    }
  }