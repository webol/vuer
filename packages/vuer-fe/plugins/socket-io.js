import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

const host = 'http://localhost:8090'
const socket = io(host, {
  reconnection: false,
})

export default ({ store }) => {
  const app = createApp(App)
app.use(VueSocketIO, socket, { store })
}
