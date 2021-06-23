// Variáveis Globais
var canvas, ctx, Altura, Largura, Frame = 0, gravidade = 1.6, velocidade_obs = 10, regula_velo, estadoAtual, record, inicia_game, especial = 0, var_timer_especial, libera_transitador, tempo_evento, contador_tempo_interno = 0, pause_falho = 0, dev_op = 0, distancia_viajada = 0, contador_especial = 0, contador_evento, iniciando_evento = null, contador_pisoes = 0, ativa_evento, contador_batidas = 0, opacidade_noite = 0.0, controle = 0, segura_som = 0, data = new Date(), log_ = 0, hora = data.getHours(), posicao = 913, moedas = 0, estado_loja = 0, categoria_loja = null, segura_vento = 0, segura_fundo  = 0, aleatorizadorProp = 0,

labelPontuacao = {
    texto: "",
},

estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
},

background_predios = {
    predios: 0,
    montanhas: 0,
    montanhas2: 0,

    atualiza: function(){
        this.predios -= velocidade_obs * 0.2;
        this.montanhas -= velocidade_obs * 0.22;
        this.montanhas2 -= velocidade_obs * 0.1;

        if(this.predios <= -Largura)
            this.predios = 0;

        if(this.montanhas <= -Largura)
            this.montanhas = 0;
        
        if(this.montanhas2 <= -Largura)
            this.montanhas2 = 0;
    },

    desenha: function(){

        spriteMontanhas.desenha(this.montanhas2, 480);
        spriteMontanhas.desenha(this.montanhas2 + Largura, 480);

        transitador("montanhas_noite", 112, this.montanhas2 - 10, 480);
        transitador("montanhas_noite", 112, this.montanhas2 + Largura, 480);

        spriteCidade.desenha(this.predios, 257);
        spriteCidade.desenha(this.predios + Largura, 257);

        transitador("cidade_noite", 150, this.predios, 195);
        transitador("cidade_noite", 150, this.predios + Largura, 195);

        spriteMontanhas.desenha(this.montanhas, 510);
        spriteMontanhas.desenha(this.montanhas + Largura, 510);

        transitador("montanhas_noite", 112, this.montanhas, 510);
        transitador("montanhas_noite", 112, this.montanhas + Largura, 510);
    }
},

