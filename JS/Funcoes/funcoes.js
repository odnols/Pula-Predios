var nome_notificacoes = [], fila_notificacoes = [], segura_notificacao = 0

function boasVindas() {

    $("#boas_vindas").fadeOut()
    $("#log_button").fadeIn()

    opcoes.inicia_game = 1
    confirma_carregamento = 1

    localStorage.setItem("iniciaLoucura_1.2", 1)
    executaSons("faixa_musicas", "Musicas", "intro_1.ogg", 1)

    valida_jogador = localStorage.getItem("iniciaLoucura_1.2")
    if (valida_jogador != null) {
        jogo.temas_comprados = [1, 1]
        localStorage.setItem("temasComprados", jogo.temas_comprados)
        notificacao(1, 0)
    }
}

function inicia_jogo() {

    // Inicia apenas quando a pontuação estiver igualada a zero
    if (jogador.partida_pontuacao == 0) {

        if (tut_complet == 0) {
            executa_tutorial()
        } else {
            indice_tutorial = 6

            desliga_som("faixa_memes3", 3)
            $("#quadro_notificacoes").fadeOut()

            confirma_inicio_partida()
        }
    }
}

function confirma_inicio_partida() {

    verificaDesligamentos()

    // Intervalo que acelera o prédio novamente
    if (typeof vlt_velocidade != "undefined")
        clearTimeout(vlt_velocidade)

    if (typeof volta_velocidade != "undefined")
        clearInterval(volta_velocidade)

    // Intervado que trás a pontuação ao zero novamente
    if (typeof zerador != "undefined")
        clearInterval(zerador)

    // Intervalo que altera o valor das moedas
    if (typeof altera_moeda != "undefined")
        clearInterval(altera_moeda)

    jogo.status = estados.jogando
    eventos.ultimo_evento = null
    toolTip()
    troca_descricao(0, 0, 0)

    // Ligando os motores
    conquista(0, 0)

    if (!ambiente.segura_som) { // Meme usado para começar
        executaSons("faixa_memes2", "Inicio", escolhe_som(1, 0), 3)
        ambiente.segura_som = 1
    }

    cronometroTempoPartida = setInterval(() => {
        jogador.partida_tempo_jogado++

        jogador.partida_distancia_viajada += jogo.velocidade * 2
    }, 1000)

    let faixa = ["main_1.ogg", "main_2.ogg", "main_3.ogg", "main_4.ogg"]

    if (jogo.tema_ativo != 0) {
        if (jogo.musica_tema == null)
            executaSons2("faixa_musicas", "Musicas", faixa[Math.round(3 * Math.random())], 1)
        else
            executaSons2("faixa_musicas", "Musicas", jogo.musica_tema, 1)
    } else
        executaSons2("faixa_musicas", "Musicas", "main_old.ogg", 1)

    botoes(600)

    if (jogo.status == estados.jogando)
        eventos.relogio_eventos()

    jogo.estadoOcioso = 0

    if (typeof contagemOcioso != "undefined")
        clearTimeout(contagemOcioso)

    $("#versao_texto").fadeOut()
    $(".pulos_trad").fadeIn()
    $("#qtdPulos").fadeIn()

    clearInterval(jogador.var_timer_mod)
}

function regula_velocidade() {

    if (typeof vento_delay != "undefined")
        clearInterval(vento_delay)

    desliga_som("faixa_ambiente", 2)

    jogador.regula_velocidade = setInterval(() => {
        if (jogo.velocidade > 11) {
            jogo.velocidade--
        } else {
            jogo.velocidade = 10
            clearInterval(jogador.regula_velocidade)
        }
    }, 100)
}

function menu_inicial(argu) {

    if (argu) {
        $("#menu_inicial").fadeIn()
        $("#faixas_menu_ini").fadeIn()
        $("#flag_api").fadeIn()
    } else {
        $("#menu_inicial").fadeOut()
        $("#faixas_menu_ini").fadeOut()
        $("#flag_api").fadeOut()
    }
}

function limpa_chao() {

    chao.trava = [0, 0, 0]
    chao.libera_volta_chao = [0, 0, 0]

    chao.reserva = [0, 0, 0]
    chao.muda_chao = [0, 0, 0]
    chao.volta_chao = [0, 0, 0]
}

function visualizar_log(caso) {

    menus.estado_log = caso

    get_element("transitador_sessao").style.display = "block"
    get_element("transitador_sessao").style.animation = "transita_log .5s"

    if (caso) {
        verificaOciosidade(true)

        executaSons("faixa_musicas", "Musicas", "log.ogg", 1)

        $("#conquistas_mapa").fadeOut("slow", "linear")
        $("#tutorial").fadeOut("slow", "linear")
        $("#controles").fadeOut("slow", "linear")
        $("#estatisticas").fadeOut("slow", "linear")
        $("#configuracoes").fadeOut("slow", "linear")
        $("#opcoes").fadeOut("slow", "linear")
    }

    primeira_transicao = setTimeout(() => {

        get_element("transitador_sessao").style.height = "100%"
        get_element("transitador_sessao").style.width = "100%"

        get_element("transitador_sessao").style.animation = "transita_log2 .5s"
        let fechador_loja = get_element("fechador_log")

        if (caso) {
            get_element("log_imbutido").style.display = "block"
            fechador_loja[0].style.display = "block"
            $("#log_imbutido").animate({ scrollTop: 0 }, "slow")
        } else {

            verificaOciosidade(false)
            get_element("log_imbutido").style.display = "none"
            fechador_loja[0].style.display = "none"
        }
        clearTimeout(primeira_transicao)
    }, 500)

    segunda_transicao = setTimeout(() => {
        get_element("transitador_sessao").style.display = "none"

        clearTimeout(segunda_transicao)
    }, 1000)
}

