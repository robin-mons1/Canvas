import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from "vite-plugin-vue-layouts";
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            extensions: ['vue', '.md'],
            dts: 'src/typed-router.d.ts',
            routesFolder: ['src/modules/common/pages'],
        }),
        vueJsx(),
        vue(),
        Layouts(),
        ReactivityTransform(),
        // mkcert()
    ],
    server: {
        watch: {
            usePolling: true,
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
