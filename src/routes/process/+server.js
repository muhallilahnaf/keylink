
import winkNLP from 'wink-nlp'
import model from 'wink-eng-lite-web-model'

const nlp = winkNLP(model, ['sbd', 'pos'])
const its = nlp.its


const getLines = (kwList) => {
    let tempLines = kwList.map(line => line
        .replace(/[^0-9a-z\s]+/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    tempLines = [...new Set(tempLines)]
    return tempLines.filter(line => line !== "")
}

const getSentence = (tempLines) => {
    let sents = tempLines.join('. ').trim()
    sents.substring(sents.length - 1) !== "." ? `${sents}.` : sents
    return sents
}

const processSentence = (sent, excluded) => {
    const kw = sent.out().replace('.', '')

    const tokens1 = sent.tokens().filter((t) => !excluded.includes(t.out(its.lemma)))
    let tempLemma = tokens1.out(its.lemma)
    tempLemma.pop()
    const lemma = tempLemma.join(' ')
    let tempPOS = tokens1.out(its.pos)
    tempPOS.pop()
    const pos = tempPOS

    const tokens2 = tokens1.filter(t => !t.out(its.stopWordFlag))
    let tempLemmaNS = tokens2.out(its.lemma)
    tempLemmaNS.pop()
    const lemmaNS = tempLemmaNS.join(' ')
    let tempPOSNS = tokens2.out(its.pos)
    tempPOSNS.pop()
    const posNS = tempPOSNS

    return {
        kw,
        lemma,
        pos,
        lemmaNS,
        posNS
    }
}

const processSentenceOnlyLemma = (sent, excluded) => {
    const kw = sent.out().replace('.', '')
    const tokens = sent.tokens().filter((t) => !excluded.includes(t.out(its.lemma)))
    let tempLemma = tokens.out(its.lemma)
    tempLemma.pop()
    const lemma = tempLemma.join(' ')

    return {
        kw,
        lemma,
    }
}

const consecutiveCombinations = (list, k) => {
    let temp = []
    for (let i = 0; i < list.length + 1 - k; i++) {
        temp.push(list.slice(i, i + k).join(' '))
    }
    return temp
}

const getChunks = (item, NS) => {
    let chunks = []

    const lemma = NS ? item.lemmaNS : item.lemma
    const pos = NS ? item.posNS : item.pos
    const words = lemma.split(' ')

    let index
    const nounCount = pos.filter((p, i) => {
        if (p === 'NOUN') {
            index = i
            return true
        }
    }).length
    if (nounCount === 1 && pos[index - 1] === 'ADJ') {
        chunks.push(words.slice(index - 1, index + 1).join(' '))
        return chunks
    }

    index = 0
    while (index < pos.length) {
        if (pos[index] === 'NOUN' || pos[index] === 'PROPN') {
            let currentArray = [words[index]]
            let j = index + 1
            while (j < pos.length) {
                if (pos[j] !== 'NOUN' && pos[j] !== 'PROPN') break
                currentArray.push(words[j])
                j++
            }
            for (let k = 1; k < currentArray.length; k++) {
                chunks.push(...consecutiveCombinations(currentArray, k))
            }
            chunks.push(currentArray.join(' '))
            index = j + 1
        } else {
            index++
        }
    }

    return [...new Set(chunks)]
}

const getChunkAndKW = (tempDoc, excluded) => {
    let list = []
    let tempLemmaNS = []

    tempDoc.sentences().each(sent => {
        let temp = []

        if (/\.[\w ]+/gm.test(sent.out().trim())) {

            temp = sent.out().split('. ').map(s => {
                const q = s.substring(s.length - 1) !== "." ? `${s}.` : s
                const subDoc = nlp.readDoc(q)
                return processSentence(subDoc, excluded)
            })

        } else {
            temp = [processSentence(sent, excluded)]
        }

        temp = temp.filter(item => {
            if (item.lemmaNS === '') return true
            if (!tempLemmaNS.includes(item.lemmaNS)) {
                tempLemmaNS.push(item.lemmaNS)
                return true
            }
            return false
        })

        temp = temp.map(item => ({
            kw: item.kw,
            chunks: getChunks(item, false),
            chunksNS: getChunks(item, true)
        }))

        list.push(...temp)
    })
    return list
}

const getLemma = (tempDoc, excluded) => {
    let list = []

    tempDoc.sentences().each(sent => {
        let temp = []

        if (/\.[\w ]+/gm.test(sent.out().trim())) {

            temp = sent.out().split('. ').map(s => {
                const q = s.substring(s.length - 1) !== "." ? `${s}.` : s
                const subDoc = nlp.readDoc(q)
                return processSentenceOnlyLemma(subDoc, excluded)
            })

        } else {
            temp = [processSentenceOnlyLemma(sent, excluded)]
        }

        list.push(...temp)
    })
    return list
}

const getKWObject = (list) => {
    let data = {}
    list.forEach(item => {
        data[item.kw] = {
            main: item.chunks,
            extended: item.chunksNS.filter(ch => !item.chunks.includes(ch)),
            id: Math.random().toString(36).substring(2, 10),
        }
    })
    return data
}

const getChunkObject = (kwObject) => {
    let chunks = {}
    for (const [kw, v] of Object.entries(kwObject)) {
        v.main.forEach((ch) => {
            if (chunks.hasOwnProperty(ch)) {
                chunks[ch].main.push(kw);
            } else {
                chunks[ch] = {
                    main: [kw],
                    extended: [],
                };
            }
        });
        v.extended.forEach((ch) => {
            if (chunks.hasOwnProperty(ch)) {
                chunks[ch].extended.push(kw);
            } else {
                chunks[ch] = {
                    main: [],
                    extended: [kw],
                };
            }
        });
    }
    return chunks
}

const getData = (kw, kwList, excludeList) => {
    const lines = getLines(kwList)
    const sentence = getSentence(lines)
    const doc = nlp.readDoc(sentence)
    if (kw == 'new') {
        const chunkAndKW = getChunkAndKW(doc, excludeList)
        const kwObject = getKWObject(chunkAndKW)
        return {
            KW: {...kwObject},
            message: 'Keywords added successfully.'
        }
    }
    if (kw == 'old') {
        const kwObject = getLemma(doc, excludeList)
        return {
            existingKW: kwObject,
            message: 'Existing keywords added successfully.'
        }
    }
    return {
        error: true,
        message: 'Error: Keyword neither new nor old.'
    }
}


export const POST = async ({request}) => {
    try {
        const {kw, kwList, excludeList} = await request.json()
        const kwObject = getData(kw, kwList, excludeList)
        return new Response(JSON.stringify(kwObject), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(err) {
        return new Response({
            error: true,
            message: err.message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}


export const config = {
    runtime: 'edge'
};