function abre_loja() {

    $("#loja").fadeToggle()

    if (!menus.estado_loja) {
        menus.estado_loja = 1

        if (menus.sessao_loja_ativa)
            $("#rodape_loja").fadeIn()

        get_element("loja").style.animation = "abre_loja .5s"
        get_element("moedas").style.animation = "move_moeda 1s"
        get_element("moedas").style.right = "5%"

        // Verifica se há músicas sendo encerradas
        verificaDesligamentos()
        escondeInformacoes(1, 0, 1)
        novidadesLoja(0)

        executaSons("faixa_musicas", "Musicas", "loja.ogg", 1)

        altera_anim_loja = setTimeout(() => {
            get_element("loja").style.animation = "muda_cor_fundo_loja 50s infinite"
            clearTimeout(altera_anim_loja)
        }, 600)

        loop_loja = setInterval(() => {
            executaSons("faixa_musicas", "Musicas", "loja.ogg", 1)
        }, 71000)
    } else {
        verificaOciosidade(false, 1, 1)
        menus.estado_loja = 0

        let fechador_loja = get_element("fechador_loja")
        fechador_loja[0].style.animation = "none"

        get_element("moedas").style.animation = "volta_moeda 1s"
        get_element("moedas").style.right = "15%"

        escondeInformacoes(0, 0, 1)
        desliga_som2("faixa_musicas", 1)

        clearTimeout(altera_novidade)
        clearInterval(loop_loja)
    }
}

function abre_loja_especial(aba_loja) {
    menus.categoria_anterior = aba_loja

    abre_loja()
    carrega_dados_loja(aba_loja)
}

function novidadesLoja(indice) {

    let novidades_loja = ["Os Bônus já estão disponíveis!", "Temos novos mods :D", "O Patrão ficou maluco!", "A loja foi toda reformada!"]

    if (idioma == "en")
        novidades_loja = ["Bonuses are now available!", "We have new mods :D", "Boss went crazy!", "The store was completely renovated!"]

    if (indice == novidades_loja.length)
        indice_interno = 0
    else
        indice_interno = indice

    get_element("text_novidades_loja").innerHTML = novidades_loja[indice_interno]

    altera_novidade = setTimeout(() => {
        novidadesLoja(indice_interno + 1)
    }, 2000)
}

function pisao_neles() {

    let moeda_ev

    //  Efeito de Pisão
    jogador.qtdPulos++
    jogador.pula()

    jogador.partida_pisoes_pontuados++
    alteraValorEstatisticaPartida("quantidade_pisoes_partida", jogador.partida_pisoes_pontuados)

    if (eventos.inicia_evento == 0)
        if (jogo.dificuldade == 1)
            moeda_ev = 5
        else if (jogo.dificuldade == 2)
            moeda_ev = 7
        else if (jogo.dificuldade == 3)
            moeda_ev = 9
        else
            moeda_ev = 1
    else
        moeda_ev = 0

    if (idioma == "pt")
        jogo.notifica("Pisão Neles! +3 Pontos", "yellow")
    else
        jogo.notifica("Kick them! +3 Points", "yellow")

    let ganha = moeda_ev + Math.round(3 * Math.random())

    if (jogo.dificuldade == 0)
        ganha = moeda_ev + Math.round(2 * Math.random())

    if (ganha > 0) {
        // Pling!
        conquista(9, 0)

        // Duplica a quantidade de moedas ganhas
        if (jogador.bonus_vezes_usados[0] > 0)
            ganha += ganha

        jogador.partida_moedas_coletadas += ganha
        alteraValorEstatisticaPartida("moedas_coletadas_partida", jogador.partida_moedas_coletadas)

        executaSons("faixa_pisoes", "Efeitos", "moeda.ogg", 2)

        mostra_moedas(ganha)
    } else {

        bambam = Math.round(1 * Math.random())
        if (bambam == 0 && eventos.evento == 2)
            executaSons("faixa_efeitos1", "Efeitos", "Batida.ogg", 2)
        else
            executaSons("faixa_memes1", "Memes", "bambam.ogg", 3)
    }

    if (jogo.estatisticasNerds)
        if (ganha > 0)
            if (idioma == "pt")
                console.log("%cPisão efetuado, " + ganha + " moedas coletadas", "color: green")
            else
                console.log("%cKick done, " + ganha + " collected coins", "color: green")
        else
            if (idioma == "pt")
                console.log("%cPisão efetuado", "color: green")
            else
                console.log("%cKick done", "color: green")

    soma_pontuacao(3)
    alteraValorEstatisticaPartida("pontuacao_partida", jogador.partida_pontuacao)
}

