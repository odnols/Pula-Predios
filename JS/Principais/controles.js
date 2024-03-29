var tela_opcao_aberta = 0, cache_alvo = null

function botoes(tecla) {

    if (confirma_carregamento) {
        let lista_menus = ["boas_vindas", "configuracoes", "opcoes", "estatisticas", "tutorial", "conquistas_mapa", "controles", "problemas_redes_sociais", "suporte_jogo"]

        let alvo = "placeholder"

        if (jogo.status == estados.jogar && !menus.sessao_loja_ativa)
            executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

        if (jogo.estadoOcioso)
            impedeOcioso()

        if (opcoes.inicia_game) {
            switch (tecla) {
                case 76:  // l
                case 108: // L
                    if (!menus.estado_loja) {
                        if (menus.estado_log)
                            visualizar_log(0)
                        else {
                            visualizar_log(1)
                            alvo = "log"
                        }
                    }
                    break
                case 116: // t
                case 84:  // T
                    if (!menus.estado_loja)
                        alvo = "tutorial"
                    break
                case 99:  // C
                case 67:  // c
                    if (!menus.estado_loja)
                        alvo = "controles"
                    break
                case 101: // e
                case 69:  // E
                    if (!menus.estado_loja)
                        alvo = "estatisticas"
                    else
                        regula_sessao_loja("Bônus")
                    break
                case 120: // x
                case 88:  // X
                    if (!menus.estado_log)
                        abre_loja()
                    alvo = "loja"
                    break
                case 113: // q
                case 81:  // Q
                    if (!menus.estado_loja)
                        alvo = "opcoes"
                    else
                        regula_sessao_loja("Skins")
                    break
                case 115: // s
                case 83:  // S
                    if (menus.estado_loja)
                        regula_sessao_loja("Temas")
                    break
                case 49: // 1
                    inverte_tempo()
                    break
                case 112: // p
                case 80: // P
                    if (jogo.velocidade == 0)
                        acelera_predio()
                    else
                        freia_predio()
                    break
                case 122: // z
                case 90:  // Z
                    if (!menus.estado_loja) {
                        alvo = "configuracoes"
                        menu_opcoes(91)
                    }
                    break
                case 111: // o
                case 79:  // O
                    if (!menus.estado_loja)
                        alvo = "conquistas_mapa"
                    break
                case 150: // Problemas
                    if (!menus.estado_loja)
                        alvo = "problemas_redes_sociais"
                    break
                case 151: // Suporte ao jogo
                    if (!menus.estado_loja)
                        alvo = "suporte_jogo"
                    break
                case 114: // r
                case 82:  // R
                    location.reload()
                    break
                // case 50:
                //     eventos.evento = 2
                // break
                // case 49:
                //     if(jogo.velocidade > 0)
                //         jogo.velocidade = 0
                //     else
                //         jogo.velocidade = 10
                // break
                default:
                    if (menus.estado_loja)
                        alvo = "loja"

                    if (menus.estado_log)
                        alvo = "log"

                    if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {
                        $("#notifica_moeda").fadeOut()
                        $("#puxador_loja").fadeOut()
                    }
                    break
            }

            if (cache_alvo == alvo)
                alvo = "placeholder"

            // Guarda o ultimo menu aberto
            if (!menus.estado_loja && !menus.estado_log) {
                if (alvo != "placeholder")
                    verificaOciosidade(true)
                else if (alvo == "placeholder")
                    verificaOciosidade(false)
            } else {
                if (menus.estado_loja)
                    if (tecla == 120 || tecla == 88)
                        if (alvo != "placeholder")
                            verificaOciosidade(true, 1)
            }

            cache_alvo = alvo

            if (alvo == "opcoes") {
                $(".opcoes_direita").fadeIn()
                $(".opcoes_esquerda").fadeIn()
            }

            if (alvo != "notif") { // Esconde todas as interfaces
                for (let i = 0; i < lista_menus.length; i++) {
                    if (alvo != lista_menus[i])
                        $(`#${lista_menus[i]}`).fadeOut()
                }
            }

            if (alvo != "placeholder" && alvo != "loja")
                $(`#${alvo}`).fadeToggle()
        }
    }
}

