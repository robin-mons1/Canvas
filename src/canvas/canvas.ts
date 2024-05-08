import {computed, ref} from "vue";
import {Ref} from "@vue/reactivity";
interface BoardPresets {
    viewBoxX: number,
    viewBoxY: number,
    viewBoxWidth: number,
    viewBoxHeight: number,
}
export class Canvas {
    public viewBoxX = ref(0);
    public viewBoxY = ref(0);
    public viewBoxWidth = ref(0);
    public viewBoxHeight = ref(0);
    public svg: Ref<SVGElement|null> = ref(null);

    viewBox = computed(() => `${this.viewBoxX.value} ${this.viewBoxY.value} ${this.viewBoxWidth.value} ${this.viewBoxHeight.value}`);

    setCanvas(svg: Ref<SVGElement>) {
        this.svg = svg;
    }

    async initialize() {
        const presets = await this.getPresets();
        this.viewBoxX.value = presets.viewBoxX !== 0 ? presets.viewBoxX : 0;
        this.viewBoxY.value = presets.viewBoxY !== 0 ? presets.viewBoxY : 0;
        this.viewBoxWidth.value = presets.viewBoxWidth !== 0 ? presets.viewBoxWidth : window.innerWidth;
        this.viewBoxHeight.value = presets.viewBoxHeight !== 0 ? presets.viewBoxHeight : window.innerHeight;
    }

    async getPresets(): Promise<BoardPresets> {
        setTimeout(() => {
        }, 5000);
        return {
            viewBoxX: 0, viewBoxY: 0, viewBoxWidth: window.innerWidth, viewBoxHeight: window.innerHeight
        }
    }

    async updateViewBox(viewBoxX: number, viewBoxY: number, viewBoxWidth: number, viewBoxHeight: number) {
        this.viewBoxX.value = viewBoxX;
        this.viewBoxY.value = viewBoxY;
        this.viewBoxWidth.value = viewBoxWidth;
        this.viewBoxHeight.value = viewBoxHeight;
    }
}