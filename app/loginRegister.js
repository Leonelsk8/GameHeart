const userLog = JSON.parse(localStorage.getItem('UsuarioActivo'));
const comprobar = (compr) => {
  if(compr != undefined){
    window.location = './index.html';
  }
};
comprobar(userLog);

const iniciarSesion = () => {
  const email = document.login.usuario.value.toLowerCase();
  const password = document.login.password.value;
  const validationEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  let existe = false;
  if (!validationEmail.test(email)){
    alert('Formato de email incorrecto');
    return;
  }
  fetch('http://localhost:3000/usuarios/')
  .then((resp) => resp.json())
  .then((resp) => {
    resp.map((user) =>{
      if(user.email.toLowerCase() === email && user.password === password){
        existe = true;
        let userLogueado = user;
        localStorage.setItem('UsuarioActivo', JSON.stringify(userLogueado));
        window.location = './index.html';
      }
    })
    if(!existe){
      alert('Usuario o contraseña invalido.');
    }
  }) 
  .catch((error) => console.log(error))
};

const registrar = () => {
  const nombre = document.registro.nombre.value;
  const email = document.registro.usuario.value.toLowerCase();
  const validationEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!validationEmail.test(email)){
    alert('Formato de email incorrecto');
    return;
  }
  const password = document.registro.password.value;
  if(password === document.registro.password2.value){
    let evaluar=false;
      fetch('http://localhost:3000/usuarios/')
      .then((resp) => resp.json())
      .then((resp) => {
      for(let i=0; i<resp.length; i++){
        if(resp[i].email === email){
          document.getElementById('emailmesag').classList.replace('d-none', 'd-block');
          evaluar=true;
          break;
        }else {document.getElementById('emailmesag').classList.replace('d-block', 'd-none');}
        if(resp[i].nombre === nombre){
          document.getElementById('nomUsu').classList.replace('d-none', 'd-block');
          evaluar=true;
          break;
        }else{document.getElementById('nomUsu').classList.replace('d-block', 'd-none');}
      }
      }) 
      .catch((error) => console.log(error));

      document.getElementById('load').classList.replace('d-none', 'd-flex');

      setTimeout(() => {
        if(!evaluar){
          document.getElementById('loaderMesage').innerText = 'Registrado';
          let check = document.createElement('img');
          check.setAttribute('src', './img/check circle.png');
          check.className = 'checkV';
          document.getElementById('circleLoad').classList.remove('loader');
          document.getElementById('circleLoad').appendChild(check);
          setTimeout(() => {
            fetch('http://localhost:3000/usuarios/', {
            method: 'POST',
            body: JSON.stringify({
            nombre: nombre,
            email: email, 
            password: password
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
            })
            .then((resp) => resp.json())
            .then((resp) => console.log(resp))
            .catch((error) => console.log(error))
            window.location.reload();
          },1000);
        }else if(evaluar){
          document.getElementById('load').classList.replace('d-flex', 'd-none');
        }
      },1300);

  }else{
    let mens = document.createElement('div');
    mens.innerText = 'Las contraseñas no coinciden';
    mens.className = 'text-danger';
    document.getElementById('pass2').appendChild(mens);
  }
};

const registerChange = () =>{
  document.getElementById('divNoFormRegister').classList.add('animate__animated', 'animate__bounceOutUp');
  document.getElementById('divNoFormLogin').classList.replace('d-none', 'd-flex');
  document.getElementById('divNoFormLogin').classList.replace('animate__bounceOutUp', 'animate__bounceInDown');
  document.getElementById('nav-log').classList.remove('active');
  document.getElementById('nav-reg').classList.add('active');
  document.getElementById('logSM').classList.add('d-none');
  document.getElementById('regSM').classList.remove('d-none');
}

const loginChange = () =>{
  document.getElementById('divNoFormLogin').classList.replace('animate__bounceInDown', 'animate__bounceOutUp');
  document.getElementById('divNoFormRegister').classList.replace('animate__bounceOutUp', 'animate__bounceInDown');
  document.getElementById('nav-reg').classList.remove('active');
  document.getElementById('nav-log').classList.add('active');
  document.getElementById('logSM').classList.remove('d-none');
  document.getElementById('regSM').classList.add('d-none');
}