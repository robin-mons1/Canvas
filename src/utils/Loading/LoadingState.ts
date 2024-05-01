import {defineStore} from "pinia";
import {LoadingType} from "@/utils/Loading/LoadingType";

export type LoadingState = {
    globalLoadingItems: string[]
    contentLoadingItems: string[]
    buttonLoadingItems: string[]
}

const defaultType = LoadingType.GLOBAL;

export const useLoadingState = defineStore({
    id: 'loadingStore',
    state: () => ({
        globalLoadingItems: [],
        contentLoadingItems: [],
        buttonLoadingItems: [],
    } as LoadingState),
    actions: {
        startLoading(name: string, type: LoadingType = defaultType) {
            if(!this.globalLoadingItems.includes(name)) {
                this.addToBuffer(name, type)
            }

        },
        async startLoadingAndExec<T = any>(name: string, type: LoadingType, fn: Function): Promise<T> {
            this.startLoading(name, type);
            const data = await fn();
            this.stopLoading(name, type);
            return data;
        },
        stopLoading(name: string, type: LoadingType = defaultType) {
            this.removeFromBuffer(name, type)
        },
        addToBuffer(name: string, type: LoadingType) {
            switch (type) {
                case LoadingType.GLOBAL:
                    this.globalLoadingItems.push(name)
                    break;
                case LoadingType.CONTENT:
                    this.contentLoadingItems.push(name)
                    break
                case LoadingType.BUTTON:
                    this.buttonLoadingItems.push(name)
                    break;
            }
        },
        removeFromBuffer(name: string, type: LoadingType) {
            let index;
            switch (type) {
                case LoadingType.GLOBAL:
                    index = this.globalLoadingItems.findIndex(item => item === name);
                    if(index === -1) return;

                    this.globalLoadingItems.splice(index, 1);
                    break;
                case LoadingType.CONTENT:
                    index = this.contentLoadingItems.findIndex(item => item === name);
                    if(index === -1) return;

                    this.contentLoadingItems.splice(index, 1);
                    break
                case LoadingType.BUTTON:
                    index = this.buttonLoadingItems.findIndex(item => item === name);
                    if(index === -1) return;

                    this.buttonLoadingItems.splice(index, 1);
                    break;
            }
        },
        getLoadingBuffer(type: LoadingType): string[] {
            switch (type) {
                case LoadingType.BUTTON:
                    return this.buttonLoadingItems;
                case LoadingType.CONTENT:
                    return this.contentLoadingItems;
                case LoadingType.GLOBAL:
                    return this.globalLoadingItems;
            }
        },
    },
    persist: false
});
