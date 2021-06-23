// Escolhe o som que irá tocar ao iniciar, morrer e pegar moedas
function escolhe_som(ocasiao, evento){
    escolha = 1 + Math.round(4 * Math.random());
    var nome;

    if(ocasiao == 1)
        nome = "comeca_"+ escolha +".ogg";
    else if(ocasiao == 2)
        if(evento != 1)
            nome = "morreu_"+ escolha +".ogg";
        else
            nome = "morreu_6.ogg";

    return nome;
}

function executaSons(elemento, nomeSom, tipo){

    if(jogo.estadoSom != 0){ // Verifica se a reprodução de sons não está desativada
        if(tipo == 1)       // Efeitos
            var volume_interno = localStorage.getItem("volEfeito");
        else if(tipo == 2)  // Músicas
            var volume_interno = localStorage.getItem("volMusica");

        var audio = document.getElementById(elemento);
        audio.volume = volume_interno / 100;

        audio.src = "Sons/" + nomeSom;
        audio.play();
    }
}

function executaSons2(elemento, nomeSom, tipo){
    if(jogo.estadoSom != 0){ // Verifica se a reprodução de sons não está desativada
        if(tipo == 1)       // Efeitos
            var volume_interno = localStorage.getItem("volEfeito");
        else if(tipo == 2)  // Músicas
            var volume_interno = localStorage.getItem("volMusica");

        var audio = document.getElementById(elemento);
        audio.volume = volume_interno / 100;
        audio.src = "Sons/" + nomeSom;
        audio.play();
    }
}

// Altera o Volume dos Sons e Salva no Sistema
function alteraVolume(volume, entidade, auto){

    if(jogo.estadoOcioso == 1){
        impedeOcioso();
    }
    
    if(entidade == 1){
        var audio = document.getElementById("musicas");
        localStorage.setItem("volMusica", volume);

        if(auto != null)
            executaSons("musicas", "intro2.ogg", 2);
    }else{
        var audio = document.getElementById("efeitos");
        localStorage.setItem("volEfeito", volume);

        var audio2 = document.getElementById("efeitos2");
        audio2.volume = volume / 100;
        
        var ambiente = document.getElementById("ambiente");
        ambiente.volume = volume / 100;

        var pisoes = document.getElementById("pisoes");
        pisoes.volume = volume / 100;

        if(auto != null)
            executaSons("efeitos", "pop.ogg", 1);
    }

    audio.volume = volume / 100;
}

// Executada automaticamente quando a página carrega, ela ajusta o volume para o valor salvo
function carrega_volume(volume, entidade){
    
    if(entidade == 1)
        document.getElementById("volume_musica").value = volume;
    else
        document.getElementById("volume_efeitos").value = volume;

    alteraVolume(volume, entidade);
}

function desliga_som(entidade, tipo){
    if(tipo == 1)
        var volume_interno = localStorage.getItem("volEfeito");
    else
        var volume_interno = localStorage.getItem("volMusica");
    
    var pausa_som = document.getElementById(entidade);
    var salva_volume = volume_interno;

    regulador_som = setInterval(() => {
        if(volume_interno > 0.1){
            
            volume_interno -= 0.1;
            pausa_som.volume = volume_interno / 100;
        }else{
            clearInterval(regulador_som);
            pausa_som.pause();
            pausa_som.volume = salva_volume / 100;

            if(entidade == "ambiente"){
                clearTimeout(vento_delay);
                segura_vento = 0;
            }
        }
    }, 10);
}

function desliga_som2(entidade, tipo){
    if(tipo == 1)
        var volume_interno = localStorage.getItem("volEfeito");
    else
        var volume_interno = localStorage.getItem("volMusica");

    var pausa_som = document.getElementById(entidade);
    var salva_volume = volume_interno;

    regulador_som2 = setInterval(() => {
        if(volume_interno > 0.1){
            
            volume_interno -= 0.1;
            pausa_som.volume = volume_interno / 100;
        }else{
            clearInterval(regulador_som2);
            pausa_som.pause();
            pausa_som.volume = salva_volume / 100;

            if(entidade == "ambiente"){
                clearTimeout(vento_delay);
                segura_vento = 0;
            }
        }
    }, 10);
}