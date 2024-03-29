var lista_conquistas, lista_descricao, lista_conquistas_ganhas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fila_conquistas = [], conquistas_secretas = [17, 18, 19, 22, 23, 24, 26, 28]

function sincronizaNomeConquistas() {
    if (idioma == "pt")
        lista_conquistas = ["Ligando os motores", "Pisando em falso", "O Chão era Lava", "Não Atropele os prédios!", "No Poder do Ódio", "Paraíso dos Pisões", "Passando o tempo", "Já vi de tudo", "Pisões pra quem te quero", "Pling!", "Prédio Santos", "Roda Fria", "Velocidade Máxima", "Comprador Compulsivo", "Mudança de Tintas", "Simulador de Pulga", "Nada é Natural", "É Um Pássaro!", "Isso era Possível?", "Baixa Gravidade", "Você tem um sério problema!", "Selva de Concreto", "Clube de milhas aéreas", "Vergonha da Profissón!", "De novo de novo!", "Capitalista Opressor", "Colhendo os Frutos", "Corredor de Maratonas", "Nadando no Dinheiro"],
            lista_descricao = ["Começou sua primeira partida!", "Perdeu uma partida se molhando na água", "Perdeu uma partida afundando na lava", "Perdeu uma partida atropelando um prédio", "Pulou 3x seguidas sem tocar no chão", "Passou por 5 parques", "Jogou por 1 hora (cumulativa durante partidas)", "Passou por todos os eventos do jogo", "Pisou em 50 pisões", "Ganhou sua primeira moeda", "Acumulou 2.500 moedas simultâneas", "Perdeu 10 vezes", "Atingiu a velocidade máxima", "Gastou mais de 500 moedas na loja", "Mudou de visual", "Pulou 1000 vezes", "Comprou um modificador", "Flutuou por mais de 500 segundos", "Perdeu uma partida no evento do parque", "Ativou um modificador de baixa gravidade", "Fez 200 pontos na dificuldade expert", "Terminou um evento de área densa, com mais de 30 segundos e na dificuldade expert", "Esgotou seu modificador aéreo numa partida", "Terminou uma partida com pontuação negativada", "Reiniciou os dados", "Ganhou 50 ou mais moedas em uma única partida", "Aproveitou seus Prêmios!", "Correu por mais de 50 km's", "Jogou com os bônus de 2x e Garimpo ativos ao mesmo tempo"]
    else
        lista_conquistas = ["Starting the engines", "False step", "The floor was Lava", "Don't run over buildings!", "In the Power of Hate", "Paradise of kicks", "Passing the time", "I saw everything", "Kicks for whoever wants", "Pling!", "Santos Building", "Cold Wheel", "Maximum speed", "Compulsive buyer", "Paint Change", "Flea Simulator", "Nothing is Natural", "It is a bird!", "That was possible?", "Low Severity", "You have a serious problem!", "Concrete jungle", "Air miles club", "Shame of the Profession!", "Again again!", "Oppressive Capitalist", "Harvesting the Fruits", "Marathon Runner", "Swimming in the Money"],
            lista_descricao = ["Your first match started!", "Lost a game by falling into the water", "Missed a match sinking in the lava", "Lost a match by running over a building", "Jumped 3x in a row without touching the ground", "Passed through 5 parks", "Played for 1 hour (cumulative during matches)", "Went through all the events in the game", "Gave 50 kicks", "Won his first coin", "Accumulated 2,500 simultaneous coins", "Lost 10 times", "Reached maximum speed", "Spent more than 500 coins in the store", "Altered appearance", "Jumped 1000 times", "Purchased a modifier", "Floated for more than 500 seconds", "Lost a game at the park event", "Activated a low gravity modifier", "Scored 200 points on expert difficulty", "Finished a dense area event, with more than 30 seconds and on expert difficulty", "Used all of his fluctuation modifier in one match", "Finished a game with a negative score", "Erased your data", "Won 50 or more coins in a single match", "Enjoy your prizes!", "Run for more than50 km's", "Played with 2x and Gold Mining bonuses active at the same time"]
}

