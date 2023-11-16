/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,  // turn to false
    experimental: {
        useDeploymentId: true,
        // If use with serverActions is desired
        serverActions: true,
        useDeploymentIdServerActions: true,
    },
}

module.exports = nextConfig
