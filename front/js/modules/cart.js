
// Faire comme kanap ID, mais à partir du local storage
// const items = { ...localStorage };

// console.log('avant')
// console.log(items)
// console.log(localStorage)






	// Ajout panier
	const testbouton = document.querySelector(".cart__order__form__submit");
	testbouton.addEventListener("click", testtt);    
    let parseLocalStorage = JSON.parse(localStorage.getItem('kanaps'));
    console.log("Lecture parse")
    console.log(parseLocalStorage)
    console.log("Lecture storage")
    console.log(localStorage.getItem('kanaps'))




function testtt(test) {
    for (let kanap of parseLocalStorage) {
       console.log(kanap.color)
    }
}



// console.log('après')
// console.log(test)
// console.log(localStorage)


//Accéder au localstorage
// Pour chaque produit, créer une ligne et faire apparaître les blocs en HTML

// 1) Convertir 
// 2) Lister 
// 3) Insérer les blocs HTML 
// Insertion d'un bloc HTML complet par canapé depuis le panier en localStorage
function importPageAccueil(data, html) {
    for (let products of localS) {
        html += ` <a href="./product.html?id=${kanap._id}">
              <article>
                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}.</p>
              </article>
            </a> `;
    }
    return html;
}

/*4) Faire la somme 

5) Agir sur les items pour modifier le panier 
6) Penser au passage à 0 qui supprime l'item 
7) Transition avec le bouton pour passer commande

            <section id="cart__items"> => Ajout après ça
             <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>








Pas de doublon 
*/

/* Penser au total */

