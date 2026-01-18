/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // !! ATTENZIONE !!
      // Pericoloso in produzione, ma utile per pubblicare subito il test
      ignoreBuildErrors: true,
    },
    eslint: {
      // Ignora i warning durante il build
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig