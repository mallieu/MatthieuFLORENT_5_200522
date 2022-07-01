// Appel de la fonction d'affichage des produits
import { getProducts } from "./modules/api.js" 
getProducts();

// Mise en route des déclencheurs
import { eventsListeners } from "./modules/cart.js";
eventsListeners()