import { importPageAccueil } from "./page_accueil.js";

import { ficheProduit } from "./product.js";

import { produitActuel } from "./product.js";

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
            sectionArticle.innerHTML = html;
        }).catch((err) => {
            console.error(err);
        });
};
// Appel de la fonction d'affichage des produits
getProducts();