function mostra_moedas(valor) {

    get_element("notifica_moeda").innerHTML = `+${valor}`
    $("#notifica_moeda").fadeIn()

    if (typeof esconde_moeda != "undefined")
        clearTimeout(esconde_moeda)

    esconde_moeda = setTimeout(() => {
        $("#notifica_moeda").fadeOut()

        clearTimeout(esconde_moeda)
    }, 1000)
}

function finaliza_evento() {

    if (jogo.status == estados.jogando)
        jogo.notifica(eventos.saida_evento[eventos.inicia_evento], "white")

    if (jogo.estatisticasNerds)
        if (idioma == "pt")
            console.log("%cEvento Finalizado", "color: red")
        else
            console.log("%cEvent Finished", "color: red")

    // Selva de Concreto
    if (eventos.evento == 0 && eventos.contador_tempo_evento >= 30 && jogo.dificuldade == 3)
        conquista(21, 0)

    if (eventos.evento == 1 && jogador.bonus_vezes_usados[1] > 0) {
        ganha = 10 + Math.round(20 * Math.random())

        mostra_moedas(ganha)
    }

    if (eventos.evento == 2 && jogo.status == estados.jogando)
        executaSons("faixa_memes2", "Memes", "bambam2.ogg", 3)

    clearTimeout(eventos.tempo_evento)
    clearTimeout(eventos.ativa_evento)

    eventos.evento = null
    eventos.inicia_evento = null
    chao.muda_chao = [0, 0, 0]

    if (jogo.status == estados.jogando)
        eventos.relogio_eventos()

    if (jogo.status == estados.jogando)
        executaSons2("faixa_efeitos3", "Efeitos", "levelup.ogg", 2)

    confirmaFechamento = setTimeout(() => {
        eventos.termina_evento = null
        eventos.seguraEventoOcioso = 0
        clearTimeout(confirmaFechamento)
    }, 3000)
}

function cancela_evento() {

    if (jogo.estatisticasNerds)
        if (idioma == "pt")
            console.log("%cEvento Cancelado", "color: red")
        else
            console.log("%cCanceling the event", "color: red")

    clearInterval(cronometro)

    if (jogo.status == estados.jogando)
        clearInterval(cronometro2)

    clearTimeout(eventos.tempo_evento)
    clearTimeout(eventos.ativa_evento)

    eventos.evento = null
    eventos.inicia_evento = null
    chao.muda_chao = [0, 0, 0]

}

function encerra_modificador() {

    // Encerra o carregamento do modificador em caso de perca
    if (typeof jogador.var_timer_modificador != "undefined")
        clearInterval(jogador.var_timer_modificador)

    if (typeof jogador.var_timer_recarrega != "undefined")
        clearInterval(jogador.var_timer_recarrega)

    jogador.mod = 0
    jogo.liberaMod = 0
}

function aleatorizaProp() {
    let prop = Math.round(8 * Math.random())
    ambiente.aleatorizadorProp = prop
}

function MsgPerdeu(causa) {

    // Filtro e animação
    if (menus.estatistica_morte)
        get_element("filtro2").style.display = "block"

    if (causa != 1)
        if (causa != 3)
            executaSons2("faixa_efeitos1", "Efeitos", "Batida.ogg", 2)

    if (!opcoes.controle && jogo.status == estados.perdeu) {

        opcoes.controle = 1

        if (jogador.partida_pontuacao > jogador.recorde)
            if (idioma == "pt")
                labelTexto.texto = `Novo Recorde! ( ${jogador.partida_pontuacao} )`
            else
                labelTexto.texto = `New Record! ( ${jogador.partida_pontuacao} )`
        else {

            executaSomPerca(causa)

            texto_escolhido = 1 + Math.round(7 * Math.random())

            if (idioma == "pt") {
                var perdaNormal = ["Faliceu D:", "Teve uma batida ali!", "Capotou o Prédio", "Já era!", "Bateu as Fundações ;)", "Xama o XhamuUuUu", "Quebrou meu prédio véi!", "Errooouuuuuu", "Não consegue né"]

                var perdaAgua = ["Afundou!", "Prédios não nadam!", "Fecha as Janelaaas!", "Explorando os corais", "Com água até a Antena", "Afundando em 15 nós", "Olha os Peixinhos!", "Sirigueijo?", "Tá chovendo aí?"]

                var perdaCidade = ["Ninguém Sobrevive!", "Prédio a Rodo!", "Poluindo a Visão desde 1987", "É um pássaro?!", "40 prédios p/ metro²!", "Me Tira Daqui!", "Pulga! Digo, Prédio!", "Abaixo da Poluição", "E Cinzou!"]

                var perdaLava = ["Derreteu as fundações", "Só para aquecer!", "Não era mentira :)", "Nós avisamos!", "Para o centro da terra!", "Destinos turísticos quentes!", "FACA QUENTE vs PRÉDIO", "O que houve aqui?", "Temperaturas Extremas"]
            } else {
                var perdaNormal = ["Died D:", "There was an accident there!", "Flipped the Building", "It's over!", "Hit the Foundations ;)", "Call the ambulance!", "Broke my building!", "Misseeeeeeeed", "It was not this time"]

                var perdaAgua = ["Sank!", "Buildings do not swim!", "Close the windoooows!", "Exploring the corals", "With water up to the antenna", "Sinking at 15 knots", "Look at the Goldfish!", "Mr. Krabs?", "It's raining there?"]

                var perdaCidade = ["Nobody Survives!", "Millions of Buildings!", "Polluting the vision since 1987", "It is a bird?!", "40 buildings per meter²²!", "Take me out of here!", "Flea! I mean, Building!", "Below Pollution", "And ashes!"]

                var perdaLava = ["Melted the foundations", "Just to warm up!", "It wasn't a lie :)", "We warn!", "To the center of the earth!", "Hot tourist destinations!", "HOT KNIFE vs BUILDING", "What happened here?", "Extreme Temperatures"]
            }

            if (causa == null && jogador.partida_pontuacao >= 0)
                labelTexto.texto = perdaNormal[texto_escolhido]
            else if (causa == 3) // Lava
                labelTexto.texto = perdaLava[texto_escolhido]
            else if (causa == 1) // Água
                labelTexto.texto = perdaAgua[texto_escolhido]
            else if (causa == 0) // Centro da Cidade
                labelTexto.texto = perdaCidade[texto_escolhido]
            else if (jogador.partida_pontuacao >= 0)
                labelTexto.texto = "Como assim!?!"
            else
                labelTexto.texto = "Vergonha da pofissón!"
        }
    }
}

