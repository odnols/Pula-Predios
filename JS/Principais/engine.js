// Variáveis Globais
var labelTexto = {
    texto: "",
},

    estados = {
        jogar: 0,
        jogando: 1,
        perdeu: 2,
        ocioso: 3,
        tutorial: 4,
    },

    opcoes = {
        inicia_game: 0,
        dev_op: 0,
        controle: 0,
        canvas: null,
        ctx: null,
        altura: null,
        largura: null,
        posicao: 913
    },

    menus = {
        cache_compra: [0, 0],
        cache_confirma: null,
        janelaConfirma: 0,
        sessao_loja_ativa: 0,
        categoria_anterior: null,
        estado_loja: 0,
        estado_log: 0,
        estado_conquista: 0,
        estatistica_morte: null,
        tamanho_barra_notificacao: null
    },

    ambiente = {
        aleatorizadorProp: 0,
        libera_transitador: 0,
        segura_som: 0,
        segura_vento: 0,
        segura_objeto_voador: 0
    },

    background_predios = {
        predios: 0,
        montanhas: 0,
        montanhas2: 0,

        atualiza: function () {
            this.predios -= jogo.velocidade * 0.2
            this.montanhas -= jogo.velocidade * 0.22
            this.montanhas2 -= jogo.velocidade * 0.1

            if (this.predios <= -opcoes.largura)
                this.predios = 0

            if (this.montanhas <= -opcoes.largura)
                this.montanhas = 0

            if (this.montanhas2 <= -opcoes.largura)
                this.montanhas2 = 0
        },

        desenha: function () {

            spriteMontanhas.desenha(this.montanhas2, 480)
            spriteMontanhas.desenha(this.montanhas2 + opcoes.largura, 480)

            transitador("montanhas_noite", this.montanhas2, 483)
            transitador("montanhas_noite", this.montanhas2 + opcoes.largura, 483)

            spriteCidade.desenha(this.predios, 257)
            spriteCidade.desenha(this.predios + opcoes.largura, 257)

            transitador("cidade_noite", this.predios, 195)
            transitador("cidade_noite", this.predios + opcoes.largura, 195)

            spriteMontanhas.desenha(this.montanhas, 510)
            spriteMontanhas.desenha(this.montanhas + opcoes.largura, 510)

            transitador("montanhas_noite", this.montanhas, 513)
            transitador("montanhas_noite", this.montanhas + opcoes.largura, 513)
        }
    },

    Cenario_sprites = {

        astro: [-250, 400, 0, 0, 0], // 0 (Localização), 1 (Altura), 2 (Astro), 3 (Transições), 4 (Controle)
        tema: 0,
        opacidade_noite: 0.0,
        nuvem_camada1: 0,
        nuvem_camada2: 0,
        nuvem_camada3: 0,
        nuvem_camada4: 0,
        objeto_voador: [0, 0, 0, 0], // 0 (Velocidade), 1 (Posição), 2 (Altura), 3 (Objeto)

        atualiza: function () {

            // Coletando a data e extraindo a hora
            let nova_data = new Date()
            hora = nova_data.getHours()

            // Define se o jogo iniciará de dia ou de noite
            if (hora > 6 && hora < 18 && this.astro[4] == 0 && this.tema == 0) { // Dia
                this.astro[2] = 0
                this.astro[4] = 1
                ambiente.libera_transitador = 0
            } else if (this.astro[4] == 0 && this.tema == 0) { // Noite
                this.astro[2] = 1
                this.astro[4] = 1
                ambiente.libera_transitador = 1
                this.opacidade_noite = 1
            }

            // Altera o Cenário automaticamente
            Cenario(this.astro[2])

            if (this.tema == 0) { // Tema dinâmico
                // Velocidade do astro
                this.astro[0] += .5
            }

            if (jogo.velocidade > 5)
                velocidade_interna = jogo.velocidade
            else
                velocidade_interna = 5

            this.predios -= jogo.velocidade * 0.2
            this.nuvem_camada1 -= velocidade_interna * 0.03
            this.nuvem_camada2 -= velocidade_interna * 0.04
            this.nuvem_camada3 -= velocidade_interna * 0.05
            this.nuvem_camada4 -= velocidade_interna * 0.06

            // Controla a posição no eixo X do objeto voador
            if (this.objeto_voador[3] != 0 && this.objeto_voador[3] != 3)
                this.objeto_voador[1] += this.objeto_voador[0]

            if (this.objeto_voador[3] == 3) // Velocidade do Dirigível
                this.objeto_voador[1] += this.objeto_voador[0] * velocidade_interna

            objetosVoadores()

            // Controla se o objeto voador será mostrado na tela
            if (this.objeto_voador[3] > 0) {
                if (this.objeto_voador[1] > 1366 && this.objeto_voador[3] == 1) { // Avião e dirigível
                    this.objeto_voador[3] = 0
                    ambiente.segura_objeto_voador = 0
                }

                if (this.objeto_voador[1] < -200 && this.objeto_voador[3] != 1) { // Disco voador
                    this.objeto_voador[3] = 0
                    ambiente.segura_objeto_voador = 0
                }
            }

            // Define o tema para diurno
            if (this.tema == 1) {
                this.astro[2] = 0 // Dia
                this.astro[0] = 240 // X
                this.astro[1] = 220 // Y
            }

            // Define o tema para noturno
            if (this.tema == 2) {
                this.astro[2] = 1 // Noite
                this.astro[0] = 300 // X
                this.astro[1] = 170 // Y
            }

            if (this.astro[0] > 1366) {
                this.astro[0] = -250 // X
                this.astro[1] = 400  // Y

                // Inverte entre Sol e Lua, Sol = 0, Lua = 1
                if (this.astro[2] == 0)
                    this.astro[2] = 1
                else
                    this.astro[2] = 0
            }

            // Faz a animação de Subida suave dos Astros
            if (this.astro[0] < 341)
                this.astro[1] -= .2
            else if (this.astro[0] > 341 && this.astro[0] < 550)
                this.astro[1] -= .1

            if (this.astro[0] > 920)
                this.astro[1] += .2
            else if (this.astro[0] > 650 && this.astro[0] < 920) {
                this.astro[1] += .1

                if (this.astro[3] == 0 && this.astro[0] > 900 && this.astro[2] == 1) {

                    if (jogo.qualidadeGrafica == 2)
                        document.getElementById("filtro").style.animation = "amanhecer 20s"

                    this.astro[3] = 1
                    transita_tempo(0) // Amanhecer
                    aleatorizaProp()
                }

                if (this.astro[3] == 0 && this.astro[0] > 900 && this.astro[2] == 0) {

                    if (jogo.qualidadeGrafica == 2)
                        document.getElementById("filtro").style.animation = "entardecer 20s"

                    this.astro[3] = 1
                    transita_tempo(1) // Anoitecer
                    aleatorizaProp()
                }
            } else
                if (this.astro[3] == 1)
                    this.astro[3] = 0

            if (this.predios <= -opcoes.largura)
                this.predios = 0

            if (this.nuvem_camada1 <= -opcoes.largura)
                this.nuvem_camada1 = 0

            if (this.nuvem_camada2 <= -opcoes.largura)
                this.nuvem_camada2 = 0

            if (this.nuvem_camada3 <= -opcoes.largura)
                this.nuvem_camada3 = 0

            if (this.nuvem_camada4 <= -opcoes.largura)
                this.nuvem_camada4 = 0
        },

        desenha: function () {

            if (this.astro[2] == 0) {
                spriteSol.desenha(this.astro[0], this.astro[1])
                spriteSol.globalAlpha = 1
            } else {
                spriteLua.desenha(this.astro[0], this.astro[1])
                spriteSol.globalAlpha = 0
            }

            if (this.objeto_voador[3] == 2) { // Disco voador
                spriteOvni.desenha(this.objeto_voador[1], this.objeto_voador[2])
                transitador("disco_voador_noite", this.objeto_voador[1], this.objeto_voador[2] - 2)
            }

            spriteNuvens.desenha(this.nuvem_camada1, 280)
            spriteNuvens.desenha(this.nuvem_camada1 + opcoes.largura, 280)

            transitador("nuvens1_noite", this.nuvem_camada1, 280)
            transitador("nuvens1_noite", this.nuvem_camada1 + opcoes.largura, 280)

            spriteNuvensSup2.desenha(this.nuvem_camada3 + 10, 100)
            spriteNuvensSup2.desenha(this.nuvem_camada3 + 10 + opcoes.largura, 100)

            transitador("nuvens2_2_noite", this.nuvem_camada3 + 60, 108)
            transitador("nuvens2_2_noite", this.nuvem_camada3 + 60 + opcoes.largura, 108)

            spriteNuvensSup.desenha(this.nuvem_camada4 + 90, 50)
            spriteNuvensSup.desenha(this.nuvem_camada4 + 90 + opcoes.largura, 50)

            transitador("nuvens1_2_noite", this.nuvem_camada4 + 90, 50)
            transitador("nuvens1_2_noite", this.nuvem_camada4 + 90 + opcoes.largura, 50)

            if (this.objeto_voador[3] == 1) { // Avião
                spriteAviao.desenha(this.objeto_voador[1], this.objeto_voador[2])
                transitador("aviao_noite", this.objeto_voador[1] + 2, this.objeto_voador[2] + 4)
                spriteLuzes_navegacao.desenha(this.objeto_voador[1], this.objeto_voador[2])
            }

            if (this.objeto_voador[3] == 3) { // Dirigível
                spriteDirigivel.desenha(this.objeto_voador[1], this.objeto_voador[2])
                transitador("dirigivel_noite", this.objeto_voador[1] - 120, this.objeto_voador[2] - 45)
            }

            spriteNuvensSup.desenha(this.nuvem_camada3 + 500, 150)
            spriteNuvensSup.desenha(this.nuvem_camada3 + 500 + opcoes.largura, 150)

            transitador("nuvens1_2_noite", this.nuvem_camada3 + 500, 150)
            transitador("nuvens1_2_noite", this.nuvem_camada3 + 500 + opcoes.largura, 150)

            spriteNuvens2.desenha(this.nuvem_camada2, 330)
            spriteNuvens2.desenha(this.nuvem_camada2 + opcoes.largura, 330)

            transitador("nuvens2_noite", this.nuvem_camada2, 330)
            transitador("nuvens2_noite", this.nuvem_camada2 + opcoes.largura, 330)

            spriteCidade.desenha(this.predios, 257)
            spriteCidade.desenha(this.predios + opcoes.largura, 257)
        }
    },

    background_ceu = {
        desenha: function () {
            spriteCeu.desenha(0, 0)

            transitador("ceu_noite", 0, 0)

            if (Cenario_sprites.astro[2] == 1 && Cenario_sprites.astro[0] < 1200)
                spriteMascara_estrelas.desenha(0, 0)
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

        altera_referencia: 0,

        reserva: [0, 0, 0],
        confirma: [0, 0, 0],
        muda_chao: [0, 0, 0],
        volta_chao: [0, 0, 0],

        atualiza: function () {

            this.x -= jogo.velocidade
            this.x2 -= jogo.velocidade * 0.8
            this.x3 -= jogo.velocidade * 1.2

            // Confirmando o evento aquático ou de lava
            if (eventos.evento != 1 || eventos.evento != 3) {
                this.confirma[0] = 0
                this.confirma[1] = 0
                this.confirma[2] = 0
            }

            //  Sprite de Trás
            if (this.x2 <= -opcoes.largura) {
                this.x2 = 0

                if (this.muda_chao[2] == 1)
                    this.muda_chao[2] = 2

                if (this.reserva[2] == 1 || this.volta_chao[2] == 2) {
                    this.muda_chao[2] = 0
                    this.volta_chao[2] = 0
                    this.libera_volta_chao[2] = 0
                }

                if (this.reserva[2] == 1)
                    this.reserva[2] = 2

                if (eventos.evento == 1 || eventos.evento == 3) {
                    this.confirma[2] = 1

                    // Gatilho automático para retornar o chão ao normal em velocidades altas
                    if (jogo.velocidade >= 20 && eventos.contador_tempo_interno < 3 && this.reserva[2] == 0) {
                        this.libera_volta_chao[2] = 1
                        this.reserva[2] = 1
                    }

                    if (this.muda_chao[2] == 0)
                        this.muda_chao[2] = 1
                }

                if (this.volta_chao[2] == 1) {
                    this.volta_chao[2] = 2
                    this.trava[2] = 1
                }

                if (this.libera_volta_chao[2] == 1 && this.muda_chao[2] == 2) {
                    this.volta_chao[2] = 1
                }
            }

            //  Sprite do Meio
            if (this.x <= -opcoes.largura) {
                this.x = 0

                if (this.muda_chao[1] == 1)
                    this.muda_chao[1] = 2

                if (this.reserva[1] == 1 || this.volta_chao[1] == 2) {
                    this.muda_chao[1] = 0
                    this.volta_chao[1] = 0
                    this.libera_volta_chao[1] = 0
                }

                if (this.reserva[1] == 1)
                    this.reserva[1] = 2

                if (eventos.evento == 1 || eventos.evento == 3) {
                    this.confirma[1] = 1

                    // Gatilho automático para retornar o chão ao normal em velocidades altas
                    if (eventos.contador_tempo_interno < 3 && this.reserva[1] == 0) {
                        this.libera_volta_chao[1] = 1
                        this.reserva[1] = 1
                    }

                    if (this.muda_chao[1] == 0)
                        this.muda_chao[1] = 1
                }

                if (this.volta_chao[1] == 1) {
                    this.volta_chao[1] = 2
                    this.trava[1] = 1
                }

                if (this.libera_volta_chao[1] == 1 && this.muda_chao[1] == 2) {
                    this.volta_chao[1] = 1
                }
            }

            //  Sprite da Frente
            if (this.x3 <= -opcoes.largura) {
                this.x3 = 0

                if (this.muda_chao[0] == 1)
                    this.muda_chao[0] = 2

                if (this.reserva[0] == 1 || this.volta_chao[0] == 2) {
                    this.muda_chao[0] = 0
                    this.volta_chao[0] = 0
                    this.libera_volta_chao[0] = 0
                }

                if (this.reserva[0] == 1)
                    this.reserva[0] = 2

                if (eventos.evento == 1 || eventos.evento == 3) {
                    this.confirma[0] = 1

                    // Gatilho automático para retornar o chão ao normal em velocidades altas
                    if (jogo.velocidade >= 20 && eventos.contador_tempo_interno < 3 && this.reserva[0] == 0) {
                        this.libera_volta_chao[0] = 1
                        this.reserva[0] = 1
                    }

                    if (this.muda_chao[0] == 0)
                        this.muda_chao[0] = 1
                }

                if (this.volta_chao[0] == 1) {
                    this.volta_chao[0] = 2
                    this.trava[0] = 1
                }

                if (this.libera_volta_chao[0] == 1 && this.muda_chao[0] == 2) {
                    this.volta_chao[0] = 1
                }
            }
        },

        desenha: function () {
            desenha_chao1()
        },

        desenha2: function () {
            desenha_chao2()
        },

        desenha3: function () {
            desenha_chao3()
        }
    },

    eventos = {
        evento: null,
        quantia_pixels: 0,
        inicia_evento: null,
        ultimo_evento: null,
        termina_evento: null,
        iniciando_evento: null,
        penultimo_evento: null,
        qtd_eventos: [10, 10, 10, 10],
        quantia_pixels_interno: 0,

        tempo_evento: 0,
        ativa_evento: null,
        seguraEventoOcioso: 0,
        contador_tempo_evento: 0,
        contador_tempo_evento_b: 0,
        contador_tempo_interno: 0,

        saida_evento: [],
        anuncio_evento: [],

        relogio_eventos: function () {
            //  Define o tempo que o próximo evento demorará para começar
            // this.contador_tempo = 3

            if (jogo.status == estados.jogando)
                if (this.dificuldade != 3)
                    this.contador_tempo = 5 + Math.round(5 * Math.random())
                else
                    this.contador_tempo = 5
            else if (jogo.status == estados.ocioso)
                this.contador_tempo = 3

            if (this.estatisticasNerds)
                if (idioma == "pt")
                    console.log("%cPróximo evento em: " + this.contador_tempo + " segundos", "color: purple")
                else
                    console.log("%cNext event in: " + this.contador_tempo + " seconds", "color: purple")

            this.ativa_evento = setTimeout(() => {
                eventos.eventos()
                clearTimeout(eventos.ativa_evento)
            }, this.contador_tempo * 1000)

            deleta_cronometro = setTimeout(() => {
                $("#temporizador").fadeOut()
                $("#barra_loading").fadeOut()

                limpa_chao()

                document.getElementById("completa_timer").style.width = "0px"
                eventos.quantia_pixels_interno = 0

                clearTimeout(deleta_cronometro)
            }, 2000)
        },

        eventos: function () {
            // Determina qual será o próximo evento aleatoriamente
            // Tempo aleatório que ficará ativo o evento
            this.inicia_evento = Math.round(3 * Math.random())

            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("%cComeçando o evento: " + this.inicia_evento, "color: purple")
                else
                    console.log("%cStarting the event: " + this.inicia_evento, "color: purple")

            if (this.dificuldade != 0 && this.dificuldade != 3)
                this.contador_tempo_evento = 15 + Math.round(15 * Math.random())
            else if (this.dificuldade == 0)
                this.contador_tempo_evento = 10 + Math.round(10 * Math.random())
            else
                this.contador_tempo_evento = 30 + Math.round(5 * Math.random())

            this.largura_barra = $("#barra_loading").css("width")

            this.largura_barra = this.largura_barra.replace("px", "")

            this.iniciando_evento = 5

            if (jogo.status == estados.jogando)
                executaSons("faixa_efeitos1", "Efeitos", "orb.ogg", 2)

            if (this.qtd_eventos[this.inicia_evento] == 0 || this.inicia_evento == this.ultimo_evento || this.inicia_evento == this.penultimo_evento && (this.dificuldade == 0 && (this.inicia_evento == 1 || this.inicia_evento == 3))) {
                if (this.estatisticasNerds)
                    if (idioma == "pt")
                        console.log("%cEvento Pulado, escolhendo novamente", "color: red")
                    else
                        console.log("%cSkipped Event, choosing again", "color: red")

                eventos.eventos()
            } else
                if (this.timer_mod < this.tempoMod && (this.inicia_evento == 1 || this.inicia_evento == 3)) {
                    if (jogo.estatisticasNerds)
                        if (idioma == "pt")
                            console.log("%cEvento Pulado, escolhendo novamente", "color: red")
                        else
                            console.log("%cSkipped Event, choosing again", "color: red")

                    eventos.eventos()
                } else {
                    this.penultimo_evento = this.ultimo_evento
                    this.ultimo_evento = this.inicia_evento

                    if (this.inicia_evento == 0) {       // Evento da Cidade
                        ajusta_cores(0, 1)
                        this.qtd_eventos[0]--

                        if (jogo.status == estados.jogando)
                            jogador.partida_evento_cidade++

                    } else if (this.inicia_evento == 1) { // Evento da Água
                        this.contador_tempo_evento = 12
                        this.iniciando_evento = 3
                        ajusta_cores(1, 1)
                        this.qtd_eventos[1]--

                        if (jogo.status == estados.jogando)
                            jogador.partida_evento_agua++

                    } else if (this.inicia_evento == 3) { // Evento da Lava
                        this.contador_tempo_evento = 12
                        this.iniciando_evento = 3
                        ajusta_cores(3, 1)
                        this.qtd_eventos[3]--

                        if (jogo.status == estados.jogando)
                            jogador.partida_evento_lava++

                    } else {                             // Evento do Parque
                        this.contador_tempo_evento = 10 + Math.round(15 * Math.random())
                        ajusta_cores(2, 1)
                        this.qtd_eventos[2]--

                        if (jogo.status == estados.jogando)
                            jogador.partida_evento_parque++

                        parque_event = setTimeout(() => {
                            if (jogo.status == estados.jogando) {
                                if (idioma == "pt")
                                    jogo.notifica("Hora de Pontuar!", "#14e11e")
                                else
                                    jogo.notifica("Time to Score!", "#14e11e")

                                executaSons("faixa_efeitos3", "Memes", "parque.ogg", 3)
                            }
                        }, 3000)
                    }

                    if (this.estatisticasNerds)
                        if (idioma == "pt")
                            console.log("%cTempo de duração do evento: " + this.contador_tempo_evento + " segundos", "color: purple")
                        else
                            console.log("%cEvent duration time: " + this.contador_tempo_evento + " seconds", "color: purple")

                    if (jogo.status == estados.jogando) {
                        $("#temporizador").fadeIn()
                        $("#barra_loading").fadeIn()
                    }

                    this.quantia_pixels = 1024.5 / (this.contador_tempo_evento * 204)
                    this.contador_tempo_interno = this.contador_tempo_evento - 1

                    document.getElementById("cronometro").innerHTML = this.contador_tempo_evento

                    if (this.inicia_evento == 1 || this.inicia_evento == 3)
                        preenche_barra()

                    if (jogo.status == estados.jogando)
                        jogo.notifica(this.anuncio_evento[this.inicia_evento], "white")

                    setTimeout(() => {

                        eventos.evento = eventos.inicia_evento

                        if (eventos.inicia_evento == 0 || eventos.inicia_evento == 2) {
                            preenche_barra()
                        }

                        if (eventos.evento == 1 || eventos.evento == 3)
                            eventos.contador_tempo_evento_b = 9
                        else
                            eventos.contador_tempo_evento_b = eventos.contador_tempo_evento

                        if (jogo.status == estados.jogando || jogo.status == estados.ocioso) {
                            tempo_evento = setTimeout(() => {

                                finaliza_evento()
                                termina_evento = eventos.evento
                            }, (eventos.contador_tempo_evento_b - 1) * 1000)
                        }
                    }, eventos.iniciando_evento * 1000)
                }
        },
    },

    jogo = {
        dificuldade: 1,
        status: 0,
        estadoSom: 1,
        ociosidade: 1,
        estadoOcioso: 0,
        contador_tempo: 0,

        gravidade: 1.6,
        velocidade: 10,

        tema_ativo: 1,
        temas_comprados: [0, 1],
        musica_tema: null,
        musica_tema_ocioso: null,

        largura_barra: 0,
        converte_barra: 0,
        estatisticasNerds: 0,
        notificaConquista: 1,
        qualidadeGrafica: 1,

        operador: function () {
            if (!opcoes.dev_op) {
                ajusta_cores(3, 2)
                document.getElementById("estado_mod").innerHTML = "DEV"
                jogador.mod = 1
                opcoes.dev_op = 1
            } else {
                jogador.velocidade = 0

                ajusta_cores(5, 2)
                document.getElementById("estado_mod").innerHTML = "Seg"
                jogador.mod = 0
                opcoes.dev_op = 0
            }
        },

        perdeu: function (causa) {

            encerra_modificador()

            // Nadando no Dinheiro
            if (jogador.bonus_comprados[0] == 1 && jogador.bonus_comprados[1] == 1)
                conquista(28, 0)

            sincroniza_bonus(0)

            if (jogador.partida_pontuacao < 0)
                // Não é todo dia que isso acontece
                conquista(23, 0)

            desliga_som3("faixa_musicas", 1)

            if (jogo.velocidade > 25)
                desliga_som2("faixa_ambiente", 2)

            this.status = estados.perdeu

            jogador.contador_mortes++

            jogador.chao_referencia = chao.y
            jogador.qtdPulos = 0

            // Regula a quantidade de modificadores conforme a dificuldade do jogo
            if (this.dificuldade == 0 || this.dificuldade == 1)
                jogador.qtdMods = 5
            else if (this.dificuldade == 3)
                jogador.qtdMods = 3
            else
                jogador.qtdMods = 4

            opcoes.controle = 0
            ambiente.segura_som = 0

            alteraValorEstatisticaPartida("tempo_jogado_partida", jogador.partida_tempo_jogado)
            alteraValorEstatisticaPartida("distancia_percorrida_partida", jogador.partida_distancia_viajada)
            alteraValorEstatisticaPartida("tempo_eventos_partida", jogador.partida_tempo_em_eventos)

            carrega_estatisticas_evento()

            limpa_intervalos()

            clearTimeout(eventos.ativa_evento)

            if (causa == 1) {
                if (idioma == "pt")
                    jogador.partida_causa_morte = "Afundou na água"
                else
                    jogador.partida_causa_morte = "Sank in the water"
                // Pisando em falso
                conquista(1, 0)
            } else if (causa == 3) {
                if (idioma == "pt")
                    jogador.partida_causa_morte = "Tentou nadar na lava"
                else
                    jogador.partida_causa_morte = "Tried to swim in the lava"
                // O Chão era Lava
                conquista(2, 0)
            } else {
                if (idioma == "pt")
                    jogador.partida_causa_morte = "Atropelou um prédio"
                else
                    jogador.partida_causa_morte = "Was knocked down"

                if (causa == 2)
                    // Isso era Possível?
                    conquista(18, 1)
                else
                    // Não Atropele os Prédios!
                    conquista(3, 0)
            }

            alteraValorEstatisticaPartida("causa_perca", jogador.partida_causa_morte)

            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("%cPartida Encerrada, causa perca: " + jogador.partida_causa_morte, "color: red")
                else
                    console.log("%cClosed match, cause of loss: " + jogador.partida_causa_morte, "color: red")

            ajusta_cores(6, 2)

            MsgPerdeu(causa)
            regula_velocidade()
        },

        notifica: function (mensagem, cor) {

            $("#notificacoes").fadeIn(300, "linear")
            document.getElementById("notificacoes").style.color = cor
            document.getElementById("notificacoes").innerHTML = mensagem

            if (typeof limpar_notificacao != "undefined")
                clearTimeout(limpar_notificacao)

            if (Cenario_sprites.astro[2] == 0)
                document.getElementById("notificacoes").style.color = "rgba(0, 0, 0, .8)"

            limpar_notificacao = setTimeout(() => {
                $("#notificacoes").fadeOut()
                clearTimeout(limpar_notificacao)
            }, 2000)
        }
    },

    jogador = {
        x: 50,
        y: -200,

        qtdPulos: 3,
        largura: 30,
        velocidade: 0,
        forcaDoPulo: 23.6,
        regula_velocidade: 0,
        chao_referencia: chao.y,
        altura: spriteJogador_Padrao.Altura - 15,

        contador_mortes: 0,

        mod: 0,
        qtdMods: 5,
        timer_mod: 5,
        liberaMod: 0,
        var_timer_mod: null,
        var_timer_modificador: null,
        var_timer_recarrega: null,

        recorde: 0,
        moedas: 0,
        moedas_coletadas: 0,
        moedas_gastas: 0,

        partida_causa_morte: "",
        partida_distancia_viajada: 0,
        partida_tempo_jogado: 0,

        partida_pontuacao: 0,
        partida_pulos_dados: 0,
        partida_mods_ativados: 0,
        partida_tempo_flutuando: 0,
        partida_pisoes_pontuados: 0,
        partida_moedas_coletadas: 0,
        partida_predios_atropelados: 0,

        partida_tempo_em_eventos: 0,
        partida_eventos_concluidos: 0,
        partida_evento_cidade: 0,
        partida_evento_parque: 0,
        partida_evento_agua: 0,
        partida_evento_lava: 0,

        skin: 0,
        skin_anterior: 0,
        tempoMod: 5,
        skins_compradas: [0, 0, 0, 0, 0, 0, 0, 1],
        mod_em_uso: 0, // 0 - Flutua, 1 - De Aço, 100 - Gravidade Lunar
        mods_comprados: [0, 0, 0, 0],
        mods_vezes_usados: [0, 0, 0, 0],

        bonus_comprados: [0, 0, 0],
        bonus_vezes_usados: [0, 0, 0],

        tt_skins_compradas: 0,
        tt_mods_comprados: 0,
        tt_bonus_comprados: 0,

        atualiza: function () {

            this.velocidade += jogo.gravidade
            this.y += this.velocidade

            // Descendo na água ou lava
            if (chao.muda_chao[1] == 2) {
                if (this.mod_em_uso == 1 && this.y >= 433)
                    jogo.gravidade = .3

                if (jogo.status != estados.ocioso && this.mod_em_uso != 100 && !chao.altera_referencia)
                    jogador.chao_referencia = 650
                // altera_chao_referencia(650) // Afunda o chão (em água / lava)
            } else if (this.mod_em_uso != 100 && chao.muda_chao[1] == 0) {
                // if (!chao.altera_referencia)
                // altera_chao_referencia(555)
                jogador.chao_referencia = chao.y

                jogo.gravidade = 1.6
            }

            if (this.mod_em_uso == 0 && this.mod == 1)
                this.y -= this.velocidade

            if (jogo.status != estados.perdeu) {
                if (this.y > this.chao_referencia - this.altura) {
                    this.y = this.chao_referencia - this.altura

                    if (this.chao_referencia != 650)
                        bonus_modificadores()
                    else
                        this.qtdPulos = 0

                    this.velocidade = 0
                }
            }
        },

        pula: function () {
            if (this.qtdPulos > 0 && (this.mod_em_uso == 100 || this.mod != 1)) {
                this.pula_effect = 1 + Math.round(2 * Math.random())
                executaSons2("faixa_efeitos2", "Efeitos", `Pulo${this.pula_effect}.ogg`, 2)

                this.velocidade = -this.forcaDoPulo
                this.qtdPulos--
                this.partida_pulos_dados++

                alteraValorEstatisticaPartida("quantidade_pulos_partida", this.partida_pulos_dados)
            }

            // Simulador de Pulga
            if (hist_pulos + this.partida_pulos_dados > 1000)
                conquista(15, 0)

            // No Poder do Ódio
            if (this.qtdPulos == 0) {
                conquista(4, 0)
            }
        },

        modificador: function () {

            this.liberaMod = 1

            if ((jogo.status == estados.jogando || jogo.status == estados.tutorial) && this.timer_mod != 0 && this.mod != 1 && this.qtdMods > 0) {

                if (jogo.estatisticasNerds)
                    if (idioma == "pt")
                        console.log("Modificador ativado")
                    else
                        console.log("Modifier activated")

                this.qtdMods--
                document.getElementById("qtdMods").innerHTML = this.qtdMods

                if (this.qtdMods == 0 && this.mod_em_uso == 0) {
                    document.getElementById("qtdMods").style.color = "red"
                    // Clube de milhas aéreas
                    conquista(22, 0)
                }

                // Modificador de Gravidade Lunar
                if (this.mod_em_uso == 100) {
                    conquista(19, 0)
                    jogo.gravidade = 0.6
                    this.forcaDoPulo = 18
                    this.mod = 1
                }

                // Decide qual será o modificador que será usado
                if (this.mod_em_uso == 0) { // Flutuando
                    executaSons("faixa_efeitos3", "Efeitos", "flutua.ogg", 2)

                    // Animação de fogo embaixo do prédio
                    AnimaModFlutuando()

                    if (this.y >= 380)
                        jogador.pula()
                    else
                        this.mod = 1
                }

                // De Aço
                if (this.mod_em_uso == 1)
                    enferruja()

                if (this.mod_em_uso != 100) {
                    modificador_timer = setTimeout(() => {
                        jogador.mod = 1    // Flutua
                        clearTimeout(modificador_timer)
                    }, 200)
                }

                if (this.mod_em_uso == 1) {    // Modificador: De Aço
                    modificador_timer_som = setInterval(() => {
                        if (jogador.y >= 432) {
                            executaSons2("faixa_efeitos3", "Efeitos", "bigorna.ogg", 2)
                            clearInterval(modificador_timer_som)
                        }
                    }, 100)
                }

                this.partida_mods_ativados++
                jogador.timer()

                alteraValorEstatisticaPartida("quantidade_modificadores_partida", this.partida_mods_ativados)
            }
        },

        timer: function () {
            this.var_timer_modificador = setInterval(() => {

                if (jogador.timer_mod > 0 && jogador.mod == 1) {
                    jogador.timer_mod--

                    if (jogador.mod_em_uso == 0)
                        jogador.flutua()

                    // Verifica se o modificador é de flutuação e conta o tempo
                    if (jogador.mod_em_uso == 0)
                        jogador.partida_tempo_flutuando++

                    // É um Pássaro!
                    if ((jogador.partida_tempo_flutuando + parseInt(localStorage.getItem("tempoFlutuando"))) >= 500)
                        conquista(17, 0)
                } else {
                    // Hack life p/ voar infinitamente, comente a linha abaixo \/
                    clearInterval(jogador.var_timer_modificador)

                    if (typeof tMf != "undefined")
                        clearInterval(tMf) // Desliga a animação de fogo abaixo do prédio

                    jogador.mod = 0
                    jogador.velocidade = 0

                    jogo.gravidade = 1.6
                    jogador.forcaDoPulo = 23.6

                    if (jogador.qtdMods != 0)
                        jogador.recarrega_timer()
                }
            }, 1000)
        },

        flutua: function () {
            if (jogador.timer_mod % 1 == 0 && jogador.timer_mod % 3 == 0)
                this.y += 6
            else
                this.y -= 3
        },

        recarrega_timer: function () {

            if (this.estatisticasNerds)
                if (idioma == "pt")
                    console.log("Recarregando Modificador")
                else
                    console.log("Reloading Modifier")

            document.getElementById("qtdMods").style.display = "none"

            // Restaura a skin ao escolhido anteriormente depois do modificador
            if (jogador.mod_em_uso == 1) {
                anim_indices[5] = 0
                limpa_ferrugem()
            }

            jogador.var_timer_recarrega = setInterval(() => {
                if (jogador.timer_mod < jogador.tempoMod && jogador.mod == 0) {
                    jogador.timer_mod++
                } else {
                    jogador.liberaMod = 0

                    if (jogo.estatisticasNerds)
                        if (idioma == "pt")
                            console.log("Modificador pronto para uso novamente")
                        else
                            console.log("Modifier ready to use again")

                    ajusta_cores(5, 2)
                    clearInterval(jogador.var_timer_recarrega)
                    document.getElementById("carregando").style.display = "none"
                    document.getElementById("qtdMods").style.display = "block"
                }
            }, 2000)
        },

        desenha: function () {

            // Desenha o fogo embaixo do prédio ao flutuar
            if (this.mod_em_uso == 0 && this.mod == 1)
                spriteAdereco_combustao.desenha(this.x - 2, this.y + 145)

            if (this.skin == 0) {
                spriteJogador_Vermelho.desenha(this.x, this.y + 15)
                transitador("jogador1_noite", this.x, this.y + 15)
            } else if (this.skin == 1) {
                spriteJogador_Branco.desenha(this.x, this.y + 15)
                transitador("jogador2_noite", this.x, this.y + 15)
            } else if (this.skin == 2) {
                spriteJogador_Amarelo.desenha(this.x, this.y + 15)
                transitador("jogador3_noite", this.x, this.y + 15)
            } else if (this.skin == 3) {
                spriteJogador_Azul.desenha(this.x, this.y + 15)
                transitador("jogador4_noite", this.x, this.y + 15)
            } else if (this.skin == 4) {
                spriteJogador_Roxo.desenha(this.x, this.y + 15)
                transitador("jogador5_noite", this.x, this.y + 15)
            } else if (this.skin == 5) {
                spriteJogador_Verde.desenha(this.x, this.y + 15)
                transitador("jogador6_noite", this.x, this.y + 15)
            } else {
                spriteJogador_Padrao.desenha(this.x, this.y + 17)
                transitador("jogador7_noite", this.x, this.y + 15)
            }

            spriteAdereco_aco.desenha(this.x + 8, this.y + 24)

            spriteAdereco_bandeira.desenha(this.x + 3, this.y + 18)
            spriteAdereco_fogo.desenha(this.x + 3, this.y + 108)

            spriteAdereco_roda.desenha(this.x, this.y + 130)
        },
    },

    propsfundo = {
        objetos: [],
        tempoInsere: 0,
        qtdObjetos: 0,
        y: 120,

        insere: function () {
            if (jogo.velocidade != 0)
                insere_propsfundo()
        },

        atualiza: function () {
            if (this.tempoInsere == 0)
                this.insere()
            else
                this.tempoInsere--

            for (let x = 0, tam = this.objetos.length; x < tam; x++) {
                let obsb = this.objetos[x]
                obsb.x -= jogo.velocidade * 0.8

                if (obsb.x <= -obsb.largura - 90) {
                    this.objetos.splice(x, 1)

                    tam--
                    x--
                }
            }
        },

        desenha: function () {
            desenha_chao_fundo()
        }
    },

    propsfrente = {
        objetos: [],
        tempoInsere: 0,
        qtdObjetos: 0,
        y: 120,

        insere: function () {
            if (jogo.velocidade != 0)
                insere_propsfrente()
        },

        atualiza: function () {
            if (this.tempoInsere == 0)
                this.insere()
            else
                this.tempoInsere--

            for (let x = 0, tam = this.objetos.length; x < tam; x++) {
                let obsf = this.objetos[x]
                obsf.x -= jogo.velocidade * 1.2

                if (obsf.x <= -obsf.largura - 90) {
                    this.objetos.splice(x, 1)

                    tam--
                    x--
                }
            }
        },

        desenha: function () {
            desenha_chao_frente()
        }
    },

    obstaculos = {
        objetos: [],
        _obsfundo: [],
        _obsfrente: [],
        _scored: false,
        tempoInsere: 0,
        qtdObjetos: 0,
        qtdPisoes: 0,
        y: 120,

        insere: function () {
            if (jogo.velocidade != 0)
                insere_obj()
        },

        atualiza: function () {

            if (jogador.mod == 1 && jogador.mod_em_uso == 100 && jogador.y >= 432 && chao.muda_chao[1] == 2)
                jogador.pula()

            if (jogador.y >= 432 && chao.muda_chao[1] == 2 && ((jogador.timer_mod == 5 && jogador.mods_comprados[1] == 0) || (jogador.timer_mod == 10 && jogador.mods_comprados[0] == 1) || (jogador.timer_mod == 5 && jogador.mods_comprados[1] == 1)))
                if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {
                    if (jogador.mod == 0) {
                        if (jogador.chao_referencia == 650 || chao.muda_chao[1] == 2)
                            jogo.perdeu(eventos.inicia_evento)
                        else
                            jogo.perdeu(0)

                        jogo.gravidade = .3
                    }
                }

            if (this.tempoInsere == 0)
                this.insere()
            else
                this.tempoInsere--

            for (let i = 0, tam = this.objetos.length; i < tam; i++) {
                let obs = this.objetos[i]

                obs.x -= jogo.velocidade

                if (jogador.x < obs.x + obs.largura && jogador.x + jogador.largura >= obs.x && jogador.y + jogador.altura >= chao.y - obs.altura && obs.altura > 40) {
                    if ((jogador.mod == 1 || jogador.timer_mod < 1) && jogador.qtdMods > 0 && (jogo.status == estados.jogando || jogo.status == estados.tutorial)) {

                        if (obs.altura > 40 && obs.altura < 51) {
                            pisao_neles()

                            this.objetos.splice(i, 1)
                            tam--
                            i--
                        } else {

                            //  Subtrai pontos caso o jogador Bata em alguma construção
                            this.objetos.splice(i, 1)
                            tam--
                            i--
                            jogador.contador_mortes++

                            if ((jogo.status == estados.jogando || jogo.status == estados.tutorial) && obs.altura > 60) {
                                if (jogador.mod_em_uso != 1) {
                                    if (idioma == "pt")
                                        jogo.notifica("Não Atropele os Prédios!", "red")
                                    else
                                        jogo.notifica("Don't Run Over Buildings!", "red")

                                    soma_pontuacao(-2)
                                } else {
                                    if (idioma == "pt")
                                        jogo.notifica("Não é o Certo, mas acontece", "white")
                                    else
                                        jogo.notifica("It's not right, but it happens", "white")

                                    soma_pontuacao(2)
                                }

                                alteraValorEstatisticaPartida("pontuacao_partida", jogador.partida_pontuacao)

                                jogador.partida_predios_atropelados++
                                alteraValorEstatisticaPartida("quantidade_predios_partida", jogador.partida_predios_atropelados)

                                executaSons("faixa_efeitos2", "Efeitos", "Batida.ogg", 2)
                            }
                        }
                    } else if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {
                        if (obs.altura > 40 && obs.altura < 51)
                            pisao_neles()
                        else {
                            if (jogador.chao_referencia == 650 || chao.muda_chao[1] == 2)
                                jogo.perdeu(eventos.evento)
                            else
                                jogo.perdeu(0)

                            jogador.partida_predios_atropelados++
                            alteraValorEstatisticaPartida("quantidade_predios_partida", jogador.partida_predios_atropelados)
                        }

                        this.objetos.splice(i, 1)
                        tam--
                        i--
                    }
                } else if (obs.x <= 0 && (jogo.status == estados.jogando || jogo.status == estados.tutorial) && obs.altura >= 55 && !obs._scored) {
                    // Soma 1 valor no Score a cada obstáculo pulado
                    jogador.partida_pontuacao++
                    obs._scored = true

                    if (jogador.partida_pontuacao >= 200 && jogo.dificuldade == 3)
                        // Você tem um sério problema!
                        conquista(20, 0)

                    alteraValorEstatisticaPartida("pontuacao_partida", jogador.partida_pontuacao)
                } else if (obs.x <= -obs.largura - 90) {
                    this.objetos.splice(i, 1)
                    tam--
                    i--
                }
            }

            for (let x = 0, tam = this._obsfundo.length; x < tam; x++) {
                let obsb = this._obsfundo[x]
                obsb.x -= jogo.velocidade * 0.8

                if (obsb.x <= -obsb.largura - 90) {
                    this._obsfundo.splice(x, 1)

                    tam--
                    x--
                }
            }
        },

        desenha: function () {
            desenha_chao_centro()
        }
    }

function main() {

    carrega_dados()

    opcoes.canvas = document.getElementById("canvas")
    notificacoes = document.getElementById("notificacoes")
    filtro = document.getElementById("filtro")
    filtro2 = document.getElementById("filtro2")

    opcoes.largura = 1366
    opcoes.altura = 625

    opcoes.ctx = opcoes.canvas.getContext("2d")
    document.body.appendChild(opcoes.canvas)

    filtro.addEventListener("mousedown", clique)
    filtro2.addEventListener("mousedown", clique)
    document.addEventListener("keypress", clique)
    notificacoes.addEventListener("mousedown", clique)

    jogo.status = estados.jogar

    menu_inicial(1)
    roda()
}

function roda() {

    atualiza()
    desenha()
    valores()

    requestAnimationFrame(roda)
}

function atualiza() {

    if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {
        menu_inicial(0)

        if (jogo.status == estados.jogando)
            obstaculos.atualiza()
    }

    jogador.atualiza()

    propsfundo.atualiza()
    propsfrente.atualiza()
    Cenario_sprites.atualiza()
    background_predios.atualiza()

    chao.atualiza()

    // Executa o som de fundo de Vento em altas velocidades
    if (jogo.velocidade > 18.5 && ambiente.segura_vento == 0 && jogo.status == estados.jogando) {

        ambiente.segura_vento = 1
        executaSons2("faixa_ambiente", "Efeitos", "Vento.ogg", 2)

        vento_delay = setInterval(() => {
            ambiente.segura_vento = 0
            setInterval(vento_delay)
        }, 53000)
    }
}

function desenha() {

    propsfrente.desenha()
    background_ceu.desenha()
    Cenario_sprites.desenha()
    background_predios.desenha()

    propsfundo.desenha()

    opcoes.ctx.fillStyle = "#fff"
    opcoes.ctx.font = "50px Minecraft"

    if (jogo.status == estados.perdeu) {
        document.getElementById("notifica_moeda").innerHTML = `$${jogador.moedas}`
        $("#notifica_moeda").fadeIn()

        if (Cenario_sprites.astro[2] == 0)
            opcoes.ctx.fillStyle = "rgba(0, 0, 0, .7)"
        else
            opcoes.ctx.fillStyle = "rgba(255, 255, 255, .7)"
        opcoes.ctx.font = "70px Minecraftia"

        // Resumo da pontuação final do Jogador
        opcoes.ctx.fillText(labelTexto.texto, opcoes.canvas.width / 2 - opcoes.ctx.measureText(labelTexto.texto).width / 2, opcoes.altura / 1.4 + 40)

        background_predios.desenha(0, 400)

        if (Cenario_sprites.astro[2] == 0)
            opcoes.ctx.fillStyle = "black"
        else
            opcoes.ctx.fillStyle = "#fff"

        opcoes.ctx.font = "40px Minecraftia"
        if (jogador.partida_pontuacao < jogador.recorde)
            if (idioma == "pt")
                opcoes.ctx.fillText(`Recorde Atual: ${jogador.recorde}`, opcoes.canvas.width / 2 - opcoes.ctx.measureText(`Recorde Atual: ${jogador.recorde}`).width / 2, opcoes.altura / 1.3 + 50)
            else
                opcoes.ctx.fillText(`Current Record: ${jogador.recorde}`, opcoes.canvas.width / 2 - opcoes.ctx.measureText(`Current Record: ${jogador.recorde}`).width / 2, opcoes.altura / 1.3 + 50)

        opcoes.ctx.save()
        opcoes.ctx.translate(opcoes.largura / 2, opcoes.altura / 2)

        opcoes.ctx.restore()
    } if (jogo.status == estados.jogando)
        obstaculos.desenha()

    if (jogo.status == estados.jogar || jogo.status == estados.perdeu || jogo.status == estados.ocioso || jogo.status == estados.tutorial) {
        propsfundo.desenha()

        obstaculos.atualiza()
        obstaculos.desenha()
    }

    // Verifica se o jogador está ocioso e se a opção está ativa
    if (jogo.status == estados.jogar) {
        if (!jogo.estadoOcioso && jogo.ociosidade && confirma_carregamento) {
            jogo.estadoOcioso = 1

            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("%cO Modo Ocioso começará em 10 segundos", "color: green")
                else
                    console.log("%cIdle Mode will start in 10 seconds", "color: green")

            contagemOcioso = setTimeout(() => {
                jogo.status = estados.ocioso

                estadoOcioso("auto")
                clearTimeout(contagemOcioso)
            }, 10000)
        }
    }

    if (jogo.status == estados.ocioso) {
        if (eventos.seguraEventoOcioso == 0) {

            eventos.seguraEventoOcioso = 1

            eventos.relogio_eventos()
            eventos.qtd_eventos = [99, 99, 99, 99]
        }
    }

    propsfrente.desenha()
}