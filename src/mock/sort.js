import {sorts} from "../utils";
import {SORTING_TYPES} from "../const";

export function getMockSorts() {
  return Object.entries(sorts).map(([name, getPoints]) => ({
    name,
    getPoints,
    isDisabled: name === SORTING_TYPES.EVENT || name === SORTING_TYPES.OFFERS
  }));
}

