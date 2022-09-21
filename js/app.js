// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners () {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso)

    // Eliminar cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [] //resetear el arreglo

        limpiarHTML() //Eliminamos todo el HTML
    })

    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []

        carritoHTML()
    })
}


// Funciones

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        e.preventDefault();
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}


// Elimina un curso del carrito

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        // Eliminar el arreglo por el data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML() //Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos click  y extrar la info del curso

function leerDatosCurso(curso) {



    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector("span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad:1,
    }

    // Revisa si el elemento ya existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso => curso.id === infoCurso.id ) {
                // Retorna el objeto actualizado
                curso.cantidad++;
                return curso
            } else {
                // Retorna lo objetos que no son duplicados
                return curso
            }
        } );
        articulosCarrito = [...cursos]
    } else {
        // Agregamos el curso al carrito
        // Agregar elementos al arreglo de carrito
    
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML()


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}"  width="100"/>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        // Agregar el HTML del carrito en el Tbody

        contenedorCarrito.appendChild(row)
    })

    // Agregar carrito al localStorage
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

// Eliminar los cursos del HTML
function limpiarHTML() {
    // Forma Lenta
    // contenedorCarrito.innerHTML = ""; 

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}