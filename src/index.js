/**
 * Envio de peticicion de usario al formulario
 */

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
// const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".tarjeta-section .cities");
/* SUBSCRIBIRSE AQUI PARA OBETENER UNA API KEY: https://home.openweathermap.org/users/sign_up */
const apikey = "f307a515194902e4f177a9cff13e799d";

form.addEventListener("submit", search);

// Verificar si esta vacio el buscador de pais
function search(e) {
  e.preventDefault();

  const clima = document.querySelector(".top-banner form input").value;

  if (clima === "") {
    // console.log("Este campo es obligatorio...");

    mostrarError("Por favor escribe una ciudad correcta...");

    input.focus();
    return;
  }
  // Consultar API
  consultarAPI(clima);
}

// Creacion de alertas
function mostrarError(error) {
  const mostrarError = document.createElement("p");
  mostrarError.textContent = error;

  // Inyectando HTML
  const contenido = document.querySelector(".top-banner form .msg");
  contenido.appendChild(mostrarError);

  // Eliminar automaticamente la alerta
  setTimeout(() => {
    mostrarError.remove();
  }, 3000);

  form.reset();
  input.focus();
}

// Consumiendo API
function consultarAPI(clima) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${clima}&appid=${apikey}&units=metric`;

  fetch(url)
    .then(respons => respons.json())
    .then(data => {
      // console.log(data)
      if (data.cod === "404") {
        mostrarError("Ciudad no encontrada...😩");

        form.reset();
        input.focus();
        return;
      }
      mostrarClima(data);
    });
}

// Inyectando HMTL para la creeacion de las tarjetas con la informacion del clima
function mostrarClima(data) {
  const { main, name, sys, weather } = data;
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

  // console.log(main, weather)

  const li = document.createElement("li");
  li.classList.add("city");
  const tarjeta = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
  li.innerHTML = tarjeta;
  list.appendChild(li);

  form.reset();
  input.focus();
}

