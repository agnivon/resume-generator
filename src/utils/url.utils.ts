/**
 * Resolves the base URL of the site dynamically based on environment variables.
 * Prioritizes custom site URL overrides, Vercel system environment variables,
 * and defaults to local development fallback.
 */
export const getSiteUrl = (): string => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL;

  if (envUrl) {
    return envUrl.startsWith("http://") || envUrl.startsWith("https://")
      ? envUrl
      : `https://${envUrl}`;
  }

  return "http://localhost:3000";
};
