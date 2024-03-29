// Création d'un bloc HTML complet par canapé depuis l'API
function importPageAccueil(data, html) {
  try {
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
  } catch (err) {
      alert(err)
  }
}

export {
  importPageAccueil
};