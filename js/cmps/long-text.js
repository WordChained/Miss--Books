export default {
    props: ['txt'],
    template: `
    <div class="long-text">
    <p >description:</p>
    <p>{{handleTxtLength}}</p>
    <button v-if="this.txt.length > 100" @click.stop="isMore = !isMore" class="btn-word-limit"> read <span>{{handleBtnTxt}}</span>...</button>
    </div>`,
    data() {
        return {
            isMore: false
        }
    },
    computed: {
        handleTxtLength() {
            if (this.txt.length > 100 && !this.isMore) return this.txt.substring(0, 100)
            return this.txt
        },

        handleBtnTxt() {
            const text = (this.isMore) ? 'less' : 'more';
            return text
        },
    },
    method: {

    },

    created() {},
};