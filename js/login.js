let txtLoginId = new Verify('txtLoginId', function (val) {
  if (val === '') {
    return '账号不能为空'
  }
})
let txtLoginPwd = new Verify('txtLoginPwd', function (val) {
  if (val === '') {
    return '密码不能为空'
  }
})
let userForm = document.querySelector('form.user-form')
userForm.onsubmit = async function (e) {
  e.preventDefault()
  let formdata = new FormData(userForm)
  let arr = Object.fromEntries(formdata.entries())
  let c = await login(arr)
  if (c.code === 0) {
    location.href = './index.html'
  } else {
    txtLoginPwd.p.innerHTML = c.msg
    txtLoginPwd.dom.value = ''
  }
}
