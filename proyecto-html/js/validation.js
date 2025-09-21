// Validación en tiempo real — simple y clara
function initContactValidation(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const motivo = document.getElementById("motivo");
  const mensaje = document.getElementById("mensaje");
  const terminos = document.getElementById("terminos");

  // Reglas mínimas
  const rules = {
    nombre: v => /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(v.trim()),
    email:  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    motivo: v => v.trim() !== "",
    mensaje:v => v.trim().length >= 10,
    terminos:v => v === true
  };

  function setError(input, ok, msgId, text){
    input.classList.toggle("is-invalid", !ok);
    input.classList.toggle("is-valid", ok);
    const m = document.getElementById(msgId);
    if(m) m.textContent = ok ? "" : text;
  }

  function validateField(input){
    const id = input.id;
    const val = (id==="terminos") ? input.checked : input.value;
    let ok = true, msg = "";

    if(id==="nombre"  && !(ok = rules.nombre(val)))  msg="Ingresa al menos 3 letras (solo letras y espacios).";
    if(id==="email"   && !(ok = rules.email(val)))   msg="Correo electrónico no válido.";
    if(id==="motivo"  && !(ok = rules.motivo(val)))  msg="Selecciona un motivo.";
    if(id==="mensaje" && !(ok = rules.mensaje(val))) msg="Escribe al menos 10 caracteres.";
    if(id==="terminos"&& !(ok = rules.terminos(val)))msg="Debes aceptar los términos.";

    setError(input, ok, "err"+id.charAt(0).toUpperCase()+id.slice(1), msg);
    return ok;
  }

  // En tiempo real
  [nombre,email,motivo,mensaje].forEach(el=>{
    el.addEventListener("input", ()=>validateField(el));
    el.addEventListener("blur",  ()=>validateField(el));
  });
  terminos.addEventListener("change", ()=>validateField(terminos));

  // Enviar
  form.addEventListener("submit", (e)=>{
    const checks = [nombre,email,motivo,mensaje,terminos].map(validateField);
    if(!checks.every(Boolean)){
      e.preventDefault();
      const first = [nombre,email,motivo,mensaje,terminos].find(el=>el.classList.contains("is-invalid"));
      if(first) first.focus();
      return;
    }
    // En esta evaluación no enviamos a servidor:
    e.preventDefault();
    alert("Formulario enviado (simulado).");
    form.reset();
    [nombre,email,motivo,mensaje,terminos].forEach(el=>el.classList.remove("is-valid","is-invalid"));
  });
}
