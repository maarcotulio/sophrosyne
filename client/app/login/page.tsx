import { TrendingUp, Star } from "lucide-react"
import { AuthForm } from "@/components/auth-form"

function Logo() {
  return (
    <svg className="size-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function LoginPage() {
  return (
    <div className="dark min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-6 lg:px-10 py-3 bg-card z-20 relative">
        <div className="flex items-center gap-4">
          <Logo />
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Sophrosyne</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            <a className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex w-full relative">
        <div className="flex flex-1 flex-col lg:flex-row h-full">
          {/* Left Side: Auth Form */}
          <div className="flex flex-1 flex-col justify-center items-center p-6 lg:p-12 xl:p-24 bg-card z-10">
            <AuthForm />
          </div>

          {/* Right Side: Hero Visual */}
          <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
            {/* Background with gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChy6tNNSRpbRa-3ykFPiljNKQg0_LMYELLJYwamP9EBbFp082vdjOq182z6BzUuUgjQmlFC0YXtt9j5xVdHefJfvOljG-qGVs03HuHb9OUyy71s4eeeVcX5kP1mc5FkY028BSwp_z1eCmYTm9ulUng3xmCV3Hxt60HlhdEYcdYizCVITJb72ucEdGCQJzAX5urQN-TETZl7rF9vftxR5z7gKzBySkJYqtPhYBtsKIPnpIQEiV030fZipemjeHompwKPYPkeHF1jZw')"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Success.</span>
              </h2>
              
              <div className="flex flex-col gap-4">
                <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                  Join thousands of high-performers building better habits, breaking bad ones, and tracking their life&apos;s progress.
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
                    <span className="text-xs text-slate-400 font-medium">Rated 4.9/5 by users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
