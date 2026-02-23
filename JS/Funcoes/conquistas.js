var lista_conquistas, lista_descricao, lista_conquistas_ganhas = {}, fila_conquistas = [], conquistas_secretas = ["morte_parque", "baixa_gravidade", "negativado", "restart", "frutos", "dinheirama", "passaro", "milhas_aereas"]

const id_conquistas = [
    "ligando_motores",
    "morte_agua",
    "morte_lava",
    "morte_batida",
    "morte_parque",
    "pulo_esgotado",
    "paraiso_pisoes",
    "passando_tempo",
    "ja_vi_tudo",
    "pisoes",
    "pling",
    "predio_santos",
    "roda_fria",
    "velocidade_maxima",
    "comprador_compulsivo",
    "mudanca_tintas",
    "pulga",
    "mods",
    "passaro",
    "baixa_gravidade",
    "expert",
    "selva_concreto",
    "milhas_aereas",
    "negativado",
    "restart",
    "capitalista",
    "frutos",
    "maratona",
    "dinheirama"
]

function conquista(conquista, modo) {

    if (!lista_conquistas_ganhas[conquista] || modo == 1) {
        lista_conquistas_ganhas[conquista] = 1

        jogo.depuracao({ tls: "depuracao.conquista_solicitada" })

        // Remove a primeira posição do array
        if (modo) fila_conquistas.shift()

        // Trava a animação da conquista
        if (menus.estado_conquista != 1 && lista_conquistas_ganhas[conquista] < 2) {

            // Colhendo os frutos
            if (conquista == "colhendo_frutos") {
                notificacao(0, 0)
                mostra_moedas(Math.round(25 * Math.random()))
            }

            jogo.depuracao({ tls: "depuracao.processando_conquista", replace: translations[`conquista.${conquista}`] })
            lista_conquistas_ganhas[conquista] = 2

            // Verifica se a notificação das conquistas está ativa para exibir-las
            if (jogo.notificaConquista) {

                let tempo_conquista = 3000
                menus.estado_conquista = 1
                get_element("nome_conquista").innerHTML = translations[`conquista.${conquista}`]

                // Atualizando o nome da conquista para exibição
                get_element("conquistas").style.display = "block"
                get_element("conquistas").style.animation = "conquista_obtida 2s"
                get_element("texto_conquista").style.display = "block"

                // Verifica se a conquista é secreta ou não
                if (conquistas_secretas.includes(conquista)) {
                    get_element("tipo_conquista").innerHTML = translations["conquista.secreta"]
                    executaSons("faixa_conquistas", "efeitos", "conquista_secreta.ogg", 2)
                    tempo_conquista = 9000
                } else {
                    get_element("tipo_conquista").innerHTML = translations["conquista.obtida"]
                    executaSons("faixa_conquistas", "efeitos", "conquista.ogg", 2)
                }

                fecha_conquista = setTimeout(() => {
                    get_element("conquistas").style.animation = "fecha_conquista 2s"
                    get_element("texto_conquista").style.animation = "esconde_texto 1s"

                    setTimeout(() => {
                        get_element("texto_conquista").style.display = "none"
                    }, 1000)

                    setTimeout(() => {
                        get_element("conquistas").style.display = "none"
                    }, 1900)

                    clearTimeout(fecha_conquista)
                }, tempo_conquista)

                // Libera para a próxima chamada
                solta_conquista = setTimeout(() => {
                    menus.estado_conquista = 0
                    clearTimeout(solta_conquista)
                }, tempo_conquista + 2000)

                get_element("conquistas").style.animation = ""
                get_element("texto_conquista").style.animation = ""
            }

            sincronizaQuadroConquistas()

            // Verifica se a lista de conquistas esgotou, e termina o intervalo de requisição
            if (fila_conquistas.length == 0 && modo)
                if (typeof puxa_proxima != 'undefined')
                    clearInterval(puxa_proxima)
        } else {
            if (fila_conquistas.length > 0)
                clearInterval(puxa_proxima)

            jogo.depuracao({ tls: "depuracao.conquista_fila", replace: translations[`conquista.${conquista}`] })
            fila_conquistas.push(conquista)

            puxa_proxima = setInterval(() => {
                if (menus.estado_conquista == 0)
                    redireciona_conquista(fila_conquistas[0])
            }, 1000)
        }

        // Salvando no banco a lista de conquistas ganhas
        localStorage.setItem("pul4Pr3dios-lista_conquistas_ganhas", JSON.stringify(lista_conquistas_ganhas))
    }

    sincronizaEstatisticasConquistas()
}

function redireciona_conquista(valor) {

    if (fila_conquistas.length == 0)
        clearInterval(puxa_proxima)

    conquista(valor, 1)
}

function sincronizaQuadroConquistas() {

    sincronizaEstatisticasConquistas()
    get_element("placeholder_conquista").innerHTML = ""

    for (let i = 0; i < id_conquistas.length; i++) {
        if (!lista_conquistas_ganhas[id_conquistas[i]]) {

            const imagem = conquistas_secretas.includes(id_conquistas[i]) ? "secreta" : i

            get_element("placeholder_conquista").innerHTML += `<img onMouseOver="troca_descricao('${translations[`conquista.${lista_conquistas_ganhas[id_conquistas[i]]}`]}', '${translations[`conquista.descricao.${lista_conquistas_ganhas[id_conquistas[i]]}`]}', 1)" onmouseout='troca_descricao(0, 0, 0)' class='img_conquista' src="source/images/achievements/${imagem}.jpg"></div>`
        } else
            get_element("placeholder_conquista").innerHTML += `<img onMouseOver="troca_descricao('${translations[`conquista.${lista_conquistas_ganhas[id_conquistas[i]]}`]}', '${translations[`conquista.descricao.${lista_conquistas_ganhas[id_conquistas[i]]}`]}', 1)" onmouseout='troca_descricao(0, 0, 0)' class='img_conquista_obtida' src='source/images/achievements/${i}.jpg'>`
    }
}

function sincronizaEstatisticasConquistas() {

    let obtidas = 0

    for (let x = 0; x < id_conquistas.length; x++) {
        if (lista_conquistas_ganhas[id_conquistas[x]] || lista_conquistas_ganhas[id_conquistas[x]] == 2)
            obtidas++
    }

    jogador.conquistas = obtidas
    jogador.conquistas_total = id_conquistas.length

    get_element("conquistas_obtidas").innerHTML = `${obtidas}/${id_conquistas.length}`
}

function sincronizaConquistas() {

    sincronizaQuadroConquistas()

    // Corredor de Maratonas
    if (hist_distancia >= 50000) conquista("maratona", 0)

    // Capitalista Opressor
    if (jogador.partida_moedas_coletadas >= 50) conquista("capitalista", 0)

    // Roda Fria
    if (hist_mortes >= 10) conquista("roda_fria", 0)

    // Pisões pra quem te quero
    if (hist_pisoes >= 50) conquista("pisoes", 0)

    // Já Vi de Tudo
    if (hist_parque > 0 && hist_lava > 0 && hist_agua > 0 && hist_cidade > 0) conquista("ja_vi_tudo", 0)

    // Passando o tempo
    if (hist_tempo_jogado >= 3600) conquista("passando_tempo", 0)

    // Paraíso dos Pisões
    if (hist_parque >= 5) conquista("paraiso_pisoes", 0)

    // Prédio Santos
    if (moedas >= 2500) conquista("predio_santos", 0)

    // Colhendo os Frutos
    if (lista_conquistas_ganhas["comprador_compulsivo"] && lista_conquistas_ganhas[8]) conquista("frutos", 0)
}