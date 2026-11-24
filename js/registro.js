const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");
const form = document.querySelector("#formRegistro");

function validarNombre() {

    if (nombre.value.trim().length < 3) {
        document.querySelector("#errorNombre").textContent =
            "El nombre debe tener mínimo 3 caracteres";
        return false;
    }

    document.querySelector("#errorNombre").textContent = "";
    return true;
}

function validarCorreo() {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
        document.querySelector("#errorCorreo").textContent =
            "Correo no válido";
        return false;
    }

    document.querySelector("#errorCorreo").textContent = "";
    return true;
}

function validarPassword() {

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password.value)) {
        document.querySelector("#errorPassword").textContent =
            "Mín. 8 caracteres, mayúscula, minúscula, número y especial";
        return false;
    }

    document.querySelector("#errorPassword").textContent = "";
    return true;
}

nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
password.addEventListener("input", validarPassword);

form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validarNombre() || !validarCorreo() || !validarPassword()) {
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find(usuario => usuario.correo.toLowerCase() === correo.value.trim().toLowerCase())) {
        alert("Este correo ya está registrado");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        password: password.value
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");

    form.reset();

    window.location.href = "index.html";

});
