function levelFromScore(score) {
  if (score < 30) return '低冲突';
  if (score < 60) return '局部冲突';
  if (score < 80) return '高风险战争';
  return '大规模战争';
}

function trendClass(value) {
  if (!value) return 'flat';
  if (value.includes('+')) return 'up';
  if (value.includes('-')) return 'down';
  return 'flat';
}

function scenarioRow(item) {
  return `
    <div class="row">
      <div class="row-left">
        <div class="row-title">${item.name}</div>
        <div class="row-desc">${item.description}</div>
      </div>
      <div class="tag">概率 ${item.probability}</div>
    </div>`;
}

function marketRow(item) {
  return `
    <div class="row">
      <div class="row-left">
        <div class="row-title">${item.asset}</div>
        <div class="row-desc">${item.view}</div>
      </div>
      <div class="tag">${item.window}</div>
    </div>`;
}

function sourceRow(item) {
  const link = item.url ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item.name}</a>` : item.name;
  return `<div class="source-item"><strong>${link}</strong><br><span class="row-desc">${item.note}</span></div>`;
}

async function loadDashboard() {
  const res = await fetch('data/latest.json');
  const data = await res.json();

  document.getElementById('lastUpdated').textContent = `更新：${data.snapshot_date}`;
  document.getElementById('riskScore').textContent = data.risk_score;
  document.getElementById('riskLevel').textContent = levelFromScore(data.risk_score);
  document.getElementById('riskMeter').style.width = `${data.risk_score}%`;
  document.getElementById('riskSummary').textContent = data.risk_summary;

  document.getElementById('brentPrice').textContent = data.brent.price;
  document.getElementById('brentChange').textContent = data.brent.change;
  document.getElementById('brentChange').className = `metric-change ${trendClass(data.brent.change)}`;

  document.getElementById('goldPrice').textContent = data.gold.price;
  document.getElementById('goldChange').textContent = data.gold.change;
  document.getElementById('goldChange').className = `metric-change ${trendClass(data.gold.change)}`;

  document.getElementById('blackSwan').textContent = data.black_swan_probability;
  document.getElementById('marketDefense').textContent = `股市防御等级：${data.market_defense}`;

  document.getElementById('scenarios').innerHTML = data.scenarios.map(scenarioRow).join('');
  document.getElementById('alerts').innerHTML = data.alerts.map(x => `<li>${x}</li>`).join('');
  document.getElementById('marketMap').innerHTML = data.market_map.map(marketRow).join('');
  document.getElementById('observations').innerHTML = data.observations.map(x => `<li>${x}</li>`).join('');
  document.getElementById('sources').innerHTML = data.sources.map(sourceRow).join('');
}

loadDashboard().catch(err => {
  document.body.innerHTML = `<main class="container"><section class="card"><h1>加载失败</h1><p class="note">请确认 data/latest.json 存在且格式正确。</p><pre>${String(err)}</pre></section></main>`;
});
