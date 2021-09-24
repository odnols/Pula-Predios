indice_tutorial = 0, tut_complet = null;

function exibeTutorial(valor){

    switch(valor){
        case 1:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Como Jogar</h2><br><br><br><p>O Pula Prédios é um game do gênero endless runner, onde o jogador só para de correr ao morrer.</p><h2 class='nome_tutorial' style='color: red;'>NÃO MORRA</h2><br><br><br><p>Custe o que custar, pule os obstáculos a frente e não morra! Use o <a href='#' onclick='exibeTutorial("+ 2 +")'>especial</a> nos momentos arriscados e corra o máximo possível.</p><h2 class='nome_tutorial'>Infos</h2><br><br><br><p>Caso sinta necessidade, não hesite em abrir os <a href='#' onclick='botoes("+ 99 +")'>controles</a> para visualizar uns comandos!</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>How to Play</h2><br><br><br><p>Pula Prédio is a game in the endless runner genre, where the player just stops running when dying.</p><h2 class='nome_tutorial' style='color: red;'>DON'T DIE</h2><br><br><br><p>Whatever it takes, skip the obstacles ahead and don't die! Use the <a href='#' onclick='exibeTutorial("+ 2 +")'>special</a> in risky moments and run as much as possible.</p><h2 class='nome_tutorial'>Infos</h2><br><br><br><p>If you feel the need, do not hesitate to open the <a href='#' onclick='botoes("+ 99 +")'>controls</a> to view some commands!</p>";
        break;
        case 2:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Modificador</h2><br><br><br><p>Um Modificador é um recurso secundário que pode ser ativado pressionando D ou Enter enquanto você estiver numa partida.</p><h2 class='nome_tutorial'>Uso</h2><br><br><br><p>Ao utilizar o modificador você terá algumas vantagens, evitando morrer ao atropelar construções ou ao cair na água e lava.</p> <h2 class='nome_tutorial'>Recarregamento</h2><br><br><br><p>Seu tempo de recarga demora 10 segundos para completar, enquanto estiver nesse estado o jogador será poupado de eventos aquáticos ou de lava.</p><h2 class='nome_tutorial'>Atençõn (!)</h2><br><br><br><p>O Modificador possuí um limite de usos por partida! Então use com sabedoria. Caso queira saber onde ver, o total é mostrado <span style='color: greenyellow;'>com esta cor</span>, na caixa do modificador ;)</p><h2 class='nome_tutorial'>Incrementos</h2><br><br><br><p>O Modificador ainda pode sofrer upgrades com o uso de outros <a href='#' onclick='exibeTutorial(12)'>modificadores</a>, para consultar mais detalhes consulte a aba de upgrades.</p><h2 class='nome_tutorial'>Curiosidades</h2><br><br><br><p>O modificador foi introduzido pela primeira vez na versão Alpha 0.01 com o nome de Especial, na primeira versão do Pula Prédios!</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Modifier</h2><br><br><br><p>A Modifier is a secondary feature that can be activated by pressing D or Enter while you are in a match.</p><h2 class='nome_tutorial'>Usage</h2><br><br><br><p>By using the modifier you will have some advantages, avoiding dying when running over buildings or falling into water and lava.</p><h2 class='nome_tutorial'>Reload</h2><br><br><br><p>Your recharge time takes 10 seconds to complete, while in this state the player will be spared from aquatic or lava events.</p><h2 class='nome_tutorial'>Attention ( ! )</h2><br><br><br><p>The Modifier has a limit of uses per game! So use it wisely. If you want to know where to see, the total is shown <span style='color: greenyellow;'>with this color</span>, in the modifier box ;)</p><h2 class='nome_tutorial'>Increments</h2><br><br><br><p>The Modifier can still be upgraded using other <a href='#' onclick='exibeTutorial(12)'>modifiers</a>, to see more details see the upgrades tab.</p><h2 class='nome_tutorial'>Curiosities</h2><br><br><br><p>The modifier was first introduced in the Alpha 0.01 version with the name de Especial, in the first version of Pula Buildings!</p>";
        break;
        case 3:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Inimigos</h2><br><br><br><p>Os 'inimigos' são a maioria por aqui, eles podem ser desde prédios até ao piso onde você está prestes a pisar!</p><h2 class='nome_tutorial'>Inimigos conhecidos</h2><br><br><br><img src='Imagens/Sprites/Cidade/Predio1_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Cidade/Predio2_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Cidade/Predio3.png'><br><br><p style='color: red;'>(!) A Versão sem antena também é perigosa</p><h2 class='nome_tutorial'>Cuidados</h2><br><br><br><p>Caso você atropele um prédio enquanto estiver com o <a href='#' onclick='exibeTutorial("+ 2 +")'>modificador</a> ativo, você perderá pontos!</p><h2 class='nome_tutorial'>Outras construções</h2><br><br><br><p>Caso não tenha morrido ao atropelar uma construção e tenha ficado com a pulga atrás da orelha, confira o artigo das <a href='#' onclick='exibeTutorial("+ 5 +")'>moedas</a>.</p><h2 class='nome_tutorial'>Curiosidades</h2><br><br><br><p>Até a versão Alpha 0.04 os inimigos tinham uma aparência assombrada de noite, como as imagens abaixo \\\\//</p><img src='Imagens/Sprites/Tuto/predio1_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Tuto/predio3.png'>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Enemies</h2><br><br><br><p>The 'enemies' are the majority here, they can be from buildings to the floor where you are about to step!</p><h2 class='nome_tutorial'>Known enemies</h2><br><br><br><img src='Imagens/Sprites/Cidade/Predio1_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Cidade/Predio2_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Cidade/Predio3.png'><br><br><p style='color: red;'> ( ! ) The version without antenna is also dangerous</p><h2 class='nome_tutorial'>Cautions</h2><br><br><br><p> If you run over a building while you have <a href='#' onclick='exibeTutorial("+ 2 +")'>modifier</a> active, you will lose points!</p><h2 class='nome_tutorial'> Other buildings </h2> <br> <br> <br> <p> If you have not died by running over a building and got the flea behind your ear, check out the <a href='#' onclick='exibeTutorial("+ 5 +")'>coins</a> article.</p><h2 class='nome_tutorial'> Curiosities</h2><br><br><br><p>Until the Alpha version 0.04 the enemies had a haunted appearance at night, like the images below \\\\//</p><img src='Imagens/Sprites/Tuto/predio1_2.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Tuto/predio3.png'>";
        break;
        case 4:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Eventos</h2><br><br><br><p>Há vários eventos no game, eles são ativados de tempos em tempos e tem suas características próprias!<br><br>Apenas sobreviva a eles e ganhará umas estatísticas a+ :v</p> <h2 class='nome_tutorial'>São eles \\\\//</h2><br><br><br><p style='color: cyan;'>Área Densa</p><p>Concentra muitos prédios e uma poluição visual gigante!</p><hr style='width: 250px;'><p style='color: cyan'>Parque</p><p>Aqui você poderá ganhar muitos pontos destruindo pisões ajudando a limpar o parque.</p><hr style='width: 250px;'><p style='color: cyan'>Água</p><p>Toda cidade possui rios ou lagos e aqui não será diferente! Pule eles ou afunda ;D</p><hr style='width: 250px;'><p style='color: cyan'>Lava</><p>Não sabemos como surgiram no game, apenas que ela está lá!</p><h2 class='nome_tutorial'>Curiosidades</h2><br><br><br><p>Eventos foram introduzidos pela 1° vez na versão Beta 1.0, vindo de uma variação de um sistema de níveis. Os níveis eram usados na Alpha 0.04 para acelerar o jogador com o decorrer do tempo.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Events</h2><br><br><br><p>There are several events in the game, they are activated from time to time and have their own characteristics!<br><br>Just survive them and you will gain some plus statistics</p><h2 class='nome_tutorial'>They are \\\\//</h2><br><br><br><p style='color: cyan;'> Dense Area</p><p>It concentrates many buildings and a huge visual pollution!</p><hr style='width: 250px;'><p style='color: cyan'>Park</p><p>Here you you can earn many points by destroying floors helping to clean the park.</p><hr style='width: 250px;'><p style='color: cyan'>Water</p><p>Every city has rivers or lakes and here will be no different! Skip them or sink; D</p><hr style='width: 250px;'><p style='color: cyan'>Lava</p><p>We don't know how they came up in the game, just that it's there!</p><h2 class='nome_tutorial'>Curiosities</h2><br><br><br><p>Events were introduced for the 1st time in Beta 1.0, coming from a variation of a system of levels. Levels were used at Alpha 0.04 to speed up the player over time.</p>";
        break;
        case 5:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Moedas</h2><br><br><br><p>Moedas são itens coletáveis no jogo, há algumas formas de conseguir elas. Pisões são construções abandonadas que possuem 2 variantes, pise neles e se eles tiverem alguma moeda você ganhará!</p><h2 class='nome_tutorial'>Variantes Conhecidas</h2><br><br><br><img src='Imagens/Sprites/Cidade/Pisao_noite.png'> &nbsp; &nbsp; <img src='Imagens/Sprites/Cidade/Pisao2_noite.png'><br><br><h2 class='nome_tutorial'>Usos</h2><br><br><br><p>Moedas podem ser usadas para comprar alguns bônus e atualizar sua skin na <a href='#' onclick='exibeTutorial("+ 6 +")'>loja</a>.</p><h2 class='nome_tutorial'>Curiosidades</h2><br><br><br><p>Pisões podem conter ou não moedas, no <a href='#' onclick='exibeTutorial("+ 4 +")'>evento</a> de área densa, os pisões podem dar até 8 moedas, caso não esteja com um bônus de <a href='#' onclick='abre_loja_especial(2)'>2x$</a> ativo.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Coins</h2><br><br><br><p>Coins are collectible items in the game, there are some ways to get them. Stepping stones are abandoned buildings that have 2 variants, step on them and if they have any coins you will win!</p><h2 class='nome_tutorial'> Known variants</h2><br><br><br><img src='Imagens/Sprites/Cidade/Pisao_noite.png'>&nbsp; &nbsp;<img src='Imagens/Sprites/Cidade/Pisao2_noite.png'><br><br><h2 class='nome_tutorial'>Uses</h2><br><br><br><p>Currencies can be used to buy some bonuses and update your skin in the <a href='#' onclick='exibeTutorial("+ 6 +")'>store</a>.</p><h2 class='nome_tutorial'>Curiosities</h2><br><br><br><p>Floors may or may not contain coins, in the <a href='#' onclick='exibeTutorial("+ 4 +")'>event</a> area dense, floors can give up to 8 coins if you don't have a <a href='#' onclick='abre_loja_especial(2)'>2x$</a> bonus active.</p> ";
        break;
        case 6:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Loja</h2><br><br><br><p>A <a href='#' onclick='botoes("+ 120 +")'>loja</a> é onde você pode gastar suas moedas! Por lá é possível comprar novas cores para sua skin ou dar um upgrade em seu modificador!</p><h2 class='nome_tutorial'>Esquema de Cores</h2><br><br><br><p>Adotamos 3 cores para usar na loja<img src='Imagens/Atualiza/loja.png'>Amarelo: Para itens que você comprou e equipou.<br><br>Verde: Para itens comprados.<br><br>Azul Escuro: Para itens à venda.</p><h2 class='nome_tutorial'>Incrementos</h2><br><br><br>Incrementos p/ Especiais comprados são automaticamente ativados, podendo ser apenas azul escuro ou amarelo.</p><h2 class='nome_tutorial'>Curiosidades</h2><br><br><br><p>A loja e o sistema de skins foram pensados para serem implementados na versão Beta 2.0, porém foram postergados para a Beta 3.0 pela complexidade envolvida.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Shop</h2><br><br><br><p>The <a href='#' onclick='botoes("+ 120 +")'>shop</a> is where you can spend your coins! There you can buy new colors for your skin or upgrade your modifier!</p><h2 class='nome_tutorial'>Color Scheme</h2><br><br><br><p>3 colors to use in the store<img src='Imagens/Atualiza/loja.png'><br>Yellow: For items you have purchased and equipped.<br><br>Green: For items purchased.<br><br>Dark Blue: For items for sale.</p><h2 class='nome_tutorial'>Increments</h2><br><br><br>Increments for purchased Purchases are automatically activated and can only be dark blue or yellow.</p><h2 class='nome_tutorial'>Curiosities</h2><br><br><br><p>The store and the skin system were designed to be implemented in the Beta 2.0 version, but were postponed to Beta 3.0 for the complexity involved.</p> ";
        break;
        case 7:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Teclas de Atalho</h2><br><br><br><p>Algumas teclas de atalho estão presentes no game, elas podem ser usadas para evitar percorrer algumas telas ;)<br> Você pode conferir as teclas de atalho diretamento nos <a href='#' onclick='botoes("+ 99 +")'>controles</a><br> <span style='color: red'>( elas estão destacadas em vermelho )</span></p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Hotkeys</h2><br><br><br><p>Some hotkeys are present in the game, they can be used to avoid scrolling through some screens;)<br>You can check the hotkeys directly on the <a href='#' onclick='botoes("+ 99 +")'> controls</a><br><span style='color: red'>( they are highlighted in red )</span></p>";
        break;
        case 8:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Dificuldade</h2><br><br><br><p>A dificuldade pode ser alterada nas <a href='#' onclick='botoes("+ 122 +")'>configurações</a> enquanto estiver no menu, há 4 níveis de dificuldade presentes no jogo.</p><h2 class='nome_tutorial'>São Elas \\\\//</h2><br><br><br><p style='color: cyan'>Fácil</p><p>Proporciona um jogo leve para o player, indicado para iniciantes.</p><hr style='width: 250px;'><p style='color: cyan'>Normal</p><p>Essa é a dificuldade padrão do jogo</p><hr style='width: 250px;'><p style='color: cyan'>Difícil</p><p>É um pouco mais complicado que o normal, proporciona um desafio a mais ao jogador</p><hr style='width: 250px;'><p style='color: cyan'>Expert</p><p>Sobreviver nessa dificuldade é uma dádiva para poucos, mas suas recompensas são gratificantes.</p><h2 class='nome_tutorial'>Atençõn (!)</h2><br><br><br><p>As <a href='#' onclick='botoes("+ 5 +")'>moedas</a> e os pisões estão relacionados diretamente com a dificuldade que você estiver jogando, quanto mais fácil, você verá mais pisões e receberá menos moedas, quanto mais difícil, serão menos pisões e muito mais moedas!</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Difficulty</h2><br><br><br><p>The difficulty can be changed in <a href='#' onclick='botoes("+ 122 +")'>settings </a>while you are in the menu, there are 4 levels of difficulty present in the game.</p><h2 class='nome_tutorial'>Are they \\\\//</h2><br><br><br><p style='color: cyan'>Easy</p><p>Provides a lightweight game for the player, suitable for beginners.</p><hr style='width: 250px;'><p style='color: cyan'>Normal</p><p>This is the standard difficulty of the game</p><hr style='width: 250px;'><p style='color: cyan'>Hard</p><p>It is a little more complicated than normal, it provides an extra challenge to the player</p><hr style='width: 250px;'><p style='color: cyan'>Expert</p><p>Survive this difficulty it is a gift for a few, but its rewards are rewarding.</p><h2 class='nome_tutorial'>Attention ( ! )</h2><br><br><br><p>As<a href='#' onclick='botoes("+ 5 +")'>coins</a>and the steps are directly related to the difficulty you are playing, the easier you will see more stomps and you will receive less coins, the more difficult it will be, less stomps and a lot more coins!</p>";
        break;
        case 9:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Configurações</h2><br><br><br><p>As configurações podem ser acessadas pressionando a tecla ( Z ), elas permitem modificar alguns comportamentos do jogo que estão listados abaixo</p><h2 class='nome_tutorial'>Opções \\\\//</h2><br><br><br><p style='color: cyan'>Sons</p><p>Há como ativar, desativar e regular o volume de alguns sons do game caso necessário</p><hr style='width: 250px;'><p style='color: cyan'>Dificuldade</p><p>É possivel alterar a dificuldade, ela varia em 4 níveis diferentes, com suas característiscas.</p><hr style='width: 250px;'><p style='color: cyan'>Tela de Morte</p><p>Uma Tela de estatísticas aparece quando você perde, caso não queira vê-la ao morrer, pode desativar.</p><hr style='width: 250px;'><p style='color: cyan'>Tema</p><p>Com esta opção é possível travar o tema do jogo em diurno, noturno ou deixar padrão como 'dinâmico'.</p><hr style='width: 250px;'><p style='color: cyan'>Modo Ocioso</p><p>O Modo ocioso trás ao jogador uma opção de um plano de fundo, ele passará diversos itens na tela, simulando um jogo ativo, é possível desativar ele.</p><hr style='width: 250px;'><p style='color: cyan'>Estatísticas para Nerds</p><p>Esta opção irá fazer com que o jogo crie relatórios no console do navegador <span style='color: yellow'>( acessível pressionando a tecla F12 )</span>, com ela ativa você poderá ver vários feedbacks enquanto o jogo é executado.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Settings</h2><br><br><br><p>The settings can be accessed by pressing the ( Z ) key, they allow to modify some game behaviors that are listed below</p><h2 class='nome_tutorial'>Options \\\\//</h2><br><br><br><p style='color: cyan'>Sounds</p><p>It is possible to activate, deactivate and adjust the volume of some sounds in the game if necessary</p><hr style ='width: 250px;'><p style='color: cyan'>Difficulty</p><p>It is possible to change the difficulty, it varies on 4 different levels, with its characteristics.</p><hr style='width: 250px;'><p style='color: cyan'>Death Screen</p><p>A statistics screen appears when you lose, if you don't want to see it when you die, you can disable it.</p><hr style='width: 250px;'><p style='color: cyan'>Theme</p><p>With this option it is possible to lock the game theme in daytime, nighttime or leave the default as 'dynamic'.</p><hr style='width: 250px;'><p style='color: cyan'>Idle Mode</p><p>Idle mode gives the player an option of a background, he will pass several items on the screen, simulating an active game, it is possible to disable it.</p><hr style='width: 250px;'><p style='color: cyan'>Statistics for Nerds</p><p>This option will cause the game to create reports on the browser console<span style='color: yellow'> ( accessible pressing the F12 key )</span>, with it active you can see various feedbacks while the game is running.</p>";
        break;
        case 10:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Recursos Experimentais</h2><br><br><br><p>Há alguns recursos experimentais no jogo, eles são planejados para serem adicionados e já estão no game, porém podem não apresentar o funcionamento esperado às vezes.</p><h2 class='nome_tutorial'>Cuidados</h2><br><br><br><p>Recursos experimentais podem ser ativados, porém aconselha-se ativá-los apenas para fim de testes e visualização prévia.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Experimental Features</h2><br><br><br><p>There are some experimental features in the game, they are planned to be added and are already in the game, but they may not work as expected sometimes.</p><h2 class='nome_tutorial'>Cautions</h2><br><br><br><p>Experimental features can be activated, however it is advisable to activate them only for testing and preview purposes.</p>";
        break;
        case 11:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Estatísticas para Nerds</h2><br><br><br><p>Essas estatísticas são um aglomerado de várias informações que podem ser vistas através do console do navegador, caso queira ver o jogo funcionando em detalhes mais técnicos ative ela e abra o console. ( pressionando F12 )</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Statistics for Nerds</h2><br><br><br><p>These statistics are a cluster of various information that can be viewed through the browser console, if you want to see the game working in more technical details activate it and open the console. ( pressing F12 )</p>";
        break;
        case 12:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Modificadores</h2><br><br><br><p>São itens que podem ser <a href='#' onclick='abre_loja_especial(1)'>comprados</a> ou ganhos e usados durante suas partidas, eles irão modificar a forma como seu jogo irá funcionar, porém só serão válidos durante as próximas 5 partidas.</p><img src='Imagens/Atualiza/mods.png'><br><br><p>Modificadores são destinados as partidas, eles podem acrescentar tempo e vezes de uso em suas partidas.</p><h2 class='nome_tutorial'>Modificando o modificador</h2><br><br><br><p>Você também pode usar outros modificadores para modificar o funcionamento do seu modificador principal, porém note que eles só serão válidos em um número limitado de partidas!</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Modifiers</h2> <br><br><br><p>These are items that can be <a href='#' onclick='abre_loja_especial(1)'>purchased</a> or earned and used during your matches, they will modify the way your game will work, but will only be valid for the next 5 matches.</p><img src='Imagens/Atualiza/mods.png'><br><br><p>are intended for matches, they can add time and usage times to your matches.</p><h2 class='nome_tutorial'>Modifying the modifier</h2><br><br><br><p>You too you can use other modifiers to modify the operation of your main modifier, but note that they will only be valid for a limited number of games!</p>";
        break;
        case 13:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Conquistas</h2><br><br><br><p>Há várias conquistas no Pula Prédios! Você consegue coletar todas? Você pode conferir seu progresso pressionando a tecla ( O ), enquanto estiver fora de uma partida.</p><h2 class='nome_tutorial'>Conquistas Secretas</h2><br><br><br><p>Há algumas conquistas que são secretas, uma dica para elas, leia com atençõn, tente jogar de uma forma que você nunca jogou antes.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Achievements</h2> <br><br><br><p>There are several achievements in Pula Prédios! Can you collect them all? You can check your progress by pressing the ( O ) key while out of a game.</p><h2 class='nome_tutorial'>Secret Achievements</h2><br><br><br><p>There some achievements that are secret, a tip for them, read carefully, try to play in a way you have never played before.</p>";
        break;
        case 14:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Bônus</h2><br><br><br><p>São itens que funcionam de forma parecida com os <a href='#' onclick='exibeTutorial("+ 12 +")'>modificadores</a>, eles são adquiridos através da loja e serão válidos pelas próximas 5 partidas jogadas.</p><h2 class='nome_tutorial'>Itens disponíveis</h2><br><br><br><p>Atualmente possuímos 3 bônus para compra, como o nome já diz, eles irão conceder bônus ao jogador durante a partida.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Bonuses</h2><br><br><br><p> These are items that work similarly to the <a href='#' onclick='exibeTutorial("+ 12 +")'>modifiers</a>, they are acquired through the store and will be valid for the next 5 games played.</p><h2 class='nome_tutorial'>Available items</h2><br><br><br><p>We currently have 3 purchase bonuses, as the name implies, they will grant bonuses to the player during the match.</p>";
        break;
        case 15:
            if(idioma == "pt")
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>História</h2><br><br><br><p>Você foi selecionado para participar de testes super-secretos para uma organização de espiões, eles estão elaborando um veículo que não pode levantar suspeitas em hipótese nenhuma! Assuma a direção deste prédio com rodas, habilidades e propulsores inimagináveis e corra o quanto puder.</p>";
            else
                document.getElementById("item_selecionado").innerHTML = "<h2 class='nome_tutorial'>Story</h2><br><br><br><p>You have been selected to participate in top secret tests for an espionage organization, they are designing a vehicle that cannot arouse suspicion under any circumstances! Take command of this building with wheels, skills and unimaginable thrusters and run as much as you can.</p>";
        default:
            $("#tutoriais_2").animate({ scrollTop: 0 }, "slow");
        break;
    }

    $("#tutoriais_2").animate({ scrollTop: 0 }, "slow");
}

