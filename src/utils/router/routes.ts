import {RouteRecordRaw} from "vue-router";
const HomeView = () => import("@/modules/common/pages/Home.vue");
const Login = () => import("@/modules/auth/pages/login.vue");
const Register = () => import("@/modules/auth/pages/register.vue");
const EmailConfirm = () => import("@/modules/auth/pages/confirmEmail.vue");
const ForgotPassword = () => import("@/modules/auth/pages/forgot-password.vue");
const UpdatePassword = () => import("@/modules/auth/pages/update-password.vue");
const LinkInstagram = () => import("@/modules/common/pages/oauth/link-instagram.vue");
const LinkComplete = () => import("@/modules/common/pages/oauth/link-complete.vue");
const Maintenance = () => import("@/modules/common/pages/Maintenance.vue");
const NotFound = () => import("@/modules/common/pages/404.vue");
const Waitlist = () =>  import('@/modules/common/pages/Waitlist.vue');

import {baseLogoLayout, errorLayout, mainLayout} from "@/utils/router/Layouts";
import {NamedRoutes} from "@/utils/router/NamedRoutes";

export const customRoutes: Array<RouteRecordRaw> = [
    {path : '/', name: NamedRoutes.HOME, component: HomeView, meta: mainLayout},
    {path : '/register', name: NamedRoutes.REGISTER, component: Register, meta: baseLogoLayout},
    {path: '/login', name: NamedRoutes.LOGIN, component: Login, meta: baseLogoLayout},
    {path: '/auth/confirmEmail', name: "confirm email", component: EmailConfirm},
    {path: '/oauth/link-instagram', name: NamedRoutes.LINK_INSTAGRAM, component: LinkInstagram, meta: baseLogoLayout},
    {path: '/oauth/link-complete', name: NamedRoutes.LINK_COMPLETE, component: LinkComplete},
    {path: '/Maintenance', name: NamedRoutes.MAINTENANCE, component: Maintenance},
    {path: '/waitlist', name: NamedRoutes.WAITLIST, component: Waitlist, meta: baseLogoLayout},
    {path: '/forgot-password', name: NamedRoutes.FORGOT_PASSWORD, component: ForgotPassword, meta: baseLogoLayout},
    {path: '/update-password', name: NamedRoutes.UPDATE_PASSWORD, component: UpdatePassword, meta: baseLogoLayout},
    {path: '/:pathMatch(.*)*', name: NamedRoutes.NOT_FOUND,  component: NotFound, meta: errorLayout}
];
