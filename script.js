

const result = document.getElementById('result');

const filter = document.getElementById('filter');
filter.addEventListener('input', (e) => filterData(e.target.value));

const select = document.getElementById('select');
select.addEventListener('change',(e)=> searchByCountry(e.target.value));


//declarar um array chamado listItens
let listItens = [];


// declarar um array de nomes

let listNames = [
  { picture:'https://randomuser.me/api/portraits/women/90.jpg', country: 'Brasil', name: 'Ana Santos', age: 20, city:'São Paulo'}, 
  { picture:'https://randomuser.me/api/portraits/women/61.jpg', country: 'Brasil', name: 'Dalva Duarte', age: 54, city:'São Roque'},
  { picture:'https://randomuser.me/api/portraits/women/94.jpg', country: 'Brasil', name: 'Nayra Louise', age: 33, city:'Cajamar'},
];

let dataJson = `
  {
    "results": 
    [
      {
        "id": 1,
        "name": "Caio Duarte",
        "age": 34,
        "city": "Cajamar",
        "country": "Brasil",
        "picture": "https://randomuser.me/api/portraits/men/59.jpg",
        "hobby":{
          "first": "Jogos de PC",
          "second": "Escutar música"
        }
      },

      {
        "id": 2,
        "name": "Ricardo Alves",
        "age": 23,
        "city": "Roma",
        "country": "Itália",
        "picture": "https://randomuser.me/api/portraits/men/18.jpg",
        "hobby":{
          "first": "Assistir Filmes",
          "second": "Jogar Futebol"
        }
      },

      {
        "id": 2,
        "name": "Sandro Alves",
        "age": 58,
        "city": "Lisboa",
        "country": "Portugal",
        "picture": "https://randomuser.me/api/portraits/men/49.jpg",
        "hobby":{
          "first": "Assistir Filmes",
          "second": "Jogar Futebol"
        }
      }
      
    ]
  }
`


//Convertendo um JSON em um objeto javascript
let response = JSON.parse(dataJson);
//Exibir o conteudo da variável no console
//console.log(response)

//Declarar um array chamado listResults
//let listResults = response.results
let listResults = []
// Exibindo conteudo na aba console do navegador
//console.log(listNames);

//Listar os nomes das pessoas
async function getData(){

  const res = await fetch('https://randomuser.me/api/?results=20');

  //console.log(res.status);
  //let data = await res.json();
  const {results} = await res.json();
  console.log(results);



  //removendo todos os itens da ul result
  result.innerHTML = '';

  //1º usar a função forEach do JS para percorrer os itens do array listNames
  results.forEach(user => {

    //2º Criar um elemento <li> com o item do array
    const li = document.createElement('li');

    listItens.push(li);
    listResults.push(user)
    li.innerHTML= `
      <img src= "${user.picture.large}" alt= "${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first}</h4>
        <p>${user.location.city} | ${user.location.country}</p>
        <p>${user.dob.age} anos</p>
      </div>
    `;

    //3º Adiciona o <li> como o item na lista result
    result.appendChild(li);
  })
}

//Criar a função filterData

function filterData(searchTerm){
  listItens.forEach(item =>{
    if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
      item.classList.remove('hide');


    }else{
      item.classList.add('hide');


    }
  });



}

//Criar a função que pesquisa por país
function searchByCountry(value){
  console.log("o país selecionado foi: " + value);

  //limpar os itens da nossa lista
  result.innerHTML = '';

  listResults.forEach(user => {

    if(user.location.country === value){
      //Criar um elemento <li> com o item do array
      const li = document.createElement('li');

     li.innerHTML= `
      <img src= "${user.picture.large}" alt= "${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first}</h4>
        <p>${user.location.city} | ${user.location.country}</p>
        <p>${user.dob.age} anos</p>
      </div>
    `;

      //Adiciona o <li> como o item na lista result
      result.appendChild(li);

    }


  })

}
