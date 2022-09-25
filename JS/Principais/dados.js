function valores() {
    document.getElementById("pontuacao").innerHTML = jogador.partida_pontuacao
    document.getElementById("velocity").innerHTML = velocidade_obs * 2
    document.getElementById("timer_mod").innerHTML = jogo.timer_mod
    document.getElementById("qtdPulos").innerHTML = jogador.qtdPulos

    if (mod == 1) {
        ajusta_cores(1, 2)

        if (dev_op == 1) {
            ajusta_cores(3, 2)
            document.getElementById("estado_mod").innerHTML = "DEV"
        }
    } else if (mod == 0 & jogo.timer_mod < 5 && estadoAtual == estados.jogando && jogador.qtdMods > 0) // Verifica se a qtd do modificador é maior que 0 para poder recarregar
        ajusta_cores(2, 2)
    else if (jogador.qtdMods == 0)
        ajusta_cores(3, 2)

    if (jogador.qtdPulos == 0)
        ajusta_cores(1, 3)
    else
        ajusta_cores(5, 3)
}

function requisita_api() {

    // EXPERIMENTAL
    // Enviando os dados para a API salvar
    const elemento = document.getElementById("flag_api")

    const data = {
        pulos: hist_pulos,
        money: jogador.moedas,
        mortes: hist_mortes
    }

    fetch(`http://localhost:3000/pula?save=1&data=${JSON.stringify(data)}`)
        .then(res => res.json())
        .then(retorno => {
            if (retorno.status !== 404)
                elemento.style.backgroundColor = "Green"
            else
                elemento.style.backgroundColor = "Orange"
        })
        .catch(err => {
            console.log("API Offline", err)
            elemento.style.backgroundColor = "Red"
        })
}

