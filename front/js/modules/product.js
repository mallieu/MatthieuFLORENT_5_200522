import {
  insertionHTML
} from "./api.js"

let storageKanap = {};

const urlParams = new URLSearchParams(window.location.search);  // Recherche de l'ID dans l'URL

// Création d'un bloc HTML complet du canapé selon son ID
function ficheProduit(data, html) {
  storageKanap = data;   // Enregistrement des données de l'API

  // Création des items Kanap à partir de data
  for (const kanap of data) {
      Object.entries(kanap).forEach(kanap =>  kanap);
      // Génération du produit selon son ID
      if (kanap._id === urlParams.get("id")) {
          html = generationFiche(html, kanap); // Création du bloc
          sectionCouleurs(html, kanap); // Ajout des couleurs
          return html;
          // AJOUTER TEST GENERATION SI HTML VIDE
      }
  }
}

function generationFiche(html, kanap) {
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
  kanap.colors.forEach(kanapColor => html += ` 
  <option value="${kanapColor}">${kanapColor}</option>`);
  document.querySelector("#colors").innerHTML = html; // Insertion HTML pour chaque couleur;
}

export {
  ficheProduit,
  urlParams,
  storageKanap
};