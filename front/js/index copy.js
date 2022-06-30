let sectionArticle = document.getElementById("items"); // Accès à la section Items (accueil)

// Creation de la fonction d'afichage des produits
const getProducts = function() {
	fetch("http://localhost:3000/api/products") // Appel de l'API
		.then((result) => result.json())

		.then((data) => {
			console.log(data)
			let html = ""; // creation d'une variable html de type string
			if (window.location.href.indexOf("id") > -1) {
				html = ficheProduit(data, html);
			} else {
				html = importPageAccueil(data, html);
			}
			sectionArticle.innerHTML = html; // insertion de la variable html;
		})
		.catch((err) => {
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

async function sectionCouleurs(html, kanap) {
  let addColors = document.getElementById("colore"); 
  kanap.colors.forEach(kanapColor => html += ` 
       
        <option value="${kanapColor}">${kanapColor}</option>`);
        await ficheProduit()

  addColors.innerHTML = html; // insertion de la variable html;
}



