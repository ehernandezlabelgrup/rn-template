interface EnvConfig {
  apiUrl: string
  apiKey: string
  timeout: number
}

interface Config {
  dev: EnvConfig
  prod: EnvConfig
}

type Environment = 'dev' | 'prod'

const ENV: Config = {
  dev: {
    apiUrl: 'https://dev-api.ejemplo.com',
    apiKey: 'dev-api-key',
    timeout: 10000,
  },
  prod: {
    apiUrl: 'https://api.ejemplo.com',
    apiKey: 'prod-api-key',
    timeout: 20000,
  },
}

let currentEnv: Environment = __DEV__ ? 'dev' : 'prod'

const getConfig = (): EnvConfig => {
  return ENV[currentEnv]
}

const getBaseUrl = (): string => ENV[currentEnv].apiUrl
const getApiKey = (): string => ENV[currentEnv].apiKey
const getTimeout = (): number => ENV[currentEnv].timeout

export {getConfig, getBaseUrl, getApiKey, getTimeout}

export default ENV[currentEnv]
