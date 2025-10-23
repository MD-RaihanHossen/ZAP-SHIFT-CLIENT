import "leaflet/dist/leaflet.css";


import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useLoaderData } from "react-router-dom";




// Custom pulsing marker
const pulsingIcon = new L.DivIcon({
    html: `<span class="relative flex h-6 w-6">
           <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
           <span class="relative inline-flex rounded-full h-6 w-6 bg-green-500"></span>
         </span>`,
    className: "",
});

function FlyToLocation({ location }) {
    const map = useMap();
    if (location) {
        map.flyTo([location.latitude, location.longitude], 12, { duration: 4 });
    }
    return null;
}

export default function Coverage() {

    //the data come from loader 
    const districts = useLoaderData()

    const [search, setSearch] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const mapRef = useRef();
    console.log(mapRef)

    const handleSearch = () => {
        const result = districts.find(
            (item) => item.district.toLowerCase() === search.toLowerCase()
        );
        if (result) {
            setSelectedDistrict(result);
        } else {
            setSelectedDistrict(null);
            alert("District not found!");
        }
    };

    return (
        <div className="w-full px-4 py-10 text-center bg-white rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                We are available in 64 districts
            </h2>

            <div className="flex justify-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search district..."
                    className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-green-400 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded-lg"
                >
                    Search
                </button>
            </div>

            <p className="text-lg font-semibold text-gray-700 mb-2">
                We deliver almost all over Bangladesh
            </p>

            <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md">
                <MapContainer
                    center={[23.685, 90.3563]} // Bangladesh center
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {districts.map((d, i) => (
                        <Marker
                            key={i}
                            position={[d.latitude, d.longitude]}
                            icon={
                                selectedDistrict?.district === d.district
                                    ? pulsingIcon
                                    : new L.Icon({
                                        iconUrl:
                                            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                    })
                            }
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-semibold text-lg">{d.district}</h3>
                                    <p>Region: {d.region}</p>
                                    <p>City: {d.city}</p>
                                    <p>Areas: {d.covered_area.join(", ")}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {selectedDistrict && <FlyToLocation location={selectedDistrict} />}
                </MapContainer>
            </div>
        </div>
    );
}
