import * as to_change_by from "./to_change_by"
// @ponicode
describe("to_change_by.toChangeBy", () => {
    test("0", async () => {
        await to_change_by.toChangeBy(() => -0.5, () => 100, 1)
    })

    test("1", async () => {
        await to_change_by.toChangeBy(() => -29.45, () => 1, 100)
    })

    test("2", async () => {
        await to_change_by.toChangeBy(() => -29.45, () => 1, 0)
    })

    test("3", async () => {
        await to_change_by.toChangeBy(() => 1.0, () => 0, 100)
    })

    test("4", async () => {
        await to_change_by.toChangeBy(() => -1.0, () => 0, -5.48)
    })

    test("5", async () => {
        await to_change_by.toChangeBy(() => -Infinity, () => -Infinity, -Infinity)
    })
})
