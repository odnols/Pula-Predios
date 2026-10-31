var background_predios = {
    predios: 0,
    montanhas: [0, 0],
    transicoes_por_bloco: {},
    blocos: {
        cidade: [false, false],
        montanha_fundo: [false, false],
        montanha_frente: [false, false]
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
        const destino = transicao_programada
            ? transicao_programada.destino
            : eventos.evento == 3
                ? (jogo.bioma == 1 ? "lava" : "terra")
                : (eventos.evento == 1 || jogo.bioma == 1 ? "agua" : "terra")

        blocos.shift()

        if (transicao_programada && tipo_anterior !== destino) {
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

        if (transicao_programada && tipo_anterior !== destino) {
            transicao_programada.camadas[camada] = false
            eventos.transicoes_liquido_pendentes = eventos.transicoes_liquido_pendentes.filter(
                transicao => Object.values(transicao.camadas).some(pendente => pendente)
            )
        }
    },

    desenha_bloco: function (sprite, camada, indice, x, y, sprite_noite, x_noite, y_noite) {
        const ctx = opcoes.ctx
        const largura = opcoes.largura
        const bloco = this.blocos[camada][indice]

        ctx.save()
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
        ctx.restore()
    },

    prepara_transicoes_fundo: function (camada) {
        const blocos = this.blocos[camada]
        const transicoes = blocos.map(() => [])

        for (let indice = 0; indice < blocos.length; indice++) {
            const bloco = blocos[indice]
            if (!bloco || bloco.tipo !== "transicao") continue

            const entrando_em_liquido = bloco.origem == "terra" && ["agua", "lava"].includes(bloco.destino)
            const saindo_de_liquido = ["agua", "lava"].includes(bloco.origem) && bloco.destino == "terra"
            const trocando_liquido = ["agua", "lava"].includes(bloco.origem)
                && ["agua", "lava"].includes(bloco.destino)
                && bloco.origem !== bloco.destino

            if (trocando_liquido) {
                if (indice > 0)
                    transicoes[indice - 1].push(2)
                transicoes[indice].push(1)
            } else if (entrando_em_liquido || saindo_de_liquido) {
                transicoes[indice].push(entrando_em_liquido ? 1 : 2)
            }
        }

        this.transicoes_por_bloco[camada] = transicoes
    },

    desenha_transicoes_bloco: function (camada, indice, x) {
        const transicoes = this.transicoes_por_bloco[camada]?.[indice] || []

        for (const lado of transicoes) {
            const escopo = camada == "cidade" ? "cidade" : "montanha"
            const nome = `transita_${escopo}${lado}`
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
        for (const camada of ["montanha_fundo", "cidade", "montanha_frente"])
            this.prepara_transicoes_fundo(camada)

        this.desenha_bloco(spriteMontanhas, "montanha_fundo", 0, this.montanhas[1], 480, "montanhas_noite", 0, 3)
        this.desenha_bloco(spriteMontanhas, "montanha_fundo", 1, this.montanhas[1] + opcoes.largura, 480, "montanhas_noite", 0, 3)

        this.desenha_bloco(spriteCidade, "cidade", 0, this.predios, 257, "cidade_noite", 0, -62)
        this.desenha_bloco(spriteCidade, "cidade", 1, this.predios + opcoes.largura, 257, "cidade_noite", 0, -62)

        this.desenha_bloco(spriteMontanhas, "montanha_frente", 0, this.montanhas[0], 510, "montanhas_noite", 0, 3)
        this.desenha_bloco(spriteMontanhas, "montanha_frente", 1, this.montanhas[0] + opcoes.largura, 510, "montanhas_noite", 0, 3)
    }
}
