const STRAPI_SERVER_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const FRONT_SERVER_URL = process.env.FRONT_SERVER_URL || 'http://localhost:3000'
const STRAPI_GRAPGHQL_URL =
  process.env.STRAPI_GRAPGHQL || 'http://localhost:1337/graphql'

export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '../',

  runtimeConfig: {
    // public設定
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      WECHAT_APPID: process.env.WECHAT_APPID,
      WECHAT_APPSECRET: process.env.WECHAT_APPSECRET,
      WECHAT_REDIRECT_URL: process.env.WECHAT_REDIRECT_URL,
      GEOAPIFY_KEY: process.env.GEOAPIFY_KEY,
      STRAPI_URL: STRAPI_SERVER_URL,
      FRONT_URL: FRONT_SERVER_URL,
      STRAPI_WEBSOCKET: STRAPI_SERVER_URL,
      graphqlURL: STRAPI_GRAPGHQL_URL,
      Square_locationId: process.env.SQUARE_LOCATIONID,
      Square_applicationId: process.env.SQUARE_APPLICATIONID,
      PostcodeJP: process.env.POSTCODE_JP,
    },
    // private設定
    secret: 'my-secret-value',
  },
})
