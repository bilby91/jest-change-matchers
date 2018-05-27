# jest-change-matchers [![npm version](https://badge.fury.io/js/jest-change-matchers.svg)](https://badge.fury.io/js/jest-change-matchers) [![codecov](https://codecov.io/gh/bilby91/jest-change-matchers/branch/master/graph/badge.svg)](https://codecov.io/gh/bilby91/jest-change-matchers) [![CircleCI](https://circleci.com/gh/bilby91/jest-change-matchers/tree/master.svg?style=svg)](https://circleci.com/gh/bilby91/jest-change-matchers/tree/master)

Jest matchers to evaluate side effect changes.

## Installation

```shell
yarn add --dev jest-change-matchers
```

## Usage

After installing the packge you will have a few more matchers in your toolbelt. If you are familiar with RSpec, the new matchers
should make you feel like home :).

### toChange

```javascript
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
```

### toChangeBy

```javascript
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
```

### toChangeFromTo

```javascript
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
```

## Contact

- Martín Fernández <fmartin91@gmail.com>