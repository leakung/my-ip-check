export async function onRequest({ request }) {
  const ua = request.headers.get("user-agent") || '';
  const host = request.headers.get("host");
  const url = new URL(request.url);
  const html = `
  <!DOCTYPE html>
  <html><head><meta charset="UTF-8"><title>IP Info</title></head>
  <body style="font-family:sans-serif;">
    <h1>Your Info</h1>
    <p><b>URL:</b> https://${host}${url.pathname}</p>
    <p><b>User-Agent:</b> ${ua}</p>
    <p><b>IPv4:</b> <span id="ipv4">loading...</span></p>
    <p><b>IPv6:</b> <span id="ipv6">loading...</span></p>
    <script>
      fetch("https://ipv4.icanhazip.com").then(r => r.text()).then(ip => document.getElementById("ipv4").textContent = ip.trim());
      fetch("https://ipv6.icanhazip.com").then(r => r.text()).then(ip => document.getElementById("ipv6").textContent = ip.trim());
    </script>
  </body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}