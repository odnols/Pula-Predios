let translations = {}, idioma

async function loadLanguage(lang) {
    const res = await fetch(`https://raw.githubusercontent.com/odnols/Pula-Predios/master/source/lang/${lang}.json`)
    translations = await res.json()
    applyTranslations()
}

function applyTranslations() {

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n
        if (translations[key]) {
            el.textContent = translations[key]
        }
    })

    sincronizaBotoesConfigs(menus.estatistica_morte)
    // As estatísticas só existem depois de carrega_dados(), que também sincroniza as conquistas
    if (typeof hist_distancia !== "undefined")
        sincronizaConquistas()

    processaConquistasPendentesTraducao()
}

function define_idioma(idioma) {

    const verifica = localStorage.getItem("pul4Pr3dios-idioma") || "pt-br"

    if (verifica != idioma) {
        localStorage.setItem("pul4Pr3dios-idioma", idioma)
        executaSons("faixa_efeitos1", "efeitos", "hat.ogg", 2)

        // Atualizando as traduções
        loadLanguage(idioma)
    }
}

function carrega_idioma(caso) {

    idioma = localStorage.getItem("pul4Pr3dios-idioma") || "pt-br"
    jogo.idioma = idioma

    if (caso) return idioma

    loadLanguage(idioma)
}

function toolTip_trad(chave) {
    toolTip(translations[chave])
}

const descricoes_configuracoes_padrao = {
    "dica.definir_tempo": "Alterna entre dia, noite e ciclo automático para o cenário do jogo.",
    "dica.animacoes": "Define a qualidade das animações. Qualidades menores melhoram o desempenho em aparelhos mais fracos.",
    "dica.chuva": "Ativa ou desativa a chuva no cenário.",
    "dica.claroes_chuva": "Ativa ou desativa os clarões de trovão durante a chuva.",
    "dica.parallax": "Ativa ou desativa o efeito de paralaxe (profundidade) do cenário ao iniciar o jogo.",
    "dica.fumaca_liquidos": "Ativa ou desativa a fumaça gerada no contato entre a lava e a água no cenário de fundo. Desativar melhora o desempenho.",
    "dica.dificuldade": "Alterna entre dificuldade fácil e difícil, mudando a velocidade e o desafio das partidas.",
    "dica.stats_morte": "Exibe ou oculta a tela de estatísticas da partida quando você morre.",
    "dica.stats_nerds": "Exibe ou oculta informações técnicas do jogo no console de depuração.",
    "dica.notics_conquistas": "Ativa ou desativa os avisos que aparecem ao desbloquear conquistas.",
    "dica.modo_ocioso": "Quando ativado, o jogo entra sozinho no modo ocioso após um período sem interação.",
    "dica.tempo_modo_ocioso": "Tempo de espera até o modo ocioso iniciar.",
    "dica.volume_musica": "Ajusta o volume das músicas.",
    "dica.volume_efeitos": "Ajusta o volume dos efeitos sonoros.",
    "dica.volume_memes": "Ajusta o volume dos sons de memes.",
    "dica.estado_som": "Ativa ou desativa todos os sons do jogo.",
    "dica.tema_principal": "Escolha a música tocada durante as partidas ou deixe o jogo escolher aleatoriamente.",
    "dica.tema_ocioso": "Escolha a música tocada no modo ocioso ou deixe o jogo escolher aleatoriamente.",
    "dica.card_musica": "Exibe ou oculta o card com o nome e o artista da música que começa a tocar.",
    "dica.card_musica_modo_ocioso": "Esvaneio: o card aparece normal, e fica um pouco transparente após 5 segundos durante a faixa toda. Temporizado: o card permanece na tela conforme o tempo abaixo.",
    "dica.duracao_card_musica": "Por quanto tempo o card da música permanece na tela.",
}

function descricao_configuracao(elemento) {
    const chave = elemento.dataset.tooltipI18n
    return translations[chave] || descricoes_configuracoes_padrao[chave]
}

document.addEventListener("mouseover", evento => {
    const alvo = evento.target.closest && evento.target.closest("[data-tooltip-i18n]")
    if (!alvo || alvo.contains(evento.relatedTarget)) return

    const texto = descricao_configuracao(alvo)
    if (texto)
        toolTip(texto, "260")
})

document.addEventListener("mouseout", evento => {
    const alvo = evento.target.closest && evento.target.closest("[data-tooltip-i18n]")
    if (!alvo || alvo.contains(evento.relatedTarget)) return

    toolTip()
})