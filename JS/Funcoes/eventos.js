// Funções para travar o botão direito do mouse no site
var mensagem = ""
function clickIE() {
    if (document.all) { (mensagem); return false; }
}

function clickNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) { (mensagem); return false; }
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS
} else {
    document.onmouseup = clickNS
    document.oncontextmenu = clickIE
}
document.oncontextmenu = new Function("return false")

function ajusta_cores(ajustadeira, funcao) {

    if (funcao == 1) { // Barra de Eventos
        switch (ajustadeira) {
            case 0:
                document.getElementById("temporizador").style.color = "#9a01c0"
                document.getElementById("barra_loading").style.animation = "brilha_bloco 1s"
                document.getElementById("completa_timer").style.backgroundColor = "rgba(154, 1, 192, .8)"
                break
            case 1:
                document.getElementById("temporizador").style.color = "Cyan"
                document.getElementById("barra_loading").style.animation = "brilha_bloco2 1s"
                document.getElementById("completa_timer").style.backgroundColor = "rgba(0, 255, 255, .8)"
                break
            case 2:
                document.getElementById("temporizador").style.color = "#14e11e"
                document.getElementById("barra_loading").style.animation = "brilha_bloco3 1s"
                document.getElementById("completa_timer").style.backgroundColor = "rgba(20, 225, 30, .8)"
                break
            case 3:
                document.getElementById("temporizador").style.color = "#ff3300"
                document.getElementById("barra_loading").style.animation = "brilha_bloco4 1s"
                document.getElementById("completa_timer").style.backgroundColor = "rgba(204, 51, 0, .8)"
                break
        }
    } else if (funcao == 2) { // Barra de Modificadores
        switch (ajustadeira) {
            case 1:
                document.getElementById("estado_mod").innerHTML = "Seg"
                document.getElementById("timer_mod").style.color = "Yellow"
                document.getElementById("estado_mod").style.color = "Yellow"
                break
            case 2:
                document.getElementById("carregando").style.display = "block"
                document.getElementById("timer_mod").style.color = "Cyan"
                document.getElementById("estado_mod").style.color = "Cyan"
                break
            case 3:
                document.getElementById("timer_mod").style.color = "Red"
                document.getElementById("estado_mod").style.color = "Red"
                break
            case 4:
                document.getElementById("qtdMods").style.color = "greenyellow"
                break
            default:
                document.getElementById("timer_mod").style.color = "White"
                document.getElementById("estado_mod").style.color = "White"
                break
        }
    } else {
        if (ajustadeira == 1)
            document.getElementById("qtdPulos").style.color = "Red"
        else
            document.getElementById("qtdPulos").style.color = "White"
    }
}

function pisca_barra() {

    document.getElementById("barra_loading").style.animation = `pisca_barra${eventos.inicia_evento} .5s`

    crono = setTimeout(() => {
        document.getElementById("barra_loading").style.animation = "none"
        clearTimeout(crono)
    }, 500)
}

function preenche_barra() {
    cronometro = setInterval(() => {
        if (eventos.contador_tempo_interno >= 0 && (jogo.status == estados.jogando || jogo.status == estados.ocioso)) {
            if (eventos.contador_tempo_interno < 10)
                document.getElementById("cronometro").innerHTML = `0${eventos.contador_tempo_interno}`
            else
                document.getElementById("cronometro").innerHTML = eventos.contador_tempo_interno

            if (eventos.contador_tempo_interno <= 3 && eventos.contador_tempo_interno != 0)
                if (eventos.contador_tempo_interno > 1 && jogo.status == estados.jogando)
                    executaSons("faixa_efeitos3", "Efeitos", "snare.ogg", 2)

            eventos.contador_tempo_interno--

            if (jogo.status == estados.jogando)
                eventos.partida_tempo_em_eventos++

            if (eventos.contador_tempo_interno == 2 && (eventos.evento == 1 || eventos.evento == 3))
                chao.libera_volta_chao = [1, 1, 1] // Alterar o chão para grama novamente
        } else {
            clearInterval(cronometro)

            if (jogo.status == estados.jogando)
                eventos.partida_eventos_concluidos++
        }
    }, 1000)

    cronometro2 = setInterval(() => {
        if (eventos.contador_tempo_interno >= 0 && (jogo.status == estados.jogando || jogo.status == estados.ocioso)) {

            if (eventos.quantia_pixels_interno < 100)
                eventos.quantia_pixels_interno += eventos.quantia_pixels
            else
                eventos.quantia_pixels_interno = 100

            if (eventos.contador_tempo_interno < eventos.contador_tempo_evento) {
                document.getElementById("completa_timer").style.width = `${eventos.quantia_pixels_interno}%`
                pisca_barra()
            }
        } else
            clearInterval(cronometro2)
    }, 50)
}