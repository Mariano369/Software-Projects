function esVerdadero(valor) {
  // Si "valor" es verdadero, retorna "Soy verdadero".
  // Caso contrario, retorna "Soy falso".
  // Tu código:

//   return valor === true ? "Soy verdadero" : "Soy falso"
// }
return valor ? "Soy verdadero" : "Soy falso" // si me pidieran que retorne si valor es true o false
 }                                           // ahi podria ser return valor ? pero me estan pidiendo
                                            // que retorne tambien el string Soy verdadero o Soy falso
//   if (valor === true) return "Soy verdadero"
// else return "Soy falso"
// }

module.exports = esVerdadero;
