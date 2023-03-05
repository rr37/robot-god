const BASE_URL = "https://user-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const friendList = document.querySelector('#friend-list')
const friendData = JSON.parse(localStorage.getItem('favoriteFriends')) || []

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
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
      <div class="card m-2" data-id=${item.id}>
        <img class = "show-friend" src=${item.avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
        <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
          <h5 class="card-title show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>${item.name} ${item.surname}</h5>
        </div>
        <div class="card-footer show-friend"  data-id=${item.id}>
          <button class="btn btn-danger btn-add-favorite" data-id="${item.id}">♡</button>
        </div>
      </div>
      `
  })
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

// searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
//   event.preventDefault()

//   let keyword = searchInput.value.trim().toLowerCase()

//   filteredFriends = friendData.filter((friend) =>
//     friend.name.toLowerCase().includes(keyword)
//   )

//   if (filteredFriends.length === 0) {
//     alert(`您輸入的關鍵字：${keyword} 查無此人,試試看別的關鍵字吧！`)
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
    if (confirm(`你確定要將 ${friend.name} 移除好友名單嗎？`)) {
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
  btn.innerText = '♡'
}

function removeFavoriteIcon(id) {
  const btn = document.querySelector(`.btn-add-favorite[data-id="${id}"]`)
  btn.classList.add('btn-info')
  btn.classList.remove('btn-danger')
  btn.innerText = '+'
}

const links = document.querySelectorAll('.nav-link');

renderPaginator(friendData.length)
showFriendList(getFriendsByPage(1))