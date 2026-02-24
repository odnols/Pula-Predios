const identificadores = ["Skins", "Modificadores", "Bonus", "Temas"]
const listaPrecos_Skins = [70, 70, 70, 70, 70, 70, 70]
const listaPrecos_Mods = [50, 50, 70, 0]
const listaPrecos_Bonus = [100, 100, 30]
const listaPrecos_Temas = [200, 0, 0]

function carrega_dados_loja(categoria_loja) {

    $("#sessao_loja").fadeIn()
    $("#rodape_loja").fadeIn()

    get_element("categoria_loja").innerHTML = translations[`loja.${(identificadores[categoria_loja]).toLowerCase()}`]
    carrega_vendas_loja(identificadores[categoria_loja])

    menus.categoria_anterior = identificadores[categoria_loja]
}

function carrega_vendas_loja(caso) {

    menus.sessao_loja_ativa = 1
    altera_altura_fechador()

    const id_mod = ["mais_tempo", "mais_vezes", "de_aco", "lunar"]

    if (caso == "Skins") {

        const id_cores = ["vermelho", "branco", "amarelo", "azul", "roxo", "verde"]

        get_element("categoria_teaser").innerHTML = translations["loja.mude_aparencia"]
        get_element("placeholder_loja").innerHTML = ""

        if (jogador.skin != 7)
            get_element("placeholder_loja").innerHTML += "<div class='item_comprado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='source/images/sprites/jogador/jogador7_noite.png'><br><br>Padrão</div>"
        else
            get_element("placeholder_loja").innerHTML += "<div class='item_equipado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='source/images/sprites/jogador/jogador7_noite.png'><br><br>Padrão</div>"

        for (let i = 0; i < 6; i++) {
            if (jogador.skins_compradas[i] != 1) // Item a venda
                get_element("placeholder_loja").innerHTML += `<div class='item_venda' onclick='confirma_compra(1, ${i}, 55)'> <img class='img_skin_venda' src='source/images/sprites/jogador/jogador${i + 1}_noite.png'><br><br>${translations[`cor.${id_cores[i]}`]}<div class='preco_item'>$${listaPrecos_Skins[i]}</div></div>`
            else if (jogador.skin != [i])        // Item Comprado
                get_element("placeholder_loja").innerHTML += `<div class='item_comprado' onclick='confirma_compra(1, ${i}, 55)'><img class='img_skin_venda' src='source/images/sprites/jogador/jogador${i + 1}_noite.png'><br><br>${translations[`cor.${id_cores[i]}`]}</div>`
            else                                 // Item Equipado
                get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onclick='confirma_compra(1, ${i}, 55)'><img class='img_skin_venda' src='source/images/sprites/jogador/jogador${i + 1}_noite.png'><br><br>${translations[`cor.${id_cores[i]}`]}</div>`
        }

    } else if (caso == "Modificadores") {

        let nome_img = "lunar"

        if (jogador.mod_em_uso == 0) nome_img = "flutua"
        else if (jogador.mod_em_uso == 1) nome_img = "aco"

        const nome_mod = nome_img == "aco" ? "de_aco" : nome_img

        get_element("categoria_teaser").innerHTML = translations["loja.coloque_mod"]
        get_element("categoria_teaser").innerHTML += `<br><div id='mod_em_uso'><h3 style='float: left'>${translations["loja.mod_principal"]}</h3><h3 style='float: right'>${translations["loja.mods_comprados"]}</h3><div id='barra_mods_loja'><div id='mod_esquerda_principal'>${translations["loja.ativo"]} &nbsp; <img class='icon_mod_loja' onMouseOver="toolTip('${translations[`mod.${nome_mod}`]}')" onmouseout="toolTip()" src='source/images/store/mods/${nome_img}.png'></div><div id='mod_direita_principal'></div></div></div>`

        get_element("mod_direita_principal").innerHTML = ""

        if (jogador.mod_em_uso != 0)
            get_element("mod_direita_principal").innerHTML += `<img class='restaura_modificador' onMouseOver="toolTip('${translations['mod.flutua']}')" onmouseout="toolTip()" src='source/images/store/mods/flutua.png' onclick='altera_modificador(0)'>`

        if (jogador.mod_em_uso == 1 && jogador.mods_comprados[3] == 1)
            get_element("mod_direita_principal").innerHTML += `<img class='restaura_modificador' onMouseOver="toolTip('${translations['mod.lunar']}')" onmouseout="toolTip()" src='source/images/store/mods/lunar.png' onclick='altera_modificador(100)'>`

        if (jogador.mod_em_uso == 100 && jogador.mods_comprados[2] == 1)
            get_element("mod_direita_principal").innerHTML += `<img class='restaura_modificador' onMouseOver="toolTip('${translations['mod.de_aco']}')" onmouseout="toolTip()" src='source/images/store/mods/aco.png' onclick='altera_modificador(1)'>`

        if (jogador.mod_em_uso == 0 && jogador.mods_comprados[2] == 1)
            get_element("mod_direita_principal").innerHTML += `<img class='restaura_modificador' onMouseOver="toolTip('${translations['mod.de_aco']}')" onmouseout="toolTip()" src='source/images/store/mods/aco.png' onclick='altera_modificador(1)'>`

        if (jogador.mod_em_uso == 0 && jogador.mods_comprados[3] == 1)
            get_element("mod_direita_principal").innerHTML += `<img class='restaura_modificador' onMouseOver="toolTip('${translations['mod.lunar']}')" onmouseout="toolTip()" src='source/images/store/mods/lunar.png' onclick='altera_modificador(100)'>`

        const descricao = ["mod.mais_tempo", "mod.mais_vezes", "mod.de_aco"]
        const nomeImagem = ["relogio.gif", "jump_boost.png", "aco.png"]

        get_element("placeholder_loja").innerHTML = ""

        for (let i = 0; i < descricao.length; i++) {
            if (jogador.mods_comprados[i] == 0) { // Item a venda
                if (i != 2)
                    get_element("placeholder_loja").innerHTML += `<div class="mod_venda" onMouseOver="toolTip('${translations[`descricao.mod_${id_mod[i]}`]}')" onmouseout="toolTip()" onclick="confirma_compra(2, ${i}, 55)"> <img class="img_mod_venda" src="source/images/store/mods/${nomeImagem[i]}"><br><br>${translations[descricao[i]]}<div class="preco_item"> $${listaPrecos_Mods[i]}</div></div>`
                else
                    get_element("placeholder_loja").innerHTML += `<div class="mod_principal_venda" onMouseOver="toolTip('${translations[`descricao.mod_${id_mod[i]}`]}')" onmouseout="toolTip()" onclick="confirma_compra(2, ${i}, 55)"> <img class="img_mod_venda" src="source/images/store/mods/${nomeImagem[i]}"><br><br>${translations[descricao[i]]} <div class='preco_item'> $${listaPrecos_Mods[i]}</div></div>`
            } else {
                if (jogador.mods_comprados[i] == 1 && jogador.mod_em_uso != 1) // Item Comprado
                    if (jogador.mods_comprados[i] == 1 && i < 2)
                        get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onMouseOver="toolTip('${translations[`descricao.mod_${id_mod[i]}`]}')" onmouseout='toolTip()' onclick='confirma_compra(2, ${i}, 55)'> <img class='img_mod_venda' src="source/images/store/mods/${nomeImagem[i]}"><br><br>${translations[descricao[i]]}</div>`
                    else
                        get_element("placeholder_loja").innerHTML += `<div class='item_comprado' onMouseOver="toolTip('${translations[`descricao.mod_${id_mod[i]}`]}')" onmouseout='toolTip()' onclick='confirma_compra(2, ${i}, 55)'> <img class='img_mod_venda' src="source/images/store/mods/${nomeImagem[i]}"><br><br>${translations[descricao[i]]}</div>`
                else // Comprado e equipado
                    get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onMouseOver="toolTip('${translations[`descricao.mod_${id_mod[i]}`]}')" onmouseout='toolTip()'> <img class='img_mod_venda' src="source/images/store/mods/${nomeImagem[i]}"><br><br>${translations[descricao[i]]}</div>`
            }
        }

        if (lista_conquistas_ganhas["baixa_gravidade"]) {
            if (jogador.mod_em_uso == 100)
                get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onMouseOver="toolTip('${translations[`descricao.mod_lunar`]}')" onmouseout='toolTip()' onclick='confirma_compra(2, 3, 55)'><img class='img_mod_venda' src='source/images/store/mods/lunar.png'><br><br>${translations["mod.lunar"]}</div>`
            else
                get_element("placeholder_loja").innerHTML += `<div class='item_comprado_lendario' onMouseOver="toolTip('${translations[`descricao.mod_lunar`]}')" onmouseout='toolTip()' onclick='confirma_compra(2, 3, 55)'><img class='img_mod_venda' src='source/images/store/mods/lunar.png'><br><br>${translations["mod.lunar"]}</div>`
        }
    } else if (caso == "Bonus") { // Bônus

        const nomeImagem = ["pisao2x.png", "garimpeiro.png", "vento_estocado.png"]
        const id_bonus = ["dobro", "garimpeiro", "vento_estocado"]

        get_element("categoria_teaser").innerHTML = translations["loja.adquira_bonus"]
        get_element("placeholder_loja").innerHTML = ""

        for (let i = 0; i < id_bonus.length; i++) {
            if (jogador.bonus_comprados[i] != 1) // Item a venda
                get_element("placeholder_loja").innerHTML += `<div class='mod_venda' onMouseOver="toolTip('${translations[`descricao.bonus_${id_bonus[i]}`]}')" onmouseout='toolTip()' onclick='confirma_compra(3, ${i}, 55)'> <img class='img_mod_venda' src="source/images/store/bonus/${nomeImagem[i]}"><br><br> ${translations[`bonus.${id_bonus[i]}`]} <div class='preco_item'> $${listaPrecos_Bonus[i]}</div></div>`
            else // Item Comprado
                get_element("placeholder_loja").innerHTML += `<div class='item_equipado' onMouseOver="toolTip('${translations[`descricao.bonus_${id_bonus[i]}`]}')" onmouseout='toolTip()' onclick='confirma_compra(3, ${i}, 55)'> <img class='img_mod_venda' src="source/images/store/bonus/${nomeImagem[i]}"><br><br> ${translations[`bonus.${id_bonus[i]}`]}</div>`
        }
    } else {

        const descricao = ["temas.antigo", "temas.padrao"]
        const nomeImagem = ["1900s.jpg", "padrao.jpg", "lua.png"]
        const id_tema = ["1900s", "padrao", "lua"]

        // Adicionando o tema de lua a lista como recompensa
        if (lista_conquistas_ganhas["baixa_gravidade"])
            descricao.push("temas.lua")

        get_element("categoria_teaser").innerHTML = translations["loja.viagem_tempo"]
        get_element("placeholder_loja").innerHTML = ""

        for (let i = 0; i < descricao.length; i++) {
            if (jogo.temas_comprados[i] != 1 && listaPrecos_Temas[i] !== 0) // Temas não comprados
                get_element("placeholder_loja").innerHTML += `<div class='tema_caixa' onclick='confirma_compra(4, ${i}, 55)' onMouseOver="toolTip('${translations[`descricao.tema_${id_tema[i]}`]}')" onmouseout='toolTip()'><img class='img_preview_tema' src="source/images/store/temas/${nomeImagem[i]}"><div class='info_tema'><br><br> ${translations[descricao[i]]}<div class='preco_tema'> $${listaPrecos_Temas[i]}</div></div></div>`
            else {
                if (jogo.tema_ativo != i)     // Tema comprado e não ativo
                    get_element("placeholder_loja").innerHTML += `<div class='tema_caixa' onclick='confirma_compra(4, ${i}, 55)' onMouseOver="toolTip('${translations[`descricao.tema_${id_tema[i]}`]}')" onmouseout='toolTip()'><img class='img_preview_tema' src="source/images/store/temas/${nomeImagem[i]}"><div class='info_tema'><br><br>${translations[descricao[i]]}</div></div>`
                else                          // Tema comprado e ativo
                    get_element("placeholder_loja").innerHTML += `<div class='tema_caixa_ativo' onclick='confirma_compra(4, ${i}, 55)' onMouseOver="toolTip('${translations[`descricao.tema_${id_tema[i]}`]}')" onmouseout='toolTip()'><img class='img_preview_tema' src="source/images/store/temas/${nomeImagem[i]}"><div class='info_tema'><br><br>${translations[descricao[i]]}</div></div>`
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

                    localStorage.setItem("pul4Pr3dios-skinAtual", jogador.skin)
                    localStorage.setItem("pul4Pr3dios-skinsCompradas", jogador.skins_compradas)

                    debita_compra(listaPrecos_Skins[item], "Skins", 1)

                    exibe_teaser(translations["loja.compra_skin"], "yellow")
                    pisca_loja("0, 255, 0, .2")

                    conquista("mudanca_tintas", 0) // Mudança de Tintas
                } else if (confirmacao == 0) {

                    exibe_teaser(translations["loja.compra_cancelada"], "red")
                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {

            if (jogador.skin != item) {
                exibe_teaser(translations["skin.alterada"], "cyan")
                pisca_loja("0, 255, 255, .2")
            } else {
                exibe_teaser(translations["skin.ja_selecionada"], "cyan")
                pisca_loja("0, 255, 255, .2")
            }

            jogador.skin = item
            localStorage.setItem("pul4Pr3dios-skinAtual", jogador.skin)

            executaSons("faixa_efeitos1", "efeitos", "skin.ogg", 2)
            carrega_vendas_loja("Skins")
        }
    } else if (categoria == 2) { // Modificadores

        if (jogador.mods_comprados[item] == 0) {
            if (jogador.moedas >= listaPrecos_Mods[item]) {

                if (item != 3) texto = translations["loja.confirmar_compra_mod"]
                else texto = translations["loja.equipar_mod"]

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

                    localStorage.setItem("pul4Pr3dios-modEmUso", jogador.mod_em_uso)
                    localStorage.setItem("pul4Pr3dios-modsComprados", jogador.mods_comprados)
                    localStorage.setItem("pul4Pr3dios-modsCompradosUsados", jogador.mods_vezes_usados)

                    debita_compra(listaPrecos_Mods[item], "Modificadores", 1)

                    if (item != 3) {
                        exibe_teaser(translations["loja.compra_confirmada"], "yellow")
                        pisca_loja("0, 255, 0, .2")
                    } else {
                        exibe_teaser(translations["loja.mod_equipado"], "yellow")
                        pisca_loja("255, 255, 0, .2")
                    }

                    conquista("mods", 0) // Nada é Natural
                } else if (confirmacao == 0) {
                    exibe_teaser(translations["loja.compra_cancelada"], "red")
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

                executaSons2("faixa_efeitos2", "efeitos", "pop.ogg", 2)

                exibe_teaser(translations["loja.mod_alterado"], "cyan")
                pisca_loja("0, 255, 255, .2")

                localStorage.setItem("pul4Pr3dios-modEmUso", jogador.mod_em_uso)
            } else {
                exibe_teaser(translations["loja.item_ja_adquirido"], "cyan")
                pisca_loja("0, 255, 255, .2")
            }
        }

        sincronizaModificadoresComprados(1)
        carrega_vendas_loja("Modificadores")
    } else if (categoria == 3) { // Bônus

        executaSons("faixa_efeitos1", "efeitos", "hat.ogg", 2)

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

                    localStorage.setItem("pul4Pr3dios-bonusComprados", jogador.bonus_comprados)
                    localStorage.setItem("pul4Pr3dios-bonusVezesUsados", jogador.bonus_vezes_usados)

                    if (item == 2) // Vento estocado
                        executaSons2("faixa_memes1", "memes", "dilma_vento_1.ogg", 2)

                    debita_compra(listaPrecos_Bonus[item], "Bonus", 1)

                    exibe_teaser(translations["loja.compra_confirmada"], "yellow")
                    pisca_loja("0, 255, 0, .2")

                    sincroniza_bonus(1)
                } else if (confirmacao == 0) {
                    exibe_teaser(translations["loja.compra_cancelada"], "red")
                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {
            exibe_teaser(translations["loja.bonus_ja_adquirido"], "cyan")
            pisca_loja("0, 255, 255, .2")

            // Vento estocado
            if (item == 2) falas_dilma()
        }
    } else { // Temas

        executaSons("faixa_efeitos1", "efeitos", "hat.ogg", 2)

        if (jogo.temas_comprados[item] == 0) {
            if (jogador.moedas >= listaPrecos_Temas[item]) {

                // Verifica se é uma requisição automática
                if (confirmacao == 55) {
                    menus.cache_compra = [categoria, item]
                    quadro_confirma_compra(1)
                }

                if (confirmacao == 1) {

                    jogo.temas_comprados[item] = 1
                    localStorage.setItem("pul4Pr3dios-temasComprados", jogo.temas_comprados)
                    localStorage.setItem("pul4Pr3dios-temaAtivo", item)

                    debita_compra(listaPrecos_Temas[item], "Temas", 1)

                    exibe_teaser(translations["loja.compra_confirmada"], "yellow")
                    pisca_loja("0, 255, 0, .2")

                    sincroniza_bonus(1)
                } else if (confirmacao == 0) {
                    exibe_teaser(translations["loja.compra_cancelada"], "red")
                    pisca_loja("255, 0, 0, .2")
                }
            } else
                debita_compra(0, 0, 0)
        } else {

            if (item != jogo.tema_ativo) {
                exibe_teaser(translations["loja.alterando_tema"], "cyan")
                localStorage.setItem("pul4Pr3dios-temaAtivo", item)

                recarrega_jogo_tema()
            } else {
                exibe_teaser(translations["loja.tema_ja_adquirido"], "cyan")
                pisca_loja("0, 255, 255, .2")
            }

            pisca_loja("0, 255, 255, .2")
        }
    }

    // Limpa a descrição do item à venda
    toolTip()
}

function debita_compra(valor, item, caso) {

    if (caso == 1) { // Caso seja uma compra legítima
        executaSons2("faixa_efeitos3", "efeitos", "compra.ogg", 2)

        if (valor > 0)
            jogo.depuracao({ tls: "depuracao.compra_confirmada", replace: valor, color: "orange" })
        else
            jogo.depuracao({ tls: "depuracao.item_resgatavel", color: "orange" })

        if (valor > 0) altera_moedas(-valor, jogador.moedas)

        jogador.moedas -= valor
        jogador.moedas_gastas += valor

        // Comprador compulsivo
        if (jogador.moedas_gastas >= 500) conquista("comprador_compulsivo", 0)

        get_element("moedas_gastas").innerHTML = jogador.moedas_gastas

        localStorage.setItem("pul4Pr3dios-moedas", jogador.moedas)
        localStorage.setItem("pul4Pr3dios-moedasGastas", jogador.moedas_gastas)

        registra_compra(item, 0)

        if (item != "Temas")
            carrega_vendas_loja(item)
        else // Recarrega o jogo com o tema escolhido
            recarrega_jogo_tema()

    } else { // Caso não tenha dinheiro

        exibe_teaser(translations["loja.sem_dinheiro"], "red")
        pisca_loja("255, 0, 0, .2")

        executaSons2("faixa_memes1", "memes", "falencia.ogg", 3)
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