function alteraEstadoSom(){
    
    executaSons2("efeitos", "hat.ogg", 1);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(jogo.estadoSom == 1){
        jogo.estadoSom = 0;
        document.getElementById("status_volume_som").innerHTML = "Desativado";
    }else{
        jogo.estadoSom = 1;
        document.getElementById("status_volume_som").innerHTML = "Ativado";
        executaSons("musicas", "intro2.ogg", 2);
    }

    localStorage.setItem("efeitosSom", jogo.estadoSom);
}

function sincronizaEfeitosSom(){
    if(jogo.estadoSom == 1)
        document.getElementById("status_volume_som").innerHTML = "Ativado";
    else{
        document.getElementById("status_volume_som").innerHTML = "Desativado";
        

    }
}

function alteraEstadoEstatistica(){

    executaSons2("efeitos", "hat.ogg", 1);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(estatistica_morte == 1){
        estatistica_morte = 0;
        document.getElementById("status_tela_estatisti").innerHTML = "Desativado";
    }else{
        estatistica_morte = 1;
        document.getElementById("status_tela_estatisti").innerHTML = "Ativado";
    }

    localStorage.setItem("estatisticaMorte", estatistica_morte);
}

function sincronizaEstatisticaMorte(estado){
    if(estado == 1)
        document.getElementById("status_tela_estatisti").innerHTML = "Ativado";
    else
        document.getElementById("status_tela_estatisti").innerHTML = "Desativado";
}

function alteraRelogio(){

    executaSons2("efeitos", "hat.ogg", 1);
    
    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(Cenario_sprites.tema == 0){
        Cenario_sprites.tema = 1;
        document.getElementById("status_tema_atual").innerHTML = "Sempre Dia";

    }else if(Cenario_sprites.tema == 1){
        Cenario_sprites.tema = 2;
        document.getElementById("status_tema_atual").innerHTML = "Sempre Noite";

    }else if(Cenario_sprites.tema == 2){
        Cenario_sprites.tema = 0;
        document.getElementById("status_tema_atual").innerHTML = "Dinâmico";
    }

    sincronizaRelogio();
    localStorage.setItem("TemaEscolhido", Cenario_sprites.tema);
}

function sincronizaRelogio(){

    if(Cenario_sprites.tema == 1){ // Sempre Dia
        Cenario_sprites.astro[2] = 0;
        Cenario_sprites.opacidade_noite = 0.0;
        libera_transitador = 0;
        document.getElementById("status_tema_atual").innerHTML = "Sempre Dia";
    }else if(Cenario_sprites.tema == 2){ // Sempre Noite
        Cenario_sprites.astro[2] = 1;
        Cenario_sprites.opacidade_noite = 1;
        libera_transitador = 1;
        document.getElementById("status_tema_atual").innerHTML = "Sempre Noite";
    }else
        document.getElementById("status_tema_atual").innerHTML = "Dinâmico";
}

function alteraEstatisticasNerds(){
    
    if(jogo.estatisticasNerds == 0){
        jogo.estatisticasNerds = 1;
        document.getElementById("status_estatisticas_nerds").innerHTML = "Ativado";
    }else{
        jogo.estatisticasNerds = 0;
        document.getElementById("status_estatisticas_nerds").innerHTML = "Desativado";
    }

    localStorage.setItem("estatisticasNerds", jogo.estatisticasNerds);
}

function sincronizaEstatisticasNerds(){
    if(jogo.estatisticasNerds == 0)
        document.getElementById("status_estatisticas_nerds").innerHTML = "Desativado";
    else
        document.getElementById("status_estatisticas_nerds").innerHTML = "Ativado";
}

function alteraDificuldade(){

    executaSons2("efeitos", "hat.ogg", 1);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(jogo.dificuldade == 1){
        jogo.dificuldade = 2;
        document.getElementById("status_dificuldade").innerHTML = "Díficil";
    }else if(jogo.dificuldade == 2){
        jogo.dificuldade = 3;

        document.getElementById("status_dificuldade").innerHTML = "Expert";

        document.getElementById("stats_dead").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
        document.getElementById("stats_dead2").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
    }else if(jogo.dificuldade == 3){
        jogo.dificuldade = 0;

        document.getElementById("status_dificuldade").innerHTML = "Fácil";

        document.getElementById("stats_dead").style.backgroundImage = "none";
        document.getElementById("stats_dead2").style.backgroundImage = "none";
    }else if(jogo.dificuldade == 0){
        jogo.dificuldade = 1;
        document.getElementById("status_dificuldade").innerHTML = "Normal";
    }

    sincronizaQtdEspeciais();
    localStorage.setItem("dificuldadeJogo", jogo.dificuldade);
}

