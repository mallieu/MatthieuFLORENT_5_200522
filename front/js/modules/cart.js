const sectionProduitsPanier = document.getElementById("cart__items");

let panier = [];

// Identification des champs du formulaire
const donneesFormulaire = {
  firstName: {
    selecteur: document.getElementById("firstName"),
    validation: false,
  },
  lastName: {
    selecteur: document.getElementById("lastName"),
    validation: false,
  },
  address: {
    selecteur: document.getElementById("address"),
    validation: false,
  },
  city: {
    selecteur: document.getElementById("city"),
    validation: false,
  },
  email: {
    selecteur: document.getElementById("email"),
    validation: false,
  },
};

const boutonCommander = document.getElementById("order");

affichageProduitPanier();
configurationFormulaire();

// Fonction pour générer un bloc HTML par produit
function affichageProduitPanier() {
  let html = "";
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  if (panier.length === 0) {
    // Vérifie l"existence du panier
    html = "";
    sectionProduitsPanier.innerHTML = html;
    console.log("Le panier est vide. Merci d'ajouter un produit");
  } else {
    panier.forEach((produitsPanier) => {
      // Génération des produits à partir du panier
      html += `
      <article class="cart__item" data-id="${produitsPanier._id}" data-color="${produitsPanier.color}">
        <div class="cart__item__img">
          <img src="${produitsPanier.imageUrl}" alt="${produitsPanier.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produitsPanier.name}</h2>
            <p>${produitsPanier.color}</p>
            <p>${produitsPanier.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produitsPanier.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      sectionProduitsPanier.innerHTML = html;
    });
    actualisationProduitPanier();
    interactionProduitPanier()
  }
}

// Ajout des triggers sur chaque produit
function interactionProduitPanier() {
  console.log("coucou")
  document.querySelectorAll(".deleteItem").forEach((configurationTrigger) => {
    configurationTrigger.addEventListener("click", (trigger) => {
      let produitChoisi = selectionProduitPanier(trigger);
      suppressionProduitPanier(produitChoisi);
    })
  });
  document.querySelectorAll(".itemQuantity").forEach((configurationTrigger) => {
    configurationTrigger.addEventListener("input", (trigger) => {
      let produitChoisi = selectionProduitPanier(trigger);
      modificationProduitPanier(produitChoisi);
    })
  });
}

function selectionProduitPanier(trigger) {
  // Récupération des principaux attributs du produit cible
  let selectionProduit = trigger.target.closest(".cart__item"),
    quantiteProduit = trigger.target.closest(".itemQuantity"),
    idProduit = selectionProduit.dataset.id,
    couleurProduit = selectionProduit.dataset.color;
  return { idProduit, couleurProduit, quantiteProduit };
}

function modificationProduitPanier(produitChoisi) {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  // Correspondance du produit de la page avec le produit en storage
  let thisKanap =
    panier.find((ProduitPanier) => ProduitPanier._id === produitChoisi.idProduit) &&
    panier.find((ProduitPanier) => ProduitPanier.color === produitChoisi.couleurProduit);

  // Changement de la quantité
  thisKanap.quantity = produitChoisi.quantiteProduit.value;

  // Met à jour le nouveau panier
  localStorage.setItem("Cart", JSON.stringify(panier));
  // Réactualise les produits affichés
  affichageProduitPanier();
}

// Suppression panier
function suppressionProduitPanier(produitChoisi) {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  // Correspondance du produit de la page avec le produit en storage
  let thisKanap =
    panier.find((ProduitPanier) => ProduitPanier._id === produitChoisi.idProduit) &&
    panier.find((ProduitPanier) => ProduitPanier.color === produitChoisi.couleurProduit);

  // Récupère l'index du produit
  let indexProduit = panier.indexOf(thisKanap);

  // Supprime le produit
  panier.splice(indexProduit, 1);

  // Met à jour le nouveau panier
  localStorage.setItem("Cart", JSON.stringify(panier));

  // Réactualise les produits affichés
  affichageProduitPanier();
}

function actualisationProduitPanier() {
  console.log("actu")
  // Calcul prix total
  function calculPrixTotal() {
    panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
    const prixTotal = panier.reduce((accumulator, produitsPanier) => {
      return accumulator + produitsPanier.price * produitsPanier.quantity;
    }, 0);
    const emplacementPrixTotal = document.getElementById("totalPrice");
    emplacementPrixTotal.innerHTML = prixTotal;
  }

  // Calcul quantité totale
  function calculQuantiteTotal() {
    panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
    const quantiteTotale = panier.reduce((accumulator, produitsPanier) => {
      return accumulator + +produitsPanier.quantity;
    }, 0);
    const emplacementQuantiteTotale = document.getElementById("totalQuantity");
    emplacementQuantiteTotale.innerHTML = quantiteTotale;
  }
  calculPrixTotal();
  calculQuantiteTotal();
}




function configurationFormulaire() {
  erreursFormulaire();
  boutonCommander.addEventListener("click", envoiDonneesFormulaire);
  Object.keys(donneesFormulaire).forEach((champsFormulaire) =>
    gestionDonneesFormulaire(champsFormulaire)
  );

  function gestionDonneesFormulaire() {
    this.addEventListener("input", validationDonneesFormulaire);
  }

  function validationDonneesFormulaire() {
    if (
      donneesFormulaire.firstName.selecteur.value.match(
        /[A-Za-zÀ-ÖØ-öø-ÿ'][\s\p{L}-]*$/g
      )
    ) {
      donneesFormulaire.firstName.validation = true;
      document.getElementById("firstNameErrorMsg").hidden = true;
    } else {
      if (donneesFormulaire.firstName.selecteur.value.length > 1) {
        donneesFormulaire.firstName.validation = false;
        document.getElementById("firstNameErrorMsg").hidden = false;
      }
    }

    if (
      donneesFormulaire.lastName.selecteur.value.match(
        /[A-Za-zÀ-ÖØ-öø-ÿ'][\s\p{L}-]*$/g
      )
    ) {
      donneesFormulaire.lastName.validation = true;
      document.getElementById("lastNameErrorMsg").hidden = true;
    } else {
      if (donneesFormulaire.lastName.selecteur.value.length > 1) {
        donneesFormulaire.lastName.validation = false;
        document.getElementById("lastNameErrorMsg").hidden = false;
      }
    }

    if (
      donneesFormulaire.address.selecteur.value.match(
        /[A-Za-zÀ-ÖØ-öø-ÿ0-9'][\s\p{L}-]*$/g
      )
    ) {
      donneesFormulaire.address.validation = true;
      document.getElementById("addressErrorMsg").hidden = true;
    } else {
      if (donneesFormulaire.address.selecteur.value.length > 1) {
        donneesFormulaire.address.validation = false;
        document.getElementById("addressErrorMsg").hidden = false;
      }
    }

    if (
      donneesFormulaire.city.selecteur.value.match(
        /[A-Za-zÀ-ÖØ-öø-ÿ'][\s\p{L}-]*$/g
      )
    ) {
      donneesFormulaire.city.validation = true;
      document.getElementById("cityErrorMsg").hidden = true;
    } else {
      if (donneesFormulaire.city.selecteur.value.length > 1) {
        donneesFormulaire.city.validation = false;
        document.getElementById("cityErrorMsg").hidden = false;
      }
    }

    if (
      donneesFormulaire.email.selecteur.value.match(
        /^([a-z0-9_.+-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
      )
    ) {
      donneesFormulaire.email.validation = true;
      document.getElementById("emailErrorMsg").hidden = true;
    } else {
      if (donneesFormulaire.email.selecteur.value.length > 1) {
        donneesFormulaire.email.validation = false;
        document.getElementById("emailErrorMsg").hidden = false;
      }
    }
  }
}

function envoiDonneesFormulaire() {
  if (
    donneesFormulaire.firstName.validation === true &&
    donneesFormulaire.lastName.validation === true &&
    donneesFormulaire.address.validation === true &&
    donneesFormulaire.city.validation === true &&
    donneesFormulaire.email.validation === true
  ) {
    let contact = new creationContact(
      donneesFormulaire.firstName.selecteur.value,
      donneesFormulaire.lastName.selecteur.value,
      donneesFormulaire.address.selecteur.value,
      donneesFormulaire.email.selecteur.value,
      donneesFormulaire.city.selecteur.value
    );
    let products = panier.map((produit) => produit._id);
    let commande = { contact, products }
    console.log(commande)
    envoiCommandeAPI(commande);
  }
}
class creationContact {
  constructor(firstName, lastName, address, email, city) {
    this.contact = {}
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.city = city;
  }
}

// function envoiCommandeAPI(commande) {
//     let response = fetch("http://localhost:3000/api/products/order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(commande),
//     });
//   }


// obtenir code de la requête (201 => BIEN)

function erreursFormulaire() {
  // Permet de cacher les erreurs en attendant l'interaction de l'utilisateur
  document.getElementById("firstNameErrorMsg").hidden = true;
  document.getElementById("lastNameErrorMsg").hidden = true;
  document.getElementById("addressErrorMsg").hidden = true;
  document.getElementById("cityErrorMsg").hidden = true;
  document.getElementById("emailErrorMsg").hidden = true;
}

