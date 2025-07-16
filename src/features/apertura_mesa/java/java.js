// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const mesa = params.get('mesa');
const count = document.querySelector('.count');
const btnGuardar = document.querySelector('.guardar');
const btnCancelar = document.querySelector('.cancelar');
const btnPlus = document.querySelector('.plus');
const btnMinus = document.querySelector('.minus');
const numeroMesa = document.getElementById('numero-mesa');

// Mostrar número de mesa
if (mesa && numeroMesa) {
  numeroMesa.textContent = mesa.padStart(2, '0'); // para que aparezca "04"
}

// Manejar incremento
btnPlus.addEventListener('click', () => {
  let value = parseInt(count.textContent);
  count.textContent = value + 1;
});

// Manejar decremento
btnMinus.addEventListener('click', () => {
  let value = parseInt(count.textContent);
  if (value > 0) count.textContent = value - 1;
});

// Guardar en localStorage
btnGuardar.addEventListener('click', () => {
  if (mesa) {
    const personas = parseInt(count.textContent);
    localStorage.setItem(`personas_mesa_${mesa}`, personas);
  }
});

// Cancelar: eliminar dato del localStorage
btnCancelar.addEventListener('click', () => {
  if (mesa) {
    localStorage.removeItem(`personas_mesa_${mesa}`);
  }
});

if (mesa) {
  const guardadas = localStorage.getItem(`personas_mesa_${mesa}`);
  if (guardadas !== null) {
    count.textContent = guardadas;
  }
}
