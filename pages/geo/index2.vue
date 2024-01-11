<script setup lang="ts">
import { ref } from 'vue'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import type { Position, Marker } from '~~/types/geo'

const gmap = ref<HTMLElement>()

const mapOptions = {
  center: {
    lat: 35.845638,
    lng: 139.6364721,
  },
  zoom: 15,
}
const locations = ref<Marker[]>([
  {
    position: { lat: 35.2455907, lng: 138.636359 },
    label: 'H',
    title: 'Home',
  },
  {
    position: { lat: 35.845638, lng: 139.6364721 },
    label: 'W',
    title: 'Work',
  },
])

const { loader, clearAllMarkerAnimation, enableClikedMarkerAnimation } =
  useGoogleMap()

onMounted(async () => {
  await loader.value.load()
  initMap()
})
const initMap = () => {
  const map = new google.maps.Map(gmap.value as HTMLElement, mapOptions)
  let markers: Array<google.maps.Marker> = []
  const markerCluster: any = ref(null)

  map.addListener('click', (coords: any) => {
    console.log(JSON.stringify(typeof coords))
    console.log('latLng: ', coords.latLng.lat(), coords.latLng.lng())
    // clearAllMarkerAnimation(markers)
    const marker = new google.maps.Marker({
      position: { lat: coords.latLng.lat(), lng: coords.latLng.lng() },
      map,
      title: 'd.title',
      label: ' d.label',
      icon: {
        url: '/images/user_marker.png',
        scaledSize: new google.maps.Size(32, 32),
      },
    })
    enableClikedMarkerAnimation(markers, marker)
    markers.push(marker as google.maps.Marker)
    markerCluster.value = new MarkerClusterer({ map, markers })
  })

  const infoWindow = new google.maps.InfoWindow()
  markers = locations.value.map((d) => {
    console.log(d)
    const marker = new google.maps.Marker({
      position: d.position,
      map,
      title: d.title,
      label: d.label,
    })

    marker.addListener('click', (e: google.maps.MapMouseEvent) => {
      console.log(e)
      infoWindow.close()
      infoWindow.setContent(`
                        ${d.title.slice(0, 20)}
                        ${d.title.slice(62, 80)}
                    `)
      infoWindow.open(marker.getMap(), marker)
    })
    return marker
  })
  markerCluster.value = new MarkerClusterer({ map, markers })
}
</script>

<template>
  <div>
    <h1>マップ</h1>
    <div ref="gmap" class="h-[500px] w-[800px]"></div>
  </div>
</template>
