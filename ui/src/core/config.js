function getOrDefaultFromEnv(key, defaultValue) {
    // eslint-disable-next-line no-underscore-dangle
    return (window._env_ && window._env_[key]) || defaultValue;
}

export default {
    apiHost: getOrDefaultFromEnv('apiHost', 'http://localhost:8001')
};