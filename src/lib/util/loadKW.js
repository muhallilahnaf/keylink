export const delimiter = {
    newline: /(\r\n|\r|\n)/,
    comma: ','
}

export const getTextListFromInput = (id, separator) => document
    .getElementById(id)
    .value
    .toLowerCase()
    .split(separator)
    .map(w => w.trim())

export const getTextListFromFile = (text, separator) => text
    .toLowerCase()
    .split(separator)
    .map(w => w.trim())

export const loading = (selector, state) => {
    document
        .querySelectorAll(selector + ' *')
        .forEach(n => {
            state
                ? n.setAttribute('disabled', 'true')
                : n.removeAttribute('disabled')
        })
    document
        .querySelector(selector + ' .spinner-border')
        .style
        .display = state 
            ? 'block' 
            : 'none'
    if (!state) {
        document
            .querySelectorAll(selector + ' input,' + selector + ' textarea')
            .forEach(n => {
                n.value = ''
            })
    }
}