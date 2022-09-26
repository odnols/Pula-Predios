const usuario = {}

function checa_user() {

    if (!usuario.token)
        create_user()
    else
        alert(`Use este token com o Alonsal: ${usuario.token}`)
}

function create_user() {

    fetch('https://apisal.herokuapp.com/pula?token=placholder&new=1')
        .then(res => res.json())
        .then(retorno => {

            if (retorno.status == 404)
                return alert("Houve um erro com a APISAL")

            usuario.token = retorno.token
            localStorage.setItem("token_user", usuario.token)

            alert(`Use este token com o Alonsal: ${retorno.token}`)
        })
        .catch(err => console.log(err))
}