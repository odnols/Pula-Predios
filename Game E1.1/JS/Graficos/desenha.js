function desenha_propsfundo(){

    for(var x = 0, tam = propsfundo._obsfundo.length; x < tam; x++){
        var obsb = propsfundo._obsfundo[x];

        if(obsb.altura >= 55){
            if(obsb.altura > 80){
                if(obsb.altura > 110){ // Amarelo
                    spritePredio2_1_background.desenha(obsb.x, chao.y - obsb.altura + 50, obsb.largura, obsb.altura);
                    transitador("predio2_1_background", 100, obsb.x, chao.y - obsb.altura + 48, obsb.largura, obsb.altura);
                }else if(obsb.altura > 100){ // Vermelho
                    spritePredio1_1_background.desenha(obsb.x, chao.y - obsb.altura + 25, obsb.largura, obsb.altura);
                    transitador("predio1_1_background", 100, obsb.x - 1, chao.y - obsb.altura + 23, obsb.largura, obsb.altura);
                }else if(obsb.altura > 90){ // Amarelo com Antena
                    spritePredio2_2_background.desenha(obsb.x, chao.y - obsb.altura + 25, obsb.largura, obsb.altura);
                    transitador("predio2_2_background", 100, obsb.x, chao.y - obsb.altura + 15, obsb.largura, obsb.altura);
                }else{ // Vermelho com Antena
                    spritePredio1_2_background.desenha(obsb.x, chao.y - obsb.altura + 25, obsb.largura, obsb.altura);
                    transitador("predio1_2_background", 100, obsb.x, chao.y - obsb.altura + 15, obsb.largura, obsb.altura);
                }
            }else if(obsb.altura >= 60){
                spritePredio3_background.desenha(obsb.x, chao.y - obsb.altura + 25 , obsb.largura, obsb.altura);
                transitador("predio3_background", 100, obsb.x - 1, chao.y - obsb.altura + 24, obsb.largura, obsb.altura);
            }else if(obsb.altura >= 57){ // Diferente do Parque 
                spritePisao2.desenha(obsb.x, chao.y - 27, obsb.largura, obsb.altura);
                transitador("pisao2_noite", 100, obsb.x - 4, chao.y - 43, obsb.largura, obsb.altura);
            }else{
                spritePisao.desenha(obsb.x, chao.y - 40, obsb.largura, obsb.altura);
                transitador("pisao_noite", 100, obsb.x, chao.y - 40, obsb.largura, obsb.altura);
            }
        }else if(obsb.altura == 53){
            spriteFonte.desenha(obsb.x, chao.y - 30, obsb.largura, obsb.altura);
            transitador("fonte_noite", 20, obsb.x, chao.y - 30, obsb.largura, obsb.altura);
        }else if(obsb.altura >= 50 && obsb.altura < 55){
            spriteArvore.desenha(obsb.x, chao.y - obsb.altura + 8, obsb.largura, obsb.altura);
            transitador("arvore1", 20, obsb.x, chao.y - obsb.altura + 8, obsb.largura, obsb.altura);
        }else if(obsb.altura >= 45 && obsb.altura < 50){
            spriteArvore_frutifera.desenha(obsb.x, chao.y - obsb.altura + 13, obsb.largura, obsb.altura);
            transitador("arvore_frutifera", 20, obsb.x, chao.y - obsb.altura + 13, obsb.largura, obsb.altura);
        }else if(obsb.altura >= 35 && obsb.altura < 45){
            spriteArvore2.desenha(obsb.x, chao.y - 50 , obsb.largura, obsb.altura);
            transitador("arvore2", 20, obsb.x, chao.y - 50, obsb.largura, obsb.altura);
        }else{
            spriteArbusto.desenha(obsb.x, chao.y - obsb.altura + 18, obsb.largura, obsb.altura);
            transitador("arbusto", 20, obsb.x, chao.y - obsb.altura + 18, obsb.largura, obsb.altura);
        }
    }

    chao.desenha();

    for(var x = 0, tam = propsfundo._obsfundo.length; x < tam; x++){
        var obsb = propsfundo._obsfundo[x];

        // Sombra dos objetos
        if(obsb.altura > 80){
            if(obsb.altura > 90)
                spriteSombraPredio1.desenha(obsb.x - 28, chao.y, obsb.largura, obsb.altura);
            else
                spriteSombraPredio_Antena.desenha(obsb.x - 18, chao.y, obsb.largura, obsb.altura);
        }else if(obsb.altura >= 60)
            spriteSombraPredio2_1.desenha(obsb.x - 17, chao.y, obsb.largura, obsb.altura);
        else if(obsb.altura >= 57)
            spriteSombraPisao2.desenha(obsb.x - 15, chao.y + 2, obsb.largura, obsb.altura);
        else if(obsb.altura == 53)
            spriteSombraFonte.desenha(obsb.x - 4, chao.y + 2, obsb.largura, obsb.altura);
        else if(obsb.altura >= 55 && obsb.altura < 57)
            spriteSombraPisao.desenha(obsb.x - 10, chao.y, obsb.largura, obsb.altura);
        else if(obsb.altura >= 50 && obsb.altura < 55)
            spriteSombra_Arvore.desenha(obsb.x - 11, chao.y, obsb.largura, obsb.altura);
        else if(obsb.altura >= 45 && obsb.altura < 50)
            spriteSombra_ArvoreFrutifera.desenha(obsb.x - 8, chao.y, obsb.largura, obsb.altura);
        else if(obsb.altura >= 35 && obsb.altura < 45)
            spriteSombra_Arvore2.desenha(obsb.x - 15, chao.y, obsb.largura, obsb.altura);
    }
}

