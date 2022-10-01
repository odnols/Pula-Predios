function desenha_chao1() {
    if (((eventos.evento != 1 && eventos.evento != 3) || chao.muda_chao[2] < 2) && (chao.volta_chao[2] == 0 || chao.trava[2] == 1 || chao.reserva[0] == 2)) {
        spriteChao.desenha(chao.x2, chao.y - 5)
        transitador("chao_noite", chao.x2, chao.y - 5)
    }

    // Chão no momento de transição
    if (eventos.evento == 1 && chao.muda_chao[2] != 0 && chao.reserva[2] < 2) {
        spriteAgua.desenha(chao.x2 + opcoes.largura, chao.y + 10)
        transitador("agua_noite", chao.x2 + opcoes.largura, chao.y + 10)

    } else if (eventos.evento == 3 && chao.muda_chao[2] != 0 && chao.reserva[2] < 2)
        spriteLava.desenha(chao.x2 + opcoes.largura, chao.y + 10)

    else {
        spriteChao.desenha(chao.x2 + opcoes.largura, chao.y - 5)
        transitador("chao_noite", chao.x2 + opcoes.largura, chao.y - 5)
    }

    // Chão no meio do evento
    if (chao.muda_chao[2] == 2 || chao.libera_volta_chao[2] == 1 && chao.trava[2] == 0) {
        if (chao.reserva[2] <= 1) {
            if (eventos.ultimo_evento == 1) {
                spriteAgua.desenha(chao.x2, chao.y + 10)
                transitador("agua_noite", chao.x2, chao.y + 10)

            } else if (eventos.ultimo_evento == 3)
                spriteLava.desenha(chao.x2, chao.y + 10)
        }
    }

    // Chão retornando e fazendo transição
    if (chao.volta_chao[2] == 1 && chao.libera_volta_chao[2] == 1) {
        spriteChao.desenha(chao.x2 + opcoes.largura, chao.y - 5)
        transitador("chao_noite", chao.x2 + opcoes.largura, chao.y - 5)
    }

    if (chao.reserva[2] == 1) {
        spriteChao.desenha(chao.x2 + opcoes.largura, chao.y - 5)
        transitador("chao_noite", chao.x2 + opcoes.largura, chao.y - 5)
    }
}

function desenha_chao2() {
    if (((eventos.evento != 1 && eventos.evento != 3) || chao.muda_chao[1] < 2) && (chao.volta_chao[1] == 0 || chao.trava[1] == 1 || chao.reserva[1] == 2)) {
        spriteChao.desenha(chao.x, chao.y + 10)
        transitador("chao_noite", chao.x, chao.y + 10)
    }


    if (chao.muda_chao[1] != 0 && chao.reserva[1] < 2 && jogo.status != estados.ocioso) {
        if (eventos.evento == 1) {
            spriteAgua.desenha(chao.x + opcoes.largura, chao.y + 22)
            transitador("agua_noite", chao.x + opcoes.largura, chao.y + 22)

        } else if (eventos.evento == 3 && chao.muda_chao[1] != 0 && chao.reserva[1] < 2)
            spriteLava.desenha(chao.x + opcoes.largura, chao.y + 22)

    } else {
        spriteChao.desenha(chao.x + opcoes.largura, chao.y + 10)
        transitador("chao_noite", chao.x + opcoes.largura, chao.y + 10)
    }

    if (chao.muda_chao[1] == 2 || chao.libera_volta_chao[1] == 1 && chao.trava[1] == 0) {
        if (chao.reserva[1] <= 1 && jogo.status != estados.ocioso) {
            if (eventos.ultimo_evento == 1) {
                spriteAgua.desenha(chao.x, chao.y + 22)
                transitador("agua_noite", chao.x, chao.y + 22)

            } else if (eventos.ultimo_evento == 3)
                spriteLava.desenha(chao.x, chao.y + 22)
        }
    }

    if (jogo.status == estados.ocioso) {
        spriteChao.desenha(chao.x, chao.y + 10)
        transitador("chao_noite", chao.x, chao.y + 10)
    }

    if (chao.volta_chao[1] == 1 && chao.libera_volta_chao[1] == 1) {
        spriteChao.desenha(chao.x + opcoes.largura, chao.y + 10)
        transitador("chao_noite", chao.x + opcoes.largura, chao.y + 10)
    }

    if (chao.reserva[1] == 1) {
        spriteChao.desenha(chao.x + opcoes.largura, chao.y + 10)
        transitador("chao_noite", chao.x + opcoes.largura, chao.y + 10)
    }
    if (chao.reserva[1] == 2) {
        spriteChao.desenha(chao.x + opcoes.largura, chao.y + 10)
        transitador("chao_noite", chao.x + opcoes.largura, chao.y + 10)
    }
}

function desenha_chao3() {
    if (((eventos.evento != 1 && eventos.evento != 3) || chao.muda_chao[0] < 2) && (chao.volta_chao[0] == 0 || chao.trava[0] == 1)) {
        spriteChao.desenha(chao.x3, chao.y + 27)
        transitador("chao_noite", chao.x3, chao.y + 27)
    }

    if (chao.muda_chao[0] != 0 && chao.reserva[0] < 2) {
        if (eventos.evento == 1) {
            spriteAgua.desenha(chao.x3 + opcoes.largura, chao.y + 40)
            transitador("agua_noite", chao.x3 + opcoes.largura, chao.y + 40)

        } else if (eventos.evento == 3 && chao.muda_chao[0] != 0 && chao.reserva[0] < 2)
            spriteLava.desenha(chao.x3 + opcoes.largura, chao.y + 35)

    } else {
        spriteChao.desenha(chao.x3 + opcoes.largura, chao.y + 27)
        transitador("chao_noite", chao.x3 + opcoes.largura, chao.y + 27)
    }

    if (chao.muda_chao[0] == 2 || chao.libera_volta_chao[0] == 1 && chao.trava[0] == 0) {
        if (chao.reserva[0] <= 1) {
            if (eventos.ultimo_evento == 1) {
                spriteAgua.desenha(chao.x3, chao.y + 40)
                transitador("agua_noite", chao.x3, chao.y + 40)
            }

            if (eventos.ultimo_evento == 3)
                spriteLava.desenha(chao.x3, chao.y + 35)
        }
    }

    if (chao.volta_chao[0] == 1 && chao.libera_volta_chao[0] == 1) {
        spriteChao.desenha(chao.x3 + opcoes.largura, chao.y + 27)
        transitador("chao_noite", chao.x3 + opcoes.largura, chao.y + 27)
    }

    if (chao.reserva[0] == 1) {
        spriteChao.desenha(chao.x3 + opcoes.largura, chao.y + 27)
        transitador("chao_noite", chao.x3 + opcoes.largura, chao.y + 27)
    }
    if (chao.reserva[0] == 2) {
        spriteChao.desenha(chao.x3 + opcoes.largura, chao.y + 27)
        transitador("chao_noite", chao.x3 + opcoes.largura, chao.y + 27)
    }
}