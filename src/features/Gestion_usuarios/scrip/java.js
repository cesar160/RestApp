const btnMostrarUser = document.getElementById("btnReadUser")

btnMostrarUser.addEventListener("click",()=> {
    fetch('http://localhost:7000/users')   //GET
    .then(respose => {
        if (respose.ok)
            return respose.json()
        else
            alert("Error al consumir la API")
    })
    .then(data => {
        const listUser = document.getElementById("listUser")
        console.log(data[0].name);
        data.forEach(user => {
             let item = document.createElement("li")
            item.innerText = user.name
            listUser.appendChild(item)    
        });
    })
});

const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", ()=>{
    let nombre = document.getElementById("nombre").value
    let apellidoP = document.getElementById("apellidoP").value
    let email = document.getElementById("email").value
    let contrasena = document.getElementById("contrasena").value
    let rol = document.getElementById("rol").value

    fetch('http://localhost:7000/usuario',  //POST
        {
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                "nombre": nombre,
                "apellidoP": apellidoP,
                "email": email,
                "contrasena": contrasena,
                "rol": rol
            })
        })
        .then(response => {
            if (response.ok)
                return response.text()
            else
                alert("Error en la petición")
        })
        .then(data => {
            localStorage.setItem("idUser",data)
            let nombre = localStorage.getItem("IdUser")
            alert(data)
        })
        .catch(err => {
            alert(err)
        })
})