// Escolhe o som que irá tocar ao iniciar, morrer e pegar moedas
let temporizador_card_musica
let animacao_progresso_card_musica
let atualizacao_card_musica
let audio_card_musica

function get_volume_som(tipo) {
    const chave = tipo == 2
        ? "pul4Pr3dios-volEfeito"
        : tipo == 3
            ? "pul4Pr3dios-volMemes"
            : "pul4Pr3dios-volMusica"
    const volume_padrao = tipo == 1 ? 30 : 50
    const volume_salvo = localStorage.getItem(chave)
    const volume = volume_salvo == null ? volume_padrao : Number(volume_salvo)
    return Number.isFinite(volume) ? Math.max(0, Math.min(100, volume)) : volume_padrao
}

function pausa_canais_som(tipo) {
    const canais = tipo == 1
        ? ["faixa_musicas"]
        : tipo == 2
            ? ["faixa_ambiente", "faixa_pisoes", "faixa_efeitos1", "faixa_efeitos2", "faixa_efeitos3", "faixa_conquistas"]
            : ["faixa_memes1", "faixa_memes2", "faixa_memes3"]

    for (const canal of canais)
        get_element(canal).pause()

    if (tipo == 1)
        fecha_card_musica()
}

function carrega_configuracoes_som() {
    const preferencias = [
        ["pul4Pr3dios-volMusica", 1, 30],
        ["pul4Pr3dios-volEfeito", 2, 50],
        ["pul4Pr3dios-volMemes", 3, 50]
    ]

    for (const [chave, entidade, volume_padrao] of preferencias) {
        const volume = localStorage.getItem(chave)
        if (volume == null)
            localStorage.setItem(chave, volume_padrao)
        carrega_volume(volume == null ? volume_padrao : volume, entidade)
    }

    const somAtivo = localStorage.getItem("pul4Pr3dios-efeitosSom")
    jogo.estadoSom = somAtivo == null ? 1 : parseInt(somAtivo)

    if (!jogo.estadoSom) {
        pausa_canais_som(1)
        pausa_canais_som(2)
        pausa_canais_som(3)
    }

    const musicaTema = localStorage.getItem("pul4Pr3dios-temaMusica")
    jogo.musica_tema = musicaTema ? `${musicaTema}.ogg` : "random"
    get_element("seleciona_tema").value = jogo.musica_tema.replace(".ogg", "")

    const musicaTemaOcioso = localStorage.getItem("pul4Pr3dios-temaOcioso")
    jogo.musica_tema_ocioso = musicaTemaOcioso ? `${musicaTemaOcioso}.ogg` : "random"
    get_element("seleciona_ocioso").value = jogo.musica_tema_ocioso.replace(".ogg", "")

    const exibeCardMusica = localStorage.getItem("pul4Pr3dios-exibeCardMusica")
    jogo.exibeCardMusica = exibeCardMusica == null ? 1 : parseInt(exibeCardMusica)

    const duracaoCardMusicaSalva = localStorage.getItem("pul4Pr3dios-duracaoCardMusica")
    const duracaoCardMusica = Number(duracaoCardMusicaSalva)
    jogo.duracaoCardMusica = duracaoCardMusicaSalva != null && Number.isFinite(duracaoCardMusica)
        ? Math.max(5, Math.min(15, Math.floor(duracaoCardMusica)))
        : 7
    const modoCardMusicaOcioso = localStorage.getItem("pul4Pr3dios-modoCardMusicaOcioso")
    jogo.modoCardMusicaOcioso = ["esvanecido", "temporizado"].includes(modoCardMusicaOcioso)
        ? modoCardMusicaOcioso
        : "esvanecido"
    get_element("duracao_card_musica").value = jogo.duracaoCardMusica
    get_element("valor_duracao_card_musica").textContent = `${jogo.duracaoCardMusica}s`

    if (translations["botao.ativado"] && typeof sincronizaEfeitosSom === "function")
        sincronizaEfeitosSom()
    if (translations["botao.ativado"] && typeof sincronizaCardMusica === "function")
        sincronizaCardMusica()
}

function escolhe_som(ocasiao, evento) {

    if (ocasiao == 1) // Inicio
        escolha = 1 + Math.round(7 * Math.random())
    else // Fim
        escolha = 1 + Math.round(13 * Math.random())

    if (ocasiao == 1)      // Começa
        nome = `comeca_${escolha}.ogg`
    else if (ocasiao == 2) // Perca
        if (evento != 1)
            nome = `morreu_${escolha}.ogg`
        else
            nome = "morreu_6.ogg"

    return nome
}

