function iniciaLoucura(){
    $("#boas_vindas").fadeOut();
    $("#log_").fadeIn();
    
    localStorage.setItem("iniciaLoucura_Beta1.0", 1);  
    inicia_loucura = 1;

    const audio = document.getElementById("audio_intro");
    
    audio.volume = 0.4;    
    audio.play();

}

function menu_inicial(argu){
    if(argu == 1)
        $("#menu_inicial").fadeIn();
    else
        $("#menu_inicial").fadeOut();
}

function troca_pagina(pag){
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

function abrir_arquivo(){
    varWindow = window.open(
        'log.html',
        'pagina',
        "width=850, height=500, top=100, left=110, scrollbars=no ");
}

function escolhe_som(ocasiao, evento){
    escolha = 1 + Math.round(4 * Math.random());
    var nome;

    if(ocasiao == 1)
        nome = "comeca_"+escolha+".ogg";
    else
        if(evento != 1)
            nome = "morreu_"+escolha+".ogg";
        else
            nome = "morreu_6.ogg";

    return nome; 
}

function dificuldade(nivel){
    
    document.getElementById("repositorio").innerHTML +="Nivel: "+ nivel +"<br>";
    localStorage.setItem("dificuldade", nivel);
}

function valores(){
    document.getElementById("pontuacao").innerHTML = jogador.score;
    document.getElementById("velocity").innerHTML = velocidade_obs * 2;
    document.getElementById("timer_especial").innerHTML = timer_especial;
    document.getElementById("qtdPulos").innerHTML = jogador.qtdPulos;

    if(especial == 1){
        ajusta_cores(1, 2);
        
        if(dev_op == 1){
            ajusta_cores(3, 2);
            document.getElementById("estado_especial").innerHTML = "DEV";
        }
    }else if(especial == 0 & timer_especial < 5){
        ajusta_cores(2, 2);
    }

    if(jogador.qtdPulos == 0)
        ajusta_cores(1, 3);
    else
        ajusta_cores(5, 3);

}

function carrega_cenario(){

    hora = data.getHours();
    Cenario();

    atualiza_cenario = setInterval(function(){
        carrega_cenario();
        Cenario();
        clearInterval(atualiza_cenario);
    }, 10000)
}

function botoes(tecla){

    if(inicia_loucura == 1){
        switch(tecla){
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
            // case 113: // q
            // case 81:  // Q
            //     $("#comandos").fadeOut("slow", "linear");
            //     $("#estatistic").fadeOut("slow", "linear");
            //     $("#configuracoes").fadeToggle("slow", "linear");
            // break;
            default:
                $("#comandos").fadeOut();
                $("#estatistic").fadeOut();
                $("#configuracoes").fadeOut();
                $("#boas_vindas").fadeOut();
            break;
        }
    }
}

function clique(){

    if(inicia_loucura == 1)
        var tecla = event.keyCode;
    
    if(estadoAtual == estados.jogando){

        switch(tecla){
            case 32:  // Espaço
            case 119: // w
            case 87:  // W
                jogador.pula();
                if(segura_som == 0){
                    segura_som++;

                    nome = escolhe_som(1);
                    const audio = document.getElementById("audio_inicia");
                    audio.src = "sons/" + nome;

                    audio.play();
                }
            break;
            case 13:  // Enter
            case 100: // d
            case 68:  // D
                if(especial != 1 && timer_especial == 5 && jogador.y <= 420)
                    jogador.especial();
            break;
            case 112: // p
            case 80:  // P
            case 97:  // a
            case 65:  // A
                pausada_falha();
            break;
            // case 114: // r
            // case 82:  // R
            //     if(timer_especial >= 5)
            //         jogo.operador();
            // break; // 1
        }

    }else if(estadoAtual == estados.jogar && (tecla == 32 || tecla == 87 || tecla == 119)){
        estadoAtual = estados.jogando;

        botoes(600);
        timer_especial = 5;
        jogo.relogio_eventos();

        clearInterval(regula_velocidade);
        clearInterval(var_timer_especial);

    }else if(estadoAtual == estados.perdeu && jogador.y >= 10 * Altura){
        estadoAtual = estados.jogar;
        jogador.reset();

    }else if(estadoAtual == estados.jogar){
        if(tecla == 114 || tecla == 82) // R
            document.location.reload(true);
        else
            botoes(tecla);
    }
}

function levanta_dados(){

    inicia_loucura = localStorage.getItem("iniciaLoucura_Beta1.0");
    if(inicia_loucura == null)
        $("#boas_vindas").fadeIn();
    else
        $("#log_").fadeIn();

    record = localStorage.getItem("record");

    if(record == null)
        record = 0;

    // Pegando os valores de pulos do localStorage e convertendo em inteiros
    distancia_hist = localStorage.getItem("qtdDistancia");
    if(distancia_hist == null)
        distancia_hist = 0;
    else
        distancia_hist = parseInt(distancia_hist);

    pulos_hist = localStorage.getItem("qtdPulos");
    if(pulos_hist == null)
        pulos_hist = 0;
    else
        pulos_hist = parseInt(pulos_hist);

    pontos_hist = localStorage.getItem("qtdPontos");
    if(pontos_hist == null)
        pontos_hist = 0;
    else
        pontos_hist = parseInt(pontos_hist);

    espec_hist = localStorage.getItem("qtdEspeciais");
    if(espec_hist == null)
        espec_hist = 0;
    else
        espec_hist = parseInt(espec_hist);

    pause_f_hist = localStorage.getItem("qtdPFalhos");
    if(pause_f_hist == null)
        pause_f_hist = 0;
    else
        pause_f_hist = parseInt(pause_f_hist);

    batidas_hist = localStorage.getItem("qtdBatidas");
    if(batidas_hist == null)
        batidas_hist = 0;
    else
        batidas_hist = parseInt(batidas_hist);

    pisoes_hist = localStorage.getItem("qtdPisoes");
    if(pisoes_hist == null)
        pisoes_hist = 0;
    else
        pisoes_hist = parseInt(pisoes_hist);

    document.getElementById("distancia_percorrida").innerHTML = distancia_hist;
    document.getElementById("quantidade_pulos").innerHTML = pulos_hist;
    document.getElementById("quantidade_pontos").innerHTML = pontos_hist;
    document.getElementById("quantidade_especiais").innerHTML = espec_hist;
    document.getElementById("quantidade_p_falhos").innerHTML = pause_f_hist;
    document.getElementById("quantidade_batidas").innerHTML = batidas_hist;
    document.getElementById("quantidade_pisoes").innerHTML = pisoes_hist;
    document.getElementById("record").innerHTML = record;
}

function apagaDados(){

    var condicao = confirm("Deseja mesmo apagar todos os dados?");

    if(condicao){
        localStorage.removeItem("qtdDistancia");
        localStorage.removeItem("qtdPulos");
        localStorage.removeItem("qtdPontos");
        localStorage.removeItem("qtdEspeciais");
        localStorage.removeItem("qtdPFalhos");
        localStorage.removeItem("qtdBatidas");
        localStorage.removeItem("qtdPisoes");
        localStorage.removeItem("record");

        levanta_dados();
    }
}

function MsgPerdeu(causa){
    if(controle == 0 && estadoAtual == estados.perdeu){

        controle = 1;

        if(jogador.score > record)
            labelPontuacao.texto = "Novo Recorde! ( " + jogador.score + " )";
        else{
            x = 1 + Math.round(8 * Math.random());
            
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