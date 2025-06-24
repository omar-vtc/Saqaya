<template>
  <nav class="pagination" aria-label="Page navigation">
    <button class="pagination__btn pagination__btn--prev" disabled>‹</button>

    <ul class="pagination__list">
      <li>
        <button class="pagination__item pagination__item--active">1</button>
      </li>
      <li><button class="pagination__item">2</button></li>
      <li><button class="pagination__item">3</button></li>
      <li><span class="pagination__ellipsis">…</span></li>
      <li><button class="pagination__item">12</button></li>
    </ul>

    <button class="pagination__btn pagination__btn--next">›</button>
  </nav>
</template>
<style>
/* ----------  root design tokens (optional)  ---------- */
:root {
  --pg-spacing: 0.25rem; /* gap between items */
  --pg-pad-inline: 0.7rem; /* left / right padding on numbers */
  --pg-pad-block: 0.35rem; /* top / bottom padding on numbers */
  --pg-radius: 4px; /* border-radius for buttons */
  --pg-bg: #fff;
  --pg-border: #d0d0d0;
  --pg-text: #333;
  --pg-text-active: #fff;
  --pg-bg-active: #fb008a;
  --pg-bg-hover: #f5f7ff;
  --pg-text-disabled: #aaa;
}

/* ----------  pagination container  ---------- */
.pagination {
  display: flex;
  align-items: center;
  gap: var(--pg-spacing);
  font-family: system-ui, sans-serif;
  /* border: solid; */
  justify-content: center;
  padding: 1rem;
}

/* ----------  list wrapper  ---------- */
.pagination__list {
  display: flex;
  gap: var(--pg-spacing);
  list-style: none;
  /* border: solid red; */
  align-items: center;
}

/* ----------  base button style  ---------- */
.pagination__item,
.pagination__btn {
  cursor: pointer;
  border: 1px solid var(--pg-border);
  background: var(--pg-bg);
  color: var(--pg-text);
  padding: var(--pg-pad-block) var(--pg-pad-inline);
  font-size: 0.9rem;
  line-height: 1;
  border-radius: var(--pg-radius);
  min-width: 2.2rem;
  text-align: center;
  user-select: none;
  transition: background 0.15s ease;
}

/* ----------  hover & focus  ---------- */
.pagination__item:hover:not(.pagination__item--active),
.pagination__btn:not(:disabled):hover {
  background: var(--pg-bg-hover);
}

/* keyboard focus */
.pagination__item:focus-visible,
.pagination__btn:focus-visible {
  outline: 2px solid var(--pg-bg-active);
  outline-offset: 2px;
}

/* ----------  active page  ---------- */
.pagination__item--active {
  background: var(--pg-bg-active);
  color: var(--pg-text-active);
  cursor: default;
}

/* ----------  prev / next buttons  ---------- */
.pagination__btn {
  font-weight: bold; /* make chevrons stand out */
}

/* disabled state */
.pagination__btn:disabled {
  cursor: not-allowed;
  color: var(--pg-text-disabled);
  border-color: var(--pg-border);
  background: var(--pg-bg);
  opacity: 0.6;
}

/* ----------  ellipsis  ---------- */
.pagination__ellipsis {
  display: inline-block;
  padding: var(--pg-pad-block) var(--pg-pad-inline);
  color: var(--pg-text-disabled);
}
</style>