function carrega_dados() {

    inicia_game = localStorage.getItem("iniciaLoucura_1.1")
    if (inicia_game == null)
        $("#boas_vindas").fadeIn()
    else
        $("#log_").fadeIn()

    tutorial_completo = localStorage.getItem("tutorialCompleto")
    if (tutorial_completo == null)
        tut_complet = 0
    else
        tut_complet = parseInt(tutorial_completo)

    recorde = localStorage.getItem("recorde")
    if (recorde == null)
        recorde = 0

    // Pegando os valores de pulos do localStorage e convertendo em inteiros
    hist_distancia = localStorage.getItem("qtdDistancia")
    if (hist_distancia == null)
        hist_distancia = 0
    else
        hist_distancia = parseInt(hist_distancia)

    hist_tempo_jogado = localStorage.getItem("qtdTempoJogado")
    if (hist_tempo_jogado == null)
        hist_tempo_jogado = 0
    else
        hist_tempo_jogado = parseInt(hist_tempo_jogado)

    hist_pulos = localStorage.getItem("qtdPulos")
    if (hist_pulos == null)
        hist_pulos = 0
    else
        hist_pulos = parseInt(hist_pulos)

    hist_pontos = localStorage.getItem("qtdPontos")
    if (hist_pontos == null)
        hist_pontos = 0
    else
        hist_pontos = parseInt(hist_pontos)

    hist_mod = localStorage.getItem("qtdMods")
    if (hist_mod == null)
        hist_mod = 0
    else
        hist_mod = parseInt(hist_mod)

    hist_tempo_flutuando = localStorage.getItem("tempoFlutuando")
    if (hist_tempo_flutuando == null)
        hist_tempo_flutuando = 0
    else
        hist_tempo_flutuando = parseInt(hist_tempo_flutuando)

    hist_mortes = localStorage.getItem("qtdMortes")
    if (hist_mortes == null)
        hist_mortes = 0
    else
        hist_mortes = parseInt(hist_mortes)

    hist_pisoes = localStorage.getItem("qtdPisoes")
    if (hist_pisoes == null)
        hist_pisoes = 0
    else
        hist_pisoes = parseInt(hist_pisoes)

    moedas = localStorage.getItem("moedas")
    if (moedas == null)
        jogador.moedas = 0
    else
        jogador.moedas = parseInt(moedas)

    moedas_coletadas = localStorage.getItem("moedasColetadas")
    if (moedas_coletadas == null)
        jogador.moedas_coletadas = 0
    else
        jogador.moedas_coletadas = parseInt(moedas_coletadas)

    moedas_gastas = localStorage.getItem("moedasGastas")
    if (moedas_gastas == null)
        jogador.moedas_gastas = 0
    else
        jogador.moedas_gastas = parseInt(moedas_gastas)

    hist_eventos_concluidos = localStorage.getItem("eventosConcluidos")
    if (hist_eventos_concluidos == null)
        hist_eventos_concluidos = 0
    else
        hist_eventos_concluidos = parseInt(hist_eventos_concluidos)

    hist_tempo_eventos = localStorage.getItem("tempoEventos")
    if (hist_tempo_eventos == null)
        hist_tempo_eventos = 0
    else
        hist_tempo_eventos = parseInt(hist_tempo_eventos)

    hist_cidade = localStorage.getItem("qtdEventoCidade")
    if (hist_cidade == null)
        hist_cidade = 0
    else
        hist_cidade = parseInt(hist_cidade)

    hist_parque = localStorage.getItem("qtdEventoParque")
    if (hist_parque == null)
        hist_parque = 0
    else
        hist_parque = parseInt(hist_parque)

    hist_agua = localStorage.getItem("qtdEventoAgua")
    if (hist_agua == null)
        hist_agua = 0
    else
        hist_agua = parseInt(hist_agua)

    hist_lava = localStorage.getItem("qtdEventoLava")
    if (hist_lava == null)
        hist_lava = 0
    else
        hist_lava = parseInt(hist_lava)

    // Sincroniza o Volume da Música
    volMusica = localStorage.getItem("volMusica")
    if (volMusica == null)
        volMusica = 50

    carrega_volume(volMusica, 1)

    // Sincroniza o Volume dos Efeitos
    volEfeitos = localStorage.getItem("volEfeito")
    if (volEfeitos == null)
        volEfeitos = 50

    carrega_volume(volEfeitos, 2)

    // Sincroniza o Volume dos Memes
    volMemes = localStorage.getItem("volMemes")
    if (volMemes == null)
        volMemes = 50

    carrega_volume(volMemes, 3)

    efeitosSom = localStorage.getItem("efeitosSom")
    if (efeitosSom == null)
        efeitosSom = 1
    else
        jogo.estadoSom = parseInt(efeitosSom)


    // Sincroniza animação de morte
    estatistica_morte = localStorage.getItem("estatisticaMorte")
    if (estatistica_morte == null)
        estatistica_morte = 1
    else
        estatistica_morte = parseInt(estatistica_morte)

    // Sincroniza a configuração de tema atual
    config_temaEscolhido = localStorage.getItem("TemaEscolhido")
    if (config_temaEscolhido == null)
        Cenario_sprites.tema = 0
    else
        Cenario_sprites.tema = parseInt(config_temaEscolhido)

    if (Cenario_sprites.tema != 0)
        sincronizaRelogio()


    // Sincroniza as estatísticas para nerds através do console
    estatisticasNerds = localStorage.getItem("estatisticasNerds")
    if (estatisticasNerds == null)
        jogo.estatisticasNerds = 0

    jogo.estatisticasNerds = parseInt(estatisticasNerds)

    // Sincroniza as notificações de conquistas
    notificacoesConquistas = localStorage.getItem("notificaConquistas")
    if (notificacoesConquistas == null)
        jogo.notificaConquista = 1
    else
        jogo.notificaConquista = parseInt(notificacoesConquistas)

    qualidadeGraficos = localStorage.getItem("qualidadeGrafica")
    if (qualidadeGraficos == null)
        jogo.qualidadeGrafica = 1
    else
        jogo.qualidadeGrafica = parseInt(qualidadeGraficos)

    // Sincroniza a configuração para a Dificuldade do jogo
    dificuldadeJogo = localStorage.getItem("dificuldadeJogo")
    if (dificuldadeJogo == null)
        jogo.dificuldade = 1 // Dificuldade Normal por padrão
    else
        jogo.dificuldade = parseInt(dificuldadeJogo)

    // Sincroniza a configuração de ociosidade
    ociosidade = localStorage.getItem("ociosidade")
    if (ociosidade == null)
        jogo.ociosidade = 0
    else
        jogo.ociosidade = parseInt(ociosidade)

    // Sincronizando a skin selecionada atualmente
    skinAtual = localStorage.getItem("skinAtual")
    if (skinAtual == null)
        jogador.skin = 7
    else
        jogador.skin = parseInt(skinAtual)


    // Sincronizando a lista de Skins
    loja_skinsCompradas = localStorage.getItem("skinsCompradas")
    if (loja_skinsCompradas == null)
        jogador.skins_compradas = [0, 0, 0, 0, 0, 0, 0, 1]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = loja_skinsCompradas.split(",")

        for (let i = 0; i < 7; i++) {
            indices[i]

            if (indices[i] != 1)
                indices[i] = 0

            jogador.skins_compradas[i] = parseInt(indices[i])
        }
    }

    loja_modsComprados = localStorage.getItem("modsComprados")
    if (loja_modsComprados == null)
        jogador.mods_comprados = [0, 0, 0, 0]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = loja_modsComprados.split(",")

        for (let i = 0; i < 4; i++) {
            indices[i]

            if (indices[i] != 1)
                indices[i] = 0

            jogador.mods_comprados[i] = parseInt(indices[i])
        }
    }

    // Sincronizando o mod que está ativo no momento
    mod_em_uso = localStorage.getItem("modEmUso")
    if (mod_em_uso == null)
        jogador.mod_em_uso = 0
    else
        jogador.mod_em_uso = parseInt(mod_em_uso)

    // Sincroniza a quantidade de usos dos modificadores
    loja_modsCompradosUsados = localStorage.getItem("modsCompradosUsados")
    if (loja_modsCompradosUsados == null)
        jogador.mods_vezes_usados = [0, 0, 0, 0]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = loja_modsCompradosUsados.split(",")

        for (let i = 0; i < 4; i++) {
            let valor = indices[i]

            if (jogador.mods_comprados[i] == 1 && valor == 0)
                valor = 5

            if (jogador.mods_vezes_usados[i] == 0)
                jogador.mods_vezes_usados[i] = parseInt(valor)
        }
    }

    sincronizaModificadoresComprados(1)

    bonus_comprados = localStorage.getItem("bonusComprados")
    if (bonus_comprados == null)
        jogador.bonus_comprados = [0, 0, 0]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = bonus_comprados.split(",")

        for (let i = 0; i < 3; i++) {
            indices[i]

            if (indices[i] != 1)
                indices[i] = 0

            jogador.bonus_comprados[i] = parseInt(indices[i])
        }
    }

    // Sincroniza a quantidade de usos dos modificadores
    loja_bonusVezesUsados = localStorage.getItem("bonusVezesUsados")
    if (loja_bonusVezesUsados == null)
        jogador.bonus_vezes_usados = [0, 0, 0]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = loja_bonusVezesUsados.split(",")

        for (let i = 0; i < 3; i++) {
            let valor = indices[i]

            if (jogador.bonus_comprados[i] == 1 && valor == 0)
                valor = 5

            if (jogador.bonus_vezes_usados[i] == 0)
                jogador.bonus_vezes_usados[i] = parseInt(valor)
        }
    }

    sincroniza_bonus(1)

    lista_conquistas_g = localStorage.getItem("lista_conquistas_ganhas")
    if (lista_conquistas_g == null)
        lista_conquistas_ganhas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    else {
        // Recolhendo os valores e convertendo para um array utilizável
        let indices = lista_conquistas_g.split(",")

        // Reiniciando o Array
        lista_conquistas_ganhas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        // Convertendo o valor e salvando no array corretamente
        for (let i = 0; i < lista_conquistas.length; i++) {
            indices[i]

            if (indices[i] == 0 || indices[i] == 1 || indices[i] == 2)
                lista_conquistas_ganhas[i] = parseInt(indices[i])
        }
    }

    sincronizaConquistas()

    // Sincroniza a musica tema principal
    musicaTema = localStorage.getItem("temaMusica")
    if (musicaTema == "0")
        jogo.musica_tema = null

    musicaTemaOcioso = localStorage.getItem("temaOcioso")
    if (musicaTemaOcioso == "0")
        jogo.musica_tema_ocioso = null

    temaAtivo = localStorage.getItem("temaAtivo")
    if (temaAtivo == null)
        jogo.tema_ativo = 1
    else
        jogo.tema_ativo = parseInt(temaAtivo)

    temasComprados = localStorage.getItem("temasComprados")
    if (temasComprados == null)
        jogo.temas_comprados = [0, 1]
    else
        jogo.temas_comprados = [1, 1]

    // Recolhe todas as informações do localStorage e salva
    let identificadores = ["tt_skins_compradas", "tt_mods_comprados", "tt_bonus_comprados"]

    for (let i = 0; i < 3; i++) {

        valor = localStorage.getItem(identificadores[i])

        if (valor == null)
            valor = 0
        else
            valor = parseInt(valor)

        if (i == 0)
            jogador.tt_skins_compradas = valor

        if (i == 1)
            jogador.tt_mods_comprados = valor

        if (i == 2)
            jogador.tt_bonus_comprados = valor

    }

    registra_compra(0, 1)

    // Estatísticas do histórico do jogo
    // Verifica se a distância é acima dos quilometros
    metrica = verificaMetrica(hist_distancia)

    if (hist_distancia > 1000)
        hist_distancia_preview = (hist_distancia / 1000).toFixed(2)
    else
        hist_distancia_preview = hist_distancia

    // Converte o tempo total de partida
    nomenclatura = verificaTempo(hist_tempo_jogado)
    tempo_jogado = calculaTempo(hist_tempo_jogado)

    document.getElementById("tempo_jogado").innerHTML = `${tempo_jogado} ${nomenclatura}`
    document.getElementById("distancia_percorrida").innerHTML = `${hist_distancia_preview} ${metrica}`
    document.getElementById("quantidade_pulos").innerHTML = hist_pulos
    document.getElementById("quantidade_pontos").innerHTML = hist_pontos
    document.getElementById("quantidade_mods").innerHTML = hist_mod
    document.getElementById("quantidade_mortes").innerHTML = hist_mortes
    document.getElementById("quantidade_pisoes").innerHTML = hist_pisoes
    document.getElementById("recorde").innerHTML = recorde

    document.getElementById("notifica_moeda").innerHTML = `$${jogador.moedas}`
    document.getElementById("moedas_coletadas").innerHTML = jogador.moedas_coletadas
    document.getElementById("moedas_gastas").innerHTML = jogador.moedas_gastas

    // Converte o tempo total em eventos
    nomenclatura = verificaTempo(hist_tempo_eventos)
    tempo_jogado = calculaTempo(hist_tempo_eventos)

    // Estatísticas de Eventos
    document.getElementById("eventos_concluidos").innerHTML = hist_eventos_concluidos
    document.getElementById("tempo_eventos").innerHTML = `${tempo_jogado} ${nomenclatura}`
    document.getElementById("quantidade_cidade").innerHTML = hist_cidade
    document.getElementById("quantidade_parque").innerHTML = hist_parque
    document.getElementById("quantidade_agua").innerHTML = hist_agua
    document.getElementById("quantidade_lava").innerHTML = hist_lava

    document.getElementById("qtdMods").innerHTML = jogador.qtdMods

    sincronizaBotoesConfigs(estatistica_morte)
}

