/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'i.ibb.co.com'
      },
      {
        hostname: 'lh3.googleusercontent.com' 
      },
      { hostname: 'www.google.com' }, 
      { hostname: '*.googleusercontent.com' }
    ]
  }
};

export default nextConfig;