function clique(evento) {

    if (confirma_carregamento) {
        if (evento == 114)
            document.location.reload(true)

        // Partida ativa
        if (!event.keyCode && opcoes.inicia_game && jogo.status != estados.perdeu) {
            if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {

                evento = evento || window.event

                // Controles do Mouse e cliques
                let button = evento.which || evento.button

                if (button == 1 || evento == 32)
                    // ação para o botão esquerdo 
                    jogador.pula()
                else if (button == 2) {
                    // ação para a rodinha do mouse
                    // if(jogador.timer_mod >= 5)
                    // jogo.operador()
                } else if (button == 3)
                    // ação para o botão direito 
                    if ((jogador.timer_mod == 5 && !jogador.mods_comprados[1]) || jogador.timer_mod == 10)
                        jogador.modificador()

                botoes(600)
            }

            if (jogo.status == estados.jogar && !menus.estado_loja && !menus.estado_log)
                inicia_jogo()

            if (jogo.status == estados.ocioso)
                estadoOcioso("volta")
        } else {
            if (opcoes.inicia_game)
                if (typeof evento != "number")
                    tecla = event.keyCode
                else
                    tecla = evento

            //  Controles da partida em Andamento
            if (jogo.status == estados.jogando || jogo.status == estados.tutorial) {
                switch (tecla) {
                    case 32:  // Espaço
                    case 119: // w
                    case 87:  // W
                        if (indice_tutorial > 5)
                            jogador.pula()
                        else
                            avanca_tutorial()
                        break
                    case 13:  // Enter
                    case 100: // d
                    case 68:  // D
                        if (!jogador.mod && jogador.qtdMods > 0 && !jogo.liberaMod) // + Vezes
                            if (indice_tutorial > 5)
                                jogador.modificador()
                        break
                    case 114: // r
                    case 82:  // R
                        if (jogador.timer_mod >= 5)
                            jogo.operador()
                        break
                }

            } else if (jogo.status == estados.jogar && (tecla == 32 || tecla == 87 || tecla == 119) && !menus.estado_loja && !menus.estado_log)
                inicia_jogo()
            else if (jogo.status == estados.perdeu && jogador.y >= 10 * opcoes.altura && !menus.estado_loja) {
                jogo.status = estados.jogar
                reseta()

            } else if (jogo.status == estados.jogar && menus.janelaConfirma != 0) {
                if (tecla == 13 && menus.janelaConfirma == 1)
                    status_confirmacao(1, 0, cache_confirma)
                else if (tecla == 114 || tecla == 82) // R
                    document.location.reload(true)
                else
                    botoes(tecla)
            } else if (menus.estado_loja == 1 && (tecla == 87 || tecla == 119))
                regula_sessao_loja("Modificadores")
            else
                botoes(tecla)

            if (jogo.status == estados.ocioso)
                estadoOcioso("volta")
        }
    }
}

// Detectar tecla ESC
document.onkeydown = function (evt) {
    evt = evt || window.event
    let isEscape = false

    if ("key" in evt)
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    else
        isEscape = (evt.keyCode === 27)

    if (isEscape && jogo.status != estados.jogando) {
        if (jogo.status == estados.perdeu) {
            jogo.status = estados.jogar
            reseta()
        }

        if (menus.estado_loja && menus.janelaConfirma == 0)
            abre_loja()

        if (menus.janelaConfirma) {
            menus.janelaConfirma = 0
            $("#quadro_confirma_compra").fadeOut()
            $("#quadro_confirma_exclusao").fadeOut()
        }

        if (menus.estado_log)
            visualizar_log(0)

        botoes(600)
    }
}

function menu_opcoes(valor, caso) {

    if (caso != null) // Utilizado quando é um atalho
        botoes(122)

    if (confirma_carregamento) {
        if (valor != 91) {
            $(".opcoes_direita").fadeOut()
            $(".opcoes_esquerda").fadeOut()
        }

        get_element("fecha_janela_c").onclick = () => menu_opcoes(90)

        if (jogo.status == estados.jogar && valor != 91)
            executaSons2("faixa_efeitos1", "Efeitos", "hat.ogg", 2)

        if (!tela_opcao_aberta) {
            switch (valor) {
                case 1: $("#config_gerais").fadeIn(); tela_opcao_aberta = 1; break;
                case 2: $("#config_sons").fadeIn(); tela_opcao_aberta = 1; break;
                case 3: $("#config_grafc").fadeIn(); tela_opcao_aberta = 1; break;
                case 4: $("#config_idioma").fadeIn(); tela_opcao_aberta = 1; break;
                default:
                    $(".opcoes_direita").fadeIn()
                    $(".opcoes_esquerda").fadeIn()

                    get_element("fecha_janela_c").onclick = () => botoes(81)
                    break
            }
        } else {
            $("#config_gerais").fadeOut()
            $("#config_sons").fadeOut()
            $("#config_grafc").fadeOut()
            $("#config_idioma").fadeOut()

            if (tela_opcao_aberta == 1) {
                $(".opcoes_direita").fadeIn()
                $(".opcoes_esquerda").fadeIn()

                get_element("fecha_janela_c").onclick = () => botoes(81)
            }

            tela_opcao_aberta = 0
        }
    }
}