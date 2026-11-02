const chuva = {
    ativa: false,
    gotas: [],
    intensidade: 0,
    intensidade_maxima: 0,
    tipo: null,
    perfil: null,
    proxima_variante: null,
    inicio_previsto: 0,
    inicio: 0,
    temporizador: null,
    duracao: null,
    duracao_ms: 0,
    duracao_fade_ms: 12000,
    encerrando: false,
    inicio_encerramento: 0,
    duracao_encerramento_ms: 4500,
    proximo_trovao: 0,
    inicio_clarao: 0,
    duracao_clarao_ms: 0,
    opacidade_clarao: 0,
    contexto_audio: null,
    fonte_chuva: null,
    ganho_chuva: null,
    ganho_chuva_agendado: 0,
    ganho_chuva_inicio_valor: 0.0001,
    ganho_chuva_inicio_tempo: 0,
    ganho_chuva_fim_tempo: 0,
    ultima_atualizacao_audio_chuva: 0,
    temporizador_audio_chuva: null,
    audio_chuva_encerrando: false,
    raio: null,
    inicio_raio: 0,
    duracao_raio_ms: 0,
    raio_atras_nuvens: false,

    cria_variante: function () {
        const escolha = Math.random()
        const variante = escolha < 0.55
            ? { tipo: "chuva", intensidade: [0.45, 0.7], gotas: 180 }
            : escolha < 0.82
                ? { tipo: "torrencial", intensidade: [0.72, 0.92], gotas: 320 }
                : { tipo: "temporal", intensidade: [0.88, 1], gotas: 440 }
        variante.intensidade_maxima = variante.intensidade[0]
            + Math.random() * (variante.intensidade[1] - variante.intensidade[0])
        return variante
    },

    agenda: function () {
        if (!jogo.chuvaAtiva) return

        clearTimeout(this.temporizador)
        const intervalo = 120000 + Math.random() * 120000
        const segundos = Math.ceil(intervalo / 1000)
        this.proxima_variante = this.cria_variante()
        this.inicio_previsto = Date.now() + intervalo

        jogo.depuracao({ tls: "partida.proxima_chuva", replace: segundos, color: "purple" })

        this.temporizador = setTimeout(() => {
            const inicia_quando_pronto = () => {
                if (!jogo.chuvaAtiva) {
                    this.temporizador = null
                    return
                }

                if (this.encerrando) {
                    this.temporizador = setTimeout(inicia_quando_pronto, 100)
                    return
                }

                this.temporizador = null
                this.inicia()
            }

            inicia_quando_pronto()
        }, intervalo)
    },

    para: function () {
        clearTimeout(this.temporizador)
        this.temporizador = null
        this.proxima_variante = null
        this.inicio_previsto = 0

        if (this.ativa) {
            clearTimeout(this.duracao)
            this.duracao = null
            this.encerrando = true
            this.inicio_encerramento = Date.now()
            this.proximo_trovao = Infinity
            this.atualiza_audio_chuva()
            return
        }

        clearTimeout(this.duracao)
        this.duracao = null
        this.gotas = []
        this.intensidade = 0
        this.proximo_trovao = 0
        this.raio = null
        this.opacidade_clarao = 0
        this.tipo = null
        this.atualiza_audio_chuva()
    },

    inicia: function () {
        if (!jogo.chuvaAtiva) return
        if (this.encerrando) return

        const variante = this.proxima_variante || this.cria_variante()
        this.proxima_variante = null
        this.inicio_previsto = 0

        this.tipo = variante.tipo
        this.perfil = Math.random() < 0.5 ? "aumentando" : "diminuindo"
        this.intensidade_maxima = variante.intensidade_maxima
            ?? variante.intensidade[0] + Math.random() * (variante.intensidade[1] - variante.intensidade[0])
        this.intensidade = this.perfil == "aumentando" ? 0.08 : this.intensidade_maxima
        this.inicio = Date.now()
        this.ativa = true
        this.encerrando = false
        this.proximo_trovao = this.inicio + 5000 + Math.random() * 10000

        this.gotas = Array.from({ length: variante.gotas }, () => this.cria_gota())
        this.duracao_ms = 35000 + Math.random() * 25000
        jogo.depuracao({
            tls: "partida.chuva_iniciada",
            replace: [
                Math.ceil(this.duracao_ms / 1000),
                translations[`partida.estilo_chuva.${this.tipo}`]
            ],
            color: "purple"
        })

        this.duracao = setTimeout(() => {
            this.ativa = false
            this.gotas = []
            this.intensidade = 0
            this.tipo = null
            this.agenda()
        }, this.duracao_ms)
    },

    dispara_trovao: function (agora) {
        const intervalo_trovao = this.tipo == "temporal"
            ? [1800, 3800]
            : this.tipo == "torrencial"
                ? [4500, 8500]
                : [7000, 19000]
        this.proximo_trovao = agora + intervalo_trovao[0]
            + Math.random() * (intervalo_trovao[1] - intervalo_trovao[0])

        this.cria_raio(agora)

        if (jogo.claroesChuva) {
            this.inicio_clarao = agora
            this.duracao_clarao_ms = 350 + Math.random() * 250
            this.opacidade_clarao = 0.16 + Math.random() * 0.08
        } else {
            this.opacidade_clarao = 0
        }

        const variacoes_trovao = [
            { frequencia: 145, duracao: 4.1, atraso: 900 },
            { frequencia: 185, duracao: 3.4, atraso: 760 },
            { frequencia: 230, duracao: 3.1, atraso: 640 },
            { frequencia: 285, duracao: 2.8, atraso: 520 },
            { frequencia: 340, duracao: 2.4, atraso: 430 },
            { frequencia: 210, duracao: 4.4, atraso: 820 },
            { frequencia: 390, duracao: 2.2, atraso: 380 }
        ]
        const variacao = variacoes_trovao[Math.floor(Math.random() * variacoes_trovao.length)]
        const atraso = Math.max(300, variacao.atraso - 140 + Math.random() * 280)
        const volume_trovao = 0.85 + Math.random() * 0.25
        const volume_eco = 0.35 + Math.random() * 0.1

        setTimeout(() => this.toca_trovao(volume_trovao, variacao), atraso)
        setTimeout(() => this.toca_trovao(volume_eco, variacao), atraso + 800 + Math.random() * 500)
    },

    cria_raio: function (agora) {
        const largura = opcoes.canvas.width
        const altura_final = opcoes.canvas.height * (0.45 + Math.random() * 0.35)
        const inicio_x = largura * (0.15 + Math.random() * 0.7)

        const variacoes = [
            { segmentos: 7, desvio: 0.16, ramificacoes: 1 },
            { segmentos: 11, desvio: 0.08, ramificacoes: 2 },
            { segmentos: 9, desvio: 0.22, ramificacoes: 3 }
        ]
        const tipo = variacoes[Math.floor(Math.random() * variacoes.length)]
        const cria_tracado = (inicio_x, variacao) => {
            const caminho = [{ x: inicio_x, y: 0 }]
            const variacao_tipo = variacoes[variacao]

            for (let i = 1; i <= variacao_tipo.segmentos; i++) {
                const anterior = caminho[i - 1]
                const x = anterior.x + (Math.random() - 0.5) * largura * variacao_tipo.desvio
                caminho.push({
                    x: Math.max(0, Math.min(largura, x)),
                    y: altura_final * i / variacao_tipo.segmentos
                })
            }

            const ramificacoes = []
            for (let i = 0; i < variacao_tipo.ramificacoes; i++) {
                const origem = caminho[2 + Math.floor(Math.random() * (caminho.length - 3))]
                ramificacoes.push([
                    { x: origem.x, y: origem.y },
                    { x: origem.x + (Math.random() - 0.5) * largura * 0.12, y: Math.min(altura_final, origem.y + altura_final * 0.12) },
                    { x: origem.x + (Math.random() - 0.5) * largura * 0.18, y: Math.min(altura_final, origem.y + altura_final * 0.25) }
                ])
            }

            return { pontos: caminho, ramificacoes }
        }

        const indice_tipo = variacoes.indexOf(tipo)
        const raios = [cria_tracado(inicio_x, indice_tipo)]

        const chance_raio_adicional = this.tipo == "temporal"
            ? 0.85
            : this.tipo == "torrencial"
                ? 0.55
                : 0.3
        if (Math.random() < chance_raio_adicional) {
            const deslocamento = (Math.random() - 0.5) * largura * 0.07
            const inicio_segundo_raio = Math.max(0, Math.min(largura, inicio_x + deslocamento))
            let tipo_segundo_raio = Math.floor(Math.random() * variacoes.length)

            if (tipo_segundo_raio == indice_tipo)
                tipo_segundo_raio = (tipo_segundo_raio + 1) % variacoes.length

            raios.push(cria_tracado(inicio_segundo_raio, tipo_segundo_raio))
        }

        this.raio = raios
        this.inicio_raio = agora
        this.raio_atras_nuvens = Math.random() < 0.35
        const chance_repeticao = this.tipo == "temporal" ? 0.7 : 0.3
        this.repite_raio = Math.random() < chance_repeticao
        this.duracao_raio_ms = this.repite_raio ? 650 : 450
    },

    desenha_raio: function () {
        if (!this.raio) return

        const tempo_decorrido = Date.now() - this.inicio_raio
        const progresso = tempo_decorrido / this.duracao_raio_ms
        if (progresso >= 1) {
            this.raio = null
            this.repite_raio = false
            return
        }

        let opacidade
        if (this.repite_raio) {
            const opacidade_pulso = inicio => {
                const progresso_pulso = (tempo_decorrido - inicio) / 160
                return progresso_pulso >= 0 && progresso_pulso < 1 ? (1 - progresso_pulso) ** 2 : 0
            }
            opacidade = Math.max(opacidade_pulso(0), opacidade_pulso(300))
        } else {
            opacidade = (1 - progresso) ** 2
        }

        if (opacidade === 0) return

        const ctx = opcoes.ctx

        const desenha_tracado = (pontos, cor, espessura, brilho) => {
            ctx.beginPath()
            ctx.moveTo(pontos[0].x, pontos[0].y)

            for (let i = 1; i < pontos.length; i++)
                ctx.lineTo(pontos[i].x, pontos[i].y)

            ctx.strokeStyle = cor
            ctx.lineWidth = espessura
            ctx.shadowColor = cor
            ctx.shadowBlur = brilho
            ctx.stroke()
        }

        ctx.save()
        ctx.globalAlpha = opacidade
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        for (const raio of this.raio) {
            desenha_tracado(raio.pontos, "rgba(45, 130, 255, 0.2)", 9, 24)

            for (const ramificacao of raio.ramificacoes)
                desenha_tracado(ramificacao, "rgba(65, 155, 255, 0.22)", 5, 16)

            desenha_tracado(raio.pontos, "rgba(225, 245, 255, 0.62)", 2, 10)
        }
        ctx.restore()
    },

    prepara_audio: function () {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) {
            console.warn("Web Audio API não está disponível; os efeitos climáticos não poderão ser reproduzidos.")
            return Promise.resolve(null)
        }

        if (!this.contexto_audio)
            this.contexto_audio = new AudioContext()

        const contexto = this.contexto_audio
        if (contexto.state === "running")
            return Promise.resolve(contexto)

        return contexto.resume().then(() => contexto).catch(erro => {
            console.warn("Não foi possível ativar os efeitos climáticos:", erro)
            return null
        })
    },

    inicia_audio_chuva: function (contexto) {
        const duracao = 6
        const buffer = contexto.createBuffer(1, contexto.sampleRate * duracao, contexto.sampleRate)
        const dados = buffer.getChannelData(0)
        const tamanho_bloco = Math.floor(contexto.sampleRate * 0.08)
        const envelope_borda = Math.floor(contexto.sampleRate * 0.04)
        const variacoes_blocos = Array.from(
            { length: Math.ceil(dados.length / tamanho_bloco) },
            () => 0.65 + Math.random() * 0.35
        )

        for (let i = 0; i < dados.length; i++) {
            const variacao = variacoes_blocos[Math.floor(i / tamanho_bloco)]
            const modulacao = 0.75 + 0.25 * Math.sin(i / (contexto.sampleRate * 0.7))
            const fade_borda = Math.min(1, i / envelope_borda, (dados.length - i) / envelope_borda)
            const ruido = Math.random() * 2 - 1
            const suavizado = ruido * 0.12 + (i > 0 ? dados[i - 1] * 0.88 : 0)
            dados[i] = suavizado * variacao * modulacao * Math.max(0, fade_borda)
        }

        const fonte = contexto.createBufferSource()
        const filtro_chuva = contexto.createBiquadFilter()
        const ganho_mestre = contexto.createGain()
        const agora = contexto.currentTime

        fonte.buffer = buffer
        fonte.loop = true
        filtro_chuva.type = "lowpass"
        filtro_chuva.frequency.value = 850
        ganho_mestre.gain.setValueAtTime(0.0001, agora)

        fonte.connect(filtro_chuva)
        filtro_chuva.connect(ganho_mestre)
        ganho_mestre.connect(contexto.destination)
        fonte.start(agora)

        this.fonte_chuva = fonte
        this.ganho_chuva = ganho_mestre
        this.ganho_chuva_agendado = 0.0001
        this.ganho_chuva_inicio_valor = 0.0001
        this.ganho_chuva_inicio_tempo = agora
        this.ganho_chuva_fim_tempo = agora
        this.ultima_atualizacao_audio_chuva = 0
        this.audio_chuva_encerrando = false
    },

    valor_atual_audio_chuva: function (agora) {
        if (agora >= this.ganho_chuva_fim_tempo)
            return this.ganho_chuva_agendado

        const progresso = (agora - this.ganho_chuva_inicio_tempo) /
            (this.ganho_chuva_fim_tempo - this.ganho_chuva_inicio_tempo)
        return this.ganho_chuva_inicio_valor +
            (this.ganho_chuva_agendado - this.ganho_chuva_inicio_valor) * progresso
    },

    agenda_volume_audio_chuva: function (volume_alvo, agora, duracao) {
        const valor_atual = this.valor_atual_audio_chuva(agora)
        this.ganho_chuva.gain.cancelScheduledValues(agora)
        this.ganho_chuva.gain.setValueAtTime(valor_atual, agora)
        this.ganho_chuva.gain.linearRampToValueAtTime(volume_alvo, agora + duracao)
        this.ganho_chuva_inicio_valor = valor_atual
        this.ganho_chuva_inicio_tempo = agora
        this.ganho_chuva_fim_tempo = agora + duracao
        this.ganho_chuva_agendado = volume_alvo
    },

    atualiza_audio_chuva: function () {
        const contexto = this.contexto_audio
        if (!contexto || contexto.state !== "running") return

        const tocando = this.ativa && jogo.estadoSom && get_volume_som(2) > 0
            && (jogo.chuvaAtiva || this.encerrando)
        if (!tocando) {
            if (!this.ganho_chuva || this.audio_chuva_encerrando) return

            const fonte = this.fonte_chuva
            this.audio_chuva_encerrando = true
            const agora = contexto.currentTime
            this.agenda_volume_audio_chuva(0.0001, agora, 0.8)
            clearTimeout(this.temporizador_audio_chuva)
            this.temporizador_audio_chuva = setTimeout(() => {
                if (this.fonte_chuva !== fonte) return
                fonte.stop()
                this.fonte_chuva = null
                this.ganho_chuva = null
                this.temporizador_audio_chuva = null
                this.audio_chuva_encerrando = false
            }, 900)
            return
        }

        clearTimeout(this.temporizador_audio_chuva)
        this.temporizador_audio_chuva = null
        this.audio_chuva_encerrando = false
        if (!this.fonte_chuva)
            this.inicia_audio_chuva(contexto)

        const agora_ms = Date.now()
        if (agora_ms - this.ultima_atualizacao_audio_chuva < 100) return

        const volume_efeitos = get_volume_som(2) / 100
        const volume_alvo = Math.max(0.0001, 0.18 * volume_efeitos * this.intensidade)
        if (Math.abs(volume_alvo - this.ganho_chuva_agendado) < 0.008) return

        const agora = contexto.currentTime
        this.agenda_volume_audio_chuva(volume_alvo, agora, 0.25)
        this.ultima_atualizacao_audio_chuva = agora_ms
    },

    toca_trovao: function (volume_relativo, variacao) {
        if (!jogo.estadoSom || !jogo.chuvaAtiva || get_volume_som(2) == 0) return

        this.prepara_audio().then(contexto => {
            if (!jogo.estadoSom || !jogo.chuvaAtiva || get_volume_som(2) == 0
                || !contexto || contexto.state !== "running") return

            const duracao = variacao.duracao
            const buffer = contexto.createBuffer(1, contexto.sampleRate * duracao, contexto.sampleRate)
            const dados = buffer.getChannelData(0)

            for (let i = 0; i < dados.length; i++) {
                const progresso = i / dados.length
                const envelope = Math.pow(1 - progresso, 1.8) * (0.72 + Math.random() * 0.28)
                dados[i] = (Math.random() * 2 - 1) * envelope
            }

            const fonte = contexto.createBufferSource()
            const filtro = contexto.createBiquadFilter()
            const volume = contexto.createGain()
            const volume_efeitos = get_volume_som(2) / 100
            const agora = contexto.currentTime
            const compressor = contexto.createDynamicsCompressor()

            fonte.buffer = buffer
            filtro.type = "lowpass"
            filtro.frequency.value = variacao.frequencia
            volume.gain.setValueAtTime(0.0001, agora)
            volume.gain.linearRampToValueAtTime(1.7 * volume_efeitos * volume_relativo, agora + 0.12)
            volume.gain.exponentialRampToValueAtTime(0.0001, agora + duracao)

            fonte.connect(filtro)
            filtro.connect(volume)
            volume.connect(compressor)
            fonte.start(agora)
            fonte.stop(agora + duracao)

            if (Math.random() < 0.4) {
                const duracao_reverb = 1.5 + Math.random() * 1.2
                const buffer_reverb = contexto.createBuffer(
                    1,
                    Math.ceil(contexto.sampleRate * duracao_reverb),
                    contexto.sampleRate
                )
                const dados_reverb = buffer_reverb.getChannelData(0)

                for (let i = 0; i < dados_reverb.length; i++) {
                    const decaimento = (1 - i / dados_reverb.length) ** 2
                    dados_reverb[i] = (Math.random() * 2 - 1) * decaimento
                }

                const reverb = contexto.createConvolver()
                const ganho_reverb = contexto.createGain()
                reverb.buffer = buffer_reverb
                ganho_reverb.gain.setValueAtTime(0.28 + Math.random() * 0.12, agora)
                volume.connect(reverb)
                reverb.connect(ganho_reverb)
                ganho_reverb.connect(compressor)
            }

            compressor.threshold.value = -8
            compressor.knee.value = 12
            compressor.ratio.value = 8
            compressor.connect(contexto.destination)
        })
    },

    cria_gota: function () {
        return {
            x: Math.random() * opcoes.canvas.width,
            y: -Math.random() * opcoes.canvas.height,
            comprimento: 8 + Math.random() * 20,
            velocidade: 5 + Math.random() * 11
        }
    },

    desenha: function () {
        const ctx = opcoes.ctx
        const largura = opcoes.canvas.width
        const altura = opcoes.canvas.height
        const agora = Date.now()

        if (this.ativa) {
            const elapsed = agora - this.inicio
            const progresso = Math.min(elapsed / this.duracao_ms, 1)
            const curva = Math.pow(progresso, 1.5)
            const fade_inicio = this.duracao_ms - this.duracao_fade_ms
            const progresso_fade = Math.max(0, Math.min((elapsed - fade_inicio) / this.duracao_fade_ms, 1))
            const curva_fade = progresso_fade * progresso_fade * (3 - 2 * progresso_fade)
            const perfil = this.perfil == "aumentando"
                ? 0.08 + Math.min(elapsed / 12000, 1) * 0.92
                : 1 - 0.55 * curva

            const progresso_encerramento = this.encerrando
                ? Math.min((agora - this.inicio_encerramento) / this.duracao_encerramento_ms, 1)
                : 0
            const fator_encerramento = this.encerrando
                ? (1 - progresso_encerramento) ** 2
                : 1
            this.intensidade = this.intensidade_maxima * perfil * (1 - curva_fade) * fator_encerramento

            if (!this.encerrando && jogo.chuvaAtiva && agora >= this.proximo_trovao)
                this.dispara_trovao(agora)

            const vento = Math.sin(agora / 1200) * (1 + this.intensidade)
            const entrada = Math.min(elapsed / 8000, 1)
            const quantidade_visivel = Math.ceil(this.gotas.length * this.intensidade * entrada)
            const velocidade = 0.35 + this.intensidade * 0.65

            if (quantidade_visivel > 0) {
                ctx.save()
                ctx.strokeStyle = `rgba(190, 215, 235, ${0.2 + this.intensidade * 0.45})`
                ctx.lineWidth = 0.5 + this.intensidade * 1.5
                ctx.lineCap = "round"
                ctx.beginPath()

                for (let i = 0; i < quantidade_visivel; i++) {
                    const gota = this.gotas[i]
                    ctx.moveTo(gota.x, gota.y)
                    ctx.lineTo(gota.x + vento, gota.y + gota.comprimento * velocidade)

                    gota.x += vento * 0.15
                    gota.y += gota.velocidade * velocidade

                    if (gota.y > altura) {
                        gota.x = Math.random() * largura
                        gota.y = -gota.comprimento
                    }

                    if (gota.x < 0) gota.x = largura
                    else if (gota.x > largura) gota.x = 0
                }

                ctx.stroke()
                ctx.restore()
            }

            if (this.encerrando && progresso_encerramento >= 1) {
                this.ativa = false
                this.encerrando = false
                this.gotas = []
                this.intensidade = 0
                this.proximo_trovao = 0
                this.raio = null
                this.opacidade_clarao = 0
                this.tipo = null
            }
        }

        this.atualiza_audio_chuva()

        if (jogo.claroesChuva && this.opacidade_clarao > 0) {
            const progresso_clarao = Math.min((agora - this.inicio_clarao) / this.duracao_clarao_ms, 1)
            const opacidade = this.opacidade_clarao * (1 - progresso_clarao) ** 2

            if (progresso_clarao >= 1)
                this.opacidade_clarao = 0
            else {
                ctx.save()
                ctx.fillStyle = `rgba(255, 255, 255, ${opacidade})`
                ctx.fillRect(0, 0, largura, altura)
                ctx.restore()
            }
        }
    }
}

