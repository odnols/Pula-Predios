function boasVindas(){

    $("#boas_vindas").fadeOut();
    $("#log_").fadeIn();

    localStorage.setItem("iniciaLoucura_01a01f", 1);  
    inicia_game = 1;

    executaSons("musicas", "intro.ogg", 2);

}

function inicia_jogo(){

    estadoAtual = estados.jogando;

    if(typeof regulador_som != "undefined")
        clearInterval(regulador_som);

    if(segura_som == 0){
        executaSons("efeitos", escolhe_som(1, 0), 1);
        segura_som++;
    }

    executaSons2("musicas", "aa.mp3", 2);

    botoes(600);

    jogo.relogio_eventos();

    clearInterval(var_timer_especial);
}

function regula_velocidade(){
    regula_velo = setInterval(function(){
        if(velocidade_obs > 10){
            velocidade_obs--;
        }else
            clearInterval(regula_velo);
    }, 100);
}

function menu_inicial(argu){

    if(argu == 1)
        $("#menu_inicial").fadeIn();
    else
        $("#menu_inicial").fadeOut();
}

function troca_pagina(pag){
    
    $("#comandos").fadeOut();
    $("#estatistic").fadeOut();
    $("#configuracoes").fadeOut();

    if(pag == 2){
        document.getElementById("pag1").style.display = "none";
        document.getElementById("pag3").style.display = "none";
        $("#pag2").fadeIn();
    }else if(pag == 3){
        document.getElementById("pag2").style.display = "none";
        document.getElementById("pag4").style.display = "none";
        $("#pag3").fadeIn();
    }else if(pag == 4){
        document.getElementById("pag3").style.display = "none";
        document.getElementById("pag1").style.display = "none";
        $("#pag4").fadeIn();
    }else{
        document.getElementById("pag2").style.display = "none";
        $("#pag1").fadeIn();
    }
}

function limpa_chao(){

    chao.trava = [0, 0, 0];
    chao.libera_volta_chao = [0, 0, 0];

    chao.reserva = [0, 0, 0];
    chao.muda_chao = [0, 0, 0];
    chao.volta_chao = [0, 0, 0];
}

function abrir_arquivo(){

    varWindow = window.open(
        'log.html',
        'pagina',
        "width=850, height=500, top=100, left=110, scrollbars=no ");
}

function abre_loja(){

    $("#loja").fadeToggle();

    if(estado_loja == 0){
        document.getElementById("moedas").style.animation = "move_moeda 1s";
        document.getElementById("moedas").style.right = "4%";
        estado_loja = 1;
    }else{
        document.getElementById("moedas").style.animation = "volta_moeda 1s";
        document.getElementById("moedas").style.right = "14%";
        estado_loja = 0;
    }
}

function animaMoeda(){

    tID = setInterval( function(){
        document.getElementById("moeda_img").style.backgroundPosition = posicao +'px 0px';
        
        if( posicao > 0 )
            posicao -= 114;
        else{
            posicao = 912;
            clearInterval(tID);
            
            setTimeout(function(){
                animaMoeda();
            }, 1000);
        }
    }, 100);
}

function pisao_neles(){
    
    var moeda_ev;

    //  Efeito de Pisão
    jogador.qtdPulos++;
    jogador.pula();

    if(jogo.inicia_evento == 0)
        moeda_ev = 5;
    else
        moeda_ev = 0;

    jogo.notifica("Pisão Neles! +3 Pontos", "yellow");

    var ganha = moeda_ev + Math.round(3 * Math.random());

    if( ganha > 0 ){
        moedas += ganha;

        executaSons("pisoes", "moeda.ogg", 1);

        document.getElementById("notifica_moeda").innerHTML = "+ "+ ganha;
        $("#notifica_moeda").fadeIn();
        
        esconde_moeda = setTimeout(function(){
            $("#notifica_moeda").fadeOut();

            clearTimeout(esconde_moeda);
        }, 1000);
    }else
        executaSons("efeitos", "batida.ogg", 1);
    
    contador_pisoes++;
    jogador.score += 3;
    jogador.moedas += moedas;

}

