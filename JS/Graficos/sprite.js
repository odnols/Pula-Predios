const lista_sprites = {}

function Carrega_sprite(alvo, x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        opcoes.ctx.drawImage(lista_sprites[alvo], this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
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
    spriteAdereco_combustao = new Carrega_sprite('img_adereco_combustao', 0, 0, 63, 73),
    spriteMascara_estrelas = new Carrega_sprite('img_mascara_estrela', 0, 0, 1366, 561),
    spriteLuzes_navegacao = new Carrega_sprite('img_luzes_navegacao', 0, 0, 133, 90),

    spriteAreia = new Carrega_sprite('img_areia', 0, 0, 1366, 46)

spriteAdereco_aco.x = 329