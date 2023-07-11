let msgContainer = document.querySelector('.msg-container')
let txtMsg = document.querySelector('#txtMsg')
let chatContainer = document.querySelector('.chat-container')
msgContainer.onsubmit = async function (e) {
  e.preventDefault()
  if (txtMsg.value === '') {
    return alert('不能发送空的消息')
  }
  let txt = txtMsg.value
  txtMsg.value = ''
  let html1 = `
  <div class="chat-item me">
  <img class="chat-avatar" src="./asset/avatar.png" />
  <div class="chat-content">${txt}</div>
  <div class="chat-date">${getTime()}</div>
</div>`
  chatContainer.innerHTML += html1
  let a = await sendChat(txt)

  if (a.code === 0) {
    let text = a.data
    let html2 = ` <div class="chat-item">
    <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">${text.content}</div>
    <div class="chat-date">${getTime(text.createdAt)}</div>
  </div>
    `
    chatContainer.innerHTML += html2
  }
}

function getTime(val = new Date()) {
  let time = new Date(val)
  let HH = time.getFullYear().toString().padStart(4, '0')
  let MM = (time.getMonth() + 1).toString().padStart(2, '0')
  let DD = time.getDate().toString().padStart(2, '0')

  let h = time.getHours().toString().padStart(2, '0')
  let m = time.getMinutes().toString().padStart(2, '0')
  let s = time.getSeconds().toString().padStart(2, '0')
  return `${HH}-${MM}-${DD} ${h}:${m}:${s}`
}
;(async () => {
  let a = await getHistory()
  let arr = a.data.slice(-10)
  console.log(arr)
  let html3 = ``
  arr.forEach((ele) => {
    html3 += ` <div class="chat-item ${ele.from !== null ? 'me' : ''}">
    <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">${ele.content}</div>
    <div class="chat-date">${getTime(ele.createdAt)}</div>
  </div>`
  })
  chatContainer.innerHTML += html3
})()
let close = document.querySelector('.close')
close.onclick = () => {
  logout()
  location.href = './login.html'
}
document.addEventListener('DOMContentLoaded', async function (e) {
  let a = await profile()
  if (a.code !== 0) {
    alert('未登录不能访问')
    this.location.href = './login.html'
  }
})
