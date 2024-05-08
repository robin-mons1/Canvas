<script setup lang="ts">
    import CreatorCanvas from "@/components/old/CreatorCanvas.vue";
    import CreatorBoard from "@/components/CreatorBoard.vue";
    import {useAuth0} from "@auth0/auth0-vue";
    import { HubConnectionBuilder } from '@microsoft/signalr';
    import {onMounted, ref} from "vue";
    import {Ref} from "@vue/reactivity";
    import Instagram from "@/components/Instagram.vue";

    let connection: HubConnectionBuilder|null = null;
    let items: Ref<string[]> = ref([]);
    async function connectToHub() {
        if(!isAuthenticated) {
            alert("user is not authenticated")
            return;
        }

        const token =  await getAccessTokenSilently();

        connection = new HubConnectionBuilder().withUrl('http://localhost:5179/myhub', {accessTokenFactory: () => token }).build();

        try {
            await connection.start();

            connection.on("ReceiveMessage", handleMessage)
            console.log("Connected to SignalR hub")
        } catch (err) {
            console.error(err);
        }

    }

    function handleMessage(message: any) {
        items.value.push("https://www.instagram.com/p/C6np32XA8X0/?utm_source=ig_web_copy_link")
    }

    onMounted(async () => {
        await connectToHub();
    })

    const {loginWithRedirect, isAuthenticated, getAccessTokenSilently, user} = useAuth0();

    function login() {
        loginWithRedirect();
    }

    function signUp() {
        loginWithRedirect({
            appState: {
                target: "/profile",
            },
            authorizationParams: {
                screen_hint: "signup"
            }
        })
    }

    async function get() {
        const token =  await getAccessTokenSilently();
        console.log(token);
        const result = await fetch('http://localhost:5179/WeatherForecast', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        const json = await result.json();
        console.log(json);
    }
</script>


<template>
    <button @click="login">Login</button>
    <button @click="signUp">Signup</button>
    <p v-if="isAuthenticated">You did it!</p>
    <p>{{user}}</p>
    <button @click="get">get</button>
    <h1 class="text-2xl mt-2">Instagram posts</h1>
    <ul>
        <li v-for="item of items">{{item}}</li>
    </ul>

    <Instagram></Instagram>

<!--    <creator-board></creator-board>-->
</template>

