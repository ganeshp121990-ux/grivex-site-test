import { useState, useEffect, useRef } from 'react';

type AssetType = 'image' | 'audio' | 'video';

interface AssetLoaderOptions {
    autoStart?: boolean;
    timeout?: number;
}

export function useAssetLoader(assets: string[], options: AssetLoaderOptions = {}) {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Store references to avoid re-triggering effect on every render if array reference changes
    const assetsRef = useRef(assets);
    // Determine asset type based on extension
    const getAssetType = (url: string): AssetType => {
        const ext = url.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return 'image';
        if (['mp3', 'wav', 'ogg'].includes(ext || '')) return 'audio';
        if (['mp4', 'webm', 'mov'].includes(ext || '')) return 'video';
        return 'image'; // Default to image
    };

    useEffect(() => {
        const urls = assetsRef.current;
        if (!urls.length) {
            setProgress(100);
            setLoaded(true);
            return;
        }

        let loadedCount = 0;
        let isMounted = true;
        const total = urls.length;

        const handleItemLoad = () => {
            if (!isMounted) return;
            loadedCount++;
            const currentProgress = Math.round((loadedCount / total) * 100);
            setProgress(currentProgress);

            if (loadedCount === total) {
                setLoaded(true);
            }
        };

        const handleItemError = (url: string) => {
            console.warn(`Failed to reload asset: ${url}`);
            if (!isMounted) return;
            setHasError(true);
            // Treat error as loaded to not block the flow
            handleItemLoad();
        };

        urls.forEach(url => {
            const type = getAssetType(url);

            if (type === 'image') {
                const img = new Image();
                img.onload = () => handleItemLoad();
                img.onerror = () => handleItemError(url);
                img.src = url;
                if (img.complete && img.naturalHeight !== 0) {
                    img.onload = null;
                    img.onerror = null;
                    handleItemLoad();
                }
            } else if (type === 'audio') {
                const audio = new Audio();
                audio.oncanplaythrough = () => handleItemLoad();
                audio.onerror = () => handleItemError(url);
                audio.src = url;
                audio.load();
            } else if (type === 'video') {
                const video = document.createElement('video');
                video.oncanplaythrough = () => handleItemLoad();
                video.onerror = () => handleItemError(url);
                video.src = url;
                video.load();
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return { progress, loaded, hasError };
}
