/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,  // turn to false
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
