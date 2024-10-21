////////////////////////////////////////////////////////////////////////////////////////////


// var array = [4, 6, 34, 666, 1234, 3333,"string"]
// // for (var i = 0; i < array.length; i++) {       
// //     console.log(array[i])

// function recibirElementos (elementosDelArreglo) {
//     console.log(elementosDelArreglo)
// }                                                     //          FOR EACH
// array.forEach(recibirElementos)                       // HACE LO MISMO QUE EL BUCLE FOR
                                                      // BUCLEA/RECORRE EL ARREGLO, LE ENTREGA                                              
                                                      // CADA UNO DE LOS ELEMENTOS DEL ARREGLO
                                                      // UNO POR UNO A LA FUNCION QUE YO CREE (recibirElementos)


///////////////////////////////////////////////////////////////////////////////////////////


// var array = [4, 6, 34, 666, 1234, 3333,"string"]
// // for (var i = 0; i < array.length; i++) {       
// //     console.log(array[i])
// function recibirElementos(elementosDelArreglo) {
//     console.log(elementosDelArreglo)                         
// }
//    var resultado = array.forEach(recibirElementos)             //  FOR EACH  NO RETORNA NADA, RETORNA UNDEFINED                                                           
// // var resultado = array.map(recibirElementos)                 //  MAP       SI RETORNA, RETORNA EL ARREGLO MODIFICADO CON LO QUE YO QUIERA HACER
// // var resultado = array.filter(recibirElementos)              //  FILTER                                          
// console.log(recibirElementos)

// ABAJO VERENMOS CADA EJEMPLO DE FOR EACH, MAP, FILTER Y REDUCE Y SUS DIFERENCIAS

///////////////////////////////////////////////////////////////////////////////////////////


// var array = [1, 3, 5, 7, 9, 11,"string"]

// function recibirElementos (elementosDelArreglo) {
//     return elementosDelArreglo + 1
// }                                                   
                                    
// array.forEach(recibirElementos)

// var resultado = recibirElementos (3)

// console.log (resultado)

// ESTE ARREGLO LO HICE DE ESTA MANERA PORQUE LA FUNCION FOR EACH
// ES EL UNICO METODO DE LOS ARREGLOS QUE NO RETORNA NADA.
// ENTONCES TENGO QUE CREAR UNA VARIABLE INVOCANDO LA FUNCION 
// CON SU ARGUMENTO Y LUEGO MOSTRAR EL RESULTADO DE LA FUNCION SI ES QUE
// QUIERO RETORNAR LA FUNCION Y MOSTRAR EL ARREGLO MODIFICADO.
// EN EL SIGUIENTE EJEMPLO DE ABAJO MUESTRO COMO ME APARECE UNDEFINED
// AL INTENTAR RETORNAR ALGO CON EL FOREACH SIN INVOCAR A LA FUNCION 
// EN ESTE CASO recibirElementos. MAS ADELANTE VEREMOS QUE EL METODO MAP
// SI RETORNA ALGO, RETORNA LA FUNCION QUE LE MANDE, EL NUEVO ARREGLO MODIFICADO.
// EL MAP EJECUTA LO QUE QUIERA HACER LA FUNCION DE CALLBACK,
// ES DECIR LA FUNCION QUE LE MANDE A MAP. ME ENVIA UN NUEVO ARREGLO 
// CON TODOS LOS ELEMENTOS MODIFICADOS


/////////////////////////////////////////////////////////////////////////////////////////////////////


// var array = [1, 3, 5, 7, 9, 11,"string"]

// function recibirElementos (elementosDelArreglo) {
//     return elementosDelArreglo + 1
// }                                                   
                                                 
// var resultado = array.forEach(recibirElementos)

// console.log(resultado)


/////////////////////////////////////////////////////////////////////////////////////////


// var array = [1, 3, 5, 7, 9, 11,"string"]

// function recibirElementos (elementosDelArreglo) {
//     return elementosDelArreglo + 1
// }                                                   
                                                 
