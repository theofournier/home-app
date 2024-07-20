const VERCEL_BLOB_STORE_ID = process.env.BLOB_READ_WRITE_TOKEN?.match(
  /^vercel_blob_rw_([a-z0-9]+)_[a-z0-9]+$/i
)?.[1].toLowerCase();

const HOSTNAME_VERCEL_BLOB = VERCEL_BLOB_STORE_ID
  ? `${VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com`
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: HOSTNAME_VERCEL_BLOB,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
