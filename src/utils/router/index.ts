import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {setupLayouts} from 'virtual:generated-layouts'

import {routes} from 'vue-router/auto/routes'
import {customRoutes} from "@/utils/router/routes";
import {useUserState} from "@/modules/auth/stores/UserState";
import {UserProfile} from "@/utils/API/Models/UserProfile";
import {registerModules} from "@/register-modules";

const moduleRoutes: RouteRecordRaw[] = registerModules();

const combinedRoutes = [...moduleRoutes, ...customRoutes, ...routes,];


const layoutRoutes = setupLayouts(combinedRoutes);

const router = createRouter({
    history: createWebHistory(),
    routes: (layoutRoutes)
});

router.beforeEach((to, from, next) => {
    const value = to.meta.title;
    document.title = 'Creator mate' + (value == undefined ? '' : ` - ${value}`)

    const userState = useUserState();
    const userProfile: UserProfile = userState.getUserProfile();
    const whitelist = ['/onboarding/', '/oauth', '/route-guard', '/maintenance', '/persona']
    const current = to.path;

    const finishedOnboarding = userProfile.completedPhaseTwo && userProfile.completedPhaseOne && userProfile.completedPhaseThree;

    if (userState.isLoggedIn() && (!finishedOnboarding || !userProfile.startedOnboarding || !userProfile.linkedInstagram || !userProfile.hasPersona)) {
        if(!whitelist.some(route => current.includes(route))) {
            if (current !== '/route-guard') {
                next({ path: '/route-guard' });
                return;
            }
        }
    }
    next();
    return;
});

export default router
