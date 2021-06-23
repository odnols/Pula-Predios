function Sprite(x, y, Largura, Altura) {
    this.x = x;
    this.y = y;
    this.Largura = Largura;
    this.Altura = Altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.Largura, this.Altura, xCanvas, yCanvas, this.Largura, this.Altura);
    }
}

var bg = new Sprite(0, 533, 1142, 724),
nuvens = new Sprite(0, 0, 1141, 776),
spriteBoneco = new Sprite(1047, 0, 1087, 124),
spritePredio = new Sprite(1047, 216, 1088, 429),
spriteChao = new Sprite(0, 730, 1110, 773),
spriteFogo = new Sprite(1051, 139, 1102, 70);
