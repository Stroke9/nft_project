/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.seadn.io"]
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  }
}

module.exports = nextConfig
