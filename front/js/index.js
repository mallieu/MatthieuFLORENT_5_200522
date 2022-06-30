let sectionArticle = document.getElementById("items"); // Accès à la section Items (accueil)
// Creation de la fonction d'afichage des produits
const getProducts = function() {
	fetch("http://localhost:3000/api/products") // Appel de l'API
		.then((result) => result.json()).then((data) => {
			console.log(data)
			let html = ""; // creation d'une variable html de type string
			if (window.location.href.indexOf("id") > -1) {
				html = ficheProduit(data, html);
			} else {
				html = importPageAccueil(data, html);
			}
			sectionArticle.innerHTML = html; // insertion de la variable html;
		}).catch((err) => {
			console.error(err);
		});
};
// Appel de la fonction d'affichage des produits
getProducts();

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

function ficheProduit(data, html) {
	let urlParams = new URLSearchParams(window.location.search);
  
	async function sectionCouleurs(html, kanap) {
		await ficheProduit(html, kanap)
		let addColors = document.getElementById("colors");
		kanap.colors.forEach(kanapColor => html += ` 
         
          <option value="${kanapColor}">${kanapColor}</option>`);
		addColors.innerHTML = html; // insertion de la variable html;
	}
	/* sectionArticle = document.getElementsByClassName("item")[0].innerHTML */ // La sélection ne fonctionne pas
	for (let kanap of data) {
		if (kanap._id == urlParams.get('id')) {
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
  </article>
</section>`;
			sectionCouleurs(html, kanap);
			return html;
		}
	}
}