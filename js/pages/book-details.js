import { bookAppService } from '../services/book-app-service.js';
// import { storageService } from '../services/async-storage-service.js';
import { eventBus } from '../services/event-bus-service.js';

import reviewAdd from '../cmps/review-add.js'
export default {
    components: {
        reviewAdd,
    },
    template: `
    <section :class="getPriceLevel" v-if="book" class="book-details">
        <h2> {{this.book.title}}</h2>
        <p>Author{{this.singleOrMult}}: {{this.spreadAuthors}}</p>
        <p>Price: <span v-html="getCurrencySymbol"></span>{{book.listPrice.amount}}</p>
        <p>Publish Date: {{this.book.publishedDate}}</p>
        <h1> <u>Description:</u></h1>
        <p class="description">{{this.book.description}}</p>

        <ul v-if="book.reviews" class="reviews-container">
            <li v-for="review in this.book.reviews">
                <ul class="review-container">
                Reader: {{review.name}}
                    <li>
                        Date Read: {{review.date}}
                    </li>
                    <li>
                        Rating: {{stars}}
                    </li>
                    <li>
                        <p>
                            <i class="review-txt">"{{review.review}}"
                            </i>
                        </p>
                    </li>
                    <button :id="review.id" class="btn-delete-review" @click="deleteReview">X</button>
                </ul>
             </li>
        </ul>

        <button class="btn-add-review" @click="isReviewing=!isReviewing">{{this.addReviewBtn}}</button>

        <review-add v-if="isReviewing" @close="isReviewing=!isReviewing"/>

        <img :src="this.book.thumbnail"/>

        <img class="sale-details" v-if="this.book.listPrice.isOnSale" src="img/sale.png" alt="">

        <router-link to="/book">Back</router-link>

    </section>
    `,
    data() {
        return {
            book: null,
            isReviewing: false,
            // currReview: null
        }
    },
    methods: {
        deleteReview(ev) {
            const reviewId = ev.target.id;
            const bookId = this.$route.params.bookId;
            bookAppService.removeReview(bookId, reviewId)
                .then(book => {
                    this.book = book;
                    const msg = {
                        txt: 'Your review was successfully removed!',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err,
                        type: 'fail',
                    };
                    eventBus.$emit('show-msg', msg);
                })
            return
        },
    },
    computed: {

        stars() {
            const STAR = '⭐'
            return this.book.reviews.map(review => {
                return STAR.repeat(review.rating)

            })
        },

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
        addReviewBtn() {
            const btnTxt = (this.isReviewing) ? 'Cancel' : 'Add Review';
            //need to do reset to form on other component
            //reset()
            return btnTxt
        },
        spreadAuthors() {
            const authors = this.book.authors.join(',')
                // console.log(authors);
            return authors
        },
        singleOrMult() {
            const numOfAuthors = this.book.authors.length > 1 ? 's' : ''
            return numOfAuthors
        },
        getPriceLevel() {
            const price = this.book.listPrice.amount;
            if (price > 150) return this.isExpensive
            if (price < 20) return this.isCheap
        },
        close() {
            this.isReviewing = false
        }


    },
    created() {
        // get id from route and use
        // console.log(this.$route.params.bookId);
        const { bookId } = this.$route.params;
        bookAppService.getById(bookId)
            .then(book => this.book = book);
    },
    mounted() {},

};