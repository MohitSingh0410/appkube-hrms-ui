/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
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
