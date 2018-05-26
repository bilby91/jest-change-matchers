import "jest"
import "../"

let sharedState = 0

describe("toChangeFromTo", () => {
  beforeEach(() => {
    sharedState = 0
  })

  describe(".toChangeFromTo", () => {
    it("passes when it changes from previous and new value", async () => {
      await expect(async () => {
        sharedState += 1
      }).toChangeFromTo(async () => {
        return sharedState
      }, 0, 1)
    })

    it("throws an error when it doesn't change from previous value", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 2
        }).toChangeFromTo(async () => {
          return sharedState
        }, 1, 2)
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })

    it("throws an error when it doesn't change to new value", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 2
        }).toChangeFromTo(async () => {
          return sharedState
        }, 0, 1)
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe(".not.toChangeFromTo", () => {
    it("passes when it doesn't change to previous and new value", async () => {
      await expect(async () => {
        sharedState += 1
      }).not.toChangeFromTo(async () => {
        return sharedState
      }, 0, 0)
    })

    it("throws an error when it change to previous and new value", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 2
        }).not.toChangeFromTo(async () => {
          return sharedState
        }, 0, 2)
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })

  })
})
