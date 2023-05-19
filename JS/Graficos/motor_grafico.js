var anim_indices = [0, 0, 0, 0, 0, 0], anim_estrela = 0, anim_luzes_naveg = 0

function Cenario(astro) {

    let temas_disponiveis = ["cidade", "cidade", "lua"]
    let tema_ativo = temas_disponiveis[jogo.tema_ativo] || 0

    lista_sprites.img_cenario = new Image()

    lista_sprites.img_jogador = new Image()
    lista_sprites.img_objs = new Image()
    lista_sprites.img_sombra = new Image()

    lista_sprites.img_ceu = new Image()
    lista_sprites.img_agua = new Image()
    lista_sprites.img_lava = new Image()
    lista_sprites.img_areia = new Image()
    lista_sprites.img_astros = new Image()

    lista_sprites.img_adereco_aco = new Image()
    lista_sprites.img_adereco_fogo = new Image()
    lista_sprites.img_adereco_roda = new Image()
    lista_sprites.img_adereco_bandeira = new Image()
    lista_sprites.img_adereco_combustao = new Image()

    lista_sprites.img_mascara_estrela = new Image()
    lista_sprites.img_luzes_navegacao = new Image()

    lista_sprites.img_jogador.src = "source/images/Sprites/Jogador/Jogador_dia.png"

    lista_sprites.img_objs.src = `source/images/Sprites/${tema_ativo}/Objetos_dia.png`
    lista_sprites.img_cenario.src = `source/images/Sprites/${tema_ativo}/cenario_dia.png`
    lista_sprites.img_agua.src = `source/images/Sprites/${tema_ativo}/agua_dia.png`
    lista_sprites.img_lava.src = `source/images/Sprites/${tema_ativo}/lava.png`
    lista_sprites.img_areia.src = `source/images/Sprites/Praia/areia_noite.png`
    lista_sprites.img_ceu.src = `source/images/Sprites/${tema_ativo}/Ceu.png`
    lista_sprites.img_sombra.src = `source/images/Sprites/${tema_ativo}/Sombra.png`

    // Sprites animados usados no jogador
    lista_sprites.img_adereco_aco.src = "source/images/Sprites/Jogador/Aderecos/aco.png"
    lista_sprites.img_adereco_fogo.src = "source/images/Sprites/Jogador/Aderecos/mascara_fogo.png"
    lista_sprites.img_adereco_roda.src = "source/images/Sprites/Jogador/Aderecos/roda.png"
    lista_sprites.img_adereco_bandeira.src = "source/images/Sprites/Jogador/Aderecos/bandeira.png"
    lista_sprites.img_adereco_combustao.src = "source/images/Sprites/Jogador/Aderecos/combustao.png"

    lista_sprites.img_mascara_estrela.src = "source/images/Sprites/Cidade/mascara_estrelas.png"
    lista_sprites.img_luzes_navegacao.src = "source/images/Sprites/Cidade/luzes_de_navegacao.png"

    // Define qual será o astro mostrado no céu ao carregar o game
    if (astro)
        lista_sprites.img_astros.src = "source/images/Sprites/lua.png"
    else
        lista_sprites.img_astros.src = "source/images/Sprites/sol.png"

    if (jogo.tema_ativo == 0) {

        const alvos = ["canvas", "icones_aquisicoes", "conquistas", "carrega_jogo", "quadro_notificacoes", "barra_loading", "temporizador", "moedas", "mod", "notificacoes", "menu_inicial"]

        for (let i = 0; i < alvos.length; i++)
            get_element(alvos[i]).style.filter = "grayscale(1)"
    }
}

function transita_tempo(categoria) {
    if (categoria) {
        anoitecer()
        // Liga a função de Transição
        ambiente.libera_transitador = 1
    } else {
        amanhecer()

        // Desliga a Função de Transição
        conometro_transitador = setTimeout(() => {
            ambiente.libera_transitador = 0

            clearTimeout(conometro_transitador)
        }, 20000)
    }
}

