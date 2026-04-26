/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "https://jntugvcpsv.in",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://[IP_ADDRESS]",
    "http://jntugvcpsv.in",
    "https://www.jntugvcpsv.jntugv.edu.in",
    "https://jntugvcpsv.jntugv.edu.in"
  ],
  webpack: (config, { dev }) => {
    // Avoid flaky filesystem cache issues on Windows dev runs after cache cleanup.
    if (dev) {
      config.cache = false;
    }

    return config;
  }
};

export default nextConfig;
