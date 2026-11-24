const bienvenida = document.querySelector("#bienvenida");
const cerrarSesion = document.querySelector("#cerrarSesion");

const usuario = JSON.parse(
    localStorage.getItem("usuarioActivo")
);

if (!usuario) {
    window.location.href = "login.html";

} else {
    bienvenida.textContent = usuario.nombre;

}

cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";

});

const formLinux = document.querySelector("#formLinux");
const mensajeLinux = document.querySelector("#mensajeLinux");
const listaRegistros = document.querySelector("#listaRegistros");

const campos = [
    "nombre", "apodo_terminal", "edad", "distro", "escritorio", "editor",
    "anios_linux", "sistemas_rotos", "comando_favorito", "terminal",
    "usa_arch_btw", "felicidad", "fecha_instalacion", "lenguaje",
    "mensaje_a_windows", "acepto_no_volver"
];

function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem("registrosLinux")) || [];

    listaRegistros.innerHTML = "";

    for (let i = 0; i < registros.length; i++) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        let texto = "$ cat registro_" + (i + 1) + ".txt\n";

        for (let j = 0; j < campos.length; j++) {
            texto += campos[j] + ": " + registros[i][campos[j]] + "\n";
        }

        tarjeta.textContent = texto;
        listaRegistros.appendChild(tarjeta);
    }
}

formLinux.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = new FormData(formLinux);
    const registro = {};

    for (let i = 0; i < campos.length; i++) {
        const valor = datos.get(campos[i]);

        if (valor === null || valor.trim() === "") {
            mensajeLinux.textContent = 'bash: el campo "' + campos[i] + '" esta vacio. Permission denied';
            mensajeLinux.className = "error";
            return;
        }

        registro[campos[i]] = valor;
    }

    const registros = JSON.parse(localStorage.getItem("registrosLinux")) || [];

    registros.push(registro);
    localStorage.setItem("registrosLinux", JSON.stringify(registros));

    formLinux.reset();

    mensajeLinux.textContent = "Registro guardado. Bienvenido al lado libre de la fuerza";
    mensajeLinux.className = "exito";

    mostrarRegistros();
});

mostrarRegistros();
