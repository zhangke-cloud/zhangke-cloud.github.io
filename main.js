/* =====================================================
   MAIN.JS — kk Portfolio 2026
===================================================== */

// ── Image loading spinner ─────────────────────────
function attachSpinner(img) {
  if (img.complete && img.naturalWidth > 0) return;
  const parent = img.parentElement;
  if (!parent) return;
  const cs = getComputedStyle(parent);
  if (cs.position === 'static') parent.style.position = 'relative';
  const spinner = document.createElement('div');
  spinner.className = 'img-spinner';
  parent.insertBefore(spinner, img);
  const remove = () => spinner.classList.add('hidden');
  img.addEventListener('load', remove);
  img.addEventListener('error', remove);
}
document.querySelectorAll('img').forEach(attachSpinner);

// ── Nav ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── AOS entrance ─────────────────────────────────
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));
// Fallback: show everything after 2s in case observer doesn't fire
setTimeout(() => {
  document.querySelectorAll('[data-aos]:not(.visible)').forEach(el => el.classList.add('visible'));
}, 2000);

// ── Counter animation ─────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'));
  const duration = 1600;
  const start    = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(tick);
}
// Script is at bottom of body — DOM already ready, run directly
document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
const worksObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter[data-target]').forEach(animateCounter);
      worksObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.works-grid').forEach(el => worksObserver.observe(el));

// ── Internship data (公苑→小红书→网易云→字节→特斯拉→美图) ──
const STOPS = {
  1: {
    company: '公苑科技（阿里系）',
    role: '视频剪辑实习生',
    date: '2022.06 — 2022.09 · 杭州',
    color: '#FF6A00',
    photos: [
      { src: 'assets/internship/gongyuan1.jpg', cap: '阿里园区' },
      { src: 'assets/internship/gongyuan2.jpg', cap: '夜晚园区' },
      { src: 'assets/internship/gongyuan3.jpg', cap: '在阿里第82天' },
    ],
    bullets: [
      '独立完成系列短视频编导、剪辑及发布，产出多条爆款视频',
      '使用 AE 制作 MG 动画及逐帧动画，产出视频十余条',
      '全网视频播放量 800w+，涨粉 10w+',
    ]
  },
  2: {
    company: '小红书 · 产品设计部',
    role: '视频制作实习生',
    date: '2022.11 — 2023.02 · 上海',
    color: '#FE2C55',
    photos: [
      { src: 'assets/internship/xhs1.jpg', cap: '小红书实习' },
      { src: 'assets/internship/xhs2.jpg', cap: '活动现场' },
      { src: 'assets/internship/xhs3.jpg', cap: '薯队长' },
      { src: 'assets/internship/xhs4.jpg', cap: '与薯合影' },
      { src: 'assets/internship/xhs5.jpg', cap: '小红书大楼' },
    ],
    bullets: [
      '服务「艺术职业进化论」系列，4 条视频累计互动量 1.3w+',
      '独立完成视频剪辑、字幕包装、调色合成及后期动效',
      '独立制作官方账号微综艺整体动效，平台点赞量 2000+',
    ]
  },
  3: {
    company: '网易云音乐 · 品牌部',
    role: '短视频运营实习生',
    date: '2023.11 — 2024.01 · 杭州',
    color: '#C20C0C',
    photos: [
      { src: 'assets/internship/wyy1.jpg', cap: '黑胶签名墙' },
      { src: 'assets/internship/wyy2.jpg', cap: '网易园区' },
      { src: 'assets/internship/wyy3.jpg', cap: '相信音乐的力量' },
    ],
    bullets: [
      '三周内账号播放量 2000w+，点赞量 40w+，周均产出视频 20+',
      '从持续掉粉逆转为一周净涨粉 2w+',
      '产出多条爆款评论，最高单条点赞 50w+',
    ]
  },
  4: {
    company: '字节跳动',
    role: '雇主品牌实习生',
    date: '2024.01 — 2024.06 · 北京',
    color: '#1F1F1F',
    photos: [
      { src: 'assets/internship/byte1.jpg', cap: '字节日常' },
      { src: 'assets/internship/byte2.jpg', cap: '十二周年' },
      { src: 'assets/internship/byte3.jpg', cap: '实习留念' },
    ],
    bullets: [
      '参与校招及社招传播项目策划，协助创意脑暴、文案策划与内容上线',
      '校招公众号重点内容最终阅读量 5w+',
      '抖音、小红书累计互动量达 8w+，小红书内容累计互动量 3000+',
    ]
  },
  5: {
    company: '特斯拉 · 对外事务',
    role: '对外事务实习生',
    date: '2024.09 — 2024.12 · 厦门',
    color: '#CC0000',
    photos: [
      { src: 'assets/internship/tesla1.jpg', cap: '特斯拉实习' },
      { src: 'assets/internship/tesla2.jpg', cap: '活动现场' },
      { src: 'assets/internship/tesla3.jpg', cap: '展会留念' },
      { src: 'assets/internship/tesla4.jpg', cap: '对外传播' },
    ],
    bullets: [
      '参与对外传播内容策划与制作，全网累计曝光量超 100w+',
      '从 0 到 1 运营视频号，日均稳定输出 3 条，优秀视频互动量 3000+',
      '支持大型活动及展会传播，负责素材准备与供应商对接',
    ]
  },
  6: {
    company: '美图 · Wink',
    role: 'Wink 内容运营实习生',
    date: '2025.01 — 2025.08 · 厦门',
    color: '#FF4E88',
    photos: [
      { src: 'assets/internship/wink1.jpg', cap: 'Wink运营' },
      { src: 'assets/internship/wink2.jpg', cap: '摇校园活动' },
      { src: 'assets/internship/wink3.jpg', cap: '内容创作' },
      { src: 'assets/internship/wink4.jpg', cap: '日常' },
    ],
    bullets: [
      '主导「Wink 摇」校园活动，联动 100+ KOL/KOC，App 日活提升 12%',
      '100 元低成本投放，官方账号 1 小时内涨粉 2000+',
      '小红书、抖音、微博每周 2-3 条内容，单场直播在线峰值 1w+',
    ]
  },
  7: {
    company: '美图秀秀 · 港澳运营',
    role: '港澳内容运营实习生',
    date: '2025.12 — 2026.06 · 厦门',
    color: '#E0396C',
    photos: [
      { src: 'assets/internship/meitu1.jpg', cap: '港澳运营' },
      { src: 'assets/internship/meitu2.jpg', cap: '内容策划' },
      { src: 'assets/internship/meitu3.jpg', cap: '三语文案' },
      { src: 'assets/internship/meitu4.jpg', cap: '美图秀秀' },
    ],
    bullets: [
      'Push 平均点击量提升 1000+，多次刷新站内点击量记录',
      '独立运营港澳 Instagram & Threads，月浏览量 70w+、互动量 2w+',
      '搭建 Threads 达人资源库，累计建联港澳达人 50+',
    ]
  }
};

