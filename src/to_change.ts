
export async function toChange(
  receivedMutator: () => Promise<any>,
  target: () => Promise<any>,
) {
  const previousValue = await target()
  await receivedMutator()
  const newValue = await target()

  const pass = previousValue !== newValue
  const message = pass
    ? () =>
        `Expected target not to change.\n` +
        `Received:\n` +
        `  ${newValue}\n`
    : () =>
        `Expected target to change.\n` +
        `Received:\n` +
        `  ${newValue}\n`

  return { message, pass }
}
