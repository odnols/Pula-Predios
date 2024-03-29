var identificadores = ["Skins", "Modificadores", "Bônus", "Temas"]
var identificadores_2 = ["Skins", "Modifiers", "Bonuses", "Themes"]
var listaPrecos_Skins = [70, 70, 70, 70, 70, 70, 70]
var listaPrecos_Mods = [50, 50, 70, 0]
var listaPrecos_Bonus = [100, 100, 30]
var listaPrecos_Temas = [200, 0]

var descricao_Mods, descricao_Bonus, descricao_Tema

function carrega_dados_loja(categoria_loja) {

    $("#sessao_loja").fadeIn()
    $("#rodape_loja").fadeIn()

    if (idioma == "pt")
        get_element("categoria_loja").innerHTML = identificadores[categoria_loja]
    else
        get_element("categoria_loja").innerHTML = identificadores_2[categoria_loja]

    carrega_vendas_loja(identificadores[categoria_loja])

    menus.categoria_anterior = identificadores[categoria_loja]
}

function carrega_vendas_loja(caso) {

    menus.sessao_loja_ativa = 1
    altera_altura_fechador()

    if (caso == "Skins") {

        if (idioma == "pt")
            var nomeSkins = ["Vermelho", "Branco", "Amarelo", "Azul", "Roxo", "Verde"]
        else
            var nomeSkins = ["Red", "White", "Yellow", "Blue", "Purple", "Green"]

        if (idioma == "pt")
            get_element("categoria_teaser").innerHTML = "Mude a sua aparência por aqui ;)"
        else
            get_element("categoria_teaser").innerHTML = "Change your appearance around here ;)"

        get_element("placeholder_loja").innerHTML = ""

        if (jogador.skin != 7)
            get_element("placeholder_loja").innerHTML += "<div class='item_comprado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='source/images/Sprites/Jogador/Jogador7_noite.png'><br><br>Padrão</div>"
        else
            get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='source/images/Sprites/Jogador/Jogador7_noite.png'><br><br>Padrão</div>"

        for (var i = 0; i < 6; i++) {
            if (jogador.skins_compradas[i] != 1) // Item a venda
                get_element("placeholder_loja").innerHTML += `<div class='item_venda' onclick='confirma_compra(1, ${i}, 55)'> <img class='img_skin_venda' src='source/images/Sprites/Jogador/Jogador${i + 1}_noite.png'><br><br>${nomeSkins[i]}<div class='preco_item'>$${listaPrecos_Skins[i]}</div></div>`
            else if (jogador.skin != [i]) // Item Comprado
                get_element("placeholder_loja").innerHTML += `<div class='item_comprado' onclick='confirma_compra(1, ${i}, 55)'><img class='img_skin_venda' src='source/images/Sprites/Jogador/Jogador${i + 1}_noite.png'><br><br>${nomeSkins[i]}</div>`
            else                         // Item Equipado
                get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onclick='confirma_compra(1, ${i}, 55)'><img class='img_skin_venda' src='source/images/Sprites/Jogador/Jogador${i + 1}_noite.png'><br><br>${nomeSkins[i]}</div>`
        }

    } else if (caso == "Modificadores") {

        if (jogador.mod_em_uso == 0)
            var nome_img = "Flutua"
        else if (jogador.mod_em_uso == 1)
            var nome_img = "Aco"
        else
            var nome_img = "Lunar"

        if (idioma == "pt")
            get_element("categoria_teaser").innerHTML = "Bota mod em tudo!"
        else
            get_element("categoria_teaser").innerHTML = "Puts mod on everything!"

        if (idioma == "pt")
            get_element("categoria_teaser").innerHTML += `<br><div id='mod_em_uso'><h3 style='float: left'>Modificador Principal</h3><h3 style='float: right'>Modificadores Adquiridos</h3><div id='barra_mods_loja'><div id='mod_esquerda_principal'>Ativo: &nbsp; <img class='icon_mod_loja' src='source/images/store/Mods/${nome_img}.png'></div><div id='mod_direita_principal'></div></div></div>`
        else
            get_element("categoria_teaser").innerHTML += `<br><div id='mod_em_uso'><h3 style='float: left'>Main Modifier</h3><h3 style='float: right'>Purchased Modifiers</h3><div id='barra_mods_loja'><div id='mod_esquerda_principal'>Active: &nbsp; <img class='icon_mod_loja' src='source/images/store/Mods/${nome_img}.png'></div> <div id='mod_direita_principal'></div></div></div>`

        get_element("mod_direita_principal").innerHTML = ""

        if (jogador.mod_em_uso != 0)
            get_element("mod_direita_principal").innerHTML += "<img id='restaura_modificador' src='source/images/store/Mods/Flutua.png' onclick='altera_modificador(0)'>"

        if (jogador.mod_em_uso == 1 && jogador.mods_comprados[3] == 1)
            get_element("mod_direita_principal").innerHTML += "<img id='restaura_modificador' src='source/images/store/Mods/Lunar.png' onclick='altera_modificador(100)'>"

        if (jogador.mod_em_uso == 100 && jogador.mods_comprados[2] == 1)
            get_element("mod_direita_principal").innerHTML += "<img id='restaura_modificador' src='source/images/store/Mods/Aco.png' onclick='altera_modificador(1)'>"

        if (jogador.mod_em_uso == 0 && jogador.mods_comprados[2] == 1)
            get_element("mod_direita_principal").innerHTML += "<img id='restaura_modificador' src='source/images/store/Mods/Aco.png' onclick='altera_modificador(1)'>"

        if (jogador.mod_em_uso == 0 && jogador.mods_comprados[3] == 1)
            get_element("mod_direita_principal").innerHTML += "<img id='restaura_modificador' src='source/images/store/Mods/Lunar.png' onclick='altera_modificador(100)'>"

        if (idioma == "pt")
            var descricao = ["+ Tempo", "+ Vezes", "De Aço"]
        else
            var descricao = ["+ Time", "+ Turns", "Of steel"]

        var nomeImagem = ["relogio.gif", "Jump_Boost.png", "Aco.png"]

        get_element("placeholder_loja").innerHTML = ""


        for (var i = 0; i < descricao.length; i++) {
            if (jogador.mods_comprados[i] == 0) { // Item a venda
                if (i != 2)
                    get_element("placeholder_loja").innerHTML += "<div class='mod_venda' onMouseOver='toolTip(" + 'descricao_Mods[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Mods/" + nomeImagem[i] + "'><br><br>" + descricao[i] + " <div class='preco_item'> $" + listaPrecos_Mods[i] + "</div> </div>"
                else
                    get_element("placeholder_loja").innerHTML += "<div class='mod_principal_venda' onMouseOver='toolTip(" + 'descricao_Mods[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Mods/" + nomeImagem[i] + "'><br><br>" + descricao[i] + " <div class='preco_item'> $" + listaPrecos_Mods[i] + "</div> </div>"
            } else {
                if (jogador.mods_comprados[i] == 1 && jogador.mod_em_uso != 1) // Item Comprado
                    if (jogador.mods_comprados[i] == 1 && i < 2)
                        get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onMouseOver='toolTip(" + 'descricao_Mods[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Mods/" + nomeImagem[i] + "'><br><br>" + descricao[i] + "</div>"
                    else
                        get_element("placeholder_loja").innerHTML += "<div class='item_comprado' onMouseOver='toolTip(" + 'descricao_Mods[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Mods/" + nomeImagem[i] + "'><br><br>" + descricao[i] + "</div>"
                else // Comprado e equipado
                    get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onMouseOver='toolTip(" + 'descricao_Mods[' + i + ']' + ")' onmouseout='toolTip()'> <img class='img_mod_venda' src='source/images/store/Mods/" + nomeImagem[i] + "'><br><br>" + descricao[i] + "</div>"
            }
        }

        if (lista_conquistas_ganhas[26] != 0) {
            if (jogador.mod_em_uso == 100)
                get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onMouseOver='toolTip(" + 'descricao_Mods[3]' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, 3, 55)'><img class='img_mod_venda' src='source/images/store/Mods/Lunar.png'><br><br>Gravidade Lunar</div>"
            else
                get_element("placeholder_loja").innerHTML += "<div class='item_comprado_lendario' onMouseOver='toolTip(" + 'descricao_Mods[3]' + ")' onmouseout='toolTip()' onclick='confirma_compra(2, 3, 55)'><img class='img_mod_venda' src='source/images/store/Mods/Lunar.png'><br><br>Gravidade Lunar</div>"
        }
    } else if (caso == "Bônus") { // Bônus
        if (idioma == "pt")
            var descricao = ["2x$", "Garimpeiro", "Vento Estocado"]
        else
            var descricao = ["2x$", "Gold miner", "Stocked Wind"]

        var nomeImagem = ["pisao2x.png", "Garimpeiro.png", "vento_estocado.png"]

        if (idioma == "pt")
            get_element("categoria_teaser").innerHTML = "Adquira Bônus!"
        else
            get_element("categoria_teaser").innerHTML = "Get Bonuses!"

        get_element("placeholder_loja").innerHTML = ""

        for (var i = 0; i < descricao.length; i++) {
            if (jogador.bonus_comprados[i] != 1) // Item a venda
                get_element("placeholder_loja").innerHTML += "<div class='mod_venda' onMouseOver='toolTip(" + 'descricao_Bonus[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(3, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Bonus/" + nomeImagem[i] + "'><br><br>" + descricao[i] + " <div class='preco_item'> $" + listaPrecos_Bonus[i] + "</div></div>"
            else // Item Comprado
                get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onMouseOver='toolTip(" + 'descricao_Bonus[' + i + ']' + ")' onmouseout='toolTip()' onclick='confirma_compra(3, " + i + ", 55)'> <img class='img_mod_venda' src='source/images/store/Bonus/" + nomeImagem[i] + "'><br><br>" + descricao[i] + "</div>"
        }
    } else {
        if (idioma == "pt")
            var descricao = ["1900's", "Padrão"]
        else
            var descricao = ["1900's", "Standard"]

        var nomeImagem = ["1900s.jpg", "Padrao.jpg"]

        if (idioma == "pt")
            get_element("categoria_teaser").innerHTML = "Viagem no tempo!"
        else
            get_element("categoria_teaser").innerHTML = "Time travel!"

        get_element("placeholder_loja").innerHTML = ""


        for (var i = 0; i < descricao.length; i++) {
            if (jogo.temas_comprados[i] != 1) { // Temas não comprados
                get_element("placeholder_loja").innerHTML += "<div class='tema_caixa' onclick='confirma_compra(4, " + i + ", 55)' onMouseOver='toolTip(" + 'descricao_Tema[' + i + ']' + ")' onmouseout='toolTip()'><img class='img_preview_tema' src='source/images/store/Temas/" + nomeImagem[i] + "'><div class='info_tema'><br><br>" + descricao[i] + " <div class='preco_tema'> $" + listaPrecos_Temas[i] + "</div></div></div>"
            } else {
                if (jogo.tema_ativo != i) { // Tema comprado e não ativo
                    get_element("placeholder_loja").innerHTML += "<div class='tema_caixa' onclick='confirma_compra(4, " + i + ", 55)' onMouseOver='toolTip(" + 'descricao_Tema[' + i + ']' + ")' onmouseout='toolTip()'><img class='img_preview_tema' src='source/images/store/Temas/" + nomeImagem[i] + "'><div class='info_tema'><br><br>" + descricao[i] + "</div></div>"
                } else {                    // Tema comprado e ativo
                    get_element("placeholder_loja").innerHTML += "<div class='tema_caixa_ativo' onclick='confirma_compra(4, " + i + ", 55)' onMouseOver='toolTip(" + 'descricao_Tema[' + i + ']' + ")' onmouseout='toolTip()'><img class='img_preview_tema' src='source/images/store/Temas/" + nomeImagem[i] + "'><div class='info_tema'><br><br>" + descricao[i] + "</div></div>"
                }
            }
        }
    }
}

function confirma_compra(categoria, item, confirmacao) {
    if (categoria == 1) { // Skins

        if (jogador.skins_compradas[item] != 1) {
            if (jogador.moedas >= listaPrecos_Skins[item]) {

                // Verifica se é uma requisição automática
                if (confirmacao == 55) {
                    menus.cache_compra = [categoria, item]
                    quadro_confirma_compra(1)
                }

                if (confirmacao == 1) {
                    jogador.skins_compradas[item] = 1
                    jogador.skin = item

                    localStorage.setItem("skinAtual", jogador.skin)
                    localStorage.setItem("skinsCompradas", jogador.skins_compradas)

                    debita_compra(listaPrecos_Skins[item], "Skins", 1)

                    if (idioma == "pt")
                        exibe_teaser("Compra confirmada, a skin foi equipada!", "yellow")
                    else
                        exibe_teaser("Confirmed purchase, the skin has been equipped!", "yellow")

                    pisca_loja("0, 255, 0, .2")

                    conquista(14, 0)
                } else if (confirmacao == 0) {
                    if (idioma == "pt")
                        exibe_teaser("Compra cancelada", "red")
                    else
                        exibe_teaser("Cancelled purchase", "red")

                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {

            if (jogador.skin != item) {
                if (idioma == "pt")
                    exibe_teaser("Skin alterada", "cyan")
                else
                    exibe_teaser("Skin changed", "cyan")

                pisca_loja("0, 255, 255, .2")
            } else {
                if (idioma == "pt")
                    exibe_teaser("Essa skin já está selecionada, sem alterações", "cyan")
                else
                    exibe_teaser("This skin is already selected, no changes", "cyan")

                pisca_loja("0, 255, 255, .2")
            }

            jogador.skin = item
            localStorage.setItem("skinAtual", jogador.skin)

            executaSons("faixa_efeitos1", "Efeitos", "skin.ogg", 2)
            carrega_vendas_loja("Skins")
        }
    } else if (categoria == 2) { // Modificadores

        if (jogador.mods_comprados[item] == 0) {
            if (jogador.moedas >= listaPrecos_Mods[item]) {

                if (item != 3)
                    if (idioma == "pt")
                        texto = "Deseja realmente comprar está melhoria? Ela será válida pelas próximas 5 partidas."
                    else
                        texto = "Do you really want to buy this improvement? It will be valid for the next 5 matches."
                else
                    if (idioma == "pt")
                        texto = "Deseja equipar esse modificador?"
                    else
                        texto = "Do you want to equip this modifier?"

                // Verifica se é uma requisição automática
                if (confirmacao == 55) {
                    menus.cache_compra = [categoria, item]
                    quadro_confirma_compra(1)
                }

                if (confirmacao == 1) {

                    // De Aço
                    if (item == 2)
                        jogador.mod_em_uso = 1

                    // Gravidade Lunar
                    if (item == 3)
                        jogador.mod_em_uso = 100

                    jogador.mods_comprados[item] = 1
                    jogador.mods_vezes_usados[item] = 5

                    localStorage.setItem("modEmUso", jogador.mod_em_uso)
                    localStorage.setItem("modsComprados", jogador.mods_comprados)
                    localStorage.setItem("modsCompradosUsados", jogador.mods_vezes_usados)

                    debita_compra(listaPrecos_Mods[item], "Modificadores", 1)

                    if (item != 3) {
                        if (idioma == "pt")
                            exibe_teaser("Compra confirmada, aproveite!", "yellow")
                        else
                            exibe_teaser("Confirmed purchase, enjoy!", "yellow")

                        pisca_loja("0, 255, 0, .2")
                    } else {
                        if (idioma == "pt")
                            exibe_teaser("Modificador equipado", "yellow")
                        else
                            exibe_teaser("Modifier equipped", "yellow")

                        pisca_loja("255, 255, 0, .2")
                    }
                    conquista(16, 0)
                } else if (confirmacao == 0) {
                    if (idioma == "pt")
                        exibe_teaser("Compra cancelada", "red")
                    else
                        exibe_teaser("Cancelled purchase", "red")

                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {
            if (jogador.mod_em_uso != item && item > 1) {

                // Verificar se o modificador é um principal
                if (item == 2)
                    jogador.mod_em_uso = 1

                if (item == 3)
                    jogador.mod_em_uso = 100

                executaSons2("faixa_efeitos2", "Efeitos", "pop.ogg", 2)

                if (idioma == "pt")
                    exibe_teaser("Modificador alterado", "cyan")
                else
                    exibe_teaser("Changed modifier", "cyan")

                pisca_loja("0, 255, 255, .2")

                localStorage.setItem("modEmUso", jogador.mod_em_uso)
            } else {
                if (idioma == "pt")
                    exibe_teaser("Você já possuí este item e ele está ativo", "cyan")
                else
                    exibe_teaser("You already own this item and it is active", "cyan")

                pisca_loja("0, 255, 255, .2")
            }
        }

        sincronizaModificadoresComprados(1)
        carrega_vendas_loja("Modificadores")
    } else if (categoria == 3) { // Bônus

        executaSons("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

        if (jogador.bonus_comprados[item] == 0) {
            if (jogador.moedas >= listaPrecos_Bonus[item]) {

                // Verifica se é uma requisição automática
                if (confirmacao == 55) {
                    menus.cache_compra = [categoria, item]
                    quadro_confirma_compra(1)
                }

                if (confirmacao == 1) {

                    jogador.bonus_comprados[item] = 1
                    jogador.bonus_vezes_usados[item] = 5

                    localStorage.setItem("bonusComprados", jogador.bonus_comprados)
                    localStorage.setItem("bonusVezesUsados", jogador.bonus_vezes_usados)

                    if (item == 2) // Vento estocado
                        executaSons2("faixa_memes1", "Memes", "dilma_vento_1.ogg", 2)

                    debita_compra(listaPrecos_Bonus[item], "Bônus", 1)

                    if (idioma == "pt")
                        exibe_teaser("Compra confirmada, aproveite!", "yellow")
                    else
                        exibe_teaser("Confirmed purchase, enjoy!", "yellow")

                    pisca_loja("0, 255, 0, .2")

                    sincroniza_bonus(1)
                } else if (confirmacao == 0) {
                    if (idioma == "pt")
                        exibe_teaser("Compra cancelada", "red")
                    else
                        exibe_teaser("Cancelled purchase", "red")

                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {
            if (idioma == "pt")
                exibe_teaser("Este bônus já está adquirido e ativo ;)", "cyan")
            else
                exibe_teaser("This bonus is already acquired and active ;)", "cyan")

            pisca_loja("0, 255, 255, .2")

            if (item == 2) // Vento estocado
                falas_dilma()
        }
    } else { // Temas

        executaSons("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

        if (jogo.temas_comprados[item] == 0) {
            if (jogador.moedas >= listaPrecos_Temas[item]) {

                // Verifica se é uma requisição automática
                if (confirmacao == 55) {
                    menus.cache_compra = [categoria, item]
                    quadro_confirma_compra(1)
                }

                if (confirmacao == 1) {

                    jogo.temas_comprados[item] = 1
                    localStorage.setItem("temasComprados", jogo.temas_comprados)
                    localStorage.setItem("temaAtivo", item)

                    debita_compra(listaPrecos_Temas[item], "Temas", 1)

                    if (idioma == "pt")
                        exibe_teaser("Compra confirmada, aproveite!", "yellow")
                    else
                        exibe_teaser("Confirmed purchase, enjoy!", "yellow")

                    pisca_loja("0, 255, 0, .2")

                    sincroniza_bonus(1)
                } else if (confirmacao == 0) {
                    if (idioma == "pt")
                        exibe_teaser("Compra cancelada", "red")
                    else
                        exibe_teaser("Cancelled purchase", "red")

                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {

            if (item != jogo.tema_ativo) {
                if (idioma == "pt")
                    exibe_teaser("Mudando o tema do jogo...", "cyan")
                else
                    exibe_teaser("Changing the theme of the game...", "cyan")

                localStorage.setItem("temaAtivo", item)
                recarrega_jogo_tema()
            } else {
                if (idioma == "pt")
                    exibe_teaser("Este tema já está adquirido e ativo ;)", "cyan")
                else
                    exibe_teaser("This theme is already acquired and active ;)", "cyan")
            }

            pisca_loja("0, 255, 255, .2")
        }
    }

    // Limpa a descrição do item à venda
    toolTip()
}

function debita_compra(valor, item, caso) {

    if (caso == 1) { // Caso seja uma compra legítima
        executaSons2("faixa_efeitos3", "Efeitos", "compra.ogg", 2)

        if (jogo.estatisticasNerds == 1)
            if (valor > 0)
                if (idioma == "pt")
                    console.log("%cCompra confirmada, retirado $" + valor + " do jogador", "color: orange")
                else
                    console.log("%cConfirmed purchase, withdrawn $" + valor + " of the player", "color: orange")
            else
                if (idioma == "pt")
                    console.log("%cItem resgatável ativado", "color: orange")
                else
                    console.log("%cRedeemable item activated", "color: orange")

        if (valor > 0)
            altera_moedas(-valor, jogador.moedas)

        jogador.moedas -= valor
        jogador.moedas_gastas += valor

        if (jogador.moedas_gastas >= 500)
            conquista(13, 0)

        get_element("moedas_gastas").innerHTML = jogador.moedas_gastas

        localStorage.setItem("moedas", jogador.moedas)
        localStorage.setItem("moedasGastas", jogador.moedas_gastas)

        registra_compra(item, 0)

        if (item != "Temas")
            carrega_vendas_loja(item)
        else // Recarrega o jogo com o tema escolhido
            recarrega_jogo_tema()

    } else { // Caso não tenha dinheiro

        if (idioma == "pt")
            exibe_teaser("Você não possuí moedas suficientes para comprar este item.", "red")
        else
            exibe_teaser("You do not have enough coins to purchase this item.", "red")

        pisca_loja("255, 0, 0, .2")

        executaSons2("faixa_memes1", "Memes", "falencia.ogg", 3)
    }

    // Limpa a descricao do item à venda
    toolTip()
}

function fechar_sessao_loja() {
    $("#sessao_loja").fadeOut()
    $("#rodape_loja").fadeOut()

    menus.sessao_loja_ativa = 0
    altera_altura_fechador()

    setTimeout(() => {
        get_element("mensagem_teaser").style.display = "none"
    }, 300)
}