Cenario_sprites = {
    
    astro: [-250, 400, 0, 0, 0], // 0 (Localização), 1 (Altura), 2 (Astro), 3 (Transições), 4 (Controle)
    nuvem_camada1: 0,
    nuvem_camada2: 0,
    nuvem_camada3: 0,
    nuvem_camada4: 0,

    atualiza: function(){

        // Define se o jogo iniciará de dia ou de noite
        if(hora > 6 && hora < 18 && this.astro[4] == 0){ // Dia
            this.astro[2] = 0;
            this.astro[4] = 1;
            libera_transitador = 0;
        }else if(this.astro[4] == 0){ // Noite
            this.astro[2] = 1;
            this.astro[4] = 1;
            libera_transitador = 1;
            opacidade_noite = 1.0;
        }

        // Altera o Cenário automáticamente
        Cenario(this.astro[2]);
        
        // Velocidade do astro
        this.astro[0] += .5;
        this.predios -= velocidade_obs * 0.2;
        this.nuvem_camada1 -= velocidade_obs * 0.03;
        this.nuvem_camada2 -= velocidade_obs * 0.04;
        this.nuvem_camada3 -= velocidade_obs * 0.05;
        this.nuvem_camada4 -= velocidade_obs * 0.06;


        if(this.astro[0] > 1376){
            this.astro[0] = -250; // Posição
            this.astro[1] = 400; // Altura

            // Inverte entre Sol e Lua, Sol = 0, Lua = 1
            if(this.astro[2] == 0)
                this.astro[2] = 1;
            else
                this.astro[2] = 0;

        }

        // Faz a animação de Subida suave dos Astros
        if(this.astro[0] < 341)
            this.astro[1] -= .2;
        else if(this.astro[0] > 341 && this.astro[0] < 550)
            this.astro[1] -= .1;

        if(this.astro[0] > 920)
            this.astro[1] += .2;
        else if(this.astro[0] > 650 && this.astro[0] < 920){
            this.astro[1] += .1;
            
            if(this.astro[3] == 0 && this.astro[0] > 900 && this.astro[2] == 1){
                document.getElementById("filtro").style.animation = "amanhecer 20s";
                this.astro[3] = 1;
                transita_tempo(0); // Amanhecer
                aleatorizaProp();
            }
            
            if(this.astro[3] == 0 && this.astro[0] > 900 && this.astro[2] == 0){
                document.getElementById("filtro").style.animation = "entardecer 20s";
                this.astro[3] = 1;
                transita_tempo(1); // Anoitecer
                aleatorizaProp();
            }
        }else
            if(this.astro[3] == 1)
                this.astro[3] = 0;

        if(this.predios <= -Largura)
            this.predios = 0;
        
        if(this.nuvem_camada1 <= -Largura)
            this.nuvem_camada1 = 0;
            
        if(this.nuvem_camada2 <= -Largura)
            this.nuvem_camada2 = 0
        
        if(this.nuvem_camada3 <= -Largura)
            this.nuvem_camada3 = 0;
            
        if(this.nuvem_camada4 <= -Largura)
            this.nuvem_camada4 = 0;
    },

    desenha: function(){

        if(this.astro[2] == 0){
            spriteSol.desenha(this.astro[0], this.astro[1]);
            spriteSol.globalAlpha = 1;
        }else{
            spriteLua.desenha(this.astro[0], this.astro[1]);
            spriteSol.globalAlpha = 0;
        }

        if(-this.astro[0] * 20 > -110 && this.astro[2] == 1 && aleatorizadorProp > 3)
            spriteOvni.desenha(-this.astro[0] * 20, this.astro[1] / 1.5);

        spriteNuvens.desenha(this.nuvem_camada1, 280);
        spriteNuvens.desenha(this.nuvem_camada1 + Largura, 280);

        transitador("nuvens1_noite", 135, this.nuvem_camada1, 280);
        transitador("nuvens1_noite", 135, this.nuvem_camada1 + Largura, 280);

        spriteNuvensSup.desenha(this.nuvem_camada3 + 500, 150);
        spriteNuvensSup.desenha(this.nuvem_camada3 + 500 + Largura, 150);

        transitador("nuvens1_2_noite", 400, this.nuvem_camada3 + 500, 150);
        transitador("nuvens1_2_noite", 400, this.nuvem_camada3 + 500 + Largura, 150);

        spriteNuvensSup.desenha(this.nuvem_camada4 + 90, 50);
        spriteNuvensSup.desenha(this.nuvem_camada4 + 90 + Largura, 50);
        
        transitador("nuvens1_2_noite", 400, this.nuvem_camada4 + 90, 50);
        transitador("nuvens1_2_noite", 400, this.nuvem_camada4 + 90 + Largura, 50);


        if(this.astro[0] * 3 < 1380 && this.astro[2] == 0 && aleatorizadorProp > 1)
            spriteAviao.desenha(this.astro[0] * 4, 90);
        

        spriteNuvensSup2.desenha(this.nuvem_camada3 + 900, 80);
        spriteNuvensSup2.desenha(this.nuvem_camada3 + 900 + Largura, 80);

        transitador("nuvens2_2_noite", 500, this.nuvem_camada3 + 950, 88);
        transitador("nuvens2_2_noite", 500, this.nuvem_camada3 + 950 + Largura, 88);

        spriteNuvens2.desenha(this.nuvem_camada2, 330);
        spriteNuvens2.desenha(this.nuvem_camada2 + Largura, 330);
        

        transitador("nuvens2_noite", 126, this.nuvem_camada2, 330);
        transitador("nuvens2_noite", 126, this.nuvem_camada2 + Largura, 330);

        spriteCidade.desenha(this.predios, 257);
        spriteCidade.desenha(this.predios + Largura, 257);

    }
},

background_ceu = {
    desenha: function(){
        spriteCeu.desenha(0, 0);

        transitador("ceu_noite", 750, 0, 0);
    }
},