function escondeInformacoes(caso, loja, menu) {

    if (caso) {
        $("#menu_inicial").fadeOut()
        $("#barra_topo").fadeOut()

        if (loja)
            $("#moedas").fadeOut()

        if (menu)
            $("#faixas_menu_ini").fadeOut()

        $("#tutorial").fadeOut()
        $("#puxador_loja").fadeOut()
        $("#icones_aquisicoes").fadeOut()
    } else {
        $("#rodape_loja").fadeOut()

        if (menu)
            $("#faixas_menu_ini").fadeIn()

        $("#menu_inicial").fadeIn()
        $("#barra_topo").fadeIn()
        $("#moedas").fadeIn()
        $("#puxador_loja").fadeIn()
        $("#mods_comprados").fadeIn()
        $("#icones_aquisicoes").fadeIn()
    }
}

function estadoOcioso(caso) {
    if (caso == "auto") {
        botoes(600)
        escondeInformacoes(1, 1)

        let faixa = ["ocioso_1.ogg", "ocioso_2.ogg", "ocioso_3.ogg"]

        if (jogo.tema_ativo != 0)
            if (jogo.musica_tema_ocioso == null)
                executaSons2("faixa_musicas", "Musicas", faixa[Math.round(2 * Math.random())], 1)
            else
                executaSons2("faixa_musicas", "Musicas", jogo.musica_tema_ocioso, 1)
        else
            executaSons2("faixa_musicas", "Musicas", "ocioso_old.ogg", 1)
    } else {
        // Retorna o jogo do modo ocioso
        cancela_evento()

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("%cModo Ocioso desativado", "color: green")
            else
                console.log("%cIdle mode disabled", "color: green")

        jogo.status = estados.jogar
        eventos.seguraEventoOcioso = 0
        jogo.estadoOcioso = 0

        escondeInformacoes(0, 0)

        desliga_som("faixa_musicas", 1)
        clearTimeout(eventos.ativa_evento)
    }
}

// Impede que o jogo entre no modo ocioso
function impedeOcioso() {

    if (jogo.estatisticasNerds)
        if (jogo.ociosidade != jogo.estadoOcioso)
            if (idioma == "pt")
                console.log("%cA Ociosidade está desativada", "color: green")
            else
                console.log("%cIdleness is disabled", "color: green")

    jogo.estadoOcioso = 0

    if (typeof contagemOcioso != "undefined")
        clearTimeout(contagemOcioso)
}

function verificaOciosidade(caso, local, valor) {

    if (local != undefined)
        if (menus.estado_loja)
            caso = 1
        else
            caso = 0

    if (valor != undefined)
        caso = 0

    // Verifica se o modo ocioso está ativo
    if (caso) {
        impedeOcioso()
        cancela_evento()

        jogo.ociosidade = 0
    } else {
        toolTip()

        ociosidade = localStorage.getItem("ociosidade")
        if (ociosidade == null)
            jogo.ociosidade = 0
        else
            jogo.ociosidade = parseInt(ociosidade)
    }
}

function verificaMetrica(valor) {
    if (valor > 1000)
        if (valor != 1)
            return "km's"
        else
            return "km"
    else
        if (valor != 1)
            if (idioma == "pt")
                return "metros"
            else
                return "meters"
        else
            if (idioma == "pt")
                return "metro"
            else
                return "meter"
}

