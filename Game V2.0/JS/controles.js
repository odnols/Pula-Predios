function botoes(tecla){

    if(estadoAtual == estados.jogar)
        executaSons2("efeitos", "hat.ogg", 1);

    if(inicia_game == 1){
        switch(tecla){
            case 49:  // 1
                inverte_tempo();
            break;
            case 76:  // l
            case 108: // L
                troca_pagina(4);
                $("#boas_vindas").fadeToggle();
            break;
            case 99:  // C
            case 67:  // c
                $("#comandos").fadeToggle(400, "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 101: // e
            case 69:  // E
                $("#comandos").fadeOut("slow", "linear");
                $("#estatistic").fadeToggle(200, "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 113: // q
            case 81:  // Q
                $("#comandos").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeToggle("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 120: // l
            case 88:  // L
                // abre_loja();
                $("#comandos").fadeOut("slow", "linear");
                $("#estatistic").fadeOut("slow", "linear");
                $("#configuracoes").fadeOut("slow", "linear");
                $("#boas_vindas").fadeOut();
            break;
            case 80:
            case 112:
                // if(velocidade_obs == 10){
                //     velocidade_obs = 0;
                //     document.getElementById("velocity").innerHTML = "Pausado";
                // }else
                //     velocidade_obs = 10;
                
                // $("#metros_s").toggle();
            break;
            default:
                if(estado_loja != 1){
                    $("#comandos").fadeOut();
                    $("#estatistic").fadeOut();
                    $("#configuracoes").fadeOut();
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
                if(jogo.timer_especial >= 5) 
                    jogador.especial();
            
            botoes(600);
        }

        if(estadoAtual == estados.jogar && estado_loja != 1)
            inicia_jogo();
    }else{
        if(inicia_game == 1)
            var tecla = event.keyCode;

    //  Controles da partida em Andamento
        if(estadoAtual == estados.jogando){
            switch(tecla){
                case 32:  // Espaço
                case 119: // w
                case 87:  // W
                    jogador.pula();
                break;
                case 13:  // Enter
                case 100: // d
                case 68:  // D
                    if(especial != 1 && jogo.timer_especial == 5)
                        jogador.especial();
                break;
                case 114: // r
                case 82:  // R
                    // if(jogo.timer_especial >= 5)
                    //     jogo.operador();
                break;
                case 113: // q
                case 81:  // Q
                    clearInterval(ativa_evento);
                    clearTimeout(deleta_cronometro);

                    jogo.inicia_evento = 1;
                    jogo.contador_tempo_evento = 180;
                    jogo.eventos();
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
    }
}