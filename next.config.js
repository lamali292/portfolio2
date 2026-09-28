/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

let basePath = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*\//, "");
  basePath = `/${repo}`;
}

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
