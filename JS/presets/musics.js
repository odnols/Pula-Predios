const presets_musicas = {
    "main_1.ogg": { nome: "Chaka Train", artista: "Admiral James T." },
    "main_2.ogg": { nome: "Feet Down Below", artista: "Admiral James T." },
    "main_3.ogg": { nome: "Chemical Train", artista: "Admiral James T." },
    "main_4.ogg": { nome: "Swinging Priest", artista: "Admiral James T." },
    "main_5.ogg": { nome: "Big Boss", artista: "Admiral James T." },
    "main_old.ogg": { nome: "Tema antigo", artista: "Não informado" },
    "ocioso_1.ogg": { nome: "Dakota", artista: "Admiral James T." },
    "ocioso_2.ogg": { nome: "New World", artista: "Admiral James T." },
    "ocioso_3.ogg": { nome: "Trailerpark", artista: "Admiral James T." },
    "ocioso_4.ogg": { nome: "Cricket Post", artista: "Admiral James T." },
    "ocioso_5.ogg": { nome: "Low Down", artista: "Admiral James T." },
    "ocioso_old.ogg": { nome: "Ocioso antigo", artista: "Não informado" }
}

const faixas_aleatorias_musica = {
    main: Object.keys(presets_musicas).filter(faixa => /^main_\d+\.ogg$/i.test(faixa)),
    ocioso: Object.keys(presets_musicas).filter(faixa => /^ocioso_\d+\.ogg$/i.test(faixa))
}

function escolhe_musica_aleatoria(tipo, faixa_atual = null) {
    const faixas = faixas_aleatorias_musica[tipo]
    if (!faixas) return null

    const disponiveis = faixa_atual
        ? faixas.filter(faixa => faixa !== faixa_atual)
        : faixas
    const candidatas = disponiveis.length ? disponiveis : faixas
    return candidatas[Math.floor(Math.random() * candidatas.length)]
}
