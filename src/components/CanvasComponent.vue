<script setup lang='ts'>
    import {nextTick, ref} from "vue";

    const {initialX, initialY, initialWidth, initialHeight} = defineProps<{
        initialX: number,
        initialY: number,
        initialWidth: string,
        initialHeight: string
    }>();

    const x = ref(initialX)
    const y = ref(initialY);
    const width = ref(initialWidth)
    const height = ref(initialHeight)

    const isDragging = ref(false);
    const offsetX = ref(0);
    const offsetY = ref(0);


    const dragStart = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault()

        isDragging.value = true;

        offsetX.value = e.clientX - x.value;
        offsetY.value = e.clientY - y.value;

        document.body.style.overflow = 'hidden'; // Prevent scrolling

        nextTick(() => {
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        });
    }

    const drag = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if(!isDragging.value) return;
        x.value = e.clientX - offsetX.value;
        y.value = e.clientY - offsetY.value;
    }

    const dragEnd = (e: MouseEvent) => {
        e.preventDefault();
        isDragging.value = false;

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }

</script>

<template>
    <foreignObject class="drag-handle-class"
        :x="x"
        :y="y"
        :width="width"
        :height="height"
        @mousedown="dragStart"
    >
        <div class="w-full h-full bg-red-500 overflow-scroll drag-handle-class"></div>
    </foreignObject>
</template>
