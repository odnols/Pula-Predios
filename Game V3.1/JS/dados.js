function valores(){
    document.getElementById("pontuacao").innerHTML = jogador.partida_pontuacao;
    document.getElementById("velocity").innerHTML = velocidade_obs * 2;
    document.getElementById("timer_especial").innerHTML = jogo.timer_especial;
    document.getElementById("qtdPulos").innerHTML = jogador.qtdPulos;

    if(especial == 1){
        ajusta_cores(1, 2);
        
        if(dev_op == 1){
            ajusta_cores(3, 2);
            document.getElementById("estado_especial").innerHTML = "DEV";
        }
    }else if(especial == 0 & jogo.timer_especial < 5 && estadoAtual == estados.jogando && jogador.qtdEspeciais > 0) // Verifica se a qtd de especiais é maior que 0 para poder recarregar
        ajusta_cores(2, 2);
    else if(jogador.qtdEspeciais == 0)
        ajusta_cores(3, 2);
    

    if(jogador.qtdPulos == 0)
        ajusta_cores(1, 3);
    else
        ajusta_cores(5, 3);

}

function carrega_dados(){

    inicia_game = localStorage.getItem("iniciaLoucura_03Beta");
    if(inicia_game == null)
        $("#boas_vindas").fadeIn();
    else
        $("#log_").fadeIn();

    recorde = localStorage.getItem("recorde");
    if(recorde == null)
        recorde = 0;

    // Pegando os valores de pulos do localStorage e convertendo em inteiros
    hist_distancia = localStorage.getItem("qtdDistancia");
    if(hist_distancia == null)
        hist_distancia = 0;
    else
        hist_distancia = parseInt(hist_distancia);

    hist_tempo_jogado = localStorage.getItem("qtdTempoJogado");
    if(hist_tempo_jogado == null)
        hist_tempo_jogado = 0;
    else
        hist_tempo_jogado = parseInt(hist_tempo_jogado);

    hist_pulos = localStorage.getItem("qtdPulos");
    if(hist_pulos == null)
        hist_pulos = 0;
    else
        hist_pulos = parseInt(hist_pulos);

    hist_pontos = localStorage.getItem("qtdPontos");
    if(hist_pontos == null)
        hist_pontos = 0;
    else
        hist_pontos = parseInt(hist_pontos);

    hist_espec = localStorage.getItem("qtdEspeciais");
    if(hist_espec == null)
        hist_espec = 0;
    else
        hist_espec = parseInt(hist_espec);

    hist_mortes = localStorage.getItem("qtdMortes");
    if(hist_mortes == null)
        hist_mortes = 0;
    else
        hist_mortes = parseInt(hist_mortes);

    hist_pisoes = localStorage.getItem("qtdPisoes");
    if(hist_pisoes == null)
        hist_pisoes = 0;
    else
        hist_pisoes = parseInt(hist_pisoes);

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

    efeitosSom = localStorage.getItem("efeitosSom");
    if(efeitosSom == null)
        efeitosSom = 1;
    else{
        jogo.estadoSom = parseInt(efeitosSom);
        sincronizaEfeitosSom();
    }

    // Sincroniza animação de morte
    estatistica_morte = localStorage.getItem("estatisticaMorte");
    if(estatistica_morte == null)
        estatistica_morte = 1;
    else{
        estatistica_morte = parseInt(estatistica_morte);
        sincronizaEstatisticaMorte(estatistica_morte);
    }

    // Sincroniza a configuração de tema atual
    config_temaEscolhido = localStorage.getItem("TemaEscolhido");
    if(config_temaEscolhido == null)
        Cenario_sprites.tema = 0;
    else{
        Cenario_sprites.tema = parseInt(config_temaEscolhido);

        if(Cenario_sprites.tema != 0)
            sincronizaRelogio();
    }

    // Sincroniza as estatísticas para nerds através do console
    estatisticasNerds = localStorage.getItem("estatisticasNerds");
    if(estatisticasNerds == null)
        jogo.estatisticasNerds = 0;
    else{
        jogo.estatisticasNerds = parseInt(estatisticasNerds);
        sincronizaEstatisticasNerds();
    }

    // Sincroniza a configuração para a Dificuldade do jogo
    dificuldadeJogo = localStorage.getItem("dificuldadeJogo");
    if(dificuldadeJogo == null)
        jogo.dificuldade = 1; // Dificuldade Normal por padrão
    else{
        jogo.dificuldade = parseInt(dificuldadeJogo);
        sincronizaDificuldade();
    }

    // Sincroniza a configuração de ociosidade ( Experimental )
    ociosidade = localStorage.getItem("ociosidade");
    if(ociosidade == null)
        jogo.ociosidade = 0;
    else{
        jogo.ociosidade = parseInt(ociosidade);
        sincronizaOciosidade();
    }

    // Sincronizando a skin selecionada atualmente
    skinAtual = localStorage.getItem("skinAtual");
    if(skinAtual == null)
        jogador.skin = 7;
    else
        jogador.skin = parseInt(skinAtual);


    // Sincronizando a lista de Skins
    loja_skinsCompradas = localStorage.getItem("skinsCompradas");
    if(loja_skinsCompradas == null)
        jogador.skins_compradas = [0, 0, 0, 0, 0, 0, 0, 1];
    else{
        // Recolhendo os valores e convertendo para um array utilizável
        var indices = loja_skinsCompradas.split(",");

        for(var i = 0; i < 7; i++){
            indices[i];

            if(indices[i] != 1)
                indices[i] = 0;
            
            jogador.skins_compradas[i] = parseInt(indices[i]);
        }
    }
    
    loja_especiaisComprados = localStorage.getItem("especsComprados");
    if(loja_especiaisComprados == null)
        jogador.especiaisComprados = [0, 0];
    else{
        // Recolhendo os valores e convertendo para um array utilizável
        var indices = loja_especiaisComprados.split(",");

        for(var i = 0; i < 2; i++){
            indices[i];

            if(indices[i] != 1)
                indices[i] = 0;
            
            jogador.especs_comprados[i] = parseInt(indices[i]);
        }
    }

    loja_especsCompradosUsados = localStorage.getItem("especsCompradosUsados");
    if(loja_especsCompradosUsados == null)
        jogador.especs_vezes_usados = [0, 0];
    else{
        // Recolhendo os valores e convertendo para um array utilizável
        var indices = loja_especsCompradosUsados.split(",");

        for(var i = 0; i < 2; i++){
            var valor = indices[i];

            if(jogador.especs_comprados[i] == 1 && valor == 0)
                valor = 5;

            if(jogador.especs_vezes_usados[i] == 0)
                jogador.especs_vezes_usados[i] = parseInt(valor);
        }
        
        sincronizaEspeciaisComprados();
    }

    document.getElementById("distancia_percorrida").innerHTML = hist_distancia;
    document.getElementById("tempo_jogado").innerHTML = hist_tempo_jogado + " seg";
    document.getElementById("quantidade_pulos").innerHTML = hist_pulos;
    document.getElementById("quantidade_pontos").innerHTML = hist_pontos;
    document.getElementById("quantidade_especiais").innerHTML = hist_espec;
    document.getElementById("quantidade_mortes").innerHTML = hist_mortes;
    document.getElementById("quantidade_pisoes").innerHTML = hist_pisoes;
    document.getElementById("recorde").innerHTML = recorde;
    document.getElementById("notifica_moeda").innerHTML = "$"+ moedas;

    document.getElementById("qtdEspeciais").innerHTML = jogador.qtdEspeciais;
}

