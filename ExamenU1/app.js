// NOTAS:
// Array [] [{name: "pika"}, {name: "char"}] -> SI se usa forEach porque hay varios elementos para recorrer
// Objeto {} {"name": "pikachu", "id": 25...} -> NO se usa forEach porque es una sola entidad con muchas propiedades.

const btnBuscar = document.getElementById("btnBuscar");
const contentData = document.getElementById("contentData");
const inputBuscar = document.getElementById("inputBuscar");
const createForm = document.getElementById("createForm")

const obtenerDatos = async () => {

    if (inputBuscar.value === "") {
        contentData.innerHTML = "<p>El campo no puede estar vacio</p>";
        return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputBuscar.value}`);
    console.log(response);

    if (!response.ok) {
        contentData.innerHTML = "<p>Pokémon no encontrado</p>";
        return;
    }

    const data = await response.json();
    console.log(data);

    contentData.innerHTML = "<h2>Datos obtenidos</h2>";

    const divCard = document.createElement("div");
    divCard.classList.add("col-md-4");

    divCard.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
        <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2>${data.name}</h2>
        <p class="card-text">Tipo ${data.types[0].type.name}</p>
        <p class="card-text">Habilidad: ${data.abilities[0].ability.name}</p>
        <p class="card-text">Peso ${data.weight}</p>
        </div>
        </div>
        `
    contentData.appendChild(divCard);

}

createForm.addEventListener("submit", (event) => {
    event.preventDefault();
})

btnBuscar.addEventListener("click", obtenerDatos)