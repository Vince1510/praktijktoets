const zomersContainer = document.querySelector("#zomers-container");
const zomerURL = `http://localhost:3000/zomers`;
const zomerForm = document.querySelector("#zomer-form");
let allzomers = [];

// Haal films op via een GET-verzoek naar de zomerURL
fetch(`${zomerURL}`)
  .then((response) => response.json())
  .then((zomers) => {
    let out = "";
    for (let zomer of zomers) {
      allzomers = zomers;
      out += `
      <div id="single-zomer">
        <h3>Voor- en achternaam: ${zomer.title}</h3>
        <p>Telefoonnummer: ${zomer.img}</p>
        <p>Woonplaats: ${zomer.year}</p>
        <p>E-mailadres: ${zomer.rating}</p>
        <button data-id="${zomer.id}" id="edit-${zomer.id}" data-action="edit">Bewerken</button>
        <button data-id="${zomer.id}" id="delete-${zomer.id}" data-action="delete">Verwijderen</button>
      </div>`;
    }
    zomersContainer.innerHTML = out;
  });

// Voeg een eventlistener toe aan de knop om een pop-up te openen
const addButton = document.querySelector("button");
addButton.addEventListener("click", togglePopup);

// Voeg een eventlistener toe aan het formulier om een film toe te voegen
zomerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = zomerForm.querySelector("#title").value;
  const yearInput = zomerForm.querySelector("#year").value;
  const imageInput = zomerForm.querySelector("#coverImage").value;
  const ratingInput = zomerForm.querySelector("#rating").value;
  
  // Voeg een nieuwe film toe via een POST
  fetch(`${zomerURL}`, {
    method: "POST",
    body: JSON.stringify({
      title: titleInput,
      year: yearInput,
      img: imageInput,
      rating: ratingInput,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

// Voeg een eventlistener toe aan het filmscontainer om bewerken en verwijderen mogelijk te maken
zomersContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const editButton = document.querySelector(`#edit-${e.target.dataset.id}`);
  editButton.disabled = true;
  
  if (e.target.dataset.action === "edit") {
    const zomerData = allzomers.find((zomer) => zomer.id == e.target.dataset.id);
    
    // Voeg een bewerkingsformulier toe voor de film
    e.target.parentElement.innerHTML += `
    <div id='edit-zomer'>
      <div class="modal-content">
        <form id="zomer-form-edit">
          <input required id="edit-title" value="${zomerData.title}">
          <input required id="edit-year" value="${zomerData.year}">
          <input required id="edit-coverImage" value="${zomerData.img}">
          <input required id="edit-rating" value="${zomerData.rating}">
          <button type="submit" id="edit">Gegevens updaten</button>
        </form>
      </div>
    </div>`;
    
    // Voeg een eventlistener toe aan het bewerkingsformulier om de film te bewerken
    document.querySelector("#edit").addEventListener("click", (e) => {
      e.preventDefault();
      const titleInput = document.querySelector("#edit-title").value;
      const yearInput = document.querySelector("#edit-year").value;
      const imageInput = document.querySelector("#edit-coverImage").value;
      const ratingInput = document.querySelector("#edit-rating").value;
      
      // Bewerk de film via een PATCH
      fetch(`${zomerURL}/${zomerData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: titleInput,
          year: yearInput,
          img: imageInput,
          rating: ratingInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  } else if (e.target.dataset.action === "delete") {
    // Verwijder de film via een DELETE-verzoek
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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the "Aanmelden" button element
  var signInButton = document.getElementById('signIn');

  // Add a click event listener to the button
  signInButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Show the congratulations popup
    showCongratulationsPopup();
  });

  // Function to show the congratulations popup
  function showCongratulationsPopup() {
    // Create the popup element
    var popupElement = document.createElement('div');
    popupElement.className = 'popup';
    popupElement.textContent = 'Congratulations!';

    // Append the popup element to the body
    document.body.appendChild(popupElement);

    // Remove the popup after a certain duration (e.g., 3 seconds)
    setTimeout(function() {
      popupElement.remove();
    }, 3000);
  }
});
