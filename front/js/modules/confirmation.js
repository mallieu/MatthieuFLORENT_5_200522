async function insertionId() { 
  document.getElementById("orderId").innerHTML = `<p>${window.location.search.slice(1)}</p>`; 
}
insertionId()



