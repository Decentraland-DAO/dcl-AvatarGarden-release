import { TagComponent } from './imports/components/tag';

import { engine, Transform, GltfContainer, Billboard, BillboardMode, MeshRenderer, MeshCollider, Material, MaterialTransparencyMode, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"
import { openExternalUrl } from "~system/RestrictedActions"
import { loadInit } from './init';



// Entity: s0_COG_01 //
const s0_COG_01 = engine.addEntity()
Transform.create(s0_COG_01, {
	position: {x:32,y:0,z:32},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_AG_Bridge_01_Art_01 //
const s0_AG_Bridge_01_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Bridge_01_Art_01, {
	src: "unity_assets/s0_AG_Bridge_01_Art_01.glb",
})
Transform.create(s0_AG_Bridge_01_Art_01, {
	position: {x:0.03999901,y:0,z:0.6360016},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Floor_Grass_Art_01 //
const s0_AG_Floor_Grass_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Floor_Grass_Art_01, {
	src: "unity_assets/s0_AG_Floor_Grass_Art_01.glb",
})
Transform.create(s0_AG_Floor_Grass_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:0.9999,y:1,z:0.9999},
	parent: s0_COG_01
})


// Entity: s0_AG_Vegetation_Art_01 //
const s0_AG_Vegetation_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Vegetation_Art_01, {
	src: "unity_assets/s0_AG_Vegetation_Art_01.glb",
})
Transform.create(s0_AG_Vegetation_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Trees_Art_01 //
const s0_AG_Trees_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Trees_Art_01, {
	src: "unity_assets/s0_AG_Trees_Art_01.glb",
})
Transform.create(s0_AG_Trees_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Mountains_Art_01 //
const s0_AG_Mountains_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Mountains_Art_01, {
	src: "unity_assets/s0_AG_Mountains_Art_01.glb",
})
Transform.create(s0_AG_Mountains_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Campfire_Art_01 //
const s0_AG_Campfire_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Campfire_Art_01, {
	src: "unity_assets/s0_AG_Campfire_Art_01.glb",
})
Transform.create(s0_AG_Campfire_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Leaderboards_Art_01 //
const s0_AG_Leaderboards_Art_01 = engine.addEntity()
Transform.create(s0_AG_Leaderboards_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Leaderboard_Collider_01 //
const s0_Leaderboard_Collider_01 = engine.addEntity()
GltfContainer.create(s0_Leaderboard_Collider_01, {
	src: "unity_assets/s0_Leaderboard_Collider_01.glb",
})
Transform.create(s0_Leaderboard_Collider_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Leaderboards_Art_01
})


// Entity: s0_Leaderboards_01 //
const s0_Leaderboards_01 = engine.addEntity()
GltfContainer.create(s0_Leaderboards_01, {
	src: "unity_assets/s0_Leaderboards_01.glb",
})
Transform.create(s0_Leaderboards_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Leaderboards_Art_01
})


// Entity: s0_Str_Pannel_Ref__1__01 //
const s0_Str_Pannel_Ref__1__01 = engine.addEntity()
TagComponent.create(s0_Str_Pannel_Ref__1__01, {tag: 'panel_text'});
GltfContainer.create(s0_Str_Pannel_Ref__1__01, {
	src: "unity_assets/s0_Str_Pannel_Ref__1__01.glb",
})
Transform.create(s0_Str_Pannel_Ref__1__01, {
	position: {x:-1.547003,y:1.968432,z:2.159515},
	rotation: {x:0,y:0.9401078,z:0,w:-0.3408774},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Pannels_Minigames_Art_01 //
const s0_AG_Pannels_Minigames_Art_01 = engine.addEntity()
Transform.create(s0_AG_Pannels_Minigames_Art_01, {
	position: {x:0.7680016,y:1.326,z:0.2519989},
	rotation: {x:0,y:0.3408774,z:0,w:0.9401078},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Str_Pannel_Colliders_01 //
const s0_Str_Pannel_Colliders_01 = engine.addEntity()
GltfContainer.create(s0_Str_Pannel_Colliders_01, {
	src: "unity_assets/s0_Str_Pannel_Colliders_01.glb",
})
Transform.create(s0_Str_Pannel_Colliders_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Pannels_Minigames_Art_01
})


// Entity: s0_Str_Pannel_Objective_01 //
const s0_Str_Pannel_Objective_01 = engine.addEntity()
TagComponent.create(s0_Str_Pannel_Objective_01, {tag: 'panel_objective_disable'});
GltfContainer.create(s0_Str_Pannel_Objective_01, {
	src: "unity_assets/s0_Str_Pannel_Objective_01.glb",
})
Transform.create(s0_Str_Pannel_Objective_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Pannels_Minigames_Art_01
})


// Entity: s0_Str_Pannel_Ref_01 //
const s0_Str_Pannel_Ref_01 = engine.addEntity()
GltfContainer.create(s0_Str_Pannel_Ref_01, {
	src: "unity_assets/s0_Str_Pannel_Ref_01.glb",
})
Transform.create(s0_Str_Pannel_Ref_01, {
	position: {x:-2.999581,y:0.6424322,z:-0.01951988},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Pannels_Minigames_Art_01
})


// Entity: s0_Str_Pannel_Score_01 //
const s0_Str_Pannel_Score_01 = engine.addEntity()
GltfContainer.create(s0_Str_Pannel_Score_01, {
	src: "unity_assets/s0_Str_Pannel_Score_01.glb",
})
Transform.create(s0_Str_Pannel_Score_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Pannels_Minigames_Art_01
})


// Entity: s0_Str_Pannel_Time_01 //
const s0_Str_Pannel_Time_01 = engine.addEntity()
GltfContainer.create(s0_Str_Pannel_Time_01, {
	src: "unity_assets/s0_Str_Pannel_Time_01.glb",
})
Transform.create(s0_Str_Pannel_Time_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_AG_Pannels_Minigames_Art_01
})


