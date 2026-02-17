var idioma = null, modificador_principal_trad = [], bonus_ativos_trad = []

function define_idioma(idioma) {

    verifica = localStorage.getItem("pul4Pr3dios-idioma") || "pt-br"

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

    sincronizaNomeConquistas()

    if (caso) return idioma

    traduz()
    loadLanguage(idioma)
}

function traduz() {

    // let pulos_trad = get_element("pulos_trad")

    if (idioma == "pt-br") {
        // pulos_trad[0].style.left = "10%"

        modificador_principal_trad = ["Modificador Principal: Flutuante", "Modificador Principal: De Aço", "Modificador Principal: Gravidade Lunar", "+ Tempo", "+ Vezes"]
        bonus_ativos_trad = ["Garimpeiro", "Vento Estocado"]

        nome_notificacoes = ["Você ganhou um <a href='#' onclick='abre_loja_especial(1)'>mod!</a>", "Você ganhou um <a href='#' onclick='abre_loja_especial(3)'>tema!</a>"]

        eventos.anuncio_evento = ["Entrando em Área Densa", "Água em Frente, Cuidado!", "Entrando no Parque", "O Chão é Lava!"]
        eventos.saida_evento = ["Saindo da Área", "Terra à Vista!", "Saindo do Parque", "Essa foi por pouco!"]

        // Textos da loja
        descricao_Mods = ["Acrescenta mais tempo ao seu modificador", "Acrescenta mais vezes de uso por partida ao seu modificador", "Modificador Principal: Te transforma numa bigorna ambulante, destruindo tudo o que vê pela frente!", "Modificador Principal: Proporciona uma gravidade diferente ao jogo, tornando a partida um tanto quanto imprevisível."]
        descricao_Bonus = ["Todos os pisões irão dar o dobro de moedas!", "Ao completar o evento de água, você ganhará umas moedas bônus!", "O Vento Estocado pode ser usado nas partidas como um empurrão para você ficar no ar por mais tempo."]
        descricao_Tema = ["Volte a uma época de prosperidades e incertezas políticas.", "O tema padrão do Pula Prédios.", "Viage até a lua!"]
    } else {

        // pulos_trad[0].style.left = "5%"

        modificador_principal_trad = ["Main Modifier: Floating", "Main modifier: Of steel", "Main Modifier: Lunar Gravity", "+ Time", "+ Turns"]
        bonus_ativos_trad = ["Gold miner", "Stocked Wind"]

        nome_notificacoes = ["You won a <a href='#' onclick='abre_loja_especial(1)'>mod!</a>"]

        eventos.anuncio_evento = ["Entering Dense Area", "River in front, be careful!", "Entering the Park", "The Floor is Lava!"]
        eventos.saida_evento = ["Leaving the Area", "Land in sight!", "Leaving the Park", "That was close!"]

        // Textos da loja
        descricao_Mods = ["Adds more time to your modifier", "Adds more usage times per match to your modifier", "Main Modifier: Turns you into a walking anvil, destroying everything you see ahead!", "Main Modifier: Provides a different gravity to the game, making the game somewhat unpredictable."]
        descricao_Bonus = ["All kicks will give you double coins!", "Upon completing the river event, you will earn some bonus coins!", "Stocked Wind can be used in matches as a boost to keep you in the air for longer time."]
        descricao_Tema = ["Return to a time of prosperity and political uncertainty.", "The default theme of Pula Prédios.", "Travel to the Moon!"]
    }
}

function toolTip_trad(categoria, alvo, loja) {

    if (!loja) {
        if (!categoria)
            toolTip(modificador_principal_trad[alvo])
        else if (categoria)
            toolTip(bonus_ativos_trad[alvo])
    } else
        if (idioma == "pt-br")
            toolTip("Abrir a loja")
        else
            toolTip("Open the store")
}