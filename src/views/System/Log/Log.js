import Base from '@/base/base'

export default class extends Base {
  initSocket () {
    const wsUrl = 'ws://127.0.0.2:2346/'
    const ws = new WebSocket(wsUrl)
    window.console.log('Socket连接成功', ws)
    ws.onopen = function () {
      ws.send('123')
    }
  }
}