function verificaTempo(valor) {
    if (valor >= 3600)
        if (valor > 3600)
            if (idioma == "pt")
                return "horas"
            else
                return "hours"
        else
            if (idioma == "pt")
                return "hora"
            else
                return "hour"
    else if (valor >= 60)
        if (valor > 60)
            if (idioma == "pt")
                return "minutos"
            else
                return "minutes"
        else
            if (idioma == "pt")
                return "minuto"
            else
                return "minute"
    else
        if (valor != 1)
            if (idioma == "pt")
                return "segundos"
            else
                return "seconds"
        else
            if (idioma == "pt")
                return "segundo"
            else
                return "second"
}

function calculaTempo(alvo) {

    hora = Math.trunc(alvo / 3600)

    minuto = Math.trunc((alvo / 60) % 60)
    segundo = (alvo % 60)

    if (hora < 10)
        hora = "0" + hora

    if (minuto < 10)
        minuto = "0" + minuto

    if (segundo < 10)
        segundo = "0" + segundo

    if (alvo >= 3600)
        tempo_calculado = hora + ":" + minuto + ":" + segundo
    else if (alvo >= 60)
        tempo_calculado = minuto + ":" + segundo
    else
        tempo_calculado = alvo

    return tempo_calculado
}

function alteraValorEstatisticaPartida(objeto, valor) {

    if (objeto != "reset") {

        if (objeto != "distancia_percorrida_partida" && objeto != "tempo_jogado_partida" && objeto != "tempo_eventos_partida")
            get_element(objeto).innerHTML = valor
        else if (objeto == "distancia_percorrida_partida") { // Distância percorrida
            metrica = verificaMetrica(jogador.partida_distancia_viajada)

            if (jogador.partida_distancia_viajada > 1000)
                hist_distancia_preview = (jogador.partida_distancia_viajada / 1000).toFixed(2)
            else
                hist_distancia_preview = jogador.partida_distancia_viajada

            get_element("distancia_percorrida_partida").innerHTML = `${hist_distancia_preview} ${metrica}`
        } else if (objeto == "tempo_jogado_partida") {
            nomenclatura = verificaTempo(jogador.partida_tempo_jogado)
            tempo_jogado = calculaTempo(jogador.partida_tempo_jogado)
            get_element("tempo_jogado_partida").innerHTML = `${tempo_jogado} ${nomenclatura}`
        }

        if (objeto == "tempo_eventos_partida") {
            nomenclatura = verificaTempo(jogador.partida_tempo_em_eventos)
            tempo_jogado = calculaTempo(jogador.partida_tempo_em_eventos)
            get_element("tempo_eventos_partida").innerHTML = `${tempo_jogado} ${nomenclatura}`
        }
    } else {

        if (jogo.status != estados.jogando) {
            cronometra = setTimeout(() => {
                get_element("causa_perca").innerHTML = "??"

                const alvos_reseta = ["pontuacao_partida", "tempo_jogado_partida", "distancia_percorrida_partida", "quantidade_mods_partida", "moedas_coletadas_partida", "quantidade_pulos_partida", "quantidade_pisoes_partida", "quantidade_predios_partida", "eventos_concluidos_partida", "tempo_eventos_partida", "quantidade_cidade_partida", "quantidade_parque_partida", "quantidade_agua_partida", "quantidade_lava_partida"]

                for (let i = 0; i < alvos_reseta.length; i++) {
                    get_element(alvos_reseta[i]).innerHTML = 0
                }
            }, 1500)
        }

        clearTimeout(cronometra)
    }
}

function carrega_estatisticas_evento() {

    get_element("eventos_concluidos_partida").innerHTML = jogador.partida_eventos_concluidos
    get_element("quantidade_cidade_partida").innerHTML = jogador.partida_evento_cidade
    get_element("quantidade_parque_partida").innerHTML = jogador.partida_evento_parque
    get_element("quantidade_agua_partida").innerHTML = jogador.partida_evento_agua
    get_element("quantidade_lava_partida").innerHTML = jogador.partida_evento_lava
}

function troca_descricao(primeira, segunda, modo) {
    toolTip()

    if (modo) {
        toolTip(primeira)

        altera_descricao = setTimeout(() => {

            toolTip(segunda)

            requisita_titulo = setTimeout(() => {
                troca_descricao(primeira, segunda, modo)
            }, 2000)

        }, 2000)
    } else {
        toolTip()

        if (typeof altera_descricao != "undefined")
            clearTimeout(altera_descricao)

        if (typeof requisita_titulo != "undefined")
            clearTimeout(requisita_titulo)
    }
}

function altera_modificador(novo) {

    executaSons2("faixa_efeitos2", "Efeitos", "pop.ogg", 2)

    jogador.mod_em_uso = novo
    localStorage.setItem("modEmUso", jogador.mod_em_uso)

    sincronizaModificadoresComprados(1)
    carrega_vendas_loja("Modificadores")

    if (idioma == "pt")
        get_element("mensagem_teaser").innerHTML = "Modificador alterado."
    else
        get_element("mensagem_teaser").innerHTML = "Modifier changed."

    exibe_teaser("Modificador alterado", "cyan")
    pisca_loja("0, 255, 255, .2")
}

