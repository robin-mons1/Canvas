import {Ref} from "@vue/reactivity";
import {ref} from "vue";
//this class contains and controls the state of a Window.
export class WindowSettings {
    public show: Ref<boolean>
    public firstOpen: Ref<boolean>

    constructor() {
        this.show = ref(false);
        this.firstOpen = ref(false);
    }

    showHide() {
        this.show.value = !this.show.value;

        if(this.show.value && !this.firstOpen.value) {
            this.firstOpen.value = true;
        }

        if(!this.show.value) {
            this.firstOpen.value = false;
        }
    }

    closeOnOutsideClick() {
        if(this.firstOpen.value) {
            this.firstOpen.value = false;
            return;
        }
        this.show.value = false;
    }
}
