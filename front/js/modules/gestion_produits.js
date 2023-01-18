import { urlParams } from "./fiche_produit.js";



let panier = [];

const urlAPI = "http://localhost:3000/api/products";


const recuperationProduitsAPI2 = async function () {
  // Appel de l'API
  let data = fetch(urlAPI)
    .then((result) => result.json())
    .then((data))}

async function eventsListeners() {
  // Ajout panier
  const addToCart = document.querySelector("#addToCart");
  addToCart.addEventListener("click", ajoutProduit);
}

function ajoutProduit() {
  recuperationProduitsAPI2()
  panier = JSON.parse(localStorage.getItem("Cart")) || [];
  // Récupération des attributs
  const produitActuel = data.filter(
    (produitActuel) => produitActuel._id === urlParams.get("id")
  );
  const selectedQuantity = Number(document.getElementById("quantity").value);
  const selectedColor = document.querySelector("#colors").value;

  // Alerte si absence de quantité
  if (selectedQuantity === 0) {
  alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1");
  } else {

  // Création du produit (quantité par défaut à 0)
  const produit = new ProduitPanier(
    produitActuel[0]._id,
    produitActuel[0].imageUrl,
    produitActuel[0].altTxt,
    produitActuel[0].name,
    produitActuel[0].price,
    produitActuel[0].description,
    selectedColor
  );

  // Paramètre utilisé pour rechercher le produit dans le panier
  const rechercheProduitPanier =
    panier.find((produitActuel) => produitActuel._id === produit._id) &&
    panier.find((produitActuel) => produitActuel.color === produit.color);

  produit.traitementProduit(rechercheProduitPanier, selectedQuantity);

  // Modification du panier dans le local storage
  storagePanier(panier);}
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
