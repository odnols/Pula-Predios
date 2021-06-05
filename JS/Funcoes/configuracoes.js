function sincronizaBotoesConfigs(valor){

    sincronizaEfeitosSom();
    sincronizaEstatisticasNerds();
    sincronizaEstatisticaMorte(valor);
    sincronizaNotificacoesConquistas();
    sincronizaDificuldade();
    sincronizaOciosidade();
    sincronizaQualidadeGrafica();
    sincronizaRelogio();
}

function alteraEstadoSom(){
    
    var canais_de_audio = ["faixa_musicas", "faixa_ambiente", "faixa_conquistas", "faixa_pisoes", "faixa_memes1", "faixa_memes2", "faixa_efeitos1", "faixa_efeitos2", "faixa_efeitos3"];
    
    if(jogo.estadoOcioso)
        impedeOcioso();
    
    if(jogo.estadoSom){
        jogo.estadoSom = 0;

        // Pausa todos os sons que possam estar sendo executados no momento
        for(var i = 0; i < canais_de_audio.length; i++){        
            var pausa_som = document.getElementById(canais_de_audio[i]);
            pausa_som.pause();
        }

        if(idioma == "pt")
            document.getElementById("status_volume_som").innerHTML = "Desativados";
        else
            document.getElementById("status_volume_som").innerHTML = "Disabled";
    }else{
        jogo.estadoSom = 1;

        if(idioma == "pt")
            document.getElementById("status_volume_som").innerHTML = "Ativados";
        else
            document.getElementById("status_volume_som").innerHTML = "Activated";

        if(Math.round(2 * Math.random()) > 1)
            executaSons("faixa_musicas", "Musicas", "intro_2.ogg", 1);
        else
            executaSons("faixa_musicas", "Musicas", "intro_3.ogg", 1);
    }

    localStorage.setItem("efeitosSom", jogo.estadoSom);
}

function sincronizaEfeitosSom(){
    if(jogo.estadoSom == 1)
        if(idioma == "pt")
            document.getElementById("status_volume_som").innerHTML = "Ativados";
        else
            document.getElementById("status_volume_som").innerHTML = "Activated";
    else
        if(idioma == "pt")
            document.getElementById("status_volume_som").innerHTML = "Desativados";
        else
            document.getElementById("status_volume_som").innerHTML = "Disabled";
}

function alteraEstadoEstatistica(){

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(estatistica_morte == 1){
        estatistica_morte = 0;

        if(idioma == "pt")
            document.getElementById("status_tela_estatisti").innerHTML = "Desativado";
        else
            document.getElementById("status_tela_estatisti").innerHTML = "Disabled";
    }else{
        estatistica_morte = 1;

        if(idioma == "pt")
            document.getElementById("status_tela_estatisti").innerHTML = "Ativado";
        else
            document.getElementById("status_tela_estatisti").innerHTML = "Activated";
    }

    localStorage.setItem("estatisticaMorte", estatistica_morte);
}

function sincronizaEstatisticaMorte(estado){
    if(estado == 1)
        if(idioma == "pt")
            document.getElementById("status_tela_estatisti").innerHTML = "Ativado";
        else
            document.getElementById("status_tela_estatisti").innerHTML = "Activated";
    else
        if(idioma == "pt")
            document.getElementById("status_tela_estatisti").innerHTML = "Desativado";
        else
            document.getElementById("status_tela_estatisti").innerHTML = "Disabled";
}

function alteraRelogio(){

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);
    
    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }

    if(Cenario_sprites.tema == 0){
        // Termina as transições entre dia e noite
        verifica_tema();

        Cenario_sprites.tema = 1;

        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Sempre Dia";
        else
            document.getElementById("status_tema_atual").innerHTML = "Always Day";

        animaLuzesGuia(0);
    
    }else if(Cenario_sprites.tema == 1){
        // Termina as transições entre dia e noite
        verifica_tema();

        Cenario_sprites.tema = 2;

        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Sempre Noite";
        else
            document.getElementById("status_tema_atual").innerHTML = "Always night";
        
        if(Cenario_sprites.objeto_voador[3] == 1)
            animaLuzesGuia(1);
        
    }else if(Cenario_sprites.tema == 2){
        Cenario_sprites.tema = 0;
        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Dinâmico";
        else
            document.getElementById("status_tema_atual").innerHTML = "Dynamic";
    }

    sincronizaRelogio();
    localStorage.setItem("TemaEscolhido", Cenario_sprites.tema);
}

