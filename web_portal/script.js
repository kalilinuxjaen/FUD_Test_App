document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const msg = document.getElementById('msg');

  if (email === 'jarry@fud.local' && pass === 'Khadeejace1@') {
    msg.innerText = '✅ Admin login successful!';
    setTimeout(() => window.location.href = 'dashboard.html', 2000);
  } else {
    // student login
    const reg = prompt('Enter your Reg Number (e.g. fcp/cit/23/1150):');
    sessionStorage.setItem('regNumber', reg);
    msg.innerText = '✅ Student login successful!';
    setTimeout(() => window.location.href = 'test.html', 2000);
  }
});
