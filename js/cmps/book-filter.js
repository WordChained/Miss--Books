import bookAdd from "./book-add.js";

export default {
    components: {
        bookAdd,
    },
    template: `
    <section class="book-filter">
        <label>Search:</label>
        <input v-model="filterBy.title" type="text" @input="filter" placeholder="Search existing book...">
        <select v-model="filterBy.price" name="priceRangeFilter" @change="filter">
            <option value="" disabled selected>Search by price range</option>
            <option value="Infinity">All Prices</option>
            <option value="50">0-50</option>
            <option value="100">51-100</option>
            <option value="101">101 and Above</option>
        </select>
        <book-add/>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: ''
            }
        }
    },
    methods: {
        filter() {
            console.log(this.filterBy.price);
            this.$emit('filtered', this.filterBy);
        }
    },
    created() {
        console.log('created book-filter');;
    },
};