import {defineStore} from "pinia";

export class Canvas {

}

export const useZoomState = defineStore({
    id: 'zoomState',
    state: () => ({
        scale: 1
    }),
    actions: ({
        setScale(scale: number) {
            this.scale = scale;
        },

        getScale() {
            return this.scale;
        }
    })
});