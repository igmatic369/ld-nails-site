// Resolves asset filenames stored in content.json to their bundled URLs.
// Vite's import.meta.glob statically analyzes the pattern at build time,
// bundling all matching files and exposing them as a lookup map.
const assetModules = import.meta.glob(
  '../../assets/*.png',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

export function assetUrl(filename: string): string {
  const key = `../../assets/${filename}`
  return assetModules[key] ?? filename
}

// Returns the correct src for an image that may be either a local asset
// filename (from content.json) or a full URL (e.g. Unsplash).
export function imageSrc(value: string): string {
  if (value.startsWith('http') || value.startsWith('/')) return value
  return assetUrl(value)
}