function desenha_obj(){

    for(var i = 0, tam = obstaculos._obs.length; i < tam; i++){
        var obs = obstaculos._obs[i];

        if(obs.altura >= 60){
            if(obs.altura > 110){ // Amarelo
                spritePredio2_1.desenha(obs.x, chao.y - obs.altura + 25, obs.largura, obs.altura);
                transitador("predio2_1", 100, obs.x, chao.y - obs.altura + 23, obs.largura, obs.altura);
            }else if(obs.altura > 100){  // Vermelho
                spritePredio1_1.desenha(obs.x, chao.y - obs.altura + 25 , obs.largura, obs.altura);
                transitador("predio1_1", 100, obs.x - 1, chao.y - obs.altura + 25, obs.largura, obs.altura);
            }else if(obs.altura > 90){ // Amarelo com Antena
                spritePredio2_2.desenha(obs.x, chao.y - obs.altura + 25, obs.largura, obs.altura);
                transitador("predio2_2", 100, obs.x, chao.y - obs.altura + 16, obs.largura, obs.altura);
            }else if( obs.altura > 80){ // Vermelho com Antena
                spritePredio1_2.desenha(obs.x, chao.y - obs.altura + 25, obs.largura, obs.altura);
                transitador("predio1_2", 100, obs.x, chao.y - obs.altura + 15, obs.largura, obs.altura);
            }else{
                spritePredio3.desenha(obs.x, chao.y - obs.altura + 25, obs.largura, obs.altura);
                transitador("predio3", 100, obs.x - 1, chao.y - obs.altura + 24, obs.largura, obs.altura);
            }
        }else if(obs.altura >= 57){
            spritePisao2.desenha(obs.x, chao.y - 10, obs.largura, obs.altura);
            transitador("pisao2_noite", 100, obs.x - 4, chao.y - 26, obs.largura, obs.altura);
        }else if(obs.altura >= 55 && obs.altura < 57){
            spritePisao.desenha(obs.x, chao.y - 25, obs.largura, obs.altura);
            transitador("pisao_noite", 100, obs.x, chao.y - 25, obs.largura, obs.altura);
        }else if(obs.altura == 53){
            spriteFonte.desenha(obs.x, chao.y - obs.altura + 40, obs.largura, obs.altura);
            transitador("fonte_noite", 20, obs.x, chao.y - obs.altura + 40, obs.largura, obs.altura);
        }else if(obs.altura >= 50 && obs.altura < 55){
            spriteArvore.desenha(obs.x, chao.y - obs.altura + 25 , obs.largura, obs.altura);
            transitador("arvore1", 20, obs.x, chao.y - obs.altura + 25, obs.largura, obs.altura);
        }else if(obs.altura >= 45 && obs.altura < 50){
            spriteArvore_frutifera.desenha(obs.x + 10, chao.y - obs.altura + 25 , obs.largura, obs.altura);
            transitador("arvore_frutifera", 20, obs.x + 10, chao.y - obs.altura + 25, obs.largura, obs.altura);
        }else if(obs.altura >= 35 && obs.altura < 45){
            spriteArvore2.desenha(obs.x, chao.y - 35 , obs.largura, obs.altura);
            transitador("arvore2", 20, obs.x, chao.y - 35, obs.largura, obs.altura);
        }else{
            spriteArbusto.desenha(obs.x, chao.y - obs.altura + 36 , obs.largura, obs.altura);
            transitador("arbusto", 20, obs.x, chao.y - obs.altura + 36, obs.largura, obs.altura);
        }
    }

    chao.desenha2();
    jogador.desenha();

    for(var i = 0, tam = obstaculos._obs.length; i < tam; i++){
        var obs = obstaculos._obs[i];

        // Sombra dos objetos
        if(obs.altura > 80){
            if(obs.altura > 90)
                spriteSombraPredio1.desenha(obs.x - 30, chao.y + 18, obs.largura, obs.altura);
            else
                spriteSombraPredio_Antena.desenha(obs.x - 18, chao.y + 15 , obs.largura, obs.altura);
        }else if(obs.altura >= 60)
            spriteSombraPredio2_1.desenha(obs.x - 15, chao.y + 15, obs.largura, obs.altura);

        else if(obs.altura >= 57 && obs.altura < 60)
            spriteSombraPisao2.desenha(obs.x - 15, chao.y + 16, obs.largura, obs.altura);
        else if(obs.altura >= 55 && obs.altura < 57)
            spriteSombraPisao.desenha(obs.x - 10, chao.y + 16, obs.largura, obs.altura);
        else if(obs.altura == 53)
            spriteSombraFonte.desenha(obs.x - 4, chao.y + 18, obs.largura, obs.altura);
        else if(obs.altura >= 50 && obs.altura < 55)
            spriteSombra_Arvore.desenha(obs.x - 10, chao.y + 12 , obs.largura, obs.altura);
        else if(obs.altura >= 45 && obs.altura < 50)
            spriteSombra_ArvoreFrutifera.desenha(obs.x + 5, chao.y + 10, obs.largura, obs.altura);
        else if(obs.altura >= 35 && obs.altura < 45)
            spriteSombra_Arvore2.desenha(obs.x - 14, chao.y + 10, obs.largura, obs.altura);
    }
}

