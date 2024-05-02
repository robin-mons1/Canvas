<script setup lang='ts'>
    import {computed, nextTick, onBeforeMount, onMounted, ref} from "vue";
    import {Ref} from "@vue/reactivity";
    import TodoList from "@/components/TodoList.vue";
    import BoardItem from "@/components/BoardItem.vue";
    import {Canvas} from "@/canvas/canvas";
    import {MouseManager} from "@/canvas/MouseManager";
    import SvgCoordinates from "@/components/SvgCoordinates.vue";

    const canvasRef: Ref<SVGElement | null> = ref(null);
    let canvas = new Canvas();
    let mouseManager = new MouseManager();

    onMounted(async () => {
        if(canvasRef == null) return;

        await canvas.initialize();
        canvas.setCanvas(canvasRef as Ref<SVGElement>);
    });

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    let lastMouseEvent: any = null;
    let scale = ref(1);

    const isPanning = ref(false);

    function startPan(e: MouseEvent) {
        isPanning.value = true;
        nextTick(() => {
            document.addEventListener('mousemove', pan);
            document.addEventListener('mouseup', stopPan);
        });

        mouseManager.updateMouseEvent(e);
    }

    function pan(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        let {mouseDeltaX, mouseDeltaY} = mouseManager.getMouseCoards(e, scale.value);

        // let mouseDeltaXnew = e.clientX - lastMouseEvent.clientX;
        // let mouseDeltaYnew = e.clientY - lastMouseEvent.clientY;

        canvas.viewBoxX.value += mouseDeltaX;
        canvas.viewBoxY.value += mouseDeltaY;
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
            scaledViewBoxWidth = canvas.viewBoxWidth.value / margin;
            scaledViewBoxHeight = canvas.viewBoxHeight.value / margin;

            scaledViewBoxX = canvas.viewBoxX.value + ((canvas.viewBoxWidth.value - scaledViewBoxWidth) * zoomLeftFraction);
            scaledViewBoxY = canvas.viewBoxY.value + ((canvas.viewBoxHeight.value - scaledViewBoxHeight) * zoomTopFraction);
        } else {
            scaledViewBoxWidth = canvas.viewBoxWidth.value * margin;
            scaledViewBoxHeight = canvas.viewBoxHeight.value * margin;

            scaledViewBoxX = canvas.viewBoxX.value - ((scaledViewBoxWidth - canvas.viewBoxWidth.value) * zoomLeftFraction);
            scaledViewBoxY = canvas.viewBoxY.value - ((scaledViewBoxHeight - canvas.viewBoxHeight.value) * zoomTopFraction);
        }

        canvas.viewBoxX.value = scaledViewBoxX;
        canvas.viewBoxY.value = scaledViewBoxY;
        canvas.viewBoxWidth.value = scaledViewBoxWidth;
        canvas.viewBoxHeight.value = scaledViewBoxHeight;

        scale.value = scaledViewBoxWidth / canvasRef.value.clientWidth;
    }
</script>

<template>
    <svg @mousedown="startPan" ref="canvasRef" @wheel="zoom" :width="canvasWidth" :height="canvasHeight" :viewBox="canvas.viewBox.value">
        <SvgCoordinates></SvgCoordinates>
        <rect fill="blue" width="100" height="100" x="500" y="500"></rect>
        <BoardItem :width="300" :x="0" :y="0" :scale="scale" :height="300">
            <TodoList></TodoList>
        </BoardItem>
    </svg>
</template>