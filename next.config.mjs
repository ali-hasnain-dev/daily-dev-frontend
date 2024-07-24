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
    }
};

export default nextConfig;
