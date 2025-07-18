const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("btnEliminar");
const modalAgregar = document.getElementById("modalAgregar");
const modalEliminar = document.getElementById("modalEliminar");
const tabla = document.getElementById("tablaUsuarios");
const mensajeEliminar = document.getElementById("mensajeEliminar");

let idCounter = 576;
let usuarioSeleccionado = null;


btnAgregar.onclick = () => {
  modalAgregar.style.display = "flex";
};


document.getElementById("guardarUsuario").onclick = () => {
  const nombre = document.getElementById("nombre").value.trim();
  const apellidoP = document.getElementById("apellidoP").value.trim();
  const apellidoM = document.getElementById("apellidoM").value.trim();
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (!nombre || !apellidoP || !apellidoM) return alert("Completa todos los campos.");

  const fila = document.createElement("tr");
  const clave = Math.floor(Math.random() * 9000 + 1000); 

  fila.innerHTML = `
    <td>#${idCounter}</td>
    <td>${nombre} ${apellidoP} ${apellidoM}</td>
    <td>${clave}</td>
    <td>${tipo}</td>
  `;

  fila.onclick = () => seleccionarUsuario(fila);

  tabla.appendChild(fila);
  idCounter++;

  modalAgregar.style.display = "none";
  limpiarCampos();
};

// Seleccionar fila
function seleccionarUsuario(fila) {
  [...tabla.rows].forEach(row => row.classList.remove("selected"));
  fila.classList.add("selected");
  usuarioSeleccionado = fila;
}

// Mostrar modal eliminar
btnEliminar.onclick = () => {
  if (!usuarioSeleccionado) {
    alert("Selecciona un usuario para eliminar.");
    return;
  }
  const nombre = usuarioSeleccionado.cells[1].textContent.split(" ")[0];
  const id = usuarioSeleccionado.cells[0].textContent;
  mensajeEliminar.textContent = `¿Desea eliminar al usuario ${id} ${nombre}?`;
  modalEliminar.style.display = "flex";
};


document.getElementById("confirmarEliminar").onclick = () => {
  if (usuarioSeleccionado) {
    tabla.removeChild(usuarioSeleccionado);
    usuarioSeleccionado = null;
  }
  modalEliminar.style.display = "none";
};

document.getElementById("cancelarEliminar").onclick = () => {
  modalEliminar.style.display = "none";
};


function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidoP").value = "";
  document.getElementById("apellidoM").value = "";
  document.querySelector('input[value="Mesero"]').checked = true;
}

