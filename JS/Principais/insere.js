function aleatorizadorInsercao() {
    let tempo = 10 + Math.round(40 * Math.random())

    return tempo
}

function insere_propsfundo() {

    // Água ou Lava
    if (eventos.evento == 1 || eventos.evento == 3) return

    let altura_media = 15, variacao = 35

    if (eventos.evento == 0) {     // Área Densa
        altura_media = 30
        variacao = 40
    }

    let altura_objeto = altura_media + Math.round(variacao * Math.random())

    if (jogo.status != estados.jogando)
        altura_objeto = 20 + Math.round(30 * Math.random())

    propsfundo.objetos.push({
        x: opcoes.largura,
        y: chao.y + 7,
        largura: 15,
        altura: altura_objeto,
        nome: escolhe_objeto(altura_objeto, 3)
    })

    // Aleatorizador de inserção
    probabilidade = aleatorizadorInsercao()

    if (probabilidade > 0 && probabilidade < 30)
        propsfundo.tempoInsere = 30 + Math.round(20 * Math.random())
    else
        propsfundo.tempoInsere = 20 + Math.round(40 * Math.random())
}

function insere_obj() {

    // Água ou Lava
    if (eventos.evento == 1 || eventos.evento == 3) return

    let altura_media = 40, variacao = 40

    if (eventos.evento == 0) {     // Área Densa
        altura_media = 50
        variacao = 65
    }

    if (eventos.evento == 2) { // Parque
        altura_media = 15
        variacao = 35
    }

    let altura_objeto = altura_media + Math.round(variacao * Math.random())

    if (jogo.status != estados.jogando)
        altura_objeto = 20 + Math.round(30 * Math.random())

    if (jogo.status == estados.jogando && (eventos.inicia_evento == 0 || eventos.inicia_evento == 2 || eventos.evento == null)) {
        obstaculos.objetos.push({
            x: opcoes.largura,
            y: chao.y + 20,
            largura: 46,
            altura: altura_objeto,
            nome: escolhe_objeto(altura_objeto, 2)
        })
    } else if (eventos.evento == 0 || eventos.evento == 2 || eventos.evento == null && jogo.status != estados.tutorial) { // Diferente do Evento de Água ou lava
        obstaculos.objetos.push({
            x: opcoes.largura,
            y: chao.y + 20,
            largura: 10,
            altura: altura_objeto,
            nome: escolhe_objeto(altura_objeto, 2)
        })
    }

    // Aleatorizador de inserção
    probabilidade = aleatorizadorInsercao()

    if (probabilidade > 0 && probabilidade < 30)
        obstaculos.tempoInsere = 40 + Math.round(20 * Math.random())
    else
        obstaculos.tempoInsere = 10 + Math.round(40 * Math.random())

    if (jogo.status == estados.jogando)
        obstaculos.qtdObjetos++

    //  Aumenta a Velocidade Gradualmente ( Fácil, Normal e Difícil )
    if (obstaculos.qtdObjetos % 4 == 0 && jogo.status == estados.jogando && jogo.velocidade < 30 && jogo.dificuldade != 3) {
        jogo.velocidade += .5
        if (jogo.velocidade == 30)
            conquista(12, 0)
    }

    // Modo Expert
    if (obstaculos.qtdObjetos % 2 == 0 && jogo.status == estados.jogando && jogo.velocidade < 35 && jogo.dificuldade == 3) {
        jogo.velocidade += .5
        if (jogo.velocidade == 35)
            conquista(12, 0)
    }
}

function insere_propsfrente() {

    // Água ou Lava
    if (eventos.evento == 1 || eventos.evento == 3) return

    let altura_objeto = 15 + Math.round(30 * Math.random())

    propsfrente.objetos.push({
        x: opcoes.largura,
        y: chao.y + 36,
        largura: 15,
        altura: altura_objeto,
        nome: escolhe_objeto(altura_objeto, 1)
    })

    if (eventos.evento == 0 || eventos.evento == 2) {
        if (jogo.velocidade < 30)
            propsfrente.tempoInsere = 30
        else
            propsfrente.tempoInsere = 15
    } else {
        // Aleatorizador de inserção
        probabilidade = aleatorizadorInsercao()

        if (probabilidade > 0 && probabilidade < 30)
            propsfrente.tempoInsere = 30 + Math.round(20 * Math.random())
        else
            propsfrente.tempoInsere = 10 + Math.round(40 * Math.random())
    }
}

function escolhe_objeto(altura, local) {

    const props = ['spriteArbusto', 'spriteArvore', 'spriteArvore2', 'spriteArvore_frutifera', 'spriteFonte', 'spritePoste1', 'spritePoste2']

    const predios = ['spritePredio1_1', 'spritePredio1_2', 'spritePredio2_1', 'spritePredio2_2', 'spritePredio3']
    const predios_fundo = ['spritePredio1_1_background', 'spritePredio1_2_background', 'spritePredio2_1_background', 'spritePredio2_2_background', 'spritePredio3_background']

    const pisoes = ['spritePisao', 'spritePisao2']

    if (altura > 50 && local !== 1)
        if (local == 3)
            return predios_fundo[Math.round((predios_fundo.length - 1) * Math.random())]
        else
            return predios[Math.round((predios.length - 1) * Math.random())]

    // Local = 1 (frente) && evento = 2 (parque) || evento = 0 (densidade)
    if (local == 1 && eventos.evento == 2) return props[6]
    if (local == 1 && eventos.evento == 0) return props[5]

    if (altura > 40 && altura < 51)
        if (local == 2) // Parque
            return pisoes[0]
        else if (local == 0) // Densidade
            return pisoes[1]
        else
            return pisoes[Math.round((pisoes.length - 1) * Math.random())]

    return props[Math.round((props.length - 3) * Math.random())]
}