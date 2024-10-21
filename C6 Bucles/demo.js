

//    PARA VER EL CODIGO EN CONSOLA, PONER EL
//    NODE + NOMBRE DEL ARCHIVO(demo.js) en este caso

//            OPERADORES LOGICOS 
//               AND | OR | !

//                     AND&&

//       console.log (true && true)    T
//       console.log (true && false);  F
//       console.log (false && true);  F
//       console.log (false && false); F

//                      OR||

//       console.log (true || true)    T
//       console.log (true || false);  T
//       console.log (false || true);  T
//       console.log (false || false); F  

// practicar y modificar 
// console.log ( true || true || true || true || true ||
// true || true || true || true || true || true || true ||
// true || true || true || true || true || true || true ||
// true || true || true || true || true || true || true ||
// true || true || true || true || true || true || true ||
// true || true || true || true || true || true || true ||
// true || true || true || true || true || true || true )

//                       ! 

//  VER RESULTADO EN CONSOLA (node demo.js)     
// console.log (!true)
// console.log (!false)

//                         FOR

// for (var i = 100; i < 1001; i= i+10) {
//       console.log(i)
// }


//                    BREAK (CORTA LA EJECUCION SOLO DEL BUCLE) 


// function contadorUno() {
//       for (var i = 0; i < 1001; i++) {
//             if (i === 5) break    // CORTA LA EJECUCION SOLO DEL BUCLE
//             console.log (i)     
//       }
//       console.log ("SE CORTA SOLO EL BUCLE PERO SIGO EJECUTANDO CODIGO")
//       }
      
//       contadorUno()             // llamo a la funcion


//                   RETURN (CORTA LA EJECUCION DE TODO)


// console.log("ABAJO EJEMPLO DE RETURN, CORTA TODO EL CODIGO, NO EJECUTA LO QUE SIGUE")

// function contadorDos() {
// for (var i = 0; i < 1001; i++) {
//       if (i === 5) return      //CORTA LA EJECUCION DE TODO
//       console.log (i)          // NO SE EJECUTA
// }
// console.log ("ESTE CONSOLE.LOG NO se ejecuta porque return CORTA NO SOLO EL BUCLE, SINO TODA LA EJECUCION")
// }
// contadorDos()                //TAMPOCO SE EJECUTA

//                  CONTINUE ()

// Ejemplo simple sin mucha logica ni funcionalidad. Para ver como funciona
// var i = 0

// while (i < 10) {
// i++
// if (i === 4) continue
// console.log (i)
// }

// Ejemplo para entender un poco mejor su logica y sus funciones

// for(var i = 0; i < 10; i++) {
// if (i % 2 === 0) continue    
// console.log (i)
// }


//                    WHILE                     

// var i = 0

// while (i < 11) {
// console.log (i)
// i++
// }


//         DO WHILE // la condicion se evalua despues de ejecutar la sentencia,
                    // garantiza al menos una ejecucion
// var i = 0
// do {
// console.log (i)
// i++
// } while (i < 11)


// var i = 12
// do {
// console.log(i) // El DO garantiza la sentencia, al menos una ejecucion, luego se evalua la condicion y ahi se ejecuta en base a si se cumple o no
// i++
// } while (i < 11)







