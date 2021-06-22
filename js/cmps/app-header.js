export default {
    template: `
    <header class="app-header">
        <div class="header-container">
            <h1>Miss Books</h1>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/book" >Book List</router-link> |
                <router-link to="/about" >About</router-link> 
            </nav>
        </div>
        <hr>

    </header>
    `,
};