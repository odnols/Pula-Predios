function insere_obs(){

    altura_media = 45;
    variacao = 40;

    if(jogo.evento == 0){       // Cidade
        this.altura_media = 50;
        this.variacao =  65;
    }else if(jogo.evento == 2){ // Parque
        this.altura_media = 52
        this.variacao = 7;
    }else{
        this.altura_media = 40;
        this.variacao = 75;
    }

    if(estadoAtual == estados.jogando && jogo.inicia_evento != 1){
        obstaculos._obs.push({
            x: Largura,
            largura: 46,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        });
    }else if(jogo.evento != 1){
        obstaculos._obs.push({
            x: Largura,
            largura: 10,
            altura: Math.round(54 * Math.random()),
        });
    }

    if(jogo.evento == 0){
            obstaculos._obsfundo.push({
                x: Largura,
                largura: 10,
                altura: this.altura_media + Math.round(this.variacao * Math.random()),
            });
    }else if(jogo.evento != 1){
        obstaculos._obsfundo.push({
            x: Largura,
            largura: 46,
            altura: this.altura_media + Math.round(4 * Math.random()),
        });
    }

    if(jogo.inicia_evento != 1){
        obstaculos._obsfrente.push({
            x: Largura,
            largura: 10,
            altura: Math.round(54 * Math.random()),
        });
    }

    // Aleatorizador de Objetos
    probabilidade = 10 + Math.round(40 * Math.random());

    if(probabilidade > 0 && probabilidade < 30)
        obstaculos.tempoInsere = 30 + Math.round(15 * Math.random());
    else
        obstaculos.tempoInsere = 30 + Math.round(25 * Math.random());

    if(estadoAtual == estados.jogando)
        obstaculos.qtdObjetos++;

//  Aumenta a Velocidade Gradualmente
    if(obstaculos.qtdObjetos % 6 == 0 && estadoAtual == estados.jogando)
        velocidade_obs++;
}