function pisca_loja(cor) {

    if (typeof pisca_fundo_loja != "undefined")
        clearTimeout(pisca_fundo_loja)

    if (typeof pisca_fundo_loja2 != "undefined")
        clearTimeout(pisca_fundo_loja2)

    get_element("filtro_alerta_loja").style.backgroundColor = `rgba(${cor})`
    get_element("filtro_alerta_loja").style.display = "block"

    pisca_fundo_loja = setTimeout(() => {
        $("#filtro_alerta_loja").fadeOut()
        clearTimeout(pisca_fundo_loja)

        pisca_fundo_loja2 = setTimeout(() => {
            get_element("filtro_alerta_loja").style.display = "none"
            clearTimeout(pisca_fundo_loja2)
        }, 500)
    }, 500)
}

function status_confirmacao(valor, requisicao_auto, objeto) {

    if (requisicao_auto == 0 && objeto == "Loja")
        $("#quadro_confirma_compra").fadeOut()

    if (requisicao_auto == 0 && objeto == "Exclui")
        $("#quadro_confirma_exclusao").fadeOut()

    if (valor && !requisicao_auto) {
        if (objeto == "Loja") {
            let categoria = menus.cache_compra[0]
            let item = menus.cache_compra[1]

            confirma_compra(categoria, item, valor)
            menus.janelaConfirma = 0
        } else {
            apagaDados(valor)
            menus.janelaConfirma = 0
        }
    }
}

function quadro_confirma_compra(requisicao_auto) {
    menus.janelaConfirma = 1
    menus.cache_confirma = "Loja"

    if (requisicao_auto)
        $("#quadro_confirma_compra").fadeIn()

    return 55
}

function quadro_confirma_exclusao() {
    menus.janelaConfirma = 1
    menus.cache_confirma = "Exclui"
    $("#quadro_confirma_exclusao").fadeIn()
}

function exibe_teaser(mensagem, cor) {

    if (typeof esconde_teaser != "undefined")
        clearTimeout(esconde_teaser)

    get_element("mensagem_teaser").style.color = cor
    get_element("mensagem_teaser").innerHTML = mensagem

    $("#mensagem_teaser").fadeIn()

    esconde_teaser = setTimeout(() => {
        $("#mensagem_teaser").fadeOut()
        clearTimeout(esconde_teaser)
    }, 3000)
}

// Soma os valores para a pontuação de forma mais natural
function soma_pontuacao(somar) {

    let contador = 0

    somador = setInterval(() => {
        if (somar > 0) {
            contador++
            jogador.partida_pontuacao++
        } else if (somar < 0) {
            contador--
            jogador.partida_pontuacao--
        }

        // Atualiza a pontuação em caso de perca antes de completamento
        get_element("pontuacao_partida").innerHTML = jogador.partida_pontuacao

        if (contador == somar)
            clearInterval(somador)
    }, 50)
}

function reseta_pontuacao() {

    zerador = setInterval(() => {

        if (jogador.partida_pontuacao > 0)
            jogador.partida_pontuacao--

        if (jogador.partida_pontuacao < 0)
            jogador.partida_pontuacao++

        if (jogador.partida_pontuacao == 0) {
            jogador.partida_pontuacao = 0
            clearInterval(zerador)
        }
    }, 25)
}

function limpa_intervalos() {

    if (typeof cronometroTempoPartida != "undefined")
        clearInterval(cronometroTempoPartida)

    if (typeof jogador.var_timer_mod != "undefined")
        clearInterval(jogador.var_timer_mod)

    if (typeof tempo_evento != "undefined")
        clearTimeout(tempo_evento)

    if (typeof ativa_evento != "undefined")
        clearTimeout(ativa_evento)

    if (typeof preenche_barra_notificacao != "undefined")
        clearInterval(preenche_barra_notificacao)

    if (jogo.estatisticasNerds)
        if (idioma == "pt")
            console.log("%cLimpando funções de intervalos e disparos//", "color: red")
        else
            console.log("%cCleaning interval and trigger functions//", "color: red")
}

function registra_compra(item, requisicao_auto) {

    let identificadores = ["tt_skins_compradas", "tt_modificadores_comprados", "tt_bonus_comprados"]
    let variaveis = [jogador.tt_skins_compradas, jogador.tt_mods_comprados, jogador.tt_bonus_comprados]

    if (requisicao_auto == 0) {
        if (item == "Skins") {
            jogador.tt_skins_compradas++
            localStorage.setItem("tt_skins_compradas", jogador.tt_skins_compradas)
        }

        if (item == "Modificadores") {
            jogador.tt_mods_comprados++
            localStorage.setItem("tt_mods_comprados", jogador.tt_mods_comprados)
        }

        if (item == "Bônus") {
            jogador.tt_bonus_comprados++
            localStorage.setItem("tt_bonus_comprados", jogador.tt_bonus_comprados)
        }

        registra_compra(0, 1)
    } else {
        for (let i = 0; i < 3; i++) {
            get_element(identificadores[i]).innerHTML = variaveis[i]
        }
    }
}

function falas_dilma() {
    trecho = 1 + Math.round(3 * Math.random())
    executaSons2("faixa_memes1", "Memes", "dilma_vento_" + trecho + ".ogg", 2)
}

