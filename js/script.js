//Array cos 99 números do bombo
let numBombo = Array(99).fill().map((_, i) => i + 1);

//Variable para cada un dos cartóns
const carton1 = document.querySelectorAll(".numero1");
const carton2 = document.querySelectorAll(".numero2");

//Variable para os dous cartóns
const carton = document.querySelectorAll(".numero");

//Botón repartir e sacar número
const repartir = document.getElementById("repartir");
const btnNumero = document.getElementById("btnNumero");

//Contenedor tableiro inferior
const tabInf = document.getElementById("tabInf");


//Último número sacado
const mostrarNumero = document.getElementById("mostrarNumero");


//h1 mesanxe gañador
const ganador = document.getElementById("win");

//Escoller números tarxetas xogador1
function numXogador() {
    //xogador 1
    let bombo1 = Array(99).fill().map((_, i) => i + 1);
    for (let i = 0; i < 15; i++) {
        let numero = Math.floor(Math.random() * bombo1.length);
        let numeroSel = bombo1[numero];
        carton1[i].textContent = numeroSel;
        bombo1.splice(numero, 1);
    }
    //cpu
    let bombo2 = Array(99).fill().map((_, i) => i + 1);
    for (let i = 0; i < 15; i++) {
        let numero = Math.floor(Math.random() * bombo2.length);
        let numeroSel = bombo2[numero];
        carton2[i].textContent = numeroSel;
        bombo2.splice(numero, 1);
    }

    //Limpa o tableiro inferior
    novaPartida();
}


//Repartir números para os cartóns
repartir.addEventListener("click", numXogador)

let numAgraciado;

let count1 = 0;
let count2 = 0;


//Sacar números do bombo e comprobar cartóns
function sacarNumero() {
    if (carton1[0].textContent !== "") {
        //Posición do número agraciado
        let posAgraciado = Math.floor(Math.random() * numBombo.length);
        //Número agraciado
        numAgraciado = numBombo[posAgraciado];
        //Elimino do bombo o número sacado
        numBombo.splice(posAgraciado, 1);

        //Comprobo o cartón do xogador
        for (let i = 0; i < carton1.length; i++) {
            if (numAgraciado == parseInt(carton1[i].textContent)) {
                carton1[i].style.opacity = "0.2";
                count1++;
                if (count1 == 15) {
                    cerrarPopup();
                    ganador.textContent = "Bingo!! Gaña o xogador";
                    btnNumero.disabled = true;
                }
            }
        }
        //Comprobo o cartón da CPU
        for (let i = 0; i < carton2.length; i++) {
            if (numAgraciado == parseInt(carton2[i].textContent)) {
                carton2[i].style.opacity = "0.2";
                count2++;
                if (count2 == 15) {
                    cerrarPopup();
                    ganador.textContent = "Bingo!! Gaña a CPU";
                    btnNumero.disabled = true;
                }
            }
        }

        mostrarNumero.textContent = numAgraciado;
        rellenarResultado(numAgraciado);
    } else {
        cerrarPopup();
        ganador.textContent = "Primeiro reparte os cartóns...";
    }

}

btnNumero.addEventListener("click", sacarNumero);


//Listar números sacados do bombo no panel inferior
function rellenarResultado(resultado) {

    if (resultado > 0 & resultado < 100) {
        let novoNumero = tabInf.appendChild(document.createElement("p"));
        novoNumero.classList.add("numeroInf");
        novoNumero.textContent = resultado;
    }
}

//Nova partida
function novaPartida() {
    tabInf.innerHTML = ``;
    carton.forEach((e) => e.style.backgroundColor = "white")
    carton.forEach((e) => e.style.opacity = "1")
    btnNumero.disabled = false;
    ganador.textContent = "";
    mostrarNumero.textContent = "";
    count1 = 0;
    count2 = 0;
    numBombo = Array(99).fill().map((_, i) => i + 1);

}

//Comprobar xogada 
// function comprobarXogada(p1, cpu) {
//     let count = 0;
//     for (let i = 0; i < p1.length; i++) {
//         if (p1[i].style.opacity == "0.2") {
//             count++;
//         } else {
//             count = 0;
//         }
//         if (count == 15) {
//             ganador.textContent = "Bingo!! Gaña o xogador";
//             btnNumero.disabled = true;
//         }
//     }

//     let countCpu = 0;
//     for (let i = 0; i < cpu.length; i++) {

//         if (cpu[i].style.opacity == "0.2") {
//             countCpu++;
//         } else {
//             countCpu = 0;
//         }
//         if (countCpu == 15) {
//             ganador.textContent = "Bingo!! Gaña a CPU";
//             btnNumero.disabled = true;
//         }
//     }
// }




//Pop-up
function cerrarPopup(){
    document.getElementById("popup").classList.toggle("ocultar");
}