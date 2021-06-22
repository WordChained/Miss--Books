import { bookAppService } from '../services/book-app-service.js'
import { eventBus } from '../services/event-bus-service.js';


import bookFilter from '../cmps/book-filter.js'
import bookList from '../cmps/book-list.js'
import bookDetails from './book-details.js'

export default {
    components: {
        bookFilter,
        bookList,
        bookDetails
    },
    template: `
        <!-- <section v-if="!this.selectedBook" class = "book-app"> -->
        <section class = "book-app">
        <book-filter @filtered="setFilter"/> 
        <book-list 
        :books="booksToShow" 
        @selected="selectBook" 
        @remove="removeBook"></book-list>
        <!-- <router-link to="/book/preview" :book="selectedBook"></router-link> -->
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: '',
            selectedBook: null
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            if (+this.filterBy.price > 0) {
                if (+this.filterBy.price === Infinity) {
                    return this.books.filter(book => {
                        return book.listPrice.amount < Infinity;
                    });
                }
                if (+this.filterBy.price <= 50) {
                    return this.books.filter(book => {
                        return book.listPrice.amount < 50;
                    });
                }
                if (+this.filterBy.price <= 100) {
                    return this.books.filter(book => {
                        return book.listPrice.amount > 50 && book.listPrice.amount < 100;
                    });
                }
                if (+this.filterBy.price >= 101) {
                    return this.books.filter(book => {
                        return book.listPrice.amount > 101;
                    });
                }
                return
            }
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr);
            });
            return booksToShow;
        },

    },
    methods: {
        loadBooks() {
            bookAppService.query()
                .then(books => {
                    this.books = books
                });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(book) {
            this.selectedBook = book;
            console.log(this.selectedBook);
        },
        removeBook(id) {
            bookAppService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfuly',
                        type: 'success'
                    };
                    //TODO: watch the class again to see what to do with the bus
                    eventBus.$emit('show-msg', msg);
                    this.loadBooks();
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again',
                        type: 'error'
                    };
                    eventBus.$emit('show-msg', msg);
                });
        },
        closeDetails() {
            this.selectedBook = null;
        },
    },
    created() {
        console.log('created book-app');
        this.loadBooks();
    },

}