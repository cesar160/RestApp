
function abrirModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const guardarBtn = document.querySelector('.guardar-boton');
  if (guardarBtn) {
    guardarBtn.addEventListener('click', () => {
      abrirModal('modal-confirmar-guardar');
    });
  }

  const confirmarGuardar = document.getElementById('confirmarGuardar');
  if (confirmarGuardar) {
    confirmarGuardar.addEventListener('click', () => {
      cerrarModal('modal-confirmar-guardar');
      setTimeout(() => abrirModal('modal-comanda-guardada'), 300);
    });
  }

  const btnMesas = document.getElementById('btnMesas');
  if (btnMesas) {
    btnMesas.addEventListener('click', () => {
      abrirModal('modal-salir-mesas');
    });
  }

  const btnSumar = document.getElementById('btnSumar');
  const btnRestar = document.getElementById('btnRestar');
  const contador = document.getElementById('contador');

  if (btnSumar && btnRestar && contador) {
    btnSumar.addEventListener('click', () => {
      let valor = parseInt(contador.textContent);
      contador.textContent = valor + 1;
    });

    btnRestar.addEventListener('click', () => {
      let valor = parseInt(contador.textContent);
      if (valor > 1) {
        contador.textContent = valor - 1;
      }
    });
  }

  const confirmarSalir = document.getElementById('confirmarSalir');
  if (confirmarSalir) {
    confirmarSalir.addEventListener('click', () => {
      window.location.href = "/src/features/panel_mesa/PanelMesa.html";
    });
  }
  
});
