function validateEmail(emmail) {
    usuario = emmail.value.substring(0, emmail.value.indexOf("@"));
    dominio = emmail.value.substring(emmail.value.indexOf("@") + 1, emmail.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("msgemail").innerHTML = "E-mail válido";
        alert("E-mail valido");
    }
    else {
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
        alert("E-mail invalido");
    }
}

module.exports = {
    validateEmail
}