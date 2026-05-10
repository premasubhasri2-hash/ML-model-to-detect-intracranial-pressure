body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Tooltip container */
.tooltip-label {
  position: relative;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 6px;
}

/* Info icon */
.info-icon {
  margin-left: 6px;
  cursor: help;
  font-size: 0.9rem;
}

/* Hidden tooltip box */
.tooltip-text {
  visibility: hidden;
  opacity: 0;
  width: 260px;
  background-color: #1e293b;
  color: white;
  text-align: left;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: normal;

  position: absolute;
  z-index: 1000;
  bottom: 125%;
  left: 0;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: opacity 0.25s ease;
}

/* Small arrow */
.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20px;
  border-width: 6px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

/* Show on hover */
.tooltip-label:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}