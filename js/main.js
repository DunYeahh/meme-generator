function goToEditor() {
    leaveCurrPage()
    const elEditor = document.querySelector('.editor')
    toggleSectionClass(elEditor)
    initEditor()
}

function onGoToSaved() {
    leaveCurrPage()
    const elSaved = document.querySelector('.saved-memes')
    toggleSectionClass(elSaved)
    initSaved()
    document.querySelector('.gallery-btn').classList.remove('active')
    document.querySelector('.saved-btn').classList.add('active')
}

function onGoToGallery() {
    leaveCurrPage()
    const elGallery = document.querySelector('.gallery')
    toggleSectionClass(elGallery)
    onInitGallery()
    document.querySelector('.gallery-btn').classList.add('active')
    document.querySelector('.saved-btn').classList.remove('active')
}


function leaveCurrPage() {
    const elCurrSection = document.querySelector('.curr-page')
    toggleSectionClass(elCurrSection)
}

function toggleSectionClass(elSection) {
    elSection.classList.toggle('curr-page')
    elSection.classList.toggle('hide')
}