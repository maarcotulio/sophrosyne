export default function Hero() {
    return (
        <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden justify-center items-center">
            {/* Background with gradient */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChy6tNNSRpbRa-3ykFPiljNKQg0_LMYELLJYwamP9EBbFp082vdjOq182z6BzUuUgjQmlFC0YXtt9j5xVdHefJfvOljG-qGVs03HuHb9OUyy71s4eeeVcX5kP1mc5FkY028BSwp_z1eCmYTm9ulUng3xmCV3Hxt60HlhdEYcdYizCVITJb72ucEdGCQJzAX5urQN-TETZl7rF9vftxR5z7gKzBySkJYqtPhYBtsKIPnpIQEiV030fZipemjeHompwKPYPkeHF1jZw')",
                }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center p-16 h-full max-w-2xl">
                <h2 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
                    Consistency <br /> is the key to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
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
