export function addTag(tags: Record<string, string>, key: string, value: string) {
  return { ...tags, [key]: value }
}

export function removeTag(tags: Record<string, string>, key: string) {
  const copy = { ...tags }
  delete copy[key]
  return copy
}
