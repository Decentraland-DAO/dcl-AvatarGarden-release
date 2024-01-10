import { Entity } from "@dcl/sdk/ecs";
import { getLeaderboardConfig, getLeaderboardData, getLeaderboardNames } from "./leaderboard.data";
import { isPendingRequest, requestScoreList } from "./leaderboard.service";
import { LeaderboardPanel } from "./leaderboardPanel";
import { delay } from "../delay";

export class Leaderboard {
    private panels: LeaderboardPanel[] = []
    private readonly clickCooldown: number = 1000*2
    private bInCooldown: boolean = false
    private static instanceRef: Leaderboard;
    private constructor() { 
      this.initLoadLeaderboards()
    }
    
    // Singleton Instance of the Object
    static instance(): Leaderboard { return this.instanceRef || (this.instanceRef = new this()); }
  
    private async initLoadLeaderboards(){
        const leaderboardNames = getLeaderboardNames()
        for (let i = 0; i < leaderboardNames.length; i++) {
            const config = getLeaderboardConfig(leaderboardNames[i])
            if (config.LOAD_ON_START) {
                await requestScoreList(leaderboardNames[i], 0, function() {Leaderboard.instance().updateAllPanels(leaderboardNames[i])}) 
            }
        }
    }
  
    addLeaderboardPanel(name: string, entityPanel: Entity, entityNext: Entity, entityBack: Entity, entityPages: Entity, title?: string){
        this.panels.push(new LeaderboardPanel(name, entityPanel, entityNext, entityBack, entityPages, title))
    }
    enableAllPanelButtons(name: string, bEnable: boolean){
        this.panels.forEach(panel => {
            if (panel.name == name) {
                panel.enableButtons(bEnable)
            }
        });
    }
    setAllPanelsLoading(name: string){
        this.panels.forEach(panel => {
            if (panel.name == name) {
                panel.setLoadingPanel()
            }
        });
    }
    updateAllPanels(name: string){
        this.panels.forEach(panel => {
            if (panel.name == name) {
                panel.updatePanel()
            }
        });
    }
    nextPage(name: string){
        const scoreData = getLeaderboardData(name)
        let newPage = scoreData.page+1
        if (newPage >= scoreData.nPages) {
            newPage = 0
        }
        this.setPage(name, newPage)
    }
    previousPage(name: string){
        const scoreData = getLeaderboardData(name)
        let newPage = scoreData.page-1
        if (newPage < 0) {
            newPage = scoreData.nPages-1
        }
        this.setPage(name, newPage)
    }
    setPage(name: string, newPage: number){
        //In cooldown or awaiting response
        if (this.bInCooldown || isPendingRequest(name)) {
            return
        }
        //Page not valid
        if(newPage >= getLeaderboardData(name).nPages || newPage < 0){
            return
        }
    
        this.bInCooldown = true
        this.enableAllPanelButtons(name, false)
        delay(() => {
            this.bInCooldown = false
            this.enableAllPanelButtons(name, true)
        }, this.clickCooldown);
        
        this.requestDataAndUpdatePanels(name, newPage)   
      
    }
  
    requestDataAndUpdatePanels(name: string, newPage: number){
        this.setAllPanelsLoading(name)
        requestScoreList(name, newPage, function() {Leaderboard.instance().updateAllPanels(name)}) 
    }
    
  }