// var resultado = array.map(recibirElementos)

// console.log(resultado)

// LA FUNCION MAP RETORNA LA FUNCION DE CALLBACK, EN ESTE CASO
// RECORRE EL ARREGLO, MODIFICA LOS ELEMENTOS (DEPENDIENDO LO QUE QUIERA HACER LA FUNCION)
// Y ME MUESTRA EL RESULTADO, EN ESTE CASO ME MUESTRA LOS NUMEROS PARES YA QUE 
// LA FUNCION SUMA UNO A CADA NUMERO INPAR Y ESTOS SE MODIFICAN QUEDANDO COMO NUMEROS PARES 


/////////////////////////////////////////////////////////////////////////////////////////

// OTRO EJEMPLO DEL MAP Y FIJATE QUE LOS NUMEROS MENORES A 5 LOS MUESTRA COMO UNDEFINED
// A DIF DEL FILTER QUE SOLO MUESTRA LOS NUMEROS MAYORES A 5 (codigo mas limpio)

// var array = [1, 3, 5, 7, 9, 11,"string"]  

// function recibirElementos (array) {
//     if (array > 5) return array
// }                                                   

// var resultado = array.map(recibirElementos)

// console.log(resultado)


/////////////////////////////////////////////////////////////////////////////////////////

// EJ DEL FILTER

// var array = [1, 3, 5, 7, 9, 11,"string"]  

// function recibirElementos (array) {
//     if (array > 5) return array
// }                                                   
// var resultado = array.filter(recibirElementos)

// console.log(resultado)


//////////////////////////////////////////////////////////////////////////////////////////


// ANTES DE MOSTRAR EL REDUCE, QUE ES EL QUE SE ENCARGA DE REDUCIR EL ARREGLO
// A UN UNICO VALOR PERO ANTES D VER EL REDUCE ES IMPORTANTE QUE SEPAS
//  QUE CADA METODO (FOR EACH, MAP, FILTER, MENOS EL REDUCE QUE RECIBE UN ACUMULADOR)
// RECIBEN TANTO EL ELEMENTO DEL ARREGLO, COMO EL INDICE Y EL ARREGLO MISMO 
// DEJO UN EJEMPLO DE ESTO ANTES DE PASAR AL REDUCE

// var array = [1, 3, 5, 7, 9, 11,"string"]  

// function recibirElementos (elementosDelArreglo, indice, arreglo) {
//     console.log ("elemento:", elementosDelArreglo)
//     console.log ("indice:", indice)
//     console.log ("arreglo:", arreglo)
// }                                                   
// var resultado = array.forEach (recibirElementos)

// console.log(resultado)



////////////////////////////////////////////////////////////////////////////////////



// EJ DE REDUCE

var array = [1, 3, 5, 7, 9, 11]  

function recibirElementos (Acumulador, elementosDelArreglo, indice, arreglo) {
    Acumulador = Acumulador + elementosDelArreglo // ESTOY SUMANDO EL 1 CON EL 3,
  return Acumulador
}                                                                // LUEGO A ESA SUMA LE SUMO EL 
var resultado = array.reduce (recibirElementos)                 // 5, LUEGO A ESA SUMA EL 7 Y ASI
                                                                 // COMO EN EL BUCLE FOR DE LA FUNCION SUMA
console.log(resultado)                                           // PERO ADENTRO DEL ARREGLO

// el acumulador del reduce seria como la variable acumuladora que yo creo
// al principio de una Funcion SUMA, donde creo un bucle for
// DEJO EL EJEMPLO ABAJO
// function sumarHastaN(n) {
    // La función recibe un número "n" por argumento.
    // Devuelve la suma de todos los números desde 1 hasta n.
    // Tu código:
//   var AcumuladorSuma = 0
//   for (var i = 1; i <= n; i++) {
//   AcumuladorSuma = AcumuladorSuma + i
//   }
//   return AcumuladorSuma
//   }