chao = {
    y: 555,
    x: 0,
    x2: 0,
    x3: 0,
    // Responsáveis por fazer o controle das transições entre os sprites dos chãos
    libera_volta_chao: [0, 0, 0],
    trava: [0, 0, 0],

    reserva: [0, 0, 0],
    confirma: [0, 0, 0],
    muda_chao: [0, 0, 0],
    volta_chao: [0, 0, 0],

    atualiza: function(){

        this.x -= velocidade_obs;
        this.x2 -= velocidade_obs * 0.8;
        this.x3 -= velocidade_obs * 1.2;

        // Confirmando o evento aquático
        if(jogo.evento != 1){
            this.confirma[0] = 0;
            this.confirma[1] = 0;
            this.confirma[2] = 0;
        }

    //  Sprite de Trás
        if(this.x2 <= -Largura){
            this.x2 = 0;

            if(this.muda_chao[2] == 1)
                this.muda_chao[2] = 2;

            if(this.reserva[2] == 1 || this.volta_chao[2] == 2){
                this.muda_chao[2] = 0;
                this.volta_chao[2] = 0;
                this.libera_volta_chao[2] = 0;
            }

            if(this.reserva[2] == 1)
                this.reserva[2] = 2;

            if(jogo.evento == 1){
                this.confirma[2] = 1;

                // Gatilho automático para retornar o chão ao normal em velocidades altas
                if(velocidade_obs >= 20 && jogo.contador_tempo_interno < 3 && this.reserva[2] == 0){
                    this.libera_volta_chao[2] = 1;
                    this.reserva[2] = 1;
                }

                if(this.muda_chao[2] == 0)
                    this.muda_chao[2] = 1;
            }

            if(this.volta_chao[2] == 1){
                this.volta_chao[2] = 2;
                this.trava[2] = 1;
            }
        
            if(this.libera_volta_chao[2] == 1 && this.muda_chao[2] == 2){
                this.volta_chao[2] = 1;
                // this.reserva[2] = 1;
            }
        }

    //  Sprite do Meio
        if(this.x <= -Largura){
            this.x = 0;

            if(this.muda_chao[1] == 1)
                this.muda_chao[1] = 2;

            if(this.reserva[1] == 1 || this.volta_chao[1] == 2){
                this.muda_chao[1] = 0;
                this.volta_chao[1] = 0;
                this.libera_volta_chao[1] = 0;
            }

            if(this.reserva[1] == 1)
                this.reserva[1] = 2;

            if(jogo.evento == 1){
                this.confirma[1] = 1;
                
                // Gatilho automático para retornar o chão ao normal em velocidades altas
                if(jogo.contador_tempo_interno < 3 && this.reserva[1] == 0){
                    this.libera_volta_chao[1] = 1;
                    this.reserva[1] = 1;
                }

                if(this.muda_chao[1] == 0)
                    this.muda_chao[1] = 1;
            }
            
            if(this.volta_chao[1] == 1){
                this.volta_chao[1] = 2;
                this.trava[1] = 1;
            }
        
            if(this.libera_volta_chao[1] == 1 && this.muda_chao[1] == 2){
                this.volta_chao[1] = 1;
                // this.reserva[1] = 1;
            }
        }

    //  Sprite da Frente
        if(this.x3 <= -Largura){
            this.x3 = 0;

            if(this.muda_chao[0] == 1)
                this.muda_chao[0] = 2;
            
            if(this.reserva[0] == 1 || this.volta_chao[0] == 2){
                this.muda_chao[0] = 0;
                this.volta_chao[0] = 0;
                this.libera_volta_chao[0] = 0;
            }

            if(this.reserva[0] == 1)
                this.reserva[0] = 2;

            if(jogo.evento == 1){
                this.confirma[0] = 1;
                
                // Gatilho automático para retornar o chão ao normal em velocidades altas
                if(velocidade_obs >= 20 && jogo.contador_tempo_interno < 3 && this.reserva[0] == 0){
                    this.libera_volta_chao[0] = 1;
                    this.reserva[0] = 1;
                }

                if(this.muda_chao[0] == 0)
                    this.muda_chao[0] = 1;
            }

            if(this.volta_chao[0] == 1){
                this.volta_chao[0] = 2;
                this.trava[0] = 1;
            }
        
            if(this.libera_volta_chao[0] == 1 && this.muda_chao[0] == 2){
                this.volta_chao[0] = 1;
            }
        }
    },

    desenha: function(){

        desenha_chao1();
    },

    desenha2: function(){
        
        desenha_chao2();
    },

    desenha3: function(){
        
        desenha_chao3();
    }
},

