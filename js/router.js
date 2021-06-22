// import bookEdit from './pages/book-edit.js';
// import bookDetails from './pages/book-details.js';
import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookDetails from './pages/book-details.js';



const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book/details/:bookId?',
        component: bookDetails
    }
    // {
    //     path: '/book/edit/:bookId?',
    //     component: bookEdit
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
];

export const router = new VueRouter({ routes });