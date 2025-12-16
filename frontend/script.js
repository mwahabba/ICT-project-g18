// -------------------------
// NAVIGATION (sidebar + internal open)
// -------------------------
function navTo(e){
  const btn = e.currentTarget || e.target;
  document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');

  const t = btn.getAttribute('data-target');
  showSection(t);
  window.scrollTo({top:0,behavior:'smooth'});
}

function openPage(target){
  // support both 'regulation' and 'regNavPage' earlier calls
  showSection(target);
  // mark sidebar
  document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
  const btn = document.querySelector(`.menu button[data-target="${target}"]`);
  if(btn) btn.classList.add('active');
}

function showSection(id){
  // hide all main sections
  const sections = ['home','regulation','dispute','projects'];
  sections.forEach(s => {
    const el = document.getElementById(s);
    if(el) el.style.display = (s === id ? 'block' : 'none');
  });
  // if id not in sections (e.g. 'regulation' exists), fallback to show regulation
  if(!sections.includes(id)){
    // nothing
  }
}

// -------------------------
// AUTH
// -------------------------
function doLogin(){
  const em = document.getElementById('email').value;
  const pw = document.getElementById('password').value;
  if(!em || !pw){ alert('Please enter email and password'); return; }
  // store basic flag (replace with real auth in production)
  localStorage.setItem('rra_logged_in','1');
  closeAuth();
}

function doSignup(){
  const name = document.getElementById('su_name').value;
  const em = document.getElementById('su_email').value;
  const pw = document.getElementById('su_password').value;
  if(!name || !em || !pw){ alert('Please complete all fields'); return; }
  // simple create: store email locally (demo only)
  localStorage.setItem('rra_logged_in','1');
  closeAuth();
}

function social(provider){
  alert('Social sign-in: ' + provider + ' (placeholder)');
}

function showSignup(){
  document.getElementById('signInView').style.display = 'none';
  document.getElementById('signupView').style.display = 'block';
}

function showSignin(){
  document.getElementById('signupView').style.display = 'none';
  document.getElementById('signInView').style.display = 'block';
}

function closeAuth(){
  document.getElementById('auth').style.display = 'none';
  document.getElementById('app').style.display = 'grid';
  // show default section (home)
  showSection('home');
  // ensure sidebar active
  document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
  document.querySelector('.menu button[data-target="home"]').classList.add('active');
}

function logout(){
  localStorage.removeItem('rra_logged_in');
  // show auth modal again
  document.getElementById('auth').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

// -------------------------
// PARTS NAVIGATION
// -------------------------
// === UPDATE THIS FUNCTION ===
// Replace your old openPart() function with this one
function openPart(p){
  switch(p){
    case 'B':
      window.location.href = 'part-b.html';
      break;
    case 'F':
      window.location.href = 'part-f.html';
      break;
    case 'L':
      window.location.href = 'part-l.html';
      break;
    case 'O':
      window.location.href = 'part-o.html';
      break;
    default:
      alert('Open Part ' + p);
  }
}

// -------------------------
// CLAUSE ACTION (prototype)
// -------------------------
function openClause(){
  alert('Opening selected clause (prototype)');
}

// -------------------------
// STARTUP: SHOW AUTH IF NOT LOGGED IN
// -------------------------
window.addEventListener('load', () => {
  const logged = localStorage.getItem('rra_logged_in');
  if(logged){
    // user already logged in — hide auth and show app
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'grid';
    showSection('home');
  } else {
    // show auth modal
    document.getElementById('auth').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  }
});

// -------------------------
// Dispute Navigator Q&A + Tabs
// -------------------------
function selectAnswer(btn) {
  const box = btn.closest('.qa-box');

  // visual selection
  box.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // mark answered ONCE
  if (!box.classList.contains('answered')) {
    box.classList.add('answered');
    updateProgress();
  }

  // store answer
  box.dataset.answer = btn.innerText.trim();
}



function toggleHelp(btn) {
  const box = btn.closest('.qa-box');
  const help = box.querySelector('.qa-help');

  // Close all other help boxes
  document.querySelectorAll('.qa-help').forEach(h => {
    if (h !== help) h.style.display = 'none';
  });

  // Toggle this one
  help.style.display = help.style.display === 'block' ? 'none' : 'block';

  updateProgress();
}



function switchTab(tab){
  // Tabs
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
  document.getElementById(tab + '-btn').classList.add('active');
  // Sections
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
}

// Guideance Sections Navigation
function switchGuidance(section) {
  // Hide all sections
  document.querySelectorAll('.guidance-section').forEach(s => {
    s.classList.remove('active');
  });

  // Remove active state from buttons
  document.querySelectorAll('.tabs button').forEach(b => {
    b.classList.remove('active');
  });

  // Show selected section
  document.getElementById(section).classList.add('active');

  // Highlight correct button
  document.getElementById(section + '-btn').classList.add('active');
}

// finished guidance sections navigation

// progress bar update
function updateProgress() {
  const boxes = document.querySelectorAll('.qa-box');
  const answered = document.querySelectorAll('.qa-box.answered').length;
  const line = document.querySelector('.line-fill');

  const percent = (answered / boxes.length) * 100;
  line.style.width = percent + '%';
}

// finished progress bar update

// project filtering
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("projectSearch");
  const ownerFilter = document.getElementById("ownerFilter");
  const rows = document.querySelectorAll("tbody tr");

  function filterProjects() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedOwner = ownerFilter.value;

    rows.forEach(row => {
      const rowText = row.innerText.toLowerCase();
      const rowOwner = row.dataset.owner;

      const matchesSearch = rowText.includes(searchValue);
      const matchesOwner =
        selectedOwner === "all" || rowOwner === selectedOwner;

      row.style.display =
        matchesSearch && matchesOwner ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterProjects);
  ownerFilter.addEventListener("change", filterProjects);
});
// finished project filtering

// searching as you type in regulation

document.getElementById("projectSearch").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();

    if (rowText.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// finished searching as you type in regulation