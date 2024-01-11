import { onUnmounted, onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

import type { Position } from '~~/types/geo'
export const useGoogleMap = () => {
  const config = useRuntimeConfig()
  const markerMaxZIndexCount = 10000
  const loader: any = ref(null)
  onMounted(() => {
    loader.value = new Loader({
      apiKey: config.public.GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    })
  })

  const clearAllMarkerAnimation = (
    GMapMarkers: Array<google.maps.Marker>,
  ): void => {
    GMapMarkers.forEach((eachMarker) => {
      eachMarker.setAnimation(null)
    })
  }

  const enableClikedMarkerAnimation = (
    GMapMarkers: Array<google.maps.Marker>,
    marker: google.maps.Marker,
  ): void => {
    clearAllMarkerAnimation(GMapMarkers)

    // add marker animation to only the latest cliked marker
    marker.setAnimation(google.maps.Animation.BOUNCE)
    marker.setZIndex(markerMaxZIndexCount + 1)
  }

  return { loader, clearAllMarkerAnimation, enableClikedMarkerAnimation }
}
