function Sprite(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

var spriteCeu = new Sprite(0, 267, 1200, 834),
spriteCidade = new Sprite(0, 0, 1200, 214),
spriteNuvens = new Sprite(0, 839, 1200, 1054),
spriteNuvens2 = new Sprite(0, 1071, 1200, 1265),
spriteChao = new Sprite(0, 218, 1200, 262),
spriteChao2 = new Sprite(0, 218, 1200, 262),
spriteJogador = new Sprite(1215, 23, 56, 141),
spriteSombraJogador = new Sprite(1279, 441, 67, 48),
spritePredio1 = new Sprite(1222, 175, 48, 366),
spritePredio2 = new Sprite(1223, 423, 46, 80),
spriteFogo = new Sprite(1282, 22, 1156, 60),
spriteArbusto = new Sprite(1290, 216, 42, 19),
spriteArvore = new Sprite(1286, 103, 47, 55),
spriteArvore2 = new Sprite(1345, 102, 50, 55),
spriteArvore_frutifera = new Sprite(1285, 166, 49, 44),
spriteSombraPredio = new Sprite(1275, 251, 78, 69),
spriteSombra_Arvore = new Sprite(1284, 365, 48, 31),
spriteSombra_Arvore2 = new Sprite(1278, 400, 50, 33),
spriteSombra_ArvoreFrutifera = new Sprite(1288, 332, 56, 29);