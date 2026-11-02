const presets = {
    'spritePoste1': {
        sprite: spritePoste1,
        x: 11,
        y: 10
    },
    'spritePoste2': {
        sprite: spritePoste2,
        x: 10,
        y: 8
    },
    'spritePredio1_1': {
        sprite: spritePredio1_1,
        x: 1,
        y: 2,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -15,
            y: 15
        }
    },
    'spritePredio1_2': {
        sprite: spritePredio1_2,
        x: 1,
        y: 9,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -15,
            y: 15
        }
    },
    'spritePredio2_1': {
        sprite: spritePredio2_1,
        x: 1,
        y: 2,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -15,
            y: 15
        }
    },
    'spritePredio2_2': {
        sprite: spritePredio2_2,
        x: 1,
        y: 9,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -15,
            y: 15
        }
    },
    'spritePredio3': {
        sprite: spritePredio3,
        x: 1,
        y: 0,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -15,
            y: 15
        }
    },
    'spritePredio1_1_background': {
        sprite: spritePredio1_1_background,
        x: 1,
        y: 2,
        sombra: {
            sprite: spriteSombraPredio_Antena,
            x: -18,
            y: 15
        }
    },
    'spritePredio1_2_background': {
        sprite: spritePredio1_2_background,
        x: 1,
        y: 9,
        sombra: {
            sprite: spriteSombraPredio_Antena,
            x: -18,
            y: 15
        }
    },
    'spritePredio2_1_background': {
        sprite: spritePredio2_1_background,
        x: 0,
        y: 2,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -30,
            y: 18
        }
    },
    'spritePredio2_2_background': {
        sprite: spritePredio2_2_background,
        x: 1,
        y: 9,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -30,
            y: 18
        }
    },
    'spritePredio3_background': {
        sprite: spritePredio3_background,
        x: 1,
        y: 0,
        sombra: {
            sprite: spriteSombraPredio2_1,
            x: -30,
            y: 18
        }
    },
    'spritePisao': {
        sprite: spritePisao,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombraPisao,
            x: -10,
            y: 16
        }
    },
    'spritePisao2': {
        sprite: spritePisao2,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombraPisao2,
            x: -15,
            y: 17
        }
    },
    'spriteFonte': {
        sprite: spriteFonte,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombraFonte,
            x: -4,
            y: 18
        }
    },
    'spriteArvore': {
        sprite: spriteArvore,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombra_Arvore,
            x: -10,
            y: 12
        }
    },
    'spriteArvore_frutifera': {
        sprite: spriteArvore_frutifera,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombra_ArvoreFrutifera,
            x: -5,
            y: 10
        }
    },
    'spriteArvore2': {
        sprite: spriteArvore2,
        x: 0,
        y: 0,
        sombra: {
            sprite: spriteSombra_Arvore2,
            x: -14,
            y: 10
        }
    },
    'spriteArbusto': {
        sprite: spriteArbusto,
        x: 0,
        y: 0
    },
    'chao_noite': {
        sprite: spriteChao
    },
    'areia_noite': {
        sprite: spriteAreia
    },
    'agua_noite': {
        sprite: spriteAgua
    },
    'lava': {
        sprite: spriteLava
    },
    'agua_fundo': {
        sprite: spriteAgua,
        imagem: 'img_agua',
        cidade: { x: 0, y: 520, altura: 38 },
        montanha_fundo: { x: 0, y: 500, altura: 30 },
        montanha_frente: { x: 0, y: 540, altura: 30 }
    },
    'lava_fundo': {
        sprite: spriteLava,
        imagem: 'img_lava',
        cidade: { x: 0, y: 520, altura: 38 },
        montanha_fundo: { x: 0, y: 500, altura: 30 },
        montanha_frente: { x: 0, y: 540, altura: 30 }
    },
    'transita_cidade1': {
        sprite: spriteTransitaCidade1,
        sprite_noite: spriteTransitaCidade1_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        y: 341
    },
    'transita_cidade2': {
        sprite: spriteTransitaCidade2,
        sprite_noite: spriteTransitaCidade2_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        y: 359
    },
    'transita_montanha1': {
        sprite: spriteTransitaMontanha1,
        sprite_noite: spriteTransitaMontanha1_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        montanha_fundo: { x: 0, y: 480 },
        montanha_frente: { x: 0, y: 510 }
    },
    'transita_montanha2': {
        sprite: spriteTransitaMontanha2,
        sprite_noite: spriteTransitaMontanha2_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        montanha_fundo: { x: 0, y: 480 },
        montanha_frente: { x: 0, y: 510 }
    },
    'transita_ilha1': {
        sprite: spriteTransitaMontanha1,
        sprite_noite: spriteTransitaMontanha1_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        montanha_fundo: { x: 0, y: 480 }
    },
    'transita_ilha2': {
        sprite: spriteTransitaMontanha2,
        sprite_noite: spriteTransitaMontanha2_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        montanha_fundo: { x: 0, y: 480 }
    },
    'transita_ilha_cidade1': {
        sprite: spriteTransitaMontanha1,
        sprite_noite: spriteTransitaMontanha1_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        cidade: { x: 0, y: 500 }
    },
    'transita_ilha_cidade2': {
        sprite: spriteTransitaMontanha2,
        sprite_noite: spriteTransitaMontanha2_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        cidade: { x: 0, y: 500 }
    },
    'transita_chao1': {
        sprite: spriteTransitaChao1,
        sprite_noite: spriteTransitaChao1_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: -15 },
        chao_meio: { x: 0, y: -15 },
        chao_fundo: { x: 0, y: -15 }
    },
    'transita_chao2': {
        sprite: spriteTransitaChao2,
        sprite_noite: spriteTransitaChao2_noite,
        imagem_dia: 'img_transicoes_dia',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: -15 },
        chao_meio: { x: 0, y: -15 },
        chao_fundo: { x: 0, y: -15 }
    },
    'transita_areia1': {
        sprite: spriteTransitaAreia1,
        sprite_noite: spriteTransitaAreia1_noite,
        imagem_noite: 'img_transita_areia1_noite',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: -15 },
        chao_meio: { x: 0, y: -15 },
        chao_fundo: { x: 0, y: -15 }
    },
    'transita_areia2': {
        sprite: spriteTransitaAreia2,
        sprite_noite: spriteTransitaAreia2_noite,
        imagem_noite: 'img_transita_areia2_noite',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: -15 },
        chao_meio: { x: 0, y: -15 },
        chao_fundo: { x: 0, y: -15 }
    },
    'transita_grama_areia': {
        sprite: spriteTransitaGramaAreiaDia,
        sprite_noite: spriteTransitaGramaAreiaNoite,
        imagem_noite: 'img_transita_grama_areia_noite',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: 0 },
        chao_meio: { x: 0, y: 0 },
        chao_fundo: { x: 0, y: 0 }
    },
    'transicao_grama_areia': {
        sprite: spriteTransitaGramaAreiaDia,
        sprite_noite: spriteTransitaGramaAreiaNoite,
        imagem_noite: 'img_transita_grama_areia_noite',
        x: 0,
        y: 0,
        chao_frente: { x: 0, y: 0 },
        chao_meio: { x: 0, y: 0 },
        chao_fundo: { x: 0, y: 0 }
    }
}