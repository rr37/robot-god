
// const RecipeList = JSON.parse(localStorage.getItem('Recipe')) || []

const BASE_URL = "https://user-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const friendList = document.querySelector('#friend-list')
const friendData = JSON.parse(localStorage.getItem('Recipe')) || []
let filteredFriends = []
const paginator = document.querySelector('#paginator')
const Friends_PER_PAGE = 12


function getFriendsByPage(page) {
  const data = filteredFriends.length ? filteredFriends : friendData
  const startIndex = (page - 1) * Friends_PER_PAGE
  return data.slice(startIndex, startIndex + Friends_PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / Friends_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `
    <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `
  }
  paginator.innerHTML = rawHTML
}

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  showFriendList(getFriendsByPage(page))
})

function showFriendList(data) {
  let favoriteFriends = JSON.parse(localStorage.getItem('Recipe')) || []
  let rawHTML = ''
  rawHTML += `<div class="d-flex flex-column col-12 align-items-center ">`
  for (let i = 0; i < data.length; i++) {
    console.log(i)
    rawHTML += `
    <div class="d-flex flex-row align-items-center">
      <div class="fs-3">${i / 3 + 1}.   </div>
      <div class="card m-2" data-id=${data[i].id}>
        <img class = "show-friend" src=${data[i].avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i].id}>
        <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i].id}>
        </div>
      </div>
      <div class="plus fs-3">+</div>
      <div class="card m-2" data-id=${data[i + 1].id}>
        <img class = "show-friend" src=${data[i + 1].avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i + 1].id}>
        <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i + 1].id}>
        </div>
      </div>
      <div class="equal fs-3">=</div>
      <div class="card m-2" data-id=${data[i + 2].id}>
        <img class = "show-friend" src=${data[i + 2].avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i + 2].id}>
        <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${data[i + 2].id}>
        </div>
      </div>
    </div d-flex flex-row>
    `
    i += 2


  }
  rawHTML += `</div >`
  // data.forEach((item) => {
  //   console.log(item.avatar)
  //   rawHTML += `
  //     <div class="card m-2" data-id=${item.id}>
  //       <img class = "show-friend" src=${item.avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
  //       <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
  //       </div>
  //     </div>
  //   `
  // })
  friendList.innerHTML = rawHTML
}

function showFriendModal(id) {
  const modalTitle = document.querySelector('.modal-title')
  const modalAvatar = document.querySelector('.modal-avatar')
  const modalInfo = document.querySelector('.modal-info')

  modalTitle.innerText = ''
  modalInfo.innerText = ''
  modalAvatar.src = ''
  // console.log(modalInfo)
  console.log(INDEX_URL + id)

  axios
    .get(INDEX_URL + Number(id))
    .then((response) => {
      const data = response.data
      console.log(data)
      modalTitle.innerText = data.name + data.surname
      modalInfo.innerHTML = `     
    <p class="email">email: ${data.email}</p>
    <p class="gender">gender: ${data.gender}</p>
    <p class="age">age: ${data.age}</p>
    <p class="region">region: ${data.region}</p>
    <p class="birthday">birthday: ${data.birthday}</p>`
      modalAvatar.src = data.avatar
    })
}

friendList.addEventListener('click', function onClicked(event) {
  console.log(event.target.dataset.id)
  if (event.target.matches('.show-friend')) {
    showFriendModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-add-favorite')) {
    toggleFavorite(Number(event.target.dataset.id))
  }
})

// console.log(friendList)

// Search function //////////////////////////////////////

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// searchForm.addEventListener('submit', function onSearchFormSubmitted(event){
//   event.preventDefault()

//   let keyword = searchInput.value.trim().toLowerCase()

//   filteredFriends = friendData.filter( (friend) => 
//     friend.name.toLowerCase().includes(keyword)
//   )

//   if (filteredFriends.length === 0){
//     alert(`????????????????????????${keyword} ????????????,??????????????????????????????`)
//     showFriendList(friendData)
//   } else {
//     showFriendList(filteredFriends)
//   }

//   searchInput.value = ''

//   renderPaginator(filteredFriends.length)
//   showFriendList(getFriendsByPage(1))

//   // console.log(filteredFriends)
//   // console.log(keyword)
// })

function toggleFavorite(id) {
  console.log(id)
  let friendIndex = 0
  const friend = friendData.find(friend => friend.id === id)
  if (friendData.some((friend) => friend.id === id)) {
    friendIndex = friendData.findIndex((friend) => friend.id === id)
    if (friendIndex === -1) return
    if (confirm(`??????????????? ${friend.name} ????????????????????????`)) {
      friendData.splice(friendIndex, 1)
      localStorage.setItem('favoriteFriends', JSON.stringify(friendData))
      removeFavoriteIcon(id)
    }
  } else {
    friendData.push(friend)
    localStorage.setItem('favoriteFriends', JSON.stringify(friendData))
    addFavoriteIcon(id)
  }
  renderPaginator(friendData.length)
  showFriendList(getFriendsByPage(Math.floor((friendIndex + 1) / Friends_PER_PAGE) + 1))
}

function addFavoriteIcon(id) {
  const btn = document.querySelector(`.btn-add-favorite[data-id="${id}"]`)
  btn.classList.remove('btn-info')
  btn.classList.add('btn-danger')
  btn.innerText = '???'
}

function removeFavoriteIcon(id) {
  const btn = document.querySelector(`.btn-add-favorite[data-id="${id}"]`)
  btn.classList.add('btn-info')
  btn.classList.remove('btn-danger')
  btn.innerText = '+'
}

renderPaginator(friendData.length)
showFriendList(getFriendsByPage(1))
