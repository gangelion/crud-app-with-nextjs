/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/graphql', // GraphQLエンドポイントのパス
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // 許可するオリジンを指定
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS', // 許可するHTTPメソッドを指定
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept', // 許可するヘッダーを指定
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
