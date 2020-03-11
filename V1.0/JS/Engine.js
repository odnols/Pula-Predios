
// Variáveis Globais
var canvas, ctx, Altura, Largura, Frame = 0, gravidade = 1.6, velocidade_obs = 10, regula_velocidade, estadoAtual, record, img, img2, especial = 0, timer_especial = 5, var_timer_especial, tempo_evento, contador_tempo_interno = 0, pause_falho = 0, dev_op = 0, distancia_viajada = 0, contador_especial = 0, contador_evento, iniciando_evento = null, contador_pisoes = 0, clocker = 0, contador_batidas = 0, controle = 0, segura_som = 0, muda_chao1 = 0, muda_chao2 = 0, muda_chao3 = 0, data = new Date(), log_ = 0, hora = data.getHours(),

pontosParaNovaVelocidade = [5, 10, 20, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 200, 220, 240, 260, 280, 300, 350, 375, 390, 405, 415, 425, 440, 460, 480, 500],
pontosAtuais = 0,

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

        spriteCidade.desenha(this.predios, 380);
        spriteCidade.desenha(this.predios + Largura, 380);

        spriteMontanhas.desenha(this.montanhas, 510);
        spriteMontanhas.desenha(this.montanhas + Largura, 510);
    }
},

Cenario_sprites = {
    nuvem_camada1: 0,
    nuvem_camada2: 0,

    atualiza: function(){
        this.predios -= velocidade_obs * 0.2;
        this.nuvem_camada1 -= velocidade_obs * 0.03;
        this.nuvem_camada2 -= velocidade_obs * 0.04;

        if(this.predios <= -Largura)
            this.predios = 0;
        
        if(this.nuvem_camada1 <= -Largura)
            this.nuvem_camada1 = 0;
            
        if(this.nuvem_camada2 <= -Largura)
            this.nuvem_camada2 = 0
    },

    desenha: function(){
        spriteNuvens.desenha(this.nuvem_camada1, 300);
        spriteNuvens.desenha(this.nuvem_camada1 + Largura, 300);

        spriteNuvens2.desenha(this.nuvem_camada2, 330);
        spriteNuvens2.desenha(this.nuvem_camada2 + Largura, 330);

        spriteCidade.desenha(this.predios, 380);
        spriteCidade.desenha(this.predios + Largura, 380);
    }
},

background_ceu = {
    desenha: function(){
        spriteCeu.desenha(0, 0);
    }
},