function finaliza_evento(){

    jogo.notifica(jogo.saida_evento[jogo.inicia_evento], "white");

    clearTimeout(tempo_evento);
    clearTimeout(ativa_evento);

    jogo.evento = null;
    jogo.inicia_evento = null;
    chao.muda_chao = [0, 0, 0];
    
    jogo.relogio_eventos();

    executaSons2("efeitos", "levelup.ogg", 1);
}

function aleatorizaProp(){

    var prop = Math.round(8 * Math.random());
    aleatorizadorProp = prop;
}

function MsgPerdeu(causa){

    if(causa != 1)
        executaSons2("efeitos", "batida.ogg", 1);

    if(controle == 0 && estadoAtual == estados.perdeu){

        controle = 1;

        if(jogador.score > record)
            labelPontuacao.texto = "Novo Recorde! ( " + jogador.score + " )";
        else{
            x = 1 + Math.round(8 * Math.random());

            if(causa != 1 && x != 8)
                nome = escolhe_som(2, 0);
            else if(x == 8)
                nome = "morreu_5.ogg";
            else
                nome = escolhe_som(2, 1);

            executaSons("efeitos2", nome, 1); // Usado para o Som de meme ao morrer

            if(causa == null){

                if(x == 1)
                    labelPontuacao.texto = "Faliceu D:";
                else if(x == 2)
                    labelPontuacao.texto = "Teve uma batida ali!";
                else if(x == 3)
                    labelPontuacao.texto = "Capotou o Prédio";
                else if(x == 4)
                    labelPontuacao.texto = "Já era!";
                else if(x == 5)
                    labelPontuacao.texto = "Bateu as Fundações ;)";
                else if(x == 6)
                    labelPontuacao.texto = "Xama o XhamuUuUu";
                else if(x == 7)
                    labelPontuacao.texto = "Quebrou meu prédio véi!";
                else if(x == 8)
                    labelPontuacao.texto = "Errooouuuuuu";
                else
                    labelPontuacao.text = "Não consegue né" 
            }else if(causa == 1){ // Água
                if(x == 1)
                    labelPontuacao.texto = "Afundou!";
                else if(x == 2)
                    labelPontuacao.texto = "Prédios não nadam!";
                else if(x == 3)
                    labelPontuacao.texto = "Fecha as Janelaaas!";
                else if(x == 4)
                    labelPontuacao.texto = "Explorando os corais";
                else if(x == 5)
                    labelPontuacao.texto = "Com água até a Antena";
                else if(x == 6)
                    labelPontuacao.texto = "Afundando em 15 nós";
                else if(x == 7)
                    labelPontuacao.texto = "Olha os Peixinho!";
                else if(x == 8)
                    labelPontuacao.texto = "Sirigueijo?";
            }else if(causa == 0){ // Centro da Cidade
                if(x == 2) 
                    labelPontuacao.texto = "Ninguém Sobrevive!";
                else if(x == 2)
                    labelPontuacao.texto = "Prédio a Rodo!";
                else if(x == 3)
                    labelPontuacao.texto = "Poluindo a Visão desde 1987";
                else if(x == 4)
                    labelPontuacao.texto = "É um pássaro?!";
                else if(x == 5)
                    labelPontuacao.texto = "40 prédios p/ metro²!";
                else if(x == 6)
                    labelPontuacao.texto = "Me Tira Daqui!";
                else if(x == 7)
                    labelPontuacao.texto = "Pulga! Digo, Prédio!";
                else if(x == 8)
                    labelPontuacao.texto = "Abaixo da Poluição";
            }else{
                labelPontuacao.texto = "Como assim!?!";
            }
        }
    }
}