import { Animator, ColliderLayer, GltfContainer, InputAction, MeshCollider, MeshRenderer, Transform, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { Mole, MoleName, MoleStatus } from "./mole";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { MoveComponent } from "../../imports/tween/movement/movement.component";
import { MovementType } from "../../imports/tween/movement/movement.schema";
import { addPmPointerDown } from "../../imports/components/pointer";
import { WakaMole } from "./wakaMole";

// -----------------------------------MOLE POOL-----------------------------------
export class MolePool {
    private static instance: MolePool;
    private pool: Mole[] = [];

    static readonly STORE_POSITION = Vector3.create(10, 20, 10);

    private constructor() {
        this.initPool();
    }

    public static Instance(): MolePool {
        if (!MolePool.instance) {
            MolePool.instance = new MolePool();
        }
        return MolePool.instance;
    }

    //Initial pool, create 3 of each moletype
    private initPool(): void {
        for (const moleType in MoleName) {
            if (isNaN(Number(moleType))) {
                for (let i = 0; i < 3; i++) {
                    this.createMole(moleType as MoleName);
                }
            }
        }
    }

    // Create a new mole and add it to the pool
    private createMole(moleType: MoleName): Mole {
        const mole = new Mole(moleType);
        mole.entity = engine.addEntity();
        Transform.create(mole.entity, {
            position: MolePool.STORE_POSITION,
            rotation: Quaternion.fromEulerDegrees(0, 45, 0),
            scale: Vector3.One(),
        });
        VisibilityComponent.create(mole.entity, { visible: false });
        GltfContainer.create(mole.entity, {
            src: 'assets/models/' + moleType as MoleName + '.glb',
        });
        mole.collider = engine.addEntity();
        Transform.create(mole.collider, {
            position: Vector3.create(0,0.5,0),
            scale: Vector3.create(0.5,1.2,0.5),
            parent: mole.entity,
        });
        MeshCollider.setCylinder(mole.collider, ColliderLayer.CL_POINTER);
        //MeshRenderer.setCylinder(mole.collider)

        Animator.create(mole.entity, {
            states: [
                {
                    clip: '2_Bonk',
                    playing: false,
                    loop: false,
                },
                {
                    clip: '1_Idle',
                    playing: true,
                    loop: false,
                }
            ],
        }
        );

        addPmPointerDown(mole.collider, {
            button: InputAction.IA_POINTER,
            hoverText: "Bonk!",
            maxDistance: 10,
            cb: () => {
                if(mole.status != MoleStatus.Hitted)
                mole.hit();
                WakaMole.Instance().hitMole(mole)
            }
        })
        
        MoveComponent.create(mole.entity, {
            type: MovementType.Simple,
            bInicialized: false,
            bActive: false,
            entity: mole.entity,
        })
        

        this.pool.push(mole);
        return mole;
    }
    //Get a mole from the pool
    private getMoleFromPool(moleType: string): Mole {
        for (const mole of this.pool) {
            if (mole.moleType == moleType && mole.status == MoleStatus.Disabled) {
                //console.log("DEBUG3 Activate mole -> ", mole.moleType, " == ", moleType, " status - ", mole.status)
                mole.status = MoleStatus.Reserved;
                return mole;
            }
        }
        return null;
    }
    //Get a mole from the pool or create a new one
    public getMole(moleType: MoleName): Mole {
        const mole = this.getMoleFromPool(moleType);
        if (mole) {
            return mole;
        } else {
            //console.log('No available moles in the pool. Creating a new one.');
            return this.createMole(moleType);
        }
    }
    //Sotore disable mole in the pool
    public storeMole(mole: Mole): void {
        mole.disable();
    }
    //Store all moles in the pool
    public storeAllMoles(): void {
        for (const mole of this.pool) {
            this.storeMole(mole);
        }
    }

    public destroyAll(): void {
        for (const mole of this.pool) {
            mole.destroy()
        }
        this.pool = [];
    }

}