// ── Map trail animation (straight lines, no path animation needed) ────
const mapStage  = document.getElementById('mapStage');

// ── Map stop entrance ─────────────────────────────
const stopObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.map-stop').forEach((stop, i) => {
        stop.style.opacity = '0';
        stop.style.transform = 'translate(-50%,-50%) scale(0.4)';
        setTimeout(() => {
          stop.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
          stop.style.opacity = '1';
          stop.style.transform = 'translate(-50%,-50%) scale(1)';
        }, 500 + i * 150);
      });
      stopObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
if (mapStage) stopObserver.observe(mapStage);

// ── Tooltip ───────────────────────────────────────
const tooltip        = document.getElementById('mapTooltip');
const tooltipClose   = document.getElementById('tooltipClose');
const tooltipLogo    = document.getElementById('tooltipLogo');
const tooltipRole    = document.getElementById('tooltipRole');
const tooltipDate    = document.getElementById('tooltipDate');
const tooltipBullets = document.getElementById('tooltipBullets');
const photoStack     = document.getElementById('photoStack');
const photoHint      = document.getElementById('photoHint');

function buildPhotoStack(photos) {
  if (!photoStack) return;
  photoStack.innerHTML = '';
  photos.forEach((ph) => {
    const wrap = document.createElement('div');
    wrap.className = 'photo-thumb-wrap';
    const spinner = document.createElement('div');
    spinner.className = 'img-spinner';
    const img = document.createElement('img');
    img.className = 'photo-thumb';
    img.src = ph.src;
    img.alt = '';
    img.onload  = () => spinner.classList.add('hidden');
    img.onerror = () => { spinner.classList.add('hidden'); wrap.style.display = 'none'; };
    wrap.appendChild(spinner);
    wrap.appendChild(img);
    photoStack.appendChild(wrap);
  });
  if (photoHint) photoHint.style.display = 'none';
  if (photoStack) photoStack.style.display = photos.length ? '' : 'none';
}

function positionTooltip(stopEl) {
  if (!mapStage || !tooltip) return;
  const stageRect = mapStage.getBoundingClientRect();
  const stopRect  = stopEl.getBoundingClientRect();
  const cx = stopRect.left - stageRect.left + stopRect.width / 2;
  const cy = stopRect.top  - stageRect.top  + stopRect.height / 2;
  const tipW = 300, tipH = 320, pad = 16;
  const stageW = stageRect.width, stageH = stageRect.height;
  let left = cx + 40;
  let top  = cy - 60;
  if (left + tipW + pad > stageW) left = cx - tipW - 40;
  if (top + tipH + pad > stageH) top = stageH - tipH - pad;
  if (top < pad) top = pad;
  if (left < pad) left = pad;
  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
  tooltip.style.right = 'auto';
}

