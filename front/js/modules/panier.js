import { insertionId } from "./confirmation.js";

import {
  appelAPI
} from "./api.js";

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
  }
};


const rechercheProduitAPI = async (produitsPanier) => {
  try {
    const a = await appelAPI;
    const b = a.find((produitActuel) => produitActuel._id === produitsPanier._id);
    return b
  }
  catch (err) { console.log(err) }
};

affichagePanier();
configurationFormulaire();


// Fonction pour générer un bloc HTML par produit
// Fonction pour générer un bloc HTML par produit
async function affichagePanier() {
  let html = "";
  const sectionProduitsPanier = document.getElementById("cart__items");
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  if (panier.length === 0) {
    // Vérifie l"existence du panier
    html = "";
    sectionProduitsPanier.innerHTML = html;
    console.log("Le panier est vide. Merci d'ajouter un produit");
  } else {
    for (const produitsPanier of panier) {
      let produitActuel = await rechercheProduitAPI(produitsPanier).then((res) => res);
      // Génération des produits à partir du panier et de l'API
      html += `
<article class="cart__item" data-id="${produitsPanier._id}" data-color="${produitsPanier.color}">
  <div class="cart__item__img">
    <img src="${produitActuel.imageUrl}" alt="${produitActuel.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${produitActuel.name}</h2>
      <p>${produitsPanier.color}</p>
      <p>${produitActuel.price} €</p>
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
    };
    interactionPanier();
    calculPrixTotal();
    calculQuantiteTotal();
  }
}


// Ajout des triggers sur chaque produit
function interactionPanier() {
  document.querySelectorAll(".deleteItem").forEach((settingTrigger) => {
    settingTrigger.addEventListener("click", suppressionProduitPanier);
  });
  document.querySelectorAll(".itemQuantity").forEach((settingTrigger) => {
    settingTrigger.addEventListener("input", gestionQuantiteProduit);
  });
}

// Suppression panier
function suppressionProduitPanier(trigger) {
  // Isolement du bloc HTML du produit à partir du bouton cliqué
  const produitClique = trigger.target.closest(".cart__item");

  // Récupération des attributs pour modifications du panier
  const produitPanierId = produitClique.dataset.id;
  const produitPanierColor = produitClique.dataset.color;

  // Correspondance du produit de la page avec le produit du panier
  let thisKanap =
    panier.find((ProduitPanier) => ProduitPanier._id === produitPanierId) &&
    panier.find((ProduitPanier) => ProduitPanier.color === produitPanierColor);

  // Supprime le produit
  let indexProduit = panier.indexOf(thisKanap);
  panier.splice(indexProduit, 1);
  localStorage.setItem("Cart", JSON.stringify(panier));

  // Réactualise les produits affichés
  affichagePanier();
  calculPrixTotal();
  calculQuantiteTotal();
}

// Ajout quantité totale
async function calculPrixTotal() {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  for (const produitsPanier of panier) {
    let produitActuel = await rechercheProduitAPI(produitsPanier).then((res) => res);
    const prixTotal = panier.reduce((accumulator, produitsPanier) => {
      return accumulator + produitActuel.price * produitsPanier.quantity;
    }, 0);
    const emplacementPrix = document.getElementById("totalPrice");
    emplacementPrix.innerHTML = prixTotal;
  }
}

function calculQuantiteTotal() {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier
  const quantiteTotale = panier.reduce((accumulator, produitsPanier) => {
    return accumulator + +produitsPanier.quantity;
  }, 0);
  const emplacementQuantite = document.getElementById("totalQuantity");
  emplacementQuantite.innerHTML = quantiteTotale;
}

function gestionQuantiteProduit(trigger) {
  panier = JSON.parse(localStorage.getItem("Cart")) || []; // Récupération du panier

  // Récupération de la quantité du produit
  const produitInput = trigger.target.closest(".itemQuantity");
  const produitClique = trigger.target.closest(".cart__item");

  // Récupération des attributs pour modifications du panier
  const produitPanierId = produitClique.dataset.id;
  const produitPanierColor = produitClique.dataset.color;

  // Correspondance du produit de la page avec le produit du panier
  let thisKanap =
    panier.find((ProduitPanier) => ProduitPanier._id === produitPanierId) &&
    panier.find((ProduitPanier) => ProduitPanier.color === produitPanierColor);

  // Changement de la quantité
  thisKanap.quantity = produitInput.value;

  // Met à jour le nouveau panier
  localStorage.setItem("Cart", JSON.stringify(panier));

  // Réactualise les produits affichés
  affichagePanier();
}



function configurationFormulaire() {
  erreursFormulaire();
  const boutonCommander = document.getElementById("order");
  boutonCommander.addEventListener("click", envoiDonneesFormulaire);
  Object.values(donneesFormulaire).forEach(function (champsFormulaire) {
    champsFormulaire.selecteur.addEventListener("input", verificationChampsFormulaire);
  })


  function verificationChampsFormulaire() {
    // Configuration des regex de validation
    const regexTexte = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
    const regexTexteEtNumero = /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    
    /* Vérification des champs selon regex */
    if (donneesFormulaire.firstName) {
      if (regexTexte.test(donneesFormulaire.firstName.selecteur.value) && donneesFormulaire.firstName.selecteur.value.length > 1) {
        donneesFormulaire.firstName.validation = true;
      } else {
        donneesFormulaire.firstName.validation = false;
      }
    }
    if (donneesFormulaire.lastName) {
      if (regexTexte.test(donneesFormulaire.lastName.selecteur.value) && donneesFormulaire.lastName.selecteur.value.length > 1) {
        donneesFormulaire.lastName.validation = true;
      } else {
        donneesFormulaire.lastName.validation = false;
      }
    }
    if (donneesFormulaire.address) {

      if (regexTexteEtNumero.test(donneesFormulaire.address.selecteur.value) && donneesFormulaire.address.selecteur.value.length > 2) {
        donneesFormulaire.address.validation = true;
      } else {
        donneesFormulaire.address.validation = false;
      }
    }
    if (donneesFormulaire.city) {

      if (regexTexte.test(donneesFormulaire.city.selecteur.value) && donneesFormulaire.city.selecteur.value.length > 1) {
        donneesFormulaire.city.validation = true;
      } else {
        donneesFormulaire.city.validation = false;
      }
    }
    if (donneesFormulaire.email) {
      if (regexMail.test(donneesFormulaire.email.selecteur.value) && donneesFormulaire.email.selecteur.value.length > 2) {
        donneesFormulaire.email.validation = true;
      } else {
        donneesFormulaire.email.validation = false;
      }
    }

    /* Affichage des messages d'erreurs selon l'état */
    if (donneesFormulaire.firstName.validation === false && donneesFormulaire.firstName.selecteur.value.length > 2) {
      document.getElementById("firstNameErrorMsg").hidden = false;
    } else {
      document.getElementById("firstNameErrorMsg").hidden = true;
    }

    if (donneesFormulaire.lastName.validation === false && donneesFormulaire.lastName.selecteur.value.length > 2) {
      document.getElementById("lastNameErrorMsg").hidden = false;
    } else {
      document.getElementById("lastNameErrorMsg").hidden = true;
    }

    if (donneesFormulaire.address.validation === false && donneesFormulaire.address.selecteur.value.length > 2) {
      document.getElementById("addressErrorMsg").hidden = false;
    } else {
      document.getElementById("addressErrorMsg").hidden = true;
    }

    if (donneesFormulaire.city.validation === false && donneesFormulaire.city.selecteur.value.length > 2) {
      document.getElementById("cityErrorMsg").hidden = false;
    } else {
      document.getElementById("cityErrorMsg").hidden = true;
    }

    if (donneesFormulaire.email.validation === false && donneesFormulaire.email.selecteur.value.length > 2) {
      document.getElementById("emailErrorMsg").hidden = false;
    } else {
      document.getElementById("emailErrorMsg").hidden = true;
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
    let commande = {
      contact,
      products
    };
    envoiCommandeAPI(commande);
  } else {
    alert('Les informations saisies semblent invalides ou incomplètes. Merci de les vérifier.')
  }
}
class creationContact {
  constructor(firstName, lastName, address, email, city) {
    this.contact = {};
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.city = city;
  }
}

async function envoiCommandeAPI(commande) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(commande),
  })
    .then((response) => response.json())
    .then((commande) => {
      location.href = `./confirmation.html?${commande.orderId}`;
    })
    .catch((response) => {
      console.error('Error:', response);
    });
}


// Permet de cacher les erreurs en attendant l'interaction de l'utilisateur
function erreursFormulaire() {
  document.getElementById("firstNameErrorMsg").hidden = true;
  document.getElementById("lastNameErrorMsg").hidden = true;
  document.getElementById("addressErrorMsg").hidden = true;
  document.getElementById("cityErrorMsg").hidden = true;
  document.getElementById("emailErrorMsg").hidden = true;
}

