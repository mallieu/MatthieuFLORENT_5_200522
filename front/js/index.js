// URL de l'API
const urlAPI = "http://localhost:3000/api/products";

// Déclaration de la section HTML qui accueillera les données
let sectionArticle = "";

// Appel des données pour la génération des produits
const getProducts = function() {

    // Appel de l'API
    fetch(urlAPI)
        .then((result) => result.json()).then((data) => {
            console.log(data);
            let html = ""; // Création d'une variable HTML de type string

            // Génération des produits selon le type de page
            // Les fonctions sont sur des fichiers distincts

            // Fiche Produit
            if (window.location.href.indexOf("id") > -1) {
                // Paramétrage de la section
                sectionArticle = document.getElementById("items");
                html = ficheProduit(data, html);

                // Page accueil
            } else {
                // Paramétrage de la section
                sectionArticle = document.getElementsByClassName("item")[0].innerHTML;
                html = importPageAccueil(data, html);
            }
            // Insertion des produits la variable HTML. 
            //Le sélecteur est commun aux deux fonctions mais change selon les cas.
            sectionArticle.innerHTML = html;
        }).catch((err) => {
            console.error(err);
        });
};
// Appel de la fonction d'affichage des produits
getProducts();
// Création d'un bloc HTML complet par canapé dans l'API
function importPageAccueil(data, html) {
    for (let kanap of data) {
        html += ` <a href="./product.html?id=${kanap._id}">
              <article>
                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}.</p>
              </article>
            </a> `;
    }
    return html;
}
// Création d'un bloc HTML complet du canapé selon son ID
function ficheProduit(data, html) {
    // Récupère l'id depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // Fonction qui ajoute les variants "Colors"
    /* Elle dépend de la génération de la fiche produit en amont
    car elle a besoin que le html soit effectivement sur la page */
    async function sectionCouleurs(html, kanap) {
        await ficheProduit(html, kanap);
        let addColors = document.getElementById("colors");
        // Récupère la couleur à partir du canapé généré par l'API
        kanap.colors.forEach(kanapColor => html += ` 
          <option value="${kanapColor}">${kanapColor}</option>`);
        addColors.innerHTML = html; // insertion de la variable html;
    }

    // Permet la recherche du canapé selon son ID
    for (let kanap of data) {
        if (kanap._id === urlParams.get("id")) {
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
            return html;
        }
    }
}