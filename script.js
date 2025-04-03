let llamados = []; // Lista de objetos con texto y timestamp
let preceptorActual = "Preceptor 1"; // Nombre del preceptor actual

// Funciones para el botón de enviar llamado
function enviarLlamado() {
  const curso = document.getElementById('curso').value;
  const urgencia = document.getElementById('urgencia').value;
  if (!curso) return alert('Ingresa un curso');
  const mensaje = `Llamado de ${curso} (${urgencia})`;
  document.getElementById('llamado').innerText = mensaje;
  registrarLlamado(`${mensaje} asignado a ${preceptorActual}`);
}

// Funciones para el botón de respuesta
function responder(respuesta) { 
  const llamadoActual = document.getElementById('llamado').innerText;
  if (!llamadoActual) return alert('No hay llamado activo');
  const registro = `${llamadoActual} - ${preceptorActual}: ${respuesta}`;
  registrarLlamado(registro);
  document.getElementById('llamado').innerText = '';
}

// Funciones para el botón de derivar
function derivar() {
  const llamadoActual = document.getElementById('llamado').innerText;
  if (!llamadoActual) return alert('No hay llamado activo');
  preceptorActual = preceptorActual === "Preceptor 1" ? "Preceptor 2" : "Preceptor 1";
  const registro = `${llamadoActual} - Derivado a ${preceptorActual}`;
  registrarLlamado(registro);
  document.getElementById('llamado').innerText = `Reasignado a ${preceptorActual}: ${llamadoActual}`;
}

// Función para registrar un llamado
function registrarLlamado(texto) {
  const fecha = new Date();
  llamados.push({ texto: `${fecha.toLocaleString()}: ${texto}`, timestamp: fecha.getTime() });
}

// Función para mostrar el registro de llamados
function mostrarRegistro() {
  const logDiv = document.getElementById('log');
  const verRegistroBtn = document.getElementById('verRegistro');
  
  if (logDiv.classList.contains('hidden')) {
    const ahora = new Date().getTime();
    const treintaDiasAtras = ahora - (30 * 24 * 60 * 60 * 1000); // 30 días en milisegundos
    const registrosFiltrados = llamados
      .filter(llamado => llamado.timestamp >= treintaDiasAtras)
      .map(llamado => llamado.texto);
    
    logDiv.innerText = registrosFiltrados.length > 0 ? registrosFiltrados.join('\n') : 'No hay registros en los últimos 30 días.';
    logDiv.classList.remove('hidden');
    verRegistroBtn.innerText = 'Ocultar Registro';
  } else {
    logDiv.classList.add('hidden');
    verRegistroBtn.innerText = 'Ver Registro';
  }
}