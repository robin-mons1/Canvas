<script setup lang='ts'>
    import {nextTick, ref, toRef, toRefs} from "vue";

    const props = defineProps<{
        initialX: number,
        initialY: number,
        initialWidth: number,
        initialHeight: number,
        scale: number,
        scaleOffsetX: number,
        scaleOffsetY: number,
    }>();

    const {initialX, initialY, initialWidth, initialHeight, scale, scaleOffsetY, scaleOffsetX} = toRefs(props)

    const x = ref(initialX.value)
    const y = ref(initialY.value);
    const width = ref(initialWidth.value + "px")
    const height = ref(initialHeight.value + "px")

    const isDragging = ref(false);
    const offsetX = ref(0);
    const offsetY = ref(0);

    const dragStart = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault()

        isDragging.value = true;

        const clientX = e.clientX / scale.value;
        const clientY = e.clientY / scale.value;

        offsetX.value = clientX - x.value;
        offsetY.value = clientY - y.value;

        nextTick(() => {
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        });
    }

    const drag = (e: MouseEvent) => {
        if(!isDragging.value) return;
        const clientX = e.clientX / scale.value;
        const clientY = e.clientY / scale.value;
        const newX = clientX - offsetX.value;
        const newY = clientY - offsetY.value;

        if(newX < 0 || newX > (10000 - initialWidth.value)) return;
        if(newY < 0 || newY > (10000 - initialHeight.value)) return;

        x.value = clientX - offsetX.value;
        y.value = clientY - offsetY.value;
    }

    const dragEnd = (e: MouseEvent) => {
        isDragging.value = false;

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }

</script>

<template>
    <svg>
        <foreignObject
                       :x="x"
                       :y="y"
                       :width="width"
                       :height="height"
                       @mousedown="dragStart"
        >
            <slot></slot>
        </foreignObject>
    </svg>
</template>
