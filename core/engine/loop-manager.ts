import type Updatable from "#core/engine/interface/base/updatable"
import Constants from "#core/common/constants"

export interface LoopManagerConfig {
  cycle?: {
    min?: number
    target?: number
  }
}

export default class LoopManager {
  private readonly updateObjects: Array<Updatable> = []
  private readonly config: RecursiveRequired<LoopManagerConfig>
  private lastUpdateTime: number = 0
  private accumulatedTime: number = 0

  constructor(config?: LoopManagerConfig) {
    const defaultConfig = {
      cycle: {
        min: 10,
        target: 50
      }
    }
    this.config = {
      cycle: { ...defaultConfig.cycle, ...(config?.cycle ? config.cycle : {}) }
    }
  }

  get updateObjectList(): typeof this.updateObjects {
    return this.updateObjects
  }

  public add(updatableObject: Updatable): void {
    this.updateObjects.push(updatableObject)
  }

  public update(currentTime: number): void {
    const deltaTime = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime
    this.accumulatedTime += Math.min(deltaTime, Constants.S_TO_MS / this.config.cycle.min)
    if (this.accumulatedTime >= Constants.S_TO_MS / this.config.cycle.target) {
      for (let updatableObject of this.updateObjects) {
        updatableObject?.update?.({ delta: deltaTime, current: currentTime })
      }
      this.accumulatedTime -= deltaTime
    }
  }
}
