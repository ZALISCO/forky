import View from "./View.js";
import icons from 'url:../../img/icons.svg';//parcel2
class PaginationView extends View {
    //handle click Medthod
    _parentEl = document.querySelector(".pagination");

    addhandlerClick(handler) {
        this._parentEl.addEventListener('click', function (e) {
            // which event = event delegation metod = closest method
            //create a button element using the closest is like queryselector searching from downTree and chilren upthis
            const btn = e.target.closest(".btn--inline")
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            // console.log(goToPage);
            handler(goToPage);

        })
    }//method


    _generateMarkup() {
        const CurrentPage = this._data.page;
        const numPages = Math.ceil(

            this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);
        /////////////////explain/page=firstpage 2,3 exc... ,numPages= number of pages///////////////////////////////////////////////////////////////

        //page1 and others pages//= first page+ nextpags buttons
        if (CurrentPage === 1 && numPages > 1) {
            return `
            <button  data-goto="${CurrentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${CurrentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;

        }

        //page1 and nextpags buttons
        //last page=1
        if (CurrentPage === numPages && numPages > 1) {
            return `
             <button  data-goto="${CurrentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${CurrentPage - 1} </span>
          </button>`;

        }



        //other nextpags buttons
        if (CurrentPage < numPages) {
            return `
             </button> 
          <button  data-goto="${CurrentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${CurrentPage - 1} </span>
          </button>

            <button  data-goto="${CurrentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${CurrentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
         
          `;

        }
        //page1 and no nextpags buttons  
        return '';

    }


}
export default new PaginationView()