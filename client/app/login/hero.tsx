export default function Hero() {
    return (
        <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden justify-center items-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                }}
            />
            
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse" />
            
            {/* Floating Orbs */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_1s]" />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center p-16 h-full max-w-2xl">
                <h2 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
                    Consistency <br /> is the key to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300 animate-[shimmer_3s_linear_infinite]">
                        Success.
                    </span>
                </h2>

                <div className="flex flex-col gap-4">
                    <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                        Join to build better habits, break bad ones, and track your progress.
                    </p>
                </div>
            </div>
        </div>
    );
}
