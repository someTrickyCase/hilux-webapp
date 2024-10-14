/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WC_KEY: "ck_2e8eec45e15e971264c33605063fce6185ea562d",
        WC_SECRET: "cs_f56747399c397189636b21e0d045e7b569c26ae1",
        BITRIX_KEY: "8qh76a58yasowacf",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "hiluxtoyota.ru",
                port: "",
            },
        ],
    },
};

export default nextConfig;
