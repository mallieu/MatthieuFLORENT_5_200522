const localStoragePanier = localStorage


function addProduct(){
    let panier = [];
    if(localStorage.getItem('products')){
        panier = JSON.parse(localStorage.getItem('products'));
    }
    panier.push({'productId' : productId + 1, image : '<imageLink>'});
    localStorage.setItem('products', JSON.stringify(panier));
}



let panier = function () {
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
    
    /*// Enlever un item
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

// Ajout au panier
const addToCart = document.getElementById("addToCart");    
addToCart.addEventListener('click', function() {       
    console.log("ACHETE");               
});