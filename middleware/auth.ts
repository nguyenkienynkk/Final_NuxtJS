import methodService from "~/plugins/methodService";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = await methodService().get('/login');
    if (!token && to.path !== '/login' && to.path !== '/signup') {
        return navigateTo('/login');
    }
});