function sincronizaDificuldade(){

    if(jogo.dificuldade == 1){       // Normal  = 1
        document.getElementById("status_dificuldade").innerHTML = "Normal";
    }else if(jogo.dificuldade == 2){ // Díficil = 2
        document.getElementById("status_dificuldade").innerHTML = "Díficil";    
    }else if(jogo.dificuldade == 3){ // Expert  = 3

        document.getElementById("status_dificuldade").innerHTML = "Expert";

        document.getElementById("stats_dead").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
        document.getElementById("stats_dead2").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
    }else if(jogo.dificuldade == 0){ // Fácil   = 0
        document.getElementById("status_dificuldade").innerHTML = "Fácil";
    }
}

function alteraEstadoOcioso(){

    executaSons2("efeitos", "hat.ogg", 1);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(jogo.ociosidade == 1){
        jogo.ociosidade = 0;
        document.getElementById("status_modo_ocioso").innerHTML = "Desativado";
    }else{
        document.getElementById("status_modo_ocioso").innerHTML = "Ativado";
        jogo.ociosidade = 1;
    }

    localStorage.setItem("ociosidade", jogo.ociosidade);
}

function sincronizaOciosidade(){

    if(jogo.ociosidade == 1)
        document.getElementById("status_modo_ocioso").innerHTML = "Ativado";
    else
        document.getElementById("status_modo_ocioso").innerHTML = "Desativado";
}

function sincronizaEspeciaisComprados(requisicao_auto){

    // Tempo de uso do Especial
    if(jogador.especs_comprados[0] == 1){
        document.getElementById("especial_1").style.display = "block";
        
        jogador.tempoEspecial = 10;
    }else{
        document.getElementById("especial_1").style.display = "none";
        jogador.tempoEspecial = 5;
        jogo.timer_especial = 5;
        jogador.especs_comprados[0] = 0;
    }

    // Quantidade de especiais ativos por partida
    if(jogador.especs_comprados[1] == 1)
        document.getElementById("especial_2").style.display = "block";
    else{
        document.getElementById("especial_2").style.display = "none";
        
        jogador.especs_comprados[1] = 0;
    }
    
    localStorage.setItem("especsComprados", jogador.especs_comprados);

    if(requisicao_auto == 0)
        localStorage.setItem("especsCompradosUsados", jogador.especs_vezes_usados);
    
    sincronizaQtdEspeciais();
}

function sincronizaQtdEspeciais(){

    if(jogador.especs_comprados[1] == 0){
        if(jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdEspeciais = 5; 
        else if(jogo.dificuldade == 2) // Díficil
            jogador.qtdEspeciais = 4;
        else                           // Expert
            jogador.qtdEspeciais = 3;
    }else{
        if(jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdEspeciais = 10; 
        else if(jogo.dificuldade == 2) // Díficil
            jogador.qtdEspeciais = 8;
        else                           // Expert
            jogador.qtdEspeciais = 6;
    }

    if(jogador.especs_comprados[0] == 1)
        jogo.timer_especial = 10;
    
    document.getElementById("qtdEspeciais").innerHTML = jogador.qtdEspeciais;
    document.getElementById("timer_especial").innerHTML = jogo.timer_especial;
}

function sincronizaVezesEspeciaisComprados(){
    
    for(var i = 0; i < 2; i++){
        if(jogador.especs_vezes_usados[i] > 0)
            jogador.especs_vezes_usados[i] -= 1;

        if(jogador.especs_vezes_usados[i] == 0)
            jogador.especs_comprados[i] = 0;

        if(jogo.estatisticasNerds == 1)
            console.log("%cSincronizando Especial: "+ jogador.especs_vezes_usados[i], "color: blue;");
    }

    if(jogador.especs_vezes_usados[0] == 0 || jogador.especs_vezes_usados[1] == 0)
        sincronizaEspeciaisComprados(0);

    if(jogo.estatisticasNerds == 1)
        console.log("%cEspeciais em partidas: "+ jogador.especs_vezes_usados, "color: orange;");

    localStorage.setItem("especsComprados", jogador.especs_comprados);
    localStorage.setItem("especsCompradosUsados", jogador.especs_vezes_usados);
}