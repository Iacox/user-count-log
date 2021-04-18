<template>
  <div class="input-field">
    <input
      @keyup="typingLog"
      @blur="countStart"
      @keyup.enter="$refs.input.blur"
      v-model.lazy="text"
      ref="input"
      id="text"
      type="text"
    >
    <label for="text">Type here</label>
  </div>
</template>

<script>
export default {
  name: 'StartPage',
  data() {
    return {
      text: '',
      timeStamp: 0,
      arrMarkTime: [],
      requestLog: [],
      requestInterval: null,
      timeStampMouse: 0,
      mouseLog: [],
    }
  },
  mounted() {
    this.countStart()
    this.timeStampMouse = +new Date
    document.addEventListener('mousemove', this.writeMouseLog)
    document.addEventListener('mousedown', this.writeMouseClickLog)
    document.addEventListener('mouseup', this.writeMouseClickLog)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.writeMouseLog)
    document.removeEventListener('mousedown', this.writeMouseClickLog)
    document.removeEventListener('mouseup', this.writeMouseClickLog)
  },
  methods: {
    writeMouseLog(e) {
      const timeStamp = `${new Date(new Date - this.timeStampMouse).getSeconds()}:${new Date(new Date - this.timeStampMouse).getMilliseconds()}`
      let button = ''
      switch (e.buttons) {
        case 0:
          button = 'NoButton'
          break
        case 1:
          button = 'LeftButton'
          break
        case 2:
          button = 'RightButton'
          break
        case 4:
          button = 'MiddleButton'
          break
        case 8:
          button = 'BackButton'
          break
        case 16:
          button = 'ForwardButton'
          break
      }
      const state = e.buttons ? 'drag' : 'move'
      const log = [timeStamp, button, state, e.x, e.y]
      this.mouseLog.push(log)
    },
    writeMouseClickLog(e) {
      const timeStamp = `${new Date(new Date - this.timeStampMouse).getSeconds()}:${new Date(new Date - this.timeStampMouse).getMilliseconds()}`
      let button = ''
      switch (e.buttons) {
        case 0:
          button = 'NoButton'
          break
        case 1:
          button = 'LeftButton'
          break
        case 2:
          button = 'RightButton'
          break
        case 4:
          button = 'MiddleButton'
          break
        case 8:
          button = 'BackButton'
          break
        case 16:
          button = 'ForwardButton'
          break
      }
      const state = e.type === 'mousedown' ? 'Pressed' : 'Released'
      const log = [timeStamp, button, state, e.x, e.y]
      this.mouseLog.push(log)
    },

    countStart() {
      if (this.arrMarkTime.length)
        this.sendRequest()

      if (this.requestInterval)
        clearInterval(this.requestInterval)

      this.$refs.input.addEventListener('keydown', () => {
        this.timeStamp = +new Date
        this.requestInterval = setInterval(this.sendRequest, 60000)
      }, {once: true})
    },
    typingLog() {
      const countedTime = `${new Date(new Date - this.timeStamp).getSeconds()}:${new Date(new Date - this.timeStamp).getMilliseconds()}`
      this.arrMarkTime.push(countedTime)
    },
    async sendRequest() {
      const payload = JSON.stringify({
        typeLog: this.arrMarkTime,
        mouseLog: this.mouseLog,
      })

      this.timeStamp = +new Date
      this.timeStampMouse = +new Date

      if (!this.arrMarkTime.length)
        return

      this.arrMarkTime = []
      this.mouseLog = []

      const request = await fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload,
      })
      this.requestLog.push(request)
    },
  },
}
</script>

<style lang="scss" scoped>
  .input-field {
    margin-top: 12rem;
    width: 100%;
  }
</style>