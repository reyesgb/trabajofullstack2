
const CART_KEY = "dd_cart_v1";

const SERVICES = [
  { id:"svc-dev",   nombre:"Desarrollo Web Full-Stack",       precio:500000 },
  { id:"svc-sec",   nombre:"Auditoría de Ciberseguridad",     precio:350000 },
  { id:"svc-datos", nombre:"Consultoría en Protección de Datos", precio:250000 },
  { id:"svc-ux",    nombre:"Diseño UX/UI",                    precio:300000 },
  { id:"svc-mkt",   nombre:"Marketing Digital & SEO",         precio:200000 },
  { id:"svc-sop",   nombre:"Mantenimiento y Soporte",         precio:150000 },
];

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function updateCartCount(){
  const el = document.getElementById("cartCount");
  if(!el) return;
  const total = getCart().reduce((acc,i)=>acc + i.qty, 0);
  el.textContent = total;
}

function addToCart(serviceId){
  const svc = SERVICES.find(s=>s.id===serviceId);
  if(!svc) return alert("Servicio no encontrado.");
  const cart = getCart();
  const found = cart.find(i=>i.id===svc.id);
  if(found) found.qty += 1;
  else cart.push({ id:svc.id, nombre:svc.nombre, precio:svc.precio, qty:1 });
  saveCart(cart);
  updateCartCount();
  alert(`Agregado: ${svc.nombre}`);
}

function renderCart(){
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  const cart = getCart();
  if(!list || !totalEl) return;

  if(cart.length === 0){
    list.innerHTML = "<li>Tu carrito está vacío.</li>";
    totalEl.textContent = "$0";
    return;
  }

  list.innerHTML = "";
  let total = 0;
  cart.forEach(item=>{
    const li = document.createElement("li");
    const sub = item.precio * item.qty;
    total += sub;
    li.innerHTML = `
      <strong>${item.nombre}</strong> — $${item.precio.toLocaleString("es-CL")}
      × ${item.qty} = <b>$${sub.toLocaleString("es-CL")}</b>
      <button data-act="menos" data-id="${item.id}">-</button>
      <button data-act="mas" data-id="${item.id}">+</button>
      <button data-act="quitar" data-id="${item.id}">Quitar</button>
    `;
    list.appendChild(li);
  });
  totalEl.textContent = `$${total.toLocaleString("es-CL")}`;

  list.onclick = (e)=>{
    const btn = e.target.closest("button"); if(!btn) return;
    const id = btn.getAttribute("data-id");
    const act = btn.getAttribute("data-act");
    let cart = getCart();
    const it = cart.find(x=>x.id===id);
    if(!it) return;
    if(act==="mas") it.qty += 1;
    if(act==="menos") it.qty = Math.max(1, it.qty - 1);
    if(act==="quitar") cart = cart.filter(x=>x.id!==id);
    saveCart(cart);
    renderCart();
    updateCartCount();
  };
}

function clearCart(){
  saveCart([]);
  renderCart();
  updateCartCount();
}
