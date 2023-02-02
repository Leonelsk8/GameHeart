const userLog = JSON.parse(localStorage.getItem('UsuarioActivo'));
const comprobar = (compr) => {
  if(compr == undefined){
    window.location = './login.html';
  }else{
    let usu = document.createElement('h2');
    usu.className = 'text-white animate__animated animate__fadeInLeft';
    usu.innerText = `Bienvenido ${userLog.nombre}`
    document.getElementById('welcome').appendChild(usu);
    let log = document.createElement('img');
    log.setAttribute('src', './img/logo.png');
    log.setAttribute('style', 'width: 110px;');
    log.className = 'animate__animated animate__fadeInDown'
    document.getElementById('welcome').appendChild(log);
    fetch('http://localhost:3000/posts/')
    .then((resp) => resp.json())
    .then((resp) => {
      for(let i=resp.length-1; i>resp.length-4 ; i--){
        let card = document.createElement('div');
        card.className = 'card col-11 col-md-9 my-2 my-lg-0 col-lg-3 mx-lg-4 text-white';
        card.innerHTML = `<img src="./img/id${resp[i].id}.jpg" class="card-img-top mt-2 border border-1 border-white" alt="img${resp[i].titulo}">
        <div class="card-body d-flex flex-column justify-content-between">
          <p class="d-none card-id">${resp[i].id-1}</p>
          <div>
            <h5 class="card-title text-center border-bottom border-1 border-white pb-2">${resp[i].titulo}</h5>
            <p class="card-text">${resp[i].descripcion}</p>
          </div>
          <div class="d-flex flex-wrap justify-content-between">
            <a href="${resp[i].linkTrailer}" target="_blank" class="btn mt-2 btn-primary">Ver trailer</a>
            <div class="text-center py-2 px-3 mt-2 text-white bg-secondary">Estreno: ${resp[i].fechaEstreno}</div>
          </div>
        </div>`
        document.getElementById('cardsContainer').appendChild(card);
      }
    }) 
    .catch((error) => console.log(error));
  }
};
comprobar(userLog);

const fleDerecha = () =>{
  let text = '';
  let cards = document.getElementsByClassName('card-id');
  let index = parseInt(cards[cards.length-1].textContent);
  fetch('http://localhost:3000/posts/')
    .then((resp) => resp.json())
    .then((resp) => {
      if(index != 0){
        for(let i=index-1; i>=index-3 ; i--){
          if(i>-1){
            let card = 
            `<div class="card col-11 col-md-9 my-2 my-lg-0 col-lg-3 mx-lg-4 text-white">
              <img src="./img/id${resp[i].id}.jpg" class="card-img-top mt-2 border border-1 border-white" alt="img${resp[i].titulo}">
              <div class="card-body d-flex flex-column justify-content-between">
                <p class="d-none card-id">${resp[i].id-1}</p>
                <div>
                  <h5 class="card-title text-center border-bottom border-1 border-white pb-2">${resp[i].titulo}</h5>
                  <p class="card-text">${resp[i].descripcion}</p>
                </div>
                <div class="d-flex flex-wrap justify-content-between">
                  <a href="${resp[i].linkTrailer}" target="_blank" class="mt-2 btn btn-primary">Ver trailer</a>
                  <div class="text-center py-2 px-3 mt-2 text-white bg-secondary">Estreno: ${resp[i].fechaEstreno}</div>
                </div>
              </div>
            </div>`;
            text = text + card;
          }
        }
        document.getElementById('cardsContainer').classList.remove('effect','effectDer','effectIzq');
        setTimeout(()=>{
          document.getElementById('cardsContainer').classList.add('effectDer');
          document.getElementById('cardsContainer').innerHTML = text;
        },8);
      }
    }) 
    .catch((error) => console.log(error));
}

const fleIzquie = () =>{
  let text = '';
  let cards = document.getElementsByClassName('card-id');
  let index = parseInt(cards[0].textContent);
  fetch('http://localhost:3000/posts/')
    .then((resp) => resp.json())
    .then((resp) => {
      if(resp.length > index+1){
        for(let i=index+3; i>=index+1 ; i--){
          let card = 
          `<div class="card col-11 col-md-9 my-2 my-lg-0 col-lg-3 mx-lg-4 text-white">
            <img src="./img/id${resp[i].id}.jpg" class="card-img-top mt-2 border border-1 border-white" alt="img${resp[i].titulo}">
            <div class="card-body d-flex flex-column justify-content-between">
              <p class="d-none card-id">${resp[i].id-1}</p>
              <div>
                <h5 class="card-title text-center border-bottom border-1 border-white pb-2">${resp[i].titulo}</h5>
                <p class="card-text">${resp[i].descripcion}</p>
              </div>
              <div class="d-flex flex-wrap mt-2 justify-content-between">
                <a href="${resp[i].linkTrailer}" target="_blank" class="mt-2 btn btn-primary">Ver trailer</a>
                <div class="text-center py-2 px-3 text-white mt-2 bg-secondary">Estreno: ${resp[i].fechaEstreno}</div>
              </div>
            </div>
          </div>`;
          text = text + card;
        }
        document.getElementById('cardsContainer').classList.remove('effectCen','effectDer','effectIzq');
        setTimeout(()=>{
          document.getElementById('cardsContainer').classList.add('effectIzq');
          document.getElementById('cardsContainer').innerHTML = text;
        },8);
      }
    }) 
    .catch((error) => console.log(error));
}

