function get_element(alvo) {

    // Coleta o elemento por nome de classe ou id direto do HTML
    let objeto = document.getElementsByClassName(alvo)

    if (objeto.length < 1)
        objeto = document.getElementById(alvo)

    return objeto
}