// Funções para travar o botão direito do mouse no site
var mensagem="";
function clickIE(){ 
    if(document.all){ (mensagem); return false; } 
}

function clickNS(e){
    if(document.layers || (document.getElementById && !document.all)){
        if(e.which==2 || e.which==3){ (mensagem);return false; }
    }
}

if(document.layers){
    document.captureEvents(Event.MOUSEDOWN);document.onmousedown = clickNS;
}else{
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}
document.oncontextmenu = new Function("return false")

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

function inverte_tempo(){
    if(Cenario_sprites.astro[2] == 0){
        Cenario_sprites.astro[2] = 1;
        libera_transitador = 1;
        opacidade_noite = 1;
    }else{
        Cenario_sprites.astro[2] = 0;
        libera_transitador = 0;
        opacidade_noite = 0;
    }
}

function pisca_barra(){

    document.getElementById("barra_loading").style.animation = "pisca_barra"+ jogo.inicia_evento +" .5s";
 
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

            if(jogo.contador_tempo_interno <= 3 && jogo.contador_tempo_interno != 0)
                executaSons("efeitos", "snare.ogg", 1);

            jogo.contador_tempo_interno--;

            if(jogo.contador_tempo_interno == 2 && jogo.evento == 1)
                chao.libera_volta_chao = [1, 1, 1];
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