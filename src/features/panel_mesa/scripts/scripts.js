let contadorMesas = 2; // Empezamos desde 2 porque la mesa 01 ya está en el HTML

// Función para inicializar los eventos de clic en las mesas
function inicializarMesaEvents(mesaElement) {
    // Asegurarse de que el enlace de la mesa lleve el número correcto
    const numeroMesa = mesaElement.querySelector('.numero').textContent;
    mesaElement.href = `/src/features/apertura_mesa/vista.html?mesa=${numeroMesa}`;

    const eliminar = mesaElement.querySelector('.icono-eliminar');
    if (eliminar) {
        eliminar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace de la mesa se active
            mesaElement.remove();
            // Opcional: Reorganizar los números de las mesas restantes si se elimina una del medio.
            // Esto sería más complejo y podría requerir guardar el estado en localStorage.
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los eventos para la mesa preexistente (Mesa 01)
    const mesaInicial = document.querySelector('.mesa');
    if (mesaInicial) {
        inicializarMesaEvents(mesaInicial);
    }

    // Manejador para el botón de agregar mesa
    document.getElementById('btn-agregar-mesa').addEventListener('click', () => {
        const contenedor = document.querySelector('.contenedor');

        const nuevaMesa = document.createElement('a');
        const numeroActual = contadorMesas.toString().padStart(2, '0'); // Formatea a '02', '03', etc.

        nuevaMesa.className = "mesa libre";
        nuevaMesa.innerHTML = `
            <span class="numero">${numeroActual}</span>
            <img src="/src/assets/icono.png" class="icono" alt="Mesa" />
            <span class="estado">Libre</span>
            <div class="icono-eliminar">
                <img src="/src/assets/eliminar.png" alt="Eliminar">
            </div>
        `;

        // Llamar a la función para inicializar los eventos de la nueva mesa
        inicializarMesaEvents(nuevaMesa);

        contenedor.appendChild(nuevaMesa);
        contadorMesas++; // Incrementa para la siguiente mesa
    });

    // Si tuvieras más mesas estáticas en el HTML que no son la 01, tendrías que iterar sobre ellas
    // document.querySelectorAll('.mesa').forEach(mesa => {
    //     inicializarMesaEvents(mesa);
    // });
});