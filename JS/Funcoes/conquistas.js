let lista_conquistas_ganhas = {}, fila_conquistas = []
let temporizador_fila_conquistas = null
let temporizador_fecha_conquista = null
let temporizador_oculta_conquista = null
let temporizador_libera_conquista = null
let temporizador_expande_conquista = null
let animacao_progresso_conquista = null
let temporizador_glitch_conquista = null
const conquistas_pendentes_traducao = new Set()
const caracteres_glitch_conquista = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-=?"

const conquistas_secretas = [
    "passaro",
    "morte_parque",
    "baixa_gravidade",
    "milhas_aereas",
    "negativado",
    "restart",
    "frutos",
    "dinheirama"
]

const id_conquistas = [
    "ligando_motores",
    "morte_agua",
    "morte_lava",
    "morte_batida",
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
    "morte_parque",
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

function limpa_glitch_conquista() {
    clearInterval(temporizador_glitch_conquista)
    temporizador_glitch_conquista = null
}

function mostra_nome_conquista_secreta(nome) {
    limpa_glitch_conquista()
    const nome_marcado = Array.from(nome, (caractere) => {
        const caractere_escapado = caractere.replace(/[&<>"']/g, (valor) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[valor])
        return /\s/u.test(caractere)
            ? caractere_escapado
            : `<span class="caractere-conquista-secreta" data-original="${caractere_escapado}">${caractere_escapado}</span>`
    }).join("")

    toolTip(`<span class="nome-conquista-secreta">${nome_marcado}</span>`)
    temporizador_glitch_conquista = setInterval(() => {
        const caracteres = Array.from(
            document.querySelectorAll("#ToolTip .caractere-conquista-secreta")
        )
        if (!caracteres.length) return

        const quantidade_alterada = Math.max(
            1,
            Math.ceil(caracteres.length * (0.15 + Math.random() * 0.25))
        )
        const indices_alterados = new Set()
        while (indices_alterados.size < quantidade_alterada)
            indices_alterados.add(Math.floor(Math.random() * caracteres.length))

        caracteres.forEach((caractere, indice) => {
            caractere.textContent = indices_alterados.has(indice)
                ? caracteres_glitch_conquista[Math.floor(Math.random() * caracteres_glitch_conquista.length)]
                : caractere.dataset.original
        })
    }, 80)
}

function conquista(conquista, modo) {
    const veio_da_fila = modo === 1

    if (!id_conquistas.includes(conquista)) return

    if (!lista_conquistas_ganhas[conquista] || veio_da_fila) {
        if (
            !translations[`conquista.${conquista}`] ||
            !translations["conquista.obtida"] ||
            !translations["conquista.secreta"]
        ) {
            conquistas_pendentes_traducao.add(conquista)
            return
        }

        conquistas_pendentes_traducao.delete(conquista)
        lista_conquistas_ganhas[conquista] = 1

        jogo.depuracao({ tls: "depuracao.conquista_solicitada" })

        if (veio_da_fila && fila_conquistas[0] === conquista)
            fila_conquistas.shift()

        if (menus.estado_conquista != 1 && lista_conquistas_ganhas[conquista] < 2) {
            if (conquista == "frutos") {
                notificacao(0, 0)
                mostra_moedas(Math.round(25 * Math.random()))
            }

            jogo.depuracao({ tls: "depuracao.processando_conquista", replace: translations[`conquista.${conquista}`] })
            lista_conquistas_ganhas[conquista] = 2

            if (jogo.notificaConquista) {
                let tempo_conquista = 3000
                menus.estado_conquista = 1
                get_element("nome_conquista").textContent = translations[`conquista.${conquista}`]

                const aviso = get_element("conquistas")
                clearTimeout(temporizador_fecha_conquista)
                clearTimeout(temporizador_oculta_conquista)
                clearTimeout(temporizador_libera_conquista)
                clearTimeout(temporizador_expande_conquista)
                temporizador_oculta_conquista = null
                if (animacao_progresso_conquista) {
                    animacao_progresso_conquista.cancel()
                    animacao_progresso_conquista = null
                }
                aviso.classList.remove("visivel", "expandido")
                aviso.style.display = "flex"
                aviso.setAttribute("aria-hidden", "false")
                requestAnimationFrame(() => {
                    aviso.classList.add("visivel")
                    temporizador_expande_conquista = setTimeout(() => {
                        aviso.classList.add("expandido")
                        temporizador_expande_conquista = null
                    }, 350)
                })

                if (conquistas_secretas.includes(conquista)) {
                    get_element("tipo_conquista").textContent = translations["conquista.secreta"]
                    executaSons("faixa_conquistas", "efeitos", "conquista_secreta.ogg", 2)
                    tempo_conquista = 9000
                } else {
                    get_element("tipo_conquista").textContent = translations["conquista.obtida"]
                    executaSons("faixa_conquistas", "efeitos", "conquista.ogg", 2)
                }

                tempo_conquista = Math.max(5000, tempo_conquista)
                animacao_progresso_conquista = get_element("barra_progresso_conquista").animate(
                    [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
                    { duration: tempo_conquista, easing: "linear", fill: "forwards" }
                )

                temporizador_fecha_conquista = setTimeout(() => {
                    aviso.classList.remove("visivel", "expandido")
                    temporizador_oculta_conquista = setTimeout(() => {
                        aviso.style.display = "none"
                        aviso.setAttribute("aria-hidden", "true")
                        temporizador_oculta_conquista = null
                        if (animacao_progresso_conquista) {
                            animacao_progresso_conquista.cancel()
                            animacao_progresso_conquista = null
                        }
                    }, 450)
                    temporizador_fecha_conquista = null
                }, tempo_conquista)

                temporizador_libera_conquista = setTimeout(() => {
                    menus.estado_conquista = 0
                    temporizador_libera_conquista = null
                }, tempo_conquista + 2000)
            }

            sincronizaQuadroConquistas()

            if (fila_conquistas.length == 0)
                para_fila_conquistas()
        } else {
            if (!fila_conquistas.includes(conquista)) {
                jogo.depuracao({ tls: "depuracao.conquista_fila", replace: translations[`conquista.${conquista}`] })
                fila_conquistas.push(conquista)
            }
            inicia_fila_conquistas()
        }

        localStorage.setItem("pul4Pr3dios-lista_conquistas_ganhas", JSON.stringify(lista_conquistas_ganhas))
    }

    sincronizaEstatisticasConquistas()
}

function ocultaAvisoConquista() {
    clearTimeout(temporizador_fecha_conquista)
    clearTimeout(temporizador_oculta_conquista)
    clearTimeout(temporizador_libera_conquista)
    clearTimeout(temporizador_expande_conquista)
    temporizador_fecha_conquista = null
    temporizador_libera_conquista = null
    temporizador_expande_conquista = null
    menus.estado_conquista = 0

    const aviso = get_element("conquistas")
    aviso.classList.remove("visivel", "expandido")
    temporizador_oculta_conquista = setTimeout(() => {
        aviso.style.display = "none"
        aviso.setAttribute("aria-hidden", "true")
        temporizador_oculta_conquista = null
        if (animacao_progresso_conquista) {
            animacao_progresso_conquista.cancel()
            animacao_progresso_conquista = null
        }
    }, 450)
}

function inicia_fila_conquistas() {
    if (temporizador_fila_conquistas !== null) return

    temporizador_fila_conquistas = setInterval(() => {
        if (menus.estado_conquista == 0 && fila_conquistas.length > 0)
            redireciona_conquista(fila_conquistas[0])
    }, 1000)
}

function para_fila_conquistas() {
    if (temporizador_fila_conquistas === null) return

    clearInterval(temporizador_fila_conquistas)
    temporizador_fila_conquistas = null
}

function redireciona_conquista(valor) {
    if (fila_conquistas[0] === valor)
        conquista(valor, 1)
}

function sincronizaQuadroConquistas() {

    sincronizaEstatisticasConquistas()
    const placeholder = get_element("placeholder_conquista")
    const fragmento = document.createDocumentFragment()

    for (let i = 0; i < id_conquistas.length; i++) {
        const id = id_conquistas[i]
        const obtida = Boolean(lista_conquistas_ganhas[id])
        const imagem = obtida ? i : conquistas_secretas.includes(id) ? "secreta" : i
        const elemento = document.createElement("img")
        const nome = translations[`conquista.${id}`]
        const descricao = translations[`conquista.descricao.${id}`]

        elemento.className = obtida ? "img_conquista_obtida" : "img_conquista"
        elemento.src = `source/images/achievements/${imagem}.jpg`
        elemento.alt = nome
        if (conquistas_secretas.includes(id) && !obtida) {
            elemento.addEventListener("mouseover", () => mostra_nome_conquista_secreta(nome))
            elemento.addEventListener("mouseout", () => {
                limpa_glitch_conquista()
                toolTip()
            })
        } else {
            elemento.addEventListener("mouseover", () => troca_descricao(nome, descricao, 1))
            elemento.addEventListener("mouseout", () => troca_descricao(0, 0, 0))
        }
        fragmento.appendChild(elemento)
    }

    placeholder.innerHTML = ""
    placeholder.appendChild(fragmento)
}

function sincronizaEstatisticasConquistas() {

    let obtidas = 0

    for (let x = 0; x < id_conquistas.length; x++) {
        if (lista_conquistas_ganhas[id_conquistas[x]])
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
    if (lista_conquistas_ganhas["comprador_compulsivo"] && lista_conquistas_ganhas["pisoes"]) conquista("frutos", 0)
}

function processaConquistasPendentesTraducao() {
    const pendentes = [...conquistas_pendentes_traducao]
    conquistas_pendentes_traducao.clear()

    for (const id of pendentes)
        conquista(id, 0)
}