

class DrawingApp {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.painting = false
    this.ctx = this.canvas.getContext('2d')
    this.ctx.strokeStyle = 'white'

    this.#init()
    this.#initEvents()
  }

  #init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  #initEvents() {
    // Metody na myszkę
    this.canvas.addEventListener('mousedown', () => this.#startPosition())
    this.canvas.addEventListener('mouseup', () => this.#endPosition())
    this.canvas.addEventListener('mousemove', e => this.#draw(e))

    // Metody na urządzenia mobilne
    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault()
      this.#startPosition()
    })
    this.canvas.addEventListener('touchend', () => this.#endPosition())
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault()
      this.#draw(e.touches[0])
    })
  }

  #startPosition() {
    this.painting = true
    this.#draw()
  }

  #endPosition() {
    this.painting = false
    this.ctx.beginPath() // Rozpocznij nowy rysunek po zakończeniu linii
  }

  #draw(e) {
    if (!this.painting) return

    this.ctx.lineWidth = 5
    this.ctx.lineCap = 'round'

    // Pozycja myszki lub palca
    const x = e.clientX || e.touches[0].clientX
    const y = e.clientY || e.touches[0].clientY

    if (x != undefined && y != undefined) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
    }
  }
  changeColor(color) {
    this.ctx.strokeStyle = color
    console.log(color)
  }
}

const app = new DrawingApp()
