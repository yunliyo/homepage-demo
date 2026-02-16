import "./hoisted.f11bf515.js";
class n {
    constructor() {
        this.hitokotoElement = document.getElementById("hitokoto"), this.fromElement = document.getElementById("hitokoto-from"), this.refreshBtn = document.getElementById("refresh-hitokoto"), this.container = document.querySelector(".hitokoto-container"), this.isLoading = !1, this.init()
    }
    init() {
        this.fetchHitokoto(), this.refreshBtn && this.refreshBtn.addEventListener("click", () => {
            this.fetchHitokoto()
        }), setInterval(() => {
            this.fetchHitokoto()
        }, 30 * 60 * 1e3)
    }
    async fetchHitokoto() {
        var t, e;
        if (!this.isLoading) {
            this.isLoading = !0, (t = this.container) == null || t.classList.add("loading");
            try {
                const o = await fetch("https://v1.hitokoto.cn", {
                    method: "GET",
                    headers: {
                        Accept: "application/json"
                    }
                });
                if (!o.ok) throw new Error(`HTTP error! status: ${o.status}`);
                const i = await o.json();
                this.displayHitokoto(i)
            } catch (o) {
                console.error("获取一言失败:", o), this.displayError()
            } finally {
                this.isLoading = !1, (e = this.container) == null || e.classList.remove("loading")
            }
        }
    }
    displayHitokoto(t) {
        this.hitokotoElement && this.fromElement && (this.hitokotoElement.style.opacity = "0", this.fromElement.style.opacity = "0", setTimeout(() => {
            var o;
            this.hitokotoElement.textContent = t.hitokoto || "今天也要加油哦~";
            let e = "";
            t.from && (e = `—— ${t.from}`, t.from_who && (e += ` · ${t.from_who}`)), this.fromElement.textContent = e, this.hitokotoElement.style.opacity = "1", this.fromElement.style.opacity = "1", (o = this.container) == null || o.classList.add("fade-in"), setTimeout(() => {
                var i;
                (i = this.container) == null || i.classList.remove("fade-in")
            }, 500)
        }, 150))
    }
    displayError() {
        this.hitokotoElement && this.fromElement && (this.hitokotoElement.textContent = "今天也要保持好心情哦~ ✨", this.fromElement.textContent = "—— 来自喵喵的祝福")
    }
}

function s() {
    new n
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s();
document.addEventListener("astro:page-load", s);