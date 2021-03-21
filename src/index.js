
import App from './App.svelte';

import { sayHi } from './libs/sayHi.js'

const app = new App({
    target: document.body,
    props: {
        name: 'Dandilion'
    },
});

export default app;