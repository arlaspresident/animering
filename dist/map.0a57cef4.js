/**
 * Initierar kartfunktionen.
 *
 * När sidan har laddats läggs en eventlyssnare på sökformuläret. Vid submit anropas
 * Nominatim API för att hämta koordinater baserat på användarens inmatade plats. Om APIet returnerar
 * resultat används den första träffen för att extrahera latitud och longitud som konverteras till nummer.
 * Sen beräknas en bounding box runt platsen och en OpenStreetMap iframe uppdateras med en inbäddad karta
 * som visar platsen med en markör.
 *
 * @async
 * @function initMap
 * @returns {Promise<void>} Ett promise som löses när kartan har uppdaterats.
 */ document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("search-form");
    const input = document.getElementById("location-input");
    const map = document.getElementById("map");
    /**
     * Skapar en bounding box sträng baserat på latitud och longitud med ett givet offset.
     * @param {number} lat - Latitud.
     * @param {number} lon - Longitud.
     * @param {number} [offset=0.05] - Offset för bounding box.
     * @returns {string} En sträng i formatet "minLon,minLat,maxLon,maxLat".
     */ const createBbox = (lat, lon, offset = 0.05)=>`${lon - offset},${lat - offset},${lon + offset},${lat + offset}`;
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const query = input.value.trim();
        if (!query) return;
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            const results = await response.json();
            if (results.length > 0) {
                const lat = Number(results[0].lat);
                const lon = Number(results[0].lon);
                const bbox = createBbox(lat, lon);
                map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
            } else alert("Ingen plats hittades. F\xf6rs\xf6k igen.");
        } catch (error) {
            console.error("Fel vid h\xe4mtning av platsdata:", error);
        }
    });
});

//# sourceMappingURL=map.0a57cef4.js.map
