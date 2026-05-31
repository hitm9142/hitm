'use client';

import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const pithoriaPosition = [23.49223, 85.31016];

export default function ContactLeafletMap() {
  const L = require('leaflet');
  const campusMarker = L.divIcon({
    className: 'hitm-map-marker',
    html: '<div class="hitm-map-marker__pin"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  });

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={pithoriaPosition}
        zoom={9.5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pithoriaPosition} icon={campusMarker}>
          <Popup>
            <div className="text-sm">
              <strong>Haider Institute of Technology and Management</strong>
              <br />
              Pithoria, Ranchi, Jharkhand, India
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
