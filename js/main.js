import bookApp from './pages/book-app.js'
import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'
import { router } from './router.js';
import userMsg from './cmps/user-msg.js';

const options = {
    router,
    el: '#app',
    template: `
        <section>
            <user-msg />
            <app-header/>
            <router-view />
            <app-footer/>
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    },
    created() {
        console.log('main created');;
    },
};

const app = new Vue(options);

// app.component('star-rating', VueStarRating.default)
// app.mount('#app')