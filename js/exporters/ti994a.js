export function generateTI994A(steps) {
    let code = "100 REM TI-99/4A SOUND PROGRAMM\n";

    steps.forEach((step, index) => {
        const line = 110 + index * 10;
        const parts = [];

        step.voices.forEach(voice => {
            if (voice.enabled) {
                parts.push(`${voice.frequency},${voice.volume}`);
            }
        });

        if (step.noise.enabled) {
            parts.push(`${step.noise.type},${step.noise.volume}`);
        }

        if (parts.length === 0) {
            code += `${line} CALL SOUND(${step.duration},110,30)\n`;
        } else {
            code += `${line} CALL SOUND(${step.duration},${parts.join(",")})\n`;
        }
    });

    code += `${110 + steps.length * 10} END\n`;
    return code;
}
