export const stringToPartUrl = (name: string) => name.replace(' ', '-').toLowerCase();
export const partUrlToString = (name: string) => name.replace('-', ' ');