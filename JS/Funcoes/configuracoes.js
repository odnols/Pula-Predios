function sincronizaBotoesConfigs(valor) {

    sincronizaEfeitosSom()
    sincronizaEstatisticasNerds()
    sincronizaEstatisticaMorte(valor)
    sincronizaNotificacoesConquistas()
    sincronizaCardMusica()
    sincronizaDificuldade()
    sincronizaOciosidade()
    sincronizaTempoOcioso()
    sincronizaQualidadeGrafica()
    sincronizaChuva()
    sincronizaClaroesChuva()
    sincronizaRelogio()
}

function alteraEstadoSom() {

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.estadoSom) {
        jogo.estadoSom = 0

        pausa_canais_som(1)
        pausa_canais_som(2)
        pausa_canais_som(3)

        get_element("status_volume_som").innerHTML = translations["botao.desativado"]

    } else {

        jogo.estadoSom = 1
        get_element("status_volume_som").innerHTML = translations["botao.ativado"]

        if (Math.round(2 * Math.random()) > 1)
            executaSons("faixa_musicas", "musicas", "intro_2.ogg", 1)
        else
            executaSons("faixa_musicas", "musicas", "intro_3.ogg", 1)
    }

    localStorage.setItem("pul4Pr3dios-efeitosSom", jogo.estadoSom)
}

function sincronizaEfeitosSom() {
    if (jogo.estadoSom == 1) {
        get_element("status_volume_som").innerHTML = translations["botao.ativado"]
    } else {
        get_element("status_volume_som").innerHTML = translations["botao.desativado"]
    }
}

function alteraEstadoEstatistica() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (menus.estatistica_morte) {
        menus.estatistica_morte = 0
        get_element("status_tela_estatisti").innerHTML = translations["botao.desativado"]
    } else {
        menus.estatistica_morte = 1
        get_element("status_tela_estatisti").innerHTML = translations["botao.ativado"]
    }

    localStorage.setItem("pul4Pr3dios-estatisticaMorte", menus.estatistica_morte)
}

function sincronizaEstatisticaMorte(estado) {
    if (estado)
        get_element("status_tela_estatisti").innerHTML = translations["botao.ativado"]
    else
        get_element("status_tela_estatisti").innerHTML = translations["botao.desativado"]
}

function alteraRelogio() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (ambiente.tema == 0) {
        // Termina as transições entre dia e noite
        verifica_tema()

        ambiente.tema = 1 // Sempre dia
        get_element("status_tema_atual").innerHTML = translations["botao.sempre_dia"]
        animaLuzesGuia(0)

    } else if (ambiente.tema == 1) {
        // Termina as transições entre dia e noite
        verifica_tema()

        ambiente.tema = 2 // Sempre noite
        get_element("status_tema_atual").innerHTML = translations["botao.sempre_noite"]

        if (ambiente.objeto_voador[3] == 1)
            animaLuzesGuia(1)

    } else if (ambiente.tema == 2) {
        ambiente.tema = 0
        get_element("status_tema_atual").innerHTML = translations["botao.dinamico"]
    }

    sincronizaRelogio()
    localStorage.setItem("pul4Pr3dios-TemaEscolhido", ambiente.tema)
}

function sincronizaRelogio() {

    if (ambiente.tema == 1) { // Sempre Dia
        ambiente.astro[2] = 0
        ambiente.opacidade_noite = 0.0
        ambiente.libera_transitador = 0

        get_element("status_tema_atual").innerHTML = translations["botao.sempre_dia"]

    } else if (ambiente.tema == 2) { // Sempre Noite
        ambiente.astro[2] = 1
        ambiente.opacidade_noite = 1
        ambiente.libera_transitador = 1

        get_element("status_tema_atual").innerHTML = translations["botao.sempre_noite"]

    } else
        get_element("status_tema_atual").innerHTML = translations["botao.dinamico"]
}

function alteraEstatisticasNerds() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (!jogo.estatisticasNerds) {
        jogo.estatisticasNerds = 1
        get_element("status_estatisticas_nerds").innerHTML = translations["botao.ativado"]
    } else {
        jogo.estatisticasNerds = 0
        get_element("status_estatisticas_nerds").innerHTML = translations["botao.desativado"]
    }

    localStorage.setItem("pul4Pr3dios-estatisticasNerds", jogo.estatisticasNerds)
}

function sincronizaEstatisticasNerds() {
    if (!jogo.estatisticasNerds)
        get_element("status_estatisticas_nerds").innerHTML = translations["botao.desativado"]
    else
        get_element("status_estatisticas_nerds").innerHTML = translations["botao.ativado"]
}

