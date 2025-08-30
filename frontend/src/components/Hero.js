
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Spanzor Influencer Database</title>
  <style>
    :root{--bg:#0b1117;--card:#111827;--text:#e6edf3;--muted:#9fb0c3;--accent:#60a5fa;--good:#34d399}
    *{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif}
    .wrap{max-width:1100px;margin:0 auto;padding:18px}
    h1{margin:0 0 6px;font-size:22px}
    p{color:var(--muted);margin:6px 0 18px}
    .grid{display:grid;grid-template-columns:repeat(12,1fr);gap:12px}
    .card{background:var(--card);border:1px solid #1f2a38;border-radius:14px;padding:14px}
    label{font-size:12px;color:#b7c5d3;margin-bottom:6px;display:block}
    input,select,textarea{width:100%;padding:10px;border-radius:10px;border:1px solid #243244;background:#0d1420;color:var(--text)}
    textarea{min-height:68px;resize:vertical}
    .col-6{grid-column:span 6}
    .col-4{grid-column:span 4}
    .col-3{grid-column:span 3}
    .col-12{grid-column:span 12}
    .btn{display:inline-block;background:var(--accent);border:0;padding:12px 16px;border-radius:12px;color:#081222;font-weight:600;cursor:pointer}
    .btn:disabled{opacity:.6;cursor:not-allowed}
    .row{display:flex;gap:10px;align-items:center;justify-content:flex-start}
    .tag{font-size:12px;color:#9fb0c3}
    table{width:100%;border-collapse:collapse;margin-top:10px}
    th,td{border-bottom:1px solid #19273a;padding:8px 10px;text-align:left;font-size:13px}
    th{color:#b7c5d3;font-weight:600}
    .pill{padding:4px 8px;border-radius:999px;background:#0f1a2b;border:1px solid #22334a;color:#b7c5d3;font-size:12px}
    .success{color:var(--good);font-weight:600}
    @media (max-width:720px){.col-6,.col-4,.col-3{grid-column:span 12}}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Spanzor Influencer Database</h1>
    <p>Enter influencer details below. Submissions save directly to your Google Sheet in Drive.</p>

    <div class="card">
      <form id="form" onsubmit="submitForm(event)">
        <div class="grid">
          <div class="col-6">
            <label>Name</label>
            <input name="name" required placeholder="e.g., Suryanarayanan" />
          </div>
          <div class="col-6">
            <label>Instagram Handle</label>
            <input name="handle" required placeholder="@username" />
          </div>
          <div class="col-12">
            <label>Profile URL</label>
            <input name="url" type="url" placeholder="https://www.instagram.com/username" />
          </div>

          <div class="col-6">
            <label>Category</label>
            <select name="category" id="category"></select>
          </div>
          <div class="col-6">
            <label>Subcategory</label>
            <input name="subcategory" placeholder="e.g., Street Food / Local" />
          </div>

          <div class="col-4">
            <label>City</label>
            <select name="city" id="city"></select>
          </div>
          <div class="col-4">
            <label>Languages</label>
            <input name="languages" placeholder="Tamil, English" />
          </div>
          <div class="col-4">
            <label>Followers</label>
            <input name="followers" type="number" placeholder="e.g., 32000" />
          </div>

          <div class="col-4">
            <label>Mobile</label>
            <input name="mobile" placeholder="+91 9xxxxxxxxx" />
          </div>
          <div class="col-4">
            <label>WhatsApp</label>
            <select name="whatsapp" id="whatsapp"></select>
          </div>
          <div class="col-4">
            <label>Email</label>
            <input name="email" type="email" placeholder="name@email.com" />
          </div>

          <div class="col-4">
            <label>Rate – Reel (₹)</label>
            <input name="rateReel" type="number" min="0" step="100" />
          </div>
          <div class="col-4">
            <label>Rate – Story (₹)</label>
            <input name="rateStory" type="number" min="0" step="100" />
          </div>
          <div class="col-4">
            <label>Rate – Static (₹)</label>
            <input name="rateStatic" type="number" min="0" step="100" />
          </div>

          <div class="col-6">
            <label>Preferred Platforms</label>
            <select name="platforms" id="platforms"></select>
          </div>
          <div class="col-6">
            <label>Content Style</label>
            <input name="contentStyle" placeholder="Reviews, Reels, Tutorials" />
          </div>

          <div class="col-4">
            <label>GST Registered</label>
            <select name="gst" id="gst"></select>
          </div>
          <div class="col-4">
            <label>Payment Method</label>
            <input name="paymentMethod" placeholder="UPI / Bank / Cash" />
          </div>
          <div class="col-4">
            <label>Consent to Share Contact</label>
            <select name="consent" id="consent"></select>
          </div>

          <div class="col-12">
            <label>Notes</label>
            <textarea name="notes" placeholder="Any special requirements, past collabs, etc."></textarea>
          </div>

          <div class="col-12 row">
            <button id="submitBtn" class="btn" type="submit">Save to Google Sheet</button>
            <span id="status" class="tag"></span>
          </div>
        </div>
      </form>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="row" style="justify-content:space-between">
        <div><strong>Recent Entries</strong></div>
        <button class="btn" onclick="refreshRecent()">Refresh</button>
      </div>
      <table id="recent">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Handle</th><th>Followers</th><th>Tier</th><th>Mobile</th><th>City</th><th>Category</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>

  <script>
    function fillSelect(id, items){
      const el = document.getElementById(id);
      el.innerHTML = items.map(v => `<option value="${v}">${v}</option>`).join('');
    }

    function submitForm(e){
      e.preventDefault();
      const form = document.getElementById('form');
      const data = Object.fromEntries(new FormData(form).entries());
      document.getElementById('submitBtn').disabled = true;
      document.getElementById('status').textContent = 'Saving...';

      google.script.run
        .withSuccessHandler(res => {
          document.getElementById('submitBtn').disabled = false;
          if(res && res.ok){
            document.getElementById('status').innerHTML = '<span class="success">Saved ✔</span> ID: ' + res.id + ' | Tier: ' + (res.tier || '');
            form.reset();
            refreshRecent();
          } else {
            document.getElementById('status').textContent = 'Error saving';
          }
        })
        .withFailureHandler(err => {
          document.getElementById('submitBtn').disabled = false;
          document.getElementById('status').textContent = 'Error: ' + (err && err.message ? err.message : err);
        })
        .addInfluencer(data);
    }

    function refreshRecent(){
      google.script.run.withSuccessHandler(rows => {
        const tbody = document.querySelector('#recent tbody');
        tbody.innerHTML = (rows || []).map(r => `
          <tr>
            <td>${r.id||''}</td>
            <td>${r.name||''}</td>
            <td>${r.handle||''}</td>
            <td>${r.followers||''}</td>
            <td><span class="pill">${r.tier||''}</span></td>
            <td>${r.mobile||''}</td>
            <td>${r.city||''}</td>
            <td>${r.category||''}</td>
          </tr>
        `).join('');
      }).listRecent(10);
    }

    function boot(){
      google.script.run.withSuccessHandler(L => {
        fillSelect('category', L.categories);
        fillSelect('city', L.cities);
        fillSelect('whatsapp', L.yesno);
        fillSelect('gst', L.yesno);
        fillSelect('consent', L.yesno);
        fillSelect('platforms', L.platforms);
        refreshRecent();
      }).getLookups();
    }
    document.addEventListener('DOMContentLoaded', boot);
  </script>
</body>
</html>
