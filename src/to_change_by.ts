
export async function toChangeBy(
  receivedMutator: () => Promise<number>,
  target: () => Promise<number>,
  changeCount: number,
) {
  const previousLength = await target()
  await receivedMutator()
  const newLength = await target()
  const changeDifference = newLength - previousLength

  const pass = changeDifference === changeCount
  const message = pass
    ? () =>
        `Expected target not to have changed by:\n` +
        `  ${changeCount}\n` +
        `Received:\n` +
        `  ${changeDifference}\n`
    : () =>
        `Expected target to have changed by:\n` +
        `  ${changeCount}\n` +
        `Received:\n` +
        `  ${changeDifference}\n`

  return { message, pass }
}
