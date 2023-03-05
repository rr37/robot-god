const BASE_URL = "https://user-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const friendList = document.querySelector('#friend-list')
const friendData = []
let filteredFriends = []
let featurefilteredFriends = []
const paginator = document.querySelector('#paginator')
const Friends_PER_PAGE = 12
const robotFeature = document.querySelector('.filterqq')
const imageButton = document.querySelectorAll('.img-button')
const addRobotArea = document.querySelector('.add-Robot-Area')
const leftPlus = document.querySelector('#leftPlus')
const rightPlus = document.querySelector('#rightPlus')
const mergeBtn = document.querySelector('#merge')
const resultArea = document.querySelector('.result-area')
const tryAgainBtn = document.querySelector('.try-again-btn')
const godbody = document.querySelector('.godbody')
const godhand = document.querySelector('.godhand')
const bigbang = document.querySelector('.bigbang')
const addrobot = document.querySelector('.add-robot-area')
const merge = document.querySelector('.merge')
const godshow = document.querySelector('.godshow')
const newcharacter = document.querySelector('.newcharacter')
const addRecipeBtn = document.querySelector('.add-recipe-btn')
const resultPlus = document.querySelector('#resultPlus')
const navbar = document.querySelector('.navbar')


//robot feature//////////////////////////////////////////////////////
const rb_feature = {
  headDeco: {
    empty: [1, 3, 4, 5, 9, 14, 18, 26, 33, 34, 50, 57, 58, 59, 63, 80, 84, 89, 92, 99, 105, 113, 116, 118, 132, 134, 140, 142, 144, 146, 153, 154, 160, 166, 170, 173, 186, 190, 193, 196, 198, 200],
    button: [2, 22, 47, 75, 85, 103, 120, 122, 125, 133, 135, 145, 147, 161, 165, 169, 185],
    hair: [6, 8, 16, 25, 60, 69, 83, 94, 95, 106, 117, 124, 130, 137, 148, 171, 177, 199],
    horn: [7, 10, 54, 61, 67, 68, 90, 98, 104, 110, 112, 115, 121, 129, 131, 139, 143, 155, 156, 157, 181, 183],
    radar: [11, 30, 31, 37, 45, 46, 48, 56, 64, 74, 78, 81, 93, 97, 102, 107, 111, 138, 141, 163, 164, 172, 176, 184],
    tower: [12, 19, 27, 32, 35, 44, 53, 76, 77, 108, 109, 114, 127, 149, 167, 180, 187, 188, 192, 197],
    seven: [13, 15, 17, 20, 36, 39, 42, 52, 66, 71, 79, 82, 86, 88, 91, 136, 168, 174, 175],
    antenna: [21, 24, 29, 40, 41, 43, 62, 65, 72, 100, 101, 119, 126, 128, 152, 158, 189, 191, 195],
    hat: [23, 28, 38, 49, 51, 55, 70, 73, 87, 96, 123, 150, 151, 159, 162, 178, 179, 182, 194]
  }
}

const rb_headDeco = {
  empty: [1, 3, 4, 5, 9, 14, 18, 26, 33, 34, 50, 57, 58, 59, 63, 80, 84, 89, 92, 99, 105, 113, 116, 118, 132, 134, 140, 142, 144, 146, 153, 154, 160, 166, 170, 173, 186, 190, 193, 196, 198, 200],
  button: [2, 22, 47, 75, 85, 103, 120, 122, 125, 133, 135, 145, 147, 161, 165, 169, 185],
  hair: [6, 8, 16, 25, 60, 69, 83, 94, 95, 106, 117, 124, 130, 137, 148, 171, 177, 199],
  horn: [7, 10, 54, 61, 67, 68, 90, 98, 104, 110, 112, 115, 121, 129, 131, 139, 143, 155, 156, 157, 181, 183],
  radar: [11, 30, 31, 37, 45, 46, 48, 56, 64, 74, 78, 81, 93, 97, 102, 107, 111, 138, 141, 163, 164, 172, 176, 184],
  tower: [12, 19, 27, 32, 35, 44, 53, 76, 77, 108, 109, 114, 127, 149, 167, 180, 187, 188, 192, 197],
  seven: [13, 15, 17, 20, 36, 39, 42, 52, 66, 71, 79, 82, 86, 88, 91, 136, 168, 174, 175],
  antenna: [21, 24, 29, 40, 41, 43, 62, 65, 72, 100, 101, 119, 126, 128, 152, 158, 189, 191, 195],
  hat: [23, 28, 38, 49, 51, 55, 70, 73, 87, 96, 123, 150, 151, 159, 162, 178, 179, 182, 194]
}

