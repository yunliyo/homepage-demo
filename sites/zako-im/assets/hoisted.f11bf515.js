var te = Object.defineProperty;
var ne = (e, t, n) => t in e ? te(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var w = (e, t, n) => (ne(e, typeof t != "symbol" ? t + "" : t, n), n);

function _() {
    const e = document.querySelectorAll(".btn");
    let t = 0;
    e.forEach(n => {
        n.style.width = "auto"
    }), e.forEach(n => {
        const o = n.offsetWidth;
        o > t && (t = o)
    }), e.forEach(n => {
        n.style.width = t + "px"
    }), document.documentElement.style.setProperty("--btn-width", t + "px")
}
window.addEventListener("load", _);
window.addEventListener("resize", _);

function oe(e, t) {
    let n;
    return function (...r) {
        const a = () => {
            clearTimeout(n), e(...r)
        };
        clearTimeout(n), n = setTimeout(a, t)
    }
}

function S() {
    const e = document.getElementById("hamburger-menu"),
        t = document.getElementById("mobile-menu");
    if (!e || !t) return;
    e.classList.remove("active"), t.classList.remove("active");
    const n = e.cloneNode(!0);
    e.parentNode.replaceChild(n, e);
    const o = document.getElementById("hamburger-menu"),
        r = document.getElementById("mobile-menu");
    if (o && r) {
        const a = oe(function () {
            o.classList.toggle("active"), r.classList.toggle("active")
        }, 100);
        o.addEventListener("click", function (s) {
            s.stopPropagation(), a()
        }), r.querySelectorAll(".menu-link").forEach(s => {
            s.addEventListener("click", function () {
                o.classList.remove("active"), r.classList.remove("active")
            })
        });
        const h = function (s) {
                s.target.closest(".navbar") || (o.classList.remove("active"), r.classList.remove("active"))
            },
            u = function (s) {
                s.key === "Escape" && (o.classList.remove("active"), r.classList.remove("active"))
            };
        document.removeEventListener("click", window.hamburgerOutsideClick), document.removeEventListener("keydown", window.hamburgerEscKey), document.addEventListener("click", h), document.addEventListener("keydown", u), window.hamburgerOutsideClick = h, window.hamburgerEscKey = u
    }
}
document.addEventListener("DOMContentLoaded", S);
document.addEventListener("astro:page-load", S);
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", S) : S();
class re {
    constructor() {
        this.isAnimating = !1, this.rafId = null, this.init()
    }
    init() {
        this.preloadElements(), this.optimizeTouchEvents(), this.handleVisibilityChange()
    }
    preloadElements() {
        this.menuBtn = document.getElementById("hamburger-menu"), this.menu = document.getElementById("mobile-menu"), this.menuBtn && this.menu && (this.menuBtn.style.willChange = "transform", this.menu.style.willChange = "transform, opacity")
    }
    optimizeTouchEvents() {
        const t = document.getElementById("hamburger-menu");
        t && (t.addEventListener("touchstart", () => {}, {
            passive: !0
        }), t.addEventListener("touchend", () => {}, {
            passive: !0
        }))
    }
    handleVisibilityChange() {
        document.addEventListener("visibilitychange", () => {
            document.hidden && this.rafId && cancelAnimationFrame(this.rafId)
        })
    }
    smoothToggle(t, n) {
        this.isAnimating || (this.isAnimating = !0, this.rafId = requestAnimationFrame(() => {
            t.classList.toggle(n), setTimeout(() => {
                this.isAnimating = !1, t.style.willChange && (t.style.willChange = "auto")
            }, 200)
        }))
    }
    reinit() {
        this.preloadElements(), this.optimizeTouchEvents()
    }
}
let M = null;

function T() {
    M ? M.reinit() : M = new re
}
typeof window != "undefined" && (document.addEventListener("DOMContentLoaded", T), document.addEventListener("astro:page-load", T), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", T) : T());
const ie = "astro:before-preparation",
    se = "astro:after-preparation",
    ae = "astro:before-swap",
    ce = "astro:after-swap",
    le = e => document.dispatchEvent(new Event(e));
class V extends Event {
    constructor(n, o, r, a, c, h, u, s, i) {
        super(n, o);
        w(this, "from");
        w(this, "to");
        w(this, "direction");
        w(this, "navigationType");
        w(this, "sourceElement");
        w(this, "info");
        w(this, "newDocument");
        this.from = r, this.to = a, this.direction = c, this.navigationType = h, this.sourceElement = u, this.info = s, this.newDocument = i, Object.defineProperties(this, {
            from: {
                enumerable: !0
            },
            to: {
                enumerable: !0,
                writable: !0
            },
            direction: {
                enumerable: !0,
                writable: !0
            },
            navigationType: {
                enumerable: !0
            },
            sourceElement: {
                enumerable: !0
            },
            info: {
                enumerable: !0
            },
            newDocument: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
class ue extends V {
    constructor(n, o, r, a, c, h, u, s, i) {
        super(ie, {
            cancelable: !0
        }, n, o, r, a, c, h, u);
        w(this, "formData");
        w(this, "loader");
        this.formData = s, this.loader = i.bind(this, this), Object.defineProperties(this, {
            formData: {
                enumerable: !0
            },
            loader: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
class de extends V {
    constructor(n, o, r) {
        super(ae, void 0, n.from, n.to, n.direction, n.navigationType, n.sourceElement, n.info, n.newDocument);
        w(this, "direction");
        w(this, "viewTransition");
        w(this, "swap");
        this.direction = n.direction, this.viewTransition = o, this.swap = r.bind(this, this), Object.defineProperties(this, {
            direction: {
                enumerable: !0
            },
            viewTransition: {
                enumerable: !0
            },
            swap: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
async function me(e, t, n, o, r, a, c, h) {
    const u = new ue(e, t, n, o, r, a, window.document, c, h);
    return document.dispatchEvent(u) && (await u.loader(), u.defaultPrevented || (le(se), u.navigationType !== "traverse" && C({
        scrollX,
        scrollY
    }))), u
}
async function fe(e, t, n) {
    const o = new de(e, t, n);
    return document.dispatchEvent(o), o.swap(), o
}
const C = e => {
        history.state && (history.scrollRestoration = "manual", history.replaceState({
            ...history.state,
            ...e
        }, ""))
    },
    B = !!document.startViewTransition,
    O = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
    P = (e, t) => e.origin === t.origin && e.pathname === t.pathname && e.search === t.search;
let x, E, k = !1,
    U;
const X = e => document.dispatchEvent(new Event(e)),
    Y = () => X("astro:page-load"),
    he = () => {
        let e = document.createElement("div");
        e.setAttribute("aria-live", "assertive"), e.setAttribute("aria-atomic", "true"), e.className = "astro-route-announcer", document.body.append(e), setTimeout(() => {
            var n;
            let t = document.title || ((n = document.querySelector("h1")) == null ? void 0 : n.textContent) || location.pathname;
            e.textContent = t
        }, 60)
    },
    y = "data-astro-transition-persist",
    K = "data-astro-transition",
    z = "data-astro-transition-fallback";
let L, p = 0;
history.state ? (p = history.state.index, scrollTo({
    left: history.state.scrollX,
    top: history.state.scrollY
})) : O() && (history.replaceState({
    index: p,
    scrollX,
    scrollY
}, ""), history.scrollRestoration = "manual");
const we = (e, t) => {
    let n = !1,
        o = !1;
    return (...r) => {
        if (n) {
            o = !0;
            return
        }
        e(...r), n = !0, setTimeout(() => {
            o && (o = !1, e(...r)), n = !1
        }, t)
    }
};
async function ge(e, t) {
    var n;
    try {
        const o = await fetch(e, t),
            r = (n = o.headers.get("content-type")) == null ? void 0 : n.replace(/;.*$/, "");
        return r !== "text/html" && r !== "application/xhtml+xml" ? null : {
            html: await o.text(),
            redirected: o.redirected ? o.url : void 0,
            mediaType: r
        }
    } catch (o) {
        return null
    }
}

function j() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}

function ye() {
    let e = Promise.resolve();
    for (const t of Array.from(document.scripts)) {
        if (t.dataset.astroExec === "") continue;
        const n = document.createElement("script");
        n.innerHTML = t.innerHTML;
        for (const o of t.attributes) {
            if (o.name === "src") {
                const r = new Promise(a => {
                    n.onload = a
                });
                e = e.then(() => r)
            }
            n.setAttribute(o.name, o.value)
        }
        n.dataset.astroExec = "", t.replaceWith(n)
    }
    return e
}
const G = (e, t, n, o) => {
    const r = P(t, e);
    let a = !1;
    if (e.href !== location.href && !o)
        if (n.history === "replace") {
            const c = history.state;
            history.replaceState({
                ...n.state,
                index: c.index,
                scrollX: c.scrollX,
                scrollY: c.scrollY
            }, "", e.href)
        } else history.pushState({
            ...n.state,
            index: ++p,
            scrollX: 0,
            scrollY: 0
        }, "", e.href);
    x = e, r || (scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }), a = !0), o ? scrollTo(o.scrollX, o.scrollY) : (e.hash ? (history.scrollRestoration = "auto", location.href = e.href) : a || scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }), history.scrollRestoration = "manual")
};

function ve(e) {
    const t = [];
    for (const n of e.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${y}="${n.getAttribute(y)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)) {
            const o = document.createElement("link");
            o.setAttribute("rel", "preload"), o.setAttribute("as", "style"), o.setAttribute("href", n.getAttribute("href")), t.push(new Promise(r => {
                ["load", "error"].forEach(a => o.addEventListener(a, r)), document.head.append(o)
            }))
        } return t
}
async function N(e, t, n, o) {
    const r = (i, m) => {
            const d = i.getAttribute(y),
                g = d && m.head.querySelector(`[${y}="${d}"]`);
            if (g) return g;
            if (i.matches("link[rel=stylesheet]")) {
                const v = i.getAttribute("href");
                return m.head.querySelector(`link[rel=stylesheet][href="${v}"]`)
            }
            return null
        },
        a = () => {
            const i = document.activeElement;
            if (i != null && i.closest(`[${y}]`)) {
                if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) {
                    const m = i.selectionStart,
                        d = i.selectionEnd;
                    return {
                        activeElement: i,
                        start: m,
                        end: d
                    }
                }
                return {
                    activeElement: i
                }
            } else return {
                activeElement: null
            }
        },
        c = ({
            activeElement: i,
            start: m,
            end: d
        }) => {
            i && (i.focus(), (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) && (i.selectionStart = m, i.selectionEnd = d))
        },
        h = i => {
            const m = document.documentElement,
                d = [...m.attributes].filter(({
                    name: l
                }) => (m.removeAttribute(l), l.startsWith("data-astro-")));
            [...i.newDocument.documentElement.attributes, ...d].forEach(({
                name: l,
                value: f
            }) => m.setAttribute(l, f));
            for (const l of document.scripts)
                for (const f of i.newDocument.scripts)
                    if (!l.src && l.textContent === f.textContent || l.src && l.type === f.type && l.src === f.src) {
                        f.dataset.astroExec = "";
                        break
                    } for (const l of Array.from(document.head.children)) {
                const f = r(l, i.newDocument);
                f ? f.remove() : l.remove()
            }
            document.head.append(...i.newDocument.head.children);
            const g = document.body,
                v = a();
            document.body.replaceWith(i.newDocument.body);
            for (const l of g.querySelectorAll(`[${y}]`)) {
                const f = l.getAttribute(y),
                    R = document.querySelector(`[${y}="${f}"]`);
                R && R.replaceWith(l)
            }
            c(v)
        };
    async function u(i) {
        function m(l) {
            const f = l.effect;
            return !f || !(f instanceof KeyframeEffect) || !f.target ? !1 : window.getComputedStyle(f.target, f.pseudoElement).animationIterationCount === "infinite"
        }
        const d = document.getAnimations();
        document.documentElement.setAttribute(z, i);
        const v = document.getAnimations().filter(l => !d.includes(l) && !m(l));
        return Promise.all(v.map(l => l.finished))
    }
    if (!k) document.documentElement.setAttribute(K, e.direction), o === "animate" && await u("old");
    else throw new DOMException("Transition was skipped");
    const s = await fe(e, E, h);
    G(s.to, s.from, t, n), X(ce), o === "animate" && !k && u("new").then(() => U())
}
async function J(e, t, n, o, r) {
    const a = r ? "traverse" : o.history === "replace" ? "replace" : "push";
    if (P(t, n) && !o.formData) {
        a !== "traverse" && C({
            scrollX,
            scrollY
        }), G(n, t, o, r);
        return
    }
    const c = await me(t, n, e, a, o.sourceElement, o.info, o.formData, u);
    if (c.defaultPrevented) {
        location.href = n.href;
        return
    }

    function h(s) {
        return s.to.hash === "" || !P(s.from, s.to) || s.sourceElement instanceof HTMLFormElement
    }
    async function u(s) {
        if (h(s)) {
            const i = s.to.href,
                m = {};
            s.formData && (m.method = "POST", m.body = s.formData);
            const d = await ge(i, m);
            if (d === null) {
                s.preventDefault();
                return
            }
            if (d.redirected && (s.to = new URL(d.redirected)), L != null || (L = new DOMParser), s.newDocument = L.parseFromString(d.html, d.mediaType), s.newDocument.querySelectorAll("noscript").forEach(v => v.remove()), !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !s.formData) {
                s.preventDefault();
                return
            }
            const g = ve(s.newDocument);
            g.length && await Promise.all(g)
        } else {
            s.newDocument = document;
            return
        }
    }
    if (k = !1, B) E = document.startViewTransition(async () => await N(c, o, r));
    else {
        const s = (async () => {
            await new Promise(i => setTimeout(i)), await N(c, o, r, j())
        })();
        E = {
            updateCallbackDone: s,
            ready: s,
            finished: new Promise(i => U = i),
            skipTransition: () => {
                k = !0
            }
        }
    }
    E.ready.then(async () => {
        await ye(), Y(), he()
    }), E.finished.then(() => {
        document.documentElement.removeAttribute(K), document.documentElement.removeAttribute(z)
    }), await E.ready
}
async function F(e, t) {
    if (!O()) {
        location.href = e;
        return
    }
    await J("forward", x, new URL(e, location.href), t != null ? t : {})
}

function Ee(e) {
    if (!O() && e.state) {
        location.reload();
        return
    }
    if (e.state === null) return;
    const t = history.state,
        n = t.index,
        o = n > p ? "forward" : "back";
    p = n, J(o, x, new URL(location.href), {}, t)
}
const q = () => {
    C({
        scrollX,
        scrollY
    })
}; {
    (B || j() !== "none") && (x = new URL(location.href), addEventListener("popstate", Ee), addEventListener("load", Y), "onscrollend" in window ? addEventListener("scrollend", q) : addEventListener("scroll", we(q, 350), {
        passive: !0
    }));
    for (const e of document.scripts) e.dataset.astroExec = ""
}
const Q = new Set,
    D = new WeakSet;
let b, A, $ = !1;

function be(e) {
    var t, n;
    $ || ($ = !0, b != null || (b = (t = e == null ? void 0 : e.prefetchAll) != null ? t : !1), A != null || (A = (n = e == null ? void 0 : e.defaultStrategy) != null ? n : "hover"), pe(), Te(), Le())
}

function pe() {
    for (const e of ["touchstart", "mousedown"]) document.body.addEventListener(e, t => {
        I(t.target, "tap") && H(t.target.href, {
            with: "fetch",
            ignoreSlowConnection: !0
        })
    }, {
        passive: !0
    })
}

function Te() {
    let e;
    document.body.addEventListener("focusin", o => {
        I(o.target, "hover") && t(o)
    }, {
        passive: !0
    }), document.body.addEventListener("focusout", n, {
        passive: !0
    }), ee(() => {
        for (const o of document.getElementsByTagName("a")) D.has(o) || I(o, "hover") && (D.add(o), o.addEventListener("mouseenter", t, {
            passive: !0
        }), o.addEventListener("mouseleave", n, {
            passive: !0
        }))
    });

    function t(o) {
        const r = o.target.href;
        e && clearTimeout(e), e = setTimeout(() => {
            H(r, {
                with: "fetch"
            })
        }, 80)
    }

    function n() {
        e && (clearTimeout(e), e = 0)
    }
}

function Le() {
    let e;
    ee(() => {
        for (const t of document.getElementsByTagName("a")) D.has(t) || I(t, "viewport") && (D.add(t), e != null || (e = Ae()), e.observe(t))
    })
}

function Ae() {
    const e = new WeakMap;
    return new IntersectionObserver((t, n) => {
        for (const o of t) {
            const r = o.target,
                a = e.get(r);
            o.isIntersecting ? (a && clearTimeout(a), e.set(r, setTimeout(() => {
                n.unobserve(r), e.delete(r), H(r.href, {
                    with: "link"
                })
            }, 300))) : a && (clearTimeout(a), e.delete(r))
        }
    })
}

function H(e, t) {
    var r, a;
    const n = (r = t == null ? void 0 : t.ignoreSlowConnection) != null ? r : !1;
    if (!Se(e, n)) return;
    if (Q.add(e), ((a = t == null ? void 0 : t.with) != null ? a : "link") === "link") {
        const c = document.createElement("link");
        c.rel = "prefetch", c.setAttribute("href", e), document.head.append(c)
    } else fetch(e).catch(c => {
        console.log(`[astro] Failed to prefetch ${e}`), console.error(c)
    })
}

function Se(e, t) {
    if (!navigator.onLine || !t && Z()) return !1;
    try {
        const n = new URL(e, location.href);
        return location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !Q.has(e)
    } catch (n) {}
    return !1
}

function I(e, t) {
    if ((e == null ? void 0 : e.tagName) !== "A") return !1;
    const n = e.dataset.astroPrefetch;
    return n === "false" ? !1 : t === "tap" && (n != null || b) && Z() ? !0 : n == null && b || n === "" ? t === A : n === t
}

function Z() {
    if ("connection" in navigator) {
        const e = navigator.connection;
        return e.saveData || /(2|3)g/.test(e.effectiveType)
    }
    return !1
}

function ee(e) {
    e();
    let t = !1;
    document.addEventListener("astro:page-load", () => {
        if (!t) {
            t = !0;
            return
        }
        e()
    })
}

function ke() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}

function W(e) {
    return e.dataset.astroReload !== void 0
}(B || ke() !== "none") && (document.addEventListener("click", e => {
    let t = e.target;
    if (t instanceof Element && (t = t.closest("a, area")), !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement)) return;
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal,
        o = t instanceof HTMLElement ? t.href : t.href.baseVal,
        r = new URL(o, location.href).origin;
    W(t) || t.hasAttribute("download") || !t.href || n && n !== "_self" || r !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || (e.preventDefault(), F(o, {
        history: t.dataset.astroHistory === "replace" ? "replace" : "auto",
        sourceElement: t
    }))
}), document.querySelector('[name="astro-view-transitions-forms"]') && document.addEventListener("submit", e => {
    var u, s, i;
    let t = e.target;
    if (t.tagName !== "FORM" || W(t)) return;
    const n = t,
        o = e.submitter,
        r = new FormData(n);
    let a = (s = (u = o == null ? void 0 : o.getAttribute("formaction")) != null ? u : n.action) != null ? s : location.pathname;
    const c = (i = o == null ? void 0 : o.getAttribute("formmethod")) != null ? i : n.method,
        h = {
            sourceElement: o != null ? o : n
        };
    if (c === "get") {
        const m = new URLSearchParams(r),
            d = new URL(a);
        d.search = m.toString(), a = d.toString()
    } else h.formData = r;
    e.preventDefault(), F(a, h)
}), be({
    prefetchAll: !0
}));