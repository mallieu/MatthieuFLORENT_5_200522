const sectionProduitsPanier = document.getElementById("cart__items");

affichagePanier();
interactionPanier();

// Fonction pour générer un bloc HTML par produit
function affichagePanier() {
    let html = "";
    panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
    if (panier.length === 0) { // Vérifie l"existence du panier
        html = "";
        sectionProduitsPanier.innerHTML = html;
        console.log("Le panier est vide. Merci d\'ajouter un produit");
    } else {
        panier.forEach((produitsPanier) => { // Génération des produits à partir du panier
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
        interactionPanier()
        calculPrixTotal()
        calculQuantiteTotal()
    }
}

// Ajout des triggers sur chaque produit
function interactionPanier() {
    document.querySelectorAll(".deleteItem").forEach((settingTrigger) => {
        settingTrigger.addEventListener("click", suppressionProduitPanier)
    })
}

// Suppression panier
function suppressionProduitPanier(trigger) {
    // Isolement du bloc HTML du produit à partir du bouton cliqué
    const clickedButton = trigger.target.closest(".cart__item");

    // Récupération des attributs pour modifications du panier
    const produitPanierId = clickedButton.dataset.id;
    const produitPanierColor = clickedButton.dataset.color;

    // Correspondance du produit de la page avec le produit du panier
    let thisKanap = panier.find((ProduitPanier) => ProduitPanier._id === produitPanierId) && panier.find((ProduitPanier) => ProduitPanier.color === produitPanierColor);

    // Récupère l"index du produit
    let productIndex = panier.indexOf(thisKanap);

    // Supprime le produit
    panier.splice(productIndex, 1);

    // Met à jour le nouveau panier
    localStorage.setItem("Cart", JSON.stringify(panier));

    // Réactualise les produits affichés
    affichagePanier();
}

// Ajout quantité totale
function calculPrixTotal() {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  const prixTotal = panier.reduce((accumulator, produitsPanier) => {
    return accumulator + (produitsPanier.price*produitsPanier.quantity);
  }, 0);
  const emplacementPrix = document.getElementById("totalPrice");
  emplacementPrix.innerHTML = prixTotal;
}

function calculQuantiteTotal() {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  const quantiteTotale = panier.reduce((accumulator, produitsPanier) => {
    return accumulator + produitsPanier.quantity;
  }, 0);
  const emplacementQuantite = document.getElementById("totalQuantity")
  emplacementQuantite.innerHTML = quantiteTotale;
}