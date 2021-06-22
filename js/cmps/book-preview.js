import longText from './long-text.js'

export default {
    components: {
        longText

    },
    props: ['book'],
    template: `
    <div class="book-preview">
        <p>title: 
            <span :class="getPriceLevel">{{book.title}}</span>
        </p>
        <div class="top-details">
            <p>Price: <span v-html="getCurrencySymbol"></span>{{book.listPrice.amount}}</p>
            <p>Dificulty: {{length}}</p>
            <p>Publish Date: {{this.book.publishedDate}} {{publishDate}}</p>
            <img :src="this.book.thumbnail">
        </div>
        <long-text v-bind:txt="this.book.description"/>
        <img class="sale" v-if="this.book.listPrice.isOnSale" src="img/sale.png" alt="">
    </div>
    `,
    data() {
        return {
            isExpensive: 'expensive',
            isCheap: 'cheap',
            isModalOpen: false
        }
    },
    methods: {

    },
    computed: {
        getCurrencySymbol() {
            const currencyCode = this.book.listPrice.currencyCode.toLowerCase();
            let symbol = ''
            switch (currencyCode) {
                case 'ils':
                    symbol = '&#8362;'
                    break;
                case 'usd':
                    symbol = '&#36;'
                    break;
                case 'eur':
                    symbol = '&#128;'
                    break;
            }
            return symbol
        },
        length() {
            const bookLength = this.book.pageCount;
            if (bookLength > 500) return 'Long Reading';
            if (bookLength > 200) return 'Decent Reading';
            if (bookLength <= 199) return 'Light Reading';

        },
        publishDate() {
            const publishDate = this.book.publishedDate;

            const diff = new Date().getFullYear() - publishDate;
            if (diff > 10) return '(Veteran book)';
            if (diff < 1) return '(New!)';
        },
        getPriceLevel() {
            const price = this.book.listPrice.amount;
            if (price > 150) return this.isExpensive
            if (price < 20) return this.isCheap
        }

    },

    created() {},
};