import { storageKanap, urlParams } from "./product.js";

async function eventsListeners() {
    // Ajout panier
    const addToCart = document.querySelector("#addToCart");
    addToCart.addEventListener("click", ajoutPanier);
  };

function ajoutPanier() {
    // Récupération des attributs
    const produitActuel = storageKanap.filter(produitActuel => produitActuel._id === urlParams.get("id"));
    const selectedQuantity = document.getElementById("quantity").value;    // Quantité
    const selectedColor = document.querySelector("#colors").value;    // Couleur 
    const produit = new ProduitPanier (produitActuel[0]._id, produitActuel[0].imageUrl, produitActuel[0].altTxt, produitActuel[0].name, produitActuel[0].price, produitActuel[0].description, selectedColor)

    // Alerte si absence de quantité
    // if (selectedQuantity == 0) {
    //   alert("Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1")
    // }
    // Recherche dans le tableau panier
      if (panier.find(produitActuel => produitActuel._id == produit._id)){
        produit.ajoutQuantity(produit, selectedQuantity)
      }
      else { 
      produit.quantity = selectedQuantity    
      console.log(produit.quantity)
      produit.ajoutProduit();
  }
  console.log(panier)
};
  
  const panier = []
  
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
      ajoutProduit() {
        panier.push(this)
      }
      ajoutQuantity(produit, selectedQuantity) {
        console.log("Quantité page : " + selectedQuantity)
        console.log("Quantité produit : " + produit.quantity)
        produit.quantity = +produit.quantity + +selectedQuantity; // Calcul pas bon
        console.log("Quantité finale : " + produit.quantity)

      }
      enleverProduit () {
        panier.pop(this)
      }
  }
  

export { eventsListeners }


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


