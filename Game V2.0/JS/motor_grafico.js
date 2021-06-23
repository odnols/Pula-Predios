function Cenario(astro){

    img_cenario = new Image();
    img_objs = new Image();
    img_sombra = new Image();

    img_ceu = new Image();
    img_agua = new Image();
    img_astros = new Image();

    if(astro == 1)
        img_astros.src = "imagens/sprites/lua.png";
    else{
        img_astros.src = "imagens/sprites/sol.png";
    }
    
    img_objs.src = "imagens/sprites/Cidade/objetos_dia.png";
    img_cenario.src = "imagens/sprites/Cidade/cenario_dia.png";
    img_agua.src = "imagens/sprites/Cidade/agua_dia.png";
    img_ceu.src = "imagens/sprites/Cidade/ceu.png";
    img_sombra.src = "imagens/sprites/Cidade/sombra.png";
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
        if( opacidade_noite <= 0.9 )
            opacidade_noite += 0.01;
        else{  // Matando o intervalo
            clearInterval(estrelificador);
            opacidade_noite = 1.0;
        }
    }, 180);
}

function amanhecer(){
    dializador = setInterval( function(){
        if( opacidade_noite >= 0.0 )
            opacidade_noite -= 0.01;
        else{  // Matando o intervalo
            clearInterval(dializador);
            opacidade_noite = 0.0;
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

        document.getElementById(elemento).style.opacity = opacidade_noite;

        ctxi.globalAlpha = opacidade_noite;

        ctxi.fillStyle = pat;

        // Verifica se a Opacidade está correta e exibe na tela
        if(opacidade_noite >= 0.0 && opacidade_noite <= 1.0){
            ctxi.beginPath();
            ctxi.drawImage(img, posicao_x, posicao_y); 
            ctxi.fill(); 
            ctxi.closePath();
        }

        ctxi.globalAlpha = 1;

        ctxi.beginPath(); ctxi.rect( 0, 0, 0, 0 ); ctxi.fill(); ctxi.closePath();
    }
}