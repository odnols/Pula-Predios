function aleatorizadorInsercao() {
    let tempo = 10 + Math.round(40 * Math.random())

    return tempo
}

function insere_propsfundo() {

    altura_media = 45
    variacao = 40

    if (eventos.evento == 0) {       // Área Densa
        if (jogo.dificuldade != 3) {
            this.altura_media = 50
            this.variacao = 65
        } else {
            this.altura_media = 55
            this.variacao = 65
        }
    } else if (eventos.evento == 2) { // Parque
        this.altura_media = 53
        this.variacao = 3
    } else {
        this.altura_media = 40
        this.variacao = 75
    }

    if (jogo.status == estados.jogando) {
        if (jogo.dificuldade != 3 && eventos.evento == null) {
            this.altura_media = 40
            this.variacao = 75
        } else if (eventos.evento == null) {
            this.altura_media = 50
            this.variacao = 75
        }
    }

    if (eventos.evento == 0 || eventos.evento == 2) {   // Evento de Área Densa
        propsfundo._obsfundo.push({
            x: opcoes.largura,
            largura: 10,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        })
    } else if (eventos.evento == 0 || eventos.evento == 2 || eventos.evento == null) {
        propsfundo._obsfundo.push({
            x: opcoes.largura,
            largura: 46,
            altura: this.altura_media + Math.round((this.variacao - 60) * Math.random()),
        })
    }

    // Aleatorizador de inserção
    probabilidade = aleatorizadorInsercao()

    if (probabilidade > 0 && probabilidade < 30)
        propsfundo.tempoInsere = 30 + Math.round(20 * Math.random())
    else
        propsfundo.tempoInsere = 20 + Math.round(40 * Math.random())
}

function insere_obj() {

    altura_media = 45
    variacao = 40

    if (eventos.evento == 0) {       // Área Densa
        if (jogo.dificuldade != 3) {
            this.altura_media = 50
            this.variacao = 65
        } else {
            this.altura_media = 55
            this.variacao = 65
        }
    } else if (eventos.evento == 2) { // Parque
        this.altura_media = 53
        this.variacao = 3
    } else {
        this.altura_media = 40
        this.variacao = 75
    }

    if (jogo.status == estados.jogando) {
        if (jogo.dificuldade != 3 && eventos.evento == null) {
            this.altura_media = 40
            this.variacao = 75
        } else if (eventos.evento == null) {
            this.altura_media = 50
            this.variacao = 75
        }
    }

    if (jogo.status == estados.jogando && (eventos.inicia_evento == 0 || eventos.inicia_evento == 2 || eventos.evento == null)) {
        obstaculos._obs.push({
            x: opcoes.largura,
            largura: 46,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        })
    } else if (eventos.evento == 0 || eventos.evento == 2 || eventos.evento == null && jogo.status != estados.tutorial) { // Diferente do Evento de Água ou lava
        obstaculos._obs.push({
            x: opcoes.largura,
            largura: 10,
            altura: this.altura_media + Math.round((this.variacao - 60) * Math.random()),
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

    altura_media = 45
    variacao = 40

    if (jogo.status == estados.ocioso) {
        if (eventos.evento == 0) {       // Área Densa
            this.altura_media = 50
            this.variacao = 65
        } else if (eventos.evento == 2) { // Parque
            this.altura_media = 52
            this.variacao = 7
        }
    } else {
        if (eventos.evento == 0 || eventos.evento == 2) { // Área Densa e Parque
            this.altura_media = 50
            this.variacao = 65
        } else if (eventos.evento == null) {
            this.altura_media = 30
            this.variacao = 24
        }
    }

    if (eventos.evento == 0 || eventos.evento == 2) { // Área Densa e Parque
        propsfrente._obsfrente.push({
            x: opcoes.largura,
            largura: 15,
            altura: 55,
        })
    } else if (eventos.evento == 0 || eventos.evento == 2 || eventos.evento == null) {
        propsfrente._obsfrente.push({
            x: opcoes.largura,
            largura: 15,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        })
    }

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