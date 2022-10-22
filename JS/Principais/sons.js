// Escolhe o som que irá tocar ao iniciar, morrer e pegar moedas
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

        let volume_interno = localStorage.getItem("volMusica")

        if (tipo == 2)  // Efeitos
            volume_interno = localStorage.getItem("volEfeito")
        else if (tipo == 3) // Memes
            volume_interno = localStorage.getItem("volMemes")

        let audio = document.getElementById(elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        audio.play()
    }
}

function executaSons2(elemento, localizacao, nomeSom, tipo) {
    if (jogo.estadoSom != 0) { // Verifica se a reprodução de sons não está desativada

        let volume_interno = localStorage.getItem("volMusica")

        if (tipo == 2)  // Efeitos
            volume_interno = localStorage.getItem("volEfeito")
        else if (tipo == 3) // Memes
            volume_interno = localStorage.getItem("volMemes")

        let audio = document.getElementById(elemento)
        audio.volume = volume_interno / 100

        audio.src = `source/songs/${localizacao}/${nomeSom}`
        audio.play()
    }
}

// Altera o Volume dos Sons e Salva no Sistema
function alteraVolume(volume, entidade, auto) {

    if (jogo.estadoOcioso)
        impedeOcioso()

    let audio

    if (entidade == 1) {       // Músicas
        audio = document.getElementById("faixa_musicas")
        localStorage.setItem("volMusica", volume)

        if (auto != null)
            // Verifica se há músicas sendo encerradas
            verificaDesligamentos()

        if (auto != null) {
            if (Math.round(2 * Math.random()) > 1)
                executaSons("faixa_musicas", "Musicas", "intro_2.ogg", 1)
            else
                executaSons("faixa_musicas", "Musicas", "intro_3.ogg", 1)
        }
    } else if (entidade == 2) { // Efeitos
        audio = document.getElementById("faixa_efeitos1")
        localStorage.setItem("volEfeito", volume)

        let audio2 = document.getElementById("faixa_efeitos2")
        audio2.volume = volume / 100

        let audio3 = document.getElementById("faixa_efeitos3")
        audio3.volume = volume / 100

        let ambiente = document.getElementById("faixa_ambiente")
        ambiente.volume = volume / 100

        let pisoes = document.getElementById("faixa_pisoes")
        pisoes.volume = volume / 100

        if (auto != null)
            executaSons("faixa_efeitos1", "Efeitos", "pop.ogg", 2)
    } else if (entidade == 3) { // Memes
        audio = document.getElementById("faixa_memes1")
        localStorage.setItem("volMemes", volume)

        let audio2 = document.getElementById("faixa_memes2")
        audio2.volume = volume / 100

        if (auto != null) {

            if (Math.round(2 * Math.random()) > 1)
                executaSons("faixa_memes1", "Memes", "jailson_1.ogg", 3)
            else
                executaSons("faixa_memes1", "Memes", "jailson_2.ogg", 3)
        }
    }

    audio.volume = volume / 100
}

// Executada automaticamente quando a página carrega, ela ajusta o volume para o valor salvo
function carrega_volume(volume, entidade) {

    if (entidade == 1)
        document.getElementById("volume_musica").value = volume
    else if (entidade == 2)
        document.getElementById("volume_efeitos").value = volume
    else
        document.getElementById("volume_memes").value = volume

    alteraVolume(volume, entidade)
}

function desliga_som(entidade, tipo) {

    let volume_interno

    if (tipo == 1)      // Músicas
        volume_interno = localStorage.getItem("volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("volMemes")

    let pausa_som = document.getElementById(entidade)
    let salva_volume = volume_interno

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
        volume_interno = localStorage.getItem("volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("volMemes")

    let pausa_som = document.getElementById(entidade)
    let salva_volume = volume_interno

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
        volume_interno = localStorage.getItem("volMusica")
    else if (tipo == 2) // Efeitos
        volume_interno = localStorage.getItem("volEfeito")
    else               // Memes
        volume_interno = localStorage.getItem("volMemes")

    let pausa_som = document.getElementById(entidade)
    let salva_volume = volume_interno

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

    executaSons("faixa_memes1", "Final", nome, 3) // Usado para o Som de meme ao morrer
}

function executaSomCarrega() {

    let lista_entradas = ["bambam3", "daciolo", "jailson_3", "jailson_4", "parque2"]
    i = Math.round((lista_entradas.length - 1) * Math.random())

    executaSons("faixa_memes1", "Memes", `${lista_entradas[i]}.ogg`, 3)
}