// Shared hide timer — all zones cancel the same timer
let tooltipHideTimer = null;

function showTooltipFor(stop) {
  clearTimeout(tooltipHideTimer);
  const data = STOPS[parseInt(stop.getAttribute('data-id'))];
  if (!data) return;

  if (tooltipLogo) {
    tooltipLogo.innerHTML = `<span class="tooltip-company-badge" style="background:${data.color}20;border-color:${data.color}55;color:${data.color}">${data.company}</span>`;
  }
  if (tooltipRole)    tooltipRole.textContent  = data.role;
  if (tooltipDate)    tooltipDate.textContent  = data.date;
  if (tooltipBullets) tooltipBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
  buildPhotoStack(data.photos || []);

  tooltip.style.opacity = '0';
  tooltip.style.pointerEvents = 'none';
  tooltip.classList.add('visible');
  positionTooltip(stop);
  requestAnimationFrame(() => {
    tooltip.style.opacity = '';
    tooltip.style.pointerEvents = '';
  });
}

function scheduleHideTooltip() {
  tooltipHideTimer = setTimeout(() => {
    if (tooltip) tooltip.classList.remove('visible');
  }, 180);
}

document.querySelectorAll('.map-stop').forEach(stop => {
  stop.addEventListener('mouseenter', () => showTooltipFor(stop));
  stop.addEventListener('mouseleave', scheduleHideTooltip);
});

if (tooltip) {
  tooltip.addEventListener('mouseenter', () => clearTimeout(tooltipHideTimer));
  tooltip.addEventListener('mouseleave', scheduleHideTooltip);
}
if (photoStack) {
  photoStack.addEventListener('mouseenter', () => clearTimeout(tooltipHideTimer));
  photoStack.addEventListener('mouseleave', scheduleHideTooltip);
}
if (tooltipClose) {
  tooltipClose.addEventListener('click', () => { if (tooltip) tooltip.classList.remove('visible'); });
}

// ── Portfolio tabs ─────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      panel.querySelectorAll('[data-aos]').forEach(el => {
        if (!el.classList.contains('visible')) setTimeout(() => el.classList.add('visible'), 80);
      });
    }
  });
});

// ── Smooth scroll ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const el = document.querySelector(link.getAttribute('href'));
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ═══════════════════════════════════════════════
   LIFE — Polaroid drop board
═══════════════════════════════════════════════ */
const HOBBIES = {
  travel: {
    label: '✈️ 旅游',
    blurb: '去过韩国🇰🇷、日本🇯🇵、泰国🇹🇭、港澳台……每一段旅途都是用户洞察的素材库，真实生活才是最好的内容灵感。',
    photos: [
      { src: 'assets/life/travel1.jpg',  cap: '东京迪士尼' },
      { src: 'assets/life/travel2.jpg',  cap: '京都' },
      { src: 'assets/life/travel3.jpg',  cap: '台湾金门' },
      { src: 'assets/life/travel4.jpg',  cap: '大邱' },
      { src: 'assets/life/travel5.jpg',  cap: '大阪' },
      { src: 'assets/life/travel6.jpg',  cap: '大阪环球影城' },
      { src: 'assets/life/travel7.jpg',  cap: '曼谷' },
      { src: 'assets/life/travel8.jpg',  cap: '芭提雅' },
      { src: 'assets/life/travel9.jpg',  cap: '金门' },
      { src: 'assets/life/travel10.jpg', cap: '釜山' },
      { src: 'assets/life/travel11.jpg', cap: '釜山小火车' },
      { src: 'assets/life/travel12.jpg', cap: '韩国全北' },
      { src: 'assets/life/travel13.jpg', cap: '首尔' },
      { src: 'assets/life/travel14.jpg', cap: '首尔' },
      { src: 'assets/life/travel15.jpg', cap: '香港' },
    ]
  },
  music: {
    label: '🎵 音乐',
    blurb: '现场演出是我的解压方式，也是理解用户情绪峰值的最好课堂。每一次尖叫都是真实的数据。',
    photos: [
      { src: 'assets/life/music1.jpg', cap: 'NewJeans' },
      { src: 'assets/life/music2.jpg', cap: '依加' },
      { src: 'assets/life/music3.jpg', cap: '刘思鉴' },
      { src: 'assets/life/music4.jpg', cap: '刘思鉴 上海' },
      { src: 'assets/life/music5.jpg', cap: '刘思鉴 广州' },
      { src: 'assets/life/music6.jpg', cap: '张杰' },
      { src: 'assets/life/music7.jpg', cap: '朴宰范' },
      { src: 'assets/life/music8.jpg', cap: '汪苏泷' },
      { src: 'assets/life/music9.jpg', cap: '邓紫棋' },
    ]
  }
};

