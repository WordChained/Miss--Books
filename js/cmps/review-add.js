// import starRating from '.star-rating.js'
import { bookAppService } from "../services/book-app-service.js"
import { eventBus } from "../services/event-bus-service.js";

export default {

    componenets: {
        // starRating
    },
    template: `
    <section class="review-add">
        <form ref="form" class="review-form" @submit.prevent>
            <label>Full Name
                <input ref="fullName" type="text" class="fullName" placeholder ="Enter Your Full Name" required v-model="name">
            </label>
            <label>Reading Date
                <input type="date" class="date" 
                v-model="date"
                placeholder ="When Did You Read This?" required>
            </label>
            <label for="">Rate from 1 to 5:
                <input type="number" name="" id="" min="1" max="5" v-model="rating" >
            </label>
            <textarea name="review" cols="30" rows="10" placeholder="Write your review..." minlength="10" v-model="review"></textarea>
            
            <button type="button" @click="addReview();close();" class="addReview">Publish Review</button>
        </form>
    </section>
    `,
    data() {
        console.log(this.$route.params.bookId);
        return {
            review: '',
            rating: 5,
            name: '',
            date: '',

        }
    },
    methods: {
        addReview() {
            if (!this.review || !this.name || !this.date) return
            const bookId = this.$route.params.bookId;
            const userReview = {
                name: this.name,
                date: this.date,
                review: this.review,
                rating: this.rating
            };
            bookAppService.addReview(bookId, userReview)
                .then(book => {
                    this.book = book;
                    const msg = {
                        txt: 'Your review was successfully added!',
                        type: 'success',
                        linkTitle: 'Check this book out',
                        link: '/book/' + this.book.id
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
            console.log('Review added');
            return
        },
        close() {
            if (!this.review || !this.name || !this.date) return
            this.$emit('close')
            this.$refs.form.reset()
        }

    },
    mounted() {
        const txtFullName = this.$refs.fullName;
        txtFullName.focus()
    },
}