function sincronizaRelogio(){

    if(Cenario_sprites.tema == 1){ // Sempre Dia
        Cenario_sprites.astro[2] = 0;
        Cenario_sprites.opacidade_noite = 0.0;
        libera_transitador = 0;

        // Desliga a animação das estrelas
        if(typeof tEst != "undefined")
            clearInterval(tEst)

        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Sempre Dia";
        else
            document.getElementById("status_tema_atual").innerHTML = "Always Day";
    }else if(Cenario_sprites.tema == 2){ // Sempre Noite
        Cenario_sprites.astro[2] = 1;
        Cenario_sprites.opacidade_noite = 1;
        libera_transitador = 1;

        if(typeof tEst != "undefined")
            clearInterval(tEst)
            
        animaEstrelas();

        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Sempre Noite";
        else
            document.getElementById("status_tema_atual").innerHTML = "Always night";
    }else
        if(idioma == "pt")
            document.getElementById("status_tema_atual").innerHTML = "Dinâmico";
        else
            document.getElementById("status_tema_atual").innerHTML = "Dynamic";
}

function alteraEstatisticasNerds(){
    
    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);
    
    if(!jogo.estatisticasNerds){
        jogo.estatisticasNerds = 1;

        if(idioma == "pt")
            document.getElementById("status_estatisticas_nerds").innerHTML = "Ativado";
        else
            document.getElementById("status_estatisticas_nerds").innerHTML = "Activated";
    }else{
        jogo.estatisticasNerds = 0;
        
        if(idioma == "pt")
            document.getElementById("status_estatisticas_nerds").innerHTML = "Desativado";
        else
            document.getElementById("status_estatisticas_nerds").innerHTML = "Disabled";
    }

    localStorage.setItem("estatisticasNerds", jogo.estatisticasNerds);
}

function sincronizaEstatisticasNerds(){
    if(!jogo.estatisticasNerds)
        if(idioma == "pt")
            document.getElementById("status_estatisticas_nerds").innerHTML = "Desativado";
        else
            document.getElementById("status_estatisticas_nerds").innerHTML = "Disabled";
    else
        if(idioma == "pt")
            document.getElementById("status_estatisticas_nerds").innerHTML = "Ativado";
        else
            document.getElementById("status_estatisticas_nerds").innerHTML = "Activated";
}

function alteraNotificacoesConquistas(){
    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);
    
    if(jogo.notificaConquista == 0){
        jogo.notificaConquista = 1;

        if(idioma == "pt")
            document.getElementById("status_conquistas_notifc").innerHTML = "Ativado";
        else
            document.getElementById("status_conquistas_notifc").innerHTML = "Activated";
    }else{
        jogo.notificaConquista = 0;

        if(idioma == "pt")
            document.getElementById("status_conquistas_notifc").innerHTML = "Desativado";
        else
            document.getElementById("status_conquistas_notifc").innerHTML = "Disabled";
    }

    localStorage.setItem("notificaConquistas", jogo.notificaConquista);
}

function sincronizaNotificacoesConquistas(){
    if(jogo.notificaConquista == 0)
        if(idioma == "pt")
            document.getElementById("status_conquistas_notifc").innerHTML = "Desativado";
        else
            document.getElementById("status_conquistas_notifc").innerHTML = "Disabled";
    else
        if(idioma == "pt")
            document.getElementById("status_conquistas_notifc").innerHTML = "Ativado";
        else
           document.getElementById("status_conquistas_notifc").innerHTML = "Activated";
}

