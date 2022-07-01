let produitActuel = []; // Variable utilisée pour extraire le canapé 

// Création d'un bloc HTML complet du canapé selon son ID
function ficheProduit(data, html) {
    // Récupère l'id depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Permet la recherche du canapé selon son ID
    for (let kanap of data) {
        if (kanap._id === urlParams.get("id")) {
          /* A COMPLETER let kanape = {
            id : '',
            price : "",
            name : "",
          }; */ 
          
            // Génération de la fiche produit avec les données d'un kanap
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
            // Appel à la fonction qui récupère les couleurs
            sectionCouleurs(html, kanap);
            // Remplacer par LocalStorage
            return html;
        }
    }
    // Fonction qui ajoute les variants "Colors"
    /* Elle dépend de la génération de la fiche produit en amont
    car elle a besoin que le html soit effectivement sur la page */
    async function sectionCouleurs(html, kanap) {
      await ficheProduit(html, kanap);
      let addColors = document.getElementById("colors");
      // Récupère la couleur à partir du canapé généré par l'API
      kanap.colors.forEach(kanapColor => html += ` 
        <option value="${kanapColor}">${kanapColor}</option>`);
      addColors.innerHTML = html; // Insertion HTML pour chaque couleur;
  }
}


export { ficheProduit, produitActuel };