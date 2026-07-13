/**
 * Dies ist eine Beispiel-Datei, die zeigt, wie du einen Exporter für einen 
 * neuen Retro-Computer hinzufügen kannst.
 * 
 * Jeder Exporter sollte eine einzelne Funktion exportieren, die das 
 * 'steps'-Array als Parameter erhält und den fertigen Code als String zurückgibt.
 */

export function generateExample(steps) {
    // 1. Initialisiere den Code-String. Viele BASIC-Scripte starten z. B. mit NEW.
    let code = "NEW\n";
    code += "10 REM MYSOUND\n";

    // Startzeile für den generierten Code
    let line = 20;

    // 2. Iteriere über alle Sound-Schritte
    steps.forEach((step, index) => {
        code += `${line} REM START SCHRITT ${index + 1}\n`;
        line += 10;

        // Dauer dieses Schritts in Millisekunden
        const duration = step.duration;

        // 3. Iteriere über die 3 Tonkanäle
        step.voices.forEach((voice, voiceIndex) => {
            if (voice.enabled) {
                // voice.frequency enthält die Frequenz in Hz (z.B. 440)
                // voice.volume enthält die Lautstärke (0 ist meist sehr laut, 30 ist extrem leise)
                code += `${line} REM KANAL ${voiceIndex + 1}: FREQ=${voice.frequency}, VOL=${voice.volume}\n`;
                
                // HIER WÜRDE DEIN PC-SPEZIFISCHER BEFEHL STEHEN (z.B. POKE, SOUND, PLAY etc.)
                // code += `${line} SOUND ${voice.frequency},${duration}\n`;
                
                line += 10;
            }
        });

        // 4. Prüfe den Rausch-Kanal (Noise)
        if (step.noise.enabled) {
            // step.noise.type ist ein Wert von -1 bis -8
            // step.noise.volume ist die Lautstärke (0 bis 30)
            code += `${line} REM RAUSCHEN AKTIV: TYP=${step.noise.type}, VOL=${step.noise.volume}\n`;
            
            // HIER WÜRDE DEIN PC-SPEZIFISCHER NOISE BEFEHL STEHEN
            
            line += 10;
        }

        // Simuliere eine Verzögerung basierend auf der Dauer des Schritts
        code += `${line} PAUSE ${duration}\n`;
        line += 10;
    });

    // 5. Beende das Programm und führe es aus
    code += `${line} END\nRUN\n`;

    return code;
}
