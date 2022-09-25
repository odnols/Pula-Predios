const usuario = {}

function create_user() {

    fetch('http://apisal.herokuapp.com/pula?token=placholder&new=1')
        .then(res => res.json())
        .then(retorno => {

            if (retorno.status == 404)
                return alert("Houve um erro com a API")

            usuario.token = retorno.token
            alert(`Use este token com o Alonsal: ${retorno.token}`)
        })
        .catch(err => console.log(err))
}

function checa_user() {

    if (!usuario.token)
        create_user()
}