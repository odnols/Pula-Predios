var anim_indices = [0, 0, 0, 0, 0, 0], anim_estrela = 0, anim_luzes_naveg = 0;

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

    if(jogo.tema_ativo == 0){
        document.getElementById("canvas").style.filter = "grayscale(1)";
        document.getElementById("icones_aquisicoes").style.filter = "grayscale(1)";
        document.getElementById("conquistas").style.filter = "grayscale(1)";
        document.getElementById("carrega_jogo").style.filter = "grayscale(1)";
        document.getElementById("quadro_notificacoes").style.filter = "grayscale(1)";
        document.getElementById("barra_loading").style.filter = "grayscale(1)";
        document.getElementById("temporizador").style.filter = "grayscale(1)";
        document.getElementById("moedas").style.filter = "grayscale(1)";
        document.getElementById("mod").style.filter = "grayscale(1)";
        document.getElementById("notificacoes").style.filter = "grayscale(1)";
        document.getElementById("menu_inicial").style.filter = "grayscale(1)";
    }
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
            clearTimeout(tEst)

        // Verifica se as luzes de navegação estão ativas com o avião voando
        if(typeof tLuzN == "undefined" && Cenario_sprites.objeto_voador[3] == 1 && dispositivo >= 1366)
            animaLuzesGuia(1);
        
        animaEstrelas();
    }else{ // Dia
        Cenario_sprites.astro[2] = 0;
        libera_transitador = 0;
        Cenario_sprites.opacidade_noite = 0;

        if(typeof tEst != "undefined")
            clearTimeout(tEst)
    }

    animaLuzesGuia(0);
}

function iniciaAnimacao(){
    animaMoeda();
}

function voltaAnimacao(){
    if(jogo.qualidadeGrafica != 0 && dispositivo >= 1366){
        animaBandeira();
        animaRoda();
        animaFogo();
    }
}

function animaMoeda(){
    if(jogo.qualidadeGrafica != 0 && dispositivo >= 1366){
        tID = setTimeout(function(){

            sprites = [0, 912, 798, 684, 570, 456, 342, 228, 114];
            posicao = ajusta_posicao_sprites(0, sprites);

            document.getElementById("moeda_img").style.backgroundPosition = posicao +'px 0px';
            
            if(posicao == 0){
                setTimeout(function(){
                    animaMoeda();
                }, 1000);
            }else
                animaMoeda();
        }, 100);
    }
}

function animaBandeira(){
    tBr = setTimeout(function(){
        
        sprites = [0, 51, 34, 17];
        ajusta_posicao_sprites(1, sprites);

        if(jogo.qualidadeGrafica != 0)
            animaBandeira();
    }, 100);
}

function animaFogo(){
    tFg = setTimeout(function(){
        
        sprites = [0, 31];
        ajusta_posicao_sprites(2, sprites);

        if(jogo.qualidadeGrafica != 0)
            animaFogo();
    }, 100);
}

function animaRoda(){
    tRd = setTimeout(function(){
        
        sprites = [0, 61, 122];
        ajusta_posicao_sprites(3, sprites);

        if(jogo.qualidadeGrafica != 0)
            animaRoda();
    }, 50);
}

function AnimaModFlutuando(){
    tMf = setTimeout(function(){

        sprites = [180, 120, 60, 0];
        ajusta_posicao_sprites(4, sprites);
    
        AnimaModFlutuando();
    }, 100);
}

function enferruja(){
    tAco = setTimeout(function(){

        sprites = [47, 94, 141, 188, 235, 282];
        ajusta_posicao_sprites(5, sprites);

        if(anim_indices[5] != 5)
            enferruja();
    }, 80);
}

function limpa_ferrugem(){
    tAco = setTimeout(function(){

        sprites = [282, 235, 188, 141, 94, 47, 329];
        ajusta_posicao_sprites(5, sprites);
        
        if(anim_indices[5] != 6)
            limpa_ferrugem();
    }, 80);
}

function animaEstrelas(){
    var posicoes = [0, 568];

    tEst = setTimeout(function(){
        var indice = Math.round((posicoes.length - 1) * Math.random());
        spriteMascara_estrelas.y = posicoes[indice];

        animaEstrelas();
    }, 1000);
}

function animaLuzesGuia(caso){
    if(jogo.qualidadeGrafica != 0 && dispositivo >= 1366){
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

function ajusta_posicao_sprites(elemento, array_sprites){

    lista_sprites = ["/moeda/", spriteAdereco_bandeira, spriteAdereco_fogo, spriteAdereco_roda, spriteAdereco_combustao, spriteAdereco_aco];
    indice = anim_indices[elemento];

    if(anim_indices[elemento] < array_sprites.length - 1)
        indice++;
    else
        indice = 0;

    // Salva o valor atualizado
    anim_indices[elemento] = indice;
    elemento_final = lista_sprites[elemento];

    elemento_final.x = array_sprites[indice];

    if(elemento == 0)
        return array_sprites[indice];
}

function verifica_animacoes(condicao){

    if(typeof tBr != "undefined")
        clearTimeout(tBr);

    if(typeof tFg != "undefined")
        clearTimeout(tFg);

    if(typeof tRd != "undefined")
        clearTimeout(tRd);

    if(typeof tLuzN != "undefined")
        clearInterval(tLuzN);

    if(condicao && dispositivo >= 1366)
        voltaAnimacao();
}

function showtext(el, text, local) {

    if(typeof typer != "undefined"){
        clearInterval(typer);

        if(local == 0)
            limpa = document.getElementById("texto_historia");
        else
            limpa = document.getElementById("frase_tuto_em_game");

        limpa.innerHTML = "";
    }

    if(local == 1){
        tuto = document.getElementsByClassName("avancar_tuto");
        tuto[0].style.display = "none";
    }

    var char = text.split("").reverse();
    
    var typer = setInterval(function() {
    
        if(!char.length){
            if(local == 0)
                historia(null, 1);
            else
                executa_tutorial(1, null);

            return clearInterval(typer);
        }

        var next = char.pop();
        
        el.innerHTML += next;
    }, 50);
}