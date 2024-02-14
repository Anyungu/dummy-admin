/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['safsar-event.s3.il-central-1.amazonaws.com', 'safsarx-tickets.s3.il-central-1.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'safsar-event.s3.il-central-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'safsarx-tickets.s3.il-central-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
