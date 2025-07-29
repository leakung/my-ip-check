export async function onRequest({ request }) {
  const ua = request.headers.get("user-agent") || '';
  const host = request.headers.get("host");
  const url = new URL(request.url);
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your's Info</title>

  <!-- Inline SVG favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>" />

  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap" rel="stylesheet" />

  <style>
    body {
      font-family: 'Quicksand', sans-serif;
      margin: 0;
      padding: 1em;
      transition: background 0.3s, color 0.3s;
      position: relative;
      min-height: 100vh;
    }
    .box {
      max-width: 500px;
      margin: 3em auto 1em auto;
      padding: 1.5em 2em;
      border-radius: 12px;
      word-wrap: break-word;
      transition: background 0.3s, box-shadow 0.3s;
    }
    p {
      margin: 0.75em 0;
      font-size: 1em;
      line-height: 1.4;
    }
    strong {
      color: #d1a9d6;
    }
    body.light {
      background: #f9f6f7;
      color: #444;
    }
    body.light .box {
      background: #fffafc;
      box-shadow: 0 3px 8px rgba(0,0,0,0.05);
    }
    body.light strong {
      color: #b084bc;
    }
    body.dark {
      background: #1e1e1e;
      color: #ddd;
    }
    body.dark .box {
      background: #2b2b2b;
      box-shadow: 0 3px 8px rgba(255,255,255,0.05);
    }
    body.dark strong {
      color: #d1a9d6;
    }
    .toggle-container {
      position: fixed;
      top: 12px;
      right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      font-size: 1.3rem;
      user-select: none;
      color: #b084bc;
      transition: color 0.3s;
      background: rgba(255 255 255 / 0.85);
      padding: 6px 10px;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 9999;
    }
    body.dark .toggle-container {
      color: #d1a9d6;
      background: rgba(0 0 0 / 0.65);
      box-shadow: 0 2px 10px rgba(255,255,255,0.1);
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 28px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #b084bc;
      border-radius: 34px;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      border-radius: 50%;
      transition: 0.4s;
    }
    input:checked + .slider {
      background-color: #d1a9d6;
    }
    input:checked + .slider:before {
      transform: translateX(24px);
    }
  </style>
</head>
<body>
  <div class="toggle-container" aria-label="Toggle dark mode">
    <span title="Light mode">☀️</span>
    <label class="switch">
      <input type="checkbox" id="darkModeToggle" />
      <span class="slider"></span>
    </label>
    <span title="Dark mode">🌙</span>
  </div>

  <div class="box">
    <p><strong>URL:</strong> https://${host}${url.pathname}${url.search}</p>
    <p><strong>User-Agent:</strong> ${ua}</p>
    <p><strong>IPv4:</strong> <span id="ipv4">Loading...</span></p>
    <p><strong>IPv6:</strong> <span id="ipv6">Loading...</span></p>
  </div>

  <script>
    let savedMode = localStorage.getItem('mode');
    if (savedMode === 'light') {
      document.body.classList.add('light');
      document.getElementById('darkModeToggle').checked = false;
    } else {
      document.body.classList.add('dark');
      document.getElementById('darkModeToggle').checked = true;
    }
    document.getElementById('darkModeToggle').addEventListener('change', function() {
      if(this.checked) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('mode', 'dark');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('mode', 'light');
      }
    });

    fetch("https://ipv4.icanhazip.com").then(r => r.text()).then(ip => document.getElementById("ipv4").textContent = ip.trim()).catch(_ => {});
    fetch("https://ipv6.icanhazip.com").then(r => r.text()).then(ip => document.getElementById("ipv6").textContent = ip.trim()).catch(_ => {});
  </script>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
