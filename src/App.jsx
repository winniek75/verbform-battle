import { useState, useEffect, useCallback, useRef } from "react";
import { QUESTIONS, pickQuestions, LEVEL_INFO } from "./questions.js";
import IntroScreen from "./IntroScreen.jsx";

// ── helpers ────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── localStorage helpers ───────────────────────────────────
const LS_KEYS = {
  HIGH_SCORE: "verbform_highScore",
  TOTAL_XP: "verbform_totalXP",
  WRONG_HISTORY: "verbform_wrongHistory",
};

function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Sound effects (Web Audio API) ──────────────────────────
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function playCorrectSound() {
  try {
    const ctx = getAudioCtx();
    const freqs = [523.25, 659.25, 783.99];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.2;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + i * 0.1;
      osc.start(start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.stop(start + 0.3);
    });
  } catch {}
}

function playWrongSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
    gain.gain.value = 0.3;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.stop(ctx.currentTime + 0.2);
  } catch {}
}

// ── TTS helper ─────────────────────────────────────────────
function speakAnswer(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  } catch {}
}

const COMBO_MSGS = [
  { min: 2,  text: "ナイス！✨",    color: "#7c3aed" },
  { min: 4,  text: "すごい！🔥",   color: "#ea580c" },
  { min: 6,  text: "かっこいい！⚡", color: "#0891b2" },
  { min: 8,  text: "天才！👑",     color: "#b45309" },
  { min: 10, text: "レジェンド！💥", color: "#be185d" },
];
function getComboMsg(combo) {
  let msg = null;
  for (const m of COMBO_MSGS) if (combo >= m.min) msg = m;
  return msg;
}

// ── CSS ────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Noto+Sans+JP:wght@400;700;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Noto Sans JP', sans-serif;
  background: #f0f4ff;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  background: linear-gradient(160deg, #e8f4fd 0%, #f0e8fd 50%, #fde8f0 100%);
  padding: 0 0 60px;
}

.wrap {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 16px;
}

