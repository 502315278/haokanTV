function showPasswordModal() {
  const passwordModal = document.getElementById('passwordModal');
  if (passwordModal) {
    document.getElementById('doubanArea').classList.add('hidden');
    // document.getElementById('passwordCancelBtn').classList.add('hidden');
    const title = passwordModal.querySelector('h2');
    const description = passwordModal.querySelector('p');
    if (title) title.textContent = '访问验证';
    if (description) description.textContent = '您的设备ID如下，请联系管理员授权绑定';

    // const form = passwordModal.querySelector('form');
    // if (form) form.style.display = 'block';

    passwordModal.style.display = 'flex';
  }

}

async function checkBind() {

  const res = await fetch('/api/checkBind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      deviceId: getDeviceId()
    })


  })


  showPasswordModal();


}

function getDeviceId() {
  const deviceId = localStorage.getItem('deviceId');
  if (deviceId) {
    return deviceId;
  }

  FingerprintJS.load()
    .then(fp => fp.get())
    .then(result => {
      localStorage.setItem('deviceId', result.visitorId || '');
      return result.visitorId;
    })
    .catch(error => {
      console.log('获取设备ID失败:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // getDeviceId();
  // checkBind();

  // setInterval(function () {
  //   const before = new Date().getTime();
  //   debugger;
  //   const after = new Date().getTime();

  //   if (after - before > 100) {
  //     // 开发者工具已打开，进入无限调试循环
  //     while (true) {
  //       debugger;
  //     }
  //   }
  // }, 1000);
});