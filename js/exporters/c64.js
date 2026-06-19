export function generateC64(steps) {
    let code = "NEW\n";
    code += "20 S=54272: FOR I=0 TO 24: POKE S+I,0: NEXT I\n";
    code += "30 POKE S+24,15 : REM MAX VOLUME\n";

    let line = 40;
    steps.forEach((step, index) => {
        code += `${line} REM STEP ${index + 1}\n`;
        line += 10;
        
        let hasActiveVoice = false;
        
        step.voices.forEach((voice, vIndex) => {
            if (voice.enabled) {
                hasActiveVoice = true;
                const offset = vIndex * 7;
                // Basic formula to convert Hz to SID frequency (approx)
                const freq = Math.floor(voice.frequency * 16.777216);
                const hi = Math.floor(freq / 256);
                const lo = freq % 256;
                code += `${line} POKE S+${offset},${lo}: POKE S+${offset+1},${hi}\n`;
                line += 10;
                code += `${line} POKE S+${offset+4},129 : REM SQUARE WAVE + GATE\n`;
                line += 10;
            }
        });
        
        if (step.noise.enabled) {
             hasActiveVoice = true;
             code += `${line} POKE S+14,150: POKE S+15,15\n`;
             line += 10;
             code += `${line} POKE S+18,129 : REM NOISE WAVE + GATE\n`;
             line += 10;
        }
        
        if (hasActiveVoice) {
            code += `${line} FOR D=1 TO ${Math.floor(step.duration / 10)}: NEXT D\n`;
            line += 10;
            
            // Turn off voices
            step.voices.forEach((voice, vIndex) => {
                if (voice.enabled) {
                    const offset = vIndex * 7;
                    code += `${line} POKE S+${offset+4},128\n`;
                    line += 10;
                }
            });
            if (step.noise.enabled) {
                 code += `${line} POKE S+18,128\n`;
                 line += 10;
            }
        }
    });

    code += `${line} END\nRUN\n`;
    return code;
}
