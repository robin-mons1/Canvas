<script setup lang="ts">
    import CanvasComponent from "@/components/old/CanvasComponent.vue";
    import TodoList from "@/components/TodoList.vue";
    import {computed, nextTick, onMounted, ref} from "vue";
    import {Ref} from "@vue/reactivity";

    const canvasRef: Ref<SVGElement | null> = ref(null);

    const initialWidth = 10000;
    const initialHeight = 10000;
    const startX = initialWidth / 2;
    const startY = initialHeight / 2


    const scaleOffsetX = ref(0);
    const scaleOffsetY = ref(0);

    const scale = ref(1); // Initial scale value
    const width = ref(initialWidth * scale.value); // Initial width
    const height = ref(initialHeight * scale.value); // Initial height

    const panX = ref(0);
    const panY = ref(0);
    const isPanning = ref(false);

    const viewBoxX = ref(startX);
    const viewBoxY = ref(startY);

    const mouseX = ref(0);
    const mouseY = ref(0);

    scaleOffsetX.value = (width.value - initialWidth) / 2;
    scaleOffsetY.value = (height.value - initialHeight) / 2;

    const viewBox = computed(() => {
        return `${viewBoxX.value} ${viewBoxY.value} ${initialHeight} ${initialWidth}`
    })

    function pan(e: MouseEvent) {
        if (!isPanning.value) return;

        const minPanX = 0;
        const minPanY = 0;
        const maxPanX = initialWidth;
        const maxPanY = initialHeight

        const dx = e.clientX - panX.value;
        const dy = e.clientY - panY.value;

        panX.value = e.clientX;
        panY.value = e.clientY;

        const newViewBoxX = viewBoxX.value += (-1 * dx);
        const newViewBoxY = viewBoxY.value += (-1 * dy);

        if (newViewBoxX < minPanX || newViewBoxX > maxPanX || newViewBoxY < minPanY || newViewBoxY > maxPanY) {
            // If out of bounds, don't update viewBox values
            return;
        }

        viewBoxX.value += (-1 * dx);
        viewBoxY.value += (-1 * dy);
    }

    function handleScroll(e: WheelEvent) {
        e.preventDefault();
        zoom(e.deltaY * -0.001)
    }

    function zoom(zoom: number) {
        const oldScale = scale.value;
        scale.value += zoom;

        if (scale.value > 1.8) {
            scale.value = 1.8;
        } else if (scale.value < 0.3) {
            scale.value = 0.3;
        }

        const newWidth = initialWidth * scale.value;
        const newHeight = initialHeight * scale.value;

        const deltaX = (newWidth - initialWidth) / 2;
        const deltaY = (newHeight - initialHeight) / 2;

        viewBoxX.value = startX - deltaX;
        viewBoxY.value = startY - deltaY;
    }

    function endPan() {
        isPanning.value = false;

        document.removeEventListener('mousemove', pan);
        document.removeEventListener('mouseup', endPan);
    }

    function startPan(e: MouseEvent) {
        isPanning.value = true;
        panX.value = e.clientX;
        panY.value = e.clientY;

        nextTick(() => {
            document.addEventListener('mousemove', pan);
            document.addEventListener('mouseup', endPan);
        });
    }

    function mouseMove(e: MouseEvent) {
        //@todo apply scale
        mouseX.value = e.clientX + viewBoxX.value;
        mouseY.value = e.clientY + viewBoxY.value;
    }

</script>

<template>
    <div class="fixed bottom-10 left-10 flex gap-2">
        <button @click="zoom(-0.1)" class="w-10 h-10 bg-gray-200 flex items-center justify-center">-</button>
        <div class="w-10 h-10 bg-gray-200 flex items-center justify-center">
            {{ new Intl.NumberFormat('en-GB', {style: "percent"}).format(scale) }}
        </div>
        <button @click="zoom(0.1)" class="w-10 h-10 bg-gray-200 flex items-center justify-center">+</button>
    </div>
    <div @wheel="handleScroll" @mousedown="startPan"
         :style="`width:${width + 80}px; height:${height + 80}px`" class="overflow-auto p-10 svg-container">
        <svg ref="canvasRef" @mousemove="mouseMove" :viewBox="viewBox" style="background-color:blue" :width="width + 'px'" :height="height + 'px'"
             xmlns="http://www.w3.org/2000/svg" version="1.1">
            <CanvasComponent :scale-offset-y="scaleOffsetY" :scale-offset-x="scaleOffsetX" :scale="scale"
                             :initial-x="startX" :initial-y="startY" :initial-width="200" :initial-height="300">
                <TodoList></TodoList>
            </CanvasComponent>
            <CanvasComponent :scale-offset-y="scaleOffsetY" :scale-offset-x="scaleOffsetX" :scale="scale"
                             :initial-x="startX" :initial-y="startY+500" :initial-width="200" :initial-height="300">
                <TodoList></TodoList>
            </CanvasComponent>
        </svg>
    </div>
</template>