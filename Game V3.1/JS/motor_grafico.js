function Cenario(astro){

    img_cenario = new Image();

    img_jogador = new Image();
    img_objs = new Image();
    img_sombra = new Image();

    img_ceu = new Image();
    img_agua = new Image();
    img_lava = new Image();
    img_astros = new Image();

    if(astro == 1)
        img_astros.src = "Imagens/Sprites/lua.png";
    else{
        img_astros.src = "Imagens/Sprites/sol.png";
    }
    
    img_jogador.src = "Imagens/Sprites/Jogador/Jogador_dia.png";

    img_objs.src = "Imagens/Sprites/Cidade/Objetos_dia.png";
    img_cenario.src = "Imagens/Sprites/Cidade/cenario_dia.png";
    img_agua.src = "Imagens/Sprites/Cidade/agua_dia.png";
    img_lava.src = "Imagens/Sprites/Cidade/lava.png";
    img_ceu.src = "Imagens/Sprites/Cidade/Ceu.png";
    img_sombra.src = "Imagens/Sprites/Cidade/Sombra.png";
}

function transita_tempo(categoria){
    if(categoria == 1){
        anoitecer();
        // Liga a função de Transição
        libera_transitador = 1;
    }else{
        amanhecer();

        // Desliga a Função de Transição
        conometro_transitador = setTimeout( function(){
            libera_transitador = 0;

            clearTimeout(conometro_transitador);
        }, 20000);
    }
}

//  Função para fazer anoitecer
function anoitecer(){
    estrelificador = setInterval( function(){
        if( Cenario_sprites.opacidade_noite <= 0.99)
            Cenario_sprites.opacidade_noite += 0.01;
        else{  // Matando o intervalo
            clearInterval(estrelificador);
            Cenario_sprites.opacidade_noite = 1.0;
        }
    }, 180);
}

function amanhecer(){
    dializador = setInterval( function(){
        if( Cenario_sprites.opacidade_noite >= 0.0 )
            Cenario_sprites.opacidade_noite -= 0.01;
        else{  // Matando o intervalo
            clearInterval(dializador);
            Cenario_sprites.opacidade_noite = 0.0;
        }
    }, 180);
}

function transitador(elemento, altura, posicao_x, posicao_y){

    // Verifica se está de noite para executar a função
    if(libera_transitador == 1){

        var img = document.getElementById(elemento);
        var canvas = document.getElementById("canvas");
        var ctxi = canvas.getContext("2d");
        var pat = ctxi.createPattern(img, 'repeat');

        document.getElementById(elemento).style.opacity = Cenario_sprites.opacidade_noite;

        ctxi.globalAlpha = Cenario_sprites.opacidade_noite;

        ctxi.fillStyle = pat;

        // Verifica se a Opacidade está correta e exibe na tela
        if(Cenario_sprites.opacidade_noite >= 0.0 && Cenario_sprites.opacidade_noite <= 1.0){
            ctxi.beginPath();
            ctxi.drawImage(img, posicao_x, posicao_y); 
            ctxi.fill(); 
            ctxi.closePath();
        }

        ctxi.globalAlpha = 1;

        ctxi.beginPath(); ctxi.rect(0, 0, 0, 0); ctxi.fill(); ctxi.closePath();
    }
}

function inverte_tempo(){
    if(Cenario_sprites.astro[2] == 0){ // Noite
        Cenario_sprites.astro[2] = 1;
        libera_transitador = 1;
        Cenario_sprites.opacidade_noite = 1;
    }else{ // Dia
        Cenario_sprites.astro[2] = 0;
        libera_transitador = 0;
        Cenario_sprites.opacidade_noite = 0;
    }
}

function iniciaAnimacao(){
    animaMoeda(); 
    animaBandeira();
}

function animaMoeda(){

    tID = setInterval( function(){
        document.getElementById("moeda_img").style.backgroundPosition = posicao +'px 0px';
        
        if( posicao > 0 )
            posicao -= 114;
        else{
            posicao = 912;
            clearInterval(tID);
            
            setTimeout(function(){
                animaMoeda();
            }, 1000);
        }
    }, 100);
}

function animaBandeira(){

    tBr = setInterval(function(){
        document.getElementById("bandeira").style.backgroundPosition = bandeirola +'px 0px';
        
        if(bandeirola > 0)
            bandeirola -= 17;
        else{
            bandeirola = 68;
            clearInterval(tBr);
            
            setTimeout(function(){
                animaBandeira();
            }, 0);
        }
    }, 100);
}