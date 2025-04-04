'use strict'

let gFilteredImgs = getImgs()

function onInitGallery() {
    renderGallery()
    renderKeyWords()
}

function renderGallery() {
    var strHTMLs = gFilteredImgs.map (img =>
        `<div class="gallery-container">
            <img class="gallery-img" onclick="onImgSelect('${img.id}')" src="${img.url}">
        </div>`
    )
    strHTMLs.unshift(
        `<label for="file-input" ><i class="fa-solid fa-upload"></i> Upload Image</label>
        <input class="file-upload"
            onchange="onUploadImg(event)"
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            id="file-input"
            name="image"
        />
        <div class="file-name" id="file-name"></div>`)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    goToEditor()
}

function renderKeyWords() {
    const imgs = getImgs()
    let keyWords = []
    let strHTMLs = ''
    imgs.forEach (img =>
        img.keywords.forEach (keyword => {
            if (!keyWords.includes(keyword)) {
                keyWords.push(keyword)
                strHTMLs += `<option value="${keyword}">`
            }
        })
    )
    document.querySelector('.key-words').innerHTML = strHTMLs
}

function onFilterByKeyWord(txt) {
    const imgs = getImgs()
    if (txt === '') {
        gFilteredImgs = imgs
    } else {
        gFilteredImgs = imgs.filter(img => {
            return img.keywords.some(keyword => keyword.toLowerCase().includes(txt.toLowerCase()))
        })
    }
    renderGallery()
}  

function onUploadImg(ev) {
    loadImageFromInput(ev, setNewImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    
    reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function setNewImg(img) {
    setImg(saveImg(img))
    goToEditor()
}