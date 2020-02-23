// 根据当前mode获取Base Url 类型
const env = process.env.VUE_APP_BASE_URL_TYPE

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = (env) => {
  switch (env) {
    // development
    case 'dev':
      return {
        baseUrl: 'http://10.10.11.167:8095'
      }
    // qa
    case 'qa':
      return {
        baseUrl: 'http://gateway-api-jxw.apps.test.datadrivecloud.com/ora'
      }
    // production
    case 'prod':
      return {
        baseUrl: 'http://ai.api.sstir.cn/ora'
      }
    // default: dev
    default:
      return {
        baseUrl: 'http://10.10.11.167:8032'
      }
  }
}

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl
}

export default appConfig
