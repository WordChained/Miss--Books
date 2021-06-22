import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="home-page app-main">
            <h2 ref="header">About us...</h2>
            <div class="my-details">
                <img class="my-img" src="../img/my-img.jpg" alt="">
                <h1>Hi!</h1>
                <p>My name is Tal and it's way too late for me to actually write something with content here. 
                <p>
                    Hope to hear from you!</p>
                </p>
                <div class="contacts">

                    <a>phone</a> |
                    <a>mail</a> |
                    <a>social media links</a>
                </div>
            </div>
            <!-- <router-link to="/book">Book List</router-link> -->

        </section>
    `,
    created() {
        console.log('created');
        // console.log(this.$refs.header);
    },
    mounted() {
        console.log('mounted');
        console.log(this.$refs.header);
    },
    methods: {
        callBus() {
            // console.log(this.$refs.header);
            // eventBus.$emit('puk')
            // eventBus.$emit('puk2')
        }
    },
};