jogo = {
    inicia_evento: null,
    evento: null,
    qtd_eventos: [5, 7, 4],
    quantia_pixels: 0,
    quantia_pixels_interno: 0,
    contador_tempo: 0,
    contador_tempo_evento: 0,
    contador_tempo_evento_b: 0,
    contador_tempo_interno: 0,
    timer_especial: 5,
    anuncio_evento: ["Entrando em Área Densa", "Água em Frente, Cuidado!", "Entrando no Parque", "O Chão é Lava!"],
    saida_evento: ["Saindo da Área","Terra a Vista!","Saindo do Parque","Essa foi por pouco!"],
    largura_barra: 0,
    converte_barra: 0,

    operador: function(){
        if(dev_op == 0){
            ajusta_cores(3, 2);
            document.getElementById("estado_especial").innerHTML = "DEV";
            especial = 1;
            dev_op = 1;
        }else{
            ajusta_cores(5, 2);
            document.getElementById("estado_especial").innerHTML = "Seg";
            especial = 0;
            dev_op = 0;
        }
    },

    recarrega_timer: function(){
        var_timer_recarrega = setInterval( function(){
            if(jogo.timer_especial < 5 && especial == 0){
                jogo.timer_especial++;
            }else{
                ajusta_cores(5, 2);
                clearInterval(var_timer_recarrega);
                document.getElementById("carregando").style.display = "none";
            }
        }, 2000);
    },

    relogio_eventos: function(){
    //  Define o tempo que o próximo evento demorará para começar 
        this.contador_tempo = 12 + Math.round( 15 * Math.random());
        // this.contador_tempo = 5;

        ativa_evento = setTimeout(function(){
            jogo.eventos();
        }, this.contador_tempo * 2000);

        deleta_cronometro = setTimeout(function(){
            $("#temporizador").fadeOut();
            $("#barra_loading").fadeOut();

            limpa_chao();

            document.getElementById("completa_timer").style.width = "0px";
            jogo.quantia_pixels_interno = 0;

            clearTimeout(deleta_cronometro);
        }, 2000);
    },

    eventos: function(){
        // Determina qual será o próximo evento aleatoriamente
        // Tempo aleatório que ficará ativo o evento
        this.inicia_evento = Math.round( 2 * Math.random());
        // this.inicia_evento = 1;
        this.contador_tempo_evento = 15 + Math.round( 15 * Math.random());
        this.largura_barra = $("#barra_loading").css("width");

        this.largura_barra = this.largura_barra.replace("px", "");

        // this.converte_barra = this.largura_barra.split(".");
        // this.largura_barra = this.converte_barra[0];

        iniciando_evento = 5;
        executaSons("efeitos", "orb.ogg", 1);

        if(this.qtd_eventos[this.inicia_evento] == 0){
            jogo.eventos();
        }else{

            if(this.inicia_evento == 0){       // Evento da Cidade
                ajusta_cores(0, 1);
                this.qtd_eventos[0]--;
            }else if(this.inicia_evento == 1){ // Evento da Água
                this.contador_tempo_evento = 12;
                iniciando_evento = 3;
                ajusta_cores(1, 1);
                this.qtd_eventos[1]--;
            }else{                            // Evento do Parque
                this.contador_tempo_evento = 10 + Math.round( 15 * Math.random());
                ajusta_cores(2, 1);
                this.qtd_eventos[2]--;

                parque_event = setTimeout(function(){
                    if(estadoAtual == estados.jogando){
                        jogo.notifica("Hora de Pontuar!", "#14e11e");
                        executaSons("efeitos", "parque.ogg", 1);
                    }
             }, 3000);
            }

            $("#temporizador").fadeIn();
            $("#barra_loading").fadeIn();

            this.quantia_pixels = this.largura_barra / ( this.contador_tempo_evento * 20 );
            this.contador_tempo_interno = this.contador_tempo_evento - 1;

            document.getElementById("cronometro").innerHTML = this.contador_tempo_evento;

            if(this.inicia_evento == 1)
                preenche_barra();

            jogo.notifica(this.anuncio_evento[this.inicia_evento], "white");

            setTimeout(function(){

                jogo.evento = jogo.inicia_evento;

                if(jogo.inicia_evento != 1)
                    preenche_barra();                

                if(jogo.evento == 1)
                    jogo.contador_tempo_evento_b = 9;
                else
                    jogo.contador_tempo_evento_b = jogo.contador_tempo_evento;

                if(estadoAtual == estados.jogando){
                    tempo_evento = setTimeout(function(){
                        
                        finaliza_evento();
                    }, (jogo.contador_tempo_evento_b - 1) * 1000);
                }
            }, iniciando_evento * 1000);
        }
    },

    perdeu: function(causa){

        desliga_som("musicas", 2);

        if(velocidade_obs > 25)
            desliga_som2("ambiente", 1);

        estadoAtual = estados.perdeu;
        contador_batidas++;
        jogador.qtdPulos = 0;
        controle = 0;
        segura_som = 0;

        clearInterval(var_timer_especial);
        clearTimeout(tempo_evento);
        clearTimeout(ativa_evento);
        
        ajusta_cores(6, 2);
        MsgPerdeu(causa);
        regula_velocidade();
    },

    notifica: function(mensagem, cor){
        $("#notificacoes").fadeIn(300, "linear");
        document.getElementById("notificacoes").style.color = cor;
        document.getElementById("notificacoes").innerHTML = mensagem;

        if(Cenario_sprites.astro[2] == 0)
            document.getElementById("notificacoes").style.color = "rgba(0, 0, 0, .8)";

        setTimeout(function(){
            $("#notificacoes").fadeOut();
        }, 2000);
    }
},

