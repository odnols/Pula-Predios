var background_predios = {
    predios: 0,
    montanhas: [0, 0],
    indice_bloco_atual: 1,
    fator_nevoa_chuva_atual: 0,
    ultima_atualizacao_nevoa: 0,
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
        if (!variante || !["torrencial", "temporal"].includes(variante.tipo)) return 0

        const suave = progresso => {
            const limitado = Math.max(0, Math.min(1, progresso))
            return limitado * limitado * (3 - 2 * limitado)
        }

        if (!chuva.ativa)
            return chuva.inicio_previsto
                ? suave(1 - (chuva.inicio_previsto - agora) / 25000)
                : 0

        const rampa_entrada = suave((agora - chuva.inicio) / 12000)
        const progresso_saida = chuva.encerrando
            ? 1 - (agora - chuva.inicio_encerramento) / chuva.duracao_encerramento_ms
            : (chuva.duracao_ms - chuva.duracao_fade_ms - (agora - chuva.inicio)) / chuva.duracao_fade_ms

        return rampa_entrada * suave(progresso_saida)
    },

    atualiza_nevoa_chuva: function () {
        const agora = Date.now()
        const delta = this.ultima_atualizacao_nevoa
            ? Math.min(agora - this.ultima_atualizacao_nevoa, 100)
            : 0
        const progresso = Math.min(delta / 5000, 1)
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

    desenha: function () {
        this.atualiza_nevoa_chuva()

        for (const camada of ["montanha_fundo", "cidade", "montanha_frente"])
            this.prepara_transicoes_fundo(camada)

        const camadas = [
            { nome: "montanha_fundo", sprite: spriteMontanhas, x: this.montanhas[1], y: 480, sprite_noite: "montanhas_noite", x_noite: 0, y_noite: 3 },
            { nome: "cidade", sprite: spriteCidade, x: this.predios, y: 257, sprite_noite: "cidade_noite", x_noite: 0, y_noite: -62 },
            { nome: "montanha_frente", sprite: spriteMontanhas, x: this.montanhas[0], y: 510, sprite_noite: "montanhas_noite", x_noite: 0, y_noite: 3 }
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
    }
}