const rb_color = {
  blue: [1, 4, 10, 11, 16, 41, 47, 50, 52, 54, 80, 81, 108, 110, 118, 120, 132, 134, 139, 153, 162, 164, 168, 185, 189, 197],
  darkGray: [2, 9, 24, 55, 61, 65, 78, 83, 100, 112, 138, 145, 169, 172, 186, 187, 195],
  gray: [3, 17, 23, 39, 63, 64, 71, 74, 75, 89, 98, 107, 111, 117, 121, 141, 157, 161, 167],
  green: [5, 12, 18, 20, 25, 27, 35, 36, 42, 48, 59, 62, 69, 70, 76, 102, 106, 116, 130, 143, 147, 150, 159, 174, 176, 181, 188, 190, 196],
  yellow: [6, 28, 29, 31, 32, 40, 44, 60, 93, 104, 119, 122, 129, 133, 140, 178, 182, 198],
  brown: [7, 22, 30, 37, 51, 53, 58, 77, 85, 88, 91, 109, 114, 124, 126, 135, 155],
  orange: [8, 14, 26, 43, 45, 49, 72, 73, 90, 92, 95, 96, 101, 103, 125, 127, 136, 149, 170, 177, 193],
  pink: [13, 19, 46, 56, 86, 87, 94, 105, 115, 142, 144, 148, 152, 160, 166, 175, 183, 184, 194, 199],
  red: [15, 21, 33, 66, 79, 84, 99, 123, 128, 131, 137, 146, 158, 165, 171, 173, 179, 180, 191, 192],
  purple: [34, 38, 57, 67, 68, 82, 97, 113, 151, 154, 156, 163],
  transparent: [200]
}

const rb_eye = {
  mailbox: [1, 3, 14, 15, 28, 30, 32, 37, 45, 72, 76, 79, 83, 84, 98, 116, 124, 134, 136, 155, 177, 192, 195],
  sinkOne: [2, 9, 13, 52, 61, 63, 66, 68, 69, 88, 104, 107, 114, 118, 120, 132, 153, 154, 157, 158, 172, 179, 194],
  handle: [4, 25, 31, 40, 42, 43, 46, 59, 81, 85, 108, 109, 121, 138, 141, 162, 174, 196],
  binoculars: [5, 10, 11, 12, 18, 36, 49, 65, 75, 91, 97, 100, 103, 105, 128, 139, 140, 164, 168, 178, 182, 190],
  sinkTwo: [6, 7, 41, 50, 53, 56, 78, 82, 89, 90, 112, 113, 126, 145, 148, 149, 152, 156, 159, 169, 170, 173, 180, 181, 188],
  glass: [8, 22, 27, 58, 60, 80, 87, 106, 110, 119, 151, 165, 183, 184],
  laser: [17, 23, 26, 33, 34, 38, 48, 51, 55, 73, 93, 94, 99, 117, 122, 133, 137, 142, 143, 144, 197, 198, 199],
  telescope: [21, 24, 29, 47, 67, 77, 92, 96, 111, 130, 135, 146, 150, 163, 167, 176, 187, 189],
  spy: [35, 57, 62, 74, 95, 115, 127, 131, 147, 160, 166, 185, 186, 193],
  sinkRed: [16, 19, 20, 39, 44, 54, 64, 70, 71, 86, 101, 102, 123, 125, 129, 161, 171, 175, 191],
  transparent: [200]
}

