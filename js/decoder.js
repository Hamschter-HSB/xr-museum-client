export function decodeUrlData() {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    
    if (!dataParam) {
        return null;
    }
    
    try {
        const jsonStr = atob(dataParam);
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to decode data:", e);
        return null;
    }
}
