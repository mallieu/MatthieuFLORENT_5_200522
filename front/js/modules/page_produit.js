import {
  insertionHTML, appelAPI
} from "./api.js";

let panier = [];

// Création d'un bloc HTML complet du canapé selon son ID
function ficheProduit(data, html) {
  // Création de l'item Kanap à partir de data
  try {
    for (let kanap of data) {
      Object.entries(kanap).forEach((kanap) => kanap);
      // Génération du produit selon son ID
      if (kanap._id === new URLSearchParams(window.location.search).get("id")) {
        html = generationFicheProduit(html, kanap); // Création du bloc
        sectionCouleurs(html, kanap); // Ajout des couleurs
        return html;
      }
    }
  } catch (err) {
    alert(err)
  }
}

function generationFicheProduit(html, kanap) {
  // Pour faciliter la génération et la manipulation du produit
  // on insère directement les variables correspondantes
  html += `
       <article>
         <div class="item__img">
           <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
         </div>
         <div class="item__content">
           <div class="item__content__titlePrice">
             <h1 id="title">${kanap.name}</h1>
             <p>Prix : <span id="price">${kanap.price}</span>€</p>
           </div>
           <div class="item__content__description">
             <p class="item__content__description__title">Description :</p>
             <p id="description">${kanap.description}</p>
           </div>
           <div class="item__content__settings">
             <div class="item__content__settings__color">
               <label for="color-select">Choisir une couleur :</label>
               <select name="color-select" id="colors">
               </select>
             </div>
             <div class="item__content__settings__quantity">
             <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
             <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
             </div>
             <div id="quantity_error"></div>
           </div>
           <div class="item__content__addButton">
             <button id="addToCart">Ajouter au panier</button>
           </div>
         </div>
       </article>`;
  return html;
}

// Fonction qui ajoute les variants "Colors"
/* Elle dépend de la génération de la fiche produit en amont
car elle a besoin que le html soit effectivement sur la page */
async function sectionCouleurs(html, kanap) {
  await insertionHTML(html);
  // Récupère la couleur à partir du canapé généré par l'API
  kanap.colors.forEach(
    (kanapColor) =>
      (html += `<option value="${kanapColor}">${kanapColor}</option>`)
  );
  document.querySelector("#colors").innerHTML = html; // Insertion HTML pour chaque couleur;
}

const produitCorrespondantAPI = async () => {
  const a = await appelAPI;
  const b = a.find(
    (produitActuel) => produitActuel._id === new URLSearchParams(window.location.search).get("id")
  );
  return b
};

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

async function ajoutProduit() {
  panier = JSON.parse(localStorage.getItem("Cart")) || [];
  let quantiteProduit = Number(document.getElementById("quantity").value);
  const couleurProduit = document.querySelector("#colors").value;
  const produitActuel = await produitCorrespondantAPI().then((res) => res);
  // Alerte si absence de quantité
  if (quantiteProduit === 0) {
    document.getElementById("quantity_error").innerHTML = `<p><b>Pour ajouter ce produit au panier, merci d'indiquer une quantité minimum de 1</b></p>`
  } else 
  if (quantiteProduit > 100) {
    document.getElementById("quantity").value = 100
    document.getElementById("quantity_error").innerHTML = `<p><b>Pour ajouter ce produit au panier, merci d'indiquer une quantité maximum de 100</b></p>`
  } else
  if (quantiteProduit < 0) {
    document.getElementById("quantity").value = 0
    document.getElementById("quantity_error").innerHTML = `<p><b>Pour ajouter ce produit au panier, merci d'indiquer une quantité supérieur à 0</b></p>`
  }
  else {
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

export {
  ficheProduit, ajoutProduit
};