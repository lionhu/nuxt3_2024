export interface Position {
  lat: number
  lng: number
}

export interface Marker {
  position: Position
  label: string
  title: string
}