function reproduz_audio(audio) {
    const tentativa = audio.play()

    if (tentativa && typeof tentativa.catch === "function") {
        tentativa.catch(erro => {
            if (erro.name !== "NotAllowedError" && erro.name !== "AbortError")
                console.error("Falha ao reproduzir áudio.", erro)
        })
    }
}

function executaSons(elemento, localizacao, nomeSom, tipo) {
    const volume_interno = get_volume_som(tipo)
    if (jogo.estadoSom != 0 && volume_interno > 0) {

        let audio = get_element(elemento)
        configura_proxima_musica(audio, elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        reproduz_audio(audio)
        if (elemento == "faixa_musicas")
            exibe_card_musica(nomeSom)
    }
}

const sons_entrada_eventos = {
    cidade: ["entrada_cidade_1.ogg", "entrada_cidade_2.ogg"],
    agua: ["entrada_agua_1.ogg", "entrada_agua_2.ogg", "entrada_agua_3.ogg"],
    lava: ["entrada_lava_1.ogg", "entrada_lava_2.ogg"],
    parque: ["entrada_parque_1.ogg"]
}

function toca_som_entrada_evento(evento) {
    const sons = sons_entrada_eventos[evento]
    if (!sons || !sons.length) return

    executaSons("faixa_efeitos3", "eventos", sons[Math.floor(Math.random() * sons.length)], 3)
}

function executaSons2(elemento, localizacao, nomeSom, tipo) {
    const volume_interno = get_volume_som(tipo)
    if (jogo.estadoSom != 0 && volume_interno > 0) {

        let audio = get_element(elemento)
        configura_proxima_musica(audio, elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        reproduz_audio(audio)
        if (elemento == "faixa_musicas")
            exibe_card_musica(nomeSom)
    }
}

function exibe_card_musica(nomeSom) {
    const preset = presets_musicas[nomeSom]
    if (!preset || !jogo.exibeCardMusica || get_volume_som(1) == 0) {
        fecha_card_musica()
        return
    }

    const card = document.getElementById("card_musica")
    get_element("nome_musica_atual").textContent = preset.nome
    get_element("artista_musica_atual").textContent = preset.artista

    fecha_card_musica()
    card.classList.remove("modo_ocioso", "esvanecido", "temporizado", "esmaecido")
    if (animacao_progresso_card_musica)
        animacao_progresso_card_musica.cancel()

    if (jogo.status == estados.ocioso) {
        const audio = get_element("faixa_musicas")
        card.classList.add("modo_ocioso", jogo.modoCardMusicaOcioso)

        atualizacao_card_musica = () => {
            if (jogo.status != estados.ocioso || audio !== audio_card_musica) {
                fecha_card_musica()
                return
            }

            const modo = jogo.modoCardMusicaOcioso
            card.classList.toggle("esvanecido", modo == "esvanecido")
            card.classList.toggle("temporizado", modo == "temporizado")
            card.classList.toggle("esmaecido", modo == "esvanecido" && audio.currentTime >= 5)

            const fim_proximo = Number.isFinite(audio.duration) && audio.currentTime >= audio.duration - 5
            const tempo_esgotado = modo == "temporizado" && audio.currentTime >= jogo.duracaoCardMusica

            if (fim_proximo || tempo_esgotado)
                fecha_card_musica()
        }
        audio_card_musica = audio
        audio.addEventListener("timeupdate", atualizacao_card_musica)

        if (jogo.modoCardMusicaOcioso == "temporizado") {
            animacao_progresso_card_musica = get_element("progresso_card_musica").animate(
                [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
                { duration: jogo.duracaoCardMusica * 1000, easing: "linear", fill: "forwards" }
            )
        }

        card.classList.add("visivel")
        card.setAttribute("aria-hidden", "false")
        return
    }

    const duracao = jogo.duracaoCardMusica * 1000
    const progresso = get_element("progresso_card_musica")
    animacao_progresso_card_musica = progresso.animate(
        [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
        { duration: duracao, easing: "linear", fill: "forwards" }
    )

    card.classList.add("visivel")
    card.setAttribute("aria-hidden", "false")

    temporizador_card_musica = setTimeout(fecha_card_musica, duracao)
}

function fecha_card_musica() {
    clearTimeout(temporizador_card_musica)
    if (audio_card_musica && atualizacao_card_musica)
        audio_card_musica.removeEventListener("timeupdate", atualizacao_card_musica)
    audio_card_musica = null
    atualizacao_card_musica = null

    if (animacao_progresso_card_musica) {
        animacao_progresso_card_musica.cancel()
        animacao_progresso_card_musica = null
    }

    const card = document.getElementById("card_musica")
    card.classList.remove("visivel")
    card.setAttribute("aria-hidden", "true")
}

function configura_proxima_musica(audio, elemento) {
    if (elemento != "faixa_musicas") return

    audio.onended = function () {
        const arquivo_atual = (audio.currentSrc || audio.src).split("/").pop()
        const faixa_atual = arquivo_atual.match(/^(main_\d+|ocioso_\d+)\.ogg$/i)
        if (!faixa_atual || !jogo.estadoSom) return

        let tipo_musica
        if (jogo.status == estados.jogando && faixa_atual[1].startsWith("main_"))
            tipo_musica = "main"
        else if (jogo.status == estados.ocioso && faixa_atual[1].startsWith("ocioso_"))
            tipo_musica = "ocioso"
        else
            return

        const proxima = escolhe_musica_aleatoria(tipo_musica, arquivo_atual)
        if (!proxima) return
        executaSons2("faixa_musicas", "musicas", proxima, 1)
    }
}

// Altera o Volume dos Sons e Salva no Sistema
function alteraVolume(volume, entidade, auto) {

    if (jogo.estadoOcioso)
        impedeOcioso()

    volume = Math.max(0, Math.min(100, Number(volume)))

    let audio

    if (entidade == 1) {       // Músicas
        audio = get_element("faixa_musicas")
        localStorage.setItem("pul4Pr3dios-volMusica", volume)
        sincroniza_controles_volume(volume, "volume_musica")

        if (volume == 0)
            pausa_canais_som(1)

        if (auto != null)
            // Verifica se há músicas sendo encerradas
            verificaDesligamentos()

        if (auto != null) {
            if (Math.round(2 * Math.random()) > 1)
                executaSons("faixa_musicas", "musicas", "intro_2.ogg", 1)
            else
                executaSons("faixa_musicas", "musicas", "intro_3.ogg", 1)
        }
    } else if (entidade == 2) { // Efeitos
        audio = get_element("faixa_efeitos1")
        localStorage.setItem("pul4Pr3dios-volEfeito", volume)
        sincroniza_controles_volume(volume, "volume_efeitos")

        if (volume == 0)
            pausa_canais_som(2)

        let audio2 = get_element("faixa_efeitos2")
        audio2.volume = volume / 100

        let audio3 = get_element("faixa_efeitos3")
        audio3.volume = volume / 100

        let ambiente = get_element("faixa_ambiente")
        ambiente.volume = volume / 100

        let pisoes = get_element("faixa_pisoes")
        pisoes.volume = volume / 100

        let conquistas = get_element("faixa_conquistas")
        conquistas.volume = volume / 100

        if (auto != null)
            executaSons("faixa_efeitos1", "efeitos", "pop.ogg", 2)
    } else if (entidade == 3) { // Memes
        audio = get_element("faixa_memes1")
        localStorage.setItem("pul4Pr3dios-volMemes", volume)
        sincroniza_controles_volume(volume, "volume_memes")

        if (volume == 0)
            pausa_canais_som(3)

        let audio2 = get_element("faixa_memes2")
        audio2.volume = volume / 100

        let audio3 = get_element("faixa_memes3")
        audio3.volume = volume / 100

        if (auto != null) {

            if (Math.round(2 * Math.random()) > 1)
                executaSons("faixa_memes1", "memes", "jailson_1.ogg", 3)
            else
                executaSons("faixa_memes1", "memes", "jailson_2.ogg", 3)
        }
    }

    audio.volume = volume / 100
}

function sincroniza_controles_volume(volume, id) {
    const entidade = { volume_musica: 1, volume_efeitos: 2, volume_memes: 3 }[id]
    document.querySelectorAll(`[data-volume-entity="${entidade}"]`).forEach(controle => {
        controle.value = volume
        atualiza_valor_volume(controle)
    })
}

function atualiza_valor_volume(controle) {
    controle.parentElement.querySelector(".valor_volume").textContent = `${controle.value}%`
}

// Executada automaticamente quando a página carrega, ela ajusta o volume para o valor salvo
function carrega_volume(volume, entidade) {
    const valor = Number(volume)
    const volume_padrao = entidade == 1 ? 30 : 50
    if (!Number.isFinite(valor)) {
        console.warn(`Valor de volume salvo inválido; será usado o volume padrão de ${volume_padrao}%.`)
        volume = volume_padrao
    } else {
        volume = Math.max(0, Math.min(100, valor))
    }

    alteraVolume(volume, entidade)
}

function desliga_som(entidade, tipo) {

    let volume_interno

    if (tipo == 1)      // Músicas
        volume_interno = localStorage.getItem("pul4Pr3dios-volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("pul4Pr3dios-volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("pul4Pr3dios-volMemes")

    let pausa_som = get_element(entidade)
    let salva_volume = volume_interno

    if (entidade == "faixa_musicas")
        fecha_card_musica()

    regulador_som = setInterval(() => {
        if (volume_interno > 0.1) {

            volume_interno -= 3

            if (volume_interno > 0)
                pausa_som.volume = volume_interno / 100
        } else {
            volume_interno = 0
            clearInterval(regulador_som)
            pausa_som.pause()
            pausa_som.volume = salva_volume / 100

            if (entidade == "ambiente") {
                clearTimeout(vento_delay)
                ambiente.segura_vento = 0
            }
        }
    }, 100)
}

function desliga_som2(entidade, tipo) {
    let volume_interno

    if (tipo == 1)      // Músicas
        volume_interno = localStorage.getItem("pul4Pr3dios-volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("pul4Pr3dios-volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("pul4Pr3dios-volMemes")

    let pausa_som = get_element(entidade)
    let salva_volume = volume_interno

    if (entidade == "faixa_musicas")
        fecha_card_musica()

    regulador_som2 = setInterval(() => {
        if (volume_interno > 0.1) {

            volume_interno -= 3

            if (volume_interno > 0)
                pausa_som.volume = volume_interno / 100
        } else {
            volume_interno = 0
            clearInterval(regulador_som2)
            pausa_som.pause()
            pausa_som.volume = salva_volume / 100

            if (entidade == "ambiente") {
                clearTimeout(vento_delay)
                ambiente.segura_vento = 0
            }
        }
    }, 100)
}

function desliga_som3(entidade, tipo) {
    let volume_interno

    if (tipo == 1)      // Músicas
        volume_interno = localStorage.getItem("pul4Pr3dios-volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("pul4Pr3dios-volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("pul4Pr3dios-volMemes")

    let pausa_som = get_element(entidade)
    let salva_volume = volume_interno

    if (entidade == "faixa_musicas")
        fecha_card_musica()

    regulador_som3 = setInterval(() => {
        if (volume_interno > 0.1) {

            volume_interno -= 3

            if (volume_interno > 0)
                pausa_som.volume = volume_interno / 100
        } else {
            volume_interno = 0
            clearInterval(regulador_som3)
            pausa_som.pause()
            pausa_som.volume = salva_volume / 100

            if (entidade == "ambiente") {
                clearTimeout(vento_delay)
                ambiente.segura_vento = 0
            }
        }
    }, 100)
}

function verificaDesligamentos() {
    // Verifica se as funçções de desligar o som estão ativas no momento
    if (typeof regulador_som != "undefined")
        clearInterval(regulador_som)

    if (typeof regulador_som2 != "undefined")
        clearInterval(regulador_som2)

    if (typeof regulador_som3 != "undefined")
        clearInterval(regulador_som3)
}

function executaSomPerca(causa) {

    if (causa == 1)
        nome = "morte_agua.ogg"
    else if (causa == 3)
        nome = "morte_lava.ogg"
    else if (jogador.partida_pontuacao >= 0) {
        nome = escolhe_som(2, 0)

        if (nome == "morreu_8.ogg")
            nome = "morreu_7.ogg"

        if (nome == "morreu_13.ogg")
            nome = "morreu_12.ogg"

    } else
        nome = "morreu_8.ogg"

    if (causa != 1 && causa != 3 && jogador.partida_pontuacao >= 300)
        nome = "morreu_13.ogg"

    executaSons("faixa_memes1", "final", nome, 3) // Usado para o Som de meme ao morrer
}
