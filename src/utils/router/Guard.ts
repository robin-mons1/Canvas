import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {UserProfile} from "@/utils/API/Models/UserProfile";

export type Guard = {
    canContinue: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, userState, userProfile: UserProfile) => boolean
}
