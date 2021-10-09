import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'

import './style.css'

function Form() {
    // Map
    const [viewport, setViewport] = useState({
        width: 400,
        height: 250,
        latitude: -22.9495094,
        longitude: -43.5348744,
        zoom: 8
    });

    const [data, setData] = useState({
        title: "",
        description: "",
        lat: 0,
        lng: 0
    })

    // Getting pin location
    const [currentPin, setCurrentPin] = useState({ lat: 0, lng: 0 })
    function handlePin(ev) {
        const [lng, lat] = ev.lngLat
        setCurrentPin({ lat, lng })
    }

    // Getting input values
    function handleInput(ev) {
        const inputsData = { ...data }
        inputsData[ev.target.name] = ev.target.value
        setData(inputsData)
    }


    async function onSub(ev) {
        ev.preventDefault()

        // Setting pin in map
        data.lat = currentPin.lat
        data.lng = currentPin.lng

        // Post with Axios
        try {
            await axios.post('http://localhost:8080/api/pins', data)
        } catch (err) {
            console.log(`Post failed : ${err}`);
        }

        // Clear datas
        setData({
            title: "",
            description: "",
        })
        setCurrentPin({ lat: 0, lng: 0 })

    }
    return <form onSubmit={onSub} className="form-container">
        <h1>New Pin</h1>
        <input onChange={ev => handleInput(ev)} autocomplete="off" required placeholder="Title" value={data.title} type="text" name="title" />
        <input onChange={ev => handleInput(ev)} autocomplete="off" required placeholder="Description" value={data.description} type="text" name="description" />

        <ReactMapGL
            onClick={ev => handlePin(ev)}
            mapStyle="mapbox://styles/leaan/ckucu8ki53in217pvnaac9y70"
            mapboxApiAccessToken="pk.eyJ1IjoibGVhYW4iLCJhIjoiY2t1YWFvYm5vMGV4YTJvbzM5Y3RpY2tqaCJ9.wv6_6-vmwQPuEeCSb7GEsw"
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >

            {currentPin.lat !== 0 ? <Marker latitude={currentPin.lat} longitude={currentPin.lng} offsetLeft={-10} offsetTop={-10} ><FaMapMarkerAlt style={{ color: 'red' }} /></Marker> : ''}

        </ReactMapGL>
        <button>Submit</button>
    </form>;
}

export default Form;