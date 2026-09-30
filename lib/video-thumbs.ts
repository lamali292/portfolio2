import { existsSync } from "node:fs";
import { join } from "node:path";
import { assetPath } from "@/lib/asset-path";

/**
 * URL of the self-hosted thumbnail for a YouTube video, or undefined when
 * the build could not download it (scripts/fetch-video-thumbnails.mjs).
 * Server-side only: it checks the file system at build time.
 */
export function thumbnailFor(id: string): string | undefined {
  const file = join(process.cwd(), "public", "video-thumbs", `${id}.jpg`);
  return existsSync(file) ? assetPath(`/video-thumbs/${id}.jpg`) : undefined;
}
