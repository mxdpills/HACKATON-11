/*function mostrarCronograma() {
    const dias = document.getElementsByClassName('nombre-dia');
    const fechas = document.getElementsByClassName('fecha-dia');
    const nombreCursos = document.getElementsByClassName('nombre-curso');
    const horasCursos = document.getElementsByClassName('hora-curso-grid');
    const tiposCursos = document.getElementsByClassName('tipo-curso-grid');

    for (let i = 0; i < cursosAsignados.length; i++) {
        dias[i].textContent = cursosAsignados[i].Dia;
        fechas[i].textContent = cursosAsignados[i].Fecha;
        nombreCursos[i].textContent = cursosAsignados[i].Nombre_curso;
        horasCursos[i].textContent = cursosAsignados[i].Horario;
        tiposCursos[i].textContent = cursosAsignados[i].Tipo_clase;
    }
}

window.onload = mostrarCronograma;*/

/* function mostrarCronograma () {
    const container = document.getElementById('cronograma-container');

    cursosAsignados.forEach(curso => {
        const article = document.createElement('article');

        const divFlex = document.createElement('div');
        divFlex.className ='d-flex flex-row gap-3 mt-1';

        const divFecha = document.createElement('div');
        divFecha.className = 'fecha d-flex flex-column justify-content-start align-items-center';
        
        const spanDia = document.createElement('span');
        spanDia.className = 'nombre-dia';
        spanDia.textContent = curso.Dia;

        const spanFecha = document.createElement('span');
        spanFecha.className = 'fecha-dia';
        spanFecha.textContent = curso.Fecha;

        divFecha.appendChild(spanDia);
        divFecha.appendChild(spanFecha);

        const divInfo = document.createElement('a');
        divInfo.className = 'w-100';

        const linkCurso = document.createElement('a');
        linkCurso.href = '#';
        linkCurso.className = 'text-decoration-none';

        const spanNombreCurso = document.createElement('span');
        spanNombreCurso.className = 'nombre-curso text-uppercase lh-1';
        spanNombreCurso.textContent = curso.Nombre_curso;

        linkCurso.appendChild(spanNombreCurso);

        const divInfoCursoGrid = document.createElement('div');
        divInfoCursoGrid.className = 'info-curso-grid lh-sm';

        const spanTituloHora = document.createElement('span');
        spanTituloHora.className = 'titulo-hora-grid';
        spanTituloHora.textContent = 'Hora:';

        const spanHoraCurso = document.createElement('span');
        spanHoraCurso.className = 'hora-curso-grid';
        spanHoraCurso.textContent = curso.Horario;

        const spanTituloClase = document.createElement('span');
        spanTituloClase.className = 'titulo-clase-grid';
        spanTituloClase.textContent = 'Clase:';

        const spanTipoCurso = document.createElement('span');
        spanTipoCurso.className = 'tipo-curso-name';
        spanTipoCurso.textContent = curso.Tipo_clase; 

        divInfoCursoGrid.appendChild(spanTituloHora);
        divInfoCursoGrid.appendChild(spanHoraCurso);
        divInfoCursoGrid.appendChild(spanTituloClase);
        divInfoCursoGrid.appendChild(spanTipoCurso);

        divInfo.appendChild(linkCurso);
        divInfo.appendChild(divInfoCursoGrid);

        divFlex.appendChild(divFecha);
        divFlex.appendChild(divInfo);

        article.appendChild(divFlex);

        container.appendChild(article)


    }); 
}

document.addEventListener('DOMContentLoaded', mostrarCronograma);*/

let inicioDeSemanaActual = new Date(2024, 6, 1);
const terminoFecha = new Date(2024, 11, 14);
const semanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000; 

function renderizarCursos(inicioSemana) {
    
    const programacionContainer = document.getElementById('programacion-container');
    programacionContainer.innerHTML = ''; 

    const diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    for (let i = 0; i < 7; i++) {
        let diaFecha = new Date(inicioSemana.getTime() + i * 24 * 60 * 60 * 1000);
        let diaNombre = diasDeLaSemana[diaFecha.getDay()];
        let diaNumero = diaFecha.getDate();

        /*console.log(diaFecha);
        console.log(diaNombre);
        console.log(diaNumero);*/
        
        let cursosPorDia = cursosAsignados.filter(curso =>
            curso.Dia == diaNombre && curso.Fecha == diaNumero
            /*el operador == permite la conversión de tipos durante la comparación.
            Con === compara directamente sin conversión. Osea que si uno es un número
            y el otro una cadena (14 ==='14')X, la comparación fallará:
            == funcionó porque convierte la cadena a número antes de la comparación.
            
            Agregar que igualdad (==) verifica la igualdad de dos expresiones
            sin tener en cuenta el tipo de dato. Igualdad estricta (===) hace
            lo mismo que el anterior, pero verificando también que coincidan
            los tipos de datos.*/
        );

        //console.log(cursosPorDia);//


        cursosPorDia.forEach(curso => {
            const article = document.createElement('article');
            article.innerHTML = `
            <div class="d-flex flex-row gap-3 mt-1">
                    <div class="fecha d-flex flex-column justify-content-start align-items-center">
                        <span class="nombre-dia">${curso.Dia}</span>
                        <span class="fecha-dia">${curso.Fecha}</span>
                    </div>
    
                    <div class="w-100">
                        <a href="#" class="text-decoration-none">
                            <span class="nombre-curso text-uppercase lh-1">${curso['Nombre_curso']}</span>
                        </a>
                        <div class="info-curso-grid lh-sm">
                            <span class="titulo-hora-grid">Hora:</span>
                            <span class="hora-curso-grid ">${curso.Horario}</span>
                            <span class="titulo-clase-grid">Clase:</span>
                            <span class="tipo-curso-grid ">${curso['Tipo_clase']}</span>
    
                        </div>
                    </div>
                </div> 
                `;
                programacionContainer.appendChild(article);
        });

    }
}


function cambiarSemana(direccion) {
    let nuevoInicioSemana = new Date(inicioDeSemanaActual.getTime() + direccion * semanaEnMilisegundos);
    if (nuevoInicioSemana >= new Date(2024, 6, 1) && nuevoInicioSemana <= terminoFecha) {
        inicioDeSemanaActual = nuevoInicioSemana;
        renderizarCursos(inicioDeSemanaActual);
    }
}

document.getElementById('sem-previa').addEventListener('click', () => cambiarSemana(-1));
document.getElementById('sem-siguiente').addEventListener('click', () => cambiarSemana(1));

renderizarCursos(inicioDeSemanaActual);