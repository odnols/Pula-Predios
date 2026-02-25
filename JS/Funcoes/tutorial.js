indice_tutorial = 0, tut_complet = null

function exibeTutorial(chave) {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)
    get_element("item_selecionado").innerHTML = translations[`tutorial.texto_${chave}`]

    $("#tutoriais_2").animate({ scrollTop: 0 }, "slow")
}

function repete_tutorial() {
    indice_tutorial = 0
    executa_tutorial(null, 1)
}

function executa_tutorial(requisicao_auto) {

    if (tut_complet == 0) {

        $("#tutorial_em_jogo").fadeIn()

        jogo.status = estados.tutorial

        if (indice_tutorial == 2)
            freia_predio()

        const el = get_element("frase_tuto_em_game")

        if (requisicao_auto == null && indice_tutorial < translations["historia.introducao"].length) {
            el.innerHTML = ""
            showtext(el, translations["historia.introducao"][indice_tutorial], 1)
        }

        if (requisicao_auto) $(".avancar_tuto").fadeIn()

        if (indice_tutorial == translations["historia.introducao"].length) {
            controles_tutorial()
            $("#tutorial_em_jogo").fadeOut()
        }
    }
}

function controles_tutorial() {

    indice_tutorial = 6
    acelera_predio()

    $("#placeholder_controles").fadeIn()

    setTimeout(() => {
        $("#placeholder_controles").fadeOut()
        localStorage.setItem("pul4Pr3dios-tutorialCompleto", 1)

        confirma_inicio_partida()
    }, 10000)
}

function avanca_tutorial() {
    indice_tutorial++
    executa_tutorial()
}

function pular_tutorial() {
    $("#tutorial_em_jogo").fadeOut()
    indice_tutorial = 6

    localStorage.setItem("pul4Pr3dios-tutorialCompleto", 1)
    confirma_inicio_partida()
}