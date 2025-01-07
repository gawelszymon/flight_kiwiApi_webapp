const reportWebVitals = (onPerfEntry?: (entry: unknown) => void) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onINP(onPerfEntry);
            onFCP(onPerfEntry);
            onTTFB(onPerfEntry);
            onLCP(onPerfEntry);
        });
    }
};

export default reportWebVitals;