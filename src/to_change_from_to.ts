export async function toChangeFromTo(
  receivedMutator: () => Promise<any>,
  target: () => Promise<any>,
  from: any,
  to: any,
) {
  const previousValue = await target()
  await receivedMutator()
  const newValue = await target()

  const pass = previousValue === from && newValue === to
  const message = pass
    ? () =>
        `Expected target not to have changed\n` +
        `  from: ${from}\n` +
        `  to: ${to}\n` +
        `Received:\n` +
        `  from: ${previousValue}\n` +
        `  to: ${newValue}\n`
    : () =>
        `Expected target to have changed\n` +
        `  from: ${from}\n` +
        `  to: ${to}\n` +
        `Received:\n` +
        `  from: ${previousValue}\n` +
        `  to: ${newValue}\n`

  return { message, pass }
}