// Pin colors
const PIN_COLORS = ['#FF6B8A','#5BC4FF','#FFD166','#06D6A0','#C77DFF','#FF9A3C'];

let activeHobby = null;

function dropPolaroids(hobbyKey) {
  const board = document.getElementById('polaroidBoard');
  if (!board) return;

  const data = HOBBIES[hobbyKey];
  if (!data) return;

  // Clear existing with a quick fade
  board.style.opacity = '0';
  board.style.transition = 'opacity 0.18s ease';

  setTimeout(() => {
    board.innerHTML = '';
    board.style.opacity = '1';

    data.photos.forEach((ph, i) => {
      const card = document.createElement('div');
      card.className = 'drop-pol';

      // Random scatter: rotation and slight position offset
      const rot   = (Math.random() * 22 - 11).toFixed(1);
      const tx    = (Math.random() * 20 - 10).toFixed(1);
      const pinColor = PIN_COLORS[i % PIN_COLORS.length];

      card.style.setProperty('--rot', rot + 'deg');
      card.style.setProperty('--tx', tx + 'px');
      card.style.setProperty('--pin-color', pinColor);
      // Slow, scattered drop — each card delays randomly 0–1.2s
      card.style.animationDelay    = (i * 0.08 + Math.random() * 0.3).toFixed(2) + 's';
      card.style.animationDuration = (0.8 + Math.random() * 0.4).toFixed(2) + 's';

      card.innerHTML = `
        <div class="drop-pol-pin"></div>
        <div class="drop-pol-img">
          <img src="${ph.src}" alt="${ph.cap}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="drop-pol-ph">📷</div>
        </div>
        <div class="drop-pol-cap">${ph.cap}</div>
      `;
      card.querySelectorAll('img').forEach(attachSpinner);

      // Click to pop to front / jiggle
      card.addEventListener('click', () => {
        document.querySelectorAll('.drop-pol').forEach(c => c.classList.remove('popped'));
        card.classList.add('popped');
      });

      board.appendChild(card);
    });

    // Update blurb
    const blurb = document.getElementById('hobbyBlurb');
    if (blurb) {
      blurb.style.opacity = '0';
      blurb.textContent = data.blurb;
      requestAnimationFrame(() => {
        blurb.style.transition = 'opacity 0.4s ease';
        blurb.style.opacity = '1';
      });
    }
  }, 180);
}

document.querySelectorAll('.hobby-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-hobby');
    document.querySelectorAll('.hobby-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (activeHobby === key) {
      // Toggle off — clear board
      const board = document.getElementById('polaroidBoard');
      if (board) {
        board.style.opacity = '0';
        setTimeout(() => { board.innerHTML = ''; board.style.opacity = '1'; }, 180);
      }
      const blurb = document.getElementById('hobbyBlurb');
      if (blurb) blurb.textContent = '';
      activeHobby = null;
      btn.classList.remove('active');
    } else {
      activeHobby = key;
      dropPolaroids(key);
    }
  });
});

/* ═══════════════════════════════════════════════
   IMAGE TRAIL — triggered inside hero section
═══════════════════════════════════════════════ */
(function () {
  const TRAIL_IMGS = [
    'assets/trail/1.jpg',
    'assets/trail/2.jpg',
    'assets/trail/3.jpg',
    'assets/trail/4.jpg',
    'assets/trail/5.jpg',
    'assets/trail/6.jpg',
    'assets/trail/7.jpg',
    'assets/trail/8.jpg',
  ];

  // Preload so images appear instantly when trail fires
  TRAIL_IMGS.forEach(src => { const i = new Image(); i.src = src; });

  let trailIdx  = 0;
  let lastTrailT = 0;

  function spawnTrail(x, y) {
    const el = document.createElement('div');
    el.className = 'trail-item';
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.style.setProperty('--trail-rot', (Math.random() * 30 - 15).toFixed(1) + 'deg');

    const img = new Image();
    img.src = TRAIL_IMGS[trailIdx++ % TRAIL_IMGS.length];
    img.alt = '';
    el.appendChild(img);
    document.body.appendChild(el);

    el.addEventListener('animationend', () => {
      el.classList.add('trail-leaving');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, { once: true });
  }

  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastTrailT < 100) return;
      lastTrailT = now;
      spawnTrail(e.clientX, e.clientY);
    });
  }
})();

