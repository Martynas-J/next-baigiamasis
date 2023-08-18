/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO: "mongodb+srv://Nordesasdev:Nordesasdev@cluster0.hvglvqz.mongodb.net/test?retryWrites=true&w=majority",
        API_URL1: "https://next-baigiamasis.vercel.app/api",
        GOOGLE_ID: "444899498652-lt45t8iafifcm93perrsilj1a44gin08.apps.googleusercontent.com",
        GOOGLE_SECRET: "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",
        FACEBOOK_CLIENT_ID: "1393785324537739",
        FACEBOOK_CLIENT_SECRET: "fff04f57364fb1c8cd8e867237f9c3f1",


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
