function aleatorizadorInsercao(){
    var tempo = 10 + Math.round(40 * Math.random());

    return tempo;
}

function insere_propsfundo(){

    altura_media = 45;
    variacao = 40;

    if(jogo.evento == 0){       // Área Densa
        if(jogo.dificuldade != 3){
            this.altura_media = 50;
            this.variacao =  65;
        }else{
            this.altura_media = 55;
            this.variacao =  65;
        }
    }else if(jogo.evento == 2){ // Parque
        this.altura_media = 53;
        this.variacao = 3;
    }else{
        this.altura_media = 40;
        this.variacao = 75;
    }

    if(estadoAtual == estados.jogando){
        if(jogo.dificuldade != 3 && jogo.evento == null){
            this.altura_media = 40;
            this.variacao = 75;
        }else if(jogo.evento == null){
            this.altura_media = 50;
            this.variacao = 75;
        }
    }

    if(jogo.evento == 0 || jogo.evento == 2){   // Evento de Área Densa
            propsfundo._obsfundo.push({
                x: Largura,
                largura: 10,
                altura: this.altura_media + Math.round(this.variacao * Math.random()),
            });
    }else if(jogo.evento == 0 || jogo.evento == 2 || jogo.evento == null){
        propsfundo._obsfundo.push({
            x: Largura,
            largura: 46,
            altura: this.altura_media + Math.round((this.variacao - 60) * Math.random()),
        });
    }

    // Aleatorizador de inserção
    probabilidade = aleatorizadorInsercao();
    
    if(probabilidade > 0 && probabilidade < 30)
        propsfundo.tempoInsere = 30 + Math.round(20 * Math.random());
    else
        propsfundo.tempoInsere = 20 + Math.round(40 * Math.random());
}

function insere_obj(){

    altura_media = 45;
    variacao = 40;

    if(jogo.evento == 0){       // Área Densa
        if(jogo.dificuldade != 3){
            this.altura_media = 50;
            this.variacao =  65;
        }else{
            this.altura_media = 55;
            this.variacao =  65;
        }
    }else if(jogo.evento == 2){ // Parque
        this.altura_media = 53;
        this.variacao = 3;
    }else{
        this.altura_media = 40;
        this.variacao = 75;
    }

    if(estadoAtual == estados.jogando){
        if(jogo.dificuldade != 3 && jogo.evento == null){
            this.altura_media = 40;
            this.variacao = 75;
        }else if(jogo.evento == null){
            this.altura_media = 50;
            this.variacao = 75;
        }
    }
    
    if(estadoAtual == estados.jogando && (jogo.inicia_evento == 0 || jogo.inicia_evento == 2 || jogo.evento == null)){
        obstaculos._obs.push({
            x: Largura,
            largura: 46,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        });
    }else if(jogo.evento == 0 || jogo.evento == 2 || jogo.evento == null && estadoAtual != estados.tutorial){ // Diferente do Evento de Água ou lava
        obstaculos._obs.push({
            x: Largura,
            largura: 10,
            altura: this.altura_media + Math.round((this.variacao - 60) * Math.random()),
        });
    }

    // Aleatorizador de inserção
    probabilidade = aleatorizadorInsercao();
    
    if(probabilidade > 0 && probabilidade < 30)
        obstaculos.tempoInsere = 40 + Math.round(20 * Math.random());
    else
        obstaculos.tempoInsere = 10 + Math.round(40 * Math.random());

    if(estadoAtual == estados.jogando)
        obstaculos.qtdObjetos++;

//  Aumenta a Velocidade Gradualmente ( Fácil, Normal e Difícil )
    if(obstaculos.qtdObjetos % 4 == 0 && estadoAtual == estados.jogando && velocidade_obs < 30 && jogo.dificuldade != 3){
        velocidade_obs += .5;
        if(velocidade_obs == 30)
            conquista(12, 0);
    }

    // Modo Expert
    if(obstaculos.qtdObjetos % 2 == 0 && estadoAtual == estados.jogando && velocidade_obs < 35 && jogo.dificuldade == 3){
        velocidade_obs += .5;
        if(velocidade_obs == 35)
            conquista(12, 0);
    }
}

function insere_propsfrente(){

    altura_media = 45;
    variacao = 40;

    if(estadoAtual == estados.ocioso){
        if(jogo.evento == 0){       // Área Densa
            this.altura_media = 50;
            this.variacao =  65;
        }else if(jogo.evento == 2){ // Parque
            this.altura_media = 52;
            this.variacao = 7;
        }
    }else{
        if(jogo.evento == 0 || jogo.evento == 2){ // Área Densa e Parque
            this.altura_media = 50;
            this.variacao =  65;
        }else if(jogo.evento == null){
            this.altura_media = 30;
            this.variacao = 24;
        }
    }

    if(jogo.evento == 0 || jogo.evento == 2){ // Área Densa e Parque
        propsfrente._obsfrente.push({
            x: Largura,
            largura: 15,
            altura: 55,
        });
    }else if(jogo.evento == 0 || jogo.evento == 2 || jogo.evento == null){
        propsfrente._obsfrente.push({
            x: Largura,
            largura: 15,
            altura: this.altura_media + Math.round(this.variacao * Math.random()),
        });
    }

    if(jogo.evento == 0 || jogo.evento == 2){
        if(velocidade_obs < 30)
            propsfrente.tempoInsere = 30;
        else
            propsfrente.tempoInsere = 15;
    }else{
        // Aleatorizador de inserção
        probabilidade = aleatorizadorInsercao();
    
        if(probabilidade > 0 && probabilidade < 30)
            propsfrente.tempoInsere = 30 + Math.round(20 * Math.random());
        else
            propsfrente.tempoInsere = 10 + Math.round(40 * Math.random());
    }
}