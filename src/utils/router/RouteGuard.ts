import {UserProfile} from "@/utils/API/Models/UserProfile";
import router from "@/utils/router/index";
import {NamedRoutes} from "@/utils/router/NamedRoutes";

export class RouteGuard {
    public static async CheckAvailable(userProfile: UserProfile) {
        if (!userProfile.linkedInstagram) {
            await router.replace({name: NamedRoutes.LINK_INSTAGRAM})
        } else if (!userProfile.startedOnboarding) {
            await router.replace({name: NamedRoutes.ONBOARDING_START})
        } else if (!userProfile.completedPhaseOne) {
            await router.replace({name: NamedRoutes.ONBOARDING_PHASE_ONE})
        } else if (!userProfile.creatorTypeId == null) {
            await router.replace({name: NamedRoutes.SELECT_CREATOR_TYPE})
        } else if (!userProfile.completedPhaseTwo) {
            await router.replace({name: NamedRoutes.ONBOARDING_PHASE_TWO})
        } else if (!userProfile.completedPhaseThree) {
            await router.replace({name: NamedRoutes.ONBOARDING_PHASE_THREE})
        } else if (!userProfile.hasPersona) {
            await router.replace({name: NamedRoutes.START_PERSONA})
        } else {
            await router.replace({name: NamedRoutes.HOME})
        }
    }
}
