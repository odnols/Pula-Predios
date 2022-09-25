var anim_aco = 0, anim_fogarel = 62, anim_bandeirola = 68, anim_roda = 50, anim_combustao = 242, anim_estrela = 0, anim_luzes_naveg = 0;

function Cenario(astro){

    img_cenario = new Image();

    img_jogador = new Image();
    img_objs = new Image();
    img_sombra = new Image();

    img_ceu = new Image();
    img_agua = new Image();
    img_lava = new Image();
    img_astros = new Image();

    img_adereco_aco = new Image();
    img_adereco_fogo = new Image();
    img_adereco_roda = new Image();
    img_adereco_bandeira = new Image();
    img_adereco_combustao = new Image();
    
    img_mascara_estrela = new Image();
    img_luzes_navegacao = new Image();

    img_jogador.src = "Imagens/Sprites/Jogador/Jogador_dia.png";

    img_objs.src = "Imagens/Sprites/Cidade/Objetos_dia.png";
    img_cenario.src = "Imagens/Sprites/Cidade/cenario_dia.png";
    img_agua.src = "Imagens/Sprites/Cidade/agua_dia.png";
    img_lava.src = "Imagens/Sprites/Cidade/lava.png";
    img_ceu.src = "Imagens/Sprites/Cidade/Ceu.png";
    img_sombra.src = "Imagens/Sprites/Cidade/Sombra.png";

    // Sprites animados usados no jogador
    img_adereco_aco.src = "Imagens/Sprites/Jogador/Aderecos/aco.png";
    img_adereco_fogo.src = "Imagens/Sprites/Jogador/Aderecos/mascara_fogo.png";
    img_adereco_roda.src = "Imagens/Sprites/Jogador/Aderecos/roda.png";
    img_adereco_bandeira.src = "Imagens/Sprites/Jogador/Aderecos/bandeira.png";
    img_adereco_combustao.src = "Imagens/Sprites/Jogador/Aderecos/combustao.png";

    img_mascara_estrela.src = "Imagens/Sprites/Cidade/mascara_estrelas.png";
    img_luzes_navegacao.src = "Imagens/Sprites/Cidade/luzes_de_navegacao.png";

    // Define qual será o astro mostrado no céu ao carregar o game
    if(astro)
        img_astros.src = "Imagens/Sprites/lua.png";
    else{
        img_astros.src = "Imagens/Sprites/sol.png";
    }

    if(jogo.tema_ativo == 0)
        document.getElementById("canvas").style.filter = "grayscale(1)";
}

function transita_tempo(categoria){
    if(categoria){
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

        if(typeof tEst != "undefined")
            clearInterval(tEst)

        // Verifica se as luzes de navegação estão ativas com o avião voando
        if(typeof tLuzN == "undefined" && Cenario_sprites.objeto_voador[3] == 1)
            animaLuzesGuia(1);
        
        animaEstrelas();
    }else{ // Dia
        Cenario_sprites.astro[2] = 0;
        libera_transitador = 0;
        Cenario_sprites.opacidade_noite = 0;

        if(typeof tEst != "undefined")
            clearInterval(tEst)
    }

    animaLuzesGuia(0);
}

function iniciaAnimacao(){
    animaMoeda();
}

function voltaAnimacao(){
    animaBandeira();
    animaRoda();
    animaFogo();
}

function animaMoeda(){

    tID = setInterval( function(){
        document.getElementById("moeda_img").style.backgroundPosition = posicao +'px 0px';
        
        if( posicao > 0 ){
            posicao -= 114;
        }else{
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
        spriteAdereco_bandeira.x = anim_bandeirola;
        
        if(anim_bandeirola > 0)
            anim_bandeirola -= 17;
        else{
            anim_bandeirola = 51;
            clearInterval(tBr);
            
            setTimeout(() => {
                spriteAdereco_bandeira.x = 0;
                
                if(jogo.qualidadeGrafica != 0)
                    animaBandeira();
            }, 0);
        }
    }, 100);
}

function animaFogo(){
    tFg = setInterval(function(){
        spriteAdereco_fogo.x = anim_fogarel;
        
        if(anim_fogarel > 0)
            anim_fogarel -= 31;
        else{
            anim_fogarel = 62;
            clearInterval(tFg);
            
            setTimeout(() => {
                spriteAdereco_fogo.x = 0;

                if(jogo.qualidadeGrafica != 0)
                    animaFogo();
            }, 0);
        }
    }, 100);
}

function animaRoda(){
    tRd = setInterval(function(){
        spriteAdereco_roda.x = anim_roda;
        
        if(anim_roda = 0)
            anim_roda = 61;
        else{
            anim_roda = 0;
            clearInterval(tRd);
            
            setTimeout(() => {
                spriteAdereco_roda.x = 0;

                if(jogo.qualidadeGrafica != 0)
                    animaRoda();
            }, 0);
        }
    }, 100);
}

function AnimaModFlutuando(){
    tMf = setInterval(function(){
        spriteAdereco_combustao.x = anim_combustao;
        
        if(anim_combustao > 0)
            anim_combustao -= 60;
        else{
            anim_combustao = 180;
            clearInterval(tMf);
            
            setTimeout(() => {
                spriteAdereco_combustao.x = 0;
                AnimaModFlutuando();
            }, 0);
        }
    }, 100);
}

function enferruja(){
    tAco = setInterval(function(){
        spriteAdereco_aco.x = anim_aco;
        
        if(anim_aco < 282)
            anim_aco += 47;
        else{
            anim_aco = 282;
            clearInterval(tAco);
            
            setTimeout(() => {
                spriteAdereco_aco.x = 282;
            }, 0);
        }
    }, 80);
}

function limpa_ferrugem(){
    tAco = setInterval(function(){
        spriteAdereco_aco.x = anim_aco;
        
        if(anim_aco > 0)
            anim_aco -= 47;
        else{
            anim_aco = 0;
            clearInterval(tAco);
            
            setTimeout(() => {
                spriteAdereco_aco.x = 329;
            }, 0);
        }
    }, 80);
}

function animaEstrelas(){
    tEst = setInterval(function(){
        if(anim_estrela == 0){
            anim_estrela = 1;
            spriteMascara_estrelas.x = 1367;
        }else{
            anim_estrela = 0
            spriteMascara_estrelas.x = 0;
        }
    }, 200);
}

function animaLuzesGuia(caso){
    if(jogo.qualidadeGrafica != 0){
        if(caso){ // Verifica se é uma requisição para ativar ou desligar a animação
            tLuzN = setInterval(function(){
                if(anim_luzes_naveg < 164){
                    anim_luzes_naveg += 82;
                    spriteLuzes_navegacao.y += 82;
                }else{
                    anim_luzes_naveg = 0;
                    spriteLuzes_navegacao.y = 0;
                }
            }, 500);
        }else{
            anim_luzes_naveg = 0;

            spriteLuzes_navegacao.y = 246;

            if(typeof tLuzN != "undefined")
                clearInterval(tLuzN);
        }
    }else
        spriteLuzes_navegacao.y = 246;
}

function verifica_animacoes(condicao){

    if(typeof tBr != "undefined")
        clearInterval(tBr);

    if(typeof tFg != "undefined")
        clearInterval(tFg);

    if(typeof tRd != "undefined")
        clearInterval(tRd);

    if(typeof tLuzN != "undefined")
        clearInterval(tLuzN);

    if(condicao)
        voltaAnimacao();
}