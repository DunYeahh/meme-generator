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

function renderKeyWords() {
    const imgs = getImgs()
    let keyWords = []
    let strHTMLsDatalist = ''
    const keywordsCountMap = getKeywordSearchCountMap()
    let strHTMLsSearchFreq = ''
    imgs.forEach (img =>
        img.keywords.forEach (keyword => {
            if (!keyWords.includes(keyword)) {
                keyWords.push(keyword)
                strHTMLsDatalist += `<option value="${keyword}">`
                strHTMLsSearchFreq += `<p 
                    style="font-size: ${16 + keywordsCountMap[keyword.toLowerCase()]}px;"
                    onclick="onAddSearchCount(this.innerText)"
                    >${keyword}</p>`
                }
            })
        )
    document.querySelector('.keywords').innerHTML = strHTMLsDatalist
    document.querySelector('.keywords-list').innerHTML = strHTMLsSearchFreq
}

function onImgSelect(imgId) {
    setImg(imgId)
    goToEditor()
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

function onAddSearchCount(keyword) {
    document.querySelector('.gallery-search').value = keyword
    onFilterByKeyWord(keyword)
    updateKeyCountMap(keyword)
    renderKeyWords()
}

function onShowMoreKeywords(value) {
    document.querySelector('.keywords-list').classList.toggle('expanded')
    if (value === '...More') {
        document.querySelector('.search-freq-container button').innerText = '...Close'
    } else {
        document.querySelector('.search-freq-container button').innerText = '...More'
    }
}