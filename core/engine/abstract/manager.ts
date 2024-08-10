export default abstract class Manager<Obj> {
  protected readonly objects: Map<string, Obj> = new Map()

  get objectList(): Array<Obj> {
    return Array.from(this.objects.values())
  }

  public register(ID: string, obj: Obj): boolean {
    if (this.objects.has(ID)) return false
    this.objects.set(ID, obj)
    return true
  }

  public unregister(ID: string): boolean {
    return this.objects.delete(ID)
  }
}