//  Função para fazer anoitecer
function anoitecer() {
    estrelificador = setInterval(() => {
        if (ambiente.opacidade_noite <= 0.99)
            ambiente.opacidade_noite += 0.01
        else {  // Matando o intervalo
            clearInterval(estrelificador)
            ambiente.opacidade_noite = 1.0
        }
    }, 180)
}

function amanhecer() {
    dializador = setInterval(() => {
        if (ambiente.opacidade_noite >= 0.0)
            ambiente.opacidade_noite -= 0.01
        else {  // Matando o intervalo
            clearInterval(dializador)
            ambiente.opacidade_noite = 0.0
        }
    }, 180)
}

function transitador(elemento, posicao_x, posicao_y) {

    // Verifica se está de noite para executar a função
    if (ambiente.libera_transitador) {

        let img = get_element(elemento)
        let canvas = get_element("canvas")
        let ctxi = canvas.getContext("2d")
        let pat = ctxi.createPattern(img, 'repeat')

        get_element(elemento).style.opacity = ambiente.opacidade_noite

        ctxi.globalAlpha = ambiente.opacidade_noite

        ctxi.fillStyle = pat

        // Verifica se a Opacidade está correta e exibe na tela
        if (ambiente.opacidade_noite >= 0.0 && ambiente.opacidade_noite <= 1.0) {
            ctxi.beginPath()
            ctxi.drawImage(img, posicao_x, posicao_y)
            ctxi.fill()
            ctxi.closePath()
        }

        ctxi.globalAlpha = 1

        ctxi.beginPath()
        ctxi.rect(0, 0, 0, 0)
        ctxi.fill()
        ctxi.closePath()
    }
}

function inverte_tempo() {

    if (ambiente.astro[2] == 0) { // Noite
        ambiente.astro[2] = 1
        ambiente.tema = 2
        ambiente.libera_transitador = 1
        ambiente.opacidade_noite = 1

        if (typeof tEst != "undefined")
            clearTimeout(tEst)

        // Verifica se as luzes de navegação estão ativas com o avião voando
        if (typeof tLuzN == "undefined" && ambiente.objeto_voador[3] == 1 && dispositivo >= 1366)
            animaLuzesGuia(1)

        animaEstrelas()
    } else { // Dia
        ambiente.astro[2] = 0
        ambiente.tema = 1
        ambiente.libera_transitador = 0
        ambiente.opacidade_noite = 0

        if (typeof tEst != "undefined")
            clearTimeout(tEst)
    }

    alteraRelogio()
    animaLuzesGuia(0)
}

function voltaAnimacao() {
    if (jogo.qualidadeGrafica != 0 && dispositivo >= 1366) {
        animaBandeira()
        animaRoda()
        animaFogo()
    }
}

function animaMoeda() {
    if (jogo.qualidadeGrafica != 0 && dispositivo >= 1366) {
        tID = setTimeout(() => {

            sprites = [0, 912, 798, 684, 570, 456, 342, 228, 114]
            opcoes.posicao = ajusta_posicao_sprites(0, sprites)

            get_element("moeda_img").style.backgroundPosition = `${opcoes.posicao}px 0px`

            if (opcoes.posicao == 0) {
                setTimeout(() => {
                    animaMoeda()
                }, 1000)
            } else
                animaMoeda()
        }, 100)
    }
}

function animaBandeira() {
    tBr = setTimeout(() => {

        sprites = [0, 51, 34, 17]
        ajusta_posicao_sprites(1, sprites)

        if (jogo.qualidadeGrafica != 0)
            animaBandeira()
    }, 100)
}

function animaFogo() {
    tFg = setTimeout(() => {

        sprites = [0, 31]
        ajusta_posicao_sprites(2, sprites)

        if (jogo.qualidadeGrafica != 0)
            animaFogo()
    }, 100)
}

