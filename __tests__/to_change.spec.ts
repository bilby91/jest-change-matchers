import "jest"
import "../src"

let sharedState = 0

describe("toChange", () => {
  beforeEach(() => {
    sharedState = 0
  })

  describe(".toChange", () => {
    it("passes when there is a change", async () => {
      await expect(async () => {
        sharedState += 1
      }).toChange(async () => {
        return sharedState
      })
    })

    it("throws an error when there is no change", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 0
        }).toChange(async () => {
          return sharedState
        })
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe(".not.toChange", () => {
    it("passes when there is no change", async () => {
      await expect(async () => {
        // no-op
      }).not.toChange(async () => {
        return sharedState
      })
    })

    it("throws an error when there is a change", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 1
        }).not.toChange(async () => {
          return sharedState
        })
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
