var tela_historia = 0, indice_historia = 0, indice_decisoes = 0, aguarda_confirmacao = false

function historia(texto_especial, requisicao_auto) {

    tela_historia = 1

    get_element("historia_jogo").style.display = "block"

    carrega_idioma(1)

    avancar_hist = get_element("avancar_hist")
    avancar_hist_block = get_element("avancar_hist_block")

    let textos = ["Recebendo transmissão . . .", "Olá testador!", "Parabéns, você foi selecionado para nossos testes super secretos!", "Estamos criando um veículo anormal e você ajudará a fazer parte da história!", "Tudo o que precisa fazer é pilotar! fácil não?", "Iremos começar os testes em daqui a pouco", "Esperamos por você"]

    if (idioma == "en")
        textos = ["Receiving broadcast . . .", "Hello tester!", "Congratulations, you have been selected for our super secret tests!", "We are developing a vehicle, and you will help to be part of the story!", "All you need to do is drive! it's easy not to?", "We will start testing soon", "We are waiting for you"]

    if (indice_historia > textos.length - 1) {
        $("#historia_jogo").fadeOut()
        return 0
    } else {
        avancar_hist[0].style.display = "none"

        if (indice_historia > 1 && !texto_especial)
            avancar_hist_block[0].style.display = "block"

        // Executa o efeito de escrita na tela
        let el = get_element("texto_historia")

        if (!requisicao_auto || !texto_especial)
            el.innerHTML = ""

        if (!requisicao_auto && !texto_especial)
            showtext(el, textos[indice_historia], 0)

        if (requisicao_auto) {
            if (indice_historia > 0 && indice_historia != 4) {
                avancar_hist_block[0].style.display = "none"
                $(".avancar_hist").fadeIn()
            }

            if (indice_historia == 4)
                avancar_hist_block[0].style.display = "none"

            if (aguarda_confirmacao) {
                aguarda_confirmacao = false
                setTimeout(() => {
                    indice_historia++
                    historia(null, null)
                }, 2000)
            }
            else
                if (indice_historia == 4)
                    $("#escolhas_hist").fadeIn()
        }

        if (indice_historia != 0)
            if (texto_especial == null && requisicao_auto != null)
                executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

        // Regula se será um texto especial ou não
        if (texto_especial != null)
            showtext(el, texto_especial, 0)

        setTimeout(() => {
            if (indice_historia == 0) {
                indice_historia = 1
                historia(null, null)
            }
        }, 3000)
    }
}

// Avança o indice da história
function avanca_hist() {
    indice_historia++
    historia()
}

function pular_hist() {
    indice_historia += 5
    historia()
}

function confirma_hist() {

    aguarda_confirmacao = true
    get_element("escolhas_hist").style.display = "none"

    let confirmacoes = ["Excelente!"]

    if (idioma == "en")
        confirmacoes = ["Great!"]

    historia(confirmacoes[indice_decisoes], null)
}

function nega_hist() {

    aguarda_confirmacao = true
    get_element("escolhas_hist").style.display = "none"

    let negacoes = ["Negar não é uma opção."]

    if (idioma == "en")
        negacoes = ["Denying is not an option."]

    historia(negacoes[indice_decisoes], null)
}