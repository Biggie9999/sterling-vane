"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default Leaflet icon missing in Next.js builds
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export default function MapComponent({ properties }: { properties: any[] }) {
  const center = properties.length > 0 ? [properties[0].lat, properties[0].lng] : [34.05, -118.24]
  
  return (
    <MapContainer center={center as any} zoom={3} scrollWheelZoom={true} className="w-full h-[800px] z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {properties.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
          <Popup>
            <div className="font-sans flex flex-col gap-1 w-40">
              <img src={p.image} alt={p.title} className="w-full h-24 object-cover rounded-md mb-1" />
              <p className="font-bold text-sm leading-tight text-slate-800">{p.title}</p>
              <p className="text-brand-accent font-semibold">${p.price} <span className="text-slate-500 font-normal">night</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
