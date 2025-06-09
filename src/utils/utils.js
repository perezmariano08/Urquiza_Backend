function capitalizarTexto(cadena) {
    return cadena
        .toLowerCase()
        .split(' ')
        .filter(Boolean) // Eliminar espacios dobles
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}

module.exports = { capitalizarTexto };
