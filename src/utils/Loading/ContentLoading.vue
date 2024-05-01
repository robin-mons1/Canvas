<script setup lang="ts">
    import {useLoadingState} from "@/utils/Loading/LoadingState";
    import {LoadingType} from "@/utils/Loading/LoadingType";
    import { Icon } from '@iconify/vue';

    const loadingState = useLoadingState();
    const buffer: string[] = loadingState.getLoadingBuffer(LoadingType.CONTENT);
</script>

<template>
    <slot v-if="buffer.length === 0"></slot>
    <div v-else v-for="loading of buffer" class="h-full flex items-center justify-center flex-col absolute z-40 bg-white text-textSecondary">
        <Icon :width="120" class="animate-spin" icon="mdi:loading"/>
        <h1 class="mt-8 text-2xl font-semibold capitalize">{{loading}}</h1>
    </div>
</template>
