function sincronizaBotoesConfigs(valor) {

    sincronizaEfeitosSom()
    sincronizaEstatisticasNerds()
    sincronizaEstatisticaMorte(valor)
    sincronizaNotificacoesConquistas()
    sincronizaDificuldade()
    sincronizaOciosidade()
    sincronizaQualidadeGrafica()
    sincronizaRelogio()
}

function alteraEstadoSom() {

    let canais_de_audio = ["faixa_musicas", "faixa_ambiente", "faixa_conquistas", "faixa_pisoes", "faixa_memes1", "faixa_memes2", "faixa_efeitos1", "faixa_efeitos2", "faixa_efeitos3"]

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.estadoSom) {
        jogo.estadoSom = 0

        // Pausa todos os sons que possam estar sendo executados no momento
        for (let i = 0; i < canais_de_audio.length; i++) {
            let pausa_som = get_element(canais_de_audio[i])
            pausa_som.pause()
        }

        if (idioma == "pt")
            get_element("status_volume_som").innerHTML = "Desativados"
        else
            get_element("status_volume_som").innerHTML = "Disabled"
    } else {
        jogo.estadoSom = 1

        if (idioma == "pt")
            get_element("status_volume_som").innerHTML = "Ativados"
        else
            get_element("status_volume_som").innerHTML = "Activated"

        if (Math.round(2 * Math.random()) > 1)
            executaSons("faixa_musicas", "Musicas", "intro_2.ogg", 1)
        else
            executaSons("faixa_musicas", "Musicas", "intro_3.ogg", 1)
    }

    localStorage.setItem("efeitosSom", jogo.estadoSom)
}

function sincronizaEfeitosSom() {
    if (jogo.estadoSom == 1)
        if (idioma == "pt")
            get_element("status_volume_som").innerHTML = "Ativados"
        else
            get_element("status_volume_som").innerHTML = "Activated"
    else
        if (idioma == "pt")
            get_element("status_volume_som").innerHTML = "Desativados"
        else
            get_element("status_volume_som").innerHTML = "Disabled"
}

function alteraEstadoEstatistica() {

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (menus.estatistica_morte) {
        menus.estatistica_morte = 0

        if (idioma == "pt")
            get_element("status_tela_estatisti").innerHTML = "Desativado"
        else
            get_element("status_tela_estatisti").innerHTML = "Disabled"
    } else {
        menus.estatistica_morte = 1

        if (idioma == "pt")
            get_element("status_tela_estatisti").innerHTML = "Ativado"
        else
            get_element("status_tela_estatisti").innerHTML = "Activated"
    }

    localStorage.setItem("estatisticaMorte", menus.estatistica_morte)
}

function sincronizaEstatisticaMorte(estado) {
    if (estado)
        if (idioma == "pt")
            get_element("status_tela_estatisti").innerHTML = "Ativado"
        else
            get_element("status_tela_estatisti").innerHTML = "Activated"
    else
        if (idioma == "pt")
            get_element("status_tela_estatisti").innerHTML = "Desativado"
        else
            get_element("status_tela_estatisti").innerHTML = "Disabled"
}

function alteraRelogio() {

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (ambiente.tema == 0) {
        // Termina as transições entre dia e noite
        verifica_tema()

        ambiente.tema = 1 // Sempre dia

        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Sempre Dia"
        else
            get_element("status_tema_atual").innerHTML = "Always Day"

        animaLuzesGuia(0)

    } else if (ambiente.tema == 1) {
        // Termina as transições entre dia e noite
        verifica_tema()

        ambiente.tema = 2 // Sempre noite

        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Sempre Noite"
        else
            get_element("status_tema_atual").innerHTML = "Always night"

        if (ambiente.objeto_voador[3] == 1)
            animaLuzesGuia(1)

    } else if (ambiente.tema == 2) {
        ambiente.tema = 0
        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Dinâmico"
        else
            get_element("status_tema_atual").innerHTML = "Dynamic"
    }

    sincronizaRelogio()
    localStorage.setItem("TemaEscolhido", ambiente.tema)
}

function sincronizaRelogio() {

    if (ambiente.tema == 1) { // Sempre Dia
        ambiente.astro[2] = 0
        ambiente.opacidade_noite = 0.0
        ambiente.libera_transitador = 0

        // Desliga a animação das estrelas
        if (typeof tEst != "undefined")
            clearInterval(tEst)

        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Sempre Dia"
        else
            get_element("status_tema_atual").innerHTML = "Always Day"
    } else if (ambiente.tema == 2) { // Sempre Noite
        ambiente.astro[2] = 1
        ambiente.opacidade_noite = 1
        ambiente.libera_transitador = 1

        if (typeof tEst != "undefined")
            clearInterval(tEst)

        animaEstrelas()

        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Sempre Noite"
        else
            get_element("status_tema_atual").innerHTML = "Always Night"
    } else
        if (idioma == "pt")
            get_element("status_tema_atual").innerHTML = "Dinâmico"
        else
            get_element("status_tema_atual").innerHTML = "Dynamic"
}