jogador = {
    x: 50,
    y: -200,
    altura: spriteJogador.Altura-15,
    largura: 30,
    velocidade: 0,
    forcaDoPulo: 23.6,
    qtdPulos: 3,
    pulos_dados: 0,
    score: 0,

    atualiza: function(){
        this.velocidade += gravidade;
        this.y += this.velocidade;
        
        if(this.y > chao.y - this.altura && estadoAtual != estados.perdeu){
            this.y = chao.y - this.altura;
            this.qtdPulos = 3;
            this.velocidade = 0;
        }
    },

    pula: function(){
        if(this.qtdPulos > 0 && especial != 1){
            this.pula_effect = 1 + Math.round(2 * Math.random());
            executaSons2("efeitos2","Pulo"+this.pula_effect+".ogg", 1);

            this.velocidade = -this.forcaDoPulo;
            this.qtdPulos--;
            this.pulos_dados++;
        }
    },

    especial: function(){
        if(estadoAtual == estados.jogando && this.timer_especial != 0 && especial != 1){
            
            executaSons("efeitos", "Especial.ogg", 1);
            
            if(this.y >= 380)
                jogador.pula();
            else
                especial = 1;

            contador_especial++;
            var special = setTimeout(function(){
                especial = 1;
                clearTimeout(special);
            }, 200);

            jogador.timer();
        }
    },

    timer: function(){
        var_timer_especial = setInterval( function(){
            if(jogo.timer_especial > 0 && especial == 1){
                jogo.timer_especial--;
                jogador.flutua();
            }else{
            // Hack life p/ voar infinitamente, comente a linha abaixo \/
                especial = 0;
                clearInterval(var_timer_especial);
                this.velocidade = 0;
                jogo.recarrega_timer();
            }
        }, 1000);
    },

    flutua: function(){
        if(this.timer_especial % 1 == 0 && this.timer_especial % 3 == 0 )
            this.y += 6;
        else
            this.y -= 3;
    },

    desenha: function(){
        spriteJogador.desenha(this.x, this.y + 15);

        transitador("jogador_noite", 112, this.x, this.y + 15,);
    },
},

obstaculos = {
    _obs: [],
    _obsfundo: [],
    _obsfrente: [],
    _scored: false,
    tempoInsere: 0,
    qtdObjetos: 0,
    y: 120,

    insere: function(){
        if( velocidade_obs != 0)
            insere_obs();
    },

    atualiza: function(){

        if(jogador.y == 432 && chao.muda_chao[1] == 2 && jogo.timer_especial == 5 )
            jogo.perdeu(jogo.inicia_evento);

        if(this.tempoInsere == 0)
            this.insere();
        else
            this.tempoInsere--;

        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];

            obs.x -= velocidade_obs;

            if(jogador.x < obs.x + obs.largura && jogador.x + jogador.largura >= obs.x && jogador.y + jogador.altura >= chao.y - obs.altura && obs.altura >= 55){
                if(especial == 1 || jogo.timer_especial < 1){

                    if(obs.altura >= 55 && obs.altura <= 60){
                        pisao_neles();

                        this._obs.splice(i, 1);
                        tam--;
                        i--;
                    }else{
                        
                    //  Subtrai pontos caso o jogador Bata em alguma construção
                        this._obs.splice(i, 1);
                        tam--;
                        i--;
                        contador_batidas++;
            
                        if(estadoAtual == estados.jogando && obs.altura > 60){
                            jogador.score -= 2;
                            jogo.notifica("Não Atropele os Prédios!", "red");

                            executaSons("efeitos", "batida.ogg", 1);
                        }
                    }
                }else if(estadoAtual == estados.jogando){
                    if(obs.altura >= 55 && obs.altura <= 60){
                        pisao_neles();
                    }else
                        jogo.perdeu(jogo.evento);
                                
                    this._obs.splice(i, 1);
                    tam--;
                    i--;
                }
            }else if(obs.x <= 0 && estadoAtual == estados.jogando && obs.altura >= 55 && !obs._scored){
                // Soma 1 valor no Score a cada obstáculo pulado
                jogador.score++;
                obs._scored = true;
                distancia_viajada += ( chao.x * -1 );

            }else if(obs.x <= -obs.largura - 90){
                this._obs.splice(i, 1);
                tam--;
                i--;
            }
        }

        for(var x = 0, tam = this._obsfundo.length; x < tam; x++){
            var obsb = this._obsfundo[x];
            obsb.x -= velocidade_obs * 0.8;

            if(obsb.x <= -obsb.largura - 90){
                this._obsfundo.splice(x, 1);

                tam--;
                x--;
            }
        }

        for(var x = 0, tam = this._obsfrente.length; x < tam; x++){
            var obsf = this._obsfrente[x];
            obsf.x -= velocidade_obs * 1.2;

            if(obsf.x <= -obsf.largura - 90){
                this._obsfrente.splice(x, 1);

                tam--;
                x--;
            }
        }
    },

    desenha: function(){
        desenha_obj();
    }
}

