'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    let imgs = getImgs()
    var strHTMLs = imgs.map (img =>
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