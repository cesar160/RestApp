document.addEventListener('DOMContentLoaded', () => {

    const modalContainer = document.getElementById('modal-container');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    const modalForm = document.querySelector('.modal-content form');
    const modalAvisos = document.getElementById('modalAvisos');
    const listaAvisos = document.getElementById('listaAvisos');
    const fechaAvisos = document.getElementById('fechaAvisos');

    
    const openModal = () => {
        modalContainer.style.display = 'flex';
    };

    
    const closeModal = () => {
        modalContainer.style.display = 'none';
    };


    openModalBtn.addEventListener('click', openModal);

   
    closeModalBtn.addEventListener('click', closeModal);

    
    modalContainer.addEventListener('click', (event) => {
        
        if (event.target === modalContainer) {
            closeModal();
        }
    });

    
    modalForm.addEventListener('submit', (event) => {
        event.preventDefault();

      
        const aviso = document.getElementById('aviso-texto').value;
        const dia = document.querySelector('.date-input').value;
        const mes = document.querySelector('.date-select').value;
        const anio = document.querySelector('.year-input').value;

        console.log('--- Aviso Enviado ---');
        console.log('Texto:', aviso);
        console.log('Fecha:', `${dia} de ${mes} de ${anio}`);

        alert('Aviso enviado! Revisa la consola para ver los datos.');
        closeModal(); 
    });

});
const subirBtn = document.getElementById("subirBtn");

subirBtn.addEventListener("click", () => {
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
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        return response.text();
    })
    .then(data => {
        localStorage.setItem("id_aviso", data);
        alert("✅ Aviso creado con éxito. ID: " + data);
    })
    .catch(err => {
        alert("❌ " + err.message);
    });
});

async function cargarAvisos() {
  try {
    const response = await fetch('http://localhost:7000/avisos'); // <-- Aqui pega la apij
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