function repete_tutorial(){
    indice_tutorial = 0;
    executa_tutorial(null, 1);
}

function executa_tutorial(requisicao_auto, especial){

    if(tut_complet == 0){

        $("#tutorial_em_jogo").fadeIn();

        estadoAtual = estados.tutorial;

        if(indice_tutorial == 2)
            freia_predio();

        let tutorial_hist = ["Olá, é um prazer ter você por aqui!", "Vamos parar o veículo de testes para você entrar", "Suba lá e se arrume", "Nós estamos testando esse novo veículo e queremos ter certeza que ele é bom", "Tudo o que você precisa fazer é pilotar ele...", "Vamos começar!"];

        if(idioma == "en")
            tutorial_hist = ["Hello, it's a pleasure to have you here!", "We will stop the test vehicle for you to enter", "Get up there and get ready", "We are testing this new vehicle and we want to make sure that it is good", "All you have to do is drive it...", "Let's start!"];

        let el = document.getElementById("frase_tuto_em_game");
        
        if(requisicao_auto == null && indice_tutorial < tutorial_hist.length){
            el.innerHTML = "";
            showtext(el, tutorial_hist[indice_tutorial], 1);
        }

        if(requisicao_auto)
            $(".avancar_tuto").fadeIn();

        if(indice_tutorial == tutorial_hist.length){
            controles_tutorial();
            $("#tutorial_em_jogo").fadeOut();
        }
    }
}

function controles_tutorial(){

    indice_tutorial = 6;
    acelera_predio();
    
    $("#placeholder_controles").fadeIn();
    
    setTimeout(function(){
        $("#placeholder_controles").fadeOut();
        localStorage.setItem("tutorialCompleto", 1);

        confirma_inicio_partida();
    }, 10000);
}

function avanca_tutorial(){
    indice_tutorial++;
    executa_tutorial();
}

function pular_tutorial(){
    $("#tutorial_em_jogo").fadeOut();
    indice_tutorial = 6;

    localStorage.setItem("tutorialCompleto", 1);
    confirma_inicio_partida();
}