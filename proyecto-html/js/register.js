// Registro con validación en tiempo real + regiones/comunas dependientes
function initRegisterValidation(){
  // Mapeo simple de regiones de Chile → comunas (muestras)
  const regiones = {
    "Región Metropolitana de Santiago": ["Santiago", "Maipú", "Providencia", "Las Condes"],
    "Región de La Araucanía": ["Temuco", "Villarrica", "Pucón"],
    "Región de Ñuble": ["Chillán", "San Carlos", "Coihueco"],
    "Región del Maule": ["Talca", "Linares", "Curicó"],
    "Región del Biobío": ["Concepción", "Los Ángeles", "Talcahuano"],
    "Región de Los Ríos": ["Valdivia", "Lanco", "La Unión"]
  };

  const $ = id => document.getElementById(id);

  const form   = $("formRegister");
  const nombre = $("nombre");
  const email  = $("email");
  const email2 = $("email2");
  const pass   = $("pass");
  const pass2  = $("pass2");
  const tel    = $("tel");
  const region = $("region");
  const comuna = $("comuna");

  // Poblar regiones
  for(const r of Object.keys(regiones)){
    const opt = document.createElement("option");
    opt.value = r; opt.textContent = r;
    region.appendChild(opt);
  }

  // Al cambiar región, cargar comunas
  region.addEventListener("change", ()=>{
    comuna.innerHTML = `<option value="">-- Selecciona la comuna --</option>`;
    const list = regiones[region.value] || [];
    list.forEach(c=>{
      const opt = document.createElement("option");
      opt.value = c; opt.textContent = c;
      comuna.appendChild(opt);
    });
    comuna.disabled = list.length === 0;
    validateField(region);
    validateField(comuna);
  });

  const rules = {
    nombre: v => /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(v.trim()),
    email:  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    pass:   v => /^(?=.{6,})/.test(v),            // min 6
    tel:    v => v.trim()==="" || /^\+?\d[\d\s]{7,}$/.test(v.trim()), // opcional; si viene, números (+ espacios)
    region: v => v.trim() !== "",
    comuna: v => v.trim() !== ""
  };

  function setState(input, ok, msgId, text){
    input.classList.toggle("is-invalid", !ok);
    input.classList.toggle("is-valid", ok);
    const el = document.getElementById(msgId);
    if(el) el.textContent = ok ? "" : text;
  }

  function validateField(input){
    const id = input.id;
    const val = input.value;

    let ok = true, msg = "";
    if(id==="nombre" && !(ok=rules.nombre(val))) msg="Ingresa tu nombre (mín. 3 letras).";
    if(id==="email"  && !(ok=rules.email(val)))  msg="Correo no válido.";
    if(id==="email2"){
      ok = rules.email(email2.value) && email2.value.trim()===email.value.trim();
      if(!ok) msg="El correo no coincide.";
    }
    if(id==="pass"   && !(ok=rules.pass(val)))   msg="Mínimo 6 caracteres.";
    if(id==="pass2"){
      ok = rules.pass(pass2.value) && pass2.value===pass.value;
      if(!ok) msg="La contraseña no coincide.";
    }
    if(id==="tel"    && !(ok=rules.tel(val)))    msg="Formato inválido. Ej: +56 9 1234 5678";
    if(id==="region" && !(ok=rules.region(val))) msg="Selecciona una región.";
    if(id==="comuna" && !(ok=rules.comuna(val))) msg="Selecciona una comuna.";

    setState(input, ok, "err"+id.charAt(0).toUpperCase()+id.slice(1), msg);
    return ok;
  }

  // Tiempo real
  [nombre,email,email2,pass,pass2,tel,region,comuna].forEach(el=>{
    const ev = (el.tagName==="SELECT") ? "change" : "input";
    el.addEventListener(ev, ()=>validateField(el));
    el.addEventListener("blur", ()=>validateField(el));
  });

  // Submit
  form.addEventListener("submit", e=>{
    const ok = [nombre,email,email2,pass,pass2,tel,region,comuna].map(validateField).every(Boolean);
    if(!ok){
      e.preventDefault();
      const first = [nombre,email,email2,pass,pass2,tel,region,comuna].find(el=>el.classList.contains("is-invalid"));
      if(first) first.focus();
      return;
    }
    e.preventDefault(); // demo sin backend
    alert("Registro completado (simulado). ¡Bienvenido/a a Data Diamonds!");
    form.reset();
    comuna.disabled = true;
    [nombre,email,email2,pass,pass2,tel,region,comuna].forEach(el=>el.classList.remove("is-valid","is-invalid"));
  });
}
