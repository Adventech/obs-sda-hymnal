import * as fs from 'fs'

let totalHymns = 695
let lyrics = []

function processFile(text) {
    const titleRegex = /^(\d+)\s–\s(.*)$/g
    let verseRegex = /^\d$/g
    let refrainRegex = /^Refrain$/
    let refrainStarted = false
    let refrainDetected = false
    let refrainStartedBeforeVerse = false
    let currentVerse = 1
    let verseStarted = false
    let verse = {
        type: "verse",
        index: 1,
        lines: []
    }

    let refrain = {
        type: "refrain",
        index: 0,
        lines: []
    }

    let lines = text.split("\r\n")
    let lyrics = {
        index: null,
        number: null,
        title: null,
        lyrics: [
            // { type: "", lines: [] }
        ]
    }

    for (let line of lines) {
        if (!line.trim().length) {
            continue
        }
        let titleMatches = [...line.matchAll(titleRegex)]

        if (titleMatches.length) {
            let matches = titleMatches[0]
            lyrics.title = matches[2]
            lyrics.index = matches[1]
            lyrics.number = parseInt(matches[1])

        } else

        if (verseRegex.test(line)) {
            refrainStarted = false
            currentVerse = parseInt(line)

            if (currentVerse === 1 && refrainDetected) {
                refrainStartedBeforeVerse = true

                if (refrain.lines.length > 0) { lyrics.lyrics.push(refrain) }
            }

            if (currentVerse > 1) {
                lyrics.lyrics.push(verse)
                if (refrain.lines.length > 0) { lyrics.lyrics.push(refrain) }
                verse = JSON.parse(JSON.stringify({
                    type: "verse",
                    index: currentVerse,
                    lines: []
                }))
            }
        } else

        if (refrainRegex.test(line)) {
            refrain = JSON.parse(JSON.stringify(
                {
                    type: "refrain",
                    index: 0,
                    lines: []
                }
            ))
            refrainStarted = true
            refrainDetected = true
        } else

        {
            if (refrainStarted) {
                refrain.lines.push(line)
            } else {
                verse.lines.push(line)
            }
        }
    }

    lyrics.lyrics.push(verse)
    if (refrain.lines.length > 0) { lyrics.lyrics.push(refrain) }

    console.log(`${lyrics.index}`, refrainStartedBeforeVerse)

    return lyrics
}

for (let i = 1; i <= totalHymns; i++) {
    try {
        const data = fs.readFileSync(`./hymnal/raw/${i.toString().padStart(3, '0')}.txt`, 'utf8');
        lyrics.push(processFile(data))
    } catch (err) {
        console.error('Error reading the file:', err);
    }

    // open hymn
    // parse
    // save as new hymn
}

fs.appendFileSync(`./hymnal/sda-hymnal-db.json`, JSON.stringify(lyrics, null, 2))