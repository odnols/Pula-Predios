const usuario = {}

function checa_user() {

    if (!usuario.token)
        create_user()
    else
        alert(`${translations["perfil.token"]} ${usuario.token}`)
}

function create_user() {

    fetch('https://alonpi.discloud.app/pula?token=placholder&new=1')
        .then(res => res.json())
        .then(retorno => {

            if (retorno.status == 404)
                return alert(translations["perfil.erro_api"])

            usuario.token = retorno.token
            localStorage.setItem("pul4Pr3dios-token_user", usuario.token)

            alert(`${translations["perfil.token"]} ${retorno.token}`)
        })
        .catch(err => console.log(err))
}