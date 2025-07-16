 let contadorMesas = 2;

    document.getElementById('btn-agregar-mesa').addEventListener('click', () => {
      const contenedor = document.querySelector('.contenedor');

      const nuevaMesa = document.createElement('a');
      nuevaMesa.href = "/src/features/apertura_mesa/vista.html";
      nuevaMesa.className = "mesa libre";
      nuevaMesa.innerHTML = `
        <span class="numero">${contadorMesas.toString().padStart(2, '0')}</span>
        <img src="/src/assets/icono.png" class="icono" alt="Mesa" />
        <span class="estado">Libre</span>
        <div class="icono-eliminar">
          <img src="/src/assets/eliminar.png" alt="Eliminar">
        </div>
      `;

      nuevaMesa.querySelector('.icono-eliminar').addEventListener('click', (e) => {
        e.preventDefault();
        nuevaMesa.remove();
      });

      contenedor.appendChild(nuevaMesa);
      contadorMesas++;
    });

    document.querySelectorAll('.mesa').forEach(mesa => {
      const eliminar = mesa.querySelector('.icono-eliminar');
      if (eliminar) {
        eliminar.addEventListener('click', (e) => {
          e.preventDefault();
          mesa.remove();
        });
      }
    });