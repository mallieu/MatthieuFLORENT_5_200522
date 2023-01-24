
 async function insertionId(commande) {
  let a = await chargementPage().then((res) => res);
  console.log(a)
  a.innerHTML = `<p>${commande.orderId}</p>`;      
}
 

async function chargementPage() {
    window.onload = () =>{   
    let a =  document.getElementById("orderId")
  return a}


     

}


export {insertionId}