const rb_headShape = {
  missile: [1, 5, 7, 16, 20, 24, 40, 54, 59, 68, 74, 80, 81, 127, 143, 150, 151, 152, 159, 161, 163, 175, 188, 196],
  onigiri: [2, 15, 17, 26, 30, 37, 58, 66, 84, 85, 89, 106, 108, 109, 124, 141, 142, 156, 162, 181, 184, 192, 198, 199],
  konjac: [3, 22, 28, 50, 51, 56, 72, 78, 82, 88, 92, 125, 128, 137, 148, 170, 171, 183, 195],
  eraser: [4, 14, 34, 38, 46, 52, 73, 79, 86, 103, 113, 117, 119, 133, 135, 146, 154, 160, 167, 179],
  pedal: [6, 10, 19, 29, 60, 62, 64, 65, 101, 114, 132, 134, 136, 144, 155, 185, 190, 191],
  heart: [8, 21, 31, 32, 41, 53, 61, 67, 104, 110, 123, 129, 140, 145, 158, 164, 189],
  can: [9, 27, 35, 39, 49, 63, 71, 87, 90, 98, 102, 107, 118, 149, 169, 177, 187],
  egg: [11, 13, 23, 36, 47, 48, 77, 83, 91, 99, 112, 116, 120, 121, 138, 139, 147, 153, 174, 186],
  pharaoh: [12, 25, 42, 43, 45, 69, 70, 76, 93, 94, 97, 111, 115, 122, 130, 166, 180, 193, 197],
  stone: [18, 33, 44, 55, 57, 75, 95, 96, 100, 105, 126, 131, 157, 165, 168, 172, 173, 176, 178, 182, 194],
  transparent: [200]
}

const rb_noseOrMustache = {
  nose: [1, 3, 14, 33, 57, 58, 59, 63, 84, 105, 142, 144, 146, 166, 170, 190],
  mustache: [4, 5, 9, 18, 26, 34, 50, 80, 89, 92, 99, 113, 116, 118, 132, 134, 140, 153, 154, 160, 173, 186, 193, 196, 198],
  transparent: [2, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 60, 61, 62, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 85, 86, 87, 88, 90, 91, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 114, 115, 117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 133, 135, 136, 137, 138, 139, 141, 143, 145, 147, 148, 149, 150, 151, 152, 155, 156, 157, 158, 159, 161, 162, 163, 164, 165, 167, 168, 169, 171, 172, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 187, 188, 189, 191, 192, 194, 195, 197, 199]
}

const rb_mouse = {
  normal: [1, 8, 13, 15, 44, 75, 84, 93, 113, 128, 150, 171, 188, 192],
  teeth: [2, 9, 16, 18, 19, 20, 35, 36, 56, 57, 64, 82, 85, 86, 108, 110, 119, 131, 134, 149, 154, 175],
  anopy: [3, 30, 38, 39, 40, 46, 47, 50, 68, 77, 95, 97, 126, 133, 142, 147, 155, 159, 173, 181],
  monitor: [4, 11, 14, 37, 42, 45, 48, 62, 63, 67, 71, 98, 114, 115, 120, 127, 143, 145, 174, 195, 199],
  noWord: [5, 6, 7, 22, 27, 33, 34, 60, 61, 74, 80, 87, 92, 104, 109, 129, 130, 137, 141, 161, 168, 176, 185],
  jail: [10, 23, 53, 59, 69, 88, 89, 94, 103, 106, 107, 118, 121, 122, 125, 151, 166, 172, 184],
  shock: [12, 21, 25, 26, 31, 49, 51, 58, 78, 83, 99, 101, 102, 146, 152, 153, 162, 177, 180, 183],
  paperHole: [17, 24, 28, 41, 55, 72, 79, 90, 100, 116, 123, 124, 135, 136, 140, 156, 157, 160, 169, 187, 193, 194, 196],
  smile: [29, 32, 65, 66, 91, 105, 138, 144, 165, 167, 182, 190, 191],
  coinHole: [43, 52, 54, 70, 73, 76, 81, 96, 111, 112, 117, 132, 139, 148, 158, 163, 164, 170, 178, 179, 186, 189, 197, 198],
  transparent: [200]
}

