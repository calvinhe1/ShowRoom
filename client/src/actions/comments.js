import ENV from './../config.js';
const API_HOST = ENV.api_host;

export const getRecentComemnts = async () => {
    const url = `${API_HOST}/api/comments/findrecent`;
    return fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    });
}