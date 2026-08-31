(() => {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const data = window.ARIZONA_DATA;
  if (!data?.graph) return;

  const state = {
    filter: "all",
    query: "",
    selected: "target",
    isolated: false,
    scale: 1,
    tx: 0,
    ty: 0,
    panning: false,
    dragging: null,
    pointerStart: null
  };

  const svg = document.getElementById("constraint-graph");
  const viewport = document.getElementById("graph-viewport");
  const linkLayer = document.getElementById("graph-links");
  const nodeLayer = document.getElementById("graph-nodes");
  const search = document.getElementById("graph-search");
  const empty = document.querySelector(".graph-empty");
  const nodeMap = new Map(data.graph.nodes.map((node) => [node.id, node]));
  const sourceMap = new Map(data.sources.map((source) => [source.id, source]));
  const nodeEls = new Map();
  const linkEls = [];

  const createSvg = (tag, attrs = {}) => {
    const element = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };

  const splitLabel = (label) => {
    if (label.length <= 13) return [label];
    const words = label.split(/\s+/);
    if (words.length === 1) return [label.slice(0, 12), label.slice(12)];
    const midpoint = Math.ceil(words.length / 2);
    return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
  };

  const updateLinkGeometry = () => {
    linkEls.forEach(({element, source, target}) => {
      element.setAttribute("x1", source.x);
      element.setAttribute("y1", source.y);
      element.setAttribute("x2", target.x);
      element.setAttribute("y2", target.y);
    });
  };

  const render = () => {
    data.graph.links.forEach(([sourceId, targetId, kind], index) => {
      const source = nodeMap.get(sourceId);
      const target = nodeMap.get(targetId);
      if (!source || !target) return;
      const line = createSvg("line", {
        class: "link",
        "data-kind": kind,
        "data-source": sourceId,
        "data-target": targetId,
        "aria-hidden": "true"
      });
      line.dataset.index = index;
      linkLayer.appendChild(line);
      linkEls.push({element: line, source, target, kind});
    });

    data.graph.nodes.forEach((node, index) => {
      const group = createSvg("g", {
        class: `graph-node ${node.type}`,
        transform: `translate(${node.x} ${node.y})`,
        tabindex: "-1",
        role: "button",
        "aria-label": `${node.kicker}. ${node.label}. ${node.description}`,
        "data-node-id": node.id,
        "data-node-type": node.type
      });
      const halo = createSvg("circle", {class: "node-halo", r: node.r + 8});
      const circle = createSvg("circle", {class: "node-core", r: node.r});
      const text = createSvg("text", {"aria-hidden": "true"});
      const lines = splitLabel(node.label);
      lines.forEach((line, lineIndex) => {
        const span = createSvg("tspan", {x: 0, dy: lineIndex === 0 ? (lines.length > 1 ? "-0.1em" : ".35em") : "1.15em"});
        span.textContent = line;
        text.appendChild(span);
      });
      group.append(halo, circle, text);
      group.addEventListener("click", (event) => {
        event.stopPropagation();
        selectNode(node.id, true);
      });
      group.addEventListener("pointerdown", startNodeDrag);
      group.addEventListener("keydown", handleNodeKeys);
      nodeLayer.appendChild(group);
      nodeEls.set(node.id, {group, circle, index});
    });
    updateLinkGeometry();
  };

  const nodeMatches = (node) => {
    const filterMatches = state.filter === "all" || node.type === state.filter;
    const haystack = [node.label, node.kicker, node.description, node.question, node.status, ...(node.sources || [])].join(" ").toLocaleLowerCase("fr");
    const queryMatches = !state.query || haystack.includes(state.query);
    return filterMatches && queryMatches;
  };

  const getNeighborIds = (nodeId) => {
    const ids = new Set([nodeId]);
    data.graph.links.forEach(([source, target]) => {
      if (source === nodeId) ids.add(target);
      if (target === nodeId) ids.add(source);
    });
    return ids;
  };

  const applyVisibility = () => {
    const matches = new Set(data.graph.nodes.filter(nodeMatches).map((node) => node.id));
    const isolated = state.isolated ? getNeighborIds(state.selected) : null;
    let visibleCount = 0;

    nodeEls.forEach(({group}, id) => {
      const visible = matches.has(id);
      const inTrace = !isolated || isolated.has(id);
      group.classList.toggle("hidden", !visible);
      group.classList.toggle("dimmed", visible && !inTrace);
      if (visible) visibleCount += 1;
    });

    linkEls.forEach(({element, source, target}) => {
      const visible = matches.has(source.id) && matches.has(target.id);
      const connected = source.id === state.selected || target.id === state.selected;
      const inTrace = !isolated || (isolated.has(source.id) && isolated.has(target.id) && connected);
      element.style.display = visible ? "" : "none";
      element.classList.toggle("dimmed", visible && !inTrace);
      element.classList.toggle("highlight", visible && connected);
    });

    empty.hidden = visibleCount > 0;
  };

  const sourceLinks = (sourceIds) => {
    const fragment = document.createDocumentFragment();
    if (!sourceIds?.length) {
      const span = document.createElement("span");
      span.textContent = "Position publique — voir registre";
      fragment.appendChild(span);
      return fragment;
    }
    sourceIds.forEach((sourceId) => {
      const source = sourceMap.get(sourceId);
      const link = document.createElement("a");
      link.textContent = sourceId;
      link.href = source ? source.url : `#source-${sourceId}`;
      if (source) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = source.title;
      }
      fragment.appendChild(link);
    });
    return fragment;
  };

  const selectNode = (id, focusInspector = false) => {
    const node = nodeMap.get(id);
    if (!node) return;
    state.selected = id;
    nodeEls.forEach(({group}, nodeId) => {
      group.classList.toggle("active", nodeId === id);
      group.setAttribute("tabindex", nodeId === id ? "0" : "-1");
    });
    document.getElementById("node-type").textContent = node.type === "blindspot" ? "ANGLE MORT" : node.type === "actor" ? "ACTEUR" : node.type === "source" ? "SOURCE" : "MÉTRIQUE";
    document.getElementById("node-kicker").textContent = node.kicker;
    document.getElementById("node-title").textContent = node.label;
    document.getElementById("node-description").textContent = node.description;
    document.getElementById("node-status").textContent = node.status;
    document.getElementById("node-horizon").textContent = node.horizon;
    document.getElementById("node-confidence").textContent = node.confidence;
    document.getElementById("node-question").textContent = node.question;
    const sources = document.getElementById("node-sources");
    sources.replaceChildren(sourceLinks(node.sources));
    document.querySelector("[data-save-current]").dataset.saveId = id;
    applyVisibility();
    document.dispatchEvent(new CustomEvent("arizona:node-selected", {detail: node}));
    if (focusInspector && window.innerWidth < 980) document.getElementById("node-inspector").scrollIntoView({behavior: "smooth", block: "nearest"});
  };

  const setTransform = () => {
    state.scale = Math.min(2.8, Math.max(.55, state.scale));
    viewport.setAttribute("transform", `translate(${state.tx} ${state.ty}) scale(${state.scale})`);
  };

  const zoomAt = (factor, clientX, clientY) => {
    const rect = svg.getBoundingClientRect();
    const svgX = (clientX - rect.left) * (1200 / rect.width);
    const svgY = (clientY - rect.top) * (720 / rect.height);
    const oldScale = state.scale;
    const nextScale = Math.min(2.8, Math.max(.55, oldScale * factor));
    const pointX = (svgX - state.tx) / oldScale;
    const pointY = (svgY - state.ty) / oldScale;
    state.tx = svgX - pointX * nextScale;
    state.ty = svgY - pointY * nextScale;
    state.scale = nextScale;
    setTransform();
  };

  const resetView = () => {
    state.scale = 1;
    state.tx = 0;
    state.ty = 0;
    state.isolated = false;
    setTransform();
    applyVisibility();
  };

  const clientToGraph = (clientX, clientY) => {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const matrix = viewport.getScreenCTM();
    return matrix ? point.matrixTransform(matrix.inverse()) : {x: 0, y: 0};
  };

  function startNodeDrag(event) {
    if (event.button !== 0 && event.pointerType !== "touch") return;
    const group = event.currentTarget;
    const node = nodeMap.get(group.dataset.nodeId);
    if (!node) return;
    event.stopPropagation();
    group.setPointerCapture(event.pointerId);
    state.dragging = {node, group, pointerId: event.pointerId};
  }

  const moveNode = (event) => {
    if (!state.dragging) return;
    const point = clientToGraph(event.clientX, event.clientY);
    state.dragging.node.x = Math.max(25, Math.min(1175, point.x));
    state.dragging.node.y = Math.max(25, Math.min(695, point.y));
    state.dragging.group.setAttribute("transform", `translate(${state.dragging.node.x} ${state.dragging.node.y})`);
    updateLinkGeometry();
  };

  const endNodeDrag = (event) => {
    if (!state.dragging) return;
    try { state.dragging.group.releasePointerCapture(event.pointerId); } catch (_) { /* no-op */ }
    state.dragging = null;
  };

  const startPan = (event) => {
    if (event.target.closest(".graph-node") || event.button !== 0) return;
    svg.setPointerCapture(event.pointerId);
    state.panning = true;
    state.pointerStart = {x: event.clientX, y: event.clientY, tx: state.tx, ty: state.ty, pointerId: event.pointerId};
  };

  const movePan = (event) => {
    if (!state.panning || !state.pointerStart) return;
    const rect = svg.getBoundingClientRect();
    state.tx = state.pointerStart.tx + (event.clientX - state.pointerStart.x) * (1200 / rect.width);
    state.ty = state.pointerStart.ty + (event.clientY - state.pointerStart.y) * (720 / rect.height);
    setTransform();
  };

  const endPan = (event) => {
    if (!state.panning) return;
    try { svg.releasePointerCapture(event.pointerId); } catch (_) { /* no-op */ }
    state.panning = false;
    state.pointerStart = null;
  };

  function handleNodeKeys(event) {
    const directions = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]};
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectNode(event.currentTarget.dataset.nodeId, true);
      return;
    }
    if (!directions[event.key]) return;
    event.preventDefault();
    const current = nodeMap.get(event.currentTarget.dataset.nodeId);
    const [dx, dy] = directions[event.key];
    const candidates = data.graph.nodes.filter((node) => {
      if (node.id === current.id || !nodeMatches(node)) return false;
      const vx = node.x - current.x;
      const vy = node.y - current.y;
      return vx * dx + vy * dy > 0;
    });
    candidates.sort((a, b) => {
      const projectionA = Math.abs((a.x - current.x) * dy) + Math.abs((a.y - current.y) * dx) + Math.hypot(a.x - current.x, a.y - current.y) * .35;
      const projectionB = Math.abs((b.x - current.x) * dy) + Math.abs((b.y - current.y) * dx) + Math.hypot(b.x - current.x, b.y - current.y) * .35;
      return projectionA - projectionB;
    });
    if (candidates[0]) {
      selectNode(candidates[0].id);
      nodeEls.get(candidates[0].id).group.focus();
    }
  }

  const downloadSvg = () => {
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", NS);
    clone.setAttribute("width", "1200");
    clone.setAttribute("height", "720");
    clone.removeAttribute("tabindex");
    const style = createSvg("style");
    style.textContent = `
      svg{background:#090a0e}.link{stroke:#4b4f58;stroke-width:1}.link[data-kind=tension]{stroke:#ff8d7e;stroke-dasharray:5 5}.link[data-kind=convergence]{stroke:#b9f5c4}.node-core{stroke-width:1.5}.metric .node-core{fill:#b9f5c4;stroke:#b9f5c4}.blindspot .node-core{fill:#151922;stroke:#cbbcff}.actor .node-core{fill:#151922;stroke:#ffd68a}.source .node-core{fill:#11141b;stroke:#8fc8ff}.graph-node text{fill:#f3f1eb;font:700 11px sans-serif;text-anchor:middle}.metric text{fill:#071309}`;
    clone.insertBefore(style, clone.firstChild);
    const serializer = new XMLSerializer();
    const blob = new Blob([serializer.serializeToString(clone)], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "graphe-contraintes-conclave-belge.svg";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const renderAccessibleList = () => {
    const list = document.getElementById("graph-list");
    data.graph.nodes.forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${node.label} — ${node.kicker}`;
      button.addEventListener("click", () => {
        state.filter = "all";
        state.query = "";
        search.value = "";
        document.querySelectorAll("[data-graph-filter]").forEach((chip) => {
          const active = chip.dataset.graphFilter === "all";
          chip.classList.toggle("active", active);
          chip.setAttribute("aria-pressed", String(active));
        });
        selectNode(node.id);
        document.getElementById("graphe").scrollIntoView({behavior: "smooth"});
      });
      list.appendChild(button);
    });
  };

  render();
  renderAccessibleList();
  selectNode("target");

  document.querySelectorAll("[data-graph-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.filter = chip.dataset.graphFilter;
      state.isolated = false;
      document.querySelectorAll("[data-graph-filter]").forEach((button) => {
        const active = button === chip;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      applyVisibility();
    });
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim().toLocaleLowerCase("fr");
    state.isolated = false;
    applyVisibility();
  });

  document.querySelectorAll("[data-graph-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.graphAction;
      const rect = svg.getBoundingClientRect();
      if (action === "zoom-in") zoomAt(1.22, rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (action === "zoom-out") zoomAt(.82, rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (action === "reset") resetView();
      if (action === "export") downloadSvg();
    });
  });

  document.querySelector("[data-action=trace]").addEventListener("click", (event) => {
    state.isolated = !state.isolated;
    event.currentTarget.firstChild.textContent = state.isolated ? "Afficher tout " : "Isoler ses liens ";
    applyVisibility();
  });

  document.querySelectorAll("[data-jump-node]").forEach((button) => {
    button.addEventListener("click", () => {
      selectNode(button.dataset.jumpNode);
      document.getElementById("graphe").scrollIntoView({behavior: "smooth"});
    });
  });

  document.querySelector("[data-save-current]").addEventListener("click", (event) => {
    const node = nodeMap.get(state.selected);
    document.dispatchEvent(new CustomEvent("arizona:save", {detail: {type: "node", id: node.id, title: node.label, subtitle: node.kicker, href: "#graphe"}}));
  });

  svg.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomAt(event.deltaY > 0 ? .9 : 1.1, event.clientX, event.clientY);
  }, {passive: false});
  svg.addEventListener("pointerdown", startPan);
  svg.addEventListener("pointermove", (event) => { moveNode(event); movePan(event); });
  svg.addEventListener("pointerup", (event) => { endNodeDrag(event); endPan(event); });
  svg.addEventListener("pointercancel", (event) => { endNodeDrag(event); endPan(event); });

  window.ArizonaGraph = {
    selectNode,
    reset: resetView,
    export: downloadSvg,
    getSelected: () => state.selected
  };
})();
