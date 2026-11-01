function popula_pisos() {

    // Verificando o bioma atual antes de popular o terreno
    jogo.bioma = parseInt(localStorage.getItem("pul4Pr3dios-jogo_bioma")) || 0

    const camadas = [
        { array: chao.pisos_b, local: 3 },
        { array: chao.pisos_c, local: 2 },
        { array: chao.pisos_f, local: 1 }
    ]

    // Inicia os pisos ao carregar o jogo
    for (let i = 0; i < 2; i++)
        camadas.forEach(({ array, local }) => insere_piso(array, local))
}

function get_y_piso(local) {
    const posicoes = [chao.y + 27, chao.y + 10, chao.y - 5]
    return posicoes[local - 1] || chao.y + 10
}

function eh_piso_liquido(piso) {
    return piso?.nome === "agua_noite" || piso?.nome === "lava"
}

function get_tipo_piso_liquido(piso) {
    if (piso?.nome === "agua_noite") return "agua"
    if (piso?.nome === "lava") return "lava"
    return null
}

function get_transicao_entrada_liquido(piso) {
    return get_tipo_piso_terrestre(piso) === "areia"
        ? "transita_areia1"
        : "transita_chao1"
}

function get_tipo_piso_terrestre(piso) {
    if (piso?.nome === "chao_noite") return "grama"
    if (piso?.nome === "areia_noite") return "areia"
    if (piso?.nome === "transicao_grama_areia") return piso.destino
    return null
}

function insere_piso(array, local) {

    const y = get_y_piso(local)
    const tipo_destino = jogo.bioma == 0 ? "grama" : "areia"
    const nome_piso_destino = tipo_destino == "grama" ? "chao_noite" : "areia_noite"
    const piso_padrao = (eventos.evento !== 1 && eventos.evento !== 3) || (local == 2 && jogo.status == estados.ocioso)
    let tipo_anterior = null

    if (piso_padrao) {
        for (let i = array.length - 1; i >= 0; i--) {
            tipo_anterior = get_tipo_piso_terrestre(array[i])
            if (tipo_anterior) break
        }

        if (tipo_anterior && tipo_anterior !== tipo_destino) {
            array.push({
                nome: "transicao_grama_areia",
                origem: tipo_anterior,
                destino: tipo_destino,
                espelhar_horizontal: tipo_anterior == "areia" && tipo_destino == "grama",
                type: 0,
                x: 2,
                y: y
            })
            return
        }

        array.push({
            nome: nome_piso_destino,
            type: 0,
            x: 2,
            y: y
        })
    }

    // Impede que lava e água aparecam no piso do jogador, no modo ocioso
    if (local == 2 && jogo.status == estados.ocioso) return

    if (eventos.evento == 1) {
        array.push({
            nome: 'agua_noite',
            type: 1,
            x: 2,
            y: y,
            transicao_entrada: array.length > 0 && !eh_piso_liquido(array[array.length - 1])
                ? get_transicao_entrada_liquido(array[array.length - 1])
                : null
        })
    }

    if (eventos.evento == 3) {
        array.push({
            nome: 'lava',
            type: 1,
            x: 2,
            y: y,
            transicao_entrada: array.length > 0 && !eh_piso_liquido(array[array.length - 1])
                ? get_transicao_entrada_liquido(array[array.length - 1])
                : null
        })
    }
}

function desenha_piso(caso) {

    const alvos = [chao.pisos_f, chao.pisos_c, chao.pisos_b]
    const camada = alvos[caso - 1]

    if (!Array.isArray(camada) || !camada.length) return
    if (!presets[camada[0]?.nome]) return

    const pos_chao = [chao.xf, chao.xc, chao.xb]
    const pos_x_base = pos_chao[caso - 1]

    for (let i = 0; i < camada.length; i++) {

        const piso = camada[i]
        const chao_alvo = presets[piso.nome]

        if (!chao_alvo) continue

        if (piso.x == 2 && i == 0)
            piso.x = 1

        if (piso.nome === "transicao_grama_areia") {
            desenha_sprite_transicao(
                "transita_grama_areia_dia",
                chao_alvo,
                (piso.x == 1 ? pos_x_base : pos_x_base + 1366) + chao_alvo.x,
                piso.y + chao_alvo.y,
                piso.espelhar_horizontal
            )
            continue
        }

        const desnivel = ['chao_noite', 'areia_noite'].includes(piso.nome) ? 0 : 15 // desnível para água / lava

        const pos_x = piso.x == 1 ? pos_x_base : pos_x_base + 1366
        chao_alvo.sprite.desenha(pos_x, piso.y + desnivel)

        const piso_anterior = camada[i - 1]

        if (piso.nome !== "lava")
            transitador(piso.nome, pos_x, piso.y + desnivel)

        if (eh_piso_liquido(piso)) {
            const piso_seguinte = camada[i + 1]

            if (piso_anterior && !eh_piso_liquido(piso_anterior))
                desenha_transicao_piso(
                    get_transicao_entrada_liquido(piso_anterior),
                    pos_x,
                    piso.y + desnivel
                )
            else if (!piso_anterior && piso.transicao_entrada)
                desenha_transicao_piso(
                    piso.transicao_entrada,
                    pos_x,
                    piso.y + desnivel
                )

            if (piso_seguinte && !eh_piso_liquido(piso_seguinte))
                desenha_transicao_piso(
                    get_tipo_piso_terrestre(piso_seguinte) === "areia" ? "transita_areia2" : "transita_chao2",
                    pos_x,
                    piso.y + desnivel
                )
            else if (piso_seguinte
                && get_tipo_piso_liquido(piso_seguinte) !== get_tipo_piso_liquido(piso))
                desenha_transicao_piso("transita_chao2", pos_x, piso.y + desnivel)
        }
    }
}

function desenha_transicao_piso(nome, x, y) {
    const transicao = presets[nome]
    desenha_sprite_transicao(
        nome,
        transicao,
        x + transicao.x,
        y + transicao.y
    )
}
