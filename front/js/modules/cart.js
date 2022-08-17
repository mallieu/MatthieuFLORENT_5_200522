import {
	storageKanap,
	urlParams
} from "./product.js";

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

    // Création du produit
	// if (typeof produit === "undefined") { TEST A REVOIR
	const produit = new ProduitPanier(produitActuel[0]._id, produitActuel[0].imageUrl, produitActuel[0].altTxt, produitActuel[0].name, produitActuel[0].price, produitActuel[0].description, selectedColor);
	produit.traitementProduit(produit, selectedQuantity)    
	
	// Alerte si absence de quantité
	// if (selectedQuantity == 0) {
	//   alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1")
	// }

	// Recherche dans le tableau panier
	console.log(panier)
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
	}
	ajoutPanier() {
		panier.push(this);
	}
	enleverPanier() {
		panier.pop(this);
	}
	traitementProduit(produit, selectedQuantity) {
		if (panier.find((produitActuel) => produitActuel._id === produit._id) && panier.find((produitActuel) => produitActuel.color === produit.color)) {
			console.log("bis repetita")
			console.log("Quantité avant ajout : " + produit.quantity)
			produit['quantity'] = selectedQuantity + 2;
			console.log("Quantité après ajout : " + produit.quantity)
		} else {
			produit['quantity'] = selectedQuantity;
			console.log("premiere fois")
			console.log("Quantité après ajout : " + produit.quantity)
			produit.ajoutPanier(produit);
		}
	
	}
	// ajoutQuantity(selectedQuantity) {
	// this.quantity += selectedQuantity;
	// console.log("Quantité après ajout : " + this.quantity)
	// }
}

export {
	eventsListeners
};

/*/ LE PANIER
let panier = [];

 */

/*
const newAccount = new BankAccount("Will Alexander", 500);

newAccount.showBalance(); // imprime "Solde: 500 EUR" à la console



/*
 
ajoutPanier() {
    console.log("+1")
};
retraitPanier() {
    console.log("-1")
};
    
    kanap.imageUrl
    kanap.altTxt
    kanap.name
    kanap.price
    kanap.description
    kanap.colors 
}


/* 
function addProduct(){
    if(localStorage.getItem('products')){
        panier = JSON.parse(localStorage.getItem('products'));
    }
    panier.push({'productId' : productId + 1, image : '<imageLink>'});
    localStorage.setItem('products', JSON.stringify(panier));
}



let gestionPanier = function () {
// TROUVER L'ELEMENT DECLENCHEUR DES FONCTIONS

    // Array en localStorage


    // Créer l'item
    let itemPanier = "a"

    kanapId = 
    kanapColor = 
    KanapQuantity = 


    // Ajouter un item
    localStorage.setItem(itemPanier);
    console.log(localStoragePanier)
    
    // Enlever un item
    localStorage.removeItem('monChat');


    // Evaluer quantité et produits

    // Rassembler items avec ID et couleurs pour ++ quantité (et pas uniquement au premier ajout)

    // Retrait quantité

    // Afficher le panier
    // Un item
    var cat = localStorage.getItem('monChat');

    // Tous les items
    for( let i = 0; i < localStorage.length; i++){
        localStorage.key(i);
    }

}
*/