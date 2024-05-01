<script setup lang="ts">
    import {ref} from "vue";

    const items = ref([]);
    async function getList() {
        const request = await fetch("https://api.restful-api.dev/objects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        const data = await request.json();
        for(const item of data) {
            items.value.push(item.name)
        }
    }
</script>

<template>
    <button @click="getList">load items</button>
    <ul>
        <li v-for="item of items" class="hover:bg-blue-500">
            {{item}}
        </li>
    </ul>
</template>