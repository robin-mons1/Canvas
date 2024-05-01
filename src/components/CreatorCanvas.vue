<script setup lang="ts">
    import CanvasComponent from "@/components/CanvasComponent.vue";

    const width = 3000;
    const height = 3000;

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
    })
</script>

<template>
    <div :style="`width:${(width+80)}px; height:${(height+80)}px`" class="overflow-auto p-10">
        <svg viewBox="0 0 3000 3000" style="background-color:blue" :width="width  + 'px'" :height="height  + 'px'" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <CanvasComponent :initial-x="300" :initial-y="400" initial-width="200px" initial-height="300px"></CanvasComponent>
        </svg>
    </div>
</template>