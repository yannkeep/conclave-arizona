(() => {
  "use strict";

  const data = window.ARIZONA_DATA;
  if (!data) return;

  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(`arizona:${key}`);
        return value === null ? fallback : JSON.parse(value);
      } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(`arizona:${key}`, JSON.stringify(value)); } catch (_) { /* private mode */ }
    }
  };

  const appState = {
    saved: storage.get("saved", []),
    checklist: storage.get("checklist", []),
    theme: storage.get("theme", "dark"),
    searchResults: [],
    searchIndex: -1,
    toastTimer: null,
    sourceFilter: "all",
    sourceQuery: ""
  };

  const normalize = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const slug = (value) => normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const formatNumber = (value) => new Intl.NumberFormat("fr-BE", {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(value);
  const sourceMap = new Map(data.sources.map((source) => [source.id, source]));

  const toast = (message) => {
    const element = document.getElementById("toast");
    element.textContent = message;
    element.classList.add("visible");
    clearTimeout(appState.toastTimer);
    appState.toastTimer = setTimeout(() => element.classList.remove("visible"), 2800);
  };

  const download = (name, content, type = "text/plain") => {
    const blob = new Blob([content], {type: `${type};charset=utf-8`});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const success = document.execCommand("copy");
      area.remove();
      return success;
    }
  };

  const isSaved = (type, id) => appState.saved.some((item) => item.type === type && item.id === id);

  const saveItem = (item) => {
    const existingIndex = appState.saved.findIndex((saved) => saved.type === item.type && saved.id === item.id);
    if (existingIndex >= 0) {
      appState.saved.splice(existingIndex, 1);
      toast("Retiré de votre dossier local");
    } else {
      appState.saved.unshift({...item, savedAt: new Date().toISOString()});
      toast("Ajouté à votre dossier local");
    }
    storage.set("saved", appState.saved);
    renderSaved();
    syncSaveButtons();
  };

  const syncSaveButtons = () => {
    document.querySelectorAll("[data-bookmark-type]").forEach((button) => {
      const saved = isSaved(button.dataset.bookmarkType, button.dataset.bookmarkId);
      button.classList.toggle("saved", saved);
      button.setAttribute("aria-label", saved ? "Retirer des éléments sauvegardés" : "Sauvegarder cet élément");
      button.textContent = saved ? "◆" : "◇";
    });
    const currentButton = document.querySelector("[data-save-current]");
    if (currentButton?.dataset.saveId) currentButton.classList.toggle("saved", isSaved("node", currentButton.dataset.saveId));
    document.querySelector(".saved-count").textContent = appState.saved.length;
  };

  const renderSaved = () => {
    const list = document.getElementById("saved-list");
    list.replaceChildren();
    if (!appState.saved.length) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "Aucun élément sauvegardé. Utilisez les losanges dans le graphe et les fiches.";
      list.appendChild(empty);
    } else {
      appState.saved.forEach((item) => {
        const row = document.createElement("button");
        row.className = "saved-item";
        row.type = "button";
        row.innerHTML = `<span class="result-type">${item.type === "node" ? "graphe" : "angle mort"}</span><span class="result-copy"><strong></strong><span></span></span><span class="result-arrow">↗</span>`;
        row.querySelector("strong").textContent = item.title;
        row.querySelector(".result-copy span").textContent = item.subtitle || "Élément sauvegardé";
        row.addEventListener("click", () => {
          document.getElementById("saved-dialog").close();
          if (item.type === "node" && window.ArizonaGraph) window.ArizonaGraph.selectNode(item.id);
          document.querySelector(item.href || "#graphe")?.scrollIntoView({behavior: "smooth"});
        });
        list.appendChild(row);
      });
    }
    syncSaveButtons();
  };

  const renderBlindspots = () => {
    const grid = document.getElementById("blindspot-grid");
    data.blindspots.forEach((item) => {
      const article = document.createElement("article");
      article.className = "blindspot-card";
      article.id = `angle-${item.id}`;
      article.dataset.domain = item.domain;
      article.innerHTML = `
        <div class="blindspot-card-head">
          <div class="blindspot-top"><span>${item.number} / ${item.label.toUpperCase()}</span><span class="severity" aria-label="Criticité ${item.severity} sur 5">${Array.from({length: 5}, (_, index) => `<i class="${index < item.severity ? "on" : ""}"></i>`).join("")}</span><button type="button" class="bookmark-button" data-bookmark-type="blindspot" data-bookmark-id="${item.id}" aria-label="Sauvegarder cet angle mort">◇</button></div>
          <h3>${item.title}</h3>
          <p class="lead">${item.lead}</p>
        </div>
        <button class="blindspot-toggle" type="button" aria-expanded="false" aria-controls="detail-${item.id}"><span>OUVRIR LA FICHE</span><span aria-hidden="true">＋</span></button>
        <div class="blindspot-detail" id="detail-${item.id}">
          <dl><div><dt>Risque</dt><dd>${item.risk}</dd></div><div><dt>Question décisive</dt><dd>${item.question}</dd></div><div><dt>Contrôle recommandé</dt><dd>${item.action}</dd></div></dl>
          <div class="blindspot-sources">${item.sources.map((id) => `<a href="${sourceMap.get(id)?.url || `#source-${id}`}" target="_blank" rel="noopener noreferrer">${id}</a>`).join("")}</div>
        </div>`;
      article.querySelector(".blindspot-toggle").addEventListener("click", (event) => {
        const expanded = article.classList.toggle("expanded");
        event.currentTarget.setAttribute("aria-expanded", String(expanded));
        event.currentTarget.querySelector("span:first-child").textContent = expanded ? "FERMER LA FICHE" : "OUVRIR LA FICHE";
      });
      article.querySelector("[data-bookmark-type]").addEventListener("click", () => saveItem({type: "blindspot", id: item.id, title: item.title, subtitle: `Angle mort ${item.number}`, href: `#angle-${item.id}`}));
      grid.appendChild(article);
    });
  };

  const renderParties = () => {
    const orbit = document.getElementById("party-orbit");
    Object.entries(data.parties).forEach(([id, party], index) => {
      const angle = party.angle * Math.PI / 180;
      const x = 50 + Math.cos(angle) * 36;
      const y = 50 + Math.sin(angle) * 36;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `party-button${index === 0 ? " active" : ""}`;
      button.dataset.party = id;
      button.style.setProperty("--x", `${x}%`);
      button.style.setProperty("--y", `${y}%`);
      button.textContent = party.short;
      button.addEventListener("click", () => selectParty(id));
      orbit.appendChild(button);
    });
    selectParty("nva");

    const tbody = document.getElementById("tension-body");
    data.tensions.forEach((tension) => {
      const row = document.createElement("tr");
      row.innerHTML = `<th scope="row">${tension.axis}</th><td>${tension.a}</td><td>${tension.b}</td><td><span class="tension-meter" aria-label="${tension.level} sur 5">${Array.from({length: 5}, (_, i) => `<i class="${i < tension.level ? "on" : ""}"></i>`).join("")}</span></td><td>${tension.compromise}</td>`;
      tbody.appendChild(row);
    });
  };

  const selectParty = (id) => {
    const party = data.parties[id];
    if (!party) return;
    document.querySelectorAll(".party-button").forEach((button) => button.classList.toggle("active", button.dataset.party === id));
    document.getElementById("party-role").textContent = party.role;
    document.getElementById("party-name").textContent = party.short;
    document.getElementById("party-axis").textContent = party.axis;
    document.getElementById("party-redline").textContent = party.redLine;
    document.getElementById("party-open").textContent = party.open;
    document.getElementById("party-friction").textContent = party.friction;
    document.getElementById("party-source").textContent = party.source;
  };

  const renderEvidence = () => {
    const body = document.getElementById("evidence-matrix-body");
    data.evidenceMatrix.forEach((row) => {
      const tr = document.createElement("tr");
      const header = document.createElement("th");
      header.scope = "row";
      header.textContent = row.criterion;
      tr.appendChild(header);
      row.values.forEach((value) => {
        const cell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `evidence-badge ${slug(value)}`;
        badge.textContent = value;
        cell.appendChild(badge);
        tr.appendChild(cell);
      });
      body.appendChild(tr);
    });

    const protocol = document.getElementById("status-protocol-list");
    data.statuses.forEach((status) => {
      const article = document.createElement("article");
      article.className = "status-card";
      article.innerHTML = `<span>${status.n}</span><h4>${status.title}</h4><p>${status.desc}</p>`;
      protocol.appendChild(article);
    });
  };

  const renderScenario = (id) => {
    const scenario = data.scenarios[id];
    const panel = document.getElementById("scenario-panel");
    panel.innerHTML = `
      <div class="scenario-copy"><span class="scenario-code">SCÉNARIO ${scenario.code} / PROFIL QUALITATIF</span><h3>${scenario.name}</h3><p>${scenario.deck}</p><p>${scenario.reading}</p><div class="scenario-tags">${scenario.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div>
      <div class="scenario-chart" aria-label="Profil de risques du scénario">${Object.entries(scenario.ratings).map(([label, value]) => `<div class="risk-row"><span>${label}</span><div class="risk-track"><i style="width:${value * 20}%"></i></div><b>${value}</b></div>`).join("")}</div>`;
  };

  const initScenarios = () => {
    document.querySelectorAll("[data-scenario]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-scenario]").forEach((other) => other.setAttribute("aria-selected", String(other === button)));
        renderScenario(button.dataset.scenario);
      });
    });
    renderScenario("mix");
  };

  const renderTimeline = () => {
    const timeline = document.getElementById("timeline");
    data.timeline.forEach((item) => {
      const article = document.createElement("article");
      article.className = "timeline-item";
      article.dataset.status = item.status;
      article.innerHTML = `<span class="timeline-year">${item.year}</span><h3>${item.title}</h3><p>${item.text}</p><span class="timeline-status">${item.status}</span>`;
      timeline.appendChild(article);
    });
  };

  const updateChecklist = () => {
    const total = data.checklist.length;
    const checked = appState.checklist.length;
    document.getElementById("checklist-count").textContent = `${checked} / ${total} contrôles`;
    document.getElementById("checklist-bar").style.width = `${checked / total * 100}%`;
  };

  const renderChecklist = () => {
    const list = document.getElementById("decision-checklist");
    data.checklist.forEach((question, index) => {
      const item = document.createElement("li");
      const checked = appState.checklist.includes(index);
      item.innerHTML = `<label><input type="checkbox" ${checked ? "checked" : ""} data-check-index="${index}"><span class="check-box" aria-hidden="true"></span><p>${question}</p></label>`;
      item.querySelector("input").addEventListener("change", (event) => {
        if (event.currentTarget.checked && !appState.checklist.includes(index)) appState.checklist.push(index);
        if (!event.currentTarget.checked) appState.checklist = appState.checklist.filter((value) => value !== index);
        storage.set("checklist", appState.checklist);
        updateChecklist();
      });
      list.appendChild(item);
    });
    updateChecklist();
  };

  const renderSources = () => {
    const ledger = document.getElementById("source-ledger");
    data.sources.forEach((source) => {
      const link = document.createElement("a");
      link.className = "source-row";
      link.id = `source-${source.id}`;
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.dataset.area = source.area;
      link.dataset.search = normalize([source.id, source.org, source.title, source.date, ...source.tags].join(" "));
      link.innerHTML = `<span class="source-id">${source.id}</span><span class="source-org">${source.org}</span><span class="source-title">${source.title}<span class="source-tags">${source.tags.map((tag) => `<span>${tag}</span>`).join("")}</span></span><span class="source-date">${source.date}</span><span class="source-arrow">↗</span>`;
      ledger.appendChild(link);
    });
  };

  const filterSources = () => {
    document.querySelectorAll(".source-row").forEach((row) => {
      const areaMatches = appState.sourceFilter === "all" || row.dataset.area === appState.sourceFilter;
      const queryMatches = !appState.sourceQuery || row.dataset.search.includes(appState.sourceQuery);
      row.hidden = !(areaMatches && queryMatches);
    });
  };

  const initSimulator = () => {
    const container = document.getElementById("simulator-sliders");
    data.simulator.sliders.forEach((slider) => {
      const wrapper = document.createElement("div");
      wrapper.className = "sim-slider";
      wrapper.innerHTML = `<div class="sim-slider-head"><label for="sim-${slider.id}">${slider.label}</label><output for="sim-${slider.id}" id="out-${slider.id}"></output></div><input type="range" id="sim-${slider.id}" data-sim="${slider.id}" min="${slider.min}" max="${slider.max}" step="${slider.step}"><div class="sim-scale"><span>${slider.min}${slider.unit === "%" ? "%" : ""}</span><span>${slider.max}${slider.unit === "%" ? "%" : ""}</span></div>`;
      wrapper.querySelector("input").addEventListener("input", () => {
        document.querySelectorAll(".preset").forEach((button) => button.classList.remove("active"));
        updateSimulator();
      });
      container.appendChild(wrapper);
    });
    document.querySelectorAll("[data-preset]").forEach((button) => button.addEventListener("click", () => setPreset(button.dataset.preset)));
    setPreset("prudent");
  };

  const setPreset = (name) => {
    const values = data.simulator[name];
    if (!values) return;
    Object.entries(values).forEach(([id, value]) => {
      const input = document.querySelector(`[data-sim="${id}"]`);
      if (input) input.value = value;
    });
    document.querySelectorAll("[data-preset]").forEach((button) => button.classList.toggle("active", button.dataset.preset === name));
    updateSimulator();
  };

  const updateSimulator = () => {
    const values = {};
    data.simulator.sliders.forEach((slider) => {
      const input = document.querySelector(`[data-sim="${slider.id}"]`);
      const value = Number(input.value);
      values[slider.id] = value;
      document.getElementById(`out-${slider.id}`).textContent = `${formatNumber(value)} ${slider.unit}`;
      const progress = (value - slider.min) / (slider.max - slider.min) * 100;
      input.style.setProperty("--range-progress", `${progress}%`);
    });

    const afterOverlap = Math.max(0, values.headline - values.overlap);
    const phasingLoss = afterOverlap * values.phasing / 100;
    const afterPhasing = afterOverlap - phasingLoss;
    const behaviorLoss = afterPhasing * values.behavior / 100;
    const net = Math.max(0, afterPhasing - behaviorLoss - values.transfers - values.admin);
    const ratio = values.headline ? Math.min(100, net / values.headline * 100) : 0;

    document.getElementById("net-value").textContent = formatNumber(net);
    document.getElementById("credibility-gauge").style.width = `${ratio}%`;
    document.getElementById("credibility-ratio").textContent = `${Math.round(ratio)} % du montant affiché`;

    const waterfall = [
      ["Annonce", values.headline, true],
      ["Base / double compte", values.overlap, false],
      ["Calendrier", phasingLoss, false],
      ["Comportements", behaviorLoss, false],
      ["Transferts", values.transfers, false],
      ["Exécution", values.admin, false]
    ];
    document.getElementById("waterfall").innerHTML = waterfall.map(([label, value, positive]) => `<div class="waterfall-row ${positive ? "positive" : ""}"><span>${label}</span><div class="waterfall-track"><i style="width:${Math.min(100, value / Math.max(values.headline, .1) * 100)}%"></i></div><b>${positive ? "" : "−"}${formatNumber(value)}</b></div>`).join("");

    const code = document.getElementById("output-code");
    const verdict = document.getElementById("output-verdict");
    if (ratio >= 80) {
      code.textContent = "SIGNAL VERT";
      code.style.color = "var(--green)";
      verdict.textContent = "Les décotes restent contenues. Il faut encore prouver la base juridique et le profil annuel.";
    } else if (ratio >= 55) {
      code.textContent = "SIGNAL AMBRE";
      code.style.color = "var(--amber)";
      verdict.textContent = "Une réserve de prudence est nécessaire, avec des clauses correctives et un suivi trimestriel.";
    } else {
      code.textContent = "SIGNAL ROUGE";
      code.style.color = "var(--coral)";
      verdict.textContent = "Le rendement crédible s’éloigne fortement de l’annonce. Le paquet doit être reventilé ou renforcé.";
    }
  };

  const buildSearchIndex = () => {
    const graph = data.graph.nodes.map((node) => ({type: "graphe", id: node.id, title: node.label, subtitle: node.description, keywords: [node.kicker, node.status, node.question, ...(node.sources || [])].join(" "), href: "#graphe"}));
    const blindspots = data.blindspots.map((item) => ({type: "angle mort", id: item.id, title: item.title, subtitle: item.lead, keywords: [item.label, item.risk, item.question, ...item.sources].join(" "), href: `#angle-${item.id}`}));
    const sources = data.sources.map((source) => ({type: "source", id: source.id, title: source.title, subtitle: source.org, keywords: [source.id, source.date, source.area, ...source.tags].join(" "), href: source.url, external: true}));
    const parties = Object.entries(data.parties).map(([id, party]) => ({type: "parti", id, title: party.short, subtitle: party.axis, keywords: [party.role, party.redLine, party.open, party.friction].join(" "), href: "#coalition"}));
    const glossary = data.glossary.map((item) => ({type: "notion", id: slug(item.term), title: item.term, subtitle: item.definition, keywords: item.definition, href: item.href}));
    return [...graph, ...blindspots, ...parties, ...glossary, ...sources].map((item) => ({...item, haystack: normalize([item.title, item.subtitle, item.keywords, item.id].join(" "))}));
  };

  const SEARCH_INDEX = buildSearchIndex();

  const performSearch = (query) => {
    const normalized = normalize(query.trim());
    appState.searchIndex = -1;
    appState.searchResults = normalized ? SEARCH_INDEX.filter((item) => normalized.split(/\s+/).every((term) => item.haystack.includes(term))).slice(0, 12) : [];
    const results = document.getElementById("search-results");
    results.replaceChildren();
    if (!normalized) {
      const placeholder = document.createElement("p");
      placeholder.className = "search-placeholder";
      placeholder.textContent = "Essayez « défense », « CPAS », « 10 milliards » ou « S11 ».";
      results.appendChild(placeholder);
      return;
    }
    if (!appState.searchResults.length) {
      const empty = document.createElement("p");
      empty.className = "search-placeholder";
      empty.textContent = "Aucun résultat. Essayez un terme plus large.";
      results.appendChild(empty);
      return;
    }
    appState.searchResults.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.dataset.index = index;
      button.innerHTML = `<span class="result-type">${item.type}</span><span class="result-copy"><strong></strong><span></span></span><span class="result-arrow">${item.external ? "↗" : "→"}</span>`;
      button.querySelector("strong").textContent = item.title;
      button.querySelector(".result-copy span").textContent = item.subtitle;
      button.addEventListener("click", () => openSearchResult(item));
      results.appendChild(button);
    });
  };

  const openSearchResult = (item) => {
    document.getElementById("search-dialog").close();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.type === "graphe" && window.ArizonaGraph) window.ArizonaGraph.selectNode(item.id);
    if (item.type === "parti") selectParty(item.id);
    document.querySelector(item.href)?.scrollIntoView({behavior: "smooth", block: "start"});
  };

  const openDialog = (id) => {
    const dialog = document.getElementById(id);
    if (!dialog?.open) dialog.showModal();
    if (id === "search-dialog") setTimeout(() => document.getElementById("global-search").focus(), 20);
  };

  const initDialogs = () => {
    document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
    document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    }));
    const globalSearch = document.getElementById("global-search");
    globalSearch.addEventListener("input", () => performSearch(globalSearch.value));
    globalSearch.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowDown") appState.searchIndex = Math.min(appState.searchResults.length - 1, appState.searchIndex + 1);
      if (event.key === "ArrowUp") appState.searchIndex = Math.max(0, appState.searchIndex - 1);
      if (event.key === "Enter" && appState.searchResults[appState.searchIndex]) return openSearchResult(appState.searchResults[appState.searchIndex]);
      document.querySelectorAll(".search-result").forEach((button, index) => button.classList.toggle("active", index === appState.searchIndex));
    });
  };

  const initTheme = () => {
    document.documentElement.dataset.theme = appState.theme;
    document.querySelector("[data-action=theme]").addEventListener("click", () => {
      appState.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = appState.theme;
      storage.set("theme", appState.theme);
      document.querySelector('meta[name="theme-color"]').setAttribute("content", appState.theme === "dark" ? "#0a0b0f" : "#f1efe7");
    });
  };

  const initNavigation = () => {
    const menuButton = document.querySelector("[data-action=menu]");
    const menu = document.getElementById("mobile-nav");
    menuButton.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }));

    const progress = document.getElementById("reading-progress");
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.height = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
    };
    addEventListener("scroll", updateProgress, {passive: true});
    updateProgress();

    const railLinks = [...document.querySelectorAll(".progress-rail a")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      railLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === visible.target.id));
    }, {rootMargin: "-25% 0px -60%", threshold: [0, .1, .25]});
    railLinks.forEach((link) => {
      const target = document.getElementById(link.dataset.section);
      if (target) observer.observe(target);
    });
  };

  const initActions = () => {
    document.querySelectorAll("[data-action=search]").forEach((button) => button.addEventListener("click", () => openDialog("search-dialog")));
    document.querySelector("[data-action=saved]").addEventListener("click", () => openDialog("saved-dialog"));
    document.querySelector("[data-action=shortcuts]").addEventListener("click", () => openDialog("shortcuts-dialog"));
    document.querySelector("[data-action=clear-saved]").addEventListener("click", () => {
      appState.saved = [];
      storage.set("saved", appState.saved);
      renderSaved();
      toast("Dossier local effacé");
    });
    document.querySelector("[data-action=export-saved]").addEventListener("click", () => {
      download("conclave-arizona-selection.json", JSON.stringify({exportedAt: new Date().toISOString(), source: location.href, items: appState.saved}, null, 2), "application/json");
      toast("Sélection exportée");
    });
    document.querySelector("[data-action=export-checklist]").addEventListener("click", () => {
      const content = ["CONCLAVE ARIZONA — CHECKLIST DE L’ACCORD", `Export : ${new Date().toLocaleString("fr-BE")}`, "", ...data.checklist.map((item, index) => `${appState.checklist.includes(index) ? "[x]" : "[ ]"} ${String(index + 1).padStart(2, "0")}. ${item}`)].join("\n");
      download("checklist-conclave.txt", content);
      toast("Checklist exportée");
    });
    document.querySelector("[data-action=share]").addEventListener("click", async () => {
      const url = new URL(location.href);
      const selectedNode = window.ArizonaGraph?.getSelected();
      if (selectedNode && selectedNode !== "target") {
        url.searchParams.set("node", selectedNode);
        url.hash = "graphe";
      }
      const ok = await copyText(url.href);
      toast(ok ? "Lien copié" : "Impossible de copier le lien");
    });
    document.querySelector("[data-action=reset-simulator]").addEventListener("click", () => setPreset("prudent"));
    document.querySelector("[data-action=expand-blindspots]").addEventListener("click", (event) => {
      const cards = [...document.querySelectorAll(".blindspot-card:not([hidden])")];
      const shouldOpen = cards.some((card) => !card.classList.contains("expanded"));
      cards.forEach((card) => {
        card.classList.toggle("expanded", shouldOpen);
        const toggle = card.querySelector(".blindspot-toggle");
        toggle.setAttribute("aria-expanded", String(shouldOpen));
        toggle.querySelector("span:first-child").textContent = shouldOpen ? "FERMER LA FICHE" : "OUVRIR LA FICHE";
      });
      event.currentTarget.textContent = shouldOpen ? "Tout replier" : "Tout développer";
    });

    document.getElementById("blindspot-filter").addEventListener("change", (event) => {
      document.querySelectorAll(".blindspot-card").forEach((card) => { card.hidden = event.target.value !== "all" && card.dataset.domain !== event.target.value; });
    });
    document.getElementById("source-search").addEventListener("input", (event) => {
      appState.sourceQuery = normalize(event.target.value.trim());
      filterSources();
    });
    document.querySelectorAll("[data-source-filter]").forEach((button) => button.addEventListener("click", () => {
      appState.sourceFilter = button.dataset.sourceFilter;
      document.querySelectorAll("[data-source-filter]").forEach((other) => {
        const active = other === button;
        other.classList.toggle("active", active);
        other.setAttribute("aria-pressed", String(active));
      });
      filterSources();
    }));

    document.addEventListener("arizona:save", (event) => saveItem(event.detail));
    document.addEventListener("arizona:node-selected", (event) => {
      const button = document.querySelector("[data-save-current]");
      button.dataset.saveId = event.detail.id;
      button.classList.toggle("saved", isSaved("node", event.detail.id));
    });

    document.addEventListener("keydown", (event) => {
      const typing = /input|textarea|select/i.test(event.target.tagName) || event.target.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        openDialog("search-dialog");
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() === "g") document.getElementById("graphe").scrollIntoView({behavior: "smooth"});
      if (event.key.toLowerCase() === "s") document.getElementById("sources").scrollIntoView({behavior: "smooth"});
      if (event.key.toLowerCase() === "r" && window.ArizonaGraph) window.ArizonaGraph.reset();
      if (event.key === "?") openDialog("shortcuts-dialog");
    });
  };

  const restoreSharedState = () => {
    const params = new URLSearchParams(location.search);
    const node = params.get("node");
    if (node && window.ArizonaGraph) {
      window.ArizonaGraph.selectNode(node);
      setTimeout(() => document.getElementById("graphe").scrollIntoView(), 60);
    }
  };

  renderBlindspots();
  renderParties();
  renderEvidence();
  initScenarios();
  renderTimeline();
  renderChecklist();
  renderSources();
  initSimulator();
  initTheme();
  initDialogs();
  initNavigation();
  initActions();
  renderSaved();
  restoreSharedState();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();
