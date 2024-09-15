document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('#busqueda-input');
    const botonBuscar = document.querySelector('#buscar-btn');
    const feedContainer = document.querySelector('#scroll-feed');
    const articulos = Array.from(feedContainer.querySelectorAll('.article-feed')); 

    function filtrarArticulos(textoBusqueda) {
    
        const textoBusquedaLower = textoBusqueda.toLowerCase();

        articulos.forEach(articulo => {
            
            const titulo = articulo.querySelector('.titulo-article').textContent.toLowerCase();
            const subtitulo = articulo.querySelector('.subtitulo-article').textContent.toLowerCase();
            const parrafo = articulo.querySelector('.parrafo').textContent.toLowerCase();

            if (titulo.includes(textoBusquedaLower) || subtitulo.includes(textoBusquedaLower) || parrafo.includes(textoBusquedaLower)) {
                articulo.style.display = ''; 
                console.log('Mostrando artículo');
            } else {
                articulo.style.display = 'none'; 
                console.log('Ocultando artículo');
            }
        });
    }

/*profe me pasa lo mismo, el script está bien y la consola no bota errores,
es el DOM que no me hace caso jajajaj
Imprimí para ver si se ocultaban o se mostraban los <article>
y creo que sí funciona pero en el DOM no se muestra*/

    botonBuscar.addEventListener('click', () => {
        const textoBusqueda = inputBusqueda.value.trim();
        console.log('Texto de búsqueda al hacer clic:', textoBusqueda);
        filtrarArticulos(textoBusqueda);
    }); //aquí también coloqué un console.log para ver si el input estaba funcionando junto con el botón
        

    filtrarArticulos(''); 
});