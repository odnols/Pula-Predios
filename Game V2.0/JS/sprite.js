function Sprite_Cenario(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_cenario, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite_Agua(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_agua, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite_Objetos(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_objs, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite_Ceu(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_ceu, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite_Astros(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_astros, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite_Sombras(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img_sombra, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

var spriteCidade = new Sprite_Cenario(0, 0, 1366, 337),

spriteMontanhas = new Sprite_Cenario(0, 340, 1366, 116),

spriteNuvens = new Sprite_Cenario(0, 522, 1366, 135),

spriteNuvens2 = new Sprite_Cenario(0, 680, 1366, 126),

spriteNuvensSup = new Sprite_Cenario(720, 522, 500, 135),
spriteNuvensSup2 = new Sprite_Cenario(0, 680, 700, 126),

spriteChao = new Sprite_Cenario(0, 458, 1366, 262),

spriteCeu = new Sprite_Ceu(0, 0, 1376, 570),

spriteAgua = new Sprite_Agua(10, 0, 1366, 68),

spriteSol = new Sprite_Astros(0, 0, 370, 369),
spriteLua = new Sprite_Astros(0, 0, 280, 271),

spriteJogador = new Sprite_Objetos(18, 2, 59, 138),
spritePisao = new Sprite_Objetos(6, 503, 65, 146),
spritePredio2_1 = new Sprite_Objetos(7, 155, 46, 366),              // Vermelho
spritePredio1_1 = new Sprite_Objetos(60, 155, 46, 366),             // Amarelo
spritePredio1_2 = new Sprite_Objetos(164, 187, 46, 182),            // Vermelho com Antena
spritePredio2_2 = new Sprite_Objetos(113, 187, 46, 182),            // Amarelo com Antena
spritePredio3 = new Sprite_Objetos(6, 378, 46, 80),                 // Laranja Médio

spriteFogo = new Sprite_Objetos(1282, 22, 1156, 60),
spriteArbusto = new Sprite_Objetos(267, 536, 42, 19),
spriteArvore = new Sprite_Objetos(89, 501, 47, 55),
spriteArvore2 = new Sprite_Objetos(147, 500, 50, 55),
spriteArvore_frutifera = new Sprite_Objetos(204, 510, 49, 44),
spriteAviao = new Sprite_Objetos(175, 7, 137, 86),
spriteOvni = new Sprite_Objetos(197, 109, 110, 70),

spriteSombraJogador = new Sprite_Sombras(230, 1, 105, 127),
spriteSombraPredio1 = new Sprite_Sombras(0, 1, 78, 69),
spriteSombraPredio_Antena = new Sprite_Sombras(83, 1, 70, 88),
spriteSombraPredio2_1 = new Sprite_Sombras(163, 1, 63, 51),
spriteSombraPisao = new Sprite_Sombras(1, 142, 62, 39),
spriteSombra_Arvore = new Sprite_Sombras(132, 144, 48, 31),
spriteSombra_Arvore2 = new Sprite_Sombras(189, 144, 50, 33),
spriteSombra_ArvoreFrutifera = new Sprite_Sombras(74, 144, 56, 29);