function animaRoda() {
    tRd = setTimeout(() => {

        sprites = [0, 61, 122]
        ajusta_posicao_sprites(3, sprites)

        if (jogo.qualidadeGrafica != 0)
            animaRoda()
    }, 50)
}

function AnimaModFlutuando() {
    tMf = setTimeout(() => {

        sprites = [180, 120, 60, 0]
        ajusta_posicao_sprites(4, sprites)

        AnimaModFlutuando()
    }, 100)
}

function enferruja() {
    tAco = setTimeout(() => {

        sprites = [47, 94, 141, 188, 235, 282]
        ajusta_posicao_sprites(5, sprites)

        if (anim_indices[5] != 5)
            enferruja()
    }, 80)
}

function limpa_ferrugem() {
    tAco = setTimeout(() => {

        sprites = [282, 235, 188, 141, 94, 47, 329]
        ajusta_posicao_sprites(5, sprites)

        if (anim_indices[5] != 6)
            limpa_ferrugem()
    }, 80)
}

function animaEstrelas() {
    let posicoes = [0, 568]

    tEst = setTimeout(() => {
        let indice = Math.round((posicoes.length - 1) * Math.random())
        spriteMascara_estrelas.y = posicoes[indice]

        animaEstrelas()
    }, 1000)
}

function animaLuzesGuia(caso) {
    if (jogo.qualidadeGrafica != 0 && dispositivo >= 1366) {
        if (caso) { // Verifica se é uma requisição para ativar ou desligar a animação
            tLuzN = setInterval(() => {
                if (anim_luzes_naveg < 164) {
                    anim_luzes_naveg += 82
                    spriteLuzes_navegacao.y += 82
                } else {
                    anim_luzes_naveg = 0
                    spriteLuzes_navegacao.y = 0
                }
            }, 500)
        } else {
            anim_luzes_naveg = 0

            spriteLuzes_navegacao.y = 246

            if (typeof tLuzN != "undefined")
                clearInterval(tLuzN)
        }

    } else
        spriteLuzes_navegacao.y = 246
}

function ajusta_posicao_sprites(elemento, array_sprites) {

    let sprites_animados = ["/moeda/", spriteAdereco_bandeira, spriteAdereco_fogo, spriteAdereco_roda, spriteAdereco_combustao, spriteAdereco_aco]
    indice = anim_indices[elemento]

    if (anim_indices[elemento] < array_sprites.length - 1)
        indice++
    else
        indice = 0

    // Salva o valor atualizado
    anim_indices[elemento] = indice
    elemento_final = sprites_animados[elemento]

    elemento_final.x = array_sprites[indice]

    if (elemento == 0)
        return array_sprites[indice]
}

function verifica_animacoes(condicao) {

    if (typeof tBr != "undefined")
        clearTimeout(tBr)

    if (typeof tFg != "undefined")
        clearTimeout(tFg)

    if (typeof tRd != "undefined")
        clearTimeout(tRd)

    if (typeof tLuzN != "undefined")
        clearInterval(tLuzN)

    if (condicao && dispositivo >= 1366)
        voltaAnimacao()
}

function showtext(el, text, local) {

    let typer

    if (typeof typer != "interval") {
        clearInterval(typer)

        if (local == 0)
            limpa = get_element("texto_historia")
        else
            limpa = get_element("frase_tuto_em_game")

        limpa.innerHTML = ""
    }

    if (local == 1) {
        tuto = get_element("avancar_tuto")
        tuto[0].style.display = "none"
    }

    let char = text.split("").reverse()

    typer = setInterval(() => {

        if (!char.length) {
            if (local == 0)
                historia(null, 1)
            else
                executa_tutorial(1, null)

            return clearInterval(typer)
        }

        let next = char.pop()

        el.innerHTML += next
    }, 50)
}

// Responsável pelo banner parallax do inicio
const position = document.documentElement;
position.addEventListener("mousemove", e => {
    position.style.setProperty('--x', `${e.clientX}px`)
})