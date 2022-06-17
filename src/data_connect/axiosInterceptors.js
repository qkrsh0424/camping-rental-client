import axios from "axios";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const axiosAuthInterceptor = axios.create();

let isCsrfRefreshing = false;
let isAuthTokenRefreshing = true;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

axiosAuthInterceptor.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        let originalReq = error.config;

        const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber(() => {
                resolve(axios(originalReq));
            });
        });

        if (error.response.status === 401) {
            // 액세스 토큰 리프레시를 위한 csrf 발급
            if (!isCsrfRefreshing) {
                isCsrfRefreshing = true;
                await axios.get(`${MAIN_API_ADDRESS}/api/v1/csrf/api`, {
                    withCredentials: true
                })
                    .catch((err) => {
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        refreshSubscribers = [];
                        return Promise.reject(err);
                    })
                isCsrfRefreshing = false;
                isAuthTokenRefreshing = false;
            }

            if (!isAuthTokenRefreshing) {
                isAuthTokenRefreshing = true;
                await axios.post(`${MAIN_API_ADDRESS}/api/v1/users/reissue/access-token`, {}, {
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
                    .catch(err => {
                        isCsrfRefreshing = false;
                        isAuthTokenRefreshing = true;
                        refreshSubscribers = [];
                        // 기존 에러 내보내기
                        return Promise.reject(error);
                    })
                    .finally(() => {
                        onTokenRefreshed();
                    })
            }

            return retryOriginalRequest;
        }
        return Promise.reject(error);
    }
)
export { axiosAuthInterceptor };