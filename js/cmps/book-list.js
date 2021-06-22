import bookPreview from './book-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book" @click.native="log(book.id)" />
            <div class="actions">
                <button @click="remove(book.id)">X</button>
                
                <router-link class="details-link"  :to="'/book/details/'+book.id"> details</router-link>
                <!-- <button @click="select(book)">Details</button> -->
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(bookId) {
            console.log('removing...');
            this.$emit('remove', bookId);
            console.log(this.books);
        },
        select(book) {
            console.log(book);
            this.$emit('selected', book);
        },
        log(bookId) {
            console.log('book id', bookId);
        },

    },
    components: {
        bookPreview
    },
    created() {
        console.log('created book list');;
    },

};