function alteraQualidadeGrafica(){
    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);
    
    if(jogo.qualidadeGrafica == 0){
        jogo.qualidadeGrafica = 1;

        if(idioma == "pt")
            document.getElementById("status_animacoes").innerHTML = "Aprimoradas";
        else
            document.getElementById("status_animacoes").innerHTML = "Enhanced";

        location.reload();
    }else if(jogo.qualidadeGrafica == 1){
        jogo.qualidadeGrafica = 2;

        if(idioma == "pt")
            document.getElementById("status_animacoes").innerHTML = "Fantásticas";
        else
            document.getElementById("status_animacoes").innerHTML = "Fantastic";

        location.reload();
    }else{
        jogo.qualidadeGrafica = 0;
        
        if(idioma == "pt")
            document.getElementById("status_animacoes").innerHTML = "Mínimas";
        else
            document.getElementById("status_animacoes").innerHTML = "Minimum";
    }

    localStorage.setItem("qualidadeGrafica", jogo.qualidadeGrafica);
    sincronizaQualidadeGrafica();
}

function sincronizaQualidadeGrafica(){
    if(jogo.qualidadeGrafica == 0){
        if(idioma == "pt")
            document.getElementById("status_animacoes").innerHTML = "Mínimas";
        else
            document.getElementById("status_animacoes").innerHTML = "Minimum";

        if(jogo.estatisticasNerds)
            if(idioma == "pt")
                console.log("Desligando animações");
            else
                console.log("Turning off animations");

            verifica_animacoes(0);

            spriteAdereco_roda.x = 0;
            spriteAdereco_fogo.x = 0;
            spriteAdereco_bandeira.x = 0;
    }else{
        
        verifica_animacoes(1);

        if(jogo.qualidadeGrafica == 1)
            if(idioma == "pt")
                document.getElementById("status_animacoes").innerHTML = "Aprimoradas";
            else
                document.getElementById("status_animacoes").innerHTML = "Enhanced";
        else
            if(idioma == "pt")
                document.getElementById("status_animacoes").innerHTML = "Fantásticas";
            else
                document.getElementById("status_animacoes").innerHTML = "Fantastic";
        
        if(jogo.estatisticasNerds)
            if(idioma == "pt")
                console.log("Ligando animações");
            else
                console.log("Starting animations");
    }
}

function alteraDificuldade(){

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);

    if(jogo.estadoOcioso){
        impedeOcioso();
    }

    if(jogo.dificuldade == 1){
        jogo.dificuldade = 2;

        if(idioma == "pt")
            document.getElementById("status_dificuldade").innerHTML = "Díficil";
        else
            document.getElementById("status_dificuldade").innerHTML = "Hard";
    }else if(jogo.dificuldade == 2){
        jogo.dificuldade = 3;

        document.getElementById("status_dificuldade").innerHTML = "Expert";

        document.getElementById("stats_dead").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
        document.getElementById("stats_dead2").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
    }else if(jogo.dificuldade == 3){
        jogo.dificuldade = 0;

        if(idioma == "pt")
            document.getElementById("status_dificuldade").innerHTML = "Fácil";
        else
            document.getElementById("status_dificuldade").innerHTML = "Easy";

        document.getElementById("stats_dead").style.backgroundImage = "none";
        document.getElementById("stats_dead2").style.backgroundImage = "none";
    }else if(jogo.dificuldade == 0){
        jogo.dificuldade = 1;
        document.getElementById("status_dificuldade").innerHTML = "Normal";
    }

    sincronizaQtdModificadores();
    localStorage.setItem("dificuldadeJogo", jogo.dificuldade);
}

