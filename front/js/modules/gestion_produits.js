import { variablesGlobales } from "./variables.js";

let panier = [];

const appelAPI =
  // Appel de l'API
  fetch(variablesGlobales.urlAPI)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });


const rechercheProduit = async () => {
  const a = await appelAPI;
  const b = a.find(
    (produitActuel) => produitActuel._id === new URLSearchParams(window.location.search).get("id")
  );
  return b
};

async function eventsListeners() {
  // Ajout panier
  const addToCart = document.querySelector("#addToCart");
  addToCart.addEventListener("click", ajoutProduit);
}

async function ajoutProduit() {
  panier = JSON.parse(localStorage.getItem("Cart")) || [];
  const selectedQuantity = Number(document.getElementById("quantity").value);
  const selectedColor = document.querySelector("#colors").value;
  const produitActuel = await rechercheProduit().then((res) => res);
  // Alerte si absence de quantité
  if (selectedQuantity === 0) {
    alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1");
  } else {
    // Création du produit (quantité par défaut à 0)
    const produit = new ProduitPanier(
      produitActuel._id,
      selectedColor
    );

    // Paramètre utilisé pour vérifier l'existence du produit dans le panier
    const rechercheProduitPanier =
      panier.find((produitActuel) => produitActuel._id === produit._id) &&
      panier.find((produitActuel) => produitActuel.color === produit.color);

    produit.traitementProduit(rechercheProduitPanier, selectedQuantity);

    // Modification du panier dans le local storage
    storagePanier(panier);
  }
}

class ProduitPanier {
  constructor(_id, color) {
    this._id = _id;
    this.color = color;
    this.quantity = 0;
  }
  traitementProduit(rechercheProduitPanier, selectedQuantity) {
    // Identifie le produit et modifie sa quantité
    if (rechercheProduitPanier) {
      rechercheProduitPanier.quantity += selectedQuantity;
    } else {
      // Ajout du produit au panier s'il n'existe pas encore
      this.quantity = selectedQuantity;
      this.ajoutPanier();
    }
  }
  ajoutPanier() {
    panier.push(this);
  }
}

async function storagePanier(panier) {
  localStorage.setItem("Cart", JSON.stringify(panier));
}

export { eventsListeners };
