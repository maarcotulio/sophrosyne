import { TrendingUp, Star } from "lucide-react"

export default function Hero() {
    return (
        <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
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
            <div className="relative z-10 flex flex-col justify-end p-16 pb-24 h-full max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold w-fit mb-6 backdrop-blur-sm">
                    <TrendingUp className="size-4" />
                    <span>Tracking 2M+ Habits</span>
                </div>

                <h2 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
                    Consistency <br /> is the key to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
                        Success.
                    </span>
                </h2>

                <div className="flex flex-col gap-4">
                    <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                        Join thousands of high-performers building better
                        habits, breaking bad ones, and tracking their
                        life&apos;s progress.
                    </p>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex -space-x-3">
                            <img
                                className="size-10 rounded-full border-2 border-background"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe-nGy6LSGzdvwICmhaluLYXlIoYpgq0xwoW2YyWfZcawq3YcV1ci0O2X9Fmvvm_CiTzYre7KHPrFVvhsp1i4ZKBDvGzMjv0V8658GLEb3b9aEVt65szp4w1fkZ8OHuXMkCJPmja0SN0brNsQ6kQxcJLhwsvxeTEwsJukHzuJZ6ZcaA5oP_Crqks70rlie0OCoPGN4LGeFm_P5_yTOgcxbP03TBFPAj7BUGjYCo3FkNaAu0V-23xitwx81rGmrAwHQvBzHtdSwbkE"
                                alt="User avatar"
                            />
                            <img
                                className="size-10 rounded-full border-2 border-background"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDomKPjSi-wmuLu3Lwz-6e48uwxExXAEhdWByYdEo_HgANYRUOBKiAzkXDMO0u_0ACI8Pu8Uie_YWyA5_VgHmvwCpRjNc_8Cxq_p4HEXq3sGhlDtU7DgnlmQIta7y6dJ9GYNtx90ZCbmI6WztO911NQ8wyzvZOBsYjXexDkfATY0EGhkpVN2XMto7GK_wI7GnX3X8uBVX9kvO0uThzwxI3exvKfcgFZ9m61wMTfyiPV4z1PJn2MssGkPG94WYgEdDYIvfi8nHRM9ng"
                                alt="User avatar"
                            />
                            <img
                                className="size-10 rounded-full border-2 border-background"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaJ1AxW0Aj2Lc-KufnzpxBFOiRsDdyB4zrOBrQNh2RT4eiaBaMEidAzDRdKJeE-R6gnBFj7Sd0E_AYilclqyHHQ0cHTenhQqXSjmuOUmLJAjTW1AulwSzYKw4yXGQ6Fx2un-XeBI6xhaxC5Aw0vPq3YQ3ep6O5HN2vRjiw_3Zh1ZROI2hpg4zyuahvh8cwvMk3gxR6WIFScB7lr_9fBdCFrvC07FaLzAGId5wC74H5bL4-tR_eC2Y7E7fG1wFvs7yjsMuLuxE5Zhg"
                                alt="User avatar"
                            />
                            <div className="size-10 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center text-xs font-medium">
                                +2k
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-400">
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                                <Star className="size-4 fill-current" />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                                Rated 4.9/5 by users
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
