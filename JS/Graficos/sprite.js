function Sprite_Cenario(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_cenario, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Agua(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_agua, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Lava(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_lava, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Jogador(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_jogador, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Objetos(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_objs, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Ceu(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_ceu, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Astros(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_astros, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Sprite_Sombras(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_sombra, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Adereco_Aco(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_adereco_aco, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Adereco_Fogo(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_adereco_fogo, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Adereco_Roda(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_adereco_roda, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Adereco_Bandeira(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_adereco_bandeira, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Adereco_Combustao(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_adereco_combustao, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Mascara_estrelas(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_mascara_estrela, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

function Luzes_navegacao(x, y, Largura, Altura) {
    this.x = x
    this.y = y
    this.Largura = Largura
    this.Altura = Altura

    this.desenha = function (xCanvas, yCanvas) {
        ctx.drawImage(img_luzes_navegacao, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura)
    }
}

var spriteCidade = new Sprite_Cenario(0, 0, 1366, 337),

    spriteMontanhas = new Sprite_Cenario(0, 340, 1366, 116),

    spriteNuvens = new Sprite_Cenario(0, 522, 1366, 135),

    spriteNuvens2 = new Sprite_Cenario(0, 680, 1366, 126),

    spriteNuvensSup = new Sprite_Cenario(720, 522, 500, 135),
    spriteNuvensSup2 = new Sprite_Cenario(0, 680, 700, 126),

    spriteChao = new Sprite_Cenario(0, 458, 1366, 262),

    spriteCeu = new Sprite_Ceu(0, 0, 1366, 570),

    spriteLava = new Sprite_Lava(0, 0, 1366, 68),
    spriteAgua = new Sprite_Agua(0, 0, 1366, 68),

    spriteSol = new Sprite_Astros(0, 0, 370, 369),
    spriteLua = new Sprite_Astros(0, 0, 280, 271),

    spriteJogador_Padrao = new Sprite_Jogador(0, 0, 59, 138),
    spriteJogador_Vermelho = new Sprite_Jogador(64, 0, 59, 138),
    spriteJogador_Branco = new Sprite_Jogador(128, 0, 59, 138),
    spriteJogador_Amarelo = new Sprite_Jogador(192, 0, 59, 138),
    spriteJogador_Azul = new Sprite_Jogador(256, 0, 59, 138),
    spriteJogador_Roxo = new Sprite_Jogador(320, 0, 59, 138),
    spriteJogador_Verde = new Sprite_Jogador(384, 0, 59, 138),

    spritePisao = new Sprite_Objetos(6, 503, 65, 146),
    spritePisao2 = new Sprite_Objetos(253, 464, 58, 30),
    spritePredio2_1 = new Sprite_Objetos(7, 155, 46, 366),              // Vermelho
    spritePredio1_1 = new Sprite_Objetos(60, 155, 46, 366),             // Amarelo
    spritePredio1_2 = new Sprite_Objetos(164, 187, 46, 182),            // Vermelho com Antena
    spritePredio2_2 = new Sprite_Objetos(113, 187, 46, 182),            // Amarelo com Antena
    spritePredio3 = new Sprite_Objetos(6, 378, 46, 80),                 // Laranja Médio

    spritePredio2_1_background = new Sprite_Objetos(373, 155, 46, 366), // Ciano
    spritePredio1_1_background = new Sprite_Objetos(320, 155, 46, 366), // Azul
    spritePredio1_2_background = new Sprite_Objetos(477, 187, 46, 182), // Ciano com Antena
    spritePredio2_2_background = new Sprite_Objetos(426, 187, 46, 182), // Azul com Antena
    spritePredio3_background = new Sprite_Objetos(258, 250, 46, 80),    // Azul Médio

    spriteFogo = new Sprite_Objetos(1282, 22, 1156, 60),
    spriteArbusto = new Sprite_Objetos(267, 536, 42, 19),
    spriteArvore = new Sprite_Objetos(89, 501, 47, 55),
    spriteArvore2 = new Sprite_Objetos(147, 500, 50, 55),
    spriteArvore_frutifera = new Sprite_Objetos(204, 510, 49, 44),

    spriteDirigivel = new Sprite_Objetos(160, 384, 151, 51),
    spriteAviao = new Sprite_Objetos(175, 7, 137, 86),
    spriteOvni = new Sprite_Objetos(197, 109, 110, 70),
    spritePoste1 = new Sprite_Objetos(90, 437, 43, 56),
    spritePoste2 = new Sprite_Objetos(160, 453, 6, 41),
    spriteFonte = new Sprite_Objetos(186, 459, 52, 35),

    spriteSombraJogador = new Sprite_Sombras(230, 1, 105, 127),
    spriteSombraPredio1 = new Sprite_Sombras(0, 1, 78, 69),
    spriteSombraPredio_Antena = new Sprite_Sombras(83, 1, 70, 88),
    spriteSombraPredio2_1 = new Sprite_Sombras(163, 1, 63, 51),
    spriteSombraPisao = new Sprite_Sombras(1, 142, 62, 39),
    spriteSombraPisao2 = new Sprite_Sombras(143, 84, 75, 32),
    spriteSombraFonte = new Sprite_Sombras(73, 79, 58, 36),
    spriteSombra_Arvore = new Sprite_Sombras(132, 144, 48, 31),
    spriteSombra_Arvore2 = new Sprite_Sombras(189, 144, 50, 33),
    spriteSombra_ArvoreFrutifera = new Sprite_Sombras(74, 144, 56, 29),

    spriteAdereco_aco = new Adereco_Aco(282, 10, 46, 121),
    spriteAdereco_fogo = new Adereco_Fogo(0, 0, 31, 11),
    spriteAdereco_roda = new Adereco_Roda(0, 0, 59, 24),
    spriteAdereco_bandeira = new Adereco_Bandeira(0, 0, 17, 14),
    spriteAdereco_combustao = new Adereco_Combustao(0, 0, 63, 73),
    spriteMascara_estrelas = new Mascara_estrelas(0, 0, 1366, 561),
    spriteLuzes_navegacao = new Luzes_navegacao(0, 0, 133, 90)

spriteAdereco_aco.x = 329