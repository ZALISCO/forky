import icons from 'url:../../img/icons.svg';//parcel2

export default class View {
  _data;


  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup()
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);//insert attaching  html to js.recipe

  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //CONVERN STRING TO DOM  that live in memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //selecting all =this*
    //converting NodeList arrays to real arrays like This
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curentElements[i];
      console.log(curEl, newEl.isEqualNode(curEl));
      //update changed text

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("🔥", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;

      }
      //update changed attributs
      if (
        !newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttributes(attr.name, attr.value)

        );


    })


  }




  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
         <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
          `;
    // this.#parentEl.innerHTML = "";
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup)//attaching  html to js method
  };

  renderError(message = this._erroMessage) {
    const markup = `  <div class="error">
   <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
   </div>
   <p>${message}</p>
   </div>
  
     `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup)//insert attaching  html to js.recipe

  }
  /////////////////////////success /message////////////

  renderMessge(message = this._message) {
    const markup = `  <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
      </div>
      
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup)//insert attaching  html to js.recipe

  }

}