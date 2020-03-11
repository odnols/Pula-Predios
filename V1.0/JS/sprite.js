function Sprite(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function Sprite2(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img2, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function SpriteObjetos(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img3, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

function SpriteSombras(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img4, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

var spriteCeu = new Sprite(0, 380, 1366, 834),
spriteCidade = new Sprite(0, 0, 1366, 214),
spriteMontanhas = new Sprite(0, 217, 1366, 116),
spriteNuvens = new Sprite(0, 970, 1366, 135),
spriteNuvens2 = new Sprite(0, 1123, 1366, 126),
spriteChao = new Sprite(0, 335, 1366, 262),

spriteAgua = new Sprite2(10, 0, 1366, 68),

spriteJogador = new SpriteObjetos(18, 2, 59, 138),
spritePisao = new SpriteObjetos(6, 503, 65, 146),
spritePredio1_1 = new SpriteObjetos(7, 155, 46, 366),
spritePredio1_2 = new SpriteObjetos(60, 155, 46, 366),
spritePredio2 = new SpriteObjetos(6, 378, 46, 80),
spritePredio1_1Antena = new SpriteObjetos(113, 187, 46, 182),
spritePredio1_2Antena = new SpriteObjetos(164, 187, 46, 182),
spriteFogo = new SpriteObjetos(1282, 22, 1156, 60),
spriteArbusto = new SpriteObjetos(267, 536, 42, 19),
spriteArvore = new SpriteObjetos(89, 501, 47, 55),
spriteArvore2 = new SpriteObjetos(147, 500, 50, 55),
spriteArvore_frutifera = new SpriteObjetos(204, 510, 49, 44),
spriteSombraJogador = new SpriteSombras(230, 1, 105, 127),
spriteSombraPredio1 = new SpriteSombras(0, 1, 78, 69),
spriteSombraPredio_Antena = new SpriteSombras(83, 1, 70, 88),
spriteSombraPredio2_1 = new SpriteSombras(163, 1, 63, 51),
spriteSombraPisao = new SpriteSombras(1, 142, 62, 39),
spriteSombra_Arvore = new SpriteSombras(132, 144, 48, 31),
spriteSombra_Arvore2 = new SpriteSombras(189, 144, 50, 33),
spriteSombra_ArvoreFrutifera = new SpriteSombras(74, 144, 56, 29);