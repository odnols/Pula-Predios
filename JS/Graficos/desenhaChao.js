function popula_pisos() {

    // Verificando o bioma atual antes de popular o terreno
    jogo.bioma = parseInt(localStorage.getItem("pul4Pr3dios-jogo_bioma")) || 0

    const camadas = [
        { array: chao.pisos_b, local: 3 },
        { array: chao.pisos_c, local: 2 },
        { array: chao.pisos_f, local: 1 }
    ]

    // Inicia os pisos ao carregar o jogo
    for (let i = 0; i < 4; i++)
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

function get_tipo_piso_saida_liquido(piso) {
    if (piso?.nome === "transicao_grama_areia")
        return piso.origem
    return get_tipo_piso_terrestre(piso)
}

// Opaque horizontal bounds shared by the grass and sand transition sprites.
const limites_transicoes_liquido = {
    entrada: 393,
    saida: 1145
}

function get_liquido_sob_jogador() {
    const largura = opcoes.largura
    const centro_jogador = jogador.x + jogador.largura / 2
    const indice_atual = 1
    const indice_piso = Math.floor((centro_jogador - Math.round(chao.xc)) / largura) + indice_atual
    const piso = chao.pisos_c[indice_piso]

    if (!eh_piso_liquido(piso)) return null

    const inicio_piso = Math.round(chao.xc + (indice_piso - indice_atual) * largura)
    const posicao_no_piso = centro_jogador - inicio_piso
    const transicao_entrada = piso.transicao_entrada === "transita_areia1"
        || piso.transicao_entrada === "transita_chao1"

    if (transicao_entrada && posicao_no_piso < limites_transicoes_liquido.entrada)
        return null

    const piso_seguinte = chao.pisos_c[indice_piso + 1]
    const possui_transicao_saida = Boolean(get_tipo_piso_saida_liquido(piso_seguinte))

    if (possui_transicao_saida && posicao_no_piso >= limites_transicoes_liquido.saida)
        return null

    return get_tipo_piso_liquido(piso)
}

function get_progresso_saida_liquido() {
    const largura = opcoes.largura
    const centro_jogador = jogador.x + jogador.largura / 2
    const indice_atual = 1
    const indice_piso = Math.floor((centro_jogador - Math.round(chao.xc)) / largura) + indice_atual
    const piso = chao.pisos_c[indice_piso]
    const piso_seguinte = chao.pisos_c[indice_piso + 1]

    if (!eh_piso_liquido(piso) || !get_tipo_piso_saida_liquido(piso_seguinte))
        return null

    const inicio_piso = Math.round(chao.xc + (indice_piso - indice_atual) * largura)
    const posicao_no_piso = centro_jogador - inicio_piso
    const progresso = (posicao_no_piso - limites_transicoes_liquido.saida)
        / (largura - limites_transicoes_liquido.saida)

    return Math.max(0, Math.min(1, progresso))
}

function prepara_chao_pos_morte(tipo_liquido) {
    if (tipo_liquido !== "agua" && tipo_liquido !== "lava")
        return

    const nome_piso = jogo.bioma == 0 ? "chao_noite" : "areia_noite"
    const y = get_y_piso(2)
    chao.pisos_c = Array.from({ length: 4 }, () => ({
        nome: nome_piso,
        type: 0,
        x: 2,
        y
    }))
    chao.contexto_pisos.chao_meio = {}

    const cores = tipo_liquido === "agua"
        ? ["#31d8ff", "#13a8e8", "#b7f6ff", "#2270d4"]
        : ["#ff4a12", "#ff8c1a", "#ffd45a", "#d52d0b"]
    const agora = performance.now()
    chao.efeito_explosao_liquido = {
        atualizacao: agora,
        deslocamento_chao: chao.xc,
        particulas: Array.from({ length: 180 }, () => ({
            x: Math.random() * opcoes.canvas.width,
            y: y + 15 + Math.random() * 12,
            velocidade_x: (Math.random() - 0.5) * 5,
            velocidade_y: -2 - Math.random() * 6,
            gravidade: 0.16 + Math.random() * 0.16,
            tamanho: 2 + Math.floor(Math.random() * 4),
            vida: 0.65 + Math.random() * 0.35,
            duracao: 700 + Math.random() * 650,
            cor: cores[Math.floor(Math.random() * cores.length)]
        }))
    }
}

function desenha_explosao_liquido() {
    const efeito = chao.efeito_explosao_liquido
    if (!efeito) return

    const agora = performance.now()
    const delta = Math.min((agora - efeito.atualizacao) / (1000 / 60), 3)
    let deslocamento_chao = chao.xc - efeito.deslocamento_chao
    if (deslocamento_chao > opcoes.largura / 2)
        deslocamento_chao -= opcoes.largura
    else if (deslocamento_chao < -opcoes.largura / 2)
        deslocamento_chao += opcoes.largura

    efeito.atualizacao = agora
    efeito.deslocamento_chao = chao.xc
    opcoes.ctx.save()

    efeito.particulas = efeito.particulas.filter((particula) => {
        particula.x += particula.velocidade_x * delta + deslocamento_chao
        particula.y += particula.velocidade_y * delta
        particula.velocidade_y += particula.gravidade * delta
        particula.vida -= delta * (1000 / 60) / particula.duracao

        if (particula.vida <= 0) return false

        opcoes.ctx.globalAlpha = particula.vida
        opcoes.ctx.fillStyle = particula.cor
        opcoes.ctx.fillRect(
            Math.round(particula.x),
            Math.round(particula.y),
            particula.tamanho,
            particula.tamanho
        )
        return true
    })

    opcoes.ctx.restore()
    if (efeito.particulas.length === 0)
        chao.efeito_explosao_liquido = null
}

function get_posicao_transicao_piso(transicao, caso) {
    const camadas = ["chao_frente", "chao_meio", "chao_fundo"]
    return transicao[camadas[caso - 1]] || transicao
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
    const indice_atual = camada?.length >= 4 ? 1 : 0

    if (!Array.isArray(camada) || !camada.length) return
    if (!presets[camada[indice_atual]?.nome]) return

    const pos_chao = [chao.xf, chao.xc, chao.xb]
    const pos_x_base = Math.round(pos_chao[caso - 1])
    const largura = opcoes.largura
    const camada_nome = ["chao_frente", "chao_meio", "chao_fundo"][caso - 1]
    chao.contexto_pisos[camada_nome] = {
        chao_anterior: camada[indice_atual - 1] || null,
        chao_atual: camada[indice_atual],
        chao_proximo: camada[indice_atual + 1] || null,
        chao_seguinte: camada[indice_atual + 2] || null
    }

    if (caso === 2)
        desenha_explosao_liquido()

    for (let i = 0; i < camada.length; i++) {

        const piso = camada[i]
        const chao_alvo = presets[piso.nome]

        if (!chao_alvo) continue

        const pos_x = Math.round(pos_x_base + (i - indice_atual) * largura)

        if (piso.nome === "transicao_grama_areia") {
            const posicao = get_posicao_transicao_piso(chao_alvo, caso)
            desenha_sprite_transicao(
                "transita_grama_areia_dia",
                chao_alvo,
                pos_x + posicao.x,
                piso.y + posicao.y,
                piso.espelhar_horizontal
            )
            continue
        }

        const desnivel = ['chao_noite', 'areia_noite'].includes(piso.nome) ? 0 : 15 // desnível para água / lava

        chao_alvo.sprite.desenha(pos_x, piso.y + desnivel)

        const piso_anterior = camada[i - 1]

        if (piso.nome !== "lava")
            transitador(piso.nome, pos_x, piso.y + desnivel)

        if (eh_piso_liquido(piso)) {
            const piso_seguinte = camada[i + 1]
            const tipo_piso_saida = get_tipo_piso_saida_liquido(piso_seguinte)

            if (piso_anterior && !eh_piso_liquido(piso_anterior))
                desenha_transicao_piso(
                    get_transicao_entrada_liquido(piso_anterior),
                    pos_x,
                    piso.y + desnivel,
                    caso
                )
            else if (!piso_anterior && piso.transicao_entrada)
                desenha_transicao_piso(
                    piso.transicao_entrada,
                    pos_x,
                    piso.y + desnivel,
                    caso
                )

            if (tipo_piso_saida)
                desenha_transicao_piso(
                    tipo_piso_saida === "areia" ? "transita_areia2" : "transita_chao2",
                    pos_x,
                    piso.y + desnivel,
                    caso
                )
            else if (piso_seguinte
                && get_tipo_piso_liquido(piso_seguinte) !== get_tipo_piso_liquido(piso))
                desenha_transicao_piso("transita_chao2", pos_x, piso.y + desnivel, caso)
        }
    }
}

function desenha_transicao_piso(nome, x, y, caso) {
    const transicao = presets[nome]
    const posicao = get_posicao_transicao_piso(transicao, caso)
    desenha_sprite_transicao(
        nome,
        transicao,
        x + posicao.x,
        y + posicao.y
    )
}
