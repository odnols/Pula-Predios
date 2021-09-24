var confirma_carregamento = 0, dispositivo = window.screen.width, faixa_tocar = 0, indice = 0, faixa = 0, progresso_sons = 0;

function carrega_jogo(requisicao_auto){
    
    // Ativa o botão de mod para dispositivos móveis
    if(dispositivo < 1366)
        $("#botoes_acessibilidade").fadeIn();

    verifica = localStorage.getItem("iniciaLoucura_1.1");

    if(requisicao_auto == 0 && verifica == null){
        document.getElementById("primeiro_logon").style.display = "block";

        idioma = carrega_idioma(0);

        if(idioma == "en"){
            document.getElementById("button_inicia_game").innerHTML = "Start";
            document.getElementById("versao_trad").innerHTML = "Version 1.1";
        }
        return 0;
    }else{

        idioma = carrega_idioma(0);
        
        $("#status_carregamento").fadeIn();
        $("#primeiro_logon").fadeOut();

        if(idioma == "pt")
            document.getElementById("texto_carregamento").innerHTML = "Ligando os motores";
        else if(idioma == "en")
            document.getElementById("texto_carregamento").innerHTML = "Starting the engines";

        if(dispositivo >= 1366){
            iniciaAnimacao();
            $("#button_animacoes_pc").fadeIn();
            $("#button_animacoes_cell").fadeOut();
        }

        var carregar_departamentos = [sincronizaQualidadeGrafica(), main(), aleatorizaProp(), sincronizaQuadroConquistas(), carrega_idioma(1)];
        var texto_feedback_pt = ["Vasculhando o cache", "Colocando combustível", "Animando", "Aleatorizando Props", "Admirando Conquistas", "Traduzindo", "Sintonizando os sons"];
        var texto_feedback_en = ["Searching the cache", "Putting fuel", "Starting animations", "Randomizing Props", "Admiring Achievements", "translating", "Tuning the sounds"];

        monta_data_atual = new Date();

        mes = monta_data_atual.getUTCMonth() + 1;
        dia = monta_data_atual.getUTCDate();
        ano = monta_data_atual.getUTCFullYear();

        data_atual = ano + "/" + mes + "/" + dia;

        // Verifica quando foi a última sessão
        ultima_sessao = localStorage.getItem("ultimoCarregamento");
        if(ultima_sessao == null)
            carregar_tudo = true;
        else // Define se será um carregamento rápido ou completo
            if(data_atual != ultima_sessao)
                carregar_tudo = true;
            else
                carregar_tudo = false; // true p/ sempre carregar
        
        if(carregar_tudo){
            localStorage.setItem("ultimoCarregamento", data_atual);

            var indice = 0;

            carregar_departaments = setInterval(function(){
                if(idioma == "pt")
                    document.getElementById("texto_carregamento").innerHTML = texto_feedback_pt[indice];
                else
                    document.getElementById("texto_carregamento").innerHTML = texto_feedback_en[indice];
                indice++;

                document.getElementById("progresso_barra_carregamento").style.width = (indice * 8.33).toFixed(2) + "%";
                document.getElementById("porcentagem_carregada").innerHTML = (indice * 8.33 ).toFixed(2) + "%";

                if(indice >= carregar_departamentos.length){
                    clearInterval(carregar_departaments);

                    if(idioma == "pt")
                        carrega_sons(texto_feedback_pt[6]);
                    else
                        carrega_sons(texto_feedback_en[6]);
                }
            }, 1000);
        }else{
            document.getElementById("texto_carregamento").style.color = "Yellow";

            if(idioma == "pt"){
                document.getElementById("texto_carregamento").innerHTML = "Carregamento Rápido";
                document.getElementById("porcentagem_carregada").innerHTML = "Uma Odisseia pulatória";
            }else{
                document.getElementById("texto_carregamento").innerHTML = "Fast load";
                
                document.getElementById("porcentagem_carregada").innerHTML = "An Odyssey full of heels";
            }
            for(var i = 0; i < carregar_departamentos.length; i++){
                carregar_departamentos[i];
            }
            
            setTimeout(function(){

                executaSomCarrega();

                document.getElementById("carrega_jogo").style.animation = "termina_carregamento2 1s";
                $("#carrega_jogo").fadeOut(1000);

                if(verifica == null)
                    historia();
            }, 1000);

            setTimeout(function(){
                confirma_carregamento = 1;
            }, 2000);
        }
    }
}

