import OnboardingModule from "@/modules/onboarding/OnboardingModule";
import PersonaModule from "@/modules/persona/PersonaModule";
import {RouteRecordRaw} from "vue-router";
import PostModule from "@/modules/posts/PostModule";
import TopicsModule from "@/modules/topics/TopicsModule";
import SettingsModule from "@/modules/settings/SettingsModule";

const modules = [
    new PersonaModule(),
    new OnboardingModule(),
    new TopicsModule(),
    new PostModule(),
    new SettingsModule(),
]

export const registerModules = (): RouteRecordRaw[] => {
    let routes: RouteRecordRaw[] = [];
    modules.forEach(module => {
        routes.push(module.getModuleRoute());
    })
    return routes;
}
