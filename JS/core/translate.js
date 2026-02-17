let translations = {}

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
}