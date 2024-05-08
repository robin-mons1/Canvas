import {nextTick} from "vue";
import {useZoomState} from "@/canvas/ZoomState";
import {Ref} from "@vue/reactivity";

export class MovementManager {
    private lastMouseEvent: MouseEvent|null = null;
    private isMoving: boolean = false;
    zoomState = useZoomState();
    private isComponent;

    xRef: Ref<number>;
    yRef: Ref<number>;

    constructor(x: Ref<number>, y: Ref<number>, isComponent: boolean) {
        this.xRef = x;
        this.yRef = y;
        this.isComponent = isComponent;
    }

    updateMouseEvent(event: MouseEvent) {
        this.lastMouseEvent = event;
    };

    public getMouseCoords(event: MouseEvent): {mouseDeltaX: number, mouseDeltaY: number} {
        if(!this.lastMouseEvent) return {mouseDeltaX: 0, mouseDeltaY: 0};

        let mouseDeltaX = (-1 * (event.clientX - this.lastMouseEvent.clientX)) * this.zoomState.scale;
        let mouseDeltaY = (-1 * (event.clientY - this.lastMouseEvent.clientY)) * this.zoomState.scale;
        this.lastMouseEvent = event;

        return {
            mouseDeltaX: mouseDeltaX,
            mouseDeltaY: mouseDeltaY
        }
    }

    public startMoving(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.isMoving = true;
        this.registerEvents();
        this.updateMouseEvent(e);
    }

    private move = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        let {mouseDeltaX, mouseDeltaY} = this.getMouseCoords(e)

        if(this.isComponent) {
            this.xRef.value -= mouseDeltaX;
            this.yRef.value -= mouseDeltaY;
        } else {
            this.xRef.value += mouseDeltaX;
            this.yRef.value += mouseDeltaY;
        }

    }

    private stopMoving = (e: MouseEvent)=> {
        e.preventDefault();
        e.stopPropagation();
        this.isMoving = false;
        this.removeEvents();
    }

    private registerEvents() {
        nextTick(() => {
            document.addEventListener('mousemove', this.move);
            document.addEventListener('mouseup', this.stopMoving);
        });
    }

    private removeEvents() {
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.stopMoving);
    }
}