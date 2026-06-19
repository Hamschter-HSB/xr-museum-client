export function decodeUrlData() {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    
    if (!dataParam) return null;
    
    try {
        // Format: duration;f1,v1;f2,v2;f3,v3;n_en,n_type,n_vol|next_step...
        const stepsData = dataParam.split('|');
        return stepsData.map(stepStr => {
            const parts = stepStr.split(';');
            if (parts.length < 5) throw new Error("Invalid step format");
            
            const duration = parseInt(parts[0], 10);
            
            const voices = [];
            for (let i = 1; i <= 3; i++) {
                const [f, v] = parts[i].split(',').map(Number);
                voices.push({
                    frequency: f || 440,
                    volume: v || 0,
                    enabled: f > 0 // We infer enabled if frequency > 0
                });
            }
            
            const nParts = parts[4].split(',').map(Number);
            const noise = {
                enabled: nParts[0] === 1,
                type: nParts[1] || -4,
                volume: nParts[2] || 0
            };
            
            return { duration, voices, noise };
        });
    } catch (e) {
        console.error("Failed to decode data:", e);
        return null;
    }
}
