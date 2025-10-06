# Islamic API

This is a simple API for accessing Quranic data. It's built with Node.js and Express, and it's designed to be deployed on Netlify.

## API Routes

### Get All Surahs

- **Endpoint:** `/api/quran/surah`
- **Method:** `GET`
- **Description:** Returns a list of all surahs with their metadata.
- **Example:**
  ```bash
  curl https://your-deployment-url.netlify.app/api/quran/surah
  ```

### Get a Specific Surah

- **Endpoint:** `/api/quran/surah/:surahName`
- **Method:** `GET`
- **Description:** Returns a specific surah and all of its ayahs.
- **Parameters:**
  - `surahName` (string, required): The English name of the surah (e.g., "Al-Faatiha").
- **Example:**
  ```bash
  curl https://your-deployment-url.netlify.app/api/quran/surah/Al-Faatiha
  ```

### Get a Specific Ayah

- **Endpoint:** `/api/quran/surah/:surahName/:ayahNumber`
- **Method:** `GET`
- **Description:** Returns a specific ayah from a surah.
- **Parameters:**
  - `surahName` (string, required): The English name of the surah (e.g., "Al-Faatiha").
  - `ayahNumber` (integer, required): The number of the ayah within the surah.
- **Example:**
  ```bash
  curl https://your-deployment-url.netlify.app/api/quran/surah/Al-Faatiha/1
  ```