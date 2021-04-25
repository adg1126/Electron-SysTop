const path = require('path'),
  osu = require('node-os-utils'),
  os = require('os');
const { deflateSync } = require('zlib');

const cpu = osu.cpu,
  mem = osu.mem;

const cpuModel = document.querySelector('#cpu-model');
(cpuUsage = document.querySelector('#cpu-usage')),
  (cpuFree = document.querySelector('#cpu-free')),
  (cpuProgress = document.querySelector('#cpu-progress')),
  (compName = document.querySelector('#comp-name')),
  (compOs = document.querySelector('#os')),
  (sysUptime = document.querySelector('#sys-uptime')),
  (memTotal = document.querySelector('#mem-total'));

let cpuOverload = 5;

setInterval(() => {
  cpu.usage().then(info => {
    cpuUsage.textContent = `${info}%`;
    cpuProgress.style.width = `${info}%`;

    info > cpuOverload
      ? (cpuProgress.style.background = 'red')
      : (cpuProgress.style.background = '#30c88b');
  });

  cpu.free().then(info => {
    cpuFree.textContent = `${info}%`;
  });

  sysUptime.textContent = secondsToDhms(os.uptime());
}, 1000);

cpuModel.textContent = cpu.model();
compName.textContent = os.hostname();
compOs.textContent = `${os.type()} ${os.arch()}`;
mem.info().then(info => {
  memTotal.textContent = `${Math.round(info.totalMemMb)} Mb`;
});

// Show daya, hours, mins, secs
function secondsToDhms(sec) {
  sec = +sec;

  const d = Math.floor(sec / (3600 * 24));
  const h = Math.floor((sec % (3600 * 24)) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);

  return `${d}d, ${h}h, ${m}m, ${s}s`;
}