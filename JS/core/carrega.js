var confirma_carregamento = 0, dispositivo = window.screen.width, indice = 0

function carrega_jogo(requisicao_auto) {
    if (typeof fecha_config_sons_inicio === "function")
        fecha_config_sons_inicio()

    // Ativa o botão de mod para dispositivos móveis
    if (dispositivo < 1366) $("#botoes_acessibilidade").fadeIn()

    verifica = localStorage.getItem("pul4Pr3dios-iniciaLoucura_1.2")

    if (verifica == null && !requisicao_auto) {
        $("#carrega_jogo").show()
        $("#primeiro_logon").show()

        idioma = carrega_idioma()
        return

    } else {

        popula_pisos()
        idioma = carrega_idioma()

        $("#status_carregamento").fadeIn()
        $("#primeiro_logon").fadeOut()

        get_element("texto_carregamento").innerHTML = translations["historia.ligando_motores"]

        if (dispositivo >= 1366) {
            animaMoeda()
            anima_mod_flutua()

            $("#button_animacoes_pc").fadeIn()
            $("#button_animacoes_cell").fadeOut()
        }

        sincronizaQualidadeGrafica()
        main()
        aleatorizaProp()

        get_element("texto_carregamento").innerHTML = translations["tela.sincronizando"]
        get_element("porcentagem_carregada").innerHTML = "100%"
        get_element("progresso_barra_carregamento").style.width = "100%"

        confirma_carregamento = 1
        if (verifica == null)
            historia()

        get_element("carrega_jogo").style.animation = "termina_carregamento2 .25s"
        $("#carrega_jogo").fadeOut(250)
    }
}