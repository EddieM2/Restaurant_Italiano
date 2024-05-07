const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostre = document.querySelector('.postre');

const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platillos();
});


const eventos = () => {
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar')
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');

    if(document.querySelectorAll('.pantalla-completa').length > 0) return;

    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
}

const cerrarMenu = (boton,overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
    });

    overlay.onclick = function() {
        overlay.remove();
        navegacion.classList.add('ocultar')

    }
}


const observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=> {
    observer.observe(imagen);
});


const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo.push(platillo));

    const ensaladas = platillosArreglo.filter(ensaladas => ensaladas.getAttribute('data-platillo') === 'ensaladas');

    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');

    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');

    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');


    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);
};

const mostrarPlatillos = (ensaladas, pastas, pizzas, postre, todos) => {

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo => contenedorPlatillos.appendChild(todo));
    });
    
    btnEnsaladas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada => contenedorPlatillos.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta => contenedorPlatillos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza => contenedorPlatillos.appendChild(pizza));
    });

    btnPostre.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        postre.forEach(postre => contenedorPlatillos.appendChild(postre));
    });
}
    

const limpiarHtml = (contenedor) => {
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}