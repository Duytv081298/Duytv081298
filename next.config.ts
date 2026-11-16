import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === 'production';

// Dynamically determine the repository name from GitHub Actions environment, fallback if local
const getRepoName = () => {
  if (!isProd) return '';
  const githubRepo = process.env.GITHUB_REPOSITORY; // format: 'owner/repo'
  if (githubRepo) {
    const repo = githubRepo.split('/')[1];
    // If it's the main user/org page repository, GitHub Pages serves it from root (no basepath subpath)
    if (repo.toLowerCase().endsWith('.github.io')) {
      return '';
    }
    return `/${repo}`;
  }
  return '/Duytv081298'; // Fallback
};

const repoName = getRepoName();

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? repoName : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoName : '',
  },
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
