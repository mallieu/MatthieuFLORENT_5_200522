affichagePanier();
interactionPanier();

// Fonction pour générer un bloc HTML par produit
async function affichagePanier() {
  let html = '';
  const sectionProduitsPanier = document.getElementById("cart__items");
  panier = JSON.parse(localStorage.getItem("Cart"));

  // Pour chaque objet dans le panier
  panier.forEach((produitsPanier) => {
      html += `
      <article class="cart__item" data-id="${produitsPanier._id}" data-color="${produitsPanier.color}">
        <div class="cart__item__img">
          <img src="${produitsPanier.imageUrl}" alt="${produitsPanier.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produitsPanier.name}</h2>
            <p>${produitsPanier.color}</p>
            <p>${produitsPanier.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${produitsPanier.quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;     
      sectionProduitsPanier.innerHTML = html;
  });
}

async function interactionPanier() {
  await affichagePanier()
  document.querySelectorAll('.deleteItem').forEach(settingTrigger => {
    settingTrigger.addEventListener('click', suppressionProduitPanier)
  })
}
	// Ajout panier
function suppressionProduitPanier() {
  panier = JSON.parse(localStorage.getItem("Cart"));
  panier.pop(this);
  localStorage.setItem("Cart", JSON.stringify(panier)); 
}

// ON CLICK CLASS DELETEITEM

// // 1) Convertir 
// // 2) Lister 
// // 3) Insérer les blocs HTML 
// // Insertion d'un bloc HTML complet par canapé depuis le panier en localStorage
// function importPageAccueil(data, html) {
//     for (let products of localS) {
//     }
//     return html;
// }

// /*4) Faire la somme 

// 5) Agir sur les items pour modifier le panier 
// 6) Penser au passage à 0 qui supprime l'item 
// 7) Transition avec le bouton pour passer commande

//             <section id="cart__items"> => Ajout après ça
//              <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article>








// Pas de doublon 
// */

// /* Penser au total */