chao = {
    y: 555,
    x: 0,
    x_x: 0,
    x2: 0,
    x3: 0,
    x_3: 0,
    x4: 0,
    confirma1: 0,
    confirma2: 0,
    confirma3: 0,
    volta_chao: 0,

    atualiza: function(){
        
        if(muda_chao1 != 2 || this.volta_chao == 1){
            this.x -= velocidade_obs;
            this.x2 -= velocidade_obs * 0.8;
            this.x_x -= velocidade_obs * 1.2;
        }else{
            this.x = 0;
            this.x2 = 0;
            this.x_x = 0;
        }

        // Confirmando o evento aquático
        if(this.confirma1 == 1)
            this.x4 -= velocidade_obs * 0.8;

        if(this.confirma2 == 1)
            this.x3 -= velocidade_obs;

        if(this.confirma3 == 1)
            this.x_3 -= velocidade_obs * 1.2;

        if(jogo.evento != 1){
            this.confirma1 = 0;
            this.confirma2 = 0;
            this.confirma3 = 0;

            muda_chao = 0;
            this.x3 = 0;
            this.x4 = 0;
            this.x_3 = 0;
        }

    //  Sprite de Trás
        if(this.x2 <= -Largura){
            this.x2 = 0;

            if(jogo.evento == 1)
                this.confirma1 = 1;
        }

    //  Sprite do Meio
        if(this.x <= -Largura){
            this.x = 0;
            
            if(jogo.evento == 1)
                this.confirma2 = 1;
        }
    
    //  Sprite da Frente
        if(this.x_x <= -Largura){
            this.x_x = 0;
            
            if(jogo.evento == 1)
                this.confirma3 = 1;
        }

        if(this.x4 <= -Largura && jogo.evento == 1){
            this.x4 = 0;
            muda_chao1 = 2;
        }

        if(this.x3 <= -Largura && jogo.evento == 1){
            this.x3 = 0;
            muda_chao2 = 2;

            if(jogo.contador_tempo_interno < 3)
                this.volta_chao = 1;
        }

        if(this.x_3 <= -Largura && jogo.evento == 1){
            this.x_3 = 0;
            muda_chao3 = 2;
        }
    },
    
    desenha: function(){

        if(jogo.evento != 1 || muda_chao1 < 2)
            spriteChao.desenha(this.x2, this.y - 5);
            
        if(jogo.evento == 1 && this.confirma1 == 1)
            spriteAgua.desenha(this.x4 + Largura, this.y + 8);
        else
            spriteChao.desenha(this.x2 + Largura, this.y - 5);

        if(muda_chao1 == 2)
            spriteAgua.desenha(this.x4, this.y + 8);
        
        if(this.volta_chao == 1)
            spriteChao.desenha(this.x2 + Largura, this.y - 5);
    },

    desenha2: function(){
        
        if(jogo.evento != 1 || muda_chao2 < 2)
            spriteChao.desenha(this.x, this.y + 10);

        if(jogo.evento == 1 && this.confirma2 == 1)
            spriteAgua.desenha(this.x3 + Largura, this.y + 22);
        else
            spriteChao.desenha(this.x + Largura, this.y + 10);

        if(muda_chao2 == 2)
            spriteAgua.desenha(this.x3, this.y + 22);

        if(this.volta_chao == 1)
            spriteChao.desenha(this.x + Largura, this.y + 10);
    },

    desenha3: function(){

        if(jogo.evento != 1 || muda_chao3 < 2)
            spriteChao.desenha(this.x_x, this.y + 27);

        if(jogo.evento == 1 && this.confirma3 == 1)
            spriteAgua.desenha(this.x_3 + Largura, this.y + 40);
        else
            spriteChao.desenha(this.x_x + Largura, this.y + 27);

        if(muda_chao3 == 2)
            spriteAgua.desenha(this.x_3, this.y + 40);

        if(this.volta_chao == 1)
            spriteChao.desenha(this.x_x + Largura, this.y + 27);
    }
},

