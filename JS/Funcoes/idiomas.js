var idioma = null, modificador_principal_trad = [], bonus_ativos_trad = [];

function define_idioma(idioma){

    verifica = localStorage.getItem("idioma");
    if(verifica == null)
        verifica = "pt";
    
    if(verifica != idioma){
        localStorage.setItem("idioma", idioma);
    
        location.reload();
    }
}

function carrega_idioma(caso){

    idioma = localStorage.getItem("idioma");

    if(idioma == null)
        idioma = "pt";
    
    sincronizaNomeConquistas();

    if(caso)
        traduz();
    else
        return idioma;
}

function traduz(){

    var textos = ["iniciar_", "fechador_log", "fimdejogo", "velocidade_trad", "mod_trad", "pontuador_trad", "temporizador_trad", "versao_texto_trad", "pulos_trad", "reload_button", "resumo_partida_trad", "pontuacao_trad", "tempo_correndo_trad", "distancia_trad", "n_de_pulos_trad", "mods_utilizados_trad", "moedas_coletadas_trad", "n_de_pisoes_trad", "predios_atropelados_trad", "causa_perca_trad", "eventos_trad", "eventos_concluidos_trad", "tempo_em_eventos_trad", "evento_cidade_trad", "evento_parque_trad", "evento_agua_trad", "conquistas_trad", "controles_trad", "problemas_trad", "suporte_trad", "estatisticas_trad", "n_de_mortes", "moedas_gastas_trad", "skins_compradas_trad", "mods_comprados_trad", "bonus_comprados_trad", "pontos_obtidos_trad", "melhor_partida_trad", "pontos_trad", "opcoes_trad", "excluir_dados_trad", "geral_trad", "loja_trad", "espaco_trad", "pulo_trad", "cancela_compra", "confirmar_compra", "sons_trad", "graficos_trad", "idiomas_trad", "bonus_trad", "moedas_trad", "atalhos_trad", "dificuldade_trad", "inimigos_trad", "como_jogar_trad", "problemas_descri_trad", "suporte_descri_1", "suporte_descri_2", "texto_confirmacao", "texto_confirmacao_excl", "titu_loja", "fechador_loja", "voltar_inicio_loja", "musicas_trad", "efeitos_trad", "modo_ocioso_trad", "notificacoes_conquistas_trad", "estatisticas_nerd_trad", "estatisticas_morte_trad", "definir_tempo_trad", "animacoes_trad", "temas_trad", "avancar_trad", "nega_hist", "confirma_hist", "boas_vindas_trad", "sons_ativados_trad", "beleuza_trad", "versao_trad", "historia_trad", "button_pulo", "status_anima", "pular_trad"];

    if(idioma == "en")
        var idioma_array = ["Start ( W )", "Return to the game >>", "End of the line", "Velocity", "Modifier", "Score", "Duration", "Version 1.1", "Jumps", "Reload ( R )", "Match Summary", "Score", "Time Played", "Distance", "of Jumps", "Used Mods", "Coins Collected", "of Kicks", "Demolished buildings", "Cause of loss", "Events", "Completed events", "Time in events", "City", "Park", "Water", "Achievements", "Controls", "Issues", "Support", "Statistics", "of Deaths", "Spent Coins", "Purchased skins", "Purchased Mods", "Purchased Bonuses", "Points Earned", "Best Match", "Point(s)", "Options", "Erase Data", "General", "Shop", "Space", "Jump", "Cancel", "Confirm", "Sounds", "Graphics", "Language", "Bonuses", "Coins", "Hotkeys", "Difficulty", "Enemies", "How to Play", "We don't wait for bugs, but if it does, let me know on Twitter or Discord!", "Help to develop this game, each donation will be very welcome to us :D", "You can help by scanning the QR Code on the side or by accessing the link below ;)", "Confirm your purchase?", "Do you really want to erase your data?", "Welcome to the Store!", "Close the Store >>", "Return", "Songs", "Effects", "Idle mode", "Achievement Notifications", "Statistics for Nerds", "Statistics when dying", "Set Time", "Animations", "Themes", "Next", "No", "Yes", "Hi! Welcome", "Sounds activated! adjust the volume ;)", "Ok!", "This is 1.1!<center><img id='ibagem' src='Imagens/Atualiza/Bullshit.gif'><br><br></center> Watch out for bugs! <br> We don't expect it, but it can happen :P", "Story", "Jump", "Disabled", "Skip"];
    else
        var idioma_array = ["Iniciar ( W )", "Voltar ao jogo >>", "Fim de jogo", "Velocidade", "Modificador", "Pontuação", "Tempo", "Versão 1.1", "Pulos", "Recarregar ( R )", "Resumo da Partida", "Pontuação", "Tempo correndo", "Distância", "de Pulos", "Mods. Utilizados", "Moedas coletadas", "de Pisões", "Prédios atropelados", "Causa da perda", "Eventos", "Eventos concluídos", "Tempo em eventos", "Cidade", "Parque", "Água", "Conquistas", "Controles", "Problemas", "Suporte", "Estatísticas", "de Mortes", "Moedas Gastas", "Skins Compradas", "Mods Comprados", "Bônus Comprados", "Pontos Obtidos", "Melhor Partida", "Ponto(s)", "Opções", "Excluir Dados", "Geral", "Loja", "Espaço", "Pular", "Cancelar", "Confirmar", "Sons", "Gráficos", "Idiomas", "Bônus", "Moedas", "Atalhos", "Dificuldade", "Inimigos", "Como Jogar", "Não esperamos por bugs, mas caso aconteça me avise no Twitter ou no Discord!", "Ajude a desenvolver este jogo, cada doação será muito bem-vinda para nós :D", "Você pode ajudar escaneando o QR Code ao lado ou acessando o link abaixo ;)", "Confirma sua compra?", "Deseja realmente apagar seus dados?", "Bem Vindo(a) a Loja!", "Fechar a Loja >>", "Voltar", "Músicas", "Efeitos", "Modo ocioso", "Notificações de Conquistas", "Estatísticas p/ Nerds", "Estatísticas ao morrer", "Definir Tempo", "Animações", "Temas", "Avançar", "Não", "Sim", "Olá! Bem-vindo(a)", "Sons ativados! Ajuste o volume ;)", "Beleuza!", "Essa é a 1.1!<center><img id='ibagem' src='Imagens/Atualiza/Bullshit.gif'><br><br></center> Cuidado com os bugs! <br>Não esperamos, mas pode acontecer :P", "História", "Pular", "Desativadas", "Pular"];

    // Passa por todos os indices do array ( Textos ), traduzindo os elementos com os valores corretos.
    for(var i = 0; i < idioma_array.length; i++){

        alvos = document.getElementsByClassName(textos[i]); 
        
        // Traduz os itens da tela conforme a quantidade de itens iguais
        for(var j = 0; j < alvos.length; j++){
            alvos[j].innerHTML = idioma_array[i];
        }
    }

    pulos_trad = document.getElementsByClassName("pulos_trad");

    if(idioma == "pt"){
        pulos_trad[0].style.left = "10%";

        modificador_principal_trad = ["Modificador Principal: Flutuante", "Modificador Principal: De Aço", "Modificador Principal: Gravidade Lunar", "+ Tempo", "+ Vezes"];
        bonus_ativos_trad = ["Garimpeiro", "Vento Estocado"];

        nome_notificacoes = ["Você ganhou um <a href='#' onclick='abre_loja_especial(1)'>mod!</a>", "Você ganhou um <a href='#' onclick='abre_loja_especial(3)'>tema!</a>"];

        jogo.anuncio_evento = ["Entrando em Área Densa", "Água em Frente, Cuidado!", "Entrando no Parque", "O Chão é Lava!"];
        jogo.saida_evento = ["Saindo da Área", "Terra à Vista!", "Saindo do Parque", "Essa foi por pouco!"];

        // Textos da loja
        descricao_Mods = ["Acrescenta mais tempo ao seu modificador", "Acrescenta mais vezes de uso por partida ao seu modificador", "Modificador Principal: Te transforma numa bigorna ambulante, destruindo tudo o que vê pela frente!", "Modificador Principal: Proporciona uma gravidade diferente ao jogo, tornando a partida um tanto quanto imprevisível."];
        descricao_Bonus = ["Todos os pisões irão dar o dobro de moedas!", "Ao completar o evento de água, você ganhará umas moedas bônus!", "O Vento Estocado pode ser usado nas partidas como um empurrão para você ficar no ar por mais tempo."];
        descricao_Tema = ["Volte a uma época de prosperidades e incertezas políticas.", "O tema padrão do Pula Prédios."];
    }else{

        pulos_trad[0].style.left = "5%";

        modificador_principal_trad = ["Main Modifier: Floating", "Main modifier: Of steel", "Main Modifier: Lunar Gravity", "+ Time", "+ Turns"];
        bonus_ativos_trad = ["Gold miner", "Stocked Wind"];

        nome_notificacoes = ["You won a <a href='#' onclick='abre_loja_especial(1)'>mod!</a>"];

        jogo.anuncio_evento = ["Entering Dense Area", "River in front, be careful!", "Entering the Park", "The Floor is Lava!"];
        jogo.saida_evento = ["Leaving the Area", "Land in sight!", "Leaving the Park", "That was close!"];

        // Textos da loja
        descricao_Mods = ["Adds more time to your modifier", "Adds more usage times per match to your modifier", "Main Modifier: Turns you into a walking anvil, destroying everything you see ahead!", "Main Modifier: Provides a different gravity to the game, making the game somewhat unpredictable."];
        descricao_Bonus = ["All kicks will give you double coins!", "Upon completing the river event, you will earn some bonus coins!", "Stocked Wind can be used in matches as a boost to keep you in the air for longer time."];
        descricao_Tema = ["Return to a time of prosperity and political uncertainty.", "The default theme of Pula Prédios."];
    }
}

function toolTip_trad(categoria, alvo){

    if(categoria == 0)
        toolTip(modificador_principal_trad[alvo]);
    else if(categoria == 1)
        toolTip(bonus_ativos_trad[alvo]);
    else
        if(idioma == "pt")
            toolTip("Abrir a loja");
        else
            toolTip("Open the store");
}