/* ═══════════════════════════════════════════════
   LETTER SWAP — nav links · portfolio tabs · CTA
═══════════════════════════════════════════════ */
(function () {
  function buildChars(text, parent) {
    [...text].forEach((char, i) => {
      const ch = document.createElement('span');
      ch.className = 'ls-char';

      const f = document.createElement('span');
      f.className = 'ls-f';
      f.textContent = char;
      f.style.transitionDelay = `${i * 0.028}s`;

      const b = document.createElement('span');
      b.className = 'ls-b';
      b.textContent = char;
      b.style.transitionDelay = `${i * 0.028}s`;

      ch.appendChild(f);
      ch.appendChild(b);
      parent.appendChild(ch);
    });
  }

  // Nav links and portfolio tab buttons — pure text
  document.querySelectorAll('.nav-links a, .tab-btn').forEach(el => {
    const text = el.textContent.trim();
    if (!text) return;
    el.innerHTML = '';
    buildChars(text, el);
    el.classList.add('ls-ready');
  });

  // Hero CTA — has a child SVG, so only swap the text node
  const cta = document.querySelector('.hero-cta');
  if (cta) {
    const tn = [...cta.childNodes].find(
      n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
    );
    if (tn) {
      const wrap = document.createElement('span');
      wrap.className = 'ls-text-wrap';
      buildChars(tn.textContent.trim(), wrap);
      cta.replaceChild(wrap, tn);
      cta.classList.add('ls-ready');
    }
  }
})();

/* ═══════════════════════════════════════════════
   DESIGN LIGHTBOX
═══════════════════════════════════════════════ */
(function () {
  const lb = document.getElementById('designLightbox');
  if (!lb) return;
  const lbBody = lb.querySelector('.design-lb-body');
  const lbClose = lb.querySelector('.design-lb-close');

  function openLb(el) {
    lbBody.innerHTML = '';
    let media;
    if (el.tagName === 'VIDEO') {
      media = document.createElement('video');
      const src = el.querySelector('source');
      if (src) media.src = src.getAttribute('src');
      media.autoplay = true; media.loop = true; media.muted = true;
      media.controls = true; media.playsInline = true;
    } else {
      media = document.createElement('img');
      media.src = el.src; media.alt = el.alt || '';
    }
    lbBody.appendChild(media);
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    const v = lbBody.querySelector('video');
    if (v) v.pause();
    lbBody.innerHTML = '';
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('.design-lb-trigger');
    if (t) openLb(t);
  });
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  lbClose.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('active')) closeLb();
  });
})();

