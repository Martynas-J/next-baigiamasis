/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO: "mongodb+srv://Nordesasdev:Nordesasdev@cluster0.hvglvqz.mongodb.net/test?retryWrites=true&w=majority",
        API_URL1: "http://next-baigiamasis.vercel.app",
    },
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
