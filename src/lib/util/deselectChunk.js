const deselectChunk = () => {
    const selected = document.querySelector('#keyword-section .selected')
    if (selected) selected.classList.remove('selected')
}

export default deselectChunk