function carrega_sons(texto){

    var lista_musicas = ["intro_1", "intro_2", "intro_3", "log", "loja", "main", "main_2", "ocioso", "ocioso_2"];
    var lista_memes = ["bambam", "bambam2", "bambam3", "daciolo", "dilma_vento_1", "dilma_vento_2", "dilma_vento_3", "dilma_vento_4", "falencia", "gas", "jailson_1", "jailson_2", "jailson_3", "jailson_4", "parque", "parque2", "Sumiu"];
    var lista_inicio = ["comeca_1", "comeca_2", "comeca_3", "comeca_4", "comeca_5", "comeca_6", "comeca_7", "comeca_8"];
    var lista_final = ["morreu_1", "morreu_2", "morreu_3", "morreu_4", "morreu_5", "morreu_6", "morreu_7", "morreu_8", "morreu_9", "morreu_10", "morreu_11", "morreu_12", "morreu_13", "morreu_14", "morte_agua", "morte_lava"];
    var lista_efeitos = ["Batida", "bigorna", "compra", "conquista_secreta", "conquista", "flutua", "hat", "levelup", "moeda", "orb", "parque", "pop", "Pulo1", "Pulo2", "Pulo3", "skin", "snare", "transitador_loja", "Vento"];
    
    var localizacao = ["Musicas", "Memes", "Inicio", "Final", "Efeitos"];

    var faixas_sonoras = ["faixa_musicas", "faixa_ambiente", "faixa_conquistas", "faixa_pisoes", "faixa_memes1", "faixa_memes2", "faixa_efeitos1", "faixa_efeitos2", "faixa_efeitos3"];

    alvo = [lista_musicas, lista_memes, lista_inicio, lista_final, lista_efeitos];

    document.getElementById("texto_carregamento").innerHTML = texto;
    
    porcentagem_sons = 25/69;

    
    carregar_sons = setTimeout(function(){

        if(indice == alvo.length){
            clearTimeout(carregar_sons);
            // audio.pause();

            ultimo_estagio_carregamento();
            return null;
        }

        audio = document.getElementById(faixas_sonoras[faixa_tocar]);
        audio.volume = 0;
        faixa_tocar++;

        progresso_sons += porcentagem_sons;
        progresso_formatado = (50 + progresso_sons).toFixed(2);

        document.getElementById("progresso_barra_carregamento").style.width = 50 + progresso_sons +"%";
        document.getElementById("porcentagem_carregada").innerHTML = progresso_formatado + "%";

        // Descompacta a lista de faixas para carregar elas
        descompacta = alvo[indice];

        try{
            if(typeof descompacta[faixa] != undefined){
                nomeSom = descompacta[faixa] + ".ogg";

                if(nomeSom != "undefined.ogg"){
                    audio.src = "Sons/"+ localizacao[indice] +"/"+ nomeSom;
                    // audio.play();
                }
            }
        }catch(e){
            document.getElementById("progresso_barra_carregamento").style.width = 75 +"%";
            document.getElementById("porcentagem_carregada").innerHTML = 75 + "%";
            clearTimeout(carregar_sons);
    
            ultimo_estagio_carregamento();
            return null;
        }

        // Reinicia as faixas sonoras
        if(faixa_tocar > faixas_sonoras.length - 1)
            faixa_tocar = 0;

        // Ordena a reprodução das faixas e dos albuns
        if(faixa < descompacta.length - 1)
            faixa++;
        else{
            indice++;
            faixa = 0;
        }

        carrega_sons(texto);
    }, 100);
}

function ultimo_estagio_carregamento(){

    if(idioma == "pt")
        document.getElementById("texto_carregamento").innerHTML = "Sincronizando tudo e iniciando";
    else
        document.getElementById("texto_carregamento").innerHTML = "Syncing everything and getting started";

    largura_barra = $("#progresso_barra_carregamento").css("width");

    tamanho_restante = largura_barra;
    tamanho_restante = tamanho_restante.replace("px", "");
    tamanho_restante = parseFloat(tamanho_restante);

    fracao_restante = 25 / 100;

    sincronizacao_final = setInterval(function(){
        
        fracao_restante++;
        fraca_formatada = (75 + fracao_restante).toFixed(2);
        
        document.getElementById("progresso_barra_carregamento").style.width = (75 + fracao_restante) + "%";  
        document.getElementById("porcentagem_carregada").innerHTML = fraca_formatada + "%";

        if(fracao_restante > 25){
            document.getElementById("porcentagem_carregada").innerHTML = "100%";

            executaSomCarrega();

            clearInterval(sincronizacao_final);
            document.getElementById("carrega_jogo").style.animation = "termina_carregamento 1s";
            $("#carrega_jogo").fadeOut(1000);
            confirma_carregamento = 1;

            if(verifica == null)
                historia();
        }
    }, 80);
}