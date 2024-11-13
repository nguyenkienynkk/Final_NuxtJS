import {useCookie, useRuntimeConfig} from '#app';

export default defineNuxtPlugin(nuxtApp => {
    const token = useCookie('token').value;

    const customFetch = $fetch.create({
        baseURL: 'http://152.42.240.131/api/v1',
        onRequest({options}) {
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
            const statusMessage = response?.status === 401 ? 'Unauthorized' : 'Response failed';
            console.error('onResponseError', {
                endpoint: response.url,
                status: response.status,
                statusMessage,
                responseText: response?.statusText,
                responseBody: response?.data,
            });
            throw new Error(statusMessage);
        }
    });
    nuxtApp.provide('customFetch', customFetch);
});