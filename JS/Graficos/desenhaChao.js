function popula_pisos(){

    // Inicia os pisos ao carregar o jogo
    for(let i = 0; i < 2; i++){
        insere_piso(chao.pisos_b, 3)
        insere_piso(chao.pisos_c, 2)
        insere_piso(chao.pisos_f, 1)
    }
}

function insere_piso(array, local) {

    const y = [chao.y + 27, chao.y + 10, chao.y - 5]

    if (eventos.evento !== 1 && eventos.evento !== 3 || (local == 2 && jogo.status == estados.ocioso)) {
        array.push({
            nome: 'chao_noite',
            type: 0,
            x: 2,
            y: y[local - 1]
        })
    }

    // Impede que lava e água aparecam no piso do jogador, no modo ocioso
    if (local == 2 && jogo.status == estados.ocioso) return

    if (eventos.evento == 1) {
        array.push({
            nome: 'agua_noite',
            type: 1,
            x: 2,
            y: y[local - 1]
        })
    }

    if (eventos.evento == 3) {
        array.push({
            nome: 'lava',
            type: 1,
            x: 2,
            y: y[local - 1]
        })
    }
}

function desenha_piso(caso) {

    const alvos = [chao.pisos_f, chao.pisos_c, chao.pisos_b]

    if (!presets[alvos[caso - 1][0]?.nome]) return

    for (let i = 0; i < alvos[caso - 1].length; i++) {

        const piso = alvos[caso - 1][i]
        const chao_alvo = presets[piso.nome]
        let desnivel = piso.nome !== 'chao_noite' ? 15 : 0 // desnível para água / lava

        if (piso.x == 2 && i == 0) // Altera a posição do piso para o primeiro indice
            piso.x = 1

        const pos_chao = [chao.xf, chao.xc, chao.xb]
        const pos_x = piso.x == 1 ? pos_chao[caso - 1] : pos_chao[caso - 1] + 1366
        chao_alvo.sprite.desenha(pos_x, piso.y + desnivel)

        if (piso.nome !== "lava")
            transitador(piso.nome, pos_x, piso.y + desnivel)
    }
}