function reseta(){
    
    gravidade = 1.6;
    jogador.velocidade = 0;
    jogador.y = 0;

    if(jogador.partida_pontuacao > recorde){
        localStorage.setItem("recorde", jogador.partida_pontuacao);
        recorde = jogador.partida_pontuacao;
    }

    // Salvando os valores atualizados no LocalStorage
    if(jogador.partida_pontuacao > 0)
        hist_pontos += jogador.partida_pontuacao;

    moedas += jogador.partida_moedas_coletadas;
    hist_distancia += jogador.partida_distancia_viajada;
    hist_tempo_jogado += jogador.partida_tempo_jogado;
    hist_pulos += jogador.partida_pulos_dados;
    hist_espec += jogador.partida_especiais_ativados;
    hist_mortes += contador_mortes;
    hist_pisoes += jogador.partida_pisoes_pontuados;

    localStorage.setItem("qtdDistancia", hist_distancia);
    localStorage.setItem("qtdTempoJogado", hist_tempo_jogado);
    localStorage.setItem("qtdPulos", hist_pulos);
    localStorage.setItem("qtdPontos", hist_pontos);
    localStorage.setItem("qtdEspeciais", hist_espec);
    localStorage.setItem("qtdMortes", hist_mortes);
    localStorage.setItem("qtdPisoes", hist_pisoes);
    localStorage.setItem("moedas", moedas);

    segura_som = 0;
    pontosAtuais = null;
    contador_mortes = 0;

    alteraValorEstatisticaPartida("reset", 0);

    jogador.partida_causa_morte = "";
    jogador.partida_distancia_viajada = 0;
    jogador.partida_tempo_jogado = 0;

    jogador.partida_pontuacao = 0,
    jogador.partida_pulos_dados = 0;
    jogador.partida_especiais_ativados = 0;
    jogador.partida_pisoes_pontuados = 0;
    jogador.partida_moedas_coletadas = 0;
    jogador.partida_predios_atropelados = 0;

    jogador.partida_tempo_em_eventos = 0;
    jogador.partida_eventos_concluidos = 0;
    jogador.partida_evento_cidade = 0;
    jogador.partida_evento_parque = 0;
    jogador.partida_evento_agua = 0;
    jogador.partida_evento_lava = 0;

    obstaculos.qtdObjetos = 0;
    
    jogo.evento = null;
    jogo.inicia_evento = null;
    
    if(jogador.especs_comprados[0] == 1)
        jogo.timer_especial = 10;
    else
        jogo.timer_especial = 5;

    jogo.qtd_eventos = [5, 4, 3, 2];
    jogo.quantia_pixels_interno = 0;
    document.getElementById("completa_timer").style.width = "0px";
    
    document.getElementById("qtdEspeciais").innerHTML = jogador.qtdEspeciais;
    document.getElementById("carregando").style.display = "none";
    document.getElementById("qtdEspeciais").style.display = "block";

    iniciando_evento = null;
    chao.muda_chao = [0, 0, 0];

    menu_inicial(1);
    ajusta_cores(4, 2);
    carrega_dados();
    sincronizaEspeciaisComprados();
    sincronizaVezesEspeciaisComprados();

    $("#temporizador").fadeOut();
    $("#barra_loading").fadeOut();
    $("#puxador_loja").fadeIn();
    $("#filtro2").fadeOut();

    clearInterval(var_timer_especial);
    clearTimeout(tempo_evento);
    clearTimeout(ativa_evento);
}

function apagaDados(){

    var condicao = confirm("Deseja mesmo apagar todos os dados? Suas Moedas Também serão Resetadas!");

    if(condicao){
        executaSons2("efeitos2", "Sumiu.ogg", 1);

        localStorage.removeItem("qtdDistancia");
        localStorage.removeItem("qtdTempoJogado");
        localStorage.removeItem("qtdPulos");
        localStorage.removeItem("qtdPontos");
        localStorage.removeItem("qtdEspeciais");
        localStorage.removeItem("qtdMortes");
        localStorage.removeItem("qtdPisoes");
        localStorage.removeItem("recorde");
        localStorage.removeItem("moedas");

        carrega_dados();
    }
}