function alteraNotificacoesConquistas() {
    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.notificaConquista == 0) {
        jogo.notificaConquista = 1
        get_element("status_conquistas_notifc").innerHTML = translations["botao.ativado"]
    } else {
        jogo.notificaConquista = 0
        get_element("status_conquistas_notifc").innerHTML = translations["botao.desativado"]
        ocultaAvisoConquista()
    }

    localStorage.setItem("pul4Pr3dios-notificaConquistas", jogo.notificaConquista)
}

function sincronizaNotificacoesConquistas() {
    if (jogo.notificaConquista == 0)
        get_element("status_conquistas_notifc").innerHTML = translations["botao.desativado"]
    else
        get_element("status_conquistas_notifc").innerHTML = translations["botao.ativado"]
}

function alteraCardMusica() {
    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    jogo.exibeCardMusica = jogo.exibeCardMusica ? 0 : 1
    localStorage.setItem("pul4Pr3dios-exibeCardMusica", jogo.exibeCardMusica)
    sincronizaCardMusica()

    if (!jogo.exibeCardMusica)
        fecha_card_musica()
}

function sincronizaCardMusica() {
    get_element("status_card_musica").innerHTML = jogo.exibeCardMusica
        ? translations["botao.ativado"]
        : translations["botao.desativado"]
    get_element("duracao_card_musica").value = jogo.duracaoCardMusica
    get_element("valor_duracao_card_musica").textContent = `${jogo.duracaoCardMusica}s`
}

function alteraDuracaoCardMusica(valor) {
    const duracao = Number(valor)
    jogo.duracaoCardMusica = String(valor).trim() !== "" && Number.isFinite(duracao)
        ? Math.max(5, Math.min(15, Math.floor(duracao)))
        : 7

    localStorage.setItem("pul4Pr3dios-duracaoCardMusica", jogo.duracaoCardMusica)
    sincronizaCardMusica()
}

function alteraQualidadeGrafica() {
    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.qualidadeGrafica == 0) {
        jogo.qualidadeGrafica = 1

        get_element("status_animacoes").innerHTML = translations["botao.aprimorada"]
        location.reload()
    } else if (jogo.qualidadeGrafica == 1) {
        jogo.qualidadeGrafica = 2

        get_element("status_animacoes").innerHTML = translations["botao.fantastica"]
        location.reload()
    } else {
        jogo.qualidadeGrafica = 0

        get_element("status_animacoes").innerHTML = translations["botao.minima"]
    }

    localStorage.setItem("pul4Pr3dios-qualidadeGrafica", jogo.qualidadeGrafica)
    sincronizaQualidadeGrafica()
}

function sincronizaQualidadeGrafica() {

    if (jogo.qualidadeGrafica == 0) {
        get_element("status_animacoes").innerHTML = translations["botao.minima"]

        if (jogo.estatisticasNerds)
            jogo.depuracao({ tls: "depuracao.desligando_animacoes" })

        verifica_animacoes(0)

        spriteAdereco_roda.x = 0
        spriteAdereco_fogo.x = 0
        spriteAdereco_bandeira.x = 0
    } else {

        verifica_animacoes(1)

        if (jogo.qualidadeGrafica == 1)
            get_element("status_animacoes").innerHTML = translations["botao.aprimorada"]
        else
            get_element("status_animacoes").innerHTML = translations["botao.fantastica"]

        if (jogo.estatisticasNerds)
            jogo.depuracao({ tls: "depuracao.ligando_animacoes" })

        if (jogo.parallax) {
            get_element("fx_cima")[0].style.display = "Block"
            get_element("status_parallax").innerHTML = translations["botao.ativado"]
        } else {
            get_element("fx_cima")[0].style.display = "None"
            get_element("status_parallax").innerHTML = translations["botao.desativado"]
        }
    }
}

function alteraDificuldade() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.dificuldade == 1) {
        jogo.dificuldade = 2
        get_element("status_dificuldade").innerHTML = translations["botao.dificil"]
    } else if (jogo.dificuldade == 2) {
        jogo.dificuldade = 3

        get_element("status_dificuldade").innerHTML = "Expert"

        get_element("stats_dead").style.backgroundImage = "url('source/images/icons/icone.gif')"
        get_element("stats_dead2").style.backgroundImage = "url('source/images/icons/icone.gif')"
    } else if (jogo.dificuldade == 3) {
        jogo.dificuldade = 0
        get_element("status_dificuldade").innerHTML = translations["botao.facil"]

        get_element("stats_dead").style.backgroundImage = "none"
        get_element("stats_dead2").style.backgroundImage = "none"
    } else if (jogo.dificuldade == 0) {
        jogo.dificuldade = 1
        get_element("status_dificuldade").innerHTML = "Normal"
    }

    sincronizaQtdModificadores()
    localStorage.setItem("pul4Pr3dios-dificuldadeJogo", jogo.dificuldade)
}

