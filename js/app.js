import { generateTI994A } from './exporters/ti994a.js';
import { generateC64 } from './exporters/c64.js';
import { decodeUrlData } from './decoder.js';

let currentData = null;

document.addEventListener('DOMContentLoaded', () => {
    currentData = decodeUrlData();
    
    const errorMsg = document.getElementById('error-msg');
    const codeContainer = document.querySelector('.code-container');
    const computerSelect = document.getElementById('computer-select');
    const copyBtn = document.getElementById('copy-btn');
    
    if (!currentData || !Array.isArray(currentData) || currentData.length === 0) {
        errorMsg.classList.remove('hidden');
        codeContainer.style.display = 'none';
        
        // Load some dummy data for testing if no URL params
        console.log("No data found in URL, using dummy data for demonstration.");
        currentData = [
            {
                duration: 500,
                voices: [
                    { frequency: 440, volume: 15, enabled: true },
                    { frequency: 550, volume: 22, enabled: false },
                    { frequency: 660, volume: 22, enabled: false }
                ],
                noise: { enabled: true, type: -4, volume: 8 }
            }
        ];
        
        errorMsg.innerHTML = "No sound data found in URL. Showing dummy data.";
        errorMsg.classList.remove('hidden');
        codeContainer.style.display = 'block';
    }
    
    computerSelect.addEventListener('change', updateCode);
    
    copyBtn.addEventListener('click', () => {
        const output = document.getElementById('output');
        output.select();
        document.execCommand('copy');
        copyBtn.innerText = "COPIED!";
        setTimeout(() => copyBtn.innerText = "Copy Code", 2000);
    });
    
    updateCode();
});

function updateCode() {
    if (!currentData) return;
    
    const computerSelect = document.getElementById('computer-select');
    const output = document.getElementById('output');
    
    if (computerSelect.value === 'ti994a') {
        output.value = generateTI994A(currentData);
    } else if (computerSelect.value === 'c64') {
        output.value = generateC64(currentData);
    }
}
