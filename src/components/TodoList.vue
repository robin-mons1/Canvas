<script setup lang="ts">
    import {ref} from "vue";
    import {Ref} from "@vue/reactivity";

    const items: Ref<string[]> = ref([]);
    async function getList() {
        items.value.push(`new item ${items.value.length}`);
    }

    function removeFromList(toRemove: string) {
        items.value = items.value.filter(item => item !== toRemove)
    }
</script>

<template>
    <div class="flex flex-col p-2 w-full h-full shadow bg-white">
        <h2>Todo list</h2>
        <button @click="getList">Add List</button>
        <ul>
            <li @click="removeFromList(item)" v-for="item of items" class="hover:bg-blue-500">
                {{item}}
            </li>
        </ul>
    </div>
</template>