function altera_moedas(valor, total) {

    if (typeof altera_moeda != "undefined")
        clearInterval(altera_moeda)

    let montante = 0

    altera_moeda = setInterval(() => {

        if (valor < montante)
            montante--
        else if (valor > montante)
            montante++

        get_element("notifica_moeda").innerHTML = `$${total + montante}`

        if (valor == montante) {
            clearInterval(altera_moeda)
            get_element("notifica_moeda").innerHTML = `$${jogador.moedas}`
        }
    }, 10)
}

function objetosVoadores() {

    if (ambiente.segura_objeto_voador == 0) {

        animaLuzesGuia(0)
        ambiente.segura_objeto_voador = 1

        libera_objeto_voador = 1 + Math.round(5 * Math.random())
        setTimeout(() => {

            let tempo = 50 + Math.round(25 * Math.random())
            let caso = 1 + Math.round(3 * Math.random()) // Define se será um avião, dirigível ou disco voador

            gera_objeto_voador = setTimeout(() => {

                if (caso == 1 && jogo.tema_ativo == 1) // Gera um avião
                    // Apenas cria o avião se o tema for o padrão
                    ambiente.objeto_voador = [3, -200, 90, 1]
                else if (caso == 2) // Gera um dirigível
                    ambiente.objeto_voador = [-.057, 1370, 300, 3]
                else if (ambiente.astro[2] == 1) // Gera um disco voador
                    ambiente.objeto_voador = [-8, 1400, 130, 2]
                else
                    ambiente.segura_objeto_voador = 0

                clearTimeout(gera_objeto_voador)

                if (ambiente.astro[2] == 1 && ambiente.objeto_voador[3] == 1)
                    animaLuzesGuia(1)

            }, tempo * 100)
        }, libera_objeto_voador * 1000)
    }
}

function regula_sessao_loja(categoria) {
    let apelido_interno = "Skins"

    if (menus.sessao_loja_ativa != 1) {
        if (categoria == "Modificadores") {
            executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

            apelido_interno = categoria

            if (idioma == "en")
                apelido_interno = "Modifiers"
        }

        apelido_interno = sincronizaApelidoInterno(categoria)

        menus.categoria_anterior = categoria
        get_element("categoria_loja").innerHTML = apelido_interno
        carrega_vendas_loja(categoria)

        $("#rodape_loja").fadeIn()
        $("#sessao_loja").fadeIn()
        menus.sessao_loja_ativa = 1

        altera_altura_fechador()
    } else if (categoria != menus.categoria_anterior) {

        executaSons2("faixa_efeitos3", "Efeitos", "transitador_loja.ogg", 2)

        if (typeof primeira_transicao != "undefined")
            clearTimeout(primeira_transicao)

        if (typeof segunda_transicao != "undefined")
            clearTimeout(segunda_transicao)

        $("#sessao_loja").fadeIn()
        $("#rodape_loja").fadeIn()

        menus.categoria_anterior = categoria
        apelido_interno = sincronizaApelidoInterno(categoria)

        get_element("transitador_sessao").style.display = "block"
        get_element("transitador_sessao").style.backgroundColor = "rgb(3, 73, 64)"
        get_element("transitador_sessao").style.animation = "transita_loja .5s"

        primeira_transicao = setTimeout(() => {
            get_element("transitador_sessao").style.width = "100%"
            get_element("transitador_sessao").style.animation = "transita_loja2 .5s"

            get_element("categoria_loja").innerHTML = apelido_interno
            carrega_vendas_loja(categoria)
            clearTimeout(primeira_transicao)
        }, 500)

        segunda_transicao = setTimeout(() => {
            get_element("transitador_sessao").style.display = "none"

            clearTimeout(segunda_transicao)
        }, 1000)
    } else {

        $("#rodape_loja").fadeOut()
        $("#sessao_loja").fadeOut()
        menus.sessao_loja_ativa = 0
        menus.categoria_anterior = null

        altera_altura_fechador()
    }
}

function sincronizaApelidoInterno(apelido) {

    conversao = "Skins"

    if (apelido == "Modificadores")
        if (idioma == "pt")
            conversao = apelido
        else
            conversao = "Modifiers"

    if (apelido == "Bônus")
        if (idioma == "pt")
            conversao = apelido
        else
            conversao = "Bonuses"

    if (apelido == "Temas")
        if (idioma == "pt")
            conversao = apelido
        else
            conversao = "Themes"

    return conversao
}

function altera_altura_fechador() {

    let fechador_loja = get_element("fechador_loja")

    if (menus.sessao_loja_ativa) {
        // Animação do fechador da loja subindo
        fechador_loja[0].style.animation = "altera_posicao_fechador 1s"

        setTimeout(() => {
            fechador_loja[0].style.top = "12%"
        }, 990)
    } else {
        fechador_loja[0].style.animation = "altera_posicao_fechador2 1s"

        setTimeout(() => {
            fechador_loja[0].style.top = "24%"
        }, 990)
    }
}

