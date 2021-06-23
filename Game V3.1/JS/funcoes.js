function boasVindas(){

    $("#boas_vindas").fadeOut();
    $("#log_").fadeIn();

    localStorage.setItem("iniciaLoucura_03Beta", 1);  
    inicia_game = 1;

    executaSons("musicas", "intro.ogg", 2);

}

function inicia_jogo(){

    estadoAtual = estados.jogando;
    jogo.ultimo_evento = null;

    if(typeof regulador_som != "undefined")
        clearInterval(regulador_som);

    if(segura_som == 0){
        executaSons("efeitos", escolhe_som(1, 0), 1);
        segura_som++;
    }

    cronometroTempoPartida = setInterval(function(){
        jogador.partida_tempo_jogado += 1;
    }, 1000);

    executaSons2("musicas", "main.ogg", 2);

    botoes(600);

    jogo.relogio_eventos();

    jogo.estadoOcioso = 0;

    if(ociosidade == 1)
        clearTimeout(contagemOcioso);
    
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
    $("#opcoes").fadeOut();

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

    // Verifica se o modo ocioso está ativo
    if(jogo.ociosidade == 1){
        jogo.ociosidade = 0;

        impedeOcioso();
        cancela_evento();
    }else{
        ociosidade = localStorage.getItem("ociosidade");
        if(ociosidade == null)
            jogo.ociosidade = 0;
        else{
            jogo.ociosidade = parseInt(ociosidade);
            sincronizaOciosidade();
        }
    }

    if(estado_loja == 0){
        document.getElementById("moedas").style.animation = "move_moeda 1s";
        document.getElementById("moedas").style.right = "5%";
        estado_loja = 1;
    }else{
        document.getElementById("moedas").style.animation = "volta_moeda 1s";
        document.getElementById("moedas").style.right = "15%";
        estado_loja = 0;
    }
}

function pisao_neles(){
    
    var moeda_ev;

    //  Efeito de Pisão
    jogador.qtdPulos++;
    jogador.pula();

    jogador.partida_pisoes_pontuados++;
    alteraValorEstatisticaPartida("quantidade_pisoes_partida", jogador.partida_pisoes_pontuados);

    if(jogo.inicia_evento == 0)
        if(jogo.dificuldade == 1)
            moeda_ev = 5;
        else if(jogo.dificuldade == 2)
            moeda_ev = 7;
        else if(jogo.dificuldade == 3)
            moeda_ev = 9;
        else 
            moeda_ev = 1;
    else
        moeda_ev = 0;

    jogo.notifica("Pisão Neles! +3 Pontos", "yellow");

    if(jogo.dificuldade != 0)
        var ganha = moeda_ev + Math.round(3 * Math.random());
    else
        var ganha = moeda_ev + Math.round(2 * Math.random());
    
    if(ganha > 0){
        
        jogador.partida_moedas_coletadas += ganha;
        alteraValorEstatisticaPartida("moedas_coletadas_partida", jogador.partida_moedas_coletadas);

        executaSons("pisoes", "moeda.ogg", 1);

        document.getElementById("notifica_moeda").innerHTML = "+"+ ganha;
        $("#notifica_moeda").fadeIn();
        
        esconde_moeda = setTimeout(function(){
            $("#notifica_moeda").fadeOut();

            clearTimeout(esconde_moeda);
        }, 1000);
    }else
        executaSons("efeitos", "Batida.ogg", 1);
    
    if(jogo.estatisticasNerds == 1)
        console.log("%cPisão efetuado, "+ ganha +" moedas coletadas", "color: green;");

    jogador.partida_pontuacao += 3;
    alteraValorEstatisticaPartida("pontuacao_partida", jogador.partida_pontuacao);
}

function finaliza_evento(){
    
    if(estadoAtual == estados.jogando)
        jogo.notifica(jogo.saida_evento[jogo.inicia_evento], "white");

    if(jogo.estatisticasNerds == 1)
        console.log("%cEvento Finalizado", "color: red;");

    clearTimeout(tempo_evento);
    clearTimeout(ativa_evento);

    jogo.evento = null;
    jogo.inicia_evento = null;
    chao.muda_chao = [0, 0, 0];
    
    if(estadoAtual == estados.jogando)
        jogo.relogio_eventos();

    if(estadoAtual == estados.jogando)
        executaSons2("efeitos3", "levelup.ogg", 1);

    confirmaFechamento = setTimeout(function(){
        jogo.termina_evento = null;
        jogo.seguraEventoOcioso = 0;
        clearTimeout(confirmaFechamento);
    }, 3000);
}

function cancela_evento(){

    if(jogo.estatisticasNerds == 1)
        console.log("%cEvento Cancelado", "color: red;");
        
    clearInterval(cronometro);
    
    if(estadoAtual == estados.jogando)
        clearInterval(cronometro2);

    clearTimeout(tempo_evento);
    clearTimeout(ativa_evento);

    jogo.evento = null;
    jogo.inicia_evento = null;
    chao.muda_chao = [0, 0, 0];

}

function aleatorizaProp(){

    var prop = Math.round(8 * Math.random());
    aleatorizadorProp = prop;
}

