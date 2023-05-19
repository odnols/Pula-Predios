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
                get_element("temporizador").style.color = "#9a01c0"
                get_element("barra_loading").style.animation = "brilha_bloco 1s"
                get_element("completa_timer").style.backgroundColor = "rgba(154, 1, 192, .8)"
                break
            case 1:
                get_element("temporizador").style.color = "Cyan"
                get_element("barra_loading").style.animation = "brilha_bloco2 1s"
                get_element("completa_timer").style.backgroundColor = "rgba(0, 255, 255, .8)"
                break
            case 2:
                get_element("temporizador").style.color = "#14e11e"
                get_element("barra_loading").style.animation = "brilha_bloco3 1s"
                get_element("completa_timer").style.backgroundColor = "rgba(20, 225, 30, .8)"
                break
            case 3:
                get_element("temporizador").style.color = "#ff3300"
                get_element("barra_loading").style.animation = "brilha_bloco4 1s"
                get_element("completa_timer").style.backgroundColor = "rgba(204, 51, 0, .8)"
                break
        }
    } else if (funcao == 2) { // Barra de Modificadores
        switch (ajustadeira) {
            case 1:
                get_element("estado_mod").innerHTML = "Seg"
                get_element("timer_mod").style.color = "Yellow"
                get_element("estado_mod").style.color = "Yellow"
                break
            case 2:
                get_element("carregando").style.display = "block"
                get_element("timer_mod").style.color = "Cyan"
                get_element("estado_mod").style.color = "Cyan"
                break
            case 3:
                get_element("timer_mod").style.color = "Red"
                get_element("estado_mod").style.color = "Red"
                break
            case 4:
                get_element("qtdMods").style.color = "greenyellow"
                break
            default:
                get_element("timer_mod").style.color = "White"
                get_element("estado_mod").style.color = "White"
                break
        }
    } else {
        if (ajustadeira == 1)
            get_element("qtdPulos").style.color = "Red"
        else
            get_element("qtdPulos").style.color = "White"
    }
}

function pisca_barra() {

    get_element("barra_loading").style.animation = `pisca_barra${eventos.inicia_evento} .5s`

    crono = setTimeout(() => {
        get_element("barra_loading").style.animation = "none"
        clearTimeout(crono)
    }, 500)
}

function preenche_barra() {
    cronometro = setInterval(() => {
        if (eventos.contador_tempo_interno >= 0 && (jogo.status == estados.jogando || jogo.status == estados.ocioso)) {
            if (eventos.contador_tempo_interno < 10)
                get_element("cronometro").innerHTML = `0${eventos.contador_tempo_interno}`
            else
                get_element("cronometro").innerHTML = eventos.contador_tempo_interno

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
                get_element("completa_timer").style.width = `${eventos.quantia_pixels_interno}%`
                pisca_barra()
            }
        } else
            clearInterval(cronometro2)
    }, 50)
}