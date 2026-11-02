var background_predios = {
    predios: 0,
    montanhas: [0, 0],
    indice_bloco_atual: 1,
    fator_nevoa_chuva_atual: 0,
    ultima_atualizacao_nevoa: 0,
    fumaca: [],
    ultima_fumaca: 0,
    ilhas_por_camada: {
        montanha_fundo: null,
        cidade: null
    },
    transicoes_por_bloco: {},
    contexto_blocos: {},
    blocos: {
        cidade: [false, false, false, false],
        montanha_fundo: [false, false, false, false],
        montanha_frente: [false, false, false, false]
    },

    insere_bloco: function (camada) {
        const blocos = this.blocos[camada]
        const anterior = blocos[blocos.length - 1]
        const tipo_anterior = anterior && anterior.tipo == "transicao"
            ? anterior.destino
            : anterior === "agua" || anterior === "lava" ? anterior
                : anterior === true ? "agua" : "terra"
        const transicao_programada = eventos.transicoes_liquido_pendentes.find(
            transicao => transicao.camadas[camada] && transicao.origem == tipo_anterior
        )
        let ilha = this.ilhas_por_camada[camada] || null
        const proximos_liquidos = [blocos[2], blocos[3]]
        const tipo_liquido = bloco => bloco === true
            ? "agua"
            : ["agua", "lava"].includes(bloco) ? bloco : null
        const liquido_disponivel = tipo_liquido(proximos_liquidos[0])

        if (!ilha
            && ["montanha_fundo", "cidade"].includes(camada)
            && jogo.bioma == 1
            && liquido_disponivel
            && tipo_liquido(proximos_liquidos[1]) == liquido_disponivel
            && !transicao_programada
            && Math.random() < 0.55) {
            ilha = this.ilhas_por_camada[camada] = {
                fase: "entrada",
                liquido: liquido_disponivel
            }
        }

        let destino = transicao_programada
            ? transicao_programada.destino
            : eventos.evento == 3
                ? (jogo.bioma == 1 ? "lava" : "terra")
                : (eventos.evento == 1 || jogo.bioma == 1 ? "agua" : "terra")

        let transicao_ilha = null
        if (ilha?.fase == "entrada") {
            destino = "terra"
            transicao_ilha = { origem: ilha.liquido, destino, ilha }
            ilha.fase = "saida"
        } else if (ilha?.fase == "saida") {
            destino = ilha.liquido
            transicao_ilha = { origem: "terra", destino, ilha }
            this.ilhas_por_camada[camada] = null
        }

        blocos.shift()

        if (transicao_ilha && tipo_anterior !== destino) {
            blocos.push({
                tipo: "transicao",
                origem: transicao_ilha.origem,
                destino: transicao_ilha.destino,
                ilha: transicao_ilha.ilha
            })
        } else if (transicao_programada && tipo_anterior !== destino) {
            blocos.push({
                tipo: "transicao",
                origem: tipo_anterior,
                destino: destino
            })
        } else if (anterior && anterior.tipo == "transicao") {
            blocos.push(anterior.destino)
        } else if (tipo_anterior !== destino) {
            blocos.push({
                tipo: "transicao",
                origem: tipo_anterior,
                destino: destino
            })
        } else {
            blocos.push(destino)
        }

        if (transicao_programada && !transicao_ilha && tipo_anterior !== destino) {
            transicao_programada.camadas[camada] = false
            eventos.transicoes_liquido_pendentes = eventos.transicoes_liquido_pendentes.filter(
                transicao => Object.values(transicao.camadas).some(pendente => pendente)
            )
        }
    },

    fator_nevoa_chuva: function () {
        if (typeof chuva == "undefined") return 0

        const agora = Date.now()
        const variante = chuva.ativa ? chuva : chuva.proxima_variante
        const pesos_tipo = { chuva: 0.45, torrencial: 0.8, temporal: 1 }
        const peso = variante ? pesos_tipo[variante.tipo] : 0
        if (!peso) return 0

        const suave = progresso => {
            const limitado = Math.max(0, Math.min(1, progresso))
            return limitado * limitado * (3 - 2 * limitado)
        }

        if (!chuva.ativa)
            return chuva.inicio_previsto
                ? peso * suave(1 - (chuva.inicio_previsto - agora) / 25000)
                : 0

        // A névoa já vem subindo desde antes da chuva começar, então não reinicia a rampa
        const progresso_saida = chuva.encerrando
            ? 1 - (agora - chuva.inicio_encerramento) / chuva.duracao_encerramento_ms
            : (chuva.duracao_ms - chuva.duracao_fade_ms - (agora - chuva.inicio)) / chuva.duracao_fade_ms

        return peso * suave(progresso_saida)
    },

    atualiza_nevoa_chuva: function () {
        const agora = Date.now()
        const delta = this.ultima_atualizacao_nevoa
            ? Math.min(agora - this.ultima_atualizacao_nevoa, 100)
            : 0
        const progresso = 1 - Math.exp(-delta / 2500)
        const alvo = this.fator_nevoa_chuva()

        this.fator_nevoa_chuva_atual += (alvo - this.fator_nevoa_chuva_atual) * progresso
        this.ultima_atualizacao_nevoa = agora
    },

    desenha_bloco: function (sprite, camada, indice, x, y, sprite_noite, x_noite, y_noite) {
        const ctx = opcoes.ctx
        const largura = opcoes.largura
        const bloco = this.blocos[camada][indice]
        const atmosfera_por_camada = {
            montanha_frente: 0.06,
            cidade: 0.14,
            montanha_fundo: 0.24
        }
        const opacidade_noite = ambiente.libera_transitador
            ? Math.max(0, Math.min(1, ambiente.opacidade_noite))
            : 0
        const atmosfera_base = atmosfera_por_camada[camada] * 0.5 * (1 - opacidade_noite)
        const atmosfera_chuva = atmosfera_por_camada[camada]
            * 0.5
            * this.fator_nevoa_chuva_atual
            * (1 - opacidade_noite)
        const atmosfera = atmosfera_base + atmosfera_chuva
        x = Math.round(x)

        ctx.save()
        if (atmosfera > 0) {
            ctx.filter = `brightness(${1 + atmosfera * 0.25})`
        }
        ctx.beginPath()
        ctx.rect(x, 0, largura, opcoes.altura)
        ctx.clip()

        if (bloco && bloco.tipo == "transicao") {
            const liquido = ["agua", "lava"].includes(bloco.destino) ? bloco.destino : bloco.origem

            if (liquido == "agua") {
                this.desenha_liquido_fundo("agua_fundo", camada, x)
                const posicao = presets.agua_fundo[camada]
                transitador("agua_noite", x + posicao.x, posicao.y)
            } else if (liquido == "lava") {
                this.desenha_liquido_fundo("lava_fundo", camada, x)
            }

        } else if (bloco === "agua" || bloco === true) {
            this.desenha_liquido_fundo("agua_fundo", camada, x)

            const posicao = presets.agua_fundo[camada]
            transitador("agua_noite", x + posicao.x, posicao.y)
        } else if (bloco === "lava") {
            this.desenha_liquido_fundo("lava_fundo", camada, x)
        } else {
            sprite.desenha(x, y)
            transitador(sprite_noite, x + x_noite, y + y_noite)
        }

        this.desenha_transicoes_bloco(camada, indice, x)
        if (atmosfera > 0) {
            ctx.filter = "none"
            ctx.fillStyle = `rgba(255, 255, 255, ${atmosfera})`
            ctx.fillRect(x, 0, largura, opcoes.altura)
        }
        ctx.restore()
    },

    prepara_transicoes_fundo: function (camada) {
        const blocos = this.blocos[camada]
        const transicoes = blocos.map(() => [])
        const indice_atual = this.indice_bloco_atual
        this.contexto_blocos[camada] = {
            anterior: blocos[indice_atual - 1],
            atual: blocos[indice_atual],
            proximo: blocos[indice_atual + 1],
            seguinte: blocos[indice_atual + 2]
        }

        for (let indice = 0; indice < blocos.length; indice++) {
            const bloco = blocos[indice]
            if (!bloco || bloco.tipo !== "transicao") continue

            const entrando_em_liquido = bloco.origem == "terra" && ["agua", "lava"].includes(bloco.destino)
            const saindo_de_liquido = ["agua", "lava"].includes(bloco.origem) && bloco.destino == "terra"
            const trocando_liquido = ["agua", "lava"].includes(bloco.origem)
                && ["agua", "lava"].includes(bloco.destino)
                && bloco.origem !== bloco.destino

            const transicao = { ilha: bloco.ilha || null }
            if (trocando_liquido) {
                if (indice > 0)
                    transicoes[indice - 1].push({ ...transicao, lado: 2 })
                transicoes[indice].push({ ...transicao, lado: 1 })
            } else if (entrando_em_liquido || saindo_de_liquido) {
                transicoes[indice].push({ ...transicao, lado: entrando_em_liquido ? 1 : 2 })
            }
        }

        this.transicoes_por_bloco[camada] = transicoes
    },

    desenha_transicoes_bloco: function (camada, indice, x) {
        const transicoes = this.transicoes_por_bloco[camada]?.[indice] || []

        for (const transicao of transicoes) {
            const escopo = transicao.ilha
                ? camada == "cidade" ? "ilha_cidade" : "ilha"
                : camada == "cidade" ? "cidade" : "montanha"
            const nome = `transita_${escopo}${transicao.lado}`
            const preset = presets[nome]
            const posicao = preset[camada] || preset

            desenha_sprite_transicao(nome, preset, x + posicao.x, posicao.y)
        }
    },

    desenha_liquido_fundo: function (nome_preset, camada, x) {
        const preset = presets[nome_preset]
        const posicao = preset[camada]
        const imagem = lista_sprites[preset.imagem]

        if (imagem && imagem.complete && imagem.naturalWidth)
            opcoes.ctx.drawImage(
                imagem,
                preset.sprite.x,
                preset.sprite.y,
                preset.sprite.Largura,
                preset.sprite.Altura,
                x + posicao.x,
                posicao.y,
                opcoes.largura,
                posicao.altura
            )
    },

    atualiza: function () {
        this.montanhas[1] -= jogo.velocidade * 0.15 // Montanhas fundo
        this.predios -= jogo.velocidade * 0.2
        this.montanhas[0] -= jogo.velocidade * 0.25 // Montanhas frente

        if (this.predios <= -opcoes.largura) {
            this.predios += opcoes.largura
            this.insere_bloco("cidade")
        }

        for (let i = 0; i < this.montanhas.length; i++) {
            if (this.montanhas[i] <= -opcoes.largura) {
                this.montanhas[i] += opcoes.largura
                this.insere_bloco(i == 0 ? "montanha_frente" : "montanha_fundo")
            }
        }
    },

    // Tipo de líquido ("agua", "lava" ou null) da camada na posição x da tela
    get_liquido_camada_em_x: function (camada, x_camada, x) {
        const largura = opcoes.largura
        const posicao = x - x_camada
        const indice = Math.floor(posicao / largura) + this.indice_bloco_atual
        const bloco = this.blocos[camada][indice]
        const liquido = tipo => ["agua", "lava"].includes(tipo) ? tipo : null

        if (bloco === true) return "agua"
        if (bloco && bloco.tipo === "transicao") {
            const fracao = (((posicao % largura) + largura) % largura) / largura
            return liquido(fracao < 0.5 ? bloco.origem : bloco.destino)
        }
        return liquido(bloco)
    },

    // Líquido do piso de fundo (chao.pisos_b) na posição x da tela
    get_liquido_piso_fundo_em_x: function (x) {
        const pisos = chao.pisos_b
        const largura = opcoes.largura
        const indice_atual = pisos.length >= 4 ? 1 : 0
        const posicao = x - Math.round(chao.xb)
        const indice = Math.floor(posicao / largura) + indice_atual
        const piso = pisos[indice]
        const liquido = get_tipo_piso_liquido(piso)
        if (!liquido) return null

        const posicao_no_piso = posicao - (indice - indice_atual) * largura
        const transicao_entrada = piso.transicao_entrada === "transita_areia1"
            || piso.transicao_entrada === "transita_chao1"
        if (transicao_entrada && posicao_no_piso < limites_transicoes_liquido.entrada) return null

        if (get_tipo_piso_saida_liquido(pisos[indice + 1])
            && posicao_no_piso >= limites_transicoes_liquido.saida) return null

        return liquido
    },

    atualiza_fumaca_liquidos: function (camadas) {
        if (jogo.qualidadeGrafica == 0) {
            this.fumaca = []
            this.ultima_fumaca = 0
            return
        }

        const ctx = opcoes.ctx
        const agora = Date.now()
        const delta = this.ultima_fumaca
            ? Math.min(agora - this.ultima_fumaca, 100)
            : 0
        this.ultima_fumaca = agora

        // Da camada mais distante para a mais próxima, terminando no piso de fundo
        const ordem = ["montanha_fundo", "cidade", "montanha_frente", "piso_fundo"]
        const por_nome = Object.fromEntries(camadas.map(camada => [camada.nome, camada]))
        const get_liquido = (nome, x) => nome == "piso_fundo"
            ? this.get_liquido_piso_fundo_em_x(x)
            : this.get_liquido_camada_em_x(nome, por_nome[nome].x, x)

        // Também prepara a fumaça no bloco seguinte, fora da tela, para ela já estar pronta ao entrar
        const largura_busca = opcoes.canvas.width + opcoes.largura
        const tentativas = delta * 0.09 * largura_busca / opcoes.canvas.width
        let total = Math.floor(tentativas) + (Math.random() < tentativas % 1 ? 1 : 0)
        for (; total > 0; total--) {
            const x = Math.random() * largura_busca
            const par = Math.floor(Math.random() * 3)
            const nome_frente = ordem[par + 1]
            const liquido_frente = get_liquido(nome_frente, x)
            const liquido_atras = get_liquido(ordem[par], x)

            if (!liquido_frente || !liquido_atras || liquido_frente === liquido_atras) continue

            const piso = nome_frente == "piso_fundo"
            const particula = {
                x,
                y: (piso ? chao.y + 10 : presets.lava_fundo[nome_frente].y) + 2 + Math.random() * 6,
                fator: piso ? 0.8 : por_nome[nome_frente].fator,
                velocidade_y: 0.03 + Math.random() * 0.03,
                deriva: (Math.random() - 0.5) * 0.008,
                tamanho: 4 + Math.floor(Math.random() * 3),
                idade: 0,
                duracao: 2000 + Math.random() * 1600
            }

            // Fora da tela, já nasce em idade e altura variadas para entrar acima do líquido
            if (x > opcoes.canvas.width) {
                particula.idade = Math.random() * particula.duracao * 0.7
                particula.y -= particula.velocidade_y * particula.idade
                particula.x += particula.deriva * particula.idade
            }

            this.fumaca.push(particula)
        }

        ctx.save()
        ctx.fillStyle = "rgb(8, 8, 12)"

        // Remove cada partícula individualmente ao expirar ou sair da tela
        this.fumaca = this.fumaca.filter(particula => {
            // Fora da tela à direita, só acompanha a rolagem até entrar
            const aguardando = particula.x > opcoes.canvas.width
            if (aguardando) {
                particula.x -= jogo.velocidade * particula.fator
                return true
            }

            particula.idade += delta
            const vida = particula.idade / particula.duracao
            if (vida >= 1) return false

            particula.x += particula.deriva * delta - jogo.velocidade * particula.fator
            particula.y -= particula.velocidade_y * delta

            const tamanho = Math.round(particula.tamanho * (1 + vida * 0.8))
            if (particula.x + tamanho < 0
                || particula.x > opcoes.canvas.width
                || particula.y + tamanho < 0
                || particula.y > opcoes.canvas.height) return false

            const entrada = Math.min(vida / 0.2, 1)
            ctx.globalAlpha = 0.45 * entrada * (1 - vida)
            ctx.fillRect(Math.round(particula.x), Math.round(particula.y), tamanho, tamanho)
            return true
        })

        ctx.restore()
    },

    desenha: function () {
        this.atualiza_nevoa_chuva()

        for (const camada of ["montanha_fundo", "cidade", "montanha_frente"])
            this.prepara_transicoes_fundo(camada)

        const camadas = [
            { nome: "montanha_fundo", sprite: spriteMontanhas, x: this.montanhas[1], y: 480, sprite_noite: "montanhas_noite", x_noite: 0, y_noite: 3, fator: 0.15 },
            { nome: "cidade", sprite: spriteCidade, x: this.predios, y: 257, sprite_noite: "cidade_noite", x_noite: 0, y_noite: -62, fator: 0.2 },
            { nome: "montanha_frente", sprite: spriteMontanhas, x: this.montanhas[0], y: 510, sprite_noite: "montanhas_noite", x_noite: 0, y_noite: 3, fator: 0.25 }
        ]

        for (const camada of camadas) {
            for (let indice = 0; indice < this.blocos[camada.nome].length; indice++) {
                this.desenha_bloco(
                    camada.sprite,
                    camada.nome,
                    indice,
                    camada.x + (indice - this.indice_bloco_atual) * opcoes.largura,
                    camada.y,
                    camada.sprite_noite,
                    camada.x_noite,
                    camada.y_noite
                )
            }
        }

        this.atualiza_fumaca_liquidos(camadas)
    }
}