function sincronizaDificuldade() {

    if (jogo.dificuldade == 1)        // Normal  = 1
        get_element("status_dificuldade").innerHTML = "Normal"
    else if (jogo.dificuldade == 2)   // Díficil = 2
        get_element("status_dificuldade").innerHTML = translations["botao.dificil"]
    else if (jogo.dificuldade == 3) { // Expert  = 3
        get_element("status_dificuldade").innerHTML = "Expert"

        get_element("stats_dead").style.backgroundImage = "url('source/images/icons/icone.gif')"
        get_element("stats_dead2").style.backgroundImage = "url('source/images/icons/icone.gif')"
    } else if (jogo.dificuldade == 0) // Fácil   = 0
        get_element("status_dificuldade").innerHTML = translations["botao.facil"]

}

function alteraEstadoOcioso() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.estadoOcioso)
        impedeOcioso()

    if (jogo.ociosidade) {
        jogo.ociosidade = 0
        get_element("status_modo_ocioso").innerHTML = translations["botao.desativado"]
    } else {
        jogo.ociosidade = 1
        get_element("status_modo_ocioso").innerHTML = translations["botao.ativado"]
    }

    localStorage.setItem("pul4Pr3dios-ociosidade", jogo.ociosidade)
}

function alteraParallax() {

    executaSons2("faixa_efeitos1", "efeitos", "hat.ogg", 2)

    if (jogo.parallax) {
        get_element("status_parallax").innerHTML = translations["botao.desativado"]

        jogo.parallax = 0
        $(".fx_cima").fadeOut()

    } else {
        get_element("status_parallax").innerHTML = translations["botao.ativado"]

        jogo.parallax = 1
        $(".fx_cima").fadeIn()
    }

    localStorage.setItem("pul4Pr3dios-menu_parallax", jogo.parallax)
}

function sincronizaOciosidade() {

    if (jogo.ociosidade) {
        get_element("status_modo_ocioso").innerHTML = translations["botao.ativado"]
        jogo.depuracao({ tls: "depuracao.ocioso_ativo", color: "green" })
    } else
        get_element("status_modo_ocioso").innerHTML = translations["botao.desativado"]
}

function sincronizaTempoOcioso() {
    get_element("tempo_modo_ocioso").value = jogo.tempoOcioso
    get_element("valor_tempo_modo_ocioso").textContent = `${jogo.tempoOcioso}s`
}

function alteraTempoOcioso(valor) {
    const tempo = Number(valor)
    jogo.tempoOcioso = String(valor).trim() !== "" && Number.isFinite(tempo)
        ? Math.max(5, Math.min(30, Math.floor(tempo)))
        : 10

    localStorage.setItem("pul4Pr3dios-tempoOcioso", jogo.tempoOcioso)
    if (jogo.estadoOcioso)
        impedeOcioso()
    sincronizaTempoOcioso()
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

    localStorage.setItem("pul4Pr3dios-modsComprados", jogador.mods_comprados)

    if (requisicao_auto == 0)
        localStorage.setItem("pul4Pr3dios-modsCompradosUsados", jogador.mods_vezes_usados)

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
        jogo.depuracao({ tls: "modificador.ativo_momento", replace: jogador.mod_em_uso, color: "orange" })
        jogo.depuracao({ tls: "modificador.em_partidas", replace: jogador.mods_vezes_usados, color: "orange" })
    }

    localStorage.setItem("pul4Pr3dios-modEmUso", jogador.mod_em_uso)
    localStorage.setItem("pul4Pr3dios-modsComprados", jogador.mods_comprados)
    localStorage.setItem("pul4Pr3dios-modsCompradosUsados", jogador.mods_vezes_usados)
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

        localStorage.setItem("pul4Pr3dios-bonusComprados", jogador.bonus_comprados)
        localStorage.setItem("pul4Pr3dios-bonusVezesUsados", jogador.bonus_vezes_usados)
    }

    // Icones de bônus adquiridos
    for (let i = 1; i <= 3; i++) {
        const nome = `bonus_${i}`

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