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

export { importPageAccueil };