import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </div>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    }
};