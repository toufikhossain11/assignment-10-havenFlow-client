/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'i.ibb.co.com'
      },
      {
        hostname: 'www.ooba.co.za'
      },
       {
        protocol: "https",
        hostname: "images.unsplash.com",
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