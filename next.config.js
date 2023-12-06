/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },

    env: {
        API_URL: 'https://alvaro-cas.onrender.com/api/v1'
    }
}

module.exports = nextConfig
