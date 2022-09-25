function desenha_chao_fundo() {

    for (let x = 0, tam = propsfundo._obsfundo.length; x < tam; x++) {
        let obsb = propsfundo._obsfundo[x]

        desenha_objeto(obsb, chao.y, 1)
    }

    chao.desenha()

    for (let x = 0, tam = propsfundo._obsfundo.length; x < tam; x++) {
        let obsb = propsfundo._obsfundo[x]

        desenha_sombra(obsb, chao.y - 15, 1)
    }
}

function desenha_chao_centro() {

    for (let i = 0, tam = obstaculos._obs.length; i < tam; i++) {
        let obs = obstaculos._obs[i]

        desenha_objeto(obs, chao.y + 12)
    }

    chao.desenha2()
    jogador.desenha()

    for (let i = 0, tam = obstaculos._obs.length; i < tam; i++) {
        let obs = obstaculos._obs[i]

        desenha_sombra(obs, chao.y)
    }
}

function desenha_chao_frente() {

    for (let x = 0, tam = propsfrente._obsfrente.length; x < tam; x++) {
        let obsf = propsfrente._obsfrente[x]

        desenha_objeto(obsf, chao.y + 40, 2)
    }

    chao.desenha3()

    for (let x = 0, tam = propsfrente._obsfrente.length; x < tam; x++) {
        let obsf = propsfrente._obsfrente[x]

        desenha_sombra(obsf, chao.y + 20, 2)
    }

    if (estadoAtual != estados.perdeu)
        if (jogador.chao_referencia != 650)
            if (chao.muda_chao[0] < 2 || jogo.evento != 3)
                spriteSombraJogador.desenha(jogador.x - 48, 1000 - jogador.y)
            else if (jogador.y >= 500)
                spriteSombraJogador.desenha(jogador.x - 48, jogador.y + 135)
}

function desenha_objeto(objeto_alvo, chao_alvo, local) {

    if (objeto_alvo.altura >= 55) {

        if (local == 2) {
            if (objeto_alvo.altura == 55) {
                if (jogo.ultimo_evento == 0 || jogo.evento == 0) { // Área Densa
                    spritePoste1.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 5, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("poste1_noite", 20, objeto_alvo.x - 11, chao_alvo - 50, objeto_alvo.altura)
                    return
                } else if (jogo.ultimo_evento == 2 || jogo.evento == 2) { // Parque
                    spritePoste2.desenha(objeto_alvo.x, chao_alvo - 40, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("poste2_noite", 20, objeto_alvo.x - 10, chao_alvo - 50, objeto_alvo.altura)
                    return
                }
            }
        }

        if (local) {
            if (jogo.evento == 0) {
                if (objeto_alvo.altura > 80) {
                    if (objeto_alvo.altura > 110) { // Azul
                        spritePredio2_1_background.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 50, objeto_alvo.largura, objeto_alvo.altura)
                        transitador("predio2_1_background", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 48, objeto_alvo.largura, objeto_alvo.altura)
                    } else if (objeto_alvo.altura > 100) { // Ciano
                        spritePredio1_1_background.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                        transitador("predio1_1_background", 100, objeto_alvo.x - 1, chao_alvo - objeto_alvo.altura + 23, objeto_alvo.largura, objeto_alvo.altura)
                    } else if (objeto_alvo.altura > 90) { // Azul com Antena
                        spritePredio2_2_background.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                        transitador("predio2_2_background", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 15, objeto_alvo.largura, objeto_alvo.altura)
                    } else { // Ciano com Antena
                        spritePredio1_2_background.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                        transitador("predio1_2_background", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 15, objeto_alvo.largura, objeto_alvo.altura)
                    }
                } else if (objeto_alvo.altura >= 60) {
                    spritePredio3_background.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("predio3_background", 100, objeto_alvo.x - 1, chao_alvo - objeto_alvo.altura + 24, objeto_alvo.largura, objeto_alvo.altura)
                }
            }
        } else if (typeof alvo == "undefined") {
            if (objeto_alvo.altura > 80) {
                if (objeto_alvo.altura > 110) { // Amarelo
                    spritePredio2_1.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 50, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("predio2_1", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 48, objeto_alvo.largura, objeto_alvo.altura)
                } else if (objeto_alvo.altura > 100) { // Vermelho
                    spritePredio1_1.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("predio1_1", 100, objeto_alvo.x - 1, chao_alvo - objeto_alvo.altura + 23, objeto_alvo.largura, objeto_alvo.altura)
                } else if (objeto_alvo.altura > 90) { // Amarelo com Antena
                    spritePredio2_2.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("predio2_2", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 15, objeto_alvo.largura, objeto_alvo.altura)
                } else { // Vermelho com Antena
                    spritePredio1_2.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                    transitador("predio1_2", 100, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 15, objeto_alvo.largura, objeto_alvo.altura)
                }

            } else if (objeto_alvo.altura >= 60) {
                spritePredio3.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 25, objeto_alvo.largura, objeto_alvo.altura)
                transitador("predio3", 100, objeto_alvo.x - 1, chao_alvo - objeto_alvo.altura + 24, objeto_alvo.largura, objeto_alvo.altura)
            }
        }

        if (objeto_alvo.altura >= 57 && objeto_alvo.altura < 60) { // Diferente do Parque 
            spritePisao2.desenha(objeto_alvo.x, chao_alvo - 27, objeto_alvo.largura, objeto_alvo.altura)
            transitador("pisao2_noite", 100, objeto_alvo.x - 4, chao_alvo - 43, objeto_alvo.largura, objeto_alvo.altura)
        } else if (objeto_alvo.altura < 60) {
            spritePisao.desenha(objeto_alvo.x, chao_alvo - 40, objeto_alvo.largura, objeto_alvo.altura)
            transitador("pisao_noite", 100, objeto_alvo.x, chao_alvo - 40, objeto_alvo.largura, objeto_alvo.altura)
        }
    } else if (objeto_alvo.altura == 53) {
        spriteFonte.desenha(objeto_alvo.x, chao_alvo - 30, objeto_alvo.largura, objeto_alvo.altura)
        transitador("fonte_noite", 20, objeto_alvo.x, chao_alvo - 30, objeto_alvo.largura, objeto_alvo.altura)
    } else if (objeto_alvo.altura >= 50 && objeto_alvo.altura < 55) {
        spriteArvore.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 8, objeto_alvo.largura, objeto_alvo.altura)
        transitador("arvore1", 20, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 8, objeto_alvo.largura, objeto_alvo.altura)
    } else if (objeto_alvo.altura >= 45 && objeto_alvo.altura < 50) {
        spriteArvore_frutifera.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 13, objeto_alvo.largura, objeto_alvo.altura)
        transitador("arvore_frutifera", 20, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 13, objeto_alvo.largura, objeto_alvo.altura)
    } else if (objeto_alvo.altura >= 35 && objeto_alvo.altura < 45) {
        spriteArvore2.desenha(objeto_alvo.x, chao_alvo - 50, objeto_alvo.largura, objeto_alvo.altura)
        transitador("arvore2", 20, objeto_alvo.x, chao_alvo - 50, objeto_alvo.largura, objeto_alvo.altura)
    } else {
        spriteArbusto.desenha(objeto_alvo.x, chao_alvo - objeto_alvo.altura + 18, objeto_alvo.largura, objeto_alvo.altura)
        transitador("arbusto", 20, objeto_alvo.x, chao_alvo - objeto_alvo.altura + 18, objeto_alvo.largura, objeto_alvo.altura)
    }
}