function sincronizaDificuldade(){

    if(jogo.dificuldade == 1){       // Normal  = 1
        document.getElementById("status_dificuldade").innerHTML = "Normal";
    }else if(jogo.dificuldade == 2){ // Díficil = 2
        if(idioma == "pt")
            document.getElementById("status_dificuldade").innerHTML = "Díficil";  
        else
            document.getElementById("status_dificuldade").innerHTML = "Hard";
    }else if(jogo.dificuldade == 3){ // Expert  = 3

        document.getElementById("status_dificuldade").innerHTML = "Expert";

        document.getElementById("stats_dead").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
        document.getElementById("stats_dead2").style.backgroundImage = "url('Imagens/Icones/Icone.gif')";
    }else if(jogo.dificuldade == 0){ // Fácil   = 0
        if(idioma == "pt")
            document.getElementById("status_dificuldade").innerHTML = "Fácil";
        else
            document.getElementById("status_dificuldade").innerHTML = "Easy";
    }
}

function alteraEstadoOcioso(){

    executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2);

    if(jogo.estadoOcioso == 1)
        impedeOcioso();

    if(jogo.ociosidade){
        jogo.ociosidade = 0;

        if(idioma == "pt")
            document.getElementById("status_modo_ocioso").innerHTML = "Desativado";
        else
            document.getElementById("status_modo_ocioso").innerHTML = "Disabled";
    }else{
        jogo.ociosidade = 1;

        if(idioma == "pt")
            document.getElementById("status_modo_ocioso").innerHTML = "Ativado";
        else
            document.getElementById("status_modo_ocioso").innerHTML = "Activated";
    }

    localStorage.setItem("ociosidade", jogo.ociosidade);
}

function sincronizaOciosidade(){

    if(jogo.ociosidade){
        if(idioma == "pt")
            document.getElementById("status_modo_ocioso").innerHTML = "Ativado";
        else
            document.getElementById("status_modo_ocioso").innerHTML = "Activated";
        
        if(jogo.estatisticasNerds)
            if(idioma == "pt")
                console.log("%cA Ociosidade está ativa", "color: green;");
            else
                console.log("%cIdleness is active", "color: green;");
    }else
        if(idioma == "pt")
            document.getElementById("status_modo_ocioso").innerHTML = "Desativado";
        else
            document.getElementById("status_modo_ocioso").innerHTML = "Disabled";
}

function sincronizaModificadoresComprados(requisicao_auto){

    // Modificadores ativos ( + Tempo )
    if(jogador.mods_comprados[0] == 1){
        document.getElementById("mod_1").style.display = "block";
        
        jogador.tempoMod = 10;
    }else{
        document.getElementById("mod_1").style.display = "none";
        jogador.tempoMod = 5;
        jogo.timer_mod = 5;
        jogador.mods_comprados[0] = 0;
    }

    // Quantidade de Modificadores ativos por partida ( + Vezes )
    if(jogador.mods_comprados[1] == 1)
        document.getElementById("mod_2").style.display = "block";
    else
        document.getElementById("mod_2").style.display = "none";
    
    // Modificador: Flutua
    if(jogador.mod_em_uso == 0)
        document.getElementById("mod_0").style.display = "block";
    else
        document.getElementById("mod_0").style.display = "none";
    
    // Modificador: De Aço
    if(jogador.mod_em_uso == 1)
        document.getElementById("mod_3").style.display = "block";
    else
        document.getElementById("mod_3").style.display = "none";
    
    // Modificador: Lunar
    if(jogador.mod_em_uso == 100)
        document.getElementById("mod_4").style.display = "block";
    else
        document.getElementById("mod_4").style.display = "none";

    localStorage.setItem("modsComprados", jogador.mods_comprados);

    if(requisicao_auto == 0)
        localStorage.setItem("modsCompradosUsados", jogador.mods_vezes_usados);
    
    sincronizaQtdModificadores();
}

