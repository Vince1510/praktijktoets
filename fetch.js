const zomerContainer = document.querySelector(".grid-container");
const zomersURL = `  http://localhost:3000/zomers`;

// Haal films op via een HTTP GET-verzoek naar de zomersURL

fetch(`${zomersURL}`)
  .then((response) => response.json())
  .then((zomers) => {
    let out = "";
    for (let zomer of zomers) {
      out += `
      <div class="grid-item category${zomer.id}">
      <div id="single-zomer">
      <h3>Voor- en achternaam: <br >${zomer.name}</h3>
      <p> Telefoonnummer: ${zomer.phone}</p>

      <p>Woonplaats: ${zomer.place}</p>
      <p>E-mailadres: ${zomer.email}</p>
      </div>
    </div>
     `;
    }
    zomerContainer.innerHTML = out;
  });