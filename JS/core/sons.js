// Escolhe o som que irá tocar ao iniciar, morrer e pegar moedas
let temporizador_card_musica

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

function executaSons(elemento, localizacao, nomeSom, tipo) {
    if (jogo.estadoSom != 0) { // Verifica se a reprodução de sons não está desativada

        let volume_interno = localStorage.getItem("pul4Pr3dios-volMusica")

        if (tipo == 2)  // Efeitos
            volume_interno = localStorage.getItem("pul4Pr3dios-volEfeito")
        else if (tipo == 3) // Memes
            volume_interno = localStorage.getItem("pul4Pr3dios-volMemes")

        let audio = get_element(elemento)
        configura_proxima_musica(audio, elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        audio.play()
        if (elemento == "faixa_musicas")
            exibe_card_musica(nomeSom)
    }
}

function executaSons2(elemento, localizacao, nomeSom, tipo) {
    if (jogo.estadoSom != 0) { // Verifica se a reprodução de sons não está desativada

        let volume_interno = localStorage.getItem("pul4Pr3dios-volMusica")

        if (tipo == 2)  // Efeitos
            volume_interno = localStorage.getItem("pul4Pr3dios-volEfeito")
        else if (tipo == 3) // Memes
            volume_interno = localStorage.getItem("pul4Pr3dios-volMemes")

        let audio = get_element(elemento)
        configura_proxima_musica(audio, elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        audio.play()
        if (elemento == "faixa_musicas")
            exibe_card_musica(nomeSom)
    }
}

function exibe_card_musica(nomeSom) {
    const preset = presets_musicas[nomeSom]
    if (!preset || !jogo.exibeCardMusica) {
        fecha_card_musica()
        return
    }

    const card = document.getElementById("card_musica")
    get_element("nome_musica_atual").textContent = preset.nome
    get_element("artista_musica_atual").textContent = preset.artista

    clearTimeout(temporizador_card_musica)
    card.classList.add("visivel")
    card.setAttribute("aria-hidden", "false")

    temporizador_card_musica = setTimeout(fecha_card_musica, jogo.duracaoCardMusica * 1000)
}

function fecha_card_musica() {
    clearTimeout(temporizador_card_musica)
    const card = document.getElementById("card_musica")
    card.classList.remove("visivel")
    card.setAttribute("aria-hidden", "true")
}

function configura_proxima_musica(audio, elemento) {
    if (elemento != "faixa_musicas") return

    audio.onended = function () {
        const arquivo_atual = (audio.currentSrc || audio.src).split("/").pop()
        const faixa_atual = arquivo_atual.match(/^(main_[1-4]|ocioso_[1-3])\.ogg$/i)
        if (!faixa_atual || !jogo.estadoSom) return

        let faixas
        if (jogo.status == estados.jogando && faixa_atual[1].startsWith("main_"))
            faixas = ["main_1.ogg", "main_2.ogg", "main_3.ogg", "main_4.ogg"]
        else if (jogo.status == estados.ocioso && faixa_atual[1].startsWith("ocioso_"))
            faixas = ["ocioso_1.ogg", "ocioso_2.ogg", "ocioso_3.ogg"]
        else
            return

        const opcoes_proxima = faixas.filter(faixa => faixa != arquivo_atual)
        const proxima = opcoes_proxima[Math.floor(Math.random() * opcoes_proxima.length)]
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

        let audio2 = get_element("faixa_efeitos2")
        audio2.volume = volume / 100

        let audio3 = get_element("faixa_efeitos3")
        audio3.volume = volume / 100

        let ambiente = get_element("faixa_ambiente")
        ambiente.volume = volume / 100

        let pisoes = get_element("faixa_pisoes")
        pisoes.volume = volume / 100

        if (auto != null)
            executaSons("faixa_efeitos1", "efeitos", "pop.ogg", 2)
    } else if (entidade == 3) { // Memes
        audio = get_element("faixa_memes1")
        localStorage.setItem("pul4Pr3dios-volMemes", volume)
        sincroniza_controles_volume(volume, "volume_memes")

        let audio2 = get_element("faixa_memes2")
        audio2.volume = volume / 100

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
    if (!Number.isFinite(valor)) {
        console.warn("Valor de volume salvo inválido; será usado o volume padrão de 50%.")
        volume = 50
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

    if (jogador.partida_pontuacao >= 0) {
        if (causa == 1)
            nome = "morte_agua.ogg"
        else if (causa == 3)
            nome = "morte_lava.ogg"
        else {
            nome = escolhe_som(2, 0)

            if (nome == "morreu_8.ogg")
                nome = "morreu_7.ogg"

            if (nome == "morreu_13.ogg")
                nome = "morreu_12.ogg"

        }
    } else
        nome = "morreu_8.ogg"

    if (jogador.partida_pontuacao >= 300)
        nome = "morreu_13.ogg"

    executaSons("faixa_memes1", "final", nome, 3) // Usado para o Som de meme ao morrer
}

function executaSomCarrega() {

    let lista_entradas = ["bambam3", "daciolo", "jailson_3", "jailson_4", "parque2"]
    i = Math.round((lista_entradas.length - 1) * Math.random())

    executaSons("faixa_memes1", "memes", `${lista_entradas[i]}.ogg`, 3)
}