import { envoiCommandeAPI } from "../js/modules/panier";


window.onload = async () => {
    await envoiCommandeAPI().then((res) => res);
    document.getElementById("orderId").innerHTML = `<p>${commande.orderId}</p>`;
}