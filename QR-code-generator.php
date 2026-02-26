<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>QR Generator</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #f5f4f0;
      --surface: #ffffff;
      --border: #e6e3dc;
      --text: #1a1917;
      --muted: #9b9690;
      --accent: #1a1917;
      --accent-hover: #3d3b38;
      --green: #1a7a4a;
      --red: #c0392b;
      --radius: 16px;
      --shadow: 0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
    }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 44px 20px 100px;
    }

    header { text-align: center; margin-bottom: 36px; }
    header h1 { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.03em; }
    header p { margin-top: 7px; font-size: 0.9rem; color: var(--muted); font-weight: 300; }
    .pip {
      display: inline-block; width: 7px; height: 7px;
      background: var(--accent); border-radius: 50%;
      margin-right: 6px; vertical-align: middle; position: relative; top: -1px;
    }

    .layout { display: flex; gap: 20px; width: 100%; max-width: 1020px; align-items: flex-start; }
    .col-left { flex: 1; min-width: 0; }
    .col-right { width: 340px; flex-shrink: 0; position: sticky; top: 24px; }

    @media (max-width: 780px) {
      .layout { flex-direction: column; }
      .col-right { width: 100%; position: static; }
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 28px;
      width: 100%;
    }
    .card + .card { margin-top: 16px; }

    .card-title {
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.09em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 16px;
      display: flex; align-items: center; gap: 7px;
    }
    .card-title span { font-size: 1rem; }

    .field-group { margin-bottom: 18px; }
    .field-group:last-child { margin-bottom: 0; }

    .section-label {
      font-size: 0.69rem; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 8px;
    }

    textarea, input[type="text"], select {
      width: 100%;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 11px 13px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.93rem;
      color: var(--text);
      background: var(--bg);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      appearance: none;
    }
    textarea { resize: vertical; min-height: 82px; }
    textarea:focus, input[type="text"]:focus, select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(26,25,23,0.07);
    }
    select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239b9690' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 34px;
      cursor: pointer;
    }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

    .color-field {
      display: flex; align-items: center; gap: 9px;
      border: 1px solid var(--border); border-radius: 10px;
      padding: 9px 12px; background: var(--bg);
      cursor: pointer; transition: border-color 0.2s;
    }
    .color-field:hover { border-color: var(--accent); }
    .color-field input[type="color"] {
      width: 22px; height: 22px; border: none;
      border-radius: 5px; padding: 0; cursor: pointer; background: none;
    }
    .color-field span { font-size: 0.8rem; color: var(--text); font-family: 'DM Mono', monospace; }
    .col-sub { font-size: 0.72rem; color: var(--muted); text-align: center; margin-top: 4px; }

    .toggle-row { display: flex; align-items: center; justify-content: space-between; }
    .toggle-label { font-size: 0.9rem; color: var(--text); }
    .toggle-sub { font-size: 0.74rem; color: var(--muted); margin-top: 2px; }
    .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; cursor: pointer; inset: 0;
      background: var(--border); border-radius: 22px; transition: background 0.2s;
    }
    .slider::before {
      content: ''; position: absolute;
      width: 16px; height: 16px; left: 3px; bottom: 3px;
      background: white; border-radius: 50%;
      transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    }
    .switch input:checked + .slider { background: var(--accent); }
    .switch input:checked + .slider::before { transform: translateX(18px); }

    .slider-row { display: flex; align-items: center; gap: 10px; }
    .slider-row input[type="range"] { flex: 1; accent-color: var(--accent); height: 4px; cursor: pointer; }
    .slider-val { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--text); min-width: 42px; text-align: right; }

    .shape-options { display: flex; gap: 8px; }
    .shape-btn {
      flex: 1; padding: 8px 4px;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: var(--bg); font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem; cursor: pointer; color: var(--muted);
      transition: all 0.15s; display: flex; flex-direction: column; align-items: center; gap: 5px;
    }
    .shape-icon { width: 20px; height: 20px; background: var(--border); display: block; }
    .shape-icon.sq { border-radius: 2px; }
    .shape-icon.rnd { border-radius: 6px; }
    .shape-icon.circ { border-radius: 50%; }
    .shape-btn.active { border-color: var(--accent); background: var(--accent); color: white; }
    .shape-btn.active .shape-icon { background: rgba(255,255,255,0.35); }

    .align-options { display: flex; gap: 8px; }
    .align-btn {
      flex: 1; padding: 8px;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: var(--bg); font-size: 1rem; cursor: pointer;
      color: var(--muted); transition: all 0.15s;
    }
    .align-btn.active { border-color: var(--accent); background: var(--accent); color: white; }

    .style-options { display: flex; gap: 8px; }
    .style-btn {
      padding: 8px 18px;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: var(--bg); font-size: 0.9rem; cursor: pointer;
      color: var(--muted); transition: all 0.15s; font-family: 'DM Sans', sans-serif;
    }
    .style-btn[data-style="bold"] { font-weight: 700; }
    .style-btn[data-style="italic"] { font-style: italic; }
    .style-btn.active { border-color: var(--accent); background: var(--accent); color: white; }

    .upload-zone {
      border: 1.5px dashed var(--border); border-radius: 10px;
      padding: 18px; text-align: center; cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      background: var(--bg); position: relative;
    }
    .upload-zone:hover { border-color: var(--accent); background: #eeecea; }
    .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    .upload-zone .upload-icon { font-size: 1.4rem; margin-bottom: 4px; display: block; }
    .upload-zone p { font-size: 0.83rem; color: var(--muted); }
    .upload-zone p strong { color: var(--text); }

    #logo-preview-wrap {
      display: none; align-items: center; gap: 10px;
      margin-top: 9px; padding: 9px 12px;
      border: 1px solid var(--border); border-radius: 10px; background: var(--bg);
    }
    #logo-preview-wrap img { width: 30px; height: 30px; object-fit: contain; border-radius: 5px; }
    #logo-preview-wrap span { font-size: 0.83rem; color: var(--muted); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #remove-logo {
      background: none; border: none; cursor: pointer;
      color: var(--muted); font-size: 0.95rem; padding: 2px 5px;
      border-radius: 5px; transition: color 0.2s, background 0.2s;
    }
    #remove-logo:hover { color: var(--red); background: #fdf0ed; }

    .format-options { display: flex; gap: 8px; }
    .format-btn {
      flex: 1; padding: 9px;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: var(--bg); font-family: 'DM Mono', monospace;
      font-size: 0.85rem; cursor: pointer; color: var(--muted); transition: all 0.15s;
    }
    .format-btn.active { border-color: var(--accent); background: var(--accent); color: white; }

    .divider { border: none; border-top: 1px solid var(--border); margin: 18px 0; }

    .generate-btn {
      width: 100%; padding: 14px;
      background: var(--accent); color: white; border: none;
      border-radius: 11px; font-family: 'DM Sans', sans-serif;
      font-size: 0.97rem; font-weight: 500; cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }
    .generate-btn:hover { background: var(--accent-hover); }
    .generate-btn:active { transform: scale(0.985); }

    .reset-btn {
      width: 100%; padding: 11px; margin-top: 10px;
      background: none; color: var(--muted);
      border: 1px solid var(--border); border-radius: 11px;
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      cursor: pointer; transition: all 0.2s;
    }
    .reset-btn:hover { border-color: var(--red); color: var(--red); background: #fdf0ed; }

    /* Preview panel */
    .preview-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 24px;
      width: 100%;
      text-align: center;
    }
    .preview-label {
      font-size: 0.69rem; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 14px; text-align: left;
    }
    #live-preview-wrap {
      background: var(--bg);
      border-radius: 10px;
      border: 1px solid var(--border);
      padding: 16px;
      display: flex; align-items: center; justify-content: center;
      min-height: 200px;
    }
    #live-preview-wrap canvas { border-radius: 8px; max-width: 100%; height: auto; }
    .preview-placeholder { color: var(--muted); font-size: 0.86rem; line-height: 1.6; }
    .preview-placeholder .big { font-size: 2rem; display: block; margin-bottom: 6px; }

    .action-row { display: flex; gap: 8px; margin-top: 14px; }
    .download-btn {
      flex: 1; padding: 11px;
      background: var(--accent); color: white; border: none;
      border-radius: 10px; font-family: 'DM Sans', sans-serif;
      font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: background 0.2s;
    }
    .download-btn:hover { background: var(--accent-hover); }
    .copy-btn {
      padding: 11px 14px;
      background: var(--bg); color: var(--text);
      border: 1px solid var(--border); border-radius: 10px;
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      cursor: pointer; transition: all 0.2s; white-space: nowrap;
    }
    .copy-btn:hover { border-color: var(--accent); background: #eeecea; }
    .copy-btn.copied { background: #eaf5ee; border-color: var(--green); color: var(--green); }

    .quality-note { font-size: 0.72rem; color: var(--muted); margin-top: 10px; text-align: left; }

    .scan-tip {
      display: none; margin-top: 12px;
      padding: 10px 13px;
      background: #fffbeb; border: 1px solid #f0d080;
      border-radius: 9px; font-size: 0.8rem; color: #7a5c00;
      text-align: left; line-height: 1.5;
    }
    .scan-tip.show { display: block; }

    .toast {
      position: fixed; bottom: 28px; left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--accent); color: white;
      padding: 10px 20px; border-radius: 9px;
      font-size: 0.86rem; font-weight: 500;
      opacity: 0; transition: opacity 0.25s, transform 0.25s;
      pointer-events: none; z-index: 100;
    }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    #text-controls { display: none; }
  </style>
</head>
<body>

<header>
  <h1><span class="pip"></span>QR Generator</h1>
  <p>Clean QR codes with logo, text overlay &amp; high-res export</p>
</header>

<div class="layout">

  <!-- LEFT -->
  <div class="col-left">

    <!-- Content -->
    <div class="card">
      <div class="card-title"><span>📝</span> Content</div>

      <div class="field-group">
        <div class="section-label">Text or URL</div>
        <textarea id="qr-input" placeholder="https://yourwebsite.com or any text…"></textarea>
      </div>

      <div class="field-group">
        <div class="section-label">Colors</div>
        <div class="row">
          <div>
            <div class="color-field" onclick="document.getElementById('qr-color').click()">
              <input type="color" id="qr-color" value="#1a1917"/>
              <span id="qr-color-label">#1a1917</span>
            </div>
            <div class="col-sub">QR dots</div>
          </div>
          <div>
            <div class="color-field" onclick="document.getElementById('bg-color').click()">
              <input type="color" id="bg-color" value="#ffffff"/>
              <span id="bg-color-label">#ffffff</span>
            </div>
            <div class="col-sub">Background</div>
          </div>
        </div>
      </div>

      <div class="field-group">
        <div class="toggle-row">
          <div>
            <div class="toggle-label">Dark QR preset</div>
            <div class="toggle-sub">White on black — high contrast</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="dark-preset"/>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="field-group">
        <div class="section-label">QR Resolution</div>
        <div class="slider-row">
          <input type="range" id="qr-size" min="300" max="900" step="100" value="600"/>
          <span class="slider-val" id="qr-size-label">600 px</span>
        </div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:4px;">Higher = sharper, larger file size</div>
      </div>
    </div>

    <!-- Text Overlay -->
    <div class="card">
      <div class="card-title"><span>🔤</span> Text Overlay</div>

      <div class="field-group">
        <div class="toggle-row">
          <div>
            <div class="toggle-label">Add text to QR image</div>
            <div class="toggle-sub">Appears on the final downloaded image</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="text-toggle" onchange="toggleTextControls()"/>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div id="text-controls">
        <div class="divider" style="margin:14px 0;"></div>

        <div class="field-group">
          <div class="section-label">Text content</div>
          <input type="text" id="overlay-text" placeholder="e.g. Scan to visit our website"/>
        </div>

        <div class="field-group">
          <div class="section-label">Position on image</div>
          <select id="text-position">
            <option value="top">Top — above the QR code</option>
            <option value="top-inside">Top Inside — inside top edge of QR</option>
            <option value="bottom" selected>Bottom — below the QR code</option>
            <option value="bottom-inside">Bottom Inside — inside bottom edge of QR</option>
          </select>
        </div>

        <div class="field-group">
          <div class="section-label">Alignment</div>
          <div class="align-options">
            <button class="align-btn" data-align="left" title="Left">&#8676;</button>
            <button class="align-btn active" data-align="center" title="Center">&#9776;</button>
            <button class="align-btn" data-align="right" title="Right">&#8677;</button>
          </div>
        </div>

        <div class="field-group">
          <div class="row">
            <div>
              <div class="section-label">Text Color</div>
              <div class="color-field" style="margin-top:0" onclick="document.getElementById('text-color').click()">
                <input type="color" id="text-color" value="#1a1917"/>
                <span id="text-color-label">#1a1917</span>
              </div>
            </div>
            <div>
              <div class="section-label">Font Size</div>
              <div class="slider-row" style="margin-top:8px;">
                <input type="range" id="font-size" min="12" max="48" step="2" value="22"/>
                <span class="slider-val" id="font-size-label">22px</span>
              </div>
            </div>
          </div>
        </div>

        <div class="field-group">
          <div class="section-label">Style</div>
          <div class="style-options">
            <button class="style-btn" data-style="bold">B</button>
            <button class="style-btn" data-style="italic"><em>I</em></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logo -->
    <div class="card">
      <div class="card-title"><span>🖼️</span> Logo (optional)</div>

      <div class="field-group">
        <div class="upload-zone">
          <input type="file" id="logo-input" accept="image/*"/>
          <span class="upload-icon">⊕</span>
          <p><strong>Click to upload</strong> or drag &amp; drop</p>
          <p>PNG, JPG, SVG — best quality with high-res PNG</p>
        </div>
        <div id="logo-preview-wrap">
          <img id="logo-preview-img" src="" alt="logo"/>
          <span id="logo-filename">logo.png</span>
          <button id="remove-logo" title="Remove">✕</button>
        </div>
      </div>

      <div id="logo-controls" style="display:none;">
        <div class="field-group">
          <div class="section-label">Logo Size</div>
          <div class="slider-row">
            <input type="range" id="logo-size" min="10" max="30" step="1" value="20"/>
            <span class="slider-val" id="logo-size-label">20%</span>
          </div>
          <div style="font-size:0.72rem;color:var(--muted);margin-top:4px;">Keep under 30% for reliable scanning</div>
        </div>

        <div class="field-group">
          <div class="section-label">Logo Background Shape</div>
          <div class="shape-options">
            <button class="shape-btn" data-shape="square"><span class="shape-icon sq"></span>Square</button>
            <button class="shape-btn active" data-shape="rounded"><span class="shape-icon rnd"></span>Rounded</button>
            <button class="shape-btn" data-shape="circle"><span class="shape-icon circ"></span>Circle</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Export -->
    <div class="card">
      <div class="card-title"><span>💾</span> Export</div>
      <div class="field-group">
        <div class="section-label">Download format</div>
        <div class="format-options">
          <button class="format-btn active" data-fmt="png">PNG</button>
          <button class="format-btn" data-fmt="jpg">JPG</button>
        </div>
      </div>
      <button class="generate-btn" onclick="generateQR()">Generate &amp; Preview</button>
      <button class="reset-btn" onclick="resetAll()">&#8634; Reset everything</button>
    </div>

  </div>

  <!-- RIGHT — Live Preview -->
  <div class="col-right">
    <div class="preview-panel">
      <div class="preview-label">Live Preview</div>

      <div id="live-preview-wrap">
        <div class="preview-placeholder">
          <span class="big">&#11035;</span>
          Fill in your details and click<br/><strong>Generate &amp; Preview</strong>
        </div>
      </div>

      <div class="scan-tip" id="scan-tip">
        &#9888;&#65039; <strong>Before printing:</strong> always scan your QR with a real phone to confirm it works correctly!
      </div>

      <div class="action-row" id="action-row" style="display:none;">
        <button class="download-btn" onclick="downloadQR()">&#8595; Download <span id="dl-fmt">PNG</span></button>
        <button class="copy-btn" id="copy-btn" onclick="copyQR()">&#10064; Copy</button>
      </div>

      <div class="quality-note" id="quality-note"></div>
    </div>
  </div>

</div>

<div class="toast" id="toast"></div>
<div id="qr-hidden" style="position:absolute;left:-9999px;top:-9999px;"></div>

<script>
  let logoDataURL = null;
  let selectedFormat = 'png';
  let finalCanvas = null;
  let selectedShape = 'rounded';
  let selectedAlign = 'center';
  let isBold = false;
  let isItalic = false;

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  function toggleTextControls() {
    document.getElementById('text-controls').style.display =
      document.getElementById('text-toggle').checked ? 'block' : 'none';
  }

  // Color pickers
  document.getElementById('qr-color').addEventListener('input', e => document.getElementById('qr-color-label').textContent = e.target.value);
  document.getElementById('bg-color').addEventListener('input', e => document.getElementById('bg-color-label').textContent = e.target.value);
  document.getElementById('text-color').addEventListener('input', e => document.getElementById('text-color-label').textContent = e.target.value);

  // Dark preset
  document.getElementById('dark-preset').addEventListener('change', e => {
    if (e.target.checked) {
      document.getElementById('qr-color').value = '#ffffff'; document.getElementById('qr-color-label').textContent = '#ffffff';
      document.getElementById('bg-color').value = '#111111'; document.getElementById('bg-color-label').textContent = '#111111';
    } else {
      document.getElementById('qr-color').value = '#1a1917'; document.getElementById('qr-color-label').textContent = '#1a1917';
      document.getElementById('bg-color').value = '#ffffff'; document.getElementById('bg-color-label').textContent = '#ffffff';
    }
  });

  // Sliders
  document.getElementById('qr-size').addEventListener('input', e => document.getElementById('qr-size-label').textContent = e.target.value + ' px');
  document.getElementById('logo-size').addEventListener('input', e => document.getElementById('logo-size-label').textContent = e.target.value + '%');
  document.getElementById('font-size').addEventListener('input', e => document.getElementById('font-size-label').textContent = e.target.value + 'px');

  // Logo
  document.getElementById('logo-input').addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      logoDataURL = ev.target.result;
      document.getElementById('logo-preview-img').src = logoDataURL;
      document.getElementById('logo-filename').textContent = file.name;
      document.getElementById('logo-preview-wrap').style.display = 'flex';
      document.getElementById('logo-controls').style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('remove-logo').addEventListener('click', () => {
    logoDataURL = null;
    document.getElementById('logo-input').value = '';
    document.getElementById('logo-preview-wrap').style.display = 'none';
    document.getElementById('logo-controls').style.display = 'none';
  });

  // Shape
  document.querySelectorAll('.shape-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); selectedShape = btn.dataset.shape;
  }));

  // Align
  document.querySelectorAll('.align-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); selectedAlign = btn.dataset.align;
  }));

  // Bold / Italic
  document.querySelectorAll('.style-btn').forEach(btn => btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    if (btn.dataset.style === 'bold') isBold = btn.classList.contains('active');
    if (btn.dataset.style === 'italic') isItalic = btn.classList.contains('active');
  }));

  // Format
  document.querySelectorAll('.format-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); selectedFormat = btn.dataset.fmt;
    document.getElementById('dl-fmt').textContent = btn.dataset.fmt.toUpperCase();
  }));

  // Reset
  function resetAll() {
    document.getElementById('qr-input').value = '';
    document.getElementById('qr-color').value = '#1a1917'; document.getElementById('qr-color-label').textContent = '#1a1917';
    document.getElementById('bg-color').value = '#ffffff'; document.getElementById('bg-color-label').textContent = '#ffffff';
    document.getElementById('dark-preset').checked = false;
    document.getElementById('qr-size').value = 600; document.getElementById('qr-size-label').textContent = '600 px';
    document.getElementById('text-toggle').checked = false; toggleTextControls();
    document.getElementById('overlay-text').value = '';
    document.getElementById('text-position').value = 'bottom';
    document.getElementById('text-color').value = '#1a1917'; document.getElementById('text-color-label').textContent = '#1a1917';
    document.getElementById('font-size').value = 22; document.getElementById('font-size-label').textContent = '22px';
    document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.align-btn[data-align="center"]').classList.add('active'); selectedAlign = 'center';
    document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active')); isBold = false; isItalic = false;
    logoDataURL = null;
    document.getElementById('logo-input').value = '';
    document.getElementById('logo-preview-wrap').style.display = 'none';
    document.getElementById('logo-controls').style.display = 'none';
    document.getElementById('logo-size').value = 20; document.getElementById('logo-size-label').textContent = '20%';
    document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.shape-btn[data-shape="rounded"]').classList.add('active'); selectedShape = 'rounded';
    document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.format-btn[data-fmt="png"]').classList.add('active'); selectedFormat = 'png';
    document.getElementById('dl-fmt').textContent = 'PNG';
    finalCanvas = null;
    document.getElementById('live-preview-wrap').innerHTML = '<div class="preview-placeholder"><span class="big">&#11035;</span>Fill in your details and click<br/><strong>Generate &amp; Preview</strong></div>';
    document.getElementById('action-row').style.display = 'none';
    document.getElementById('scan-tip').classList.remove('show');
    document.getElementById('quality-note').textContent = '';
    showToast('All fields cleared!');
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function generateQR() {
    const text = document.getElementById('qr-input').value.trim();
    if (!text) { showToast('Please enter text or a URL first.'); return; }

    const qrColor   = document.getElementById('qr-color').value;
    const bgColor   = document.getElementById('bg-color').value;
    const qrSize    = parseInt(document.getElementById('qr-size').value);
    const pad       = Math.round(qrSize * 0.045);

    const useText    = document.getElementById('text-toggle').checked;
    const overlayTxt = document.getElementById('overlay-text').value.trim();
    const textPos    = document.getElementById('text-position').value;
    const fontSize   = parseInt(document.getElementById('font-size').value);
    const textColor  = document.getElementById('text-color').value;
    const fontDecl   = (isItalic ? 'italic ' : '') + (isBold ? 'bold ' : '');

    const hidden = document.getElementById('qr-hidden');
    hidden.innerHTML = '';

    new QRCode(hidden, {
      text, width: qrSize, height: qrSize,
      colorDark: qrColor, colorLight: bgColor,
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
      const qrCanvas = hidden.querySelector('canvas');
      if (!qrCanvas) return;

      const isOutside = textPos === 'top' || textPos === 'bottom';
      const textH = (useText && overlayTxt && isOutside) ? fontSize + pad * 1.5 : 0;
      const totalW = qrSize + pad * 2;
      const totalH = qrSize + pad * 2 + textH;

      const c = document.createElement('canvas');
      c.width = totalW; c.height = totalH;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, totalW, totalH);

      // QR position
      const qrY = (isOutside && textPos === 'top') ? textH + pad : pad;
      ctx.drawImage(qrCanvas, pad, qrY, qrSize, qrSize);

      // Text
      if (useText && overlayTxt) {
        ctx.font = `${fontDecl}${fontSize}px DM Sans, sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textBaseline = 'middle';

        let tx;
        if (selectedAlign === 'left')       { ctx.textAlign = 'left';   tx = pad; }
        else if (selectedAlign === 'right') { ctx.textAlign = 'right';  tx = totalW - pad; }
        else                                { ctx.textAlign = 'center'; tx = totalW / 2; }

        let ty;
        if (textPos === 'top')            ty = textH / 2;
        else if (textPos === 'bottom')    ty = qrY + qrSize + textH / 2;
        else if (textPos === 'top-inside') ty = qrY + fontSize + pad / 2;
        else                              ty = qrY + qrSize - fontSize - pad / 2;

        ctx.fillText(overlayTxt, tx, ty);
      }

      // Logo
      if (logoDataURL) {
        const logoRatio = parseInt(document.getElementById('logo-size').value) / 100;
        const logoSize  = Math.round(qrSize * logoRatio);
        const cx = pad + qrSize / 2;
        const cy = qrY + qrSize / 2;
        const lx = cx - logoSize / 2;
        const ly = cy - logoSize / 2;
        const bp = Math.round(qrSize * 0.025);
        const bw = logoSize + bp * 2;
        const bh = logoSize + bp * 2;
        const bx = cx - bw / 2;
        const by = cy - bh / 2;

        const logo = new Image();
        logo.onload = () => {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.fillStyle = bgColor;
          ctx.beginPath();
          if (selectedShape === 'circle')       ctx.arc(cx, cy, Math.max(bw, bh) / 2, 0, Math.PI * 2);
          else if (selectedShape === 'rounded') roundRect(ctx, bx, by, bw, bh, bw * 0.22);
          else                                  ctx.rect(bx, by, bw, bh);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          if (selectedShape === 'circle')       ctx.arc(cx, cy, logoSize / 2, 0, Math.PI * 2);
          else if (selectedShape === 'rounded') roundRect(ctx, lx, ly, logoSize, logoSize, logoSize * 0.18);
          else                                  ctx.rect(lx, ly, logoSize, logoSize);
          ctx.clip();
          ctx.drawImage(logo, lx, ly, logoSize, logoSize);
          ctx.restore();

          finalize(c, totalW, totalH);
        };
        logo.src = logoDataURL;
      } else {
        finalize(c, totalW, totalH);
      }
    }, 200);
  }

  function finalize(canvas, totalW, totalH) {
    finalCanvas = canvas;

    const maxW  = 290;
    const scale = Math.min(1, maxW / totalW);
    const pw = Math.round(totalW * scale);
    const ph = Math.round(totalH * scale);

    const preview = document.createElement('canvas');
    preview.width = pw; preview.height = ph;
    const pCtx = preview.getContext('2d');
    pCtx.imageSmoothingEnabled = true;
    pCtx.imageSmoothingQuality = 'high';
    pCtx.drawImage(canvas, 0, 0, pw, ph);

    const wrap = document.getElementById('live-preview-wrap');
    wrap.innerHTML = '';
    wrap.appendChild(preview);

    document.getElementById('action-row').style.display = 'flex';
    document.getElementById('scan-tip').classList.add('show');
    document.getElementById('quality-note').textContent = `Full resolution: ${totalW} x ${totalH}px`;
    showToast('QR generated!');
  }

  function downloadQR() {
    if (!finalCanvas) return;
    const isJpg = selectedFormat === 'jpg';
    const mimeType = isJpg ? 'image/jpeg' : 'image/png';
    const ext = isJpg ? 'jpg' : 'png';
    let exportCanvas = finalCanvas;
    if (isJpg) {
      exportCanvas = document.createElement('canvas');
      exportCanvas.width = finalCanvas.width; exportCanvas.height = finalCanvas.height;
      const ctx = exportCanvas.getContext('2d');
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = document.getElementById('bg-color').value;
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      ctx.drawImage(finalCanvas, 0, 0);
    }
    const link = document.createElement('a');
    link.download = `qrcode.${ext}`;
    link.href = exportCanvas.toDataURL(mimeType, 1.0);
    link.click();
    showToast('Downloaded!');
  }

  async function copyQR() {
    if (!finalCanvas) return;
    try {
      finalCanvas.toBlob(async blob => {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        const btn = document.getElementById('copy-btn');
        btn.textContent = 'Copied!'; btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        showToast('Copied to clipboard!');
      }, 'image/png');
    } catch {
      showToast('Copy not supported in this browser.');
    }
  }
</script>
</body>
</html>