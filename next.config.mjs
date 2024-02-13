/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['safsar-event.s3.il-central-1.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'safsar-event.s3.il-central-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