jogo = {
    velocity: 0,
    inicia_evento: 0,
    evento: null,
    qtd_eventos: [5, 7, 4],
    quantia_pixels: 0,
    quantia_pixels_interno: 0,
    contador_tempo: 0,
    contador_tempo_evento: 0,
    contador_tempo_evento_b: 0,
    contador_tempo_interno: 0,
    anuncio_evento: ["Entrando em Área Densa", "Água em Frente, Cuidado!", "Entrando no Parque"],
    saida_evento: ["Saindo da Área","Terra a Vista!","Saindo do Parque"],

    recarrega_timer: function(){
        var_timer_recarrega = setInterval( function(){
            if(timer_especial < 5 && especial == 0){
                timer_especial++;
            }else{
                ajusta_cores(5, 2);
                clearInterval(var_timer_recarrega);
                document.getElementById("carregando").style.display = "none";
            }
        }, 2000);
    },

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

    relogio_eventos: function(){
        this.contador_tempo = 12 + Math.round(15 * Math.random());
        chao.volta_chao = 0;

        clocker = setTimeout(function(){
            jogo.eventos();
        }, this.contador_tempo * 1000);

        deleta_cronometro = setTimeout(function(){
            $("#temporizador").fadeOut();
            $("#barra_loading").fadeOut();

            document.getElementById("completa_timer").style.width = "0px";
            jogo.quantia_pixels_interno = 0;

            clearTimeout(deleta_cronometro);
        }, 1000);
    },

    eventos: function(){
        // Determina qual será o próximo evento aleatoriamente
        // Tempo aleatório que ficará ativo o evento
        this.inicia_evento = Math.round(2 * Math.random());
        this.contador_tempo_evento = 15 + Math.round( 15 * Math.random());
        iniciando_evento = 5;

        const audio = document.getElementById("audio_inicio");
        audio.play();

        if(this.qtd_eventos[this.inicia_evento] == 0){
            jogo.eventos();
        }else{

            if(this.inicia_evento == 0){
                ajusta_cores(0, 1);
                this.qtd_eventos[0]--;
            }else if(this.inicia_evento == 1){
                this.contador_tempo_evento = 12;
                iniciando_evento = 3;
                ajusta_cores(1, 1);
                this.qtd_eventos[1]--;
            }else{
                this.contador_tempo_evento = 10 + Math.round( 15 * Math.random());
                ajusta_cores(2, 1);
                this.qtd_eventos[2]--;

                parque_event = setTimeout(function(){
                    if(estadoAtual == estados.jogando){
                        jogo.notifica("Hora de Pontuar!");

                        const audio = document.getElementById("audio_parque");
                        audio.play();
                    }
             }, 3000);
            }

            $("#temporizador").fadeIn();
            $("#barra_loading").fadeIn();

            this.quantia_pixels = 50 / this.contador_tempo_evento;
            this.contador_tempo_interno = this.contador_tempo_evento - 1;

            document.getElementById("cronometro").innerHTML = this.contador_tempo_evento;

            if(this.inicia_evento == 1)
                preenche_barra();

            jogo.notifica(this.anuncio_evento[this.inicia_evento]);

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

                        jogo.notifica(jogo.saida_evento[jogo.inicia_evento]);
                        jogo.relogio_eventos();

                        jogo.evento = null;
                        jogo.inicia_evento = null;
                        muda_chao1 = 0;
                        muda_chao2 = 0;
                        muda_chao3 = 0;
                    
                        const audio = document.getElementById("audio_final");
                        audio.play();
                    }, (jogo.contador_tempo_evento_b - 1) * 1000);
                }
            }, iniciando_evento * 1000);
        }
    },

    perdeu: function(causa){

        if(causa != 1)
            nome = escolhe_som(2, 0);
        else
            nome = escolhe_som(2, 1);
        
        const audio = document.getElementById("audio_inicia");
        audio.src = "sons/" + nome;

        audio.play();

        estadoAtual = estados.perdeu;
        contador_batidas++;
        jogador.qtdPulos = 0;
        timer_especial = 5;
        controle =  0;

        clearInterval(var_timer_especial);
        clearTimeout(tempo_evento);
        clearTimeout(clocker);

        ajusta_cores(6, 2);
        MsgPerdeu(causa);

        regula_velocidade = setInterval(function(){
            if(velocidade_obs > 10){
                velocidade_obs--;
            }
        }, 100);
    },

    notifica: function(mensagem){
        $("#notificacoes").fadeIn(300, "linear");
        document.getElementById("notificacoes").innerHTML = mensagem;

        if(hora >= 6 && hora < 19)
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
            this.velocidade = -this.forcaDoPulo;
            this.qtdPulos--;
            this.pulos_dados++;
            document.getElementById("a_repos").innerHTML += "Pulou<br>";
        }
    },

    especial: function(){
        if(estadoAtual == estados.jogando && timer_especial != 0 && especial != 1){
            contador_especial++;
            especial = 1;
            jogador.timer();
            document.getElementById("a_repos").innerHTML += "Especial<br>";
        }
    },

    timer: function(){
        var_timer_especial = setInterval( function(){
            if(timer_especial > 0 && especial == 1){
                timer_especial--;
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
        if(timer_especial % 1 == 0 && timer_especial % 3 == 0 )
            this.y += 6;
        else
            this.y -= 3;
    },

    reset: function(){
        this.velocidade = 0;
        this.y = 0;

        if(this.score > record){
            localStorage.setItem("record", this.score);
            record = this.score;
        }

        // Salvando os valores atualizados no LocalStorage
        if(this.score > 0)
            pontos_hist += this.score;

        distancia_hist += distancia_viajada;
        pulos_hist += this.pulos_dados;
        espec_hist += contador_especial;
        pause_f_hist += pause_falho;
        batidas_hist += contador_batidas;
        pisoes_hist += contador_pisoes;

        localStorage.setItem("qtdDistancia", distancia_hist);
        localStorage.setItem("qtdPulos", pulos_hist);
        localStorage.setItem("qtdPontos", pontos_hist);
        localStorage.setItem("qtdEspeciais", espec_hist);
        localStorage.setItem("qtdPFalhos", pause_f_hist);
        localStorage.setItem("qtdBatidas", batidas_hist);
        localStorage.setItem("qtdPisoes", pisoes_hist);

        segura_som = 0;
        this.score = 0;
        pontosAtuais = 0;
        pause_falho = 0;
        contador_pisoes = 0;
        this.pulos_dados = 0;
        contador_batidas = 0;
        contador_especial = 0;
        distancia_viajada = 0;
        obstaculos.qtdObjetos = 0;

        jogo.evento = null;
        jogo.inicia_evento = null;
        iniciando_evento = null;
        jogo.qtd_eventos = [5, 7, 4];

        muda_chao1 = 0;
        muda_chao2 = 0;
        muda_chao3 = 0;

        document.getElementById("completa_timer").style.width = "0px";
        jogo.quantia_pixels_interno = 0;

        menu_inicial(1);
        levanta_dados();
        $("#temporizador").fadeOut();
        $("#barra_loading").fadeOut();

        clearInterval(var_timer_especial);
        clearTimeout(tempo_evento);
        clearTimeout(clocker);
    },

    desenha: function(){
        spriteJogador.desenha(this.x, this.y + 15);
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
        if(estadoAtual == estados.jogando && jogo.inicia_evento != 1){
            if(jogo.evento == null){
                this._obs.push({
                    x: Largura,
                    largura: 46,
                    altura: Math.round(120 * Math.random()),
                });
            }else if(jogo.evento == 0){
            // Centro da Cidade 
                this._obs.push({
                    x: Largura,
                    largura: 46,
                    altura: 60 + Math.round(60 * Math.random()),
                });
            }else if(jogo.evento == 2){
                // Parque da Cidade
                this._obs.push({
                    x: Largura,
                    largura: 46,
                    altura: 50 + Math.round(9 * Math.random()),
                });
            }
        }else if(jogo.evento != 1){
            this._obs.push({
                x: Largura,
                largura: 10,
                altura: Math.round(54 * Math.random()),
            });
        }

        if(jogo.evento == null && jogo.inicia_evento != 1){
            this._obsfundo.push({
                x: Largura,
                largura: 10,
                altura: Math.round(54 * Math.random()),
            });
        }else if(jogo.evento == 0){
        // Centro da Cidade 
            this._obsfundo.push({
                x: Largura,
                largura: 10,
                altura: 50 + Math.round(60 * Math.random()),
            });
        }else if(jogo.evento == 2){
            // Centro da Cidade 
            this._obsfundo.push({
                x: Largura,
                largura: 46,
                altura: 50 + Math.round(9 * Math.random()),
            });
        }

        if(jogo.inicia_evento != 1){
            this._obsfrente.push({
                x: Largura,
                largura: 10,
                altura: Math.round(54 * Math.random()),
            });
        }

        // Aleatorizador de Objetos
        probabilidade = 10 + Math.round(40 * Math.random());

        if(probabilidade > 0 && probabilidade < 47)
            if(estadoAtual == estados.jogando)
                this.tempoInsere = 30;
            else
                this.tempoInsere = 15;
        else
            if(estadoAtual == estados.jogando)
                this.tempoInsere = 90;
            else
                this.tempoInsere = 45;

        // Aumenta a Velocidade Gradualmente
        if(pontosAtuais < pontosParaNovaVelocidade.length && this.qtdObjetos == pontosParaNovaVelocidade[pontosAtuais])
            SubirVelocidade();
        
        if(estadoAtual == estados.jogando)
            this.qtdObjetos++;
    },

    atualiza: function(){

        if(jogador.y == 432 && muda_chao2 == 2 && timer_especial == 5 )
            jogo.perdeu(jogo.inicia_evento);

        if(this.tempoInsere == 0)
            this.insere();
        else
            this.tempoInsere--;

        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];

            obs.x -= velocidade_obs;

                
            if(jogador.x < obs.x + obs.largura && jogador.x + jogador.largura >= obs.x && jogador.y + jogador.altura >= chao.y - obs.altura && obs.altura >= 55){
                if(especial == 1  || timer_especial < 1){
                //  Subtrai pontos caso o jogador Bata em alguma construção
                    this._obs.splice(i, 1);
                    tam--;
                    i--;
                    contador_batidas++;
                    document.getElementById("a_repos").innerHTML +=" Bateu<br>";
        
                    if(estadoAtual == estados.jogando && obs.altura > 60)
                        jogador.score -= 2;
        
                }else if(estadoAtual == estados.jogando){
                    if(obs.altura >= 55 && obs.altura <= 60){
                    //  Efeito de Pisão
                        jogador.qtdPulos++;
                        jogador.pula();

                        jogo.notifica("Pisão Neles! +3 Pontos");

                        const audio = document.getElementById("audio_pisao");
                        audio.play();

                        contador_pisoes++;
                        jogador.score += 3;
                        document.getElementById("a_repos").innerHTML +=" Pisão!<br>";    
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
                document.getElementById("a_repos").innerHTML +=" Passou<br>";

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

function SubirVelocidade(){
    velocidade_obs += 1;
    pontosAtuais++;
}

function main(){

    Cenario();
    levanta_dados();

    Altura = window.innerHeight;
    Largura = window.innerWidth;

    if(Largura >= 1366){
        Largura = 1366;
        Altura = 625;
    }

    canvas = document.getElementById("canvas");
    canvas.width = Largura;
    canvas.height = Altura;

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("keypress", clique);

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
}

function desenha(){

    background_ceu.desenha();
    Cenario_sprites.desenha();
    background_predios.desenha();

    ctx.fillStyle = "#fff";
    ctx.font = "50px Minecraft";

    if(estadoAtual == estados.perdeu){

        if(hora >= 6 && hora < 19)
            ctx.fillStyle = "rgba(0, 0, 0, .7)";
        else
            ctx.fillStyle = "rgba(255, 255, 255, .7)";
        ctx.font = "70px Minecraftia";
        // Resumo da pontuação final do Jogador
        ctx.fillText(labelPontuacao.texto, canvas.width / 2 - ctx.measureText(labelPontuacao.texto).width / 2, Altura/1.4 + 40);

        background_predios.desenha(0, 400);

        if(hora >= 6 && hora < 19)
            ctx.fillStyle = "black";
        else
            ctx.fillStyle = "#fff";
        
        ctx.font = "40px Minecraftia";
        if(jogador.score < record)
            ctx.fillText("Recorde Atual: "+ record, canvas.width / 2 - ctx.measureText("Recorde Atual: "+ record).width / 2, Altura/1.3 + 50);

        ctx.save();
        ctx.translate(Largura/2, Altura/2);
        
        ctx.restore();
    }if(estadoAtual == estados.jogando)
        obstaculos.desenha();

    if(estadoAtual == estados.jogar || estadoAtual == estados.perdeu){
        obstaculos.atualiza();
        obstaculos.desenha();
    }
}