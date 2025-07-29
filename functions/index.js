export async function onRequest({ request }) {
  const ua = request.headers.get("user-agent") || '';
  const host = request.headers.get("host");
  const url = new URL(request.url);
  const html = `
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Your Info</title></head><body style="font-family:sans-serif;padding:1em;">
  <h1>Your Info</h1>
  <p><strong>URL:</strong> https://${host}${url.pathname}${url.search}</p>
  <p><strong>User-Agent:</strong> ${ua}</p>
  <p><strong>IPv4:</strong> <span id="ipv4">loading...</span></p>
  <p><strong>IPv6:</strong> <span id="ipv6">loading...</span></p>
  <script>
    fetch("https://ipv4.icanhazip.com").then(r=>r.text()).then(ip=>document.getElementById("ipv4").textContent=ip.trim()).catch(_=>{});
    fetch("https://ipv6.icanhazip.com").then(r=>r.text()).then(ip=>document.getElementById("ipv6").textContent=ip.trim()).catch(_=>{});
  </script>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
