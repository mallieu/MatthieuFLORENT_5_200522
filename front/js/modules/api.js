import {
  importPageAccueil, // Affichage produit page accueil
} from "./page_accueil.js";
import {
  ficheProduit, // Affichage fiche produit
} from "./fiche_produit.js";
import {
  eventsListeners, // Activation déclencheurs
} from "./gestion_produits.js";

// Déclaration de la section HTML qui accueillera les données
let sectionArticle = "";

const urlAPI = "http://localhost:3000/api/products"

// Appel des données pour la génération des produits
const recuperationProduitsAPI = async function () {
  // Appel de l'API
  fetch(urlAPI)
    .then((result) => result.json())
    .then((data) => {
      let html = ""; // Création d'une variable HTML de type string

      /* Génération des produits selon le type de page
         Les fonctions sont sur des fichiers distincts */

      // Fiche Produit
      if (window.location.href.indexOf("id") > -1) {
        // Paramétrage de la section
        sectionArticle = document.getElementsByClassName("item")[0];
        html = ficheProduit(data, html);

        // Page accueil
      } else {
        // Paramétrage de la section
        sectionArticle = document.getElementById("items");
        html = importPageAccueil(data, html);
      }
      // Insertion des produits avec la variable HTML.
      // N.B.Le sélecteur est commun aux deux fonctions mais change selon les cas.
      insertionHTML(html);
    })
    .catch((err) => {
      console.error(err);
    });
};

async function insertionHTML(html) {
  sectionArticle.innerHTML = html;
  if (window.location.href.indexOf("id") > -1) {
    eventsListeners();
  }
}

export { recuperationProduitsAPI, insertionHTML };
