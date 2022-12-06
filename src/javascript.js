let $primerCuadro = null;
let turnos = 0;
const $tablero = document.querySelector("[data-tablero]");
const $cuadros = document.querySelectorAll(".interior-cuadro");
const $victoria = document.querySelector(".victoria");


function configuracionJuego(){
    const colores = ["rojo", "azul", "verde", "amarillo", "violeta", "naranja"];
    const coloresDoble = colores.concat(colores);

    aplicarColores(coloresDoble, $cuadros);
    clickEnLosCuadros();
}

function clickEnLosCuadros(){
    $tablero.addEventListener("click",(evento)=>{
        const $elemento = evento.target;
        if($elemento.classList.contains("interior-cuadro")){ //contains si el nodo contiene class name ...interior-cuadro
            manejarClick($elemento);
        }
    })
}

function manejarClick($cuadroActual){
    mostrarCuadro($cuadroActual);

    if($primerCuadro === null){
        $primerCuadro = $cuadroActual;

    }else{
        if($primerCuadro === $cuadroActual){
            return;
        }

        turnos++;

        if(compararCuadros($primerCuadro, $cuadroActual)){ //usamos className y no List, si de lo contrario no funciona
            eliminarCuadro($primerCuadro);
            eliminarCuadro($cuadroActual);
        }else{
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        }

        $primerCuadro = null;
    }
}

function compararCuadros(cuadroGuardado, cuadroPresionado){
    return cuadroGuardado.className === cuadroPresionado.className;
    //podemos hacerlo de otra forma pero usamos esta logica para usar retur true o false, por que esta funciona ahora significa eso TRUE O FALSE
}

function eliminarCuadro(cuadro){
    setTimeout(()=>{
        const contenedorCuadro = cuadro.parentElement;
        contenedorCuadro.style.visibility = "hidden"; //ocultamos el elemento sin modificar el espacio
        cuadro.remove();
        finJuego()
    }, 500);
}

function ocultarCuadro(cuadro){
    setTimeout(()=>{
        cuadro.style.opacity = "0"
    }, 500);
}

function mostrarCuadro($cuadro){
    $cuadro.style.opacity = "1";
}

function finJuego(){
    if (document.querySelectorAll(".interior-cuadro").length === 0){ //siempre volver a usar document.querySelectorAll para saber el dato actual, no funciona con $cuadros
        $tablero.style.display = "none";
        $victoria.querySelector("span").textContent = `Felicidades ganaste en el turno N°${turnos}`
        $victoria.style.display = "block";
    }
}

function aplicarColores(arrayColores, $arrayCuadro){
    const coloresAleatorios = arrayColores.sort(()=>{
        return 0.5 - Math.random();
    })

    coloresAleatorios.forEach((colores, index) => {
        $arrayCuadro[index].classList.add(colores)
    });
}

configuracionJuego();