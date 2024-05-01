<script setup lang='ts'>
    import {computed, nextTick, onMounted, ref} from "vue";
    import {Ref} from "@vue/reactivity";
    import TodoList from "@/components/TodoList.vue";
    import BoardItem from "@/components/BoardItem.vue";

    const canvasRef: Ref<SVGElement | null> = ref(null);

    const viewBoxX = ref(0);
    const viewBoxY = ref(0);
    const viewBoxWidth = ref(window.innerWidth);
    const viewBoxHeight = ref(window.innerHeight);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    let lastMouseEvent: any = null;

    const offsetX = ref(0);
    const offsetY = ref(0);
    let scale = ref(1);

    const isPanning = ref(false);

    const viewBox = ref(`${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`);

    function startPan(e: MouseEvent) {
        isPanning.value = true;
        nextTick(() => {
            document.addEventListener('mousemove', pan);
            document.addEventListener('mouseup', stopPan);
        });

        lastMouseEvent = e;
    }

    function pan(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        let mouseDeltaX = e.clientX - lastMouseEvent.clientX;
        let mouseDeltaY = e.clientY - lastMouseEvent.clientY;

        viewBoxX.value += (-1 * mouseDeltaX) * scale.value;
        viewBoxY.value += (-1 * mouseDeltaY) * scale.value;
        updateViewBox();

        lastMouseEvent = e;
    }

    function updateViewBox() {
        viewBox.value = `${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`;
    }

    function stopPan() {
        isPanning.value = false;

        document.removeEventListener('mousemove', pan);
        document.removeEventListener('mouseup', stopPan);
    }

    function zoom(e: WheelEvent) {
        if (!canvasRef.value) return;
        e.stopPropagation();

        let zoomX = e.offsetX;
        let zoomY = e.offsetY;

        const margin = 1.1;

        let zoomingIn = e.deltaY < 0;

        let scaledViewBoxX, scaledViewBoxY, scaledViewBoxWidth, scaledViewBoxHeight;

        let zoomLeftFraction = zoomX / canvasRef.value.clientWidth;
        let zoomTopFraction = zoomY / canvasRef.value.clientHeight;

        if (zoomingIn) {
            scaledViewBoxWidth = viewBoxWidth.value / margin;
            scaledViewBoxHeight = viewBoxHeight.value / margin;

            scaledViewBoxX = viewBoxX.value + ((viewBoxWidth.value - scaledViewBoxWidth) * zoomLeftFraction);
            scaledViewBoxY = viewBoxY.value + ((viewBoxHeight.value - scaledViewBoxHeight) * zoomTopFraction);
        } else {
            scaledViewBoxWidth = viewBoxWidth.value * margin;
            scaledViewBoxHeight = viewBoxHeight.value * margin;

            scaledViewBoxX = viewBoxX.value - ((scaledViewBoxWidth - viewBoxWidth.value) * zoomLeftFraction);
            scaledViewBoxY = viewBoxY.value - ((scaledViewBoxHeight - viewBoxHeight.value) * zoomTopFraction);
        }

        viewBoxX.value = scaledViewBoxX;
        viewBoxY.value = scaledViewBoxY;
        viewBoxWidth.value = scaledViewBoxWidth;
        viewBoxHeight.value = scaledViewBoxHeight;

        updateViewBox();
        scale.value = scaledViewBoxWidth / canvasRef.value.clientWidth;
    }
</script>

<template>
    <svg @mousedown="startPan" ref="canvasRef" @wheel="zoom" :width="canvasWidth" :height="canvasHeight" :viewBox="viewBox">
        <g v-for="i in 39" :key="i">
            <path stroke="green" stroke-width="0.2" :d="'M ' + ((i + 1) * 50) + ' 0 V 2000'"></path>
            <text font-size="10" :x="((i - 1) * 50) + 30" y="10">{{ (i + 1) * 50 }}</text>
        </g>
        <g v-for="i in 39" :key="'h' + i">
            <path stroke="green" stroke-width="0.2" :d="'M 0 ' + ((i + 1) * 50) + ' H 2000'"></path>
            <text font-size="10" :y="((i - 1) * 50) + 45" x="10">{{ (i + 1) * 50 }}</text>
        </g>
        <rect fill="blue" width="100" height="100" x="500" y="500"></rect>
        <BoardItem :width="300" :x="0" :y="0" :scale="scale" :height="300">
            <TodoList></TodoList>
        </BoardItem>
    </svg>
</template>