function cardHTML(svc){
  return `
  <article class="card">
    <div class="card__icon" aria-hidden="true">${svc.icono}</div>
    <h3 class="card__title">${svc.nombre}</h3>
    <p class="card__desc">${svc.desc}</p>
    <div class="card__price">$${svc.precio.toLocaleString("es-CL")}</div>
    <button class="btn" onclick="addToCart('${svc.id}')">Agregar al carrito</button>
  </article>`;
}

function renderFeatured(){
  const el = document.getElementById("featuredGrid");
  if(!el) return;
  const destacados = SERVICES.slice(0,3); // 3 primeros
  el.innerHTML = destacados.map(cardHTML).join("");
}

function renderAllProducts(){
  const el = document.getElementById("productsGrid");
  if(!el) return;
  el.innerHTML = SERVICES.map(cardHTML).join("");
}
