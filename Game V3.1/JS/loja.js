var identificadores = ["Skins", "Modificadores", "Bônus"];


function carrega_dados_loja(categoria_loja){

    $("#sessao_loja").fadeIn();

    document.getElementById("categoria_loja").innerHTML = identificadores[categoria_loja];
    carrega_vendas_loja(identificadores[categoria_loja]);
}

function carrega_vendas_loja(caso){

    var listaPrecos = [100, 150, 200, 250, 300, 350, 350];
    var nomeSkins = ["Vermelho", "Branco", "Amarelo", "Azul", "Roxo", "Verde"];

    if(caso == "Skins"){
        document.getElementById("categoria_teaser").innerHTML = "Mude a sua aparência por aqui ;)";

        document.getElementById("placeholder_loja").innerHTML = "";

        if(jogador.skin != 7)
            document.getElementById("placeholder_loja").innerHTML += "<div class='item_comprado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='Imagens/Sprites/Jogador/Jogador7_noite.png'><br><br>Padrão</div>";
        else
            document.getElementById("placeholder_loja").innerHTML += "<div class='item_equipado' onclick='confirma_compra(1, 7)'><img class='img_skin_venda' src='Imagens/Sprites/Jogador/Jogador7_noite.png'><br><br>Padrão</div>";

        for(var i = 0; i < 6; i++){
            if(jogador.skins_compradas[i] != 1) // Item a venda
                document.getElementById("placeholder_loja").innerHTML += "<div class='item_venda' onclick='confirma_compra(1, "+ i +")'> <img class='img_skin_venda' src='Imagens/Sprites/Jogador/Jogador"+ (i + 1) +"_noite.png'><br><br>"+ nomeSkins[i] +" <div class='preco_item'> $"+ listaPrecos[i] +"</div> </div>";
            else if(jogador.skin != [i]) // Item Comprado
                document.getElementById("placeholder_loja").innerHTML += "<div class='item_comprado' onclick='confirma_compra(1, "+ i +")'><img class='img_skin_venda' src='Imagens/Sprites/Jogador/Jogador"+ (i + 1) +"_noite.png'><br><br>"+ nomeSkins[i] +"</div>";
            else                         // Item Equipado
                document.getElementById("placeholder_loja").innerHTML += "<div class='item_equipado' onclick='confirma_compra(1, "+ i +")'><img class='img_skin_venda' src='Imagens/Sprites/Jogador/Jogador"+ (i + 1) +"_noite.png'><br><br>"+ nomeSkins[i] +"</div>";
        }

    }else if(caso == "Modificadores"){

        document.getElementById("categoria_teaser").innerHTML = "Bota mod em tudo! <br><h4 style='color: red;'>( ! ) Estes recursos são experimentais ( ! )</h4>";

        var listaPrecos = [50, 50];
        var descricao = ["+ Tempo", "+ Vezes"];
        var nomeImagem = ["relogio.gif", "Jump_Boost.png"];

        document.getElementById("placeholder_loja").innerHTML = "";

        for(var i = 0; i < 2; i++){
            if(jogador.especs_comprados[i] != 1) // Item a venda
                document.getElementById("placeholder_loja").innerHTML += "<div class='especial_venda' onclick='confirma_compra(2, "+ i +")'> <img class='img_especial_venda' src='Imagens/Sprites/Acervo/"+ nomeImagem[i] +"'><br><br>"+ descricao[i] +" <div class='preco_item'> $"+ listaPrecos[i] +"</div> </div>";
            else // Item Comprado
            document.getElementById("placeholder_loja").innerHTML += "<div class='especial_equipado' onclick='confirma_compra(2, "+ i +")'> <img class='img_especial_venda' src='Imagens/Sprites/Acervo/"+ nomeImagem[i] +"'><br><br>"+ descricao[i] +"</div>";
        }      
    }else{
        document.getElementById("categoria_teaser").innerHTML = "Adquira uns Bônus!";

        document.getElementById("placeholder_loja").innerHTML = "<div class='item_venda' onclick='confirma_compra(1, 7)'><img src='Imagens/Sprites/Jogador/jogador7_noite.png'><br><br>Padrão</div> <div class='item_venda' onclick='confirma_compra(1, 0)'><img src='Imagens/Sprites/Jogador/Jogador1_noite.png'><br><br>Vermelho</div> <div class='item_venda' onclick='confirma_compra(1, 1)'><img src='Imagens/Sprites/Jogador/Jogador2_noite.png'><br><br>Branco</div><div class='item_venda' onclick='confirma_compra(1, 2)'><img src='Imagens/Sprites/Jogador/Jogador3_noite.png'><br><br>Amarelo</div> <div class='item_venda' onclick='confirma_compra(1, 3)'><img src='Imagens/Sprites/Jogador/Jogador4_noite.png'><br><br>Azul</div> <div class='item_venda' onclick='confirma_compra(1, 4)'><img src='Imagens/Sprites/Jogador/Jogador5_noite.png'><br><br>Roxo</div> <div class='item_venda' onclick='confirma_compra(1, 5)'><img src='Imagens/Sprites/Jogador/Jogador6_noite.png'><br><br>Verde</div>";  
    }
}

