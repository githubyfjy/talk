class Verify {
  constructor(txtId, callback) {
    this.dom = document.querySelector('#' + txtId)
    this.callback = callback
    this.p = this.dom.nextElementSibling
    this.callback = callback
    this.dom.onblur = () => {
      this.lose()
    }
  }

  async lose() {
    let a = await this.callback(this.dom.value)
    if (a) {
      this.p.innerHTML = a
      return false
    } else {
      this.p.innerHTML = ''
      return true
    }
  }
  static async lose(...args) {
    let abc = args.map((item) => item.lose())
    return await Promise.all(abc)
  }
}
