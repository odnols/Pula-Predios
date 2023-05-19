var confirma_carregamento = 0, dispositivo = window.screen.width, indice = 0

function carrega_jogo(requisicao_auto) {

    // Ativa o botão de mod para dispositivos móveis
    if (dispositivo < 1366)
        $("#botoes_acessibilidade").fadeIn()

    verifica = localStorage.getItem("iniciaLoucura_1.2")

    if (requisicao_auto == 0 && verifica == null) {
        get_element("primeiro_logon").style.display = "block"

        idioma = carrega_idioma(0)

        if (idioma == "en") {
            get_element("button_inicia_game").innerHTML = "Start"
            get_element("versao_trad").innerHTML = "Version 1.2"
        }

        return 0
    } else {

        popula_pisos()
        idioma = carrega_idioma(0)

        $("#status_carregamento").fadeIn()
        $("#primeiro_logon").fadeOut()

        if (idioma == "pt")
            get_element("texto_carregamento").innerHTML = "Ligando os motores"
        else if (idioma == "en")
            get_element("texto_carregamento").innerHTML = "Starting the engines"

        if (dispositivo >= 1366) {
            animaMoeda()
            $("#button_animacoes_pc").fadeIn()
            $("#button_animacoes_cell").fadeOut()
        }

        let carregar_departamentos = [sincronizaQualidadeGrafica(), main(), aleatorizaProp(), sincronizaQuadroConquistas(), carrega_idioma(1)]
        let texto_feedback_pt = ["Vasculhando o cache", "Colocando combustível", "Animando", "Aleatorizando Props", "Admirando Conquistas", "Traduzindo", "Sintonizando os sons"]
        let texto_feedback_en = ["Searching the cache", "Putting fuel", "Starting animations", "Randomizing Props", "Admiring Achievements", "translating", "Tuning the sounds"]

        let date1 = new Date(), carregar_tudo = true
        data_atual = date1.toLocaleDateString('pt-BR')

        // Verifica quando foi a última sessão
        if (localStorage.getItem("ultimoCarregamento"))
            if (data_atual == localStorage.getItem("ultimoCarregamento"))
                carregar_tudo = false // true p/ sempre carregar

        if (carregar_tudo) {
            localStorage.setItem("ultimoCarregamento", data_atual)

            let indice = 0

            carregar_departaments = setInterval(() => {
                if (idioma == "pt")
                    get_element("texto_carregamento").innerHTML = texto_feedback_pt[indice]
                else
                    get_element("texto_carregamento").innerHTML = texto_feedback_en[indice]
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

            if (idioma == "pt") {
                get_element("texto_carregamento").innerHTML = "Carregamento Rápido"
                get_element("porcentagem_carregada").innerHTML = "Uma Odisseia pulatória"
            } else {
                get_element("texto_carregamento").innerHTML = "Fast load"

                get_element("porcentagem_carregada").innerHTML = "An Odyssey full of heels"
            }
            for (let i = 0; i < carregar_departamentos.length; i++) {
                carregar_departamentos[i]
            }

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

    if (idioma == "pt")
        get_element("texto_carregamento").innerHTML = "Sincronizando tudo e iniciando"
    else
        get_element("texto_carregamento").innerHTML = "Syncing everything and getting started"

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