function reseta() {

    requisita_api() // Sincronizando com a API

    $("#versao_texto").fadeIn()
    $(".pulos_trad").fadeOut()
    $("#qtdPulos").fadeOut()

    gravidade = 1.6
    jogador.velocidade = 0
    jogador.y = 0

    if (jogador.partida_pontuacao > recorde) {
        localStorage.setItem("recorde", jogador.partida_pontuacao)
        recorde = jogador.partida_pontuacao
    }

    // Salvando os valores atualizados no LocalStorage
    if (jogador.partida_pontuacao > 0)
        hist_pontos += jogador.partida_pontuacao

    if (jogador.partida_moedas_coletadas > 0)
        altera_moedas(jogador.partida_moedas_coletadas, jogador.moedas)
    else
        document.getElementById("notifica_moeda").innerHTML = `$${jogador.moedas}`

    // Dados Gerais
    jogador.moedas += jogador.partida_moedas_coletadas
    hist_distancia += jogador.partida_distancia_viajada
    hist_tempo_jogado += jogador.partida_tempo_jogado
    hist_pulos += jogador.partida_pulos_dados
    hist_mod += jogador.partida_mods_ativados
    hist_tempo_flutuando += jogador.partida_tempo_flutuando
    hist_mortes += contador_mortes
    hist_pisoes += jogador.partida_pisoes_pontuados

    // Eventos
    hist_eventos_concluidos += jogador.partida_eventos_concluidos
    hist_tempo_eventos += jogador.partida_tempo_em_eventos
    hist_cidade += jogador.partida_evento_cidade
    hist_parque += jogador.partida_evento_parque
    hist_agua += jogador.partida_evento_agua
    hist_lava += jogador.partida_evento_lava
    jogador.moedas_coletadas += jogador.partida_moedas_coletadas

    localStorage.setItem("qtdDistancia", hist_distancia)
    localStorage.setItem("qtdTempoJogado", hist_tempo_jogado)
    localStorage.setItem("qtdPulos", hist_pulos)
    localStorage.setItem("qtdPontos", hist_pontos)
    localStorage.setItem("qtdMods", hist_mod)
    localStorage.setItem("tempoFlutuando", hist_tempo_flutuando)
    localStorage.setItem("qtdMortes", hist_mortes)
    localStorage.setItem("qtdPisoes", hist_pisoes)

    localStorage.setItem("moedas", jogador.moedas)
    localStorage.setItem("moedasGastas", jogador.moedas_gastas)
    localStorage.setItem("moedasColetadas", jogador.moedas_coletadas)

    localStorage.setItem("eventosConcluidos", hist_eventos_concluidos)
    localStorage.setItem("tempoEventos", hist_tempo_eventos)
    localStorage.setItem("qtdEventoCidade", hist_cidade)
    localStorage.setItem("qtdEventoParque", hist_parque)
    localStorage.setItem("qtdEventoAgua", hist_agua)
    localStorage.setItem("qtdEventoLava", hist_lava)

    segura_som = 0
    pontosAtuais = null
    contador_mortes = 0

    alteraValorEstatisticaPartida("reset", 0)
    sincronizaConquistas()
    encerra_modificador()

    // Encerra a função que soma pontos à partida
    if (typeof somador != "undefined")
        clearInterval(somador)

    reseta_pontuacao()

    jogador.partida_causa_morte = ""
    jogador.partida_distancia_viajada = 0
    jogador.partida_tempo_jogado = 0

    jogador.partida_pulos_dados = 0
    jogador.partida_mods_ativados = 0
    jogador.partida_tempo_flutuando = 0
    jogador.partida_pisoes_pontuados = 0
    jogador.partida_moedas_coletadas = 0
    jogador.partida_predios_atropelados = 0

    jogador.partida_tempo_em_eventos = 0
    jogador.partida_eventos_concluidos = 0
    jogador.partida_evento_cidade = 0
    jogador.partida_evento_parque = 0
    jogador.partida_evento_agua = 0
    jogador.partida_evento_lava = 0

    obstaculos.qtdObjetos = 0

    jogo.evento = null
    jogo.inicia_evento = null

    if (jogador.mods_comprados[0] == 1)
        jogo.timer_mod = 10
    else
        jogo.timer_mod = 5

    jogo.qtd_eventos = [8, 8, 8, 8]
    jogo.quantia_pixels_interno = 0
    document.getElementById("completa_timer").style.width = "0px"

    document.getElementById("qtdMods").innerHTML = jogador.qtdMods
    document.getElementById("carregando").style.display = "none"
    document.getElementById("qtdMods").style.display = "block"

    iniciando_evento = null
    chao.muda_chao = [0, 0, 0]

    menu_inicial(1)
    ajusta_cores(4, 2)
    carrega_dados()
    sincronizaModificadoresComprados()
    sincronizaVezesModificadoresComprados()

    $("#temporizador").fadeOut()
    $("#barra_loading").fadeOut()
    $("#puxador_loja").fadeIn()
    $("#filtro2").fadeOut()

    clearInterval(var_timer_mod)
    clearTimeout(tempo_evento)
    clearTimeout(ativa_evento)
}

function apagaDados(valor) {

    // Apagando todos os dados armazenados em cache no navegador

    if (valor) {
        executaSons2("faixa_memes2", "Memes", "Sumiu.ogg", 1)

        localStorage.clear()

        carrega_dados()
        sincronizaQuadroConquistas()
        conquista(24, 0)
    }
}