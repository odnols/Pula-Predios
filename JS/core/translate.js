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
    sincronizaQuadroConquistas()
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