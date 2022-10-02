function desenha_chao_fundo() {

    const valor = propsfundo.objetos
    for (let i = 0; i < valor.length; i++)
        desenha_objeto(valor[i])

    chao.desenha_b()

    for (let i = 0; i < valor.length; i++)
        desenha_sombra(valor[i], chao.y - 15)
}

function desenha_chao_centro() {

    const valor = obstaculos.objetos
    for (let i = 0; i < valor.length; i++)
        desenha_objeto(valor[i], chao.y + 12)

    chao.desenha_c()
    jogador.desenha()

    for (let i = 0; i < valor.length; i++)
        desenha_sombra(valor[i], chao.y)
}

function desenha_chao_frente() {

    const valor = propsfrente.objetos
    for (let i = 0; i < valor.length; i++)
        desenha_objeto(valor[i])

    chao.desenha_f()

    for (let i = 0; i < valor.length; i++)
        desenha_sombra(valor[i], chao.y + 20)

    if (jogo.status != estados.perdeu)
        if (jogador.chao_referencia != 650)
            if (chao.pisos_c[0]?.type < 2 || eventos.evento != 3)
                spriteSombraJogador.desenha(jogador.x - 48, 1000 - jogador.y)
            else if (jogador.y >= 500)
                spriteSombraJogador.desenha(jogador.x - 48, jogador.y + 135)
}

function desenha_objeto(objeto) {

    if (!objeto.sprite) {
        objeto.sprite = presets[objeto.nome].sprite
        objeto.y -= objeto.sprite.Altura
    }

    // + presets[objeto.nome].x é utilizado para alinhar os sprites noturnos e diurnos
    if (objeto.altura > 50) {
        objeto.sprite.desenha(objeto.x + presets[objeto.nome].x, chao.y - objeto.altura + presets[objeto.nome].y, objeto.largura, objeto.altura)
        transitador(objeto.nome, objeto.x, chao.y - objeto.altura)
    } else if (objeto.altura > 40) {
        objeto.sprite.desenha(objeto.x + presets[objeto.nome].x, objeto.y + 100, objeto.largura, objeto.altura)
        transitador(objeto.nome, objeto.x, objeto.y + 100)
    } else {
        objeto.sprite.desenha(objeto.x + presets[objeto.nome].x, objeto.y, objeto.largura, objeto.altura)
        transitador(objeto.nome, objeto.x, objeto.y)
    }
}

function desenha_sombra(objeto, chao_alvo) {

    if (!presets[objeto.nome].sombra) return

    const sprites_sombra = presets[objeto.nome].sombra
    sprites_sombra.sprite.desenha(objeto.x + sprites_sombra.x, chao_alvo + sprites_sombra.y, objeto.largura, objeto.altura)
}