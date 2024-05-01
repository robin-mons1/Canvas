<script lang="ts" setup>
    //Menu component.
    import {v4 as uuidv4} from 'uuid';
    import {WindowSettings} from "@/utils/Menu/WindowSettings";

    const {model} = defineProps<{
        model: WindowSettings,
    }>();

    const id: string = uuidv4();

    function clickOutside() {
        if(!model) return
        model.showHide();
    }
</script>

<template>
    <transition name="menu-show">
        <div @click="clickOutside" v-click-outside="clickOutside" tabindex="0" :id="id" v-if="model.show.value"
             class="v-menu absolute flex flex-col bg-white right-0 top-full shadow-custom z-50 text-textSecondary cursor-pointer">
            <slot></slot>
        </div>
    </transition>
</template>

<style>
.v-menu {
    transform-origin: top;
    transition: transform 100ms;
}

.menu-show-enter-from,
.menu-show-leave-to {
    transform: scaleY(0);
}
</style>
