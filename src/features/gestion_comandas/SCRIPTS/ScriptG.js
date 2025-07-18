document.addEventListener('DOMContentLoaded', () => {
  const btnCancelar = document.querySelector('.btn-cancelar');
  const modal = document.getElementById('modalCancelar');
  const btnSi = document.getElementById('btnSi');
  const btnNo = document.getElementById('btnNo');
  const comandaNumero = document.getElementById('comandaNumero');
  const comandaNombre = document.getElementById('comandaNombre');
  
  // Función para mostrar el modal con la información de la comanda
  function mostrarModal(comanda) {
    const numeroComanda = comanda.querySelector('td').textContent.trim();
    const nombreCliente = comanda.querySelector('td:nth-child(2)').textContent.split(' ')[1];
    
    comandaNumero.textContent = numeroComanda;
    comandaNombre.textContent = nombreCliente;

    modal.style.display = 'flex';
  }

  // Agregar evento a las filas de la tabla para mostrar el modal
  const filas = document.querySelectorAll('.comandas-tabla tbody tr');
  filas.forEach(fila => {
    fila.addEventListener('click', () => mostrarModal(fila));
  });

  // Cerrar el modal
  btnNo.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Acción cuando se confirma cancelar
  btnSi.addEventListener('click', () => {
    // Lógica para cancelar la comanda
    alert('Comanda cancelada');
    modal.style.display = 'none';
  });
});

