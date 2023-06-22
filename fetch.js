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
      <h3>Voor- en achternaam: <br >${zomer.title}</h3>
      <p> Telefoonnummer: ${zomer.img}</p>

      <p>Woonplaats: ${zomer.year}</p>
      <p>E-mailadres: ${zomer.rating}</p>
      </div>
    </div>
     `;
    }
    zomerContainer.innerHTML = out;
  });