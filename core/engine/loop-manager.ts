import Manager from "#core/engine/abstract/manager"
import type Updatable from "#core/engine/interface/base/updatable"
import Constants from "#core/common/constants"

export interface LoopManagerConfig {
  cycle?: {
    min?: number
    target?: number
  }
}

export default class LoopManager extends Manager<Updatable> {
  private readonly config: RecursiveRequired<LoopManagerConfig>
  private lastUpdateTime: number = 0
  private accumulatedTime: number = 0

  constructor(config?: LoopManagerConfig) {
    super()
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

  public update(currentTime: number): void {
    const deltaTime = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime
    this.accumulatedTime += Math.min(deltaTime, Constants.S_TO_MS / this.config.cycle.min)
    if (this.accumulatedTime >= Constants.S_TO_MS / this.config.cycle.target) {
      for (let [_, obj] of this.objects) {
        obj.update?.({ delta: deltaTime, current: currentTime })
      }
      this.accumulatedTime -= deltaTime
    }
  }
}