function sincronizaQtdModificadores(){

    if(jogador.mods_comprados[1] == 0){
        if(jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdMods = 5; 
        else if(jogo.dificuldade == 2) // Díficil
            jogador.qtdMods = 4;
        else                           // Expert
            jogador.qtdMods = 3;
    }else{
        if(jogo.dificuldade == 0 || jogo.dificuldade == 1) // Fácil
            jogador.qtdMods = 10; 
        else if(jogo.dificuldade == 2) // Díficil
            jogador.qtdMods = 8;
        else                           // Expert
            jogador.qtdMods = 6;
    }

    if(jogador.mods_comprados[0] == 1)
        jogo.timer_mod = 10;
    
    document.getElementById("qtdMods").innerHTML = jogador.qtdMods;
    document.getElementById("timer_mod").innerHTML = jogo.timer_mod;
}

function sincronizaVezesModificadoresComprados(){

    for(var i = 0; i < 2; i++){
        if(jogador.mods_vezes_usados[i] > 0)
            jogador.mods_vezes_usados[i] -= 1;

        if(jogador.mods_vezes_usados[i] == 0)
            jogador.mods_comprados[i] = 0;
    }

    // Subtrai a qtd de usos caso o modificador esteja ativo
    if(jogador.mods_vezes_usados[2] > 0 && jogador.mod_em_uso == 1){
        jogador.mods_comprados[2] = 1;
        jogador.mods_vezes_usados[2] -= 1;
    }

    if(jogador.mods_vezes_usados[3] > 0 && jogador.mod_em_uso == 100){
        jogador.mods_comprados[3] = 1;
        jogador.mods_vezes_usados[3] -= 1;
    }

    // Esgota o uso dos modificadores principais comprados
    if(jogador.mods_vezes_usados[2] == 0 && jogador.mod_em_uso == 1){
        jogador.mods_comprados[2] = 0;
        jogador.mod_em_uso = 0;
    }

    if(jogador.mods_vezes_usados[3] == 0 && jogador.mod_em_uso == 100){
        jogador.mods_comprados[3] = 0;
        jogador.mod_em_uso = 0;
    }

    if(jogador.mods_vezes_usados[0] == 0 || jogador.mods_vezes_usados[1] == 0 || jogador.mods_vezes_usados[2] == 0)
        sincronizaModificadoresComprados(0);

    if(jogo.estatisticasNerds){
        if(idioma == "pt"){
            console.log("%cModificador Principal ativo no momento: "+ jogador.mod_em_uso, "color: orange;");
            console.log("%cModificadores em partidas: "+ jogador.mods_vezes_usados, "color: orange;");
        }else{
            console.log("%cCurrently active Main Modifier: "+ jogador.mod_em_uso, "color: orange;");
            console.log("%cModifiers in rounds: "+ jogador.mods_vezes_usados, "color: orange;");
        }
    }
    
    localStorage.setItem("modEmUso", jogador.mod_em_uso);
    localStorage.setItem("modsComprados", jogador.mods_comprados);
    localStorage.setItem("modsCompradosUsados", jogador.mods_vezes_usados);
}

function sincroniza_bonus(requisicao_auto){

    if(requisicao_auto != 1){
        for(var i = 0; i < 3; i++){
            if(jogador.bonus_vezes_usados[i] == 0)
                jogador.bonus_comprados[i] = 0;
            else
                jogador.bonus_vezes_usados[i] -= 1;
        }

        if(jogador.bonus_vezes_usados[0] == 0)
            jogador.bonus_comprados[0] = 0;

        if(jogador.bonus_vezes_usados[1] == 0)
            jogador.bonus_comprados[1] = 0;
        
        if(jogador.bonus_vezes_usados[2] == 0)
            jogador.bonus_comprados[2] = 0;

        localStorage.setItem("bonusComprados", jogador.bonus_comprados);
        localStorage.setItem("bonusVezesUsados", jogador.bonus_vezes_usados);
    }

    // Icones de bônus adquiridos
    for(var i = 1; i <= 3; i++){
        nome = "bonus_"+ i;

        if(jogador.bonus_comprados[i - 1] == 1)
            document.getElementById(nome).style.display = "block";
        else
            document.getElementById(nome).style.display = "none";
    }

    bonus_modificadores();
}

function bonus_modificadores(){

    if(jogador.bonus_comprados[2] == 1)
        jogador.qtdPulos = 5;
    else
        jogador.qtdPulos = 3;
}