fetch('http://localhost:3000/comments/')
.then((resp) => resp.json())
.then((resp) => {
  let text = 
  `<div class="bg-dark py-2 px-3 my-1 text-white borders">
    <div class="d-flex align-items-center">
      <h4 class="me-3">${userLog.nombre}</h4>
      <textarea class="form-control" style="resize:none; height:65px;" placeholder="Haz un comentario.." id="comment"></textarea>
    </div>
    <div class="d-flex justify-content-end mt-2">
      <button type="button" class="btn btn-primary" onclick="comment()">Comentar</button>
    </div>
  </div>`;
  for(let i=resp.length-1; i>resp.length-4; i--){
    let comment = 
    `<div class="bg-dark py-2 px-3 my-1 text-white borders">
      <div class="d-flex border-bottom border-1 border-white align-items-center">
        <h4 class="me-3">${resp[i].author}</h4>
        <p style="font-size: 12px;" class="text-ligth" >Publicado:<br> ${resp[i].fecha}</p>
      </div>
      <p class="mt-2">${resp[i].comment}</p>
      <p class="d-none indiceComment">${resp[i].id-1}</p>
    </div>`;
    text = text + comment;
  }
  document.getElementById('commentsContainer').innerHTML = text;
}) 
.catch((error) => console.log(error));

const verMascomment = () => {
  fetch('http://localhost:3000/comments/')
  .then((resp) => resp.json())
  .then((resp) => {
    let arrayComment = document.getElementsByClassName('indiceComment');
    let indice = arrayComment[arrayComment.length-1].textContent;
    if(indice > 0){
      for(let i=indice-1; i>indice-4 && i>-1; i--){
        let comments = document.createElement('div');
        comments.className = 'bg-dark py-2 px-3 my-1 text-white borders';
        let text = 
        `
        <div class="d-flex border-bottom border-1 border-white align-items-center">
          <h4 class="me-3">${resp[i].author}</h4>
          <p style="font-size: 12px;" class="text-ligth" >Publicado:<br> ${resp[i].fecha}</p>
        </div>
        <p class="mt-2">${resp[i].comment}</p>
        <p class="d-none indiceComment">${resp[i].id-1}</p>
        `;
        comments.innerHTML = text;
        document.getElementById('commentsContainer').classList.add('commentsScroll')
        document.getElementById('commentsContainer').appendChild(comments);
      }
    }
  }) 
  .catch((error) => console.log(error));
}

const comment = () =>{
  let text = document.getElementById('comment').value;
  if(text.length > 0){
    const fecha = new Date();
    let day = fecha.getDate();
    let month = fecha.getMonth()+1;
    let year = fecha.getFullYear();
    let hour = fecha.getHours();
    let minute = fecha.getMinutes();
    fetch('http://localhost:3000/comments/', {
      method: 'POST',
      body: JSON.stringify({
      author: userLog.nombre,
      comment: text,
      usuarioId: userLog.id,
      fecha: `${day}/${month}/${year} - ${hour}:${minute}hs`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error))
  }else{
    alert('No escribiste nada');
  }
}

const closeSesion = () => {
  localStorage.clear();
  window.location = './login.html';
};

const modal = () =>{
  document.getElementById('modal').innerHTML = `
  <h5 class="mb-3">Nombre de usuario: ${userLog.nombre}</h5>
  <h5 class="mb-3">Correo Electronico: ${userLog.email}</h5>
  <div id="changePass">
    <button class="btn btn-primary" onclick="passwordChange()">Cambiar contraseña</button>
  </div>`;
};

const passwordChange = () =>{
  document.getElementById('changePass').innerHTML= `
  <form name="changePassword" class="row">
    <div class="mb-3 col-12 col-md-6">
      <label for="exampleInputPassword" class="form-label">Contraseña actual</label>
      <input type="password" class="form-control border border-primary" name="password1" value="" id="exampleInputPassword">
    </div>
    <div class="mb-3 col-12 col-md-6" id="pass2">
      <label for="exampleInputPassworddd" class="form-label">Contraseña nueva</label>
      <input type="password" class="form-control border border-primary" name="password2" value="" id="exampleInputPassworddd">
    </div>
    <div>
      <button type="button" onclick="modifiedPass()" class="btn btn-primary">Cambiar</button>
    </div>
  </form>
  `;
}

const modifiedPass = ()=>{
  const actuallyPass = document.changePassword.password1.value;
  const newPass = document.changePassword.password2.value;
  if(actuallyPass === userLog.password){
    fetch(`http://localhost:3000/usuarios/${userLog.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      nombre: userLog.nombre,
      email: userLog.email,
      password: newPass
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
    alert('Contraseña modificada');
    userLog.password = newPass;
    localStorage.clear();
    localStorage.setItem('UsuarioActivo', JSON.stringify(userLog));
    window.location.reload();
  }else{
    alert('Contraseña actual no coincide');
  }
}