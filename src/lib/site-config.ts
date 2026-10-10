export const BASE_PATH = '/portfolio';

export function siteAsset(path: string): string {
  return `${BASE_PATH}${path}`;
}
