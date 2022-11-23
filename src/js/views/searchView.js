class SearchView {
    _parentEl = document.querySelector('.search')//main div
    //method
    getQuery() {
        const query = this._parentEl.querySelector(".search__field").value;//input field
        this._clearInput()
        return query;
    }

    _clearInput() {

        this._parentEl.querySelector(".search__field").value = "";//clear input field
    }

    addHandlerSearch(handler) {

        this._parentEl.addEventListener("submit", function (e) {
            e.preventDefault()
            handler()

        })
    }

}
export default new SearchView();