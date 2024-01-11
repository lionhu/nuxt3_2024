<script lang="ts" setup>
import {
  GoogleMap,
  CustomControl,
  Marker,
  InfoWindow,
  CustomMarker,
  MarkerCluster,
} from 'vue3-google-map'

import type { Position, Marker as geoMarker } from '@/models/geo'

const config = useRuntimeConfig()
const locations = ref<Position[]>([
  { lat: 35.2455907, lng: 138.636359 },
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
])
// const myMap: Ref<HTMLElement | null> = ref(null)

const lat = useState('lat', () => 0)
const lng = useState('lng', () => 0)
const center = computed(() => ({ lat: lat.value, lng: lng.value }))

const { coords, isSupported } = useGooglelocation()
lat.value = coords.value.latitude
lng.value = coords.value.longitude

const markers = computed(() => {
  const _markers: geoMarker[] = [
    {
      position: center.value,
      label: 'You',
      title: 'This is where you are',
    },
  ]
  // places.value.forEach((p, index) => {
  //   markers.push({
  //     position: {
  //       lat: p.lat,
  //       lng: p.lon,
  //     },
  //     label: (index + 1).toString(),
  //     title: p.name,
  //   })
  // })
  console.log(_markers)
  return _markers
})
const locatorButtonPressed = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat.value = position.coords.latitude
      lng.value = position.coords.longitude
      locations.value.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    },
    (error) => {
      console.log('Error getting location.')
      console.log(error)
    },
  )
}
const sayHi = () => alert('Hi!')

const markerClick = (ev: unknown, marker: unknown) => {
  console.log('markerClick: ', ev, marker)
}
</script>

<template>
  <div class="ui grid">
    <div class="six wide column text-gray-600 dark:text-white">
      <br />
      <div class="one">
        <h1>
          Find the <br />
          BEST ACTIVITIES <br />near you!
        </h1>
        <p>{{ lat }},{{ lng }}</p>
        <button @click="locatorButtonPressed">Find Me</button>
      </div>

      <!-- <userForm /> -->
    </div>
    <div class="ten wide column segment ui">
      <GoogleMap
        id="googlemap"
        :api-key="config.public.GOOGLE_API_KEY"
        style="width: 100%; height: 580px"
        :center="center"
        :zoom="10"
        language="ja"
      >
        <MarkerCluster>
          <Marker
            v-for="(location, i) in locations"
            :key="i"
            :options="{ position: location }"
            @click="markerClick($event, location)"
          >
            <InfoWindow>
              <div id="contet">
                <div id="siteNotice"></div>
                <h1 id="firstHeading" class="firstHeading">Uluru</h1>
                <div
                  id="bodyContent"
                  class="flex items-center justify-center space-x-1"
                >
                  <img
                    class="flex-0 w-32 mr-2"
                    src="https://vuejs.org/images/logo.png"
                    style="margin-top: 8px"
                  />
                  <div>
                    <b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a
                    large sandstone rock formation in the southern part of the
                    Northern Territory, central Australia. It lies 335&#160;km
                    (208&#160;mi) south west of the nearest large town, Alice
                    Springs; 450&#160;km (280&#160;mi) by road. Kata Tjuta and
                    Uluru are the two major features of the Uluru - Kata Tjuta
                    National Park.
                  </div>
                  <div>
                    Attribution: Uluru,
                    <a
                      href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194"
                    >
                      https://en.wikipedia.org/w/index.php?title=Uluru</a
                    >
                    (last visited June 22, 2009).
                  </div>
                </div>
              </div>
            </InfoWindow>
          </Marker>
        </MarkerCluster>

        <CustomControl position="TOP_CENTER">
          <button class="custom-btn" @click="sayHi">HI</button>
        </CustomControl>

        <CustomMarker
          :options="{ position: center, anchorPoint: 'BOTTOM_CENTER' }"
        >
          <div style="text-align: center">
            <div style="font-size: 1.125rem">Vuejs {{ center }}</div>
            <img
              src="https://vuejs.org/images/logo.png"
              width="50"
              height="50"
              style="margin-top: 8px"
            />
          </div>
        </CustomMarker>
      </GoogleMap>
    </div>
  </div>
</template>

<style>
body {
  margin: 10px;
  padding: 0%;
}
#bodyContent {
  color: #080808;
}
h1 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 200;
  font-size: 32px;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}
h1 span {
  display: block;
  font-size: 0.5em;
  line-height: 1.3;
}
h1 em {
  font-style: normal;
  font-weight: 600;
}
.one h1 {
  text-align: center;
  padding-bottom: 5px;
}
.one h1:before {
  width: 28px;
  height: 5px;
  display: block;
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -14px;
  background-color: #b80000;
}
.one h1:after {
  width: 100px;
  height: 1px;
  display: block;
  content: '';
  position: relative;
  margin-top: 25px;
  left: 50%;
  margin-left: -50px;
  background-color: #b80000;
}
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style>
