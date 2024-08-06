export interface EventPayload {
  type: string
  data: Record<string, unknown>
}

export default interface EventListener {
  get events(): Array<string>
  onEvent?(payload: EventPayload): void
}
