var confirma_carregamento = 0, dispositivo = window.screen.width, indice = 0

function carrega_jogo(requisicao_auto) {

    // Ativa o botão de mod para dispositivos móveis
    if (dispositivo < 1366) $("#botoes_acessibilidade").fadeIn()

    const verifica = localStorage.getItem("pul4Pr3dios-iniciaLoucura_1.2")

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
            $("#button_animacoes_pc").fadeIn()
            $("#button_animacoes_cell").fadeOut()
        }

        const carregar_departamentos = [sincronizaQualidadeGrafica(), main(), aleatorizaProp(), carrega_idioma(1)], date1 = new Date()
        let carregar_tudo = true
        data_atual = date1.toLocaleDateString('pt-BR')

        // Verifica quando foi a última sessão
        if (localStorage.getItem("pul4Pr3dios-ultimoCarregamento"))
            if (data_atual == localStorage.getItem("pul4Pr3dios-ultimoCarregamento"))
                carregar_tudo = false // true p/ sempre carregar

        if (carregar_tudo) {
            localStorage.setItem("pul4Pr3dios-ultimoCarregamento", data_atual)

            let indice = 0

            carregar_departaments = setInterval(() => {
                get_element("texto_carregamento").innerHTML = translations["carregando.etapas"][indice]

                indice++

                get_element("progresso_barra_carregamento").style.width = `${(indice * 8.33).toFixed(2)}%`
                get_element("porcentagem_carregada").innerHTML = `${(indice * 8.33).toFixed(2)}%`

                if (indice >= carregar_departamentos.length) {
                    clearInterval(carregar_departaments)

                    ultimo_estagio_carregamento()
                }
            }, 1000)
        } else {
            get_element("texto_carregamento").style.color = "Yellow"

            get_element("texto_carregamento").innerHTML = translations["tela.carregamento_rapido"]
            get_element("porcentagem_carregada").innerHTML = translations["tela.odisseia"]

            setTimeout(() => {

                executaSomCarrega()

                get_element("carrega_jogo").style.animation = "termina_carregamento2 1s"
                $("#carrega_jogo").fadeOut(1000)

                if (verifica == null)
                    historia()
            }, 1000)

            setTimeout(() => {
                confirma_carregamento = 1
            }, 2000)
        }
    }
}

function ultimo_estagio_carregamento() {

    get_element("texto_carregamento").innerHTML = translations["tela.sincronizando"]

    largura_barra = $("#progresso_barra_carregamento").css("width")

    tamanho_restante = largura_barra
    tamanho_restante = tamanho_restante.replace("px", "")
    tamanho_restante = parseFloat(tamanho_restante)

    fracao_restante = 25 / 100

    sincronizacao_final = setInterval(() => {

        fracao_restante++
        fracao_formatada = (75 + fracao_restante).toFixed(2)

        get_element("progresso_barra_carregamento").style.width = `${(75 + fracao_restante)}%`
        get_element("porcentagem_carregada").innerHTML = `${fracao_formatada}%`

        if (fracao_restante > 25) {
            get_element("porcentagem_carregada").innerHTML = "100%"

            executaSomCarrega()

            clearInterval(sincronizacao_final)
            get_element("carrega_jogo").style.animation = "termina_carregamento 1s"
            $("#carrega_jogo").fadeOut(1000)
            confirma_carregamento = 1

            if (verifica == null)
                historia()
        }
    }, 80)
}