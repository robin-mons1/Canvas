<script setup lang='ts'>

</script>

<template>
    <g v-for="i in 39" :key="i">
        <path stroke="green" stroke-width="0.2" :d="'M ' + ((i + 1) * 50) + ' 0 V 2000'"></path>
        <text font-size="10" :x="((i - 1) * 50) + 30" y="10">{{ (i + 1) * 50 }}</text>
    </g>
    <g v-for="i in 39" :key="'h' + i">
        <path stroke="green" stroke-width="0.2" :d="'M 0 ' + ((i + 1) * 50) + ' H 2000'"></path>
        <text font-size="10" :y="((i - 1) * 50) + 45" x="10">{{ (i + 1) * 50 }}</text>
    </g>
</template>