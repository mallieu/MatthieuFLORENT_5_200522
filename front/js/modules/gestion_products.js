import {
	storageKanap,
	urlParams
} from "./fiche_produit.js";

const panier = [];

async function eventsListeners() {
	// Ajout panier
	const addToCart = document.querySelector("#addToCart");
	addToCart.addEventListener("click", ajoutProduit);
}

function ajoutProduit() {
	// Récupération des attributs
	const produitActuel = storageKanap.filter((produitActuel) => produitActuel._id === urlParams.get("id"));
	const selectedQuantity = Number(document.getElementById("quantity").value); 
	const selectedColor = document.querySelector("#colors").value;  

	// Alerte si absence de quantité
	// if (selectedQuantity == 0) {
	//   alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1")
	// }

    // Création du produit (quantité par défaut à 0)
	const produit = new ProduitPanier(produitActuel[0]._id, produitActuel[0].imageUrl, produitActuel[0].altTxt, produitActuel[0].name, produitActuel[0].price, 
		produitActuel[0].description, selectedColor);

	// Paramètre utilisé pour rechercher le produit dans le panier
	const rechercheProduitPanier = panier.find((produitActuel) => produitActuel._id === produit._id) && panier.find((produitActuel) => produitActuel.color === produit.color);
	
	produit.traitementProduit(rechercheProduitPanier, produit, selectedQuantity);    

	// Modification du panier dans le local storage
	storagePanier(panier, produitActuel);
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
		this.quantity = 0
	}
	traitementProduit(rechercheProduitPanier, produit, selectedQuantity) {
		// Identifie le produit et modifie sa quantité
		if (panier.find((produitActuel) => produitActuel._id === produit._id) && panier.find((produitActuel) => produitActuel.color === produit.color)) {
			rechercheProduitPanier.quantity += selectedQuantity;
		} else {
		// Ajout du produit au panier s'il n'existe pas encore
			produit.quantity = selectedQuantity;
			produit.ajoutPanier(); 
		}
	}
	ajoutPanier() {
		panier.push(this);
	}
	enleverPanier() {
		panier.pop(this);
	}
};

async function storagePanier(panier, produitActuel) {
	// Conversion du array panier en string puis ajout au local storage
	localStorage.setItem(produitActuel[0]._id, JSON.stringify(panier)); 
	// Conversion des strings produits en array panier
	// JSON.parse(localStorage.getItem('products'));
}; 

export {
	eventsListeners
};


// SI panier modifié, alors storage aussi


// Pour la récupération get puis parse 