function alteraEstatisticasNerds() {

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (!jogo.estatisticasNerds) {
        jogo.estatisticasNerds = 1

        if (idioma == "pt")
            get_element("status_estatisticas_nerds").innerHTML = "Ativado"
        else
            get_element("status_estatisticas_nerds").innerHTML = "Activated"
    } else {
        jogo.estatisticasNerds = 0

        if (idioma == "pt")
            get_element("status_estatisticas_nerds").innerHTML = "Desativado"
        else
            get_element("status_estatisticas_nerds").innerHTML = "Disabled"
    }

    localStorage.setItem("estatisticasNerds", jogo.estatisticasNerds)
}

function sincronizaEstatisticasNerds() {
    if (!jogo.estatisticasNerds)
        if (idioma == "pt")
            get_element("status_estatisticas_nerds").innerHTML = "Desativado"
        else
            get_element("status_estatisticas_nerds").innerHTML = "Disabled"
    else
        if (idioma == "pt")
            get_element("status_estatisticas_nerds").innerHTML = "Ativado"
        else
            get_element("status_estatisticas_nerds").innerHTML = "Activated"
}

function alteraNotificacoesConquistas() {
    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.notificaConquista == 0) {
        jogo.notificaConquista = 1

        if (idioma == "pt")
            get_element("status_conquistas_notifc").innerHTML = "Ativado"
        else
            get_element("status_conquistas_notifc").innerHTML = "Activated"
    } else {
        jogo.notificaConquista = 0

        if (idioma == "pt")
            get_element("status_conquistas_notifc").innerHTML = "Desativado"
        else
            get_element("status_conquistas_notifc").innerHTML = "Disabled"
    }

    localStorage.setItem("notificaConquistas", jogo.notificaConquista)
}

function sincronizaNotificacoesConquistas() {
    if (jogo.notificaConquista == 0)
        if (idioma == "pt")
            get_element("status_conquistas_notifc").innerHTML = "Desativado"
        else
            get_element("status_conquistas_notifc").innerHTML = "Disabled"
    else
        if (idioma == "pt")
            get_element("status_conquistas_notifc").innerHTML = "Ativado"
        else
            get_element("status_conquistas_notifc").innerHTML = "Activated"
}

function alteraQualidadeGrafica() {
    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.qualidadeGrafica == 0) {
        jogo.qualidadeGrafica = 1

        if (idioma == "pt")
            get_element("status_animacoes").innerHTML = "Aprimoradas"
        else
            get_element("status_animacoes").innerHTML = "Enhanced"

        location.reload()
    } else if (jogo.qualidadeGrafica == 1) {
        jogo.qualidadeGrafica = 2

        if (idioma == "pt")
            get_element("status_animacoes").innerHTML = "Fantásticas"
        else
            get_element("status_animacoes").innerHTML = "Fantastic"

        location.reload()
    } else {
        jogo.qualidadeGrafica = 0

        if (idioma == "pt")
            get_element("status_animacoes").innerHTML = "Mínimas"
        else
            get_element("status_animacoes").innerHTML = "Minimum"
    }

    localStorage.setItem("qualidadeGrafica", jogo.qualidadeGrafica)
    sincronizaQualidadeGrafica()
}

function sincronizaQualidadeGrafica() {
    if (jogo.qualidadeGrafica == 0) {
        if (idioma == "pt")
            get_element("status_animacoes").innerHTML = "Mínimas"
        else
            get_element("status_animacoes").innerHTML = "Minimum"

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("Desligando animações")
            else
                console.log("Turning off animations")

        verifica_animacoes(0)

        spriteAdereco_roda.x = 0
        spriteAdereco_fogo.x = 0
        spriteAdereco_bandeira.x = 0
    } else {

        verifica_animacoes(1)

        if (jogo.qualidadeGrafica == 1)
            if (idioma == "pt")
                get_element("status_animacoes").innerHTML = "Aprimoradas"
            else
                get_element("status_animacoes").innerHTML = "Enhanced"
        else
            if (idioma == "pt")
                get_element("status_animacoes").innerHTML = "Fantásticas"
            else
                get_element("status_animacoes").innerHTML = "Fantastic"

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("Ligando animações")
            else
                console.log("Starting animations")
    }
}

