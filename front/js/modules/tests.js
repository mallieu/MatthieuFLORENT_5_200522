import { variablesGlobales } from "./variables.js";

const dataStorage =
  // Appel de l'API
  fetch(urlAPI)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });

// Fonction pour générer un bloc HTML par produit
function affichagePanier() {
  let html = "";
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  if (panier.length === 0) {
    // Vérifie l"existence du panier
    html = "";
    sectionProduitsPanier.innerHTML = html;
    console.log("Le panier est vide. Merci d'ajouter un produit");
  } else {
    const produitActuel = rechercheProduit().then((res)=> res);
    panier.forEach((produitsPanier) => {

            // Création du produit (quantité par défaut à 0)
            const produit = new ProduitPanier(
              produitActuel._id,
              produitActuel.imageUrl,
              produitActuel.altTxt,
              produitActuel.name,
              produitActuel.price,
              produitActuel.description,
              selectedColor
            );
        
            // Paramètre utilisé pour rechercher le produit dans le panier
            const rechercheProduitAPI =
              dataStorage.find((produitActuel) => produitActuel._id === produitsPanier._id) &&
              dataStorage.find((produitActuel) => produitActuel.color === produitsPanier.color);
        
           console.log("je suis là")
        
    })

// on trouve le produit qui correspond 
// on complète les données du produit du panier à partir de l'API uniquement pour la page PANIER


      // Génération des produits à partir du panier
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
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produitsPanier.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      sectionProduitsPanier.innerHTML = html;
    });
    interactionPanier();
    calculPrixTotal();
    calculQuantiteTotal();
  }



const correspondanceProduit = async () => {
  let a = panier.filter(
    (produitActuel) => produitActuel._id === PRODUITAPI
  );
  return a

};
  const rechercheProduitAPI =
      panier.find((produitActuel) => produitActuel._id === dataStorage._id) &&
      panier.find((produitActuel) => produitActuel.color === dataStorage.color);

async function ajoutProduit() {
  panier = JSON.parse(localStorage.getItem("Cart")) || [];
  const selectedQuantity = Number(document.getElementById("quantity").value);
  const selectedColor = document.querySelector("#colors").value;
  const produitActuel = rechercheProduit().then((res)=> res);
  // Alerte si absence de quantité
  if (selectedQuantity === 0) {
    alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1");
  } else {
    // Création du produit (quantité par défaut à 0)
    const produit = new ProduitPanier(
      produitActuel._id,
      produitActuel.imageUrl,
      produitActuel.altTxt,
      produitActuel.name,
      produitActuel.price,
      produitActuel.description,
      selectedColor
    );

    // Paramètre utilisé pour rechercher le produit dans le panier
  


  }
}

class ProduitPanier {
  constructor(_id, imageUrl, altTxt, name, price, description, color) {
    this._id = _id;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
    this.price = price;
    this.name = name;
    this.description = description;
    this.color = color;
    this.quantity = 0;
  }
  traitementProduit(rechercheProduitAPI, selectedQuantity) {
    // Identifie le produit et modifie sa quantité
    if (rechercheProduitAPI) {
      rechercheProduitAPI.quantity += selectedQuantity;
    } else {
      // Ajout du produit au panier s'il n'existe pas encore
      this.quantity = selectedQuantity;
      this.ajoutPanier();
    }
  }
}