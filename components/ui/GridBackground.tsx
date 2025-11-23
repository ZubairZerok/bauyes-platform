export function GridBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-background" />
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />
        </div>
    );
}