function conquista(conquista, modo) {
    let tempo_conquista = 3000

    if (lista_conquistas_ganhas[conquista] == 0 || modo == 1) {
        lista_conquistas_ganhas[conquista] = 1

        if (jogo.estatisticasNerds)
            if (idioma == "pt")
                console.log("Conquista Solicitada")
            else
                console.log("Achievement Requested")

        // Remove a primeira posição do array
        if (modo)
            fila_conquistas.shift()

        // Trava a animação da conquista
        if (menus.estado_conquista != 1 && lista_conquistas_ganhas[conquista] < 2) {

            // Colhendo os frutos
            if (conquista == 26) {
                notificacao(0, 0)
                mostra_moedas(Math.round(25 * Math.random()))
            }

            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("Processando conquista: " + lista_conquistas[conquista])
                else
                    console.log("Processing achievement: " + lista_conquistas[conquista])

            lista_conquistas_ganhas[conquista] = 2

            // Verifica se a notificação das conquistas está ativa para exibir-las
            if (jogo.notificaConquista) {

                menus.estado_conquista = 1
                get_element("nome_conquista").innerHTML = lista_conquistas[conquista]

                // Atualizando o nome da conquista para exibição
                get_element("conquistas").style.display = "block"
                get_element("conquistas").style.animation = "conquista_obtida 2s"
                get_element("texto_conquista").style.display = "block"

                // Verifica se a conquista é secreta ou não
                if (conquistas_secretas.includes(conquista)) {
                    if (idioma == "pt")
                        get_element("tipo_conquista").innerHTML = "Conquista Secreta!"
                    else
                        get_element("tipo_conquista").innerHTML = "Secret achievement!"

                    executaSons("faixa_conquistas", "Efeitos", "conquista_secreta.ogg", 2)
                    tempo_conquista = 9000
                } else {
                    if (idioma == "pt")
                        get_element("tipo_conquista").innerHTML = "Conquista Obtida!"
                    else
                        get_element("tipo_conquista").innerHTML = "Achievement Achieved!"

                    executaSons("faixa_conquistas", "Efeitos", "conquista.ogg", 2)
                }

                fecha_conquista = setTimeout(() => {
                    get_element("conquistas").style.animation = "fecha_conquista 2s"
                    get_element("texto_conquista").style.animation = "esconde_texto 1s"

                    setTimeout(() => {
                        get_element("texto_conquista").style.display = "none"
                    }, 1000)

                    setTimeout(() => {
                        get_element("conquistas").style.display = "none"
                    }, 1900)

                    clearTimeout(fecha_conquista)
                }, tempo_conquista)

                // Libera para a próxima chamada
                solta_conquista = setTimeout(() => {
                    menus.estado_conquista = 0
                    clearTimeout(solta_conquista)
                }, tempo_conquista + 2000)

                get_element("conquistas").style.animation = ""
                get_element("texto_conquista").style.animation = ""
            }

            sincronizaQuadroConquistas()

            // Verifica se a lista de conquistas esgotou, e termina o intervalo de requisição
            if (fila_conquistas.length == 0 && modo)
                if (typeof puxa_proxima != 'undefined')
                    clearInterval(puxa_proxima)
        } else {
            if (fila_conquistas.length > 0)
                clearInterval(puxa_proxima)

            if (jogo.estatisticasNerds)
                if (idioma == "pt")
                    console.log("Conquista: " + lista_conquistas[conquista] + " adicionada a fila")
                else
                    console.log("Achievement: " + lista_conquistas[conquista] + " added to queue")

            fila_conquistas.push(conquista)

            puxa_proxima = setInterval(() => {
                if (menus.estado_conquista == 0)
                    redireciona_conquista(fila_conquistas[0])
            }, 1000)
        }

        // Salvando no banco a lista de conquistas ganhas
        localStorage.setItem("lista_conquistas_ganhas", lista_conquistas_ganhas)
    }

    sincronizaEstatisticasConquistas()
}

function redireciona_conquista(valor) {

    if (fila_conquistas.length == 0)
        clearInterval(puxa_proxima)

    conquista(valor, 1)
}

function sincronizaQuadroConquistas() {

    sincronizaEstatisticasConquistas()

    get_element("placeholder_conquista").innerHTML = ""

    for (let i = 0; i < lista_conquistas.length; i++) {
        if (lista_conquistas_ganhas[i] == 0) {
            if (conquistas_secretas.includes(i))
                get_element("placeholder_conquista").innerHTML += "<img class='img_conquista' src='source/images/achievements/secreta.jpg'>"
            else
                get_element("placeholder_conquista").innerHTML += "<img  onMouseOver='troca_descricao(" + 'lista_conquistas[' + i + ']' + "," + 'lista_descricao[' + i + ']' + ", 1)' onmouseout='troca_descricao(0, 0, 0)' class='img_conquista' src='source/images/achievements/" + i + ".jpg'></div>"
        } else
            get_element("placeholder_conquista").innerHTML += "<img onMouseOver='troca_descricao(" + 'lista_conquistas[' + i + ']' + "," + 'lista_descricao[' + i + ']' + ", 1)' onmouseout='troca_descricao(0, 0, 0)' class='img_conquista_obtida' src='source/images/achievements/" + i + ".jpg'>"
    }
}

function sincronizaEstatisticasConquistas() {

    let obtidas = 0

    for (let x = 0; x < lista_conquistas.length; x++) {
        if (lista_conquistas_ganhas[x] || lista_conquistas_ganhas[x] == 2)
            obtidas++
    }

    jogador.conquistas = obtidas
    jogador.consquistas_total = lista_conquistas.length

    get_element("conquistas_obtidas").innerHTML = `${obtidas}/${lista_conquistas.length}`

}
function sincronizaConquistas() {

    sincronizaQuadroConquistas()

    // Corredor de Maratonas
    if (hist_distancia >= 50000)
        conquista(27, 0)

    // Capitalista Opressor
    if (jogador.partida_moedas_coletadas >= 50)
        conquista(25, 0)

    // Roda Fria
    if (hist_mortes >= 10)
        conquista(11, 0)

    // Pisões pra quem te quero
    if (hist_pisoes >= 50)
        conquista(8, 0)

    // Já Vi de Tudo
    if (hist_parque > 0 && hist_lava > 0 && hist_agua > 0 && hist_cidade > 0)
        conquista(7, 0)

    // Passando o tempo
    if (hist_tempo_jogado >= 3600)
        conquista(6, 0)

    // Paraíso dos Pisões
    if (hist_parque >= 5)
        conquista(5, 0)

    // Prédio Santos
    if (moedas >= 2500)
        conquista(10, 0)

    // Colhendo os Frutos
    if (lista_conquistas_ganhas[13] && lista_conquistas_ganhas[8]) {
        conquista(26, 0)
    }
}