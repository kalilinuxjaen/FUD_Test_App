import { db, ref, get, child, set, update } from './firebase-config.js';

document.getElementById('loginBtn')?.addEventListener('click', async ()=>{
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const msg = document.getElementById('msg');

  if (email === 'jarry@fud.local' && pass === 'Khadeejace1@') {
    msg.innerText = '✅ Admin login successful!';
    setTimeout(()=> window.location.href = 'dashboard.html', 1500);
    return;
  }

  const reg = email.toLowerCase().split('@')[0];
  const snap = await get(child(ref(db), 'students/' + reg));
  if(snap.exists()){
    const data = snap.val();
    if(data.blocked){
      msg.innerText = '❌ Access denied! You are blocked. Submit a complaint.';
    } else if (data.password === pass){
      msg.innerText = '✅ Login successful!';
      localStorage.setItem('studentReg', reg);
      setTimeout(()=> window.location.href = 'test.html', 1500);
    } else {
      msg.innerText = '⚠️ Incorrect password!';
    }
  } else {
    msg.innerText = '❌ Student not found.';
  }
});

export function blockStudent(reg){
  update(ref(db, 'students/' + reg), { blocked: true });
}

export function unblockStudent(reg){
  update(ref(db, 'students/' + reg), { blocked: false });
}
