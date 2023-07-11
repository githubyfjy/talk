let txtLoginId = new Verify('txtLoginId', async function (val) {
  if (val === '') {
    return '账号不能为空'
  } else if (val.length < 3) {
    return '账号长度不能小于3'
  } else {
    let exis = await exists(val)
    if (exis.data) return '账号已存在'
    return ''
  }
})
let txtNickname = new Verify('txtNickname', function (val) {
  if (val === '') {
    return '昵称不能为空'
  } else {
    return ''
  }
})

let txtLoginPwd = new Verify('txtLoginPwd', function (val) {
  if (val === '') {
    return '密码不能为空'
  } else {
    return ''
  }
})
let txtLoginPwdConfirm = new Verify('txtLoginPwdConfirm', function (val) {
  if (val === '') {
    return '不能为空'
  } else if (val !== txtLoginPwd.dom.value && txtLoginPwd.dom.value !== '') {
    return '密码不一样'
  } else {
    return ''
  }
})

let userForm = document.querySelector('.user-form')

userForm.onsubmit = async function (e) {
  e.preventDefault()
  let arr = await Verify.lose(
    txtLoginId,
    txtNickname,
    txtLoginPwd,
    txtLoginPwdConfirm
  )
  let flag = arr.every((item) => item)
  if (flag) {
    let formData = new FormData(userForm)
    let newAll = Object.fromEntries(formData.entries())
    let c = await reg(newAll)
    if (c.code === 0) {
      alert('注册成功，点击确认将跳转到登录页面')
      location.href = './login.html'
    } else {
      console.log(c)
      return ''
    }
  } else {
  }
}
