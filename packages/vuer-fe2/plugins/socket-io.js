import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

const host = 'http://localhost:8090'
const socket = io(host, {
  reconnection: false,
})

export default ({ store }) => {
  Vue.use(VueSocketIO, socket, { store })
}
