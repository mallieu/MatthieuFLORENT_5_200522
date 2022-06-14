importProduits();

let donneesAPI = [];

async function importProduits() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }
        donneesAPI = await response.json();
        return creationCanape();
    } catch (err) {
        console.log(err);
    }
}


async function creationCanape() {
    for (let canape of donneesAPI) {
        let ajoutCanape = document.createElement("div");
        let importDonnees = document.getElementById("items");
        ajoutCanape.innerHTML += '<a href="./product.html?id=42"> \
            <article> \
            <img src="http://localhost:3000/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1"> \
              <h3 class="productName">Kanap name1</h3> \
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p> \
            </article> \
          </a>';
        importDonnees.appendChild(ajoutCanape);
        modificationCanape(canape, ajoutCanape);
    }
return; 
}


// Tentative 1 
async function modificationCanape(canape, ajoutCanape) {
    let a = document.createElement("div");
    let b = ajoutCanape.getElementsByClassName("productName");
    a.innerText += "OUI" ;
    b.appendChild(a);
}

// Tentative 2
async function modificationCanape(canape, ajoutCanape) {
  //Déclaration des variables liées au canapé
      const  altTxt  = canape.altTxt 
      const colors = canape.colors
      const description = canape.description
      const imageUrl = canape.imageUrl
      const name = canape.name
      const price = canape.price
      const id = canape._id
      let a = ajoutCanape.getElementsByClassName('productName')
  a.innerContent = name
  console.log(a)
  return;
  }
      
    