function MsgPerdeu(causa){

    // Filtro e animação
    if(estatistica_morte == 1)
        document.getElementById("filtro2").style.display = "block";
    
    if(causa != 1)
        if(causa != 3)
            executaSons2("efeitos", "Batida.ogg", 1);

    if(controle == 0 && estadoAtual == estados.perdeu){

        controle = 1;

        if(jogador.partida_pontuacao > recorde)
            labelTexto.texto = "Novo Recorde! ( " + jogador.partida_pontuacao + " )";
        else{
            x = 0 + Math.round(8 * Math.random());

            if(causa != 3){
                if(causa != 1 && x != 8)
                    nome = escolhe_som(2, 0);
                else if(x == 8)
                    nome = "morreu_5.ogg";
                else if(causa != 3)
                    nome = escolhe_som(2, 1);
            }else
                nome = "morreu_7.ogg";

            executaSons("efeitos2", nome, 1); // Usado para o Som de meme ao morrer

            var perdaNormal = ["Faliceu D:", "Teve uma batida ali!", "Capotou o Prédio", "Já era!", "Bateu as Fundações ;)", "Xama o XhamuUuUu", "Quebrou meu prédio véi!", "Errooouuuuuu", "Não consegue né"];

            var perdaAgua = ["Afundou!", "Prédios não nadam!", "Fecha as Janelaaas!", "Explorando os corais", "Com água até a Antena", "Afundando em 15 nós", "Olha os Peixinho!", "Sirigueijo?", "Tá chovendo aí?"];

            var perdaCidade = ["Ninguém Sobrevive!", "Prédio a Rodo!", "Poluindo a Visão desde 1987", "É um pássaro?!", "40 prédios p/ metro²!", "Me Tira Daqui!", "Pulga! Digo, Prédio!", "Abaixo da Poluição", "E Cinzou!"];

            var perdaLava = ["Derreteu as fundações", "Só para aquecer!", "Não era mentira :)", "Nós avisamos!", "Para o centro da terra!", "Destinos turísticos quentes!", "FACA QUENTE vs PRÉDIO", "O que houve aqui?", "Temperaturas Extremas"];
            
            if(causa == null)
                labelTexto.texto = perdaNormal[x];
            else if(causa == 3) // Lava
                labelTexto.texto = perdaLava[x];
            else if(causa == 1) // Água
                labelTexto.texto = perdaAgua[x];
            else if(causa == 0) // Centro da Cidade
                labelTexto.texto = perdaCidade[x];
            else
                labelTexto.texto = "Como assim!?!";
        }
    }
}

function estadoOcioso(caso){    
    if(caso == "auto"){
        botoes(600);
        $("#menu_inicial").fadeOut();
        $("#barra_topo").fadeOut();
        $("#moedas").fadeOut();
        $("#puxador_loja").fadeOut();
        $("#especiais_comprados").fadeOut();

        executaSons2("musicas", "ocioso.ogg", 2);
    }else{
        // Retorna o jogo do modo ocioso
        cancela_evento();

        if(jogo.estatisticasNerds == 1)
            console.log("%cModo Ocioso desativado", "color: green;");

        estadoAtual = estados.jogar;
        jogo.seguraEventoOcioso = 0;
        jogo.estadoOcioso = 0;

        $("#menu_inicial").fadeIn();
        $("#barra_topo").fadeIn();
        $("#moedas").fadeIn();
        $("#puxador_loja").fadeIn();
        $("#especiais_comprados").fadeIn();

        desliga_som("musicas", 2);
        clearTimeout(ativa_evento);
    }
}

// Impede que o jogo entre no modo ocioso
function impedeOcioso(){
    jogo.estadoOcioso = 0;
    clearTimeout(contagemOcioso);
}

function alteraValorEstatisticaPartida(objeto, valor){

    if(objeto != "reset"){
        document.getElementById(objeto).innerHTML = valor;
    }else{

        cronometra = setTimeout(function(){
            document.getElementById("causa_perca").innerHTML = "??";

            document.getElementById("pontuacao_partida").innerHTML = 0;
            document.getElementById("tempo_jogado_partida").innerHTML = 0;
            document.getElementById("quantidade_especiais_partida").innerHTML = 0;
            document.getElementById("moedas_coletadas_partida").innerHTML = 0;
            document.getElementById("quantidade_pulos_partida").innerHTML = 0;
            document.getElementById("quantidade_pisoes_partida").innerHTML = 0;
            document.getElementById("quantidade_predios_partida").innerHTML = 0;

            document.getElementById("eventos_concluidos_partida").innerHTML = 0;
            document.getElementById("tempo_eventos_partida").innerHTML = 0;
            document.getElementById("quantidade_cidade_partida").innerHTML = 0;
            document.getElementById("quantidade_parque_partida").innerHTML = 0;
            document.getElementById("quantidade_agua_partida").innerHTML = 0;
            document.getElementById("quantidade_lava_partida").innerHTML = 0;

        clearTimeout(cronometra);
        }, 1500);
    }
}

function carrega_estatisticas_evento(){

    document.getElementById("eventos_concluidos_partida").innerHTML = jogador.partida_eventos_concluidos;
    document.getElementById("tempo_eventos_partida").innerHTML = jogador.partida_tempo_em_eventos;
    document.getElementById("quantidade_cidade_partida").innerHTML = jogador.partida_evento_cidade;
    document.getElementById("quantidade_parque_partida").innerHTML = jogador.partida_evento_parque;
    document.getElementById("quantidade_agua_partida").innerHTML = jogador.partida_evento_agua;
    document.getElementById("quantidade_lava_partida").innerHTML = jogador.partida_evento_lava;
}