/* ═══════════════════════════════════════════════
   VIDEO PANEL — lightbox + nav tabs
═══════════════════════════════════════════════ */
(function () {
  const lb = document.getElementById('designLightbox');
  if (!lb) return;
  const lbBody = lb.querySelector('.design-lb-body');

  // Open video in lightbox for .vp-play items
  document.addEventListener('click', e => {
    const play = e.target.closest('.vp-play');
    if (!play) return;
    const src = play.getAttribute('data-src');
    if (!src) return;
    lbBody.innerHTML = '';
    const v = document.createElement('video');
    v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
    lbBody.appendChild(v);
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Nav tab → scroll project into view
  document.querySelectorAll('.vp-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vp-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
})();

// ── Fan Carousel (个人账号 Hikkie) ─────────────────────────────────
(function initFanCarousels() {
  const STEP = 80;   // px between card centers
  const MAX_VIS = 3; // show ±3 from active

  const FANS = [
    {
      id: 'fan-intern',
      activeIndex: 3, // 小红书实习1 center (6586 likes)
      cards: [
        // Left side — XHS internship grouped, likes decrease outward
        { img: 'assets/vlog/internship/小红书实习4.png', url: 'https://www.xiaohongshu.com/explore/63b4e017000000001f00f2ae?xsec_token=ABM8An3qiQxwxC39RrEnZUlC2bplwy62qZgncSkVCksk8=&xsec_source=pc_user' },
        { img: 'assets/vlog/internship/小红书实习3.png', url: 'https://www.xiaohongshu.com/explore/63737a5e000000000c020757?xsec_token=ABom2AGnIfYU0bgEICAf6MF78aU86xo7TqE8C6JLFS5m4=&xsec_source=pc_user' },
        { img: 'assets/vlog/internship/小红书实习2.png', url: 'https://www.xiaohongshu.com/explore/63763377000000001c034a15?xsec_token=AB8jCB1ToHb0v9NSKNjnTPgaACclYdOXzbbj1p08QsOME=&xsec_source=pc_user' },
        // Center
        { img: 'assets/vlog/internship/小红书实习1.png', url: 'https://www.xiaohongshu.com/explore/63722d9b000000001b00e2dc?xsec_token=ABEVCMuiU7Xg0DaTW7LMjLk4tfzTN5Ti2F-R1dZbn4GYo=&xsec_source=pc_user' },
        // Right side — 字节, 美图 grouped, 特斯拉 at edge
        { img: 'assets/vlog/internship/字节实习.png',   url: 'https://www.xiaohongshu.com/explore/65d20901000000000b023b18?xsec_token=ABgrbx9X2Q6Pm7VU77gK6zrxVmTt4j0sXo6_XEMTNSzsY=&xsec_source=pc_user' },
        { img: 'assets/vlog/internship/美图实习1.png',  url: 'https://www.xiaohongshu.com/explore/678dc011000000001801553b?xsec_token=ABsVY_4kVMtjRnGTkebrtNzUg0S9_rhc6NmuJsbSvWy4U=&xsec_source=pc_user' },
        { img: 'assets/vlog/internship/美图实习2.png',  url: 'https://www.xiaohongshu.com/explore/67b8360b000000000901624f?xsec_token=ABQAZjLfuDc8rCZJb9GNdkA9i6wahZBJFzqajjqJYQZtY=&xsec_source=pc_user' },
        { img: 'assets/vlog/internship/特斯拉实习.png', url: 'https://www.xiaohongshu.com/explore/66fbe386000000002c02c501?xsec_token=ABOOALSdRX156vOk7AW6rAXUsNT9y_qesxbcQet4LhlTo=&xsec_source=pc_user' },
      ]
    },
    {
      id: 'fan-travel',
      activeIndex: 3, // 韩国1 center (697 likes)
      cards: [
        // Left side — Thailand/Pattaya grouped, likes decrease outward
        { img: 'assets/vlog/travel/芭提雅.png', url: 'https://www.xiaohongshu.com/explore/6785f35d0000000001001e97?xsec_token=ABxDPVOornbhbiwa4-nTrBNJgtvo2he94Y59Vgezuw484=&xsec_source=pc_user' },
        { img: 'assets/vlog/travel/泰国2.png',  url: 'https://www.xiaohongshu.com/explore/677eb723000000000b0215ef?xsec_token=ABHZ2bLNStq_EQD3FNVCt_3tCVbS2DiHZgFyQaicGhMTA=&xsec_source=pc_user' },
        { img: 'assets/vlog/travel/泰国1.png',  url: 'https://www.xiaohongshu.com/explore/677e21ff000000001703c533?xsec_token=ABHZ2bLNStq_EQD3FNVCt_3tCVbS2DiHZgFyQaicGhMTA=&xsec_source=pc_user' },
        // Center
        { img: 'assets/vlog/travel/韩国1.png',  url: 'https://www.xiaohongshu.com/explore/67d8139100000000090143a7?xsec_token=AB3bm06UGp3mTcqtqCP7bam5DGjh5_9A2Sy_uCJR0hgcw=&xsec_source=pc_user' },
        // Right side — Korea adjacent, then Tokyo grouped, then HK
        { img: 'assets/vlog/travel/韩国2.png',  url: 'https://www.xiaohongshu.com/explore/68ba8c9c000000001c010486?xsec_token=ABatlbZxprPj_sVul0-5j5YiunDyyLhIbp4EfIsJEEvKk=&xsec_source=pc_user' },
        { img: 'assets/vlog/travel/东京1.png',  url: 'https://www.xiaohongshu.com/explore/6682b46f00000000030270e9?xsec_token=ABp0QUTkm3uVCtlHLMptnrsF9wh1cYRiKN_nOSl1NUwwk=&xsec_source=pc_user' },
        { img: 'assets/vlog/travel/东京2.png',  url: 'https://www.xiaohongshu.com/explore/66854ece000000000a027337?xsec_token=ABL3Db5Imv8Os-e7LgJyv1PcDFZIak72rx5AfMX7UKt-4=&xsec_source=pc_user' },
        { img: 'assets/vlog/travel/香港.png',   url: 'https://www.xiaohongshu.com/explore/66d6fe54000000001f03d0f3?xsec_token=ABUny6Adp2KxPoug4d5JkwxCI6Syho8YnKuP-h61F_C7M=&xsec_source=pc_user' },
      ]
    },

    // ── 网易云音乐 视频号 ──
    {
      id: 'fan-wyy-wx',
      activeIndex: 2,
      cards: [
        { img: 'assets/vlog/wyy-wx/marry-you.jpg',     url: 'https://weixin.qq.com/sph/AuYpp9jtpg',   label: 'Marry You' },
        { img: 'assets/vlog/wyy-wx/japanese.jpg',      url: 'https://weixin.qq.com/sph/AxokpTO3v1',   label: '日语歌' },
        { img: 'assets/vlog/wyy-wx/minyun.jpg',        url: 'https://weixin.qq.com/sph/AQbyGvjQXA',   label: '命运' },
        { img: 'assets/vlog/wyy-wx/xusong.jpg',        url: 'https://weixin.qq.com/sph/AK61iGimye',   label: '许嵩' },
        { img: 'assets/vlog/wyy-wx/xiangyunduan.jpg',  url: 'https://weixin.qq.com/sph/AK61iGimye',   label: '向云端' },
      ]
    },

    // ── 网易云音乐 抖音 ──
    {
      id: 'fan-wyy-dy',
      activeIndex: 2,
      cards: [
        { img: 'assets/vlog/wyy-dy/alin.png',   url: 'https://www.douyin.com/user/MS4wLjABAAAAfMwW6Z5lQpP1qqLMa1m9ZYMuBj-o3_Wvo00Ut7nfGwc?modal_id=7321665028363504922', label: 'Alin' },
        { img: 'assets/vlog/wyy-dy/xiaosy.png', url: 'https://www.douyin.com/user/MS4wLjABAAAAfMwW6Z5lQpP1qqLMa1m9ZYMuBj-o3_Wvo00Ut7nfGwc?modal_id=7317123203170700595', label: '小沈阳' },
        { img: 'assets/vlog/wyy-dy/panwb.png',  url: 'https://www.douyin.com/user/MS4wLjABAAAAfMwW6Z5lQpP1qqLMa1m9ZYMuBj-o3_Wvo00Ut7nfGwc?modal_id=7314244034510228772', label: '潘玮柏' },
        { img: 'assets/vlog/wyy-dy/parkjf.png', url: 'https://www.douyin.com/user/MS4wLjABAAAAfMwW6Z5lQpP1qqLMa1m9ZYMuBj-o3_Wvo00Ut7nfGwc?modal_id=7322054614939864347', label: '朴宰范' },
        { img: 'assets/vlog/wyy-dy/weila.png',  url: 'https://www.douyin.com/user/MS4wLjABAAAAfMwW6Z5lQpP1qqLMa1m9ZYMuBj-o3_Wvo00Ut7nfGwc?modal_id=7324609856151866662', label: '韦礼安' },
      ]
    },

    // ── Wink 系列教程 ──
    {
      id: 'fan-wink-tut',
      activeIndex: 1,
      cards: [
        { img: 'assets/vlog/wink-tut/live.png', url: 'https://www.douyin.com/user/MS4wLjABAAAAkll6N6MLOEvzjF6EpGBPO7DmXANZxzgv0KOlXtsV6QSGAGVnrggDSpA5YbMVIZH0?from_tab_name=main&modal_id=7468997405803892009', label: '高清 Live 大法' },
        { img: 'assets/vlog/wink-tut/dji.png',  url: 'https://www.douyin.com/user/MS4wLjABAAAAkll6N6MLOEvzjF6EpGBPO7DmXANZxzgv0KOlXtsV6QSGAGVnrggDSpA5YbMVIZH0?from_tab_name=main&modal_id=7505369414980734217', label: '手机爆改大疆' },
        { img: 'assets/vlog/wink-tut/bg.png',   url: 'https://www.douyin.com/user/MS4wLjABAAAAkll6N6MLOEvzjF6EpGBPO7DmXANZxzgv0KOlXtsV6QSGAGVnrggDSpA5YbMVIZH0?from_tab_name=main&modal_id=7510185532207500544', label: '背景纹丝不动' },
        { img: 'assets/vlog/wink-tut/hd.png',   url: 'https://www.douyin.com/user/MS4wLjABAAAAkll6N6MLOEvzjF6EpGBPO7DmXANZxzgv0KOlXtsV6QSGAGVnrggDSpA5YbMVIZH0?from_tab_name=main&modal_id=7525400500716473609', label: '高糊变高清' },
      ]
    },

    // ── 字节跳动 抖音 / 小红书 (合并) ──
    {
      id: 'fan-byte-works',
      activeIndex: 2,
      cards: [
        { img: 'assets/vlog/byte-dy/resume.jpg',     url: 'https://www.douyin.com/user/MS4wLjABAAAAsDAdxyh4cYdtTXzEjMeaF5bzgnFIUcD3NhvEnHFCjbg?from_tab_name=main&modal_id=7359507153167633674', label: '无法拒绝的简历' },
        { img: 'assets/vlog/byte-dy/findpeople.jpg', url: 'https://www.douyin.com/user/MS4wLjABAAAAsDAdxyh4cYdtTXzEjMeaF5bzgnFIUcD3NhvEnHFCjbg?from_tab_name=main&modal_id=7362448449410813225', label: '全网找人' },
        { img: 'assets/vlog/byte-dy/bigco.jpg',      url: 'https://www.douyin.com/user/MS4wLjABAAAAsDAdxyh4cYdtTXzEjMeaF5bzgnFIUcD3NhvEnHFCjbg?from_tab_name=main&modal_id=7379829194181594377', label: '大公司病' },
        { img: 'assets/vlog/byte-xhs/tea.png',       url: 'https://www.xiaohongshu.com/explore/65f04245000000001203e604?xsec_token=ABn4qrVjFpTmcHnHCbded-JcRHgLDQbL87yMUo4dt_J88=&xsec_source=pc_user', label: '下午茶' },
        { img: 'assets/vlog/byte-xhs/stay.png',      url: 'https://www.xiaohongshu.com/explore/65fa9bd50000000012022355?xsec_token=AB3O-223z8wq5Fx10HIB8ySRgncDamL9KgnGreHt1QyN4=&xsec_source=pc_user', label: '请留步' },
      ]
    },
  ];

  FANS.forEach(function(fan) {
    var stage = document.getElementById(fan.id);
    if (!stage) return;

    // Build card elements
    fan.cards.forEach(function(card, i) {
      var a = document.createElement('a');
      a.className = 'fan-card';
      a.href = card.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.dataset.index = i;
      a.innerHTML = '<div class="fan-card-frame"><img src="' + card.img + '" loading="lazy" alt="' + (card.label || '') + '"></div>' +
                    (card.label ? '<div class="fan-card-label">' + card.label + '</div>' : '');
      a.querySelectorAll('img').forEach(attachSpinner);

      a.addEventListener('click', function(e) {
        var idx = parseInt(this.dataset.index);
        if (idx !== fan.activeIndex) {
          e.preventDefault();
          fan.activeIndex = idx;
          renderFan(fan);
        }
      });
      stage.appendChild(a);
    });

    renderFan(fan);

    // Prev / Next buttons
    var wrap = stage.parentElement;
    var prevBtn = wrap.querySelector('.fan-btn-prev');
    var nextBtn = wrap.querySelector('.fan-btn-next');
    if (prevBtn) prevBtn.addEventListener('click', function() {
      fan.activeIndex = Math.max(0, fan.activeIndex - 1);
      renderFan(fan);
    });
    if (nextBtn) nextBtn.addEventListener('click', function() {
      fan.activeIndex = Math.min(fan.cards.length - 1, fan.activeIndex + 1);
      renderFan(fan);
    });
  });

  function renderFan(fan) {
    var stage = document.getElementById(fan.id);
    var cards = stage.querySelectorAll('.fan-card');
    cards.forEach(function(card, i) {
      var offset = i - fan.activeIndex;
      var absO = Math.abs(offset);
      var tx = offset * STEP;
      var ty = absO * 13;
      var scale = Math.max(0.52, 1 - absO * 0.088);
      var rot = offset * 6.5;
      var zi = 20 - absO;
      var op = absO > MAX_VIS ? 0 : Math.max(0.42, 1 - absO * 0.13);

      card.style.transform = 'translateX(calc(-50% + ' + tx + 'px)) translateY(' + ty + 'px) scale(' + scale + ') rotate(' + rot + 'deg)';
      card.style.zIndex = zi;
      card.style.opacity = op;
      card.style.pointerEvents = absO > MAX_VIS ? 'none' : 'auto';
      card.classList.toggle('is-center', offset === 0);
    });
  }
})();

/* ═══════════════════════════════════════════════
   GUESTBOOK — anonymous sticky notes (localStorage)
═══════════════════════════════════════════════ */
(function () {
  var MSG_KEY  = 'kk_messages';

  var form      = document.getElementById('gbForm');
  var msgInput  = document.getElementById('gbMsg');
  var board     = document.getElementById('gbBoard');
  var emptyEl   = document.getElementById('gbEmpty');
  if (!msgInput || !form) return;

  var messages = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
  var COLORS = ['#fff0f3','#fffde7','#e8fff5','#e8d5f5','#d0eeff','#fde8d8','#fff3b0'];
  var ROTS   = ['-2deg','-1.2deg','0.5deg','1.5deg','-0.8deg','2deg','-1.5deg','1deg'];

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderMessages() {
    board.querySelectorAll('.gb-note').forEach(function(n){ n.remove(); });
    if (messages.length === 0) {
      if (emptyEl) emptyEl.style.display = '';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    messages.slice().reverse().forEach(function (m, i) {
      var card = document.createElement('div');
      card.className = 'gb-note';
      card.style.background = COLORS[i % COLORS.length];
      card.style.setProperty('--rot', ROTS[i % ROTS.length]);
      card.innerHTML =
        '<div class="gb-note-text">' + escHtml(m.text) + '</div>' +
        '<div class="gb-note-time">' + m.time + '</div>';
      board.appendChild(card);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = msgInput.value.trim();
    if (!text) { msgInput.focus(); return; }

    // POST to Netlify Forms (captured in your dashboard)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'guestbook', 'message': text }).toString()
    }).catch(function(err) { console.error('Netlify Forms error:', err); });

    // Save to localStorage for on-page display
    var now = new Date();
    messages.push({ text: text, time: (now.getMonth()+1) + '月' + now.getDate() + '日' });
    if (messages.length > 30) messages = messages.slice(-30);
    localStorage.setItem(MSG_KEY, JSON.stringify(messages));
    msgInput.value = '';
    renderMessages();
  });

  msgInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) form.dispatchEvent(new Event('submit'));
  });

  renderMessages();
})();
