/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "daily-dev-backend.test",
                protocol: "http",
            },
            {
                hostname: "*",
                protocol: "https",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
