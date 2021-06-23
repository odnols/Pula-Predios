function Sprite(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

var predios = new Sprite(0, 533, 1044, 700),
nuvens = new Sprite(0, 0, 1044, 776),
spriteBoneco = new Sprite(1048, 8, 48, 138),
spritePredio1 = new Sprite(1048, 149, 48, 366),
spritePredio2 = new Sprite(1048, 428, 60, 636),
spriteChao = new Sprite(0, 730, 1110, 773),
spriteFogo = new Sprite(1109, 22, 1156, 60),
spriteArbusto = new Sprite(1062, 381, 1166, 424),
spriteArvore = new Sprite(1111, 103, 1162, 158),
spriteArvore_frutifera = new Sprite(1105, 170, 1162, 210),
spriteSombraPredio = new Sprite(1101, 222, 67, 80),
spriteSombra_Arvore = new Sprite(1111, 344, 40, 35),
spriteSombra_ArvoreFrutifera = new Sprite(1111, 307, 35, 35);