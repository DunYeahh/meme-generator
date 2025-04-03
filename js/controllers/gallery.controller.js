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