const rb_body = {
  normal: [1, 38, 39, 51, 69, 77, 91, 92, 96, 121, 122, 123, 136, 138, 158, 164, 196],
  overweight: [2, 14, 21, 24, 27, 44, 46, 52, 71, 74, 78, 83, 110, 112, 113, 125, 140, 157, 168, 169, 180, 191, 194],
  heart: [3, 6, 16, 19, 20, 29, 37, 47, 64, 65, 66, 75, 86, 90, 99, 120, 131, 133, 135, 154, 156, 181],
  lean: [4, 7, 13, 18, 32, 53, 61, 67, 73, 89, 93, 94, 105, 114, 118, 119, 132, 145, 189, 190],
  bottle: [5, 15, 34, 55, 56, 60, 95, 107, 124, 142, 144, 146, 148, 150, 160, 177, 192],
  can: [8, 23, 25, 28, 30, 54, 68, 84, 111, 115, 116, 117, 143, 151, 155, 175, 176, 186, 187, 195, 197, 198],
  chubby: [9, 17, 31, 36, 41, 45, 49, 58, 72, 88, 97, 101, 109, 159, 162, 165, 167, 170, 172, 184],
  onigiri: [12, 40, 42, 50, 62, 70, 81, 82, 85, 87, 100, 139, 152, 153, 166, 173, 183, 185, 199],
  skinny: [22, 26, 33, 48, 57, 59, 76, 79, 80, 98, 104, 106, 126, 127, 129, 141, 147, 163, 171, 179, 188],
  slim: [10, 11, 35, 43, 63, 102, 103, 108, 128, 130, 134, 137, 149, 161, 174, 178, 182, 193],
  transparent: [200]
}
// console.log(rb_feature.headDeco.empty)

mergeBtn.addEventListener('click', function mergeActive() {
  const Llist = JSON.parse(localStorage.getItem('LeftRobot')) || []
  const Rlist = JSON.parse(localStorage.getItem('RightRobot')) || []
  console.log(Llist)

  if (Llist.length === 0 || Rlist.length === 0) {
    alert('素材不足，無法融合')
    return
  }
  godbody.classList.toggle('invisible')
  godhand.classList.toggle('invisible')
  addrobot.classList.toggle('invisible')
  merge.classList.toggle('invisible')
  mergeBtn.classList.toggle('invisible')
  setTimeout(function () { bigbang.classList.toggle('invisible') }, 3000)
  setTimeout(function () {
    bigbang.classList.toggle('invisible')
    merge.classList.toggle('invisible')
  }, 4000)

  setTimeout(function () {
    const Llist = JSON.parse(localStorage.getItem('LeftRobot')) || []
    const Rlist = JSON.parse(localStorage.getItem('RightRobot')) || []
    const Lstart = Llist[0].avatar.indexOf(".org/") + 5
    const Lend = Llist[0].avatar.indexOf(".png")
    const Rstart = Rlist[0].avatar.indexOf(".org/") + 5
    const Rend = Rlist[0].avatar.indexOf(".png")
    const Lstring = Llist[0].avatar.slice(Lstart, Lend)
    const Rstring = Rlist[0].avatar.slice(Rstart, Rend)
    const mergeRobot = Lstring + Rstring
    resultPlus.innerHTML = `<img src="https://robohash.org/${mergeRobot}.png?size=300x300&set=set1" alt="...">`
    // console.log(resultPlus.children.img.src)
    resultArea.classList.toggle('invisible')
    console.log(resultPlus.firstChild.src)
  }, 4000)

})

addRecipeBtn.addEventListener('click', function () {
  const Llist = JSON.parse(localStorage.getItem('LeftRobot')) || []
  const Rlist = JSON.parse(localStorage.getItem('RightRobot')) || []
  const RecipeList = JSON.parse(localStorage.getItem('Recipe')) || []
  RecipeList.push(Llist[0])
  RecipeList.push(Rlist[0])
  const resultAvatar = resultPlus.firstChild.src

  RecipeList.push({ avatar: resultAvatar })
  localStorage.setItem('Recipe', JSON.stringify(RecipeList))
  localStorage.removeItem('LeftRobot')
  localStorage.removeItem('RightRobot')
  resultArea.classList.toggle('invisible')
  godbody.classList.toggle('invisible')
  godhand.classList.toggle('invisible')
  addrobot.classList.toggle('invisible')
  mergeBtn.classList.toggle('invisible')
  leftPlus.innerHTML = ''
  rightPlus.innerHTML = ''
  alert('已新增至Recipe，快去看看吧～')
})

tryAgainBtn.addEventListener('click', function tryAgain() {
  localStorage.removeItem('LeftRobot')
  localStorage.removeItem('RightRobot')
  leftPlus.innerHTML = ''
  rightPlus.innerHTML = ''
  resultArea.classList.toggle('invisible')
  godbody.classList.toggle('invisible')
  godhand.classList.toggle('invisible')
  addrobot.classList.toggle('invisible')
  mergeBtn.classList.toggle('invisible')

})

