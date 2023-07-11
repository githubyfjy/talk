const BASE_URL = 'https://study.duyiedu.com'
// Bearer
/**
 *
 * @param {Object} userInfo 创建账号的信息 loginId ，loginPwd ，nickname
 * @returns 返回响应体
 */
async function reg(userInfo) {
  return await fetch(BASE_URL + '/api/user/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then((resp) => resp.json())
} // 注册账号

/**
 *
 * @param {Object} loginInfo loginId账号id ，loginPwd账号密码
 *  return 返回响应体
 */
async function login(loginInfo) {
  let resp = await fetch('https://study.duyiedu.com/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  })
  let body = await resp.json()
  if (body.code === 0) {
    let token = resp.headers.get('authorization')
    localStorage.setItem('token', token)
    return body
  } else {
    return body
  }
} // 登录

async function exists(loginId) {
  return await fetch(
    'https://study.duyiedu.com/api/user/exists?loginId=' + loginId
  ).then((resp) => resp.json())
} // 查看账号是否存在

// BASE_URL + '/api/user/profile'
async function profile() {
  let token = localStorage.getItem('token')
  let headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return await fetch(BASE_URL + '/api/user/profile', {
    headers
  }).then((resp) => resp.json())
}

async function sendChat(content) {
  let headers = {
    'Content-Type': 'application/json'
  }
  let token = localStorage.getItem('token')
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  let resp = await fetch(BASE_URL + '/api/chat', {
    method: 'post',
    headers,
    body: JSON.stringify({
      content: content
    })
  }).then((resp) => resp.json())
  return resp
} // 发送聊天消息

//  '/api/chat/history'
async function getHistory() {
  let headers = {
    'Content-Type': 'application/json'
  }
  let token = localStorage.getItem('token')
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return await fetch(BASE_URL + '/api/chat/history', {
    headers
  }).then((resp) => resp.json())
} // 获取历史记录
function logout() {
  localStorage.removeItem('token')
}
