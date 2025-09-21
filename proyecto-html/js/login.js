// Validación en tiempo real para LOGIN (reusa reglas de register)
function initLoginValidation(){
  const form  = document.getElementById("loginForm");
  if(!form) return;

  const email = document.getElementById("lemail");
  const pass  = document.getElementById("lpass");

  // mismas reglas que usamos antes
  const rules = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    pass : v => /^(?=.{6,})/.test(v) // mínimo 6
  };

  function setState(input, ok, msgId, text){
    input.classList.toggle("is-invalid", !ok);
    input.classList.toggle("is-valid", ok);
    const m = document.getElementById(msgId);
    if(m) m.textContent = ok ? "" : text;
  }

  function validateField(input){
    let ok = true, msg = "";
    if(input.id === "lemail" && !(ok = rules.email(input.value))) msg = "Correo no válido.";
    if(input.id === "lpass"  && !(ok = rules.pass(input.value)))  msg = "Mínimo 6 caracteres.";
    setState(input, ok, (input.id==="lemail" ? "errLemail" : "errLpass"), msg);
    return ok;
  }

  // feedback en vivo
  [email, pass].forEach(el=>{
    el.addEventListener("input", ()=>validateField(el));
    el.addEventListener("blur",  ()=>validateField(el));
  });

  // submit
  form.addEventListener("submit", (e)=>{
    const ok = [email, pass].map(validateField).every(Boolean);
    if(!ok){
      e.preventDefault();
      ([email, pass].find(el=>el.classList.contains("is-invalid")) || email).focus();
      return;
    }
    e.preventDefault(); // demo
    alert("Inicio de sesión simulado ✅");
    // Aquí podrías redirigir si quisieras:
    // location.href = "./index.html";
  });
}
