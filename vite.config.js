import { resolve } from 'path'
import { defineConfig } from 'vite'



export default  defineConfig(({ command, mode, ssrBuild }) => {
    console.log(command, mode, ssrBuild)
    return {
        server: {
            headers: {},
            proxy: {},
            cors: {},
            hmr: {},
            
        },
        plugins:[],
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    about: resolve(__dirname, '/about/index.html')
                }
            }
        }
    }
})