function desenha_propsfrente(){

    for(var x = 0, tam = propsfrente._obsfrente.length; x < tam; x++){
        var obsf = propsfrente._obsfrente[x];

        if(obsf.altura == 55){
            if(jogo.ultimo_evento == 0 || jogo.evento == 0){ // Área Densa
                spritePoste1.desenha(obsf.x, chao.y - obsf.altura + 40, obsf.largura, obsf.altura);
                transitador("poste1_noite", 20, obsf.x - 11, chao.y - 16, obsf.altura);
            }else if(jogo.ultimo_evento == 2){ // Parque
                spritePoste2.desenha(obsf.x, chao.y - 5, obsf.largura, obsf.altura);
                transitador("poste2_noite", 20, obsf.x - 10, chao.y - 14, obsf.altura);
            }
        }

        if(obsf.altura == 53){
            spriteFonte.desenha(obsf.x, chao.y + 1, obsf.largura, obsf.altura);
            transitador("fonte_noite", 20, obsf.x, chao.y + 1, obsf.largura, obsf.altura);
        }else if(obsf.altura >= 50 && obsf.altura < 55){
            spriteArvore.desenha(obsf.x, chao.y - obsf.altura + 40, obsf.largura, obsf.altura);
            transitador("arvore1", 20, obsf.x, chao.y - obsf.altura + 40, obsf.largura, obsf.altura);
        }else if(obsf.altura >= 45 && obsf.altura < 50){
            spriteArvore_frutifera.desenha(obsf.x, chao.y - 5, obsf.largura, obsf.altura);
            transitador("arvore_frutifera", 20, obsf.x, chao.y - 5, obsf.largura, obsf.altura);
        }else if(obsf.altura >= 35 && obsf.altura < 45){
            spriteArvore2.desenha(obsf.x, chao.y - 20, obsf.largura, obsf.altura);
            transitador("arvore2", 20, obsf.x, chao.y - 20, obsf.largura, obsf.altura);
        }else{
            spriteArbusto.desenha(obsf.x, chao.y + 25, obsf.largura, obsf.altura);
            transitador("arbusto", 20, obsf.x, chao.y + 25, obsf.largura, obsf.altura);
        }
    }

    chao.desenha3();

    for(var x = 0, tam = propsfrente._obsfrente.length; x < tam; x++){
        var obsf = propsfrente._obsfrente[x];

        if(obsf.altura == 53)
            spriteSombraFonte.desenha(obsf.x - 5, chao.y + 35, obsf.largura, obsf.altura);
        else if(obsf.altura >= 50 && obsf.altura < 55)
            spriteSombra_Arvore.desenha(obsf.x - 11, chao.y + 30, obsf.largura, obsf.altura);
        else if(obsf.altura >= 45 && obsf.altura < 50)
            spriteSombra_ArvoreFrutifera.desenha(obsf.x - 8, chao.y + 25, obsf.largura, obsf.altura);
        else if(obsf.altura >= 35 && obsf.altura < 45)
            spriteSombra_Arvore2.desenha(obsf.x - 15, chao.y + 30, obsf.largura, obsf.altura);
    }
    
    if(estadoAtual != estados.perdeu)
        if(jogador.chao_referencia != 650)
            if(chao.muda_chao[0] < 2 || jogo.evento != 3)
                    spriteSombraJogador.desenha(jogador.x - 48, 1000 - jogador.y);
    else if(jogador.y >= 500)
            spriteSombraJogador.desenha(jogador.x - 48, jogador.y + 135);
}