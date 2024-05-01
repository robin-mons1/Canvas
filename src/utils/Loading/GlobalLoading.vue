<script setup lang="ts">
    import {useLoadingState} from "@/utils/Loading/LoadingState";
    import {LoadingType} from "@/utils/Loading/LoadingType";
    import { Icon } from '@iconify/vue';

    const loadingState = useLoadingState();
    const buffer: string[] = loadingState.getLoadingBuffer(LoadingType.GLOBAL);
</script>

<template>
    <div v-for="loading of buffer" class="w-screen h-screen flex items-center justify-center flex-col absolute bg-skin-background z-50 bg-white l-0 text-textSecondary">
        <Icon :width="120" class="animate-spin" icon="mdi:loading"/>
        <h1 class="mt-8 text-3xl font-semibold capitalize">{{loading}}</h1>
    </div>
</template>
