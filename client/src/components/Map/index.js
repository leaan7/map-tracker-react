import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'


import './style.css'

/* const fakeDatas = [
    {
        title: 'Rio de Janeiro',
        description: 'A Beautiful place',
        lat: -22,
        lng: -40
    }, {
        title: 'Rio grande do Sul',
        description: 'A awesome place',
        lat: -22,
        lng: -44
    }, {
        title: 'São Paulo',
        description: 'A Nice place',
        lat: -22,
        lng: -46
    },
] */

function Map() {
    const [viewport, setViewport] = useState({
        width: 900,
        height: 550,
        latitude: -22.9495094,
        longitude: -43.5348744,
        zoom: 8
    });

    // Get Pins
    const [currentPins, setPins] = useState([])

    useEffect(() => {
        async function getPins() {
            try {
                const pins = await axios.get('http://localhost:8080/api/pins')
                setPins(pins.data)
            } catch (err) {
                console.log(`Error Axios-Fetch pins : ${err.message}`);
            }
        }
        getPins()
    }, [])

    const [currentPopup, setCurrentPopup] = useState()

    return <div className="map-container">
        <ReactMapGL
            mapStyle="mapbox://styles/leaan/ckucu8ki53in217pvnaac9y70"

            mapboxApiAccessToken="PUT YOUR Api Acess Token here"

            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >

            {currentPins.map((pin, index) =>
                <Marker key={index} style={{ cursor: "pointer" }} latitude={pin.lat} longitude={pin.lng}>
                    <FaMapMarkerAlt onClick={() => setCurrentPopup({ ...pin })} style={{ color: 'red' }} />
                </Marker>)},

            {currentPopup && <Popup
                offsetLeft={8}
                offsetTop={18}
                style={{ cursor: 'pointer' }}
                latitude={currentPopup.lat}
                longitude={currentPopup.lng}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPopup(null)}
                anchor="top"

            >
                <div className="popup">
                    <h2>{currentPopup.title}</h2>
                    <p>{currentPopup.description}</p>
                </div>
            </Popup>}

        </ReactMapGL>
    </div>;
}

export default Map;