function Cenario(){

    img = new Image();
    img2 = new Image();
    img3 = new Image();
    img4 = new Image();

    if(hora >= 19 || hora < 6){
        img.src = "sprites/cenario_noite.png";
        img2.src = "sprites/agua_noite.png";
        img3.src = "sprites/objetos_noite.png";
        fundo.style.backgroundColor = "#09111c";
    }else if(hora >= 6 && hora < 9){
        img.src = "sprites/cenario_amanhecer.png";
        img2.src = "sprites/agua_amanhecer.png";
        img3.src = "sprites/objetos_amanhecer.png";
        fundo.style.backgroundColor = "#68ada4";
    }else if(hora >= 9 && hora < 16){
        img.src = "sprites/cenario_dia.png";
        img2.src = "sprites/agua_dia.png";
        img3.src = "sprites/objetos_dia.png";
    }else{
        img.src = "sprites/cenario_entardecer.png";
        img2.src = "sprites/agua_entardecer.png";
        img3.src = "sprites/objetos_entardecer.png";
        fundo.style.backgroundColor = "#c4650c";
    }

    img4.src = "sprites/sombra.png";
}

function ajusta_cores(ajustadeira, funcao){

    if(funcao == 1){
        switch (ajustadeira){
            case 0:
                document.getElementById("temporizador").style.color = "#9a01c0";
                document.getElementById("barra_loading").style.animation = "brilha_bloco 1s";
                document.getElementById("completa_timer").style.backgroundColor = "rgba(154, 1, 192, .8)"; 
            break;
            case 1:
                document.getElementById("temporizador").style.color = "Cyan";
                document.getElementById("barra_loading").style.animation = "brilha_bloco2 1s";
                document.getElementById("completa_timer").style.backgroundColor = "rgba(0, 255, 255, .8)"; 
            break;
            case 2:
                document.getElementById("temporizador").style.color = "#14e11e";
                document.getElementById("barra_loading").style.animation = "brilha_bloco3 1s";
                document.getElementById("completa_timer").style.backgroundColor = "rgba(20, 225, 30, .8)"; 
            break;
        }
    }else if(funcao == 2){
        switch (ajustadeira){
            case 1:
                document.getElementById("estado_especial").innerHTML = "Seg";
                document.getElementById("timer_especial").style.color = "Yellow";
                document.getElementById("estado_especial").style.color = "Yellow";
            break;
            case 2:
                document.getElementById("carregando").style.display = "block";
                document.getElementById("timer_especial").style.color = "Cyan";
                document.getElementById("estado_especial").style.color = "Cyan";
            break;
            case 3:
                document.getElementById("timer_especial").style.color = "Red";
                document.getElementById("estado_especial").style.color = "Red";
            break;
            default:
                document.getElementById("timer_especial").style.color = "White";
                document.getElementById("estado_especial").style.color = "White";
            break;
        }
    }else{
        if(ajustadeira == 1)
            document.getElementById("qtdPulos").style.color = "Red";
        else
            document.getElementById("qtdPulos").style.color = "White";
    }
}

function pisca_barra(){

    document.getElementById("barra_loading").style.animation = "pisca_barra"+jogo.inicia_evento+" .5s";
 
    crono = setTimeout(function(){
        document.getElementById("barra_loading").style.animation = "none";
        clearTimeout(crono);
    }, 500)
}

function preenche_barra(){
    cronometro = setInterval(function(){
        if(jogo.contador_tempo_interno >= 0 && estadoAtual == estados.jogando){
            if(jogo.contador_tempo_interno < 10)
                document.getElementById("cronometro").innerHTML = "0" + jogo.contador_tempo_interno;
            else
                document.getElementById("cronometro").innerHTML = jogo.contador_tempo_interno;

            if(jogo.contador_tempo_interno <= 3 && jogo.contador_tempo_interno != 0){
                const audio = document.getElementById("audio_alerta");
                audio.play();
            }

            jogo.contador_tempo_interno--;
        }else
            clearInterval(cronometro);
    }, 1000);

    cronometro2 = setInterval(function(){
        if(jogo.contador_tempo_interno >= 0 && estadoAtual == estados.jogando){
            jogo.quantia_pixels_interno += jogo.quantia_pixels;

            if(jogo.contador_tempo_interno < jogo.contador_tempo_evento){
                document.getElementById("completa_timer").style.width = jogo.quantia_pixels_interno +"px";
                pisca_barra();
            }
        }else
            clearInterval(cronometro2);
    }, 50);
}

function pausada_falha(){
    pause_falho++;
    document.getElementById("canvas").style.animation = "treme .1s";

    crono_p = setTimeout(function(){
        document.getElementById("canvas").style.animation = "none";
        clearTimeout(crono_p);
    }, 100)
}