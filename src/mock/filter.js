import {filters} from '../utils';

export function getMockFilters() {
  return Object.entries(filters).map(([name, getPoints]) => ({
    name,
    getPoints,
  }));
}
