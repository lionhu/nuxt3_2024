import { onUnmounted, onMounted, ref } from 'vue'
import type { Position, Marker as geoMarker } from '@/types/geo'

export function useGooglelocation() {
  const coords = ref({ latitude: 0, longitude: 0 })
  const isSupported = ref(false)
  let watcher: any = null
  onMounted(() => {
    isSupported.value = 'navigator' in window && 'geolocation' in navigator
    if (isSupported.value)
      watcher = navigator.geolocation.watchPosition(
        (position) => (coords.value = position.coords),
      )
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  const haversineDistance = (pos1: Position, pos2: Position): number => {
    const R = 3958.8 // Radius of the Earth in miles
    const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
    const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
    const difflat = rlat2 - rlat1 // Radian difference (latitudes)
    const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)
    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      )
    return d
  }

  return { coords, isSupported, haversineDistance }
}
