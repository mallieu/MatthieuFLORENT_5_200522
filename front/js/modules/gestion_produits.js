let panier = [];

const urlAPI = "http://localhost:3000/api/products"

const appelAPI =
  // Appel de l'API
  fetch(urlAPI)
    .then((result) => result.json())
    .then((data) => {
      return data;
    });


const produitCorrespondantAPI = async () => {
  const a = await appelAPI;
  const b = a.find(
    (produitActuel) => produitActuel._id === new URLSearchParams(window.location.search).get("id")
  );
  return b
};

async function ajoutProduit() {
  panier = JSON.parse(localStorage.getItem("Cart")) || [];
  const quantiteProduit = Number(document.getElementById("quantity").value);
  const couleurProduit = document.querySelector("#colors").value;
  const produitActuel = await produitCorrespondantAPI().then((res) => res);
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
    const produitCorrespondantPanier =
      panier.find((produitActuel) => produitActuel._id === produit._id) &&
      panier.find((produitActuel) => produitActuel.color === produit.color);

    produit.changementQuantiteProduit(produitCorrespondantPanier, quantiteProduit);

    // Modification du panier dans le local storage
    localStorage.setItem("Cart", JSON.stringify(panier));
  }
}

class ProduitPanier {
  constructor(_id, color) {
    this._id = _id;
    this.color = color;
    this.quantity = 0;
  }
  changementQuantiteProduit(produitCorrespondantPanier, quantiteProduit) {
    // Identifie le produit actuel et modifie sa quantité
    if (produitCorrespondantPanier) {
      produitCorrespondantPanier.quantity += quantiteProduit;
    } else {
      // Ajout du produit au panier s'il n'existe pas encore
      this.quantity = quantiteProduit;
      this.ajoutProduitPanier();
    }
  }
  ajoutProduitPanier() {
    panier.push(this);
  }
}
