
var derivada_entrada_ = document.getElementById("derivada_entrada");

derivada_entrada_.addEventListener('input', function updateValue(e) {

    mostrarEcuacion(e.target.value, "derivada_salida");
});


function mostrarEcuacion(derivada_entrada, id_salida) {
    // var derivada_entrada_ = document.getElementById("derivada_entrada");
    var derivada_salida_ = document.getElementById(id_salida);

    derivada_salida_.innerHTML = ''
    MathJax.texReset();
    var options = MathJax.getMetricsFor(derivada_salida_);
    MathJax.tex2chtmlPromise(derivada_entrada, options).then(function (node) {

        derivada_salida_.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    }).catch(function (err) {

        output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    });
}


function resolverEcuacion() {

    let derivada_entrada_ = document.getElementById("derivada_entrada").value;
    let arreglo = derivada_entrada_.split(/(?=[-+*\/])/);
    let arregloInt = [];
    let containsWords = /[a-z]/i
    let exponete, termino, expontentD, terminoD, resultado = "";
    console.log(arreglo)
    //10x^2+1x-15-1-3x+15x^5
    //10x^4-15x^4
    //c
    //10x^2+1x-15
    for (let i = 0; i < arreglo.length; i++) {
        arregloInt[i] = arreglo[i].match(/-?\d+/g);

        // si contiene un ^ y contiene alguna letra del alfapbeto
        if (arreglo[i].includes("^") && containsWords.test(arreglo[i])) {
            termino = parseInt(arregloInt[i])
            exponete = parseInt(arregloInt[i][1])
            terminoD = termino * exponete
            expontentD = exponete - 1
            if (expontentD <= 1) {
                console.log("sub 1 El resultado es  " + terminoD + "x")
                resultado += terminoD + "x"
            }
            else {
                console.log("sub2 El resultado es: " + terminoD + "x^" + expontentD)
                resultado += terminoD + "x^" + expontentD
            }
        }//si contiene alguna letra del alafabeto y si no contiene un ^
        if (containsWords.test(arreglo[i]) && !arreglo[i].includes("^")) {

            resultado += arreglo[i]
            console.log("sub3 " + arreglo[i])
        }
        //Si son puros numeros -15 10 -10 
        if (!containsWords.test(arreglo[i]) && !arreglo[i].includes("^")) {
            resultado += arreglo[i];
            console.log("sub4 " + arreglo[i])
        }

    }

   addDerivate(resultado, "derivada-resultado");
}
function addDerivate(resultado, id_salida) {


    mostrarEcuacion(resultado, id_salida)
}