function setup() {
    noCanvas()
}

function prepara_audio_climatico() {
    chuva.prepara_audio().then(contexto => {
        if (contexto)
            chuva.atualiza_audio_chuva()
    })
}

document.addEventListener("pointerdown", prepara_audio_climatico, true)
document.addEventListener("keydown", prepara_audio_climatico, true)

function inicia_efeitos_climaticos() {
    if (jogo.chuvaAtiva)
        chuva.agenda()
}

function altera_chuva() {
    jogo.chuvaAtiva = jogo.chuvaAtiva ? 0 : 1
    localStorage.setItem("pul4Pr3dios-chuvaAtiva", jogo.chuvaAtiva)

    if (jogo.chuvaAtiva)
        chuva.agenda()
    else
        chuva.para()

    sincronizaChuva()
}

function sincronizaChuva() {
    const status = jogo.chuvaAtiva ? "botao.ativado" : "botao.desativado"
    get_element("status_chuva").innerHTML = translations[status]
}

function altera_claroes_chuva() {
    jogo.claroesChuva = jogo.claroesChuva ? 0 : 1
    localStorage.setItem("pul4Pr3dios-claroesChuva", jogo.claroesChuva)
    sincronizaClaroesChuva()
}

function sincronizaClaroesChuva() {
    const status = jogo.claroesChuva ? "botao.ativado" : "botao.desativado"
    get_element("status_claroes_chuva").innerHTML = translations[status]
}

function desenha_raio() {
    chuva.desenha_raio()
}

function desenha_chuva() {
    chuva.desenha()
}
