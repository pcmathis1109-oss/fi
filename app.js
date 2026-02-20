const API_KEY = '65ca4aaf481637e3d3feb421767f11a2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// BROUILLAGE DES DONNÉES (BASE64)
const protectData = (data) => {
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); } 
    catch (e) { return ""; }
};

// DÉCODAGE DES DONNÉES
const readProtectedData = (key) => {
    const hiddenData = localStorage.getItem(key);
    if (!hiddenData) return null;
    try { return JSON.parse(decodeURIComponent(escape(atob(hiddenData)))); } 
    catch (e) { return null; }
};

async function getMovies(endpoint, params = "") {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR${params}`);
        const data = await response.json();
        return data.results;
    } catch (error) { console.error("Erreur API :", error); }
}