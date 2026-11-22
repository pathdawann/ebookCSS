const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// 1. Editor CSS en vivo + reinicio
const ed = $("#ed");
const initialCSS = ed.value;
function updateCSS() {
  $("#lst").textContent = "#lab{" + ed.value.replace(/@import|url\(|expression\(/gi, "") + "}";
}
ed.addEventListener("input", updateCSS);
$("#ed-reset").addEventListener("click", () => {
  ed.value = initialCSS;
  updateCSS();
});
updateCSS();

// 2. Activar / desactivar CSS en demo 1
$("#tg").addEventListener("click", (e) => {
  const o = $("#dm").classList.toggle("on");
  e.target.textContent = o ? "Quitar CSS" : "Poner CSS";
});

// 3. Anatomía de regla CSS
$$("#an button").forEach((b) =>
  b.addEventListener("click", () => ($("#an-n").textContent = b.dataset.k))
);

// 4. Pestañas de cómo añadir CSS
$$("[data-tab]").forEach((b) =>
  b.addEventListener("click", () => {
    $$("[data-tab]").forEach((x) => x.classList.toggle("on", x === b));
    ["i1", "i2", "i3"].forEach((id) => $("#" + id).classList.toggle("on", id === b.dataset.tab));
  })
);

// 5. Laboratorio de selectores
const S = [
  ["p", "Todos los párrafos."],
  [".nota", 'Elementos con class="nota".'],
  ["#unico", 'El único elemento con id="unico".'],
  ["ul li", "Los li que están dentro de un ul."],
  ["li:first-child", "El primer hijo de su contenedor."],
  ["li:nth-child(odd)", "Hijos en posición impar (1, 3, 5…)."],
  ["a[href]", "Enlaces que tienen atributo href."]
];

function ps(i) {
  $$("#chips .chip").forEach((c, j) => c.classList.toggle("on", i === j));
  $$("#sd .hl").forEach((n) => n.classList.remove("hl"));
  const n = $$("#sd " + S[i][0]);
  n.forEach((x) => x.classList.add("hl"));
  $("#sl-d").textContent =
    S[i][0] + " → " + S[i][1] + " Coincide con " + n.length + (n.length === 1 ? " elemento." : " elementos.");
}

S.forEach((s, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.textContent = s[0];
  b.addEventListener("click", () => ps(i));
  $("#chips").append(b);
});
ps(0);

// 6. Laboratorio de Modelo de Caja
function bx() {
  const p = $("#rp").value;
  const b = $("#rb").value;
  const m = $("#rm").value;
  const s = $("#bm").style;
  s.setProperty("--p", p + "px");
  s.setProperty("--b", b + "px");
  s.setProperty("--m", m + "px");
  $("#bm").firstElementChild.style.setProperty("--p", p + "px");
  $("#bm").firstElementChild.style.setProperty("--b", b + "px");
  $("#bm-c").textContent = ".caja {\n  padding: " + p + "px;\n  border: " + b + "px solid;\n  margin: " + m + "px;\n}";
}
["#rp", "#rb", "#rm"].forEach((i) => $(i).addEventListener("input", bx));
bx();

// 7. Laboratorio de Color y Tipografía
function lum(h) {
  return [1, 3, 5]
    .map((i) => parseInt(h.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
}

function ty() {
  const c = $("#tc").value;
  const b = $("#tb").value;
  const z = $("#ts").value;
  const r = $("#tr").value;
  const f = $("#tf").value;
  const e = $("#ty").style;
  e.color = c;
  e.background = b;
  e.fontSize = z + "px";
  e.borderRadius = r + "px";
  e.fontFamily = f;

  const l1 = lum(c);
  const l2 = lum(b);
  const q = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  $("#ty-c").textContent =
    ".texto {\n  color: " +
    c +
    ";\n  background: " +
    b +
    ";\n  font-size: " +
    z +
    "px;\n  border-radius: " +
    r +
    "px;\n  font-family: " +
    f.replace(/'/g, '"') +
    ";\n}";
  $("#ty-n").textContent =
    "Contraste " +
    q.toFixed(2).replace(".", ",") +
    ":1 · " +
    (q >= 4.5 ? "legible (cumple AA)" : "bajo: cuesta leerlo, sube el contraste");
}
["#tc", "#tb", "#ts", "#tr", "#tf"].forEach((i) => $(i).addEventListener("input", ty));
ty();

// 8. Laboratorio de Flexbox
function fx() {
  const d = $("#fd").value;
  const j = $("#fj").value;
  const a = $("#fa").value;
  const g = $("#fg").value;
  const s = $("#fx").style;
  s.display = "flex";
  s.flexDirection = d;
  s.justifyContent = j;
  s.alignItems = a;
  s.gap = g + "px";
  $("#fx-c").textContent =
    ".contenedor {\n  display: flex;\n  flex-direction: " +
    d +
    ";\n  justify-content: " +
    j +
    ";\n  align-items: " +
    a +
    ";\n  gap: " +
    g +
    "px;\n}";
}
["#fd", "#fj", "#fa", "#fg"].forEach((i) => $(i).addEventListener("input", fx));
fx();

// 9. Laboratorio de Grid
function gr() {
  const c = $("#gc").value;
  const g = $("#gg").value;
  const s = $("#gr").style;
  s.gridTemplateColumns = "repeat(" + c + ", 1fr)";
  s.gap = g + "px";
  $("#gr-c").textContent =
    ".contenedor {\n  display: grid;\n  grid-template-columns: repeat(" + c + ", 1fr);\n  gap: " + g + "px;\n}";
}
["#gc", "#gg"].forEach((i) => $(i).addEventListener("input", gr));
gr();

// 10. Laboratorio Responsive
function rs() {
  const w = +$("#rw").value;
  $("#rsw").style.width = w + "px";
  $("#rw-n").textContent = w + "px · " + (w >= 640 ? "3 columnas" : w >= 420 ? "2 columnas" : "1 columna");
}
$("#rw").addEventListener("input", rs);
rs();

// 11. Laboratorio de Transiciones y Animaciones
function ad() {
  $("#anb").style.setProperty("--d", $("#ad").value / 10 + "s");
}
$("#ad").addEventListener("input", ad);
ad();

$("#ak").addEventListener("click", (e) => {
  const k = $("#anb").classList.toggle("k");
  e.target.textContent = k ? "Detener" : "Animar";
});

// 12. Quiz interactivo con persistencia y reinicio
const Q = [
  ["¿Qué significa la C de CSS?", ["Cascading", "Computer", "Code"], 0],
  ['¿Qué selector elige elementos con class="nota"?', [".nota", "#nota", "nota"], 0],
  ["¿Qué espacio queda fuera del borde de una caja?", ["padding", "margin", "content"], 1],
  ["¿Qué propiedad activa Flexbox?", ["display: flex", "position: flex", "flex: display"], 0],
  ["¿Cuál es la forma recomendada de añadir CSS?", ["Archivo externo", "Atributo style en todo", "Etiqueta font"], 0],
  ["¿Para qué sirven las media queries?", ["Cambiar estilos según el ancho de pantalla", "Cargar imágenes", "Validar formularios"], 0]
];

function renderQuiz() {
  const qz = $("#qz");
  qz.innerHTML = "";
  $("#qs").textContent = "";
  const savedAnswers = JSON.parse(localStorage.getItem("css_guide_quiz") || "{}");
  let sc = 0;
  let an = 0;

  const updateScore = () => {
    if (an > 0) $("#qz-reset").hidden = false;
    if (an === Q.length) {
      $("#qs").textContent = "Resultado: " + sc + " de " + Q.length + (sc === Q.length ? " · ¡perfecto!" : "");
    }
  };

  Q.forEach(([q, o, r], qIdx) => {
    const w = document.createElement("div");
    w.className = "mt-16";
    const p = document.createElement("b");
    p.textContent = q;
    w.append(p);

    const applyAnswer = (chosenIdx) => {
      if (w.dataset.d) return;
      w.dataset.d = "1";
      an++;
      const buttons = [...w.querySelectorAll("button")];
      buttons.forEach((btn) => (btn.disabled = true));
      if (chosenIdx === r) {
        sc++;
        buttons[chosenIdx].classList.add("ok");
      } else {
        buttons[chosenIdx].classList.add("no");
        buttons[r].classList.add("ok");
      }
      savedAnswers[qIdx] = chosenIdx;
      localStorage.setItem("css_guide_quiz", JSON.stringify(savedAnswers));
      updateScore();
    };

    o.forEach((t, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = t;
      b.addEventListener("click", () => applyAnswer(i));
      w.append(b);
    });

    qz.append(w);
    if (savedAnswers[qIdx] !== undefined) {
      applyAnswer(savedAnswers[qIdx]);
    }
  });
}

$("#qz-reset").addEventListener("click", () => {
  localStorage.removeItem("css_guide_quiz");
  $("#qz-reset").hidden = true;
  renderQuiz();
});
renderQuiz();

// 13. Notas resumen ("Recuerda") y enlaces de regreso
const RC = {
  t1: "HTML pone el contenido; CSS lo viste.",
  t2: "Una regla es selector + propiedad: valor.",
  t3: "Usa un archivo .css externo para todo el sitio.",
  t4: "El selector decide a qué elementos aplica la regla.",
  t5: "Toda caja tiene content, padding, border y margin.",
  t6: "Cuida el contraste: texto legible, mínimo 4,5:1.",
  t7: "Flexbox ordena en una dimensión: fila o columna.",
  t8: "Grid ordena en filas y columnas a la vez.",
  t9: "Diseña primero para móvil y añade reglas para pantallas grandes.",
  t10: "transition suaviza cambios; @keyframes crea animaciones.",
  t11: "Repasa el capítulo de cada pregunta que fallaste.",
  t12: "Practica un poco todos los días."
};

$$(".sheet[id]").forEach((s) => {
  if (s.id === "toc") return;
  const r = RC[s.id];
  if (r) {
    const d = document.createElement("div");
    d.className = "note mt-18";
    d.innerHTML = "<b>Recuerda:</b> ";
    d.append(r);
    s.append(d);
  }
  const a = document.createElement("a");
  a.className = "btn back-toc";
  a.href = "#toc";
  a.textContent = "↑ Volver al contenido";
  s.append(a);
});

// 14. Progreso de lectura y tema oscuro/claro
const LK = $$(".toc a");
function markProgress() {
  let n = 0;
  LK.forEach((a) => {
    const d = document.querySelector(a.hash).getBoundingClientRect().bottom < innerHeight * 0.95;
    a.classList.toggle("done", d);
    if (d) n++;
  });
  $("#toc-n").textContent = n + " de " + LK.length + " capítulos recorridos";
  $("#nav-prog").textContent = n + " / " + LK.length;

  const h = document.documentElement;
  const maxScroll = h.scrollHeight - innerHeight;
  $("#pg").style.width = maxScroll > 0 ? (scrollY / maxScroll) * 100 + "%" : "0%";
}
addEventListener("scroll", markProgress, { passive: true });
markProgress();

const thBtn = $("#th");
function syncThemeLabel() {
  const isDark =
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
  thBtn.textContent = isDark ? "☀️ Claro" : "🌙 Oscuro";
}

const savedTheme = localStorage.getItem("css_guide_theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
syncThemeLabel();

thBtn.addEventListener("click", () => {
  const r = document.documentElement;
  const isDark = r.dataset.theme
    ? r.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;
  const next = isDark ? "light" : "dark";
  r.dataset.theme = next;
  localStorage.setItem("css_guide_theme", next);
  syncThemeLabel();
});