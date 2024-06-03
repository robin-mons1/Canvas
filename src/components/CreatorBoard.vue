<script setup lang='ts'>
    import {computed, nextTick, onBeforeMount, onMounted, ref} from "vue";
    import {Ref} from "@vue/reactivity";
    import {Canvas} from "@/canvas/canvas";
    import {MovementManager} from "@/canvas/MovementManager";
    import SvgCoordinates from "@/components/SvgCoordinates.vue";
    import {useZoomState} from "@/canvas/ZoomState";
    import BoardItem from "@/components/BoardItem.vue";
    import TodoList from "@/components/TodoList.vue";
    import Instagram from "@/components/Instagram.vue";

    const canvasRef: Ref<SVGElement | null> = ref(null);
    let canvas = new Canvas();
    let mouseManager = new MovementManager(canvas.viewBoxX, canvas.viewBoxY, false);
    let zoomState = useZoomState();

    onMounted(async () => {
        if(canvasRef == null) return;

        await canvas.initialize();
        canvas.setCanvas(canvasRef as Ref<SVGElement>);
    });

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    let lastMouseEvent: any = null;

    const isPanning = ref(false);

    // function startPan(e: MouseEvent) {
    //     isPanning.value = true;
    //     nextTick(() => {
    //         document.addEventListener('mousemove', pan);
    //         document.addEventListener('mouseup', stopPan);
    //     });
    //
    //     mouseManager.updateMouseEvent(e);
    // }
    //
    // function pan(e: MouseEvent) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     let {mouseDeltaX, mouseDeltaY} = mouseManager.getMouseCoords(e, scale.value);
    //
    //     canvas.viewBoxX.value += mouseDeltaX;
    //     canvas.viewBoxY.value += mouseDeltaY;
    // }
    //
    // function stopPan() {
    //     isPanning.value = false;
    //
    //     document.removeEventListener('mousemove', pan);
    //     document.removeEventListener('mouseup', stopPan);
    // }

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

        canvas.updateViewBox(scaledViewBoxX, scaledViewBoxY, scaledViewBoxWidth, scaledViewBoxHeight)
        zoomState.setScale(scaledViewBoxWidth / canvasRef.value.clientWidth);
        console.log(zoomState.getScale());
    }
</script>

<template>
    <svg @mousedown="mouseManager.startMoving" ref="canvasRef" @wheel="zoom" :width="canvasWidth" :height="canvasHeight" :viewBox="canvas.viewBox.value">
        <SvgCoordinates></SvgCoordinates>
        <BoardItem :width="300" :x="0" :y="0" :height="300">
            <TodoList></TodoList>
        </BoardItem>
        <board-item :width="500" :x="1200" :y="200" :height="500">
            <Instagram post-url="https://www.instagram.com/p/C7ooKP_s_QU/?utm_source=ig_web_copy_link"></Instagram>
        </board-item>
        <board-item :width="500" :x="2300" :y="200" :height="500">
            <Instagram post-url="https://www.instagram.com/p/C7ooKP_s_QU/?utm_source=ig_web_copy_link"></Instagram>
        </board-item>
        <board-item :width="500" :x="200" :y="1200" :height="500">
            <Instagram post-url="https://www.instagram.com/p/C7ooKP_s_QU/?utm_source=ig_web_copy_link"></Instagram>
        </board-item>
        <board-item :width="500" :x="600" :y="600" :height="500">
            <Instagram post-url="https://www.instagram.com/p/C7ooKP_s_QU/?utm_source=ig_web_copy_link"></Instagram>
        </board-item>
        <!--        <BoardItem :width="300" :x="500" :y="0" :height="300">-->
        <!--            <TodoList></TodoList>-->
        <!--        </BoardItem>-->

        <div>we are just working for creatormate</div>
    </svg>
</template>