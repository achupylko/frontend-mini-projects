/* =========================================================
 * Glassmorphism Search Bar with suggestions
 * - Keyboard support (ArrowUp/ArrowDown/Enter/Escape)
 * - Click outside to close suggestions
 * - Debounced input filtering
 * - ARIA attributes: listbox/option + active descendant
 * ======================================================= */

const input = document.getElementById("search-input");
const clearBtn = document.querySelector(".search__clear");
const list = document.getElementById("suggestion-list");
const container = document.querySelector(".search__inner");

// Demo dataset — replace with your own later if needed
const DATA = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Accessibility",
  "Glassmorphism",
  "Animations",
  "Clip-Path",
  "CSS Grid",
  "Flexbox",
  "Scroll Snap",
  "Web Components",
  "ARIA",
  "Canvas",
  "SVG",
  "Web Animations API",
  "Shadow DOM",
  "Performance",
  "Progressive Enhancement",
  "Service Worker",
];

let filtered = [...DATA];
let activeIndex = -1; // index of the highlighted option
let debounceTimer = null;

/** Render suggestions into DOM */
function renderSuggestions(items) {
  // Clear previous
  list.innerHTML = "";

  // Hide list if nothing to show
  if (!items.length) {
    setListOpen(false);
    return;
  }

  // Build list items
  items.forEach((text, idx) => {
    const li = document.createElement("li");
    li.id = `opt-${idx}`;
    li.role = "option";
    li.className = "suggestions__item";
    li.textContent = text;
    li.tabIndex = -1;

    // Mouse interactions
    li.addEventListener("mouseenter", () => setActiveIndex(idx));
    li.addEventListener("mousedown", (e) => {
      // prevent input from losing focus before we pick the value
      e.preventDefault();
    });
    li.addEventListener("click", () => choose(idx));

    list.appendChild(li);
  });

  setListOpen(true);
}

/** Toggle list visibility + ARIA flags */
function setListOpen(open) {
  if (open) {
    list.hidden = false;
    list.dataset.open = "true";
    input.setAttribute("aria-expanded", "true");
  } else {
    list.hidden = true;
    delete list.dataset.open;
    input.setAttribute("aria-expanded", "false");
  }
}

/** Update active (highlighted) option */
function setActiveIndex(next) {
  const items = [...list.querySelectorAll(".suggestions__item")];
  if (!items.length) return;

  // clamp index
  if (next < 0) next = items.length - 1;
  if (next >= items.length) next = 0;

  // remove previous
  items.forEach((el) => el.setAttribute("aria-selected", "false"));

  // add new
  activeIndex = next;
  const activeEl = items[activeIndex];
  activeEl.setAttribute("aria-selected", "true");
  input.setAttribute("aria-activedescendant", activeEl.id);

  // ensure visibility
  activeEl.scrollIntoView({ block: "nearest" });
}

/** Commit the selected option to the input */
function choose(idx) {
  const items = [...list.querySelectorAll(".suggestions__item")];
  if (!items.length) return;
  const el = items[idx];
  input.value = el.textContent;
  closeSuggestions();
}

/** Close suggestions and reset highlight */
function closeSuggestions() {
  setListOpen(false);
  activeIndex = -1;
  input.removeAttribute("aria-activedescendant");
}

/** Basic debouncer */
function debounce(fn, delay = 160) {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fn(...args), delay);
  };
}

/** Filter dataset by input value */
const onInput = debounce(() => {
  const q = input.value.trim().toLowerCase();
  if (!q) {
    filtered = [];
    renderSuggestions(filtered);
    clearBtn.hidden = true;
    return;
  }

  filtered = DATA.filter((item) => item.toLowerCase().includes(q)).slice(0, 8);
  renderSuggestions(filtered);
  clearBtn.hidden = false;
}, 120);

/** Clear input */
function clearInput() {
  input.value = "";
  clearBtn.hidden = true;
  filtered = [];
  renderSuggestions(filtered);
  input.focus();
}

/** Click outside to close */
function handleDocumentClick(e) {
  if (!container.contains(e.target) && !list.contains(e.target)) {
    closeSuggestions();
  }
}

/** Keyboard handlers */
function handleKeydown(e) {
  const hasOpen = list.dataset.open === "true";

  switch (e.key) {
    case "ArrowDown":
      if (!hasOpen && filtered.length) renderSuggestions(filtered);
      setActiveIndex(activeIndex + 1);
      e.preventDefault();
      break;
    case "ArrowUp":
      if (!hasOpen && filtered.length) renderSuggestions(filtered);
      setActiveIndex(activeIndex - 1);
      e.preventDefault();
      break;
    case "Enter":
      if (hasOpen && activeIndex >= 0) {
        choose(activeIndex);
        e.preventDefault();
      }
      break;
    case "Escape":
      if (hasOpen || input.value) {
        clearInput();
        closeSuggestions();
        e.preventDefault();
      }
      break;
    default:
      // do nothing
      break;
  }
}

/** Init bindings */
function init() {
  input.addEventListener("input", onInput);
  input.addEventListener("keydown", handleKeydown);
  clearBtn.addEventListener("click", clearInput);
  document.addEventListener("click", handleDocumentClick);

  // When input is focused and already has text, show suggestions
  input.addEventListener("focus", () => {
    if (input.value.trim()) {
      filtered = DATA.filter((item) =>
        item.toLowerCase().includes(input.value.trim().toLowerCase())
      ).slice(0, 8);
      renderSuggestions(filtered);
    }
  });
}

// Run
init();