/* ── HOME ──────────────────────────────── */
.home-logo {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  font-weight: 900;
  text-align: center;
  margin-bottom: 4px;
  line-height: 1.2;
}
.logo-em { 
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.home-sub {
  text-align: center;
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 14px;
  box-shadow: 0 4px 20px rgba(99,102,241,0.08);
  border: 2px solid rgba(99,102,241,0.06);
}
.clabel {
  font-weight: 900;
  font-size: 0.85rem;
  color: #374151;
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

/* level buttons */
.level-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.lvl-btn {
  padding: 14px 8px;
  border-radius: 16px;
  border: 3px solid transparent;
  background: #f3f4f6;
  cursor: pointer;
  text-align: center;
  transition: all 0.18s;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.lvl-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
.lvl-icon { font-size: 1.6rem; }
.lvl-name { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 0.9rem; color: #1f2937; }
.lvl-desc { font-size: 0.63rem; color: #6b7280; font-weight: 700; line-height: 1.5; }
.act-g3 { background: #eff6ff; border-color: #3b82f6; }
.act-p2 { background: #fffbeb; border-color: #f59e0b; }
.act-all { background: #fdf2f8; border-color: #ec4899; }

/* count buttons */
.cnt-grid { display: flex; gap: 8px; flex-wrap: wrap; }
.cnt-btn {
  padding: 10px 18px; border-radius: 12px; border: 2px solid #e5e7eb;
  background: white; font-family:'Nunito',sans-serif; font-weight: 900;
  font-size: 1rem; color: #6b7280; cursor: pointer; transition: all 0.15s;
}
.cnt-btn.act { background: #6366f1; border-color: #6366f1; color: white; }
.cnt-btn:hover:not(.act) { border-color: #6366f1; color: #6366f1; }

/* info box */
.info-box {
  background: linear-gradient(135deg, #f0f4ff, #fdf2f8);
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 0.82rem;
  line-height: 2;
  color: #4b5563;
  margin-bottom: 14px;
  border: 1.5px solid #e0e7ff;
}

/* start buttons */
.start-btn {
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  border: none;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 1.15rem;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: transform 0.15s, box-shadow 0.15s;
  margin-bottom: 10px;
  color: white;
}
.start-btn:hover { transform: translateY(-3px); }
.s-grade3 { background: linear-gradient(135deg, #3b82f6, #8b5cf6); box-shadow: 0 6px 20px rgba(99,102,241,0.35); }
.s-pre2   { background: linear-gradient(135deg, #f59e0b, #ef4444); box-shadow: 0 6px 20px rgba(245,158,11,0.35); }
.s-all    { background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6); background-size:200% 100%; box-shadow: 0 6px 20px rgba(236,72,153,0.35); }
.skip-btn {
  width: 100%;
  padding: 13px;
  border-radius: 13px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #9ca3af;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
}
.skip-btn:hover { border-color: #6366f1; color: #6366f1; }

/* ── DRILL ─────────────────────────────── */
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px;
}
.back-btn {
  display: flex; align-items: center; gap: 4px;
  background: white; border: 2px solid #e5e7eb;
  border-radius: 99px; padding: 7px 14px;
  cursor: pointer; font-size: 0.78rem; font-weight: 700; color: #6b7280;
  font-family: 'Noto Sans JP', sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.15s;
}
.back-btn:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
.back-btn:disabled { opacity: 0.3; cursor: default; }

.score-row { display: flex; gap: 10px; font-size: 0.8rem; font-weight: 700; color: #6b7280; align-items: center; }
.score-row .num { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1rem; color: #374151; }

/* progress */
.pb-wrap {
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.pb-track {
  flex: 1; height: 10px; background: #e5e7eb; border-radius: 99px; overflow: hidden;
}
.pb-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  border-radius: 99px;
  transition: width 0.4s ease;
}
.pb-num { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 0.8rem; color: #6b7280; white-space: nowrap; }

/* combo */
.combo-badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: linear-gradient(135deg, #fef9c3, #fef3c7);
  border: 2px solid #fbbf24;
  border-radius: 99px;
  padding: 4px 12px;
  font-family:'Nunito',sans-serif;
  font-weight: 900; font-size: 0.85rem; color: #92400e;
  margin-bottom: 10px;
  animation: bounceIn 0.3s ease;
}
.combo-badge.hot { background: linear-gradient(135deg, #fee2e2, #fecaca); border-color: #f87171; color: #991b1b; }

/* category tag */
.qcat {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px; flex-wrap: wrap;
}
.badge {
  padding: 4px 12px; border-radius: 99px;
  font-size: 0.7rem; font-weight: 900; 
}
.b-c  { background: #dbeafe; color: #1e40af; }
.b-g  { background: #fef3c7; color: #92400e; }
.b-p  { background: #fce7f3; color: #9d174d; }
.tricky-tag {
  background: #fee2e2; color: #991b1b;
  padding: 3px 10px; border-radius: 99px;
  font-size: 0.7rem; font-weight: 900;
}

/* question card */
.qcard {
  background: white;
  border-radius: 22px;
  padding: 22px;
  box-shadow: 0 6px 24px rgba(99,102,241,0.1);
  border: 2px solid rgba(99,102,241,0.08);
  transition: transform 0.15s;
  position: relative; overflow: hidden;
}
.qcard::before {
  content:''; position:absolute; top:0; left:0; right:0; height:5px;
  background: linear-gradient(90deg, #6366f1, #ec4899);
}
.qcard.shake { animation: shake 0.4s ease; }
.qcard.pop   { animation: pop 0.3s ease; }

.qtext {
  font-size: clamp(1.1rem, 3.5vw, 1.35rem);
  font-weight: 900;
  color: #1f2937;
  line-height: 1.7;
  margin-bottom: 20px;
}
.blank {
  display: inline-block;
  min-width: 72px;
  background: linear-gradient(135deg, #ede9fe, #fce7f3);
  border: 2px dashed #8b5cf6;
  border-radius: 8px;
  padding: 2px 10px;
  color: #7c3aed;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9em;
  font-weight: 900;
  text-align: center;
}

/* options */
.opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.opt {
  padding: 14px 10px;
  border-radius: 14px;
  border: 2.5px solid #e5e7eb;
  background: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 1.1rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}
.opt:hover:not(:disabled) {
  border-color: #8b5cf6;
  background: #f5f3ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139,92,246,0.18);
}
.opt:disabled { cursor: default; }
.oc { background: #d1fae5 !important; border-color: #10b981 !important; color: #065f46 !important; }
.ow { background: #fee2e2 !important; border-color: #ef4444 !important; color: #991b1b !important; }
.dim { opacity: 0.4; }

/* fill */
.fill-row { display: flex; gap: 8px; margin-bottom: 10px; }
.fill-in {
  flex: 1;
  padding: 13px 16px;
  border-radius: 13px;
  border: 2.5px solid #e5e7eb;
  font-family: 'Nunito', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  color: #1f2937;
  outline: none;
  transition: border-color 0.15s;
  background: #fafafa;
}
.fill-in:focus { border-color: #8b5cf6; background: white; }
.fill-in.fc { border-color: #10b981; background: #d1fae5; color: #065f46; }
.fill-in.fw { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
.sub-btn {
  padding: 12px 20px;
  border-radius: 12px; border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white; font-family:'Nunito',sans-serif;
  font-weight: 900; font-size: 0.9rem; cursor: pointer;
  transition: transform 0.12s;
  box-shadow: 0 3px 10px rgba(99,102,241,0.3);
}
.sub-btn:hover:not(:disabled) { transform: scale(1.04); }
.sub-btn:disabled { opacity: 0.35; cursor: default; }
.hint {
  font-size: 0.8rem; color: #7c3aed; font-weight: 700;
  background: #f5f3ff; border-radius: 9px; padding: 8px 12px;
  border-left: 3px solid #8b5cf6;
}

/* explanation */
.exp {
  margin-top: 14px; padding: 14px 16px;
  border-radius: 14px;
  animation: fadeSlide 0.3s ease;
}
.ec { background: #d1fae5; border-left: 4px solid #10b981; }
.ew { background: #fee2e2; border-left: 4px solid #ef4444; }
.exp-hd { font-weight: 900; font-size: 0.9rem; margin-bottom: 5px; }
.exp-ok { color: #065f46; }
.exp-ng { color: #991b1b; }
.exp-ans { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1.1em; }
.exp-body { font-size: 0.82rem; color: #374151; line-height: 1.65; }

/* next button */
.next-btn {
  width: 100%; margin-top: 14px;
  padding: 15px;
  border-radius: 14px; border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white; font-family:'Nunito',sans-serif;
  font-weight: 900; font-size: 1rem;
  cursor: pointer; letter-spacing: 0.03em;
  box-shadow: 0 4px 14px rgba(99,102,241,0.3);
  transition: transform 0.12s, box-shadow 0.12s;
  animation: fadeSlide 0.25s ease;
}
.next-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 20px rgba(99,102,241,0.4); }

/* toast */
.toast {
  position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
  font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1.1rem;
  padding: 10px 24px; border-radius: 99px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  z-index: 999; pointer-events: none;
  animation: toastUp 1.8s ease forwards;
  white-space: nowrap;
  color: white;
}

/* streak */
.streak-row {
  display: flex; gap: 4px; flex-wrap: wrap; margin-top: 12px;
}
.streak-dot {
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.6rem;
}

/* ── RESULT ──────────────────────────────── */
.result-card {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(99,102,241,0.12);
  border: 2px solid rgba(99,102,241,0.08);
}
.result-emoji { font-size: 3.5rem; margin-bottom: 10px; }
.result-title { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1.5rem; color: #1f2937; margin-bottom: 6px; }
.big-score {
  font-family:'Nunito',sans-serif; font-weight: 900;
  font-size: 4.5rem; line-height: 1;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}
.rank-label {
  display: inline-block;
  font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1.3rem;
  padding: 6px 22px; border-radius: 99px; margin-bottom: 16px;
}

.stats-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;
  margin-bottom: 20px;
}
.stat-box {
  background: #f9fafb; border-radius: 14px; padding: 12px 8px;
  border: 1.5px solid #f3f4f6;
}
.stat-val { font-family:'Nunito',sans-serif; font-weight: 900; font-size: 1.3rem; color: #1f2937; }
.stat-lbl { font-size: 0.67rem; color: #9ca3af; font-weight: 700; margin-top: 2px; }

.wlist { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; text-align: left; }
.wi { background: #fafafa; border-radius: 12px; padding: 12px 14px; border-left: 3px solid #ef4444; }
.wi-q { font-weight: 700; font-size: 0.88rem; color: #1f2937; margin-bottom: 4px; }
.wi-a { font-size: 0.78rem; color: #6b7280; font-weight: 700; }
.wc { color: #065f46; }
.wy { color: #991b1b; }
.wi-e { font-size: 0.76rem; color: #6366f1; margin-top: 5px; font-weight: 700; }

.act-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
.a-btn {
  padding: 14px; border-radius: 14px; border: 2px solid transparent;
  font-family:'Nunito',sans-serif; font-weight: 900; font-size: 0.9rem;
  cursor: pointer; transition: all 0.15s;
}
.a-retry { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
.a-retry:hover { transform: translateY(-2px); }
.a-wrong { background: #fff; border-color: #ef4444; color: #ef4444; }
.a-wrong:hover { background: #fee2e2; }
.a-review { background: #fff; border-color: #8b5cf6; color: #7c3aed; }
.a-review:hover { background: #f5f3ff; }
.a-home { background: #f3f4f6; border-color: #e5e7eb; color: #6b7280; }
.a-home:hover { background: #e5e7eb; }
.a-full { grid-column: 1 / -1; }

/* ── animations ──────────────────────────── */
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-5px)}
  80%{transform:translateX(5px)}
}
@keyframes pop {
  0%{transform:scale(1)}
  50%{transform:scale(1.04)}
  100%{transform:scale(1)}
}
@keyframes fadeSlide {
  from{opacity:0;transform:translateY(8px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes bounceIn {
  0%{transform:scale(0.6);opacity:0}
  60%{transform:scale(1.1)}
  100%{transform:scale(1);opacity:1}
}
@keyframes toastUp {
  0%  {opacity:0;transform:translateX(-50%) translateY(10px)}
  15% {opacity:1;transform:translateX(-50%) translateY(0)}
  70% {opacity:1;transform:translateX(-50%) translateY(0)}
  100%{opacity:0;transform:translateX(-50%) translateY(-10px)}
}

.combo-milestone-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; pointer-events: none;
  animation: milestoneAnim 1.5s ease forwards;
}
.combo-milestone-text {
  font-family: 'Nunito', sans-serif; font-weight: 900;
  font-size: clamp(36px, 10vw, 64px); color: #fff;
  text-shadow: 0 0 40px rgba(99,102,241,.6), 0 4px 20px rgba(0,0,0,.5);
  animation: milestoneTextPop 1.5s cubic-bezier(.34,1.56,.64,1) forwards;
}
@keyframes milestoneAnim { 0%{opacity:0} 10%{opacity:1} 70%{opacity:1} 100%{opacity:0} }
@keyframes milestoneTextPop { 0%{transform:scale(0) rotate(-10deg);opacity:0} 30%{transform:scale(1.3) rotate(3deg);opacity:1} 50%{transform:scale(1) rotate(0)} 100%{transform:scale(.8) translateY(-30px);opacity:0} }

.adaptive-hint-vfb {
  background: linear-gradient(135deg, #ede9fe, #fce7f3);
  border-left: 3px solid #8b5cf6;
  border-radius: 9px; padding: 8px 12px; margin-top: 8px;
  font-size: 0.8rem; color: #7c3aed; font-weight: 700;
  animation: fadeSlide 0.3s ease;
}
`;

// ── component ───────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]     = useState("home");   // home | intro | drill | result
  const [level, setLevel]       = useState("grade3");
  const [qCount, setQCount]     = useState(10);
  const [questions, setQuestions] = useState([]);
  const [cur, setCur]           = useState(0);
  const [score, setScore]       = useState(0);
  const [combo, setCombo]       = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [selected, setSelected] = useState(null);
  const [fill, setFill]         = useState("");
  const [shown, setShown]       = useState(false);
  const [wrongs, setWrongs]     = useState([]);
  const [streak, setStreak]     = useState([]);
  const [total, setTotal]       = useState(0);
  const [anim, setAnim]         = useState("");
  const [toastKey, setToastKey] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);
  const [highScore, setHighScore] = useState(() => loadLS(LS_KEYS.HIGH_SCORE, 0));
  const [totalXP, setTotalXP]     = useState(() => loadLS(LS_KEYS.TOTAL_XP, 0));
  const [comboMilestone, setComboMilestone] = useState(null);
  const [recentResults, setRecentResults] = useState([]);
  const [showAdaptiveHint, setShowAdaptiveHint] = useState(false);
  const inputRef = useRef(null);

  const COMBO_MILESTONES = { 3: "NICE! \u2728", 5: "GREAT! \uD83D\uDD25", 7: "AMAZING! \u26A1", 10: "UNSTOPPABLE! \uD83D\uDC8E" };

  // Adaptive hint logic
  useEffect(() => {
    if (recentResults.length >= 5) {
      const wrongCount = recentResults.filter(r => !r).length;
      const allCorrect = recentResults.every(r => r);
      if (wrongCount >= 3) setShowAdaptiveHint(true);
      else if (allCorrect) setShowAdaptiveHint(false);
    }
  }, [recentResults]);

  useEffect(() => {
    if (window.WiseXP) window.WiseXP.init('verbform-battle');
  }, []);

  const q = questions[cur];

  // ─ start game ─────────────────────────────────────────────
  const startGame = useCallback((lvl, cnt, customQs) => {
    const qs = customQs ?? pickQuestions(lvl, cnt);
    setQuestions(qs); setCur(0); setScore(0); setCombo(0);
    setMaxCombo(0); setSelected(null); setFill(""); setShown(false);
    setWrongs([]); setStreak([]); setTotal(0); setAnim(""); setToastMsg(null);
    setComboMilestone(null); setRecentResults([]); setShowAdaptiveHint(false);
    setScreen("drill");
  }, []);

  // ─ answer ─────────────────────────────────────────────────
  const handleAnswer = useCallback((ans) => {
    if (shown) return;
    const ok = ans.trim().toLowerCase() === q.answer.trim().toLowerCase();
    setSelected(ans); setShown(true); setTotal(t => t + 1);
    if (ok) {
      playCorrectSound();
      const nc = combo + 1;
      setCombo(nc); setMaxCombo(m => Math.max(m, nc));
      const bonus = Math.min(nc - 1, 5) * 15;
      setScore(s => s + 100 + bonus);
      setStreak(h => [...h, true]);
      setAnim("pop"); setTimeout(() => setAnim(""), 400);
      const msg = getComboMsg(nc);
      if (msg) { setToastMsg(msg); setToastKey(k => k + 1); }
      // Combo milestone celebration
      if (COMBO_MILESTONES[nc]) {
        setComboMilestone(COMBO_MILESTONES[nc]);
        setTimeout(() => setComboMilestone(null), 1500);
      }
      // Adaptive hint: track recent
      setRecentResults(prev => { const next = [...prev, true]; return next.slice(-5); });
    } else {
      playWrongSound();
      // Adaptive hint: track recent
      setRecentResults(prev => { const next = [...prev, false]; return next.slice(-5); });
      if (window.WiseXP) window.WiseXP.reportWrong({ question: q.sentence, correct: q.answer, playerAnswer: ans });
      setCombo(0); setToastMsg(null);
      setWrongs(w => [...w, { ...q, yourAnswer: ans }]);
      setStreak(h => [...h, false]);
      setAnim("shake"); setTimeout(() => setAnim(""), 450);
      // Track wrong answer in localStorage
      const history = loadLS(LS_KEYS.WRONG_HISTORY, []);
      const entry = { id: q.id, sentence: q.sentence, answer: q.answer, yourAnswer: ans, date: new Date().toISOString() };
      history.push(entry);
      // Keep last 200 entries
      if (history.length > 200) history.splice(0, history.length - 200);
      saveLS(LS_KEYS.WRONG_HISTORY, history);
    }
    // TTS: read the correct verb form after answering
    setTimeout(() => speakAnswer(q.answer), 400);
  }, [shown, q, combo]);

  // ─ next ───────────────────────────────────────────────────
  const next = useCallback(() => {
    if (cur + 1 >= questions.length) { setScreen("result"); }
    else {
      setCur(c => c + 1); setSelected(null);
      setFill(""); setShown(false); setAnim("");
    }
  }, [cur, questions.length]);

  // ─ keyboard ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = e => {
      if (screen !== "drill") return;
      if (e.key === "Enter") {
        if (shown) next();
        else if (q?.type === "fill" && fill.trim()) handleAnswer(fill);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, shown, next, q, fill, handleAnswer]);

  // ─ auto-focus ─────────────────────────────────────────────
  useEffect(() => {
    if (screen === "drill" && q?.type === "fill")
      setTimeout(() => inputRef.current?.focus(), 80);
  }, [cur, screen, q]);

  // ─ persist high score & XP when game ends ───────────────────
  useEffect(() => {
    if (screen === "result" && total > 0) {
      if (score > highScore) {
        setHighScore(score);
        saveLS(LS_KEYS.HIGH_SCORE, score);
      }
      const newXP = totalXP + score;
      setTotalXP(newXP);
      saveLS(LS_KEYS.TOTAL_XP, newXP);
      if (window.WiseXP) {
        const correct = total - wrongs.length;
        const grade = level === "grade3" ? "3" : level === "pre2" ? "P2" : "all";
        window.WiseXP.reportGame({ score, correct, total, maxCombo, grade });
      }
      // → MoWISE portal へスコア送信 (WiseGame Bridge)
      try {
        const correct = total - wrongs.length;
        const acc = Math.round((correct / total) * 100);
        window.WiseGame && window.WiseGame.reportComplete({
          score, maxScore: questions.length * 10, accuracy: acc,
          metadata: { level, maxCombo,
            wrongAnswers: wrongs.slice(0, 20).map(w => ({ id: w.id, sentence: w.sentence })) }
        });
      } catch(e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const accuracy = total > 0 ? Math.round(((total - wrongs.length) / total) * 100) : 0;
  const isCorrect = selected !== null &&
    selected.trim().toLowerCase() === (q?.answer ?? "").trim().toLowerCase();

  const rank = (() => {
    if (accuracy === 100) return { label: "S 🌟", bg: "#fef9c3", color: "#92400e", msg: "完璧！すごすぎる！！" };
    if (accuracy >= 90)  return { label: "A ✨", bg: "#d1fae5", color: "#065f46", msg: "すばらしい！！" };
    if (accuracy >= 75)  return { label: "B 👍", bg: "#dbeafe", color: "#1e40af", msg: "よくできました！" };
    if (accuracy >= 55)  return { label: "C 💪", bg: "#fef3c7", color: "#92400e", msg: "もう少し！練習しよう" };
    return { label: "D 📖", bg: "#fee2e2", color: "#991b1b", msg: "もう一回チャレンジ！" };
  })();

  // ─────────────────────────────────────────────────────────
  // HOME
  // ─────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <>
        <style>{CSS}</style>
        <div className="app">
          <div className="wrap">
            <div className="home-logo">
              <span className="logo-em">関係詞</span>＆<span className="logo-em">分詞</span><br />
              ドリルマスター 🎯
            </div>
            <div className="home-sub">英検３級・準２級 文法 完全攻略</div>

            <div className="card">
              <div className="clabel">📊 レベルを選んでね</div>
              <div className="level-grid">
                {[
                  { key: "grade3", icon: "🌊", name: "３級",   desc: "who / which\n現在・過去分詞" },
                  { key: "pre2",   icon: "⚡", name: "準２級", desc: "whose / where\n分詞構文" },
                  { key: "all",    icon: "🔥", name: "全部",   desc: "３級＋準２級\nまとめ練習" },
                ].map(l => (
                  <button
                    key={l.key}
                    className={`lvl-btn ${level === l.key ? `act-${l.key}` : ""}`}
                    onClick={() => setLevel(l.key)}
                  >
                    <span className="lvl-icon">{l.icon}</span>
                    <span className="lvl-name">{l.name}</span>
                    <span className="lvl-desc" style={{ whiteSpace: "pre-line" }}>{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="clabel">❓ 何問やる？</div>
              <div className="cnt-grid">
                {[5, 10, 15, 20, 30].map(n => (
                  <button
                    key={n}
                    className={`cnt-btn ${qCount === n ? "act" : ""}`}
                    onClick={() => setQCount(n)}
                  >
                    {n}問
                  </button>
                ))}
              </div>
            </div>

            {(highScore > 0 || totalXP > 0) && (
              <div className="card" style={{ background: "linear-gradient(135deg, #fef9c3, #fef3c7)", border: "2px solid #fbbf24" }}>
                <div className="clabel" style={{ color: "#92400e" }}>🏆 あなたの記録</div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "#b45309" }}>{highScore}</div>
                    <div style={{ fontSize: "0.7rem", color: "#92400e", fontWeight: 700 }}>ハイスコア</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "#7c3aed" }}>{totalXP}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6b21a8", fontWeight: 700 }}>累計XP</div>
                  </div>
                </div>
              </div>
            )}

            <div className="info-box">
              ⚠️ <b style={{color:"#ef4444"}}>ひっかけ問題</b>あり（what vs that など）<br />
              🔥 連続正解で <b style={{color:"#f59e0b"}}>コンボボーナス</b>！<br />
              💪 間違えた問題は <b style={{color:"#10b981"}}>苦手だけ再ドリル</b> できる
            </div>

            <button
              className={`start-btn s-${level}`}
              onClick={() => setScreen("intro")}
            >
              📖 導入レッスンからはじめる！
            </button>
            <button className="skip-btn" onClick={() => startGame(level, qCount)}>
              いきなりゲームをはじめる →
            </button>
          </div>
        </div>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────
  // INTRO
  // ─────────────────────────────────────────────────────────
  if (screen === "intro") {
    return (
      <>
        <style>{CSS}</style>
        <div className="app">
          <div className="wrap">
            <IntroScreen level={level} onStart={() => startGame(level, qCount)} />
          </div>
        </div>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────
  // DRILL
  // ─────────────────────────────────────────────────────────
  if (screen === "drill" && q) {
    const li = LEVEL_INFO[q.level] || LEVEL_INFO.grade3;
    const levelColor = q.level === "grade3" ? "b-c" : "b-g";

    return (
      <>
        <style>{CSS}</style>
        <div className="app">
          <div className="wrap">
            {/* toast */}
            {toastMsg && (
              <div
                key={toastKey}
                className="toast"
                style={{ background: `linear-gradient(135deg, ${toastMsg.color}, ${toastMsg.color}dd)` }}
              >
                {toastMsg.text}
              </div>
            )}

            {/* top bar */}
            <div className="top-bar">
              <button
                className="back-btn"
                onClick={() => setScreen("home")}
              >
                🏠 ホーム
              </button>
              <div className="score-row">
                <span>✅ <span className="num">{total - wrongs.length}</span></span>
                <span>❌ <span className="num">{wrongs.length}</span></span>
              </div>
            </div>

            {/* progress */}
            <div className="pb-wrap">
              <div className="pb-track">
                <div className="pb-fill" style={{ width: `${((cur + 1) / questions.length) * 100}%` }} />
              </div>
              <span className="pb-num">{cur + 1}/{questions.length}</span>
            </div>

            {/* combo */}
            {combo >= 2 && (
              <div className={`combo-badge ${combo >= 6 ? "hot" : ""}`}>
                🔥 {combo}連続正解！
              </div>
            )}

            {/* category */}
            <div className="qcat">
              <span className={`badge ${levelColor}`}>{q.level === "grade3" ? "３級" : "準２級"}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6b7280" }}>{q.category}</span>
              {q.tricky && <span className="tricky-tag">⚠ ひっかけ！</span>}
            </div>

            {/* question card */}
            <div className={`qcard ${anim}`}>
              <div className="qtext">
                {q.sentence.split("_____").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="blank">{shown ? q.answer : "　　　"}</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Adaptive hint */}
              {showAdaptiveHint && !shown && q.hint && (
                <div className="adaptive-hint-vfb">{"\uD83D\uDCA1"} {q.hint}</div>
              )}
              {showAdaptiveHint && !shown && !q.hint && q.explanation && (
                <div className="adaptive-hint-vfb">{"\uD83D\uDCA1"} {q.explanation.split("\u3002")[0]}{"\u3002"}</div>
              )}

              {/* multiple choice */}
              {q.type === "multiple" && (
                <div className="opts">
                  {q.options.map(opt => {
                    let cls = "opt";
                    if (shown) {
                      if (opt === q.answer) cls += " oc";
                      else if (opt === selected) cls += " ow";
                      else cls += " dim";
                    }
                    return (
                      <button key={opt} className={cls} disabled={shown} onClick={() => handleAnswer(opt)}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* fill */}
              {q.type === "fill" && (
                <div>
                  <div className="fill-row">
                    <input
                      ref={inputRef}
                      className={`fill-in ${shown ? (isCorrect ? "fc" : "fw") : ""}`}
                      value={fill}
                      onChange={e => setFill(e.target.value)}
                      placeholder="ここに入力…"
                      disabled={shown}
                    />
                    {!shown && (
                      <button className="sub-btn" disabled={!fill.trim()} onClick={() => handleAnswer(fill)}>
                        決定
                      </button>
                    )}
                  </div>
                  {q.hint && <div className="hint">💡 {q.hint}</div>}
                </div>
              )}

              {/* explanation */}
              {shown && (
                <div className={`exp ${isCorrect ? "ec" : "ew"}`}>
                  <div className="exp-hd">
                    {isCorrect
                      ? <span className="exp-ok">✓ 正解！ <span className="exp-ans">{q.answer}</span></span>
                      : <span className="exp-ng">✗ 不正解… 正解は <span className="exp-ans">{q.answer}</span></span>
                    }
                  </div>
                  <div className="exp-body">
                    {q.explanation || `${q.sentence.replace("_____", q.answer)}`}
                  </div>
                </div>
              )}
            </div>

            {/* next button */}
            {shown && (
              <button className="next-btn" onClick={next}>
                {cur + 1 >= questions.length ? "結果を見る 🎉" : "次の問題へ →"}
              </button>
            )}

            {/* streak */}
            {streak.length > 0 && (
              <div className="streak-row" style={{ marginTop: 16 }}>
                {streak.map((ok, i) => (
                  <div key={i} className="streak-dot" style={{ background: ok ? "#d1fae5" : "#fee2e2", border: `2px solid ${ok ? "#10b981" : "#ef4444"}` }}>
                    {ok ? "○" : "×"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Combo milestone overlay */}
        {comboMilestone && (
          <div key={`ms-${combo}`} className="combo-milestone-overlay">
            <div className="combo-milestone-text">{comboMilestone}</div>
          </div>
        )}
      </>
    );
  }

  // ─────────────────────────────────────────────────────────
  // RESULT
  // ─────────────────────────────────────────────────────────
  if (screen === "result") {
    const resultEmoji = accuracy === 100 ? "🎉" : accuracy >= 80 ? "😄" : accuracy >= 60 ? "😊" : "💪";

    return (
      <>
        <style>{CSS}</style>
        <div className="app">
          <div className="wrap">
            <div className="result-card">
              <div className="result-emoji">{resultEmoji}</div>
              <div className="result-title">結果発表！</div>
              <div className="big-score">{total - wrongs.length} / {total}</div>
              {accuracy === 100 && total >= 3 && (
                <div style={{ fontSize: "1.3rem", fontWeight: 900, background: "linear-gradient(135deg, #f59e0b, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>
                  PERFECT! {"\uD83D\uDC8E"}
                </div>
              )}
              {accuracy >= 80 && accuracy < 100 && (
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#7c3aed", marginBottom: 6 }}>
                  {"\u3042\u3068"}{wrongs.length}{"\u554F\u3067\u30D1\u30FC\u30D5\u30A7\u30AF\u30C8\uFF01"}
                </div>
              )}
              <div
                className="rank-label"
                style={{ background: rank.bg, color: rank.color }}
              >
                {rank.label}
              </div>
              <div style={{ color: "#6b7280", fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>
                {rank.msg}
              </div>

              {/* stats */}
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-val">{accuracy}%</div>
                  <div className="stat-lbl">正解率</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val">{score}</div>
                  <div className="stat-lbl">スコア</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val">🔥{maxCombo}</div>
                  <div className="stat-lbl">最大コンボ</div>
                </div>
              </div>
              <div className="stats-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
                <div className="stat-box" style={{ background: score >= highScore ? "#fef9c3" : "#f9fafb", border: score >= highScore ? "2px solid #fbbf24" : "1.5px solid #f3f4f6" }}>
                  <div className="stat-val" style={{ color: score >= highScore ? "#b45309" : "#1f2937" }}>
                    {score >= highScore ? "🎉 " : ""}{highScore}
                  </div>
                  <div className="stat-lbl">{score >= highScore ? "NEW ハイスコア！" : "ハイスコア"}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-val" style={{ color: "#7c3aed" }}>{totalXP}</div>
                  <div className="stat-lbl">累計XP</div>
                </div>
              </div>

              {/* streak history */}
              {streak.length > 0 && (
                <div className="streak-row" style={{ justifyContent: "center", marginBottom: 16 }}>
                  {streak.map((ok, i) => (
                    <div key={i} className="streak-dot" style={{ background: ok ? "#d1fae5" : "#fee2e2", border: `2px solid ${ok ? "#10b981" : "#ef4444"}` }}>
                      {ok ? "○" : "×"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* wrong answers */}
            {wrongs.length > 0 && (
              <div className="card" style={{ marginTop: 14 }}>
                <div className="clabel">❌ 間違えた問題 ({wrongs.length}問)</div>
                <div className="wlist">
                  {wrongs.map((w, i) => (
                    <div key={i} className="wi">
                      <div className="wi-q">{w.sentence.replace("_____", `[${w.answer}]`)}</div>
                      <div className="wi-a">
                        <span className="wc">正解: {w.answer}</span>
                        {" / "}
                        <span className="wy">あなた: {w.yourAnswer}</span>
                      </div>
                      {w.explanation && <div className="wi-e">💡 {w.explanation}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* action buttons */}
            <div className="act-grid" style={{ marginTop: 14 }}>
              <button className="a-btn a-retry" onClick={() => startGame(level, qCount)}>
                🔄 もう一度
              </button>
              {wrongs.length > 0 ? (
                <button className="a-btn a-wrong" onClick={() => startGame(level, wrongs.length, [...wrongs])}>
                  💪 苦手だけ
                </button>
              ) : (
                <button className="a-btn a-retry" onClick={() => startGame(level, qCount)}>
                  🎯 次のセット
                </button>
              )}
              <button className="a-btn a-review" onClick={() => setScreen("intro")}>
                📖 導入レッスンを見る
              </button>
              <button className="a-btn a-home" onClick={() => setScreen("home")}>
                🏠 ホームへ
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
