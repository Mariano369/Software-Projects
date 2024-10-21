function productoEntreNúmeros(a, b) {
  // Dados dos argumentos "a" y "b", devuelve el producto de todos
  // los números entre a y b (inclusive).
  // Tu código:
var multi = 1
for (var i = a; i <= b; i++) {
  multi = multi * i
}
// if (multi === -0) return 0
return Math.abs(multi)
}






module.exports = productoEntreNúmeros;