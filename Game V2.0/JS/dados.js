function valores(){
    document.getElementById("pontuacao").innerHTML = jogador.score;
    document.getElementById("velocity").innerHTML = velocidade_obs * 2;
    document.getElementById("timer_especial").innerHTML = jogo.timer_especial;
    document.getElementById("qtdPulos").innerHTML = jogador.qtdPulos;

    if(especial == 1){
        ajusta_cores(1, 2);
        
        if(dev_op == 1){
            ajusta_cores(3, 2);
            document.getElementById("estado_especial").innerHTML = "DEV";
        }
    }else if(especial == 0 & jogo.timer_especial < 5){
        ajusta_cores(2, 2);
    }

    if(jogador.qtdPulos == 0)
        ajusta_cores(1, 3);
    else
        ajusta_cores(5, 3);

}

function carrega_dados(){

    inicia_game = localStorage.getItem("iniciaLoucura_01a01f");
    if(inicia_game == null)
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

    moedas = localStorage.getItem("moedas");
    if(moedas == null)
        moedas = 0;
    else
        moedas = parseInt(moedas);

    // Sincroniza o Volume da Música
    volMusica = localStorage.getItem("volMusica");
    if(volMusica == null)
        volMusica = 50;

    carrega_volume(volMusica, 1);

    // Sincroniza o Volume dos Efeitos
    volEfeitos = localStorage.getItem("volEfeito");
    if(volEfeitos == null)
        volEfeitos = 50;

    carrega_volume(volEfeitos, 2);

    document.getElementById("distancia_percorrida").innerHTML = distancia_hist;
    document.getElementById("quantidade_pulos").innerHTML = pulos_hist;
    document.getElementById("quantidade_pontos").innerHTML = pontos_hist;
    document.getElementById("quantidade_especiais").innerHTML = espec_hist;
    document.getElementById("quantidade_batidas").innerHTML = batidas_hist;
    document.getElementById("quantidade_pisoes").innerHTML = pisoes_hist;
    document.getElementById("record").innerHTML = record;
    document.getElementById("notifica_moeda").innerHTML = "$"+ moedas;
}

function apagaDados(){

    var condicao = confirm("Deseja mesmo apagar todos os dados? Suas Moedas Também serão Resetadas!");

    if(condicao){
        executaSons2("efeitos2", "sumiu.ogg", 1);

        localStorage.removeItem("qtdDistancia");
        localStorage.removeItem("qtdPulos");
        localStorage.removeItem("qtdPontos");
        localStorage.removeItem("qtdEspeciais");
        localStorage.removeItem("qtdBatidas");
        localStorage.removeItem("qtdPisoes");
        localStorage.removeItem("record");
        localStorage.removeItem("moedas");

        carrega_dados();
    }
}

function reseta(){
    
    jogador.velocidade = 0;
    jogador.y = 0;

    if(jogador.score > record){
        localStorage.setItem("record", jogador.score);
        record = jogador.score;
    }

    // Salvando os valores atualizados no LocalStorage
    if(jogador.score > 0)
        pontos_hist += jogador.score;

    distancia_hist += distancia_viajada;
    pulos_hist += jogador.pulos_dados;
    espec_hist += contador_especial;
    batidas_hist += contador_batidas;
    pisoes_hist += contador_pisoes;

    localStorage.setItem("qtdDistancia", distancia_hist);
    localStorage.setItem("qtdPulos", pulos_hist);
    localStorage.setItem("qtdPontos", pontos_hist);
    localStorage.setItem("qtdEspeciais", espec_hist);
    localStorage.setItem("qtdBatidas", batidas_hist);
    localStorage.setItem("qtdPisoes", pisoes_hist);
    localStorage.setItem("moedas", moedas);

    jogador.score = 0;
    jogador.pulos_dados = 0;

    segura_som = 0;
    pontosAtuais = null;
    contador_pisoes = 0;
    contador_batidas = 0;
    contador_especial = 0;
    distancia_viajada = 0;
    obstaculos.qtdObjetos = 0;

    jogo.evento = null;
    jogo.inicia_evento = null;
    jogo.timer_especial = 5;
    jogo.qtd_eventos = [5, 7, 4];
    jogo.quantia_pixels_interno = 0;
    document.getElementById("completa_timer").style.width = "0px";

    iniciando_evento = null;
    chao.muda_chao = [0, 0, 0];

    menu_inicial(1);
    carrega_dados();
    $("#temporizador").fadeOut();
    $("#barra_loading").fadeOut();
    $("#puxador_loja").fadeIn();

    clearInterval(var_timer_especial);
    clearTimeout(tempo_evento);
    clearTimeout(ativa_evento);
}