function main(){

    Cenario();
    carrega_dados();

    Altura = window.innerHeight;
    Largura = window.innerWidth;

    if(Largura >= 1376){
        Largura = 1376;
        Altura = 625;
    }

    canvas = document.getElementById("canvas");
    notificacoes = document.getElementById("notificacoes");
    filtro = document.getElementById("filtro");

    canvas.width = Largura;
    canvas.height = Altura;

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    filtro.addEventListener("mousedown", clique);
    document.addEventListener("keypress", clique);
    notificacoes.addEventListener("mousedown", clique);

    estadoAtual = estados.jogar;

    menu_inicial(1);
    roda();
}

function roda(){

    atualiza();
    desenha();
    valores();
    window.requestAnimationFrame(roda);
}

function atualiza(){

    if(estadoAtual == estados.jogando){
        obstaculos.atualiza();
        menu_inicial(0);
    }

    if(especial != 1)
        jogador.atualiza();

    Cenario_sprites.atualiza();
    background_predios.atualiza();

    chao.atualiza();

    // Executa o som de fundo de Vento em altas velocidades
    if(velocidade_obs > 25 && segura_vento == 0 && estadoAtual == estados.jogando){
        if(segura_vento == 0)
            executaSons2("ambiente", "vento.ogg", 1);

        segura_vento = 1;
        vento_delay = setTimeout(function(){
            segura_vento = 0;
            clearTimeout(vento_delay);
        }, 53000);
    }
}

function desenha(){
    
    background_ceu.desenha();
    Cenario_sprites.desenha();
    background_predios.desenha();

    ctx.fillStyle = "#fff";
    ctx.font = "50px Minecraft";

    if(estadoAtual == estados.perdeu){

        document.getElementById("notifica_moeda").innerHTML = "$"+ moedas;
        $("#notifica_moeda").fadeIn();

        if(Cenario_sprites.astro[2] == 0)
            ctx.fillStyle = "rgba(0, 0, 0, .7)";
        else
            ctx.fillStyle = "rgba(255, 255, 255, .7)";
        ctx.font = "70px Minecraftia";
        // Resumo da pontuação final do Jogador
        ctx.fillText(labelPontuacao.texto, canvas.width / 2 - ctx.measureText(labelPontuacao.texto).width / 2, Altura / 1.4 + 40);

        background_predios.desenha(0, 400);

        if(Cenario_sprites.astro[2] == 0)
            ctx.fillStyle = "black";
        else
            ctx.fillStyle = "#fff";
        
        ctx.font = "40px Minecraftia";
        if(jogador.score < record)
            ctx.fillText("Recorde Atual: "+ record, canvas.width / 2 - ctx.measureText("Recorde Atual: "+ record).width / 2, Altura / 1.3 + 50);

        ctx.save();
        ctx.translate( Largura / 2, Altura / 2 );
        
        ctx.restore();
    }if(estadoAtual == estados.jogando)
        obstaculos.desenha();

    if(estadoAtual == estados.jogar || estadoAtual == estados.perdeu){
        obstaculos.atualiza();
        obstaculos.desenha();
    }
}