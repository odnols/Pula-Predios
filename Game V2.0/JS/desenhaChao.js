function desenha_chao1(){
    if((jogo.evento != 1 || chao.muda_chao[2] < 2) && (chao.volta_chao[2] == 0 || chao.trava[2] == 1 || chao.reserva[0] == 2)){
        spriteChao.desenha(chao.x2, chao.y - 5);
        transitador("chao_noite", 46, chao.x2, chao.y - 5);
    }

    if(jogo.evento == 1 && chao.muda_chao[2] != 0 && chao.reserva[2] < 2){
        spriteAgua.desenha(chao.x2 + Largura, chao.y + 10);
        transitador("agua_noite", 66, chao.x2 + Largura, chao.y + 10);
    }else{
        spriteChao.desenha(chao.x2 + Largura, chao.y - 5);
        transitador("chao_noite", 46, chao.x2 + Largura, chao.y - 5);
    }

    if(chao.muda_chao[2] == 2 || chao.libera_volta_chao[2] == 1 && chao.trava[2] == 0){
        if(chao.reserva[2] <= 1){
            spriteAgua.desenha(chao.x2, chao.y + 10);
            transitador("agua_noite", 66, chao.x2 - 10, chao.y + 10);
        }
    }

    if(chao.volta_chao[2] == 1 && chao.libera_volta_chao[2] == 1){
        spriteChao.desenha(chao.x2 + Largura, chao.y - 5);
        transitador("chao_noite", 46, chao.x2 + Largura, chao.y - 5);
    }

    if(chao.reserva[2] == 1){
        spriteChao.desenha(chao.x2 + Largura, chao.y - 5);
        transitador("chao_noite", 46, chao.x2 + Largura, chao.y - 5);
    }
}

function desenha_chao2(){
    if((jogo.evento != 1 || chao.muda_chao[1] < 2) && (chao.volta_chao[1] == 0 || chao.trava[1] == 1 || chao.reserva[1] == 2)){
        spriteChao.desenha(chao.x, chao.y + 10);
        transitador("chao_noite", 46, chao.x, chao.y + 10);
    }

    if(jogo.evento == 1 && chao.muda_chao[1] != 0 && chao.reserva[1] < 2){
        spriteAgua.desenha(chao.x + Largura, chao.y + 22);
        transitador("agua_noite", 66, chao.x + Largura, chao.y + 22);
    }else{
        spriteChao.desenha(chao.x + Largura, chao.y + 10);
        transitador("chao_noite", 46, chao.x + Largura, chao.y + 10);
    }

    if(chao.muda_chao[1] == 2 || chao.libera_volta_chao[1] == 1 && chao.trava[1] == 0){
        if(chao.reserva[1] <= 1){
            spriteAgua.desenha(chao.x, chao.y + 22);
            transitador("agua_noite", 66, chao.x - 10, chao.y + 22);
        }
    }

    if(chao.volta_chao[1] == 1 && chao.libera_volta_chao[1] == 1){
        spriteChao.desenha(chao.x + Largura, chao.y + 10);
        transitador("chao_noite", 46, chao.x + Largura, chao.y + 10);
    }

    if(chao.reserva[1] == 1){
        spriteChao.desenha(chao.x + Largura, chao.y + 10);
        transitador("chao_noite", 46, chao.x + Largura, chao.y + 10);
    }
    if(chao.reserva[1] == 2){
        spriteChao.desenha(chao.x + Largura, chao.y + 10);
        transitador("chao_noite", 46, chao.x + Largura, chao.y + 10);
    }
}

function desenha_chao3(){
    if((jogo.evento != 1 || chao.muda_chao[0] < 2) && (chao.volta_chao[0] == 0 || chao.trava[0] == 1)){
        spriteChao.desenha(chao.x3, chao.y + 27);
        transitador("chao_noite", 46, chao.x3, chao.y + 27);
    }

    if(jogo.evento == 1 && chao.muda_chao[0] != 0 && chao.reserva[0] < 2){
        spriteAgua.desenha(chao.x3 + Largura, chao.y + 40);
        transitador("agua_noite", 66, chao.x3 + Largura, chao.y + 40);
    }else{
        spriteChao.desenha(chao.x3 + Largura, chao.y + 27);
        transitador("chao_noite", 46, chao.x3 + Largura, chao.y + 27);
    }

    if((chao.muda_chao[0] == 2 || chao.libera_volta_chao[0] == 1) && chao.trava[0] == 0){
        if(chao.reserva[0] <= 1){
            spriteAgua.desenha(chao.x3, chao.y + 40);
            transitador("agua_noite", 66, chao.x3 - 10, chao.y + 40);
        }
    }

    if(chao.volta_chao[0] == 1 && chao.libera_volta_chao[0] == 1){
        spriteChao.desenha(chao.x3 + Largura, chao.y + 27);
        transitador("chao_noite", 46, chao.x3 + Largura, chao.y + 27);
    }

    if(chao.reserva[0] == 1){
        spriteChao.desenha(chao.x3 + Largura, chao.y + 27);
        transitador("chao_noite", 46, chao.x3 + Largura, chao.y + 27);
    }
    if(chao.reserva[0] == 2){
        spriteChao.desenha(chao.x3, chao.y + 27);
        transitador("chao_noite", 46, chao.x3, chao.y + 27);
    }
}