function removeFeatureActive() {
  imageButton.forEach((item) => {
    // console.log(item)
    item.classList.remove('button-active')

  })
}

function addFeatureActive(item) {
  if (item.classList.contains('img-button')) {
    item.classList.add('button-active')
  }
}

robotFeature.addEventListener('click', function callMyName(event) {
  const object = event.target.parentElement.parentElement.id
  const filterTarget = event.target.parentElement
  const filterName = event.target.parentElement.id
  removeFeatureActive()
  addFeatureActive(filterTarget)
  // if (filterTarget.classList.contains('img-button')){
  //   filterTarget.classList.add('button-active')
  // }
  console.log(filterTarget)
  console.log(object)
  // // console.log(filterName)
  // for (let id in rb_headDeco.empty){
  //   // console.log(rb_headDeco.empty[id])
  //   featurefilteredFriends.push(rb_headDeco.empty[id])
  // }
  // if (rb_feature.object.empty.includes(1)){
  //   console.log(object)
  // }

  // console.log(featurefilteredFriends)

  showFriendList(friendData, featurefilteredFriends)
  // if (filterName === 'empty') {
  //   showFriendList(friendData, rb_headDeco.empty);
  // }
  switch (object) {
    case 'headDeco':
      switch (filterName) {
        case 'empty': showFriendList(friendData, rb_headDeco.empty); break;
        case 'button': showFriendList(friendData, rb_headDeco.button); break;
        case 'hair': showFriendList(friendData, rb_headDeco.hair); break;
        case 'horn': showFriendList(friendData, rb_headDeco.horn); break;
        case 'radar': showFriendList(friendData, rb_headDeco.radar); break;
        case 'tower': showFriendList(friendData, rb_headDeco.tower); break;
        case 'seven': showFriendList(friendData, rb_headDeco.seven); break;
        case 'antenna': showFriendList(friendData, rb_headDeco.antenna); break;
        case 'hat': showFriendList(friendData, rb_headDeco.hat);
      }; break;
    case 'color':
      switch (filterName) {
        case 'blue': showFriendList(friendData, rb_color.blue); break;
        case 'darkGray': showFriendList(friendData, rb_color.darkGray); break;
        case 'gray': showFriendList(friendData, rb_color.gray); break;
        case 'green': showFriendList(friendData, rb_color.green); break;
        case 'yellow': showFriendList(friendData, rb_color.yellow); break;
        case 'brown': showFriendList(friendData, rb_color.brown); break;
        case 'orange': showFriendList(friendData, rb_color.orange); break;
        case 'pink': showFriendList(friendData, rb_color.pink); break;
        case 'red': showFriendList(friendData, rb_color.red); break;
        case 'purple': showFriendList(friendData, rb_color.purple); break;
        case 'transparent': showFriendList(friendData, rb_color.transparent);
      }; break;
    case 'eye':
      switch (filterName) {
        case 'mailbox': showFriendList(friendData, rb_eye.mailbox); break;
        case 'sinkOne': showFriendList(friendData, rb_eye.sinkOne); break;
        case 'handle': showFriendList(friendData, rb_eye.handle); break;
        case 'binoculars': showFriendList(friendData, rb_eye.binoculars); break;
        case 'sinkTwo': showFriendList(friendData, rb_eye.sinkTwo); break;
        case 'glass': showFriendList(friendData, rb_eye.glass); break;
        case 'laser': showFriendList(friendData, rb_eye.laser); break;
        case 'telescope': showFriendList(friendData, rb_eye.telescope); break;
        case 'spy': showFriendList(friendData, rb_eye.spy); break;
        case 'sinkRed': showFriendList(friendData, rb_eye.sinkRed); break;
        case 'transparent': showFriendList(friendData, rb_eye.transparent);
      }; break;
    case 'headShape':
      switch (filterName) {
        case 'missile': showFriendList(friendData, rb_headShape.missile); break;
        case 'onigiri': showFriendList(friendData, rb_headShape.onigiri); break;
        case 'konjac': showFriendList(friendData, rb_headShape.konjac); break;
        case 'eraser': showFriendList(friendData, rb_headShape.eraser); break;
        case 'pedal': showFriendList(friendData, rb_headShape.pedal); break;
        case 'heart': showFriendList(friendData, rb_headShape.heart); break;
        case 'can': showFriendList(friendData, rb_headShape.can); break;
        case 'egg': showFriendList(friendData, rb_headShape.egg); break;
        case 'pharaoh': showFriendList(friendData, rb_headShape.pharaoh); break;
        case 'stone': showFriendList(friendData, rb_headShape.stone); break;
        case 'transparent': showFriendList(friendData, rb_headShape.transparent);
      }; break;
    case 'noseOrMustache':
      switch (filterName) {
        case 'nose': showFriendList(friendData, rb_noseOrMustache.nose); break;
        case 'mustache': showFriendList(friendData, rb_noseOrMustache.mustache); break;
        case 'transparent': showFriendList(friendData, rb_noseOrMustache.transparent);
      }; break;
    case 'mouse':
      switch (filterName) {
        case 'normal': showFriendList(friendData, rb_mouse.normal); break;
        case 'teeth': showFriendList(friendData, rb_mouse.teeth); break;
        case 'anopy': showFriendList(friendData, rb_mouse.anopy); break;
        case 'monitor': showFriendList(friendData, rb_mouse.monitor); break;
        case 'noWord': showFriendList(friendData, rb_mouse.noWord); break;
        case 'jail': showFriendList(friendData, rb_mouse.jail); break;
        case 'shock': showFriendList(friendData, rb_mouse.shock); break;
        case 'paperHole': showFriendList(friendData, rb_mouse.paperHole); break;
        case 'smile': showFriendList(friendData, rb_mouse.smile); break;
        case 'coinHole': showFriendList(friendData, rb_mouse.coinHole); break;
        case 'transparent': showFriendList(friendData, rb_mouse.transparent);
      }; break;
    case 'body':
      switch (filterName) {
        case 'normal': showFriendList(friendData, rb_body.normal); break;
        case 'overweight': showFriendList(friendData, rb_body.overweight); break;
        case 'heart': showFriendList(friendData, rb_body.heart); break;
        case 'lean': showFriendList(friendData, rb_body.lean); break;
        case 'bottle': showFriendList(friendData, rb_body.bottle); break;
        case 'can': showFriendList(friendData, rb_body.can); break;
        case 'chubby': showFriendList(friendData, rb_body.chubby); break;
        case 'onigiri': showFriendList(friendData, rb_body.onigiri); break;
        case 'skinny': showFriendList(friendData, rb_body.skinny); break;
        case 'slim': showFriendList(friendData, rb_body.slim); break;
        case 'transparent': showFriendList(friendData, rb_body.transparent);
      };
  }


})


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