function confirma_compra(categoria, item){
    if(categoria == 1){ // Skins

        listaPrecos = [100, 150, 200, 250, 300, 350, 350];

        if(jogador.skins_compradas[item] != 1){
            if(moedas >= listaPrecos[item]){
                confirmacao = confirm("Deseja realmente gastar $"+ listaPrecos[item] +" nesta compra?");
                
                if(confirmacao){

                    jogador.skins_compradas[item] = 1;
                    jogador.skin = item;

                    localStorage.setItem("skinAtual", jogador.skin);
                    localStorage.setItem("skinsCompradas", jogador.skins_compradas);

                    debita_compra(listaPrecos[item]);
                    document.getElementById("mensagem_teaser").innerHTML = "Compra concluída, Skin atualizada!";
                }else
                    document.getElementById("mensagem_teaser").innerHTML = "Compra cancelada.";
            }else
                document.getElementById("mensagem_teaser").innerHTML = "Você não possuí moedas suficientes para comprar este item.";
        }else{
            
            document.getElementById("mensagem_teaser").innerHTML = "Skin Alterada";

            jogador.skin = item;
            localStorage.setItem("skinAtual", jogador.skin);
        }
    }else if(categoria == 2){ // Especiais
        listaPrecos = [50, 50];

        if(jogador.especs_comprados[item] == 0){
            if(moedas >= listaPrecos[item]){

                if(item == 0)
                    texto = "Deseja realmente comprar está melhoria? Ela será válida pelos próximos 5 partidas.";
                else
                    texto = "Deseja realmente comprar está melhoria? Ela será válida pelos próximos 5 partidas.";
                confirmacao = confirm(texto);

                if(confirmacao){

                    jogador.especs_comprados[item] = 1;
                    jogador.especs_vezes_usados[item] = 5;
                    
                    localStorage.setItem("especsComprados", jogador.especs_comprados);
                    localStorage.setItem("especsCompradosUsados", jogador.especs_vezes_usados);

                    debita_compra(listaPrecos[item]);
                    document.getElementById("mensagem_teaser").innerHTML = "Compra confirmada, aproveite!";
                }else
                    document.getElementById("mensagem_teaser").innerHTML = "Compra cancelada.";
            }else
                document.getElementById("mensagem_teaser").innerHTML = "Você não tem moedas suficientes para comprar este item.";
        }else
            document.getElementById("mensagem_teaser").innerHTML = "Você já possuí este item e ele está ativo.";

        sincronizaEspeciaisComprados(1);
    }

    $("#mensagem_teaser").fadeIn();

    esconde_teaser = setTimeout(function(){
        $("#mensagem_teaser").fadeOut();
        clearTimeout(esconde_teaser);
    }, 3000);
}

function debita_compra(valor){

    if(jogo.estatisticasNerds == 1)
        console.log("%cCompra confirmada, retirado $"+ valor +" do jogador", "color: orange;")
    moedas -= valor;

    localStorage.setItem("moedas", moedas);
    document.getElementById("notifica_moeda").innerHTML = "$"+ moedas;
}

function fechar_sessao_loja(){
    $("#sessao_loja").fadeOut();
}