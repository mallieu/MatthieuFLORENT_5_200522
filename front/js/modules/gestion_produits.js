let panier = [];

const urlAPI = "http://localhost:3000/api/products"

const appelAPI =
  // Appel de l'API
  fetch(urlAPI)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });


const rechercheProduitAPI = async () => {
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
  const quantiteProduit = Number(document.getElementById("quantity").value);
  const couleurProduit = document.querySelector("#colors").value;
  const produitActuel = await rechercheProduitAPI().then((res) => res);
  // Alerte si absence de quantité
  if (quantiteProduit === 0) {
    alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1");
  } else {
    // Création du produit (quantité par défaut à 0)
    const produit = new ProduitPanier(
      produitActuel._id,
      couleurProduit
    );

    // Paramètre utilisé pour vérifier l'existence du produit dans le panier
    const rechercheProduitPanier =
      panier.find((produitActuel) => produitActuel._id === produit._id) &&
      panier.find((produitActuel) => produitActuel.color === produit.color);

    produit.traitementProduit(rechercheProduitPanier, quantiteProduit);

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
  traitementProduit(rechercheProduitPanier, quantiteProduit) {
    // Identifie le produit et modifie sa quantité
    if (rechercheProduitPanier) {
      rechercheProduitPanier.quantity += quantiteProduit;
    } else {
      // Ajout du produit au panier s'il n'existe pas encore
      this.quantity = quantiteProduit;
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

export { eventsListeners, urlAPI, appelAPI };