function showFriendList(data, object = rb_headDeco.radar) {
  let favoriteFriends = JSON.parse(localStorage.getItem('favoriteFriends')) || []
  let rawHTML = ''
  data.forEach((item) => {

    if (object.includes(item.id)) {
      rawHTML += `
        <div class="card m-2" data-id=${item.id}>
        <img class = "show-friend" src=${item.avatar} alt="..." data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
        <div class="card-body justify-content-center show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>
          <h5 class="card-title show-friend" data-bs-toggle="modal" data-bs-target="#myModal" data-id=${item.id}>${item.name} ${item.surname}</h5>
        </div>
        <div class="card-footer show-friend"  data-id=${item.id}>`
      if (favoriteFriends.some((friend) => friend.id === item.id)) {
        console.log('我好棒')
        rawHTML += `<button class="btn btn-danger btn-add-favorite" data-id="${item.id}">♡</button>`
      } else {
        rawHTML += `
        <button class="btn btn-secondary btn-add-favorite" data-id="${item.id}">+</button>
        `
      }
      rawHTML += `
        <button class="btn btn-secondary btn-add-left" data-id="${item.id}">L</button>
        <button class="btn btn-secondary btn-add-right" data-id="${item.id}">R</button>
        </div>
      </div>
      `
    }
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

axios.get(INDEX_URL)
  .then(response => {
    const data = response.data.results
    ///
    // console.log(data)

    friendData.push(...data)
    renderPaginator(friendData.length)
    showFriendList(data)
  })
  .catch(error => console.log(error))

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

// Add favorite function //////////////////////////////////////

function toggleFavorite(id) {
  console.log(id)
  const list = JSON.parse(localStorage.getItem('favoriteFriends')) || []
  const friend = friendData.find(friend => friend.id === id)
  if (list.some((friend) => friend.id === id)) {
    const friendIndex = list.findIndex((friend) => friend.id === id)
    if (friendIndex === -1) return
    list.splice(friendIndex, 1)
    localStorage.setItem('favoriteFriends', JSON.stringify(list))
    removeFavoriteIcon(id)
  } else {
    list.push(friend)
    localStorage.setItem('favoriteFriends', JSON.stringify(list))
    addFavoriteIcon(id)
  }
}

function addFavoriteIcon(id) {
  const btn = document.querySelector(`.btn-add-favorite[data-id="${id}"]`)
  btn.classList.remove('btn-secondary')
  btn.classList.add('btn-danger')
  btn.innerText = '♡'
}

function removeFavoriteIcon(id) {
  const btn = document.querySelector(`.btn-add-favorite[data-id="${id}"]`)
  btn.classList.add('btn-secondary')
  btn.classList.remove('btn-danger')
  btn.innerText = '+'
}

friendList.addEventListener('click', function addRobot(event) {
  const id = event.target.dataset.id
  if (event.target.classList.contains('btn-add-left')) {
    addLeftRobot(Number(id))
    addLeftRobotAvatar(leftPlus)
    addLeftIcon(id)
    console.log(event.target.classList)
  } else if (event.target.classList.contains('btn-add-right')) {
    addRightRobot(Number(id))
    addRightIcon(id)
    addRightRobotAvatar(rightPlus)
  } else {
  }
})

function addLeftIcon(id) {
  const allLeftBtn = document.querySelectorAll(`.btn-add-left`)
  const btn = document.querySelector(`.btn-add-left[data-id="${id}"]`)
  allLeftBtn.forEach((item) => {
    item.classList.remove('btn-warning')
    item.classList.add('btn-secondary')
  })
  btn.classList.add('btn-warning')
  btn.classList.remove('btn-secondary')
}

function addRightIcon(id) {
  const allLeftBtn = document.querySelectorAll(`.btn-add-right`)
  const btn = document.querySelector(`.btn-add-right[data-id="${id}"]`)
  allLeftBtn.forEach((item) => {
    item.classList.remove('btn-warning')
    item.classList.add('btn-secondary')
  })
  btn.classList.add('btn-warning')
  btn.classList.remove('btn-secondary')
}

function addLeftRobot(id) {
  localStorage.removeItem('LeftRobot')
  const list = JSON.parse(localStorage.getItem('LeftRobot')) || []
  const leftRobot = friendData.find((friend) => friend.id === id)
  list.push(leftRobot)
  console.log(list)
  console.log(list[0].avatar)
  localStorage.setItem('LeftRobot', JSON.stringify(list))
}

function addLeftRobotAvatar(position) {
  const list = JSON.parse(localStorage.getItem('LeftRobot')) || []
  position.innerHTML = `
    <img src = "${list[0].avatar}" alt = "..." >
  `
  console.log(list)
}

function addRightRobot(id) {
  localStorage.removeItem('RightRobot')
  const list = JSON.parse(localStorage.getItem('RightRobot')) || []
  const rightRobot = friendData.find((friend) => friend.id === id)
  list.push(rightRobot)
  console.log(list)
  console.log(list[0].avatar)
  localStorage.setItem('RightRobot', JSON.stringify(list))
}

function addRightRobotAvatar(position) {
  const list = JSON.parse(localStorage.getItem('RightRobot')) || []
  position.innerHTML = `
    <img src = "${list[0].avatar}" alt = "..." >
  `
  console.log(list)
}

// navbar.addEventListener('click', function(event) {
//   // console.log(event.target.innerText)
//   // alert(event.target.innerText)
//   switch (event.target.innerText) {
//     case Home:
//       event.target.classList.remove("active");
//       event.target.parentElement.nextSibling.childElement.classList.add("active");
//       break;
//   }
// })

renderPaginator(friendData.length)
showFriendList(getFriendsByPage(1))


