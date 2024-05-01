<script setup lang='ts'>
    import {nextTick, ref, toRefs} from "vue";

    const props = defineProps<{
        width: number,
        height: number,
        x: number,
        y: number,
        scale: number
    }>();

    const {width, height, x, y, scale} = toRefs(props);

    const currentX = ref(x.value);
    const currentY = ref(y.value);

    const objectRef: any = ref(null);
    const isMoving = ref(false);
    let lastMouseEvent: any = null;

    function startMoving(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault()
        isMoving.value = true;
        lastMouseEvent = e;
        nextTick(() => {
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stopMoving);
        });

        lastMouseEvent = e;
    }

    function move(e: MouseEvent) {
        let mouseDeltaX = e.clientX - lastMouseEvent.clientX;
        let mouseDeltaY = e.clientY - lastMouseEvent.clientY;

        currentX.value += mouseDeltaX * scale.value;
        currentY.value += mouseDeltaY * scale.value;

        lastMouseEvent = e;
    }

    function stopMoving() {
        isMoving.value = false;

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stopMoving);
    }
</script>

<template>
    <foreignObject ref="objectRef" @mousedown="startMoving" :x="currentX" :y="currentY" :width="`${width}px`" :height="`${height}px`">
        <slot></slot>
    </foreignObject>
</template>