function notificacao(item, modo) {

    carrega_idioma(1)

    if (segura_notificacao == 0) {
        segura_notificacao = 1

        if (modo != "undefined")
            fila_notificacoes.shift()

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("Processando notificação: " + nome_notificacoes[item])
            else
                console.log("Processing notification: " + nome_notificacoes[item])

        descricao = get_element("texto_notificacoes_trad")
        descricao[0].innerHTML = nome_notificacoes[item]

        get_element("quadro_notificacoes").style.animation = "abre_notificacao 1s"
        $("#quadro_notificacoes").fadeIn()

        get_element("status_barra_notificacoes").style.width = "0%"

        executaSons("faixa_memes3", "Memes", "gas.ogg", 3)

        setTimeout(() => {
            tempo_notificacao()
        }, 1200)
    } else {
        bloqueia_adicao = 0

        for (let i = 0; i < fila_notificacoes.length; i++) {
            if (fila_notificacoes[i] == item)
                bloqueia_adicao++
        }

        if (bloqueia_adicao == 0) {
            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("Notificação: " + nome_notificacoes[item] + " adicionada a fila")
                else
                    console.log("Notification: " + nome_notificacoes[item] + " added to queue")

            fila_notificacoes.push(item)
        }
    }
}

// Redireciona a fila de notificações
function redireciona_notificacao(valor) {
    if (fila_notificacoes.length == 0)
        clearInterval(puxa_proxima_notificacao)

    notificacao(valor, 1)
}

function tempo_notificacao() {

    if (!menus.tamanho_barra_notificacao)
        menus.tamanho_barra_notificacao = 0

    preenche_barra_notificacao = setInterval(() => {
        if (menus.tamanho_barra_notificacao >= 100) {
            menus.tamanho_barra_notificacao = 100

            if (menus.tamanho_barra_notificacao < 95)
                clearInterval(preenche_barra_notificacao)

            get_element("quadro_notificacoes").style.animation = "fecha_notificacao 1s"

            gatilho_fecha_notificacao = setTimeout(() => {
                clearInterval(preenche_barra_notificacao)
                clearTimeout(gatilho_fecha_notificacao)

                get_element("quadro_notificacoes").style.display = "none"
                menus.tamanho_barra_notificacao = 0
                segura_notificacao = 0

                setTimeout(() => {
                    if (fila_notificacoes.length > 0) {
                        redireciona_notificacao(fila_notificacoes[0])
                    }
                }, 1000)
            }, 1000)
        } else
            menus.tamanho_barra_notificacao++

        get_element("status_barra_notificacoes").style.width = menus.tamanho_barra_notificacao + "%"
    }, 60)
}

function pausa_tempo_notificacao() {
    clearInterval(preenche_barra_notificacao)
}

function recarrega_jogo_tema() {
    setTimeout(() => {
        location.reload()
    }, 2000)
}

function verifica_tema() {
    // Encerra as transições entre dia e noite
    if (typeof estrelificador != "undefined")
        clearInterval(estrelificador)

    if (typeof dializador != "undefined")
        clearInterval(dializador)

}

function freia_predio() {

    if (typeof tRd !== "undefined")
        clearTimeout(tRd)

    zera_velocidade = setInterval(() => {
        if (jogo.velocidade > 0)
            jogo.velocidade--
        else {
            jogo.velocidade = 0
            clearInterval(zera_velocidade)
        }
    }, 40)
}

function acelera_predio() {
    vlt_velocidade = setTimeout(() => {
        animaRoda()

        volta_velocidade = setInterval(() => {

            if (jogo.velocidade < 10)
                jogo.velocidade++
            else {
                jogo.velocidade = 10
                clearInterval(volta_velocidade)
                clearTimeout(vlt_velocidade)
            }
        }, 100)
    }, 2000)
}

function verifica_selecionado(local) {

    if (typeof desliga_preview != "undefined") // Estende a visualização da música
        clearTimeout(desliga_preview)

    if (local)
        componente = get_element("seleciona_tema").value
    else
        componente = get_element("seleciona_ocioso").value

    if (componente == "random") {
        jogo.musica_tema = null

        if (local)
            localStorage.setItem("temaMusica", 0)
        else
            localStorage.setItem("temaOcioso", 0)
    } else {
        if (local) {
            jogo.musica_tema = `${componente}.ogg`
            localStorage.setItem("temaMusica", `${componente}.ogg`)
        } else {
            jogo.musica_tema_ocioso = `${componente}.ogg`
            localStorage.setItem("temaOcioso", `${componente}.ogg`)
        }

        executaSons2("faixa_musicas", "Musicas", `${componente}.ogg`, 1)
    }

    desliga_preview = setTimeout(() => {
        desliga_som("faixa_musicas", 1)
    }, 10000)
}

function altera_chao_referencia(valor_esperado) {

    if (eventos.evento != 1 && eventos.evento != 3) return

    chao.altera_referencia = 1

    setTimeout(() => {

        if (valor_esperado < jogador.chao_referencia) // Descendo
            jogador.chao_referencia--
        else // Subindo
            jogador.chao_referencia++

        if (valor_esperado != jogador.chao_referencia)
            altera_chao_referencia(valor_esperado)
        else// Destravando o chao
            chao.altera_referencia = 0
    }, 10)
}