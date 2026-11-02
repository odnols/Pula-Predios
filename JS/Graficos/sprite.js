const lista_sprites = {}

function Carrega_sprite(alvo, x, y, Largura, Altura) {
    this.alvo = alvo
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        opcoes.ctx.drawImage(lista_sprites[alvo], this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function desenha_sprite_transicao(nome, preset, x, y, espelhar_horizontal = false) {
    const ctx = opcoes.ctx
    x = Math.round(x)
    const noite_ativa = typeof ambiente != "undefined"
        && ambiente.libera_transitador
    const opacidade_noite = !noite_ativa
        ? 0
        : Math.max(0, Math.min(1, ambiente.opacidade_noite))
    const imagem_dia = lista_sprites[preset.imagem_dia || `img_${nome}`]
    const imagem_noite = lista_sprites[preset.imagem_noite || "img_transicoes_noite"]
    const manter_base_diurna = nome.startsWith("transita_cidade")
        || nome.startsWith("transita_montanha")
        || nome.startsWith("transita_ilha")

    if (espelhar_horizontal) {
        ctx.save()
        ctx.translate(x + preset.sprite.Largura, y)
        ctx.scale(-1, 1)
        x = 0
        y = 0
    }

    if (imagem_dia && imagem_dia.complete && imagem_dia.naturalWidth
        && (manter_base_diurna || opacidade_noite < 1)) {
        ctx.save()
        if (!manter_base_diurna)
            ctx.globalAlpha *= 1 - opacidade_noite
        preset.sprite.desenha(x, y)
        ctx.restore()
    }

    if (preset.sprite_noite && imagem_noite && imagem_noite.complete && imagem_noite.naturalWidth && opacidade_noite > 0) {
        if (preset.imagem_noite) {
            ctx.save()
            ctx.globalAlpha *= opacidade_noite
            preset.sprite_noite.desenha(x, y)
            ctx.restore()
        } else {
            transitador(preset.sprite_noite, x, y)
        }
    }

    if (espelhar_horizontal)
        ctx.restore()
}

var spriteCidade = new Carrega_sprite('img_cenario', 0, 0, 1366, 337),

    spriteMontanhas = new Carrega_sprite('img_cenario', 0, 340, 1366, 116),
    spriteNuvens = new Carrega_sprite('img_cenario', 0, 522, 1366, 135),
    spriteNuvens2 = new Carrega_sprite('img_cenario', 0, 680, 1366, 126),
    spriteNuvensSup = new Carrega_sprite('img_cenario', 720, 522, 500, 135),
    spriteNuvensSup2 = new Carrega_sprite('img_cenario', 0, 680, 700, 126),
    spriteChao = new Carrega_sprite('img_cenario', 0, 458, 1366, 262),

    spriteCeu = new Carrega_sprite('img_ceu', 0, 0, 1366, 570),

    spriteLava = new Carrega_sprite('img_lava', 0, 0, 1366, 68),
    spriteAgua = new Carrega_sprite('img_agua', 0, 0, 1366, 68),

    spriteSol = new Carrega_sprite('img_astros', 0, 0, 370, 369),
    spriteLua = new Carrega_sprite('img_astros', 0, 0, 280, 271),

    spriteJogador_Padrao = new Carrega_sprite('img_jogador', 0, 0, 59, 138),
    spriteJogador_Vermelho = new Carrega_sprite('img_jogador', 64, 0, 59, 138),
    spriteJogador_Branco = new Carrega_sprite('img_jogador', 128, 0, 59, 138),
    spriteJogador_Amarelo = new Carrega_sprite('img_jogador', 192, 0, 59, 138),
    spriteJogador_Azul = new Carrega_sprite('img_jogador', 256, 0, 59, 138),
    spriteJogador_Roxo = new Carrega_sprite('img_jogador', 320, 0, 59, 138),
    spriteJogador_Verde = new Carrega_sprite('img_jogador', 384, 0, 59, 138),

    spritePisao = new Carrega_sprite('img_objs', 6, 503, 65, 46),
    spritePisao2 = new Carrega_sprite('img_objs', 253, 464, 58, 30),
    spritePredio2_1 = new Carrega_sprite('img_objs', 7, 155, 46, 366),              // Vermelho
    spritePredio1_1 = new Carrega_sprite('img_objs', 60, 155, 46, 366),             // Amarelo
    spritePredio1_2 = new Carrega_sprite('img_objs', 164, 187, 46, 182),            // Vermelho com Antena
    spritePredio2_2 = new Carrega_sprite('img_objs', 113, 187, 46, 182),            // Amarelo com Antena
    spritePredio3 = new Carrega_sprite('img_objs', 6, 378, 46, 80),                 // Laranja Médio

    spritePredio2_1_background = new Carrega_sprite('img_objs', 373, 155, 46, 366), // Ciano
    spritePredio1_1_background = new Carrega_sprite('img_objs', 320, 155, 46, 366), // Azul
    spritePredio1_2_background = new Carrega_sprite('img_objs', 477, 187, 46, 182), // Ciano com Antena
    spritePredio2_2_background = new Carrega_sprite('img_objs', 426, 187, 46, 182), // Azul com Antena
    spritePredio3_background = new Carrega_sprite('img_objs', 258, 250, 46, 80),    // Azul Médio

    spriteFogo = new Carrega_sprite('img_objs', 1282, 22, 1156, 60),
    spriteArbusto = new Carrega_sprite('img_objs', 267, 536, 42, 19),
    spriteArvore = new Carrega_sprite('img_objs', 89, 501, 47, 55),
    spriteArvore2 = new Carrega_sprite('img_objs', 147, 500, 50, 55),
    spriteArvore_frutifera = new Carrega_sprite('img_objs', 204, 510, 49, 44),

    spriteDirigivel = new Carrega_sprite('img_objs', 160, 384, 151, 51),
    spriteAviao = new Carrega_sprite('img_objs', 175, 7, 137, 86),
    spriteOvni = new Carrega_sprite('img_objs', 197, 109, 110, 70),
    spritePoste1 = new Carrega_sprite('img_objs', 90, 437, 43, 56),
    spritePoste2 = new Carrega_sprite('img_objs', 160, 453, 6, 41),
    spriteFonte = new Carrega_sprite('img_objs', 186, 459, 52, 35),

    spriteSombraJogador = new Carrega_sprite('img_sombra', 230, 1, 105, 127),
    spriteSombraPredio1 = new Carrega_sprite('img_sombra', 0, 1, 78, 69),
    spriteSombraPredio_Antena = new Carrega_sprite('img_sombra', 83, 1, 70, 88),
    spriteSombraPredio2_1 = new Carrega_sprite('img_sombra', 163, 1, 63, 51),
    spriteSombraPisao = new Carrega_sprite('img_sombra', 1, 142, 62, 39),
    spriteSombraPisao2 = new Carrega_sprite('img_sombra', 143, 84, 75, 32),
    spriteSombraFonte = new Carrega_sprite('img_sombra', 73, 79, 58, 36),
    spriteSombra_Arvore = new Carrega_sprite('img_sombra', 132, 144, 48, 31),
    spriteSombra_Arvore2 = new Carrega_sprite('img_sombra', 189, 144, 50, 33),
    spriteSombra_ArvoreFrutifera = new Carrega_sprite('img_sombra', 74, 144, 56, 29),

    spriteAdereco_aco = new Carrega_sprite('img_adereco_aco', 282, 10, 46, 121),
    spriteAdereco_fogo = new Carrega_sprite('img_adereco_fogo', 0, 0, 31, 11),
    spriteAdereco_roda = new Carrega_sprite('img_adereco_roda', 0, 0, 59, 24),
    spriteAdereco_bandeira = new Carrega_sprite('img_adereco_bandeira', 0, 0, 17, 14),
    spriteAdereco_combustao = new Carrega_sprite('img_adereco_combustao', 0, 0, 62, 73),
    spriteLuzes_navegacao = new Carrega_sprite('img_luzes_navegacao', 0, 0, 133, 90),

    spriteAreia = new Carrega_sprite('img_areia', 0, 0, 1366, 46),

    spriteTransitaCidade1 = new Carrega_sprite('img_transicoes_dia', 0, 34, 1366, 253),
    spriteTransitaCidade2 = new Carrega_sprite('img_transicoes_dia', 0, 457, 1366, 235),
    spriteTransitaMontanha1 = new Carrega_sprite('img_transicoes_dia', 0, 290, 1366, 117),
    spriteTransitaMontanha2 = new Carrega_sprite('img_transicoes_dia', 0, 695, 1366, 117),
    spriteTransitaChao1 = new Carrega_sprite('img_transicoes_dia', 0, 407, 1366, 46),
    spriteTransitaChao2 = new Carrega_sprite('img_transicoes_dia', 0, 812, 1366, 46),
    spriteTransitaAreia1 = new Carrega_sprite('img_transita_areia1', 0, 0, 1366, 46),
    spriteTransitaAreia2 = new Carrega_sprite('img_transita_areia2', 0, 0, 1366, 46),

    spriteTransitaCidade1_noite = new Carrega_sprite('img_transicoes_noite', 0, 34, 1366, 253),
    spriteTransitaCidade2_noite = new Carrega_sprite('img_transicoes_noite', 0, 457, 1366, 235),
    spriteTransitaMontanha1_noite = new Carrega_sprite('img_transicoes_noite', 0, 290, 1366, 117),
    spriteTransitaMontanha2_noite = new Carrega_sprite('img_transicoes_noite', 0, 695, 1366, 117),
    spriteTransitaChao1_noite = new Carrega_sprite('img_transicoes_noite', 0, 407, 1366, 46),
    spriteTransitaChao2_noite = new Carrega_sprite('img_transicoes_noite', 0, 812, 1366, 46),
    spriteTransitaAreia1_noite = new Carrega_sprite('img_transita_areia1_noite', 0, 0, 1366, 46),
    spriteTransitaAreia2_noite = new Carrega_sprite('img_transita_areia2_noite', 0, 0, 1366, 46),
    spriteTransitaGramaAreiaDia = new Carrega_sprite('img_transita_grama_areia_dia', 0, 0, 1366, 46),
    spriteTransitaGramaAreiaNoite = new Carrega_sprite('img_transita_grama_areia_noite', 0, 0, 1366, 46)

spriteAdereco_aco.x = 329