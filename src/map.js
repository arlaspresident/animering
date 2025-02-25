document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const input = document.getElementById("location-input");
    const map = document.getElementById("map");
  
    /**
     * Skapar en bounding box sträng baserat på latitud och longitud med ett givet offset.
     * @param {number} lat - Latitud.
     * @param {number} lon - Longitud.
     * @param {number} [offset=0.05] - Offset för bounding box.
     * @returns {string} En sträng i formatet "minLon,minLat,maxLon,maxLat".
     */
    const createBbox = (lat, lon, offset = 0.05) =>
      `${lon - offset},${lat - offset},${lon + offset},${lat + offset}`;
  
    form.addEventListener("submit", async (e) => {
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
        } else {
          alert("Ingen plats hittades. Försök igen.");
        }
      } catch (error) {
        console.error("Fel vid hämtning av platsdata:", error);
      }
    });
  });
  