function alteraDificuldade() {

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.dificuldade == 1) {
        jogo.dificuldade = 2

        if (idioma == "pt")
            get_element("status_dificuldade").innerHTML = "Díficil"
        else
            get_element("status_dificuldade").innerHTML = "Hard"
    } else if (jogo.dificuldade == 2) {
        jogo.dificuldade = 3

        get_element("status_dificuldade").innerHTML = "Expert"

        get_element("stats_dead").style.backgroundImage = "url('source/images/icons/Icone.gif')"
        get_element("stats_dead2").style.backgroundImage = "url('source/images/icons/Icone.gif')"
    } else if (jogo.dificuldade == 3) {
        jogo.dificuldade = 0

        if (idioma == "pt")
            get_element("status_dificuldade").innerHTML = "Fácil"
        else
            get_element("status_dificuldade").innerHTML = "Easy"

        get_element("stats_dead").style.backgroundImage = "none"
        get_element("stats_dead2").style.backgroundImage = "none"
    } else if (jogo.dificuldade == 0) {
        jogo.dificuldade = 1
        get_element("status_dificuldade").innerHTML = "Normal"
    }

    sincronizaQtdModificadores()
    localStorage.setItem("dificuldadeJogo", jogo.dificuldade)
}

function sincronizaDificuldade() {

    if (jogo.dificuldade == 1) {       // Normal  = 1
        get_element("status_dificuldade").innerHTML = "Normal"
    } else if (jogo.dificuldade == 2) { // Díficil = 2
        if (idioma == "pt")
            get_element("status_dificuldade").innerHTML = "Díficil"
        else
            get_element("status_dificuldade").innerHTML = "Hard"
    } else if (jogo.dificuldade == 3) { // Expert  = 3

        get_element("status_dificuldade").innerHTML = "Expert"

        get_element("stats_dead").style.backgroundImage = "url('source/images/icons/Icone.gif')"
        get_element("stats_dead2").style.backgroundImage = "url('source/images/icons/Icone.gif')"
    } else if (jogo.dificuldade == 0) { // Fácil   = 0
        if (idioma == "pt")
            get_element("status_dificuldade").innerHTML = "Fácil"
        else
            get_element("status_dificuldade").innerHTML = "Easy"
    }
}

function alteraEstadoOcioso() {

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.ociosidade) {
        jogo.ociosidade = 0

        if (idioma == "pt")
            get_element("status_modo_ocioso").innerHTML = "Desativado"
        else
            get_element("status_modo_ocioso").innerHTML = "Disabled"
    } else {
        jogo.ociosidade = 1

        if (idioma == "pt")
            get_element("status_modo_ocioso").innerHTML = "Ativado"
        else
            get_element("status_modo_ocioso").innerHTML = "Activated"
    }

    localStorage.setItem("ociosidade", jogo.ociosidade)
}

function sincronizaOciosidade() {

    if (jogo.ociosidade) {
        if (idioma == "pt")
            get_element("status_modo_ocioso").innerHTML = "Ativado"
        else
            get_element("status_modo_ocioso").innerHTML = "Activated"

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("%cA Ociosidade está ativa", "color: green")
            else
                console.log("%cIdleness is active", "color: green")
    } else
        if (idioma == "pt")
            get_element("status_modo_ocioso").innerHTML = "Desativado"
        else
            get_element("status_modo_ocioso").innerHTML = "Disabled"
}

function sincronizaModificadoresComprados(requisicao_auto) {

    // Modificadores ativos ( + Tempo )
    if (jogador.mods_comprados[0] == 1) {
        get_element("mod_1").style.display = "block"

        jogador.tempoMod = 10
    } else {
        get_element("mod_1").style.display = "none"
        jogador.tempoMod = 5
        jogador.timer_mod = 5
        jogador.mods_comprados[0] = 0
    }

    // Quantidade de Modificadores ativos por partida ( + Vezes )
    if (jogador.mods_comprados[1] == 1)
        get_element("mod_2").style.display = "block"
    else
        get_element("mod_2").style.display = "none"

    // Modificador: Flutua
    if (jogador.mod_em_uso == 0)
        get_element("mod_0").style.display = "block"
    else
        get_element("mod_0").style.display = "none"

    // Modificador: De Aço
    if (jogador.mod_em_uso == 1)
        get_element("mod_3").style.display = "block"
    else
        get_element("mod_3").style.display = "none"

    // Modificador: Lunar
    if (jogador.mod_em_uso == 100)
        get_element("mod_4").style.display = "block"
    else
        get_element("mod_4").style.display = "none"

    localStorage.setItem("modsComprados", jogador.mods_comprados)

    if (requisicao_auto == 0)
        localStorage.setItem("modsCompradosUsados", jogador.mods_vezes_usados)

    sincronizaQtdModificadores()
}

