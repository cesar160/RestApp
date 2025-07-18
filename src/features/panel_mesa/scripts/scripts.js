let contadorMesas = 2; 
const modal = document.getElementById("modalMesero");

document.getElementById("boton-agregar-aviso").addEventListener("click", function (event) {
  event.preventDefault(); // evita redirección
  modal.style.display = "flex";
});

function cerrarModal() {
  modal.style.display = "none";
}

function guardarCodigo() {
  const codigo = document.getElementById("codigoMesero").value;
  if (codigo.trim() === "") {
    alert("Por favor ingrese un código");
    return;
  }

  // Aquí haces la redirección
  window.location.href = "/src/features/mesas_asignadas/index.html";
}


function inicializarMesaEvents(mesaElement) {
    const numeroMesa = mesaElement.querySelector('.numero').textContent;
    mesaElement.href = `/src/features/apertura_mesa/vista.html?mesa=${numeroMesa}`;

    const eliminar = mesaElement.querySelector('.icono-eliminar');
    if (eliminar) {
        eliminar.addEventListener('click', (e) => {
            e.preventDefault(); 
            mesaElement.remove();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mesaInicial = document.querySelector('.mesa');
    if (mesaInicial) {
        inicializarMesaEvents(mesaInicial);
    }

    document.getElementById('btn-agregar-mesa').addEventListener('click', () => {
        const contenedor = document.querySelector('.contenedor');

        const nuevaMesa = document.createElement('a');
        const numeroActual = contadorMesas.toString().padStart(2, '0'); 

        nuevaMesa.className = "mesa libre";
        nuevaMesa.innerHTML = `
            <span class="numero">${numeroActual}</span>
            <img src="/src/assets/icono.png" class="icono" alt="Mesa" />
            <span class="estado">Libre</span>
            <div class="icono-eliminar">
                <img src="/src/assets/eliminar.png" alt="Eliminar">
            </div>
        `;

        inicializarMesaEvents(nuevaMesa);

        contenedor.appendChild(nuevaMesa);
        contadorMesas++; 
    });

    
});