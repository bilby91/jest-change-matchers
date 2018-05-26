import "jest"
import "../"

let sharedState = 0

describe("toChangeBy", () => {
  beforeEach(() => {
    sharedState = 0
  })

  describe(".toChangeBy", () => {
    it("passes with positive changes", async () => {
      await expect(async () => {
        sharedState += 1
      }).toChangeBy(async () => {
        return sharedState
      }, 1)
    })

    it("passes with negative changes", async () => {
      await expect(async () => {
        sharedState -= 1
      }).toChangeBy(async () => {
        return sharedState
      }, -1)
    })

    it("throws an error when it doesn't change the desired amount", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 2
        }).toChangeBy(async () => {
          return sharedState
        }, 1)
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe(".not.toChangeBy", () => {
    it("passes with positive changes", async () => {
      await expect(async () => {
        sharedState += 1
      }).not.toChangeBy(async () => {
        return sharedState
      }, -1)
    })

    it("passes with negative changes", async () => {
      await expect(async () => {
        sharedState -= 1
      }).not.toChangeBy(async () => {
        return sharedState
      }, 1)
    })

    it("throws an error when it changes the desired amount", async () => {
      const testCase = () => {
        return expect(async () => {
          sharedState += 2
        }).not.toChangeBy(async () => {
          return sharedState
        }, 2)
      }

      await expect(testCase()).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
