<script setup lang='ts'>
    import {nextTick, ref, toRefs} from "vue";
    import {MovementManager} from "@/canvas/MovementManager";

    const props = defineProps<{
        width: number,
        height: number,
        x: number,
        y: number,
    }>();

    const {width, height, x, y} = toRefs(props);

    const currentX = ref(x.value);
    const currentY = ref(y.value);

    const objectRef: any = ref(null);
    const isMoving = ref(false);
    let lastMouseEvent: any = null;

    const movementManager = new MovementManager(currentX, currentY, true);

    // function startMoving(e: MouseEvent) {
    //     e.stopPropagation();
    //     e.preventDefault()
    //     isMoving.value = true;
    //     lastMouseEvent = e;
    //     nextTick(() => {
    //         document.addEventListener('mousemove', move);
    //         document.addEventListener('mouseup', stopMoving);
    //     });
    //
    //     lastMouseEvent = e;
    // }
    //
    // function move(e: MouseEvent) {
    //     let mouseDeltaX = e.clientX - lastMouseEvent.clientX;
    //     let mouseDeltaY = e.clientY - lastMouseEvent.clientY;
    //
    //     currentX.value += mouseDeltaX * scale.value;
    //     currentY.value += mouseDeltaY * scale.value;
    //
    //     lastMouseEvent = e;
    // }
    //
    // function stopMoving() {
    //     isMoving.value = false;
    //
    //     document.removeEventListener('mousemove', move);
    //     document.removeEventListener('mouseup', stopMoving);
    // }
</script>

<template>
    <g>
        <foreignObject ref="objectRef" @mousedown="movementManager.startMoving" :x="currentX" :y="currentY"
                       :width="`${width}px`" :height="`${height}px`">
            <slot></slot>
        </foreignObject>
    </g>
</template>