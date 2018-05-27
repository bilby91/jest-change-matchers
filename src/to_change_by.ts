
export async function toChangeBy(
  receivedMutator: () => Promise<number>,
  target: () => Promise<number>,
  changeCount: number,
) {
  const previousValue = await target()
  await receivedMutator()
  const newValue = await target()
  const changeDifference = newValue - previousValue

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
