const zomersContainer = document.querySelector("#zomers-container");
const zomerURL = `http://localhost:3000/zomers`;
const zomerForm = document.querySelector("#zomer-form");
let allzomers = [];

// Haal items op via een GET-verzoek naar de zomerURL
fetch(`${zomerURL}`)
  .then((response) => response.json())
  .then((zomers) => {
    let out = "";
    for (let zomer of zomers) {
      allzomers = zomers;
      out += `
      <div id="single-zomer">
        <h3>Voor- en achternaam: ${zomer.name}</h3>
        <p>Telefoonnummer: ${zomer.phone}</p>
        <p>Woonplaats: ${zomer.place}</p>
        <p>E-mailadres: ${zomer.email}</p>
        <button data-id="${zomer.id}" id="edit-${zomer.id}" data-action="edit">Bewerken</button>
        <button data-id="${zomer.id}" id="delete-${zomer.id}" data-action="delete">Verwijderen</button>
      </div>`;
    }
    zomersContainer.innerHTML = out;
  });

// Voeg een eventlistener toe aan de knop om een pop-up te openen
const addButton = document.querySelector("button");
addButton.addEventListener("click", togglePopup);

// Voeg een eventlistener toe aan het formulier om een item toe te voegen
zomerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = zomerForm.querySelector("#name").value;
  const placeInput = zomerForm.querySelector("#place").value;
  const imageInput = zomerForm.querySelector("#phone").value;
  const emailInput = zomerForm.querySelector("#email").value;
  
  // Voeg een nieuw item toe via een POST
  fetch(`${zomerURL}`, {
    method: "POST",
    body: JSON.stringify({
      name: nameInput,
      place: placeInput,
      phone: imageInput,
      email: emailInput,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

// Voeg een eventlistener toe aan het zomerscontainer om bewerken en verwijderen mogelijk te maken
zomersContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const editButton = document.querySelector(`#edit-${e.target.dataset.id}`);
  editButton.disabled = true;
  
  if (e.target.dataset.action === "edit") {
    const zomerData = allzomers.find((zomer) => zomer.id == e.target.dataset.id);
    
    // Voeg een bewerkingsformulier toe voor het item
    e.target.parentElement.innerHTML += `
    <div id='edit-zomer'>
      <div class="modal-content">
        <form id="zomer-form-edit">
          <input required id="edit-name" value="${zomerData.name}">
          <input required id="edit-place" value="${zomerData.place}">
          <input required id="edit-phone" value="${zomerData.phone}">
          <input required id="edit-email" value="${zomerData.email}">
          <button type="submit" id="edit">Gegevens updaten</button>
        </form>
      </div>
    </div>`;
    
    // Voeg een eventlistener toe aan het bewerkingsformulier om het item te bewerken
    document.querySelector("#edit").addEventListener("click", (e) => {
      e.preventDefault();
      const nameInput = document.querySelector("#edit-name").value;
      const placeInput = document.querySelector("#edit-place").value;
      const imageInput = document.querySelector("#edit-phone").value;
      const emailInput = document.querySelector("#edit-email").value;
      
      // Bewerk het item via een PATCH
      fetch(`${zomerURL}/${zomerData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: nameInput,
          place: placeInput,
          phone: imageInput,
          email: emailInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  } else if (e.target.dataset.action === "delete") {
    // Verwijder item via een DELETE-verzoek
    document.querySelector(`#delete-${e.target.dataset.id}`).remove();
    
    fetch(`${zomerURL}/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});

// Functie om de zichtbaarheid van de pop-up te wijzigen
function togglePopup() {
  var popup = document.getElementById("popupContainer");
  popup.style.visibility =
    popup.style.visibility === "visible" ? "hidden" : "visible";
}