function desenha_sombra(objeto_alvo, chao_alvo, local) {

    if (local) {
        if (jogo.evento == 0) {
            if (objeto_alvo.altura > 80) {
                if (objeto_alvo.altura > 90)
                    spriteSombraPredio1.desenha(objeto_alvo.x - 30, chao_alvo + 18, objeto_alvo.largura, objeto_alvo.altura)
                else
                    spriteSombraPredio_Antena.desenha(objeto_alvo.x - 18, chao_alvo + 15, objeto_alvo.largura, objeto_alvo.altura)
            } else if (objeto_alvo.altura >= 60)
                spriteSombraPredio2_1.desenha(objeto_alvo.x - 15, chao_alvo + 15, objeto_alvo.largura, objeto_alvo.altura)
        }
    } else {
        if (objeto_alvo.altura > 80) {
            if (objeto_alvo.altura > 90)
                spriteSombraPredio1.desenha(objeto_alvo.x - 30, chao_alvo + 18, objeto_alvo.largura, objeto_alvo.altura)
            else
                spriteSombraPredio_Antena.desenha(objeto_alvo.x - 18, chao_alvo + 15, objeto_alvo.largura, objeto_alvo.altura)
        } else if (objeto_alvo.altura >= 60)
            spriteSombraPredio2_1.desenha(objeto_alvo.x - 15, chao_alvo + 15, objeto_alvo.largura, objeto_alvo.altura)
    }

    if (objeto_alvo.altura >= 57 && objeto_alvo.altura < 60) {
        if (local != 2 && (jogo.evento != 0 || jogo.evento != 2))
            spriteSombraPisao2.desenha(objeto_alvo.x - 15, chao_alvo + 16, objeto_alvo.largura, objeto_alvo.altura)
    } else if (objeto_alvo.altura >= 55 && objeto_alvo.altura < 57) {
        if (local != 2 && (jogo.evento != 0 || jogo.evento != 2))
            spriteSombraPisao.desenha(objeto_alvo.x - 10, chao_alvo + 16, objeto_alvo.largura, objeto_alvo.altura)
    } else if (objeto_alvo.altura == 53)
        spriteSombraFonte.desenha(objeto_alvo.x - 4, chao_alvo + 18, objeto_alvo.largura, objeto_alvo.altura)
    else if (objeto_alvo.altura >= 50 && objeto_alvo.altura < 55)
        spriteSombra_Arvore.desenha(objeto_alvo.x - 10, chao_alvo + 12, objeto_alvo.largura, objeto_alvo.altura)
    else if (objeto_alvo.altura >= 45 && objeto_alvo.altura < 50)
        spriteSombra_ArvoreFrutifera.desenha(objeto_alvo.x + 5, chao_alvo + 10, objeto_alvo.largura, objeto_alvo.altura)
    else if (objeto_alvo.altura >= 35 && objeto_alvo.altura < 45)
        spriteSombra_Arvore2.desenha(objeto_alvo.x - 14, chao_alvo + 10, objeto_alvo.largura, objeto_alvo.altura)
}