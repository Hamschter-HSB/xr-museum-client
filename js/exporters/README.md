# OCM Sounds - Exporter hinzufügen

Diese Anleitung erklärt, wie du den "Static Viewer" um neue Retro-Computer (z.B. Amiga, Amstrad CPC, ZX Spectrum, etc.) erweitern kannst. 

Um einen neuen Computer hinzuzufügen, musst du nur 4 kurze Schritte durchführen:

## 1. Exporter-Skript erstellen
Erstelle im Ordner `js/exporters/` eine neue JavaScript-Datei (z.B. `zxspectrum.js`).
Diese Datei sollte eine Funktion exportieren, die das `steps`-Array in einen Text-String (den fertigen BASIC-Code) umwandelt. 

Sieh dir dazu die Datei **`example.js`** in diesem Verzeichnis an. Dort findest du eine exakte Auflistung, wie das Datenformat aussieht und wie du auf Frequenzen, Dauern und Lautstärken zugreifst.

## 2. In der Benutzeroberfläche registrieren
Öffne die Datei `index.html` (im Hauptverzeichnis des Static Viewers).
Füge in der Dropdown-Liste (`<select id="computer-select">`) eine neue Option hinzu:

```html
<select id="computer-select">
    <option value="ti994a">TI-99/4A</option>
    <option value="c64">Commodore 64</option>
    <!-- NEU HINZUFÜGEN: -->
    <option value="zxspectrum">ZX Spectrum</option>
</select>
```

## 3. Funktion in die App importieren
Öffne die Datei `js/app.js` und importiere ganz oben deine neue Funktion:

```javascript
import { generateTI994A } from './exporters/ti994a.js';
import { generateC64 } from './exporters/c64.js';
// NEU HINZUFÜGEN:
import { generateZXSpectrum } from './exporters/zxspectrum.js';
```

## 4. Den Code generieren
Scrolle in der `js/app.js` ganz nach unten zur Funktion `updateCode()`. 
Füge dort eine Bedingung (`else if`) ein, um deine Funktion aufzurufen, sobald dein Computer im Dropdown ausgewählt ist:

```javascript
function updateCode() {
    if (!currentData) return;
    
    const computerSelect = document.getElementById('computer-select');
    const output = document.getElementById('output');
    
    if (computerSelect.value === 'ti994a') {
        output.value = generateTI994A(currentData);
    } else if (computerSelect.value === 'c64') {
        output.value = generateC64(currentData);
    // NEU HINZUFÜGEN:
    } else if (computerSelect.value === 'zxspectrum') {
        output.value = generateZXSpectrum(currentData);
    }
}
```

Das war's! Lade die geänderten Dateien auf GitHub hoch, und dein neuer Computer steht sofort allen zur Verfügung.
