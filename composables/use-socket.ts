/* eslint-disable no-console */
import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

export const useSocket = () => {
  const config = useRuntimeConfig()
  const JWT_TOKEN = useStrapiToken()
  const { UserID } = useAuth()

  const SERVER_URL = config.public.STRAPI_WEBSOCKET

  // const socket = io('https://strapi.nichiei.services')
  let socket = io(SERVER_URL)

  if (JWT_TOKEN.value) {
    socket = io(SERVER_URL, {
      auth: {
        token: JWT_TOKEN.value,
      },
    })
  }

  // const startSocket = () => {
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.on('disconnect', () => {
    console.log('disconnect')
  })
  socket.on('greeting', (data) => {
    // disconnect strapi socket when strapi jwt is invalid
    const { userId } = data
    if (UserID.value !== userId || userId === 0) {
      socket.disconnect()
    }
  })
  socket.onAny((event, ...args) => {
    console.log('onAny event : ', event, args[0])
  })
  return {
    socket,
  }
}
