const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();

const metaQuranPath = path.join(__dirname, 'quran/meta-quran.json');
const quranEnPath = path.join(__dirname, 'quran/quran-en.json');

let metaQuran;
let quranEn;

try {
    metaQuran = JSON.parse(fs.readFileSync(metaQuranPath, 'utf8'));
    quranEn = JSON.parse(fs.readFileSync(quranEnPath, 'utf8'));
} catch (error) {
    console.error("Error reading Quran data:", error);
    // Exit or handle the error appropriately
    process.exit(1);
}


router.get('/quran/surah', (req, res) => {
    res.json(metaQuran.surahs.references);
});

router.get('/quran/surah/:surahName', (req, res) => {
    const surahName = req.params.surahName.toLowerCase();
    const surahInfo = metaQuran.surahs.references.find(s => s.englishName.toLowerCase() === surahName);

    if (surahInfo) {
        const surahNumber = surahInfo.number;
        const surahData = quranEn.surahs.find(s => s.number === surahNumber);
        res.json(surahData);
    } else {
        res.status(404).json({ error: 'Surah not found' });
    }
});

router.get('/quran/surah/:surahName/:ayahNumber', (req, res) => {
    const surahName = req.params.surahName.toLowerCase();
    const ayahNumber = parseInt(req.params.ayahNumber, 10);

    const surahInfo = metaQuran.surahs.references.find(s => s.englishName.toLowerCase() === surahName);

    if (surahInfo) {
        const surahNumber = surahInfo.number;
        const surahData = quranEn.surahs.find(s => s.number === surahNumber);
        if (surahData) {
            const ayah = surahData.ayahs.find(a => a.number.inSurah === ayahNumber);
            if (ayah) {
                res.json(ayah);
            } else {
                res.status(404).json({ error: 'Ayah not found' });
            }
        } else {
            res.status(404).json({ error: 'Surah not found' });
        }
    } else {
        res.status(404).json({ error: 'Surah not found' });
    }
});

app.use('/.netlify/functions/index', router);

module.exports.handler = serverless(app);