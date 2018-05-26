import "jest"

/// <reference path="./matchers.d.ts" />

import { toChange } from "./to_change"
import { toChangeBy } from "./to_change_by"
import { toChangeFromTo } from "./to_change_from_to"

expect.extend({
  toChange: toChange as any,
  toChangeBy: toChangeBy as any,
  toChangeFromTo: toChangeFromTo as any,
})
