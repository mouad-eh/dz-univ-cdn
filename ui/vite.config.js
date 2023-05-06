// vite.config.js

import compression from 'vite-plugin-compression';

export default {
    plugins: [
        compression({
            algorithm: 'gzip',
            ext: '.gz'
        })
    ]
}
