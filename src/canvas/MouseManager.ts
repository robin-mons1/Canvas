export class MouseManager {
    private lastMouseEvent: MouseEvent|null = null;

    updateMouseEvent(event: MouseEvent) {
        this.lastMouseEvent = event;
    }

    public getMouseCoards(event: MouseEvent, scale: number): {mouseDeltaX: number, mouseDeltaY: number} {
        if(!this.lastMouseEvent) return {mouseDeltaX: 0, mouseDeltaY: 0};

        let mouseDeltaX = (-1 * (event.clientX - this.lastMouseEvent.clientX)) * scale;
        let mouseDeltaY = (-1 * (event.clientY - this.lastMouseEvent.clientY)) * scale;
        this.lastMouseEvent = event;

        return {
            mouseDeltaX: mouseDeltaX,
            mouseDeltaY: mouseDeltaY
        }
    }
}