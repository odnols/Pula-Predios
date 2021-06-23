function botoes(tecla){

    var SAIR = 27;

    if(estadoAtual == estados.jogar)
        executaSons2("efeitos", "hat.ogg", 1);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(inicia_game == 1){

        switch(tecla){
            // case 49: // 1 -> evento
            //     if(jogo.evento != 0){
            //         jogo.evento = 0;
            //         Cenario_sprites.opacidade_noite = 1.0;

            //         timer = setTimeout(function(){
            //             jogador.y = 200;
            //             gravidade = 0;
            //         }, 100);
            //     }else{
            //         jogo.evento = null;
            //         Cenario_sprites.opacidade_noite = 0.0;
            //         anoitecer();
            //     }
            // break;
            // case 50:
            //     inverte_tempo();

            //     console.log(Cenario_sprites.opacidade_noite);
            // break;
            // case 80:
            // case 112:
            //     if(velocidade_obs != 0){
            //         velocidade_obs = 0;
            //         obstaculos.tempoInsere = 0;

            //     }else{
            //         velocidade_obs = 10;
            //         obstaculos.tempoInsere = 40;
                    
            //     }
            // break;
            case 76:  // l
            case 108: // L
                troca_pagina(4);
                $("#boas_vindas").fadeToggle();

                $("#tutorial").fadeOut("slow", "linear");
                $("#controles").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
            break;
            case 116: // t
            case 84:  // T
                $("#tutorial").fadeToggle(200, "linear");


                $("#controles").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 99:  // C
            case 67:  // c
                $("#controles").fadeToggle(200, "linear");

                $("#tutorial").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 101: // e
            case 69:  // E
                $("#estatistic").fadeToggle(200, "linear");

                $("#tutorial").fadeOut("slow", "linear");
                $("#controles").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 120: // l
            case 88:  // L
                abre_loja();
                
                $("#tutorial").fadeOut("slow", "linear");
                $("#controles").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();

                $("#sessao_loja").fadeOut();
            break;
            case 113: // q
            case 81:  // Q
                $("#opcoes").fadeToggle(200, "linear");

                $("#tutorial").fadeOut("slow", "linear");
                $("#controles").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 122: // z
            case 90:  // Z
                $("#configuracoes").fadeToggle(200, "linear");

                $("#tutorial").fadeOut("slow", "linear");
                $("#controles").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#opcoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            default:
                if(estado_loja != 1){
                    $("#tutorial").fadeOut();
                    $("#controles").fadeOut();
                    $("#estatistic").fadeOut();
                    $("#configuracoes").fadeOut();
                    $("#opcoes").fadeOut();
                    $("#boas_vindas").fadeOut();
                }
                
                if(estadoAtual == estados.jogando){
                    $("#notifica_moeda").fadeOut();
                    $("#puxador_loja").fadeOut();
                }
            break;
        }
    }
}

function clique(evento){

    if(evento == 114)
        document.location.reload(true);
    
    if(!event.keyCode && inicia_game == 1 && estadoAtual != estados.perdeu){
        if(estadoAtual == estados.jogando){

            evento = evento || window.event;

            // Controles do Mouse e cliques
            var button = evento.which || evento.button;

            if(button == 1)
                // ação para o botão esquerdo 
                jogador.pula();
            else if(button == 2){
                // ação para a rodinha do mouse
                // if(jogo.timer_especial >= 5)
                    // jogo.operador();
            }else if(button == 3)
                // ação para o botão direito 
                if((jogo.timer_especial == 5 && jogador.especs_comprados[1] == 0 ) || jogo.timer_especial == 10) 
                    jogador.especial();
            
            botoes(600);
        }

        if(estadoAtual == estados.jogar && estado_loja != 1)
            inicia_jogo();

        if(estadoAtual == estados.ocioso)
            estadoOcioso("volta");
    }else{
        if(inicia_game == 1)
            var tecla = event.keyCode;
        
    //  Controles da partida em Andamento
        if(estadoAtual == estados.jogando){
            switch(tecla){
                case 49: // 1 -> evento cidade
                    jogo.evento();
                break;
                case 32:  // Espaço
                case 119: // w
                case 87:  // W
                    jogador.pula();
                break;
                case 13:  // Enter
                case 100: // d
                case 68:  // D
                    if(especial != 1 && jogador.qtdEspeciais > 0 && ((jogo.timer_especial == 5 && jogador.especs_comprados[1] == 0) || (jogo.timer_especial == 10 && jogador.especs_comprados[1] == 1) || (jogo.timer_especial == 10 && jogador.especs_comprados[1] == 0) || (jogo.timer_especial == 5 && jogador.especs_comprados[1] == 1))) // +Vezes
                        jogador.especial();
                    else
                break;
                case 114: // r
                case 82:  // R
                    if(jogo.timer_especial >= 5)
                        jogo.operador();
                break;
            }

        }else if(estadoAtual == estados.jogar && (tecla == 32 || tecla == 87 || tecla == 119) && estado_loja != 1)
            inicia_jogo();
        else if(estadoAtual == estados.perdeu && jogador.y >= 10 * Altura){
            estadoAtual = estados.jogar;
            reseta();

        }else if(estadoAtual == estados.jogar){
            if(tecla == 114 || tecla == 82) // R
                document.location.reload(true);
            else
                botoes(tecla);
        }

        if(estadoAtual == estados.ocioso)
            estadoOcioso("volta");
    }
}