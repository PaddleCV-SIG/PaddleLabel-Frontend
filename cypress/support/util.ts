export function camel2snake(name: string) {
  if (!name) return undefined;
  return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
