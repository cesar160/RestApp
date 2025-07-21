document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modal-container');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close-btn');
     const modalForm = document.querySelector('.modalform');
    const subirBtn = document.getElementById("subirBtn");
    const modalAvisos = document.getElementById('modalAvisos');
    const listaAvisos = document.getElementById('listaAvisos');
    const fechaAvisos = document.getElementById('fechaAvisos');

    openModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    subirBtn.addEventListener("click", (event) => {
        event.preventDefault();

        let contenido = document.getElementById("contenido").value;
        let anio = document.getElementById("año").value;
        let mes = document.getElementById("mes").value.padStart(2, '0');   
        let dia = document.getElementById("dia").value.padStart(2, '0');   
        let fecha = `${anio}-${mes}-${dia}`;

        fetch('http://localhost:7000/avisos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "contenido": contenido,
                "fecha": fecha,
                "id_usuario": 1
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Error en la petición");
            return response.text();
        })
        .then(data => {
            localStorage.setItem("id_aviso", data);
            alert("✅ Aviso creado con éxito. ID: " + data);
            modalContainer.style.display = 'none';
        })
        .catch(err => alert("❌ " + err.message));
    });

    const btnAgregar = document.getElementById("btn-agregar-mesa");
    const contenedor = document.getElementById("contenedor-mesas");
    let contador = contenedor.querySelectorAll(".mesa").length;

    btnAgregar.addEventListener("click", () => {
        contador++;
        const numeroMesa = contador.toString().padStart(2, '0');

        const nuevaMesa = document.createElement("a");
        nuevaMesa.classList.add("mesa", "libre");
        nuevaMesa.href = `/src/features/apertura_mesa/vista.html?mesa=${numeroMesa}`;
        nuevaMesa.innerHTML = `
            <span class="numero">${numeroMesa}</span>
            <img src="/src/assets/icono.png" class="icono" alt="Mesa" />
            <span class="estado">Libre</span>
            <div class="icono-eliminar">
                <img src="/src/assets/eliminar.png" alt="Eliminar">
            </div>
        `;
        contenedor.appendChild(nuevaMesa);
    });

    contenedor.addEventListener("click", (e) => {
        const btnEliminar = e.target.closest(".icono-eliminar");
        if (btnEliminar) {
            e.preventDefault(); 
            const mesa = btnEliminar.closest("a.mesa");
            if (mesa) mesa.remove();
        }
    });

    async function cargarAvisos() {
  try {
    const response = await fetch('http://localhost:7000/avisos'); 
    if (!response.ok) throw new Error('Error al obtener avisos');

    const data = await response.json();

    listaAvisos.innerHTML = "";
    data.forEach(aviso => {
      const li = document.createElement("li");
      li.textContent = aviso.mensaje || aviso;
      listaAvisos.appendChild(li);
    });

    const hoy = new Date();
    fechaAvisos.textContent = hoy.toLocaleDateString('es-MX', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });

  } catch (error) {
    console.error("Error cargando avisos:", error);
    listaAvisos.innerHTML = "<li>Error al cargar los avisos.</li>";
  }
}

document.getElementById('btnCampana').addEventListener('click', async () => {
  await cargarAvisos();
  modalAvisos.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === modalAvisos) {
    cerrarModalAvisos();
  }
});

function cerrarModalAvisos() {
  modalAvisos.style.display = "none";
}

setInterval(() => {
  if (modalAvisos.style.display === "flex") {
    cargarAvisos();
  }
}, 30000);
});
