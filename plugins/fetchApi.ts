import {useCookie, useRuntimeConfig} from '#app';

export default defineNuxtPlugin(nuxtApp => {


    const customFetch = $fetch.create({
        baseURL: 'http://152.42.240.131/api/v1',
        onRequest({options}) {
            const token = useCookie('token').value;
            if (token) {
                options.headers = {Authorization: `Bearer ${token}`};
            }
        },
        onResponse({response}) {
            console.info('onResponse', {
                endpoint: response.url,
                status: response.status,
            });
        },
        onResponseError({response}) {
            console.log("Response Error:", response);
            const statusMessage = response?.status === 401 ? 'Unauthorized' : 'Response failed';

            if (response?.status === 400 && response?._data?.message) {
                const errorMessage = response?._data?.message;
                console.error('onResponseError - 400', {
                    endpoint: response.url,
                    status: response.status,
                    errorMessage,
                });
                throw new Error(errorMessage);
            } else {
                console.error('onResponseError', {
                    endpoint: response.url,
                    status: response.status,
                    statusMessage,
                    responseText: response?.statusText,
                    responseBody: response?._data,
                });
                throw new Error(statusMessage);
            }
        }
    });
    nuxtApp.provide('customFetch', customFetch);
});