// Entity: s0_AG_Stand_Info_DAO_Art_01 //
const s0_AG_Stand_Info_DAO_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Stand_Info_DAO_Art_01, {
	src: "unity_assets/s0_AG_Stand_Info_DAO_Art_01.glb",
})
Transform.create(s0_AG_Stand_Info_DAO_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Platform_Avatars_Art_01 //
const s0_AG_Platform_Avatars_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Platform_Avatars_Art_01, {
	src: "unity_assets/s0_AG_Platform_Avatars_Art_01.glb",
})
Transform.create(s0_AG_Platform_Avatars_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Platform_Minigames_01 //
const s0_AG_Platform_Minigames_01 = engine.addEntity()
GltfContainer.create(s0_AG_Platform_Minigames_01, {
	src: "unity_assets/s0_AG_Platform_Minigames_01.glb",
})
Transform.create(s0_AG_Platform_Minigames_01, {
	position: {x:0.5994859,y:1.29,z:0.4199165},
	rotation: {x:0,y:0.34088,z:0,w:0.9401069},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_AG_Path_Art_01 //
const s0_AG_Path_Art_01 = engine.addEntity()
GltfContainer.create(s0_AG_Path_Art_01, {
	src: "unity_assets/s0_AG_Path_Art_01.glb",
})
Transform.create(s0_AG_Path_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Str_Information_Board_Art_01 //
const s0_Str_Information_Board_Art_01 = engine.addEntity()
GltfContainer.create(s0_Str_Information_Board_Art_01, {
	src: "unity_assets/s0_Str_Information_Board_Art_01.glb",
})
Transform.create(s0_Str_Information_Board_Art_01, {
	position: {x:-15.56,y:1.08,z:25.59},
	rotation: {x:0,y:0.9745896,z:0,w:-0.2239979},
	scale: {x:0.6,y:0.6,z:0.6},
	parent: s0_COG_01
})


// Entity: s0_Prop_Easel_01_Art_01 //
const s0_Prop_Easel_01_Art_01 = engine.addEntity()
GltfContainer.create(s0_Prop_Easel_01_Art_01, {
	src: "unity_assets/s0_Prop_Easel_01_Art_01.glb",
})
Transform.create(s0_Prop_Easel_01_Art_01, {
	position: {x:4.250275,y:0.662,z:22.08281},
	rotation: {x:0,y:-0.3090768,z:0,w:-0.9510372},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Prop_Palette_Art_01 //
const s0_Prop_Palette_Art_01 = engine.addEntity()
GltfContainer.create(s0_Prop_Palette_Art_01, {
	src: "unity_assets/s0_Prop_Palette_Art_01.glb",
})
Transform.create(s0_Prop_Palette_Art_01, {
	position: {x:4.6612,y:0.7948,z:22.6587},
	rotation: {x:0.04777033,y:0.9975365,z:0.04644253,w:0.02195493},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Prop_Brush_01_Art_01 //
const s0_Prop_Brush_01_Art_01 = engine.addEntity()
GltfContainer.create(s0_Prop_Brush_01_Art_01, {
	src: "unity_assets/s0_Prop_Brush_01_Art_01.glb",
})
Transform.create(s0_Prop_Brush_01_Art_01, {
	position: {x:4.542091,y:1.3467,z:22.31667},
	rotation: {x:0.1761045,y:0.942584,z:0.1241561,w:0.2551629},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_CaptainLobster_Art_01 //
const s0_CaptainLobster_Art_01 = engine.addEntity()
GltfContainer.create(s0_CaptainLobster_Art_01, {
	src: "unity_assets/s0_CaptainLobster_Art_01.glb",
})
Transform.create(s0_CaptainLobster_Art_01, {
	position: {x:11.87,y:0.465,z:27.518},
	rotation: {x:0,y:0.9766669,z:0,w:-0.2147601},
	scale: {x:0.25,y:0.25,z:0.25},
	parent: s0_COG_01
})


// Entity: s0_Rose_Pirate_Art_01 //
const s0_Rose_Pirate_Art_01 = engine.addEntity()
GltfContainer.create(s0_Rose_Pirate_Art_01, {
	src: "unity_assets/s0_Rose_Pirate_Art_01.glb",
})
Transform.create(s0_Rose_Pirate_Art_01, {
	position: {x:1.390999,y:1.07,z:21.127},
	rotation: {x:-0.02884985,y:0.8469768,z:-0.04620593,w:0.5288317},
	scale: {x:0.25,y:0.25,z:0.25},
	parent: s0_COG_01
})


// Entity: s0_Cool_Banana_Art_01 //
const s0_Cool_Banana_Art_01 = engine.addEntity()
GltfContainer.create(s0_Cool_Banana_Art_01, {
	src: "unity_assets/s0_Cool_Banana_Art_01.glb",
})
Transform.create(s0_Cool_Banana_Art_01, {
	position: {x:0.2200012,y:1.035,z:20.64},
	rotation: {x:-0.002228347,y:0.7518276,z:-0.05219463,w:0.6572869},
	scale: {x:0.25,y:0.25,z:0.25},
	parent: s0_COG_01
})


// Entity: s0_Teddy_Art_01 //
const s0_Teddy_Art_01 = engine.addEntity()
GltfContainer.create(s0_Teddy_Art_01, {
	src: "unity_assets/s0_Teddy_Art_01.glb",
})
Transform.create(s0_Teddy_Art_01, {
	position: {x:22.42384,y:0.8199999,z:8.210896},
	rotation: {x:0,y:-0.5381448,z:0,w:0.8428524},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Anchor_Art_01 //
const s0_Anchor_Art_01 = engine.addEntity()
GltfContainer.create(s0_Anchor_Art_01, {
	src: "unity_assets/s0_Anchor_Art_01.glb",
})
Transform.create(s0_Anchor_Art_01, {
	position: {x:15.151,y:15.581,z:-21.119},
	rotation: {x:-0.05216614,y:-0.190054,z:-0.0300245,w:0.9799269},
	scale: {x:0.25,y:0.25,z:0.25},
	parent: s0_COG_01
})


// Entity: s0_Prop_Smartphone_Art_01 //
const s0_Prop_Smartphone_Art_01 = engine.addEntity()
GltfContainer.create(s0_Prop_Smartphone_Art_01, {
	src: "unity_assets/s0_Prop_Smartphone_Art_01.glb",
})
Transform.create(s0_Prop_Smartphone_Art_01, {
	position: {x:-22.67,y:1.278,z:20.82},
	rotation: {x:4.402563E-09,y:0.9949149,z:-0.1007189,w:-4.348911E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Prop_Smartphone_Art__1__01 //
const s0_Prop_Smartphone_Art__1__01 = engine.addEntity()
GltfContainer.create(s0_Prop_Smartphone_Art__1__01, {
	src: "unity_assets/s0_Prop_Smartphone_Art_01.glb",
})
Transform.create(s0_Prop_Smartphone_Art__1__01, {
	position: {x:20.722,y:2.2177,z:19.959},
	rotation: {x:0.09183096,y:0.4086464,z:-0.0413688,w:0.9071184},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Billboards_Art_01 //
const s0_Billboards_Art_01 = engine.addEntity()
Transform.create(s0_Billboards_Art_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_01
})


// Entity: s0_Billboards_Avatars_01 //
const s0_Billboards_Avatars_01 = engine.addEntity()
GltfContainer.create(s0_Billboards_Avatars_01, {
	src: "unity_assets/s0_Billboards_Avatars_01.glb",
})
Transform.create(s0_Billboards_Avatars_01, {
	position: {x:3.57,y:-0.4700003,z:3.92},
	rotation: {x:0,y:0.9951133,z:0,w:-0.09874007},
	scale: {x:1,y:1,z:1},
	parent: s0_Billboards_Art_01
})


// Entity: s0_Billboards_DAO_01 //
const s0_Billboards_DAO_01 = engine.addEntity()
GltfContainer.create(s0_Billboards_DAO_01, {
	src: "unity_assets/s0_Billboards_DAO_01.glb",
})
Transform.create(s0_Billboards_DAO_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_Billboards_Art_01
})


// Entity: s0_NPC_Stand_01 //
const s0_NPC_Stand_01 = engine.addEntity()
GltfContainer.create(s0_NPC_Stand_01, {
	src: "unity_assets/s0_NPC_Stand_01.glb",
})
Transform.create(s0_NPC_Stand_01, {
	position: {x:3.705,y:0.052,z:-2.062},
	rotation: {x:-0.06489944,y:0.9963847,z:0.04213083,w:0.03508099},
	scale: {x:0.39897,y:0.39897,z:0.39897},
	parent: s0_COG_01
})


// Entity: s0_NPC_Stand__1__01 //
const s0_NPC_Stand__1__01 = engine.addEntity()
GltfContainer.create(s0_NPC_Stand__1__01, {
	src: "unity_assets/s0_NPC_Stand__1__01.glb",
})
Transform.create(s0_NPC_Stand__1__01, {
	position: {x:-26.535,y:-0.165,z:30.377},
	rotation: {x:-0.03900035,y:0.9989644,z:-0.02168642,w:-0.008896911},
	scale: {x:0.39897,y:0.3989701,z:0.39897},
	parent: s0_COG_01
})


// Entity: s0_NPC_Stand__2__01 //
const s0_NPC_Stand__2__01 = engine.addEntity()
GltfContainer.create(s0_NPC_Stand__2__01, {
	src: "unity_assets/s0_NPC_Stand__2__01.glb",
})
Transform.create(s0_NPC_Stand__2__01, {
	position: {x:-2.794,y:0.821,z:11.645},
	rotation: {x:-0.01950737,y:0.9988,z:-0.04008728,w:-0.02027188},
	scale: {x:0.39897,y:0.39897,z:0.3989701},
	parent: s0_COG_01
})


// Entity: s0_NPC_Stand__4__01 //
const s0_NPC_Stand__4__01 = engine.addEntity()
GltfContainer.create(s0_NPC_Stand__4__01, {
	src: "unity_assets/s0_NPC_Stand__4__01.glb",
})
Transform.create(s0_NPC_Stand__4__01, {
	position: {x:13.196,y:0.93,z:30.235},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:0.39897,y:0.39897,z:0.39897},
	parent: s0_COG_01
})


// Entity: s0_NPC_Stand__3__01 //
const s0_NPC_Stand__3__01 = engine.addEntity()
GltfContainer.create(s0_NPC_Stand__3__01, {
	src: "unity_assets/s0_NPC_Stand__3__01.glb",
})
Transform.create(s0_NPC_Stand__3__01, {
	position: {x:-24.858,y:1.318,z:-14.929},
	rotation: {x:0.04513783,y:0.9988407,z:-0.01655001,w:0.002433646},
	scale: {x:0.39897,y:0.3989699,z:0.39897},
	parent: s0_COG_01
})


// Entity: s0_Minigame_Mole_01 //
const s0_Minigame_Mole_01 = engine.addEntity()
Transform.create(s0_Minigame_Mole_01, {
	position: {x:30.53,y:1.685268,z:31.74},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_AG_Minigame_Mole_Terrain_Art_01 //
const s0_AG_Minigame_Mole_Terrain_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_Minigame_Mole_Terrain_Art_01, {tag: 'mole_disable'});
GltfContainer.create(s0_AG_Minigame_Mole_Terrain_Art_01, {
	src: "unity_assets/s0_AG_Minigame_Mole_Terrain_Art_01.glb",
})
Transform.create(s0_AG_Minigame_Mole_Terrain_Art_01, {
	position: {x:2.069487,y:-0.3952684,z:0.6799183},
	rotation: {x:0,y:0.34088,z:0,w:0.9401069},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_1_01 //
const s0_Mole_Hole_1_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_1_01, {tag: 'hole_1'});
Transform.create(s0_Mole_Hole_1_01, {
	position: {x:4.849,y:0,z:1.62},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_2_01 //
const s0_Mole_Hole_2_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_2_01, {tag: 'hole_2'});
Transform.create(s0_Mole_Hole_2_01, {
	position: {x:3.8,y:0,z:0.37},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_3_01 //
const s0_Mole_Hole_3_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_3_01, {tag: 'hole_3'});
Transform.create(s0_Mole_Hole_3_01, {
	position: {x:2.75,y:0,z:-0.88},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_4_01 //
const s0_Mole_Hole_4_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_4_01, {tag: 'hole_4'});
Transform.create(s0_Mole_Hole_4_01, {
	position: {x:1.7,y:0,z:-2.14},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_5_01 //
const s0_Mole_Hole_5_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_5_01, {tag: 'hole_5'});
Transform.create(s0_Mole_Hole_5_01, {
	position: {x:3.669,y:0,z:2.609998},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_6_01 //
const s0_Mole_Hole_6_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_6_01, {tag: 'hole_6'});
Transform.create(s0_Mole_Hole_6_01, {
	position: {x:2.62,y:0,z:1.36},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_7_01 //
const s0_Mole_Hole_7_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_7_01, {tag: 'hole_7'});
Transform.create(s0_Mole_Hole_7_01, {
	position: {x:1.57,y:0,z:0.1099979},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_8_01 //
const s0_Mole_Hole_8_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_8_01, {tag: 'hole_8'});
Transform.create(s0_Mole_Hole_8_01, {
	position: {x:0.5199997,y:0,z:-1.150002},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_9_01 //
const s0_Mole_Hole_9_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_9_01, {tag: 'hole_9'});
Transform.create(s0_Mole_Hole_9_01, {
	position: {x:2.54,y:0,z:3.56},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_10_01 //
const s0_Mole_Hole_10_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_10_01, {tag: 'hole_10'});
Transform.create(s0_Mole_Hole_10_01, {
	position: {x:1.490998,y:0,z:2.310001},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_11_01 //
const s0_Mole_Hole_11_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_11_01, {tag: 'hole_11'});
Transform.create(s0_Mole_Hole_11_01, {
	position: {x:0.4409981,y:0,z:1.059999},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Mole_Hole_12_01 //
const s0_Mole_Hole_12_01 = engine.addEntity()
TagComponent.create(s0_Mole_Hole_12_01, {tag: 'hole_12'});
Transform.create(s0_Mole_Hole_12_01, {
	position: {x:-0.6090019,y:0,z:-0.2000015},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1},
	parent: s0_Minigame_Mole_01
})


// Entity: s0_Showcase_Position_01 //
const s0_Showcase_Position_01 = engine.addEntity()
TagComponent.create(s0_Showcase_Position_01, {tag: 'showcase'});
Transform.create(s0_Showcase_Position_01, {
	position: {x:49.145,y:3.961,z:15.519},
	rotation: {x:0,y:-0.3826819,z:0,w:0.9238802},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Panel_Objective_01 //
const s0_Panel_Objective_01 = engine.addEntity()
TagComponent.create(s0_Panel_Objective_01, {tag: 'panel_objective'});
Transform.create(s0_Panel_Objective_01, {
	position: {x:35.288,y:2.492,z:30.199},
	rotation: {x:-0.346474,y:-0.3895223,z:-0.1622597,w:0.8377947},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Panel_Timer_01 //
const s0_Panel_Timer_01 = engine.addEntity()
TagComponent.create(s0_Panel_Timer_01, {tag: 'panel_timer'});
Transform.create(s0_Panel_Timer_01, {
	position: {x:36.608,y:2.337,z:32.001},
	rotation: {x:-0.346474,y:-0.3895223,z:-0.1622597,w:0.8377947},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Panel_Score_01 //
const s0_Panel_Score_01 = engine.addEntity()
TagComponent.create(s0_Panel_Score_01, {tag: 'panel_score'});
Transform.create(s0_Panel_Score_01, {
	position: {x:33.689,y:2.346,z:28.533},
	rotation: {x:-0.346474,y:-0.3895223,z:-0.1622597,w:0.8377947},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Minigames_Floor_01 //
const s0_Minigames_Floor_01 = engine.addEntity()
TagComponent.create(s0_Minigames_Floor_01, {tag: 'minigames_floor'});
Transform.create(s0_Minigames_Floor_01, {
	position: {x:32.64828,y:1.691377,z:32.47607},
	rotation: {x:0,y:-0.9396926,z:0,w:0.3420202},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_NPC_Position_1_01 //
const s0_NPC_Position_1_01 = engine.addEntity()
TagComponent.create(s0_NPC_Position_1_01, {tag: 'npc_1'});
Transform.create(s0_NPC_Position_1_01, {
	position: {x:12.01985,y:2.12,z:55.62341},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_AG_BillboardText_01_Art_01 //
const s0_AG_BillboardText_01_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_BillboardText_01_Art_01, {tag: 'thoughts_01'});
GltfContainer.create(s0_AG_BillboardText_01_Art_01, {
	src: "unity_assets/s0_AG_BillboardText_01_Art_01.glb",
})
Billboard.create(s0_AG_BillboardText_01_Art_01, {
	billboardMode: BillboardMode.BM_Y,
})
Transform.create(s0_AG_BillboardText_01_Art_01, {
	position: {x:0,y:-0.06999993,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_NPC_Position_1_01
})


// Entity: s0_AG_BillboardText_02_Art_01 //
const s0_AG_BillboardText_02_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_BillboardText_02_Art_01, {tag: 'thoughts_02'});
GltfContainer.create(s0_AG_BillboardText_02_Art_01, {
	src: "unity_assets/s0_AG_BillboardText_02_Art_01.glb",
})
Billboard.create(s0_AG_BillboardText_02_Art_01, {
	billboardMode: BillboardMode.BM_Y,
})
Transform.create(s0_AG_BillboardText_02_Art_01, {
	position: {x:0,y:-0.06999993,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_NPC_Position_1_01
})


// Entity: s0_AG_BillboardText_03_Art_01 //
const s0_AG_BillboardText_03_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_BillboardText_03_Art_01, {tag: 'thoughts_03'});
GltfContainer.create(s0_AG_BillboardText_03_Art_01, {
	src: "unity_assets/s0_AG_BillboardText_03_Art_01.glb",
})
Billboard.create(s0_AG_BillboardText_03_Art_01, {
	billboardMode: BillboardMode.BM_Y,
})
Transform.create(s0_AG_BillboardText_03_Art_01, {
	position: {x:0,y:-0.06999993,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_NPC_Position_1_01
})


// Entity: s0_AG_BillboardText_04_Art_01 //
const s0_AG_BillboardText_04_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_BillboardText_04_Art_01, {tag: 'thoughts_04'});
GltfContainer.create(s0_AG_BillboardText_04_Art_01, {
	src: "unity_assets/s0_AG_BillboardText_04_Art_01.glb",
})
Billboard.create(s0_AG_BillboardText_04_Art_01, {
	billboardMode: BillboardMode.BM_Y,
})
Transform.create(s0_AG_BillboardText_04_Art_01, {
	position: {x:0,y:-0.06999993,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_NPC_Position_1_01
})


// Entity: s0_AG_BillboardText_05_Art_01 //
const s0_AG_BillboardText_05_Art_01 = engine.addEntity()
TagComponent.create(s0_AG_BillboardText_05_Art_01, {tag: 'thoughts_05'});
GltfContainer.create(s0_AG_BillboardText_05_Art_01, {
	src: "unity_assets/s0_AG_BillboardText_05_Art_01.glb",
})
Billboard.create(s0_AG_BillboardText_05_Art_01, {
	billboardMode: BillboardMode.BM_Y,
})
Transform.create(s0_AG_BillboardText_05_Art_01, {
	position: {x:0,y:-0.06999993,z:0},
	rotation: {x:0,y:1,z:0,w:-4.371139E-08},
	scale: {x:1,y:1,z:1},
	parent: s0_NPC_Position_1_01
})


// Entity: s0_NPC_Position_2_01 //
const s0_NPC_Position_2_01 = engine.addEntity()
TagComponent.create(s0_NPC_Position_2_01, {tag: 'npc_2'});
Transform.create(s0_NPC_Position_2_01, {
	position: {x:42.5509,y:3.516324,z:24.07088},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_NPC_Position_3_01 //
const s0_NPC_Position_3_01 = engine.addEntity()
TagComponent.create(s0_NPC_Position_3_01, {tag: 'npc_3'});
Transform.create(s0_NPC_Position_3_01, {
	position: {x:35.70526,y:2.582346,z:36.67261},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Leaderboard_1_01 //
const s0_Leaderboard_1_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_1_01, {tag: 'leaderboard_1'});
Transform.create(s0_Leaderboard_1_01, {
	position: {x:13.358,y:4.788408,z:4.996037},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Leaderboard_Board_01 //
const s0_Leaderboard_Board_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Board_01, {tag: 'leaderboard_board'});
Transform.create(s0_Leaderboard_Board_01, {
	position: {x:-0.02482796,y:-0.1286345,z:-0.004768848},
	rotation: {x:0.01743901,y:-0.01743901,z:-0.7068917,w:0.7068917},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_1_01
})


// Entity: s0_Leaderboard_Prev_03 //
const s0_Leaderboard_Prev_03 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Prev_03, {tag: 'leaderboard_prev'});
Transform.create(s0_Leaderboard_Prev_03, {
	position: {x:0.5684643,y:-1.490125,z:0.07545614},
	rotation: {x:-0.7068127,y:-0.02038942,z:-0.02038942,w:0.7068127},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_1_01
})


// Entity: s0_Leaderboard_Pages_01 //
const s0_Leaderboard_Pages_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Pages_01, {tag: 'leaderboard_pages'});
Transform.create(s0_Leaderboard_Pages_01, {
	position: {x:-0.053,y:-1.490125,z:0.04},
	rotation: {x:-0.7068127,y:-0.02038942,z:-0.02038942,w:0.7068127},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_1_01
})


// Entity: s0_Leaderboard_Next_02 //
const s0_Leaderboard_Next_02 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Next_02, {tag: 'leaderboard_next'});
Transform.create(s0_Leaderboard_Next_02, {
	position: {x:-0.6536465,y:-1.490125,z:0.004891872},
	rotation: {x:-0.7068127,y:-0.02038942,z:-0.02038942,w:0.7068127},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_1_01
})


// Entity: s0_Leaderboard_2_01 //
const s0_Leaderboard_2_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_2_01, {tag: 'leaderboard_2'});
Transform.create(s0_Leaderboard_2_01, {
	position: {x:7.55,y:4.788408,z:6.83},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Leaderboard_Board_02 //
const s0_Leaderboard_Board_02 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Board_02, {tag: 'leaderboard_board'});
Transform.create(s0_Leaderboard_Board_02, {
	position: {x:-0.05477619,y:-0.1286345,z:0.09773827},
	rotation: {x:-0.2646535,y:0.2646535,z:-0.6557122,w:0.6557122},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_2_01
})


// Entity: s0_Leaderboard_Prev_01 //
const s0_Leaderboard_Prev_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Prev_01, {tag: 'leaderboard_prev'});
Transform.create(s0_Leaderboard_Prev_01, {
	position: {x:0.4451208,y:-1.490125,z:-0.3060551},
	rotation: {x:-0.6532815,y:0.2705981,z:0.2705981,w:0.6532815},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_2_01
})


// Entity: s0_Leaderboard_Pages_03 //
const s0_Leaderboard_Pages_03 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Pages_03, {tag: 'leaderboard_pages'});
Transform.create(s0_Leaderboard_Pages_03, {
	position: {x:0.026,y:-1.490125,z:0.113},
	rotation: {x:-0.6532815,y:0.2705981,z:0.2705981,w:0.6532815},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_2_01
})


// Entity: s0_Leaderboard_Next_03 //
const s0_Leaderboard_Next_03 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Next_03, {tag: 'leaderboard_next'});
Transform.create(s0_Leaderboard_Next_03, {
	position: {x:-0.4204836,y:-1.490125,z:0.5595493},
	rotation: {x:-0.6532815,y:0.2705981,z:0.2705981,w:0.6532815},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_2_01
})


// Entity: s0_Leaderboard_3_01 //
const s0_Leaderboard_3_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_3_01, {tag: 'leaderboard_3'});
Transform.create(s0_Leaderboard_3_01, {
	position: {x:5.31,y:4.788408,z:12.6},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Leaderboard_Board_03 //
const s0_Leaderboard_Board_03 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Board_03, {tag: 'leaderboard_board'});
Transform.create(s0_Leaderboard_Board_03, {
	position: {x:-0.2697091,y:-0.3379183,z:0.001176834},
	rotation: {x:-0.4909363,y:0.4909363,z:-0.5089023,w:0.5089023},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_3_01
})


// Entity: s0_Leaderboard_Prev_02 //
const s0_Leaderboard_Prev_02 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Prev_02, {tag: 'leaderboard_prev'});
Transform.create(s0_Leaderboard_Prev_02, {
	position: {x:-0.2002912,y:-1.688805,z:-0.6219902},
	rotation: {x:-0.5105571,y:0.4892152,z:0.4892152,w:0.5105571},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_3_01
})


// Entity: s0_Leaderboard_Pages_02 //
const s0_Leaderboard_Pages_02 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Pages_02, {tag: 'leaderboard_pages'});
Transform.create(s0_Leaderboard_Pages_02, {
	position: {x:-0.227,y:-1.688805,z:-0.005},
	rotation: {x:-0.5105571,y:0.4892152,z:0.4892152,w:0.5105571},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_3_01
})


// Entity: s0_Leaderboard_Next_01 //
const s0_Leaderboard_Next_01 = engine.addEntity()
TagComponent.create(s0_Leaderboard_Next_01, {tag: 'leaderboard_next'});
Transform.create(s0_Leaderboard_Next_01, {
	position: {x:-0.2525296,y:-1.688805,z:0.6010437},
	rotation: {x:-0.5105571,y:0.4892152,z:0.4892152,w:0.5105571},
	scale: {x:1,y:1,z:1},
	parent: s0_Leaderboard_3_01
})


// Entity: s0_COG_Thumbnails_01 //
const s0_COG_Thumbnails_01 = engine.addEntity()
Transform.create(s0_COG_Thumbnails_01, {
	position: {x:0,y:0,z:0},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Avatar_001__01 //
const s0_Avatar_001__01 = engine.addEntity()
TagComponent.create(s0_Avatar_001__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_001__01, {
	position: {x:50.38,y:10.642,z:33.87},
	rotation: {x:0,y:0.8961485,z:0,w:-0.4437542},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_002__01 //
const s0_Avatar_002__01 = engine.addEntity()
TagComponent.create(s0_Avatar_002__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_002__01, {
	position: {x:51.28428,y:10.642,z:32.66699},
	rotation: {x:0,y:0.8860669,z:0,w:-0.4635575},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_003__01 //
const s0_Avatar_003__01 = engine.addEntity()
TagComponent.create(s0_Avatar_003__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_003__01, {
	position: {x:52.10968,y:10.642,z:31.38421},
	rotation: {x:0,y:0.8704263,z:0,w:-0.4922988},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_004__01 //
const s0_Avatar_004__01 = engine.addEntity()
TagComponent.create(s0_Avatar_004__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_004__01, {
	position: {x:52.89537,y:10.642,z:30.05635},
	rotation: {x:0,y:0.8518916,z:0,w:-0.5237182},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_005__01 //
const s0_Avatar_005__01 = engine.addEntity()
TagComponent.create(s0_Avatar_005__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_005__01, {
	position: {x:53.611,y:10.642,z:28.67366},
	rotation: {x:0,y:0.8317196,z:0,w:-0.5551959},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_006__01 //
const s0_Avatar_006__01 = engine.addEntity()
TagComponent.create(s0_Avatar_006__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_006__01, {
	position: {x:54.23207,y:10.642,z:27.21663},
	rotation: {x:0,y:0.8052942,z:0,w:-0.5928754},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_007__01 //
const s0_Avatar_007__01 = engine.addEntity()
TagComponent.create(s0_Avatar_007__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_007__01, {
	position: {x:54.70356,y:10.642,z:25.66107},
	rotation: {x:0,y:0.785769,z:0,w:-0.6185201},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_008__01 //
const s0_Avatar_008__01 = engine.addEntity()
TagComponent.create(s0_Avatar_008__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_008__01, {
	position: {x:55.03498,y:10.642,z:24.10115},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_009__01 //
const s0_Avatar_009__01 = engine.addEntity()
TagComponent.create(s0_Avatar_009__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_009__01, {
	position: {x:55.17669,y:10.642,z:22.51517},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_010__01 //
const s0_Avatar_010__01 = engine.addEntity()
TagComponent.create(s0_Avatar_010__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_010__01, {
	position: {x:55.2531,y:10.642,z:20.91371},
	rotation: {x:0,y:0.7151179,z:0,w:-0.6990039},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_011__01 //
const s0_Avatar_011__01 = engine.addEntity()
TagComponent.create(s0_Avatar_011__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_011__01, {
	position: {x:50.38,y:9.142,z:33.87},
	rotation: {x:0,y:0.8961485,z:0,w:-0.4437542},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_012__01 //
const s0_Avatar_012__01 = engine.addEntity()
TagComponent.create(s0_Avatar_012__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_012__01, {
	position: {x:51.28428,y:9.142,z:32.66699},
	rotation: {x:0,y:0.8860669,z:0,w:-0.4635575},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_013__01 //
const s0_Avatar_013__01 = engine.addEntity()
TagComponent.create(s0_Avatar_013__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_013__01, {
	position: {x:52.10968,y:9.142,z:31.38421},
	rotation: {x:0,y:0.8704263,z:0,w:-0.4922988},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_014__01 //
const s0_Avatar_014__01 = engine.addEntity()
TagComponent.create(s0_Avatar_014__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_014__01, {
	position: {x:52.89537,y:9.142,z:30.05635},
	rotation: {x:0,y:0.8518916,z:0,w:-0.5237182},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_015__01 //
const s0_Avatar_015__01 = engine.addEntity()
TagComponent.create(s0_Avatar_015__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_015__01, {
	position: {x:53.611,y:9.142,z:28.67366},
	rotation: {x:0,y:0.8317196,z:0,w:-0.5551959},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_016__01 //
const s0_Avatar_016__01 = engine.addEntity()
TagComponent.create(s0_Avatar_016__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_016__01, {
	position: {x:54.23207,y:9.142,z:27.21663},
	rotation: {x:0,y:0.8052942,z:0,w:-0.5928754},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_017__01 //
const s0_Avatar_017__01 = engine.addEntity()
TagComponent.create(s0_Avatar_017__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_017__01, {
	position: {x:54.70356,y:9.142,z:25.66107},
	rotation: {x:0,y:0.785769,z:0,w:-0.6185201},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_018__01 //
const s0_Avatar_018__01 = engine.addEntity()
TagComponent.create(s0_Avatar_018__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_018__01, {
	position: {x:55.03498,y:9.142,z:24.10115},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_019__01 //
const s0_Avatar_019__01 = engine.addEntity()
TagComponent.create(s0_Avatar_019__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_019__01, {
	position: {x:55.17669,y:9.142,z:22.51517},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_020__01 //
const s0_Avatar_020__01 = engine.addEntity()
TagComponent.create(s0_Avatar_020__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_020__01, {
	position: {x:55.2531,y:9.142,z:20.91371},
	rotation: {x:0,y:0.7151179,z:0,w:-0.6990039},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_021__01 //
const s0_Avatar_021__01 = engine.addEntity()
TagComponent.create(s0_Avatar_021__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_021__01, {
	position: {x:50.38,y:7.642001,z:33.87},
	rotation: {x:0,y:0.8961485,z:0,w:-0.4437542},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_022__01 //
const s0_Avatar_022__01 = engine.addEntity()
TagComponent.create(s0_Avatar_022__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_022__01, {
	position: {x:51.28428,y:7.642001,z:32.66699},
	rotation: {x:0,y:0.8860669,z:0,w:-0.4635575},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_023__01 //
const s0_Avatar_023__01 = engine.addEntity()
TagComponent.create(s0_Avatar_023__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_023__01, {
	position: {x:52.10968,y:7.642001,z:31.38421},
	rotation: {x:0,y:0.8704263,z:0,w:-0.4922988},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_024__01 //
const s0_Avatar_024__01 = engine.addEntity()
TagComponent.create(s0_Avatar_024__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_024__01, {
	position: {x:52.89537,y:7.642001,z:30.05635},
	rotation: {x:0,y:0.8518916,z:0,w:-0.5237182},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_025__01 //
const s0_Avatar_025__01 = engine.addEntity()
TagComponent.create(s0_Avatar_025__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_025__01, {
	position: {x:53.611,y:7.642001,z:28.67366},
	rotation: {x:0,y:0.8317196,z:0,w:-0.5551959},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_026__01 //
const s0_Avatar_026__01 = engine.addEntity()
TagComponent.create(s0_Avatar_026__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_026__01, {
	position: {x:54.23207,y:7.642001,z:27.21663},
	rotation: {x:0,y:0.8052942,z:0,w:-0.5928754},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_027__01 //
const s0_Avatar_027__01 = engine.addEntity()
TagComponent.create(s0_Avatar_027__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_027__01, {
	position: {x:54.70356,y:7.642001,z:25.66107},
	rotation: {x:0,y:0.785769,z:0,w:-0.6185201},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_028__01 //
const s0_Avatar_028__01 = engine.addEntity()
TagComponent.create(s0_Avatar_028__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_028__01, {
	position: {x:55.03498,y:7.642001,z:24.10115},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_029__01 //
const s0_Avatar_029__01 = engine.addEntity()
TagComponent.create(s0_Avatar_029__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_029__01, {
	position: {x:55.17669,y:7.642001,z:22.51517},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_030__01 //
const s0_Avatar_030__01 = engine.addEntity()
TagComponent.create(s0_Avatar_030__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_030__01, {
	position: {x:55.2531,y:7.642001,z:20.91371},
	rotation: {x:0,y:0.7151179,z:0,w:-0.6990039},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_031__01 //
const s0_Avatar_031__01 = engine.addEntity()
TagComponent.create(s0_Avatar_031__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_031__01, {
	position: {x:50.38,y:6.142,z:33.87},
	rotation: {x:0,y:0.8961485,z:0,w:-0.4437542},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_032__01 //
const s0_Avatar_032__01 = engine.addEntity()
TagComponent.create(s0_Avatar_032__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_032__01, {
	position: {x:51.28428,y:6.142,z:32.66699},
	rotation: {x:0,y:0.8860669,z:0,w:-0.4635575},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_033__01 //
const s0_Avatar_033__01 = engine.addEntity()
TagComponent.create(s0_Avatar_033__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_033__01, {
	position: {x:52.10968,y:6.142,z:31.38421},
	rotation: {x:0,y:0.8704263,z:0,w:-0.4922988},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_034__01 //
const s0_Avatar_034__01 = engine.addEntity()
TagComponent.create(s0_Avatar_034__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_034__01, {
	position: {x:52.89537,y:6.142,z:30.05635},
	rotation: {x:0,y:0.8518916,z:0,w:-0.5237182},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_035__01 //
const s0_Avatar_035__01 = engine.addEntity()
TagComponent.create(s0_Avatar_035__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_035__01, {
	position: {x:53.611,y:6.142,z:28.67366},
	rotation: {x:0,y:0.8317196,z:0,w:-0.5551959},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_036__01 //
const s0_Avatar_036__01 = engine.addEntity()
TagComponent.create(s0_Avatar_036__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_036__01, {
	position: {x:54.23207,y:6.142,z:27.21663},
	rotation: {x:0,y:0.8052942,z:0,w:-0.5928754},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_037__01 //
const s0_Avatar_037__01 = engine.addEntity()
TagComponent.create(s0_Avatar_037__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_037__01, {
	position: {x:54.70356,y:6.142,z:25.66107},
	rotation: {x:0,y:0.785769,z:0,w:-0.6185201},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_038__01 //
const s0_Avatar_038__01 = engine.addEntity()
TagComponent.create(s0_Avatar_038__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_038__01, {
	position: {x:55.03498,y:6.142,z:24.10115},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_039__01 //
const s0_Avatar_039__01 = engine.addEntity()
TagComponent.create(s0_Avatar_039__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_039__01, {
	position: {x:55.17669,y:6.142,z:22.51517},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_040__01 //
const s0_Avatar_040__01 = engine.addEntity()
TagComponent.create(s0_Avatar_040__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_040__01, {
	position: {x:55.2531,y:6.142,z:20.91371},
	rotation: {x:0,y:0.7151179,z:0,w:-0.6990039},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_041__01 //
const s0_Avatar_041__01 = engine.addEntity()
TagComponent.create(s0_Avatar_041__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_041__01, {
	position: {x:50.38,y:4.642,z:33.87},
	rotation: {x:0,y:0.8961485,z:0,w:-0.4437542},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_042__01 //
const s0_Avatar_042__01 = engine.addEntity()
TagComponent.create(s0_Avatar_042__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_042__01, {
	position: {x:51.28428,y:4.642,z:32.66699},
	rotation: {x:0,y:0.8860669,z:0,w:-0.4635575},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_043__01 //
const s0_Avatar_043__01 = engine.addEntity()
TagComponent.create(s0_Avatar_043__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_043__01, {
	position: {x:52.10968,y:4.642,z:31.38421},
	rotation: {x:0,y:0.8704263,z:0,w:-0.4922988},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_044__01 //
const s0_Avatar_044__01 = engine.addEntity()
TagComponent.create(s0_Avatar_044__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_044__01, {
	position: {x:52.89537,y:4.642,z:30.05635},
	rotation: {x:0,y:0.8518916,z:0,w:-0.5237182},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_045__01 //
const s0_Avatar_045__01 = engine.addEntity()
TagComponent.create(s0_Avatar_045__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_045__01, {
	position: {x:53.611,y:4.642,z:28.67366},
	rotation: {x:0,y:0.8317196,z:0,w:-0.5551959},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_046__01 //
const s0_Avatar_046__01 = engine.addEntity()
TagComponent.create(s0_Avatar_046__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_046__01, {
	position: {x:54.23207,y:4.642,z:27.21663},
	rotation: {x:0,y:0.8052942,z:0,w:-0.5928754},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_047__01 //
const s0_Avatar_047__01 = engine.addEntity()
TagComponent.create(s0_Avatar_047__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_047__01, {
	position: {x:54.70356,y:4.642,z:25.66107},
	rotation: {x:0,y:0.785769,z:0,w:-0.6185201},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_048__01 //
const s0_Avatar_048__01 = engine.addEntity()
TagComponent.create(s0_Avatar_048__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_048__01, {
	position: {x:55.03498,y:4.642,z:24.10115},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_049__01 //
const s0_Avatar_049__01 = engine.addEntity()
TagComponent.create(s0_Avatar_049__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_049__01, {
	position: {x:55.17669,y:4.642,z:22.51517},
	rotation: {x:0,y:0.7586846,z:0,w:-0.651458},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_050__01 //
const s0_Avatar_050__01 = engine.addEntity()
TagComponent.create(s0_Avatar_050__01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_050__01, {
	position: {x:55.2531,y:4.642,z:20.91371},
	rotation: {x:0,y:0.7151179,z:0,w:-0.6990039},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_051_01 //
const s0_Avatar_051_01 = engine.addEntity()
TagComponent.create(s0_Avatar_051_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_051_01, {
	position: {x:42.25,y:9.69,z:8},
	rotation: {x:0,y:-0.001859332,z:0,w:0.9999983},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_052_01 //
const s0_Avatar_052_01 = engine.addEntity()
TagComponent.create(s0_Avatar_052_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_052_01, {
	position: {x:40.74504,y:9.69,z:8.005334},
	rotation: {x:0,y:0.02036157,z:0,w:0.9997927},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_053_01 //
const s0_Avatar_053_01 = engine.addEntity()
TagComponent.create(s0_Avatar_053_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_053_01, {
	position: {x:39.2238,y:9.69,z:8.110607},
	rotation: {x:0,y:0.0530607,z:0,w:0.9985913},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_054_01 //
const s0_Avatar_054_01 = engine.addEntity()
TagComponent.create(s0_Avatar_054_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_054_01, {
	position: {x:37.69078,y:9.69,z:8.285837},
	rotation: {x:0,y:0.08944696,z:0,w:0.9959916},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_055_01 //
const s0_Avatar_055_01 = engine.addEntity()
TagComponent.create(s0_Avatar_055_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_055_01, {
	position: {x:36.1597,y:9.69,z:8.67},
	rotation: {x:0,y:0.1266146,z:0,w:0.991952},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_056_01 //
const s0_Avatar_056_01 = engine.addEntity()
TagComponent.create(s0_Avatar_056_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_056_01, {
	position: {x:34.62109,y:9.69,z:9.124},
	rotation: {x:0,y:0.1721205,z:0,w:0.9850759},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_057_01 //
const s0_Avatar_057_01 = engine.addEntity()
TagComponent.create(s0_Avatar_057_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_057_01, {
	position: {x:33.09496,y:9.69,z:9.75},
	rotation: {x:0,y:0.2037769,z:0,w:0.9790174},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_058_01 //
const s0_Avatar_058_01 = engine.addEntity()
TagComponent.create(s0_Avatar_058_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_058_01, {
	position: {x:31.68,y:9.69,z:10.45},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_059_01 //
const s0_Avatar_059_01 = engine.addEntity()
TagComponent.create(s0_Avatar_059_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_059_01, {
	position: {x:30.37,y:9.69,z:11.18},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_060_01 //
const s0_Avatar_060_01 = engine.addEntity()
TagComponent.create(s0_Avatar_060_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_060_01, {
	position: {x:29.12,y:9.69,z:12},
	rotation: {x:0,y:0.3073057,z:0,w:0.9516109},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_061_01 //
const s0_Avatar_061_01 = engine.addEntity()
TagComponent.create(s0_Avatar_061_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_061_01, {
	position: {x:42.25,y:8.19,z:8},
	rotation: {x:0,y:-0.001859332,z:0,w:0.9999983},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_062_01 //
const s0_Avatar_062_01 = engine.addEntity()
TagComponent.create(s0_Avatar_062_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_062_01, {
	position: {x:40.74504,y:8.19,z:8.005334},
	rotation: {x:0,y:0.02036157,z:0,w:0.9997927},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_063_01 //
const s0_Avatar_063_01 = engine.addEntity()
TagComponent.create(s0_Avatar_063_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_063_01, {
	position: {x:39.2238,y:8.19,z:8.110607},
	rotation: {x:0,y:0.0530607,z:0,w:0.9985913},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_064_01 //
const s0_Avatar_064_01 = engine.addEntity()
TagComponent.create(s0_Avatar_064_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_064_01, {
	position: {x:37.69078,y:8.19,z:8.285837},
	rotation: {x:0,y:0.08944696,z:0,w:0.9959916},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_065_01 //
const s0_Avatar_065_01 = engine.addEntity()
TagComponent.create(s0_Avatar_065_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_065_01, {
	position: {x:36.1597,y:8.19,z:8.67},
	rotation: {x:0,y:0.1266146,z:0,w:0.991952},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_066_01 //
const s0_Avatar_066_01 = engine.addEntity()
TagComponent.create(s0_Avatar_066_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_066_01, {
	position: {x:34.62109,y:8.19,z:9.124},
	rotation: {x:0,y:0.1721205,z:0,w:0.9850759},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_067_01 //
const s0_Avatar_067_01 = engine.addEntity()
TagComponent.create(s0_Avatar_067_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_067_01, {
	position: {x:33.09496,y:8.19,z:9.75},
	rotation: {x:0,y:0.2037769,z:0,w:0.9790174},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_068_01 //
const s0_Avatar_068_01 = engine.addEntity()
TagComponent.create(s0_Avatar_068_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_068_01, {
	position: {x:31.68,y:8.19,z:10.45},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_069_01 //
const s0_Avatar_069_01 = engine.addEntity()
TagComponent.create(s0_Avatar_069_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_069_01, {
	position: {x:30.37,y:8.19,z:11.18},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_070_01 //
const s0_Avatar_070_01 = engine.addEntity()
TagComponent.create(s0_Avatar_070_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_070_01, {
	position: {x:29.12,y:8.19,z:12},
	rotation: {x:0,y:0.3073057,z:0,w:0.9516109},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_071_01 //
const s0_Avatar_071_01 = engine.addEntity()
TagComponent.create(s0_Avatar_071_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_071_01, {
	position: {x:42.25,y:6.69,z:8},
	rotation: {x:0,y:-0.001859332,z:0,w:0.9999983},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_072_01 //
const s0_Avatar_072_01 = engine.addEntity()
TagComponent.create(s0_Avatar_072_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_072_01, {
	position: {x:40.74504,y:6.69,z:8.005334},
	rotation: {x:0,y:0.02036157,z:0,w:0.9997927},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_073_01 //
const s0_Avatar_073_01 = engine.addEntity()
TagComponent.create(s0_Avatar_073_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_073_01, {
	position: {x:39.2238,y:6.69,z:8.110607},
	rotation: {x:0,y:0.0530607,z:0,w:0.9985913},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_074_01 //
const s0_Avatar_074_01 = engine.addEntity()
TagComponent.create(s0_Avatar_074_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_074_01, {
	position: {x:37.69078,y:6.69,z:8.285837},
	rotation: {x:0,y:0.08944696,z:0,w:0.9959916},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_075_01 //
const s0_Avatar_075_01 = engine.addEntity()
TagComponent.create(s0_Avatar_075_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_075_01, {
	position: {x:36.1597,y:6.69,z:8.67},
	rotation: {x:0,y:0.1266146,z:0,w:0.991952},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_076_01 //
const s0_Avatar_076_01 = engine.addEntity()
TagComponent.create(s0_Avatar_076_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_076_01, {
	position: {x:34.62109,y:6.69,z:9.124},
	rotation: {x:0,y:0.1721205,z:0,w:0.9850759},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_077_01 //
const s0_Avatar_077_01 = engine.addEntity()
TagComponent.create(s0_Avatar_077_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_077_01, {
	position: {x:33.09496,y:6.69,z:9.75},
	rotation: {x:0,y:0.2037769,z:0,w:0.9790174},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_078_01 //
const s0_Avatar_078_01 = engine.addEntity()
TagComponent.create(s0_Avatar_078_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_078_01, {
	position: {x:31.68,y:6.69,z:10.45},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_079_01 //
const s0_Avatar_079_01 = engine.addEntity()
TagComponent.create(s0_Avatar_079_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_079_01, {
	position: {x:30.37,y:6.69,z:11.18},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_080_01 //
const s0_Avatar_080_01 = engine.addEntity()
TagComponent.create(s0_Avatar_080_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_080_01, {
	position: {x:29.12,y:6.69,z:12},
	rotation: {x:0,y:0.3073057,z:0,w:0.9516109},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_081_01 //
const s0_Avatar_081_01 = engine.addEntity()
TagComponent.create(s0_Avatar_081_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_081_01, {
	position: {x:42.25,y:5.19,z:8},
	rotation: {x:0,y:-0.001859332,z:0,w:0.9999983},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_082_01 //
const s0_Avatar_082_01 = engine.addEntity()
TagComponent.create(s0_Avatar_082_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_082_01, {
	position: {x:40.74504,y:5.19,z:8.005334},
	rotation: {x:0,y:0.02036157,z:0,w:0.9997927},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_083_01 //
const s0_Avatar_083_01 = engine.addEntity()
TagComponent.create(s0_Avatar_083_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_083_01, {
	position: {x:39.2238,y:5.19,z:8.110607},
	rotation: {x:0,y:0.0530607,z:0,w:0.9985913},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_084_01 //
const s0_Avatar_084_01 = engine.addEntity()
TagComponent.create(s0_Avatar_084_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_084_01, {
	position: {x:37.69078,y:5.19,z:8.285837},
	rotation: {x:0,y:0.08944696,z:0,w:0.9959916},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_085_01 //
const s0_Avatar_085_01 = engine.addEntity()
TagComponent.create(s0_Avatar_085_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_085_01, {
	position: {x:36.1597,y:5.19,z:8.67},
	rotation: {x:0,y:0.1266146,z:0,w:0.991952},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_086_01 //
const s0_Avatar_086_01 = engine.addEntity()
TagComponent.create(s0_Avatar_086_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_086_01, {
	position: {x:34.62109,y:5.19,z:9.124},
	rotation: {x:0,y:0.1721205,z:0,w:0.9850759},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_087_01 //
const s0_Avatar_087_01 = engine.addEntity()
TagComponent.create(s0_Avatar_087_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_087_01, {
	position: {x:33.09496,y:5.19,z:9.75},
	rotation: {x:0,y:0.2037769,z:0,w:0.9790174},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_088_01 //
const s0_Avatar_088_01 = engine.addEntity()
TagComponent.create(s0_Avatar_088_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_088_01, {
	position: {x:31.68,y:5.19,z:10.45},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_089_01 //
const s0_Avatar_089_01 = engine.addEntity()
TagComponent.create(s0_Avatar_089_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_089_01, {
	position: {x:30.37,y:5.19,z:11.18},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_090_01 //
const s0_Avatar_090_01 = engine.addEntity()
TagComponent.create(s0_Avatar_090_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_090_01, {
	position: {x:29.12,y:5.19,z:12},
	rotation: {x:0,y:0.3073057,z:0,w:0.9516109},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_091_01 //
const s0_Avatar_091_01 = engine.addEntity()
TagComponent.create(s0_Avatar_091_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_091_01, {
	position: {x:42.25,y:3.69,z:8},
	rotation: {x:0,y:-0.001859332,z:0,w:0.9999983},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_092_01 //
const s0_Avatar_092_01 = engine.addEntity()
TagComponent.create(s0_Avatar_092_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_092_01, {
	position: {x:40.74504,y:3.69,z:8.005334},
	rotation: {x:0,y:0.02036157,z:0,w:0.9997927},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_093_01 //
const s0_Avatar_093_01 = engine.addEntity()
TagComponent.create(s0_Avatar_093_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_093_01, {
	position: {x:39.2238,y:3.69,z:8.110607},
	rotation: {x:0,y:0.0530607,z:0,w:0.9985913},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_094_01 //
const s0_Avatar_094_01 = engine.addEntity()
TagComponent.create(s0_Avatar_094_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_094_01, {
	position: {x:37.69078,y:3.69,z:8.285837},
	rotation: {x:0,y:0.08944696,z:0,w:0.9959916},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_095_01 //
const s0_Avatar_095_01 = engine.addEntity()
TagComponent.create(s0_Avatar_095_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_095_01, {
	position: {x:36.1597,y:3.69,z:8.67},
	rotation: {x:0,y:0.1266146,z:0,w:0.991952},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_096_01 //
const s0_Avatar_096_01 = engine.addEntity()
TagComponent.create(s0_Avatar_096_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_096_01, {
	position: {x:34.62109,y:3.69,z:9.124},
	rotation: {x:0,y:0.1721205,z:0,w:0.9850759},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_097_01 //
const s0_Avatar_097_01 = engine.addEntity()
TagComponent.create(s0_Avatar_097_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_097_01, {
	position: {x:33.09496,y:3.69,z:9.75},
	rotation: {x:0,y:0.2037769,z:0,w:0.9790174},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_098_01 //
const s0_Avatar_098_01 = engine.addEntity()
TagComponent.create(s0_Avatar_098_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_098_01, {
	position: {x:31.68,y:3.69,z:10.45},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_099_01 //
const s0_Avatar_099_01 = engine.addEntity()
TagComponent.create(s0_Avatar_099_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_099_01, {
	position: {x:30.37,y:3.69,z:11.18},
	rotation: {x:0,y:0.2453315,z:0,w:0.9694393},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_Avatar_0100_01 //
const s0_Avatar_0100_01 = engine.addEntity()
TagComponent.create(s0_Avatar_0100_01, {tag: 'avatar_frame'});
Transform.create(s0_Avatar_0100_01, {
	position: {x:29.12,y:3.69,z:12},
	rotation: {x:0,y:0.3073057,z:0,w:0.9516109},
	scale: {x:1,y:1,z:1},
	parent: s0_COG_Thumbnails_01
})


// Entity: s0_DAO_Links_COG_01 //
const s0_DAO_Links_COG_01 = engine.addEntity()
Transform.create(s0_DAO_Links_COG_01, {
	position: {x:32,y:0,z:32},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_Link_Transparency_01 //
const s0_Link_Transparency_01 = engine.addEntity()
MeshRenderer.setBox(s0_Link_Transparency_01)
MeshCollider.setBox(s0_Link_Transparency_01)
Transform.create(s0_Link_Transparency_01, {
	position: {x:26.344,y:3.317,z:21.369},
	rotation: {x:0,y:0.3787959,z:0,w:0.9254803},
	scale: {x:0.5227001,y:0.5227,z:0.5227001},
	parent: s0_DAO_Links_COG_01
})
Material.setPbrMaterial(s0_Link_Transparency_01,{
	albedoColor: Color4.create(1, 1, 1, 0),
	metallic: 0,
	roughness: 0.5,
	transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
})
pointerEventsSystem.onPointerDown(
	{entity: s0_Link_Transparency_01, opts: {button: InputAction.IA_ANY, maxDistance: 8, hoverText:"Transparency Web"}},
	function(cmd){
		if(cmd.button === InputAction.IA_POINTER){
			openExternalUrl({url: "https://decentraland.org/governance/transparency/"})
		}
	}
)


// Entity: s0_Link_PolygonalMind_01 //
const s0_Link_PolygonalMind_01 = engine.addEntity()
MeshRenderer.setBox(s0_Link_PolygonalMind_01)
MeshCollider.setBox(s0_Link_PolygonalMind_01)
Transform.create(s0_Link_PolygonalMind_01, {
	position: {x:27.587,y:3.317,z:24.41},
	rotation: {x:0,y:-0.04829263,z:0,w:0.9988332},
	scale: {x:0.5227,y:0.5227,z:0.5227},
	parent: s0_DAO_Links_COG_01
})
Material.setPbrMaterial(s0_Link_PolygonalMind_01,{
	albedoColor: Color4.create(1, 1, 1, 0),
	metallic: 0,
	roughness: 0.5,
	transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
})
pointerEventsSystem.onPointerDown(
	{entity: s0_Link_PolygonalMind_01, opts: {button: InputAction.IA_ANY, maxDistance: 8, hoverText:"Polygonal Mind Web"}},
	function(cmd){
		if(cmd.button === InputAction.IA_POINTER){
			openExternalUrl({url: "https://www.polygonalmind.com"})
		}
	}
)


// Entity: s0_Link_Governance_01 //
const s0_Link_Governance_01 = engine.addEntity()
MeshRenderer.setBox(s0_Link_Governance_01)
MeshCollider.setBox(s0_Link_Governance_01)
Transform.create(s0_Link_Governance_01, {
	position: {x:25.946,y:3.317,z:27.398},
	rotation: {x:0,y:-0.4614427,z:0,w:0.8871701},
	scale: {x:0.5227,y:0.5227,z:0.5227},
	parent: s0_DAO_Links_COG_01
})
Material.setPbrMaterial(s0_Link_Governance_01,{
	albedoColor: Color4.create(1, 1, 1, 0),
	metallic: 0,
	roughness: 0.5,
	transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
})
pointerEventsSystem.onPointerDown(
	{entity: s0_Link_Governance_01, opts: {button: InputAction.IA_ANY, maxDistance: 8, hoverText:" Governance Web"}},
	function(cmd){
		if(cmd.button === InputAction.IA_POINTER){
			openExternalUrl({url: "https://decentraland.org/governance/"})
		}
	}
)


// Entity: s0_Link_DAO_01 //
const s0_Link_DAO_01 = engine.addEntity()
MeshRenderer.setBox(s0_Link_DAO_01)
MeshCollider.setBox(s0_Link_DAO_01)
Transform.create(s0_Link_DAO_01, {
	position: {x:22.503,y:3.317,z:27.907},
	rotation: {x:0,y:-0.7929251,z:0,w:0.6093192},
	scale: {x:0.5227,y:0.5227,z:0.5227},
	parent: s0_DAO_Links_COG_01
})
Material.setPbrMaterial(s0_Link_DAO_01,{
	albedoColor: Color4.create(1, 1, 1, 0),
	metallic: 0,
	roughness: 0.5,
	transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
})
pointerEventsSystem.onPointerDown(
	{entity: s0_Link_DAO_01, opts: {button: InputAction.IA_ANY, maxDistance: 8, hoverText:"DAO Proposal"}},
	function(cmd){
		if(cmd.button === InputAction.IA_POINTER){
			openExternalUrl({url: "https://decentraland.org/governance/proposal/?id=3dd9e476-1172-4995-a3cc-6942ebe12c7d"})
		}
	}
)


// Entity: s0_NPC_Position_4_01 //
const s0_NPC_Position_4_01 = engine.addEntity()
TagComponent.create(s0_NPC_Position_4_01, {tag: 'npc_4'});
Transform.create(s0_NPC_Position_4_01, {
	position: {x:14.14183,y:2.036983,z:10.56027},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})


// Entity: s0_NPC_Position_5_01 //
const s0_NPC_Position_5_01 = engine.addEntity()
TagComponent.create(s0_NPC_Position_5_01, {tag: 'npc_5'});
Transform.create(s0_NPC_Position_5_01, {
	position: {x:51.9981,y:2.499673,z:55.56889},
	rotation: {x:0,y:0,z:0,w:1},
	scale: {x:1,y:1,z:1}
})
loadInit()
