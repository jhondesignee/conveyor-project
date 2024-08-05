export default interface EventListener {
  onEvent?(type: unknown, data: unknown): void
}