function sincronizaQtdModificadores() {

    if (jogador.mods_comprados[1] == 0) {
        if (jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdMods = 5
        else if (jogo.dificuldade == 2) // Díficil
            jogador.qtdMods = 4
        else                           // Expert
            jogador.qtdMods = 3
    } else {
        if (jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdMods = 10
        else if (jogo.dificuldade == 2) // Díficil
            jogador.qtdMods = 8
        else                           // Expert
            jogador.qtdMods = 6
    }

    if (jogador.mods_comprados[0] == 1)
        jogador.timer_mod = 10

    get_element("qtdMods").innerHTML = jogador.qtdMods
    get_element("timer_mod").innerHTML = jogador.timer_mod
}

function sincronizaVezesModificadoresComprados() {

    for (let i = 0; i < 2; i++) {
        if (jogador.mods_vezes_usados[i] > 0)
            jogador.mods_vezes_usados[i]--

        if (jogador.mods_vezes_usados[i] == 0)
            jogador.mods_comprados[i] = 0
    }

    // Subtrai a qtd de usos caso o modificador esteja ativo
    if (jogador.mods_vezes_usados[2] > 0 && jogador.mod_em_uso == 1) {
        jogador.mods_comprados[2] = 1
        jogador.mods_vezes_usados[2]--
    }

    if (jogador.mods_vezes_usados[3] > 0 && jogador.mod_em_uso == 100) {
        jogador.mods_comprados[3] = 1
        jogador.mods_vezes_usados[3]--
    }

    // Esgota o uso dos modificadores principais comprados
    if (jogador.mods_vezes_usados[2] == 0 && jogador.mod_em_uso == 1) {
        jogador.mods_comprados[2] = 0
        jogador.mod_em_uso = 0
    }

    if (jogador.mods_vezes_usados[3] == 0 && jogador.mod_em_uso == 100) {
        jogador.mods_comprados[3] = 0
        jogador.mod_em_uso = 0
    }

    if (jogador.mods_vezes_usados[0] == 0 || jogador.mods_vezes_usados[1] == 0 || jogador.mods_vezes_usados[2] == 0)
        sincronizaModificadoresComprados(0)

    if (jogo.estatisticasNerds) {
        if (idioma == "pt") {
            console.log("%cModificador Principal ativo no momento: " + jogador.mod_em_uso, "color: orange")
            console.log("%cModificadores em partidas: " + jogador.mods_vezes_usados, "color: orange")
        } else {
            console.log("%cCurrently active Main Modifier: " + jogador.mod_em_uso, "color: orange")
            console.log("%cModifiers in rounds: " + jogador.mods_vezes_usados, "color: orange")
        }
    }

    localStorage.setItem("modEmUso", jogador.mod_em_uso)
    localStorage.setItem("modsComprados", jogador.mods_comprados)
    localStorage.setItem("modsCompradosUsados", jogador.mods_vezes_usados)
}

function sincroniza_bonus(requisicao_auto) {

    if (requisicao_auto != 1) {
        for (let i = 0; i < 3; i++) {
            if (jogador.bonus_vezes_usados[i] == 0)
                jogador.bonus_comprados[i] = 0
            else
                jogador.bonus_vezes_usados[i]--
        }

        if (jogador.bonus_vezes_usados[0] == 0)
            jogador.bonus_comprados[0] = 0

        if (jogador.bonus_vezes_usados[1] == 0)
            jogador.bonus_comprados[1] = 0

        if (jogador.bonus_vezes_usados[2] == 0)
            jogador.bonus_comprados[2] = 0

        localStorage.setItem("bonusComprados", jogador.bonus_comprados)
        localStorage.setItem("bonusVezesUsados", jogador.bonus_vezes_usados)
    }

    // Icones de bônus adquiridos
    for (let i = 1; i <= 3; i++) {
        nome = `bonus_${i}`

        if (jogador.bonus_comprados[i - 1] == 1)
            get_element(nome).style.display = "block"
        else
            get_element(nome).style.display = "none"
    }

    bonus_modificadores()
}

function bonus_modificadores() {

    if (jogador.bonus_comprados[2] == 1)
        jogador.qtdPulos = 5
    else
        jogador.qtdPulos = 3
}