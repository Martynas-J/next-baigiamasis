/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO: "mongodb+srv://Nordesasdev:Nordesasdev@cluster0.hvglvqz.mongodb.net/test?retryWrites=true&w=majority",
        API_URL1: "https://next-baigiamasis.vercel.app/api",
        GOOGLE_ID: "444899498652-lt45t8iafifcm93perrsilj1a44gin08.apps.googleusercontent.com",
        GOOGLE_SECRET: "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",
        NEXTAUTH_SECRET: "qweewqasddsa",
        NEXTAUTH_URL: "https://next-baigiamasis.vercel.app",
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
