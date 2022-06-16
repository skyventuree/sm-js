const fs = require('fs')

/**
 * The Simfile class for performing operations.
 * @param {string} filePath
 * @constructor
 */
class Simfile {
    constructor(filePath) {
        this.filePath = filePath;
    }

    read() {
        if (!this.filePath.endsWith('.sm') && !this.filePath.endsWith('.ssc')) {
            throw new Error('Not a StepMania file.');
        }

        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Get the title of the song.
     * @returns {string} The title of the song.
     */
    getTitle() {
        return this.read().then(data => {
            const title = data.match(/#TITLE:(.+);/)[1];
            return title;
        })
    }

    /**
     * Get the subtitle of the song.
     * @returns {string} The subtitle of the song.
    */
    getSubtitle() {
        return this.read().then(data => {
            const subtitle = data.match(/#SUBTITLE:(.+);/)[1];
            return subtitle;
        })
    }

    /**
     * Get the artist of the song.
     * @returns {string} The artist of the song.
    */
    getArtist() {
        return this.read().then(data => {
            const artist = data.match(/#ARTIST:(.+);/)[1];
            return artist;
        })
    }

    /**
     * Get the genre of the song.
     * @returns {string} The genre of the song.
    */
    getGenre() {
        return this.read().then(data => {
            const genre = data.match(/#GENRE:(.+);/)[1];
            return genre;
        })
    }

    /**
     * Get the credit of the song.
     * @returns {string} The credit of the song.
    */
    getCredit() {
        return this.read().then(data => {
            const credit = data.match(/#CREDIT:(.+);/)[1];
            return credit;
        })
    }

    /**
     * Get the offset of the song.
     * @returns {number} The offset of the song.
    */
    getOffset() {
        return this.read().then(data => {
            const offset = data.match(/#OFFSET:(.+);/)[1];
            return offset;
        })
    }

    /**
     * Get the start or the length of the sample of the song.
     * @param {string} [type=start] The type of sample number.
     * @returns {number} The number that represent the start or the length of the sample of the song.
    */
    getSamplePreview(type = 'start') {
        return this.read().then(data => {
            if (type === 'start') 
                var sample = data.match(/#SAMPLESTART:(.+);/)[1];
            if (type === 'length') 
                var sample = data.match(/#SAMPLELENGTH:(.+);/)[1];
            return sample
        })
    }

    /**
     * Get the BPM of the song. Multiline BPM will be supported in the future.
     * @returns {number} The BPM of the song.
     */
    getBPM() {
        return this.read().then(data => {
            var bpm = data.match(/#BPMS:(.+);/)[1];
            bpm = bpm.split('=')[1];
            return bpm;
        }).catch(err => {
            throw new Error('Multiline BPM detected. This operation will be supported in the future.');
        })
    }

    // BROKEN, it's in the fix.
    /* getDifficulty() {
        return this.read().then(data => {
            var difficulty = data.match(/#NOTES:\n/g);
            return difficulty;
        })
    } */
} 

function toJSON(data) {
    // wip for later.
    return; 
}

module.exports = { Simfile };