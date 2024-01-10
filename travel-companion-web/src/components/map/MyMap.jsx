import React, {useState} from 'react';
import {FullscreenControl, Map, RouteButton, RouteEditor, YMaps, ZoomControl} from "@pbe/react-yandex-maps";


const MyMap = () => {


    return (
        <div style={{marginTop:'100px'}}>
            <YMaps id='map' query={{ apikey: 'd2233e5f-264a-47d7-9fb4-7882b1a56c6c',
                suggest_apikey: '2f7a2e8c-1916-4656-ba2f-d79a198a1ad2'}}>
                <Map
                    defaultState={{
                        center: [53.902284, 27.561831],
                        zoom: 9,
                        controls: [],
                    }}
                    width='1000px'
                    height='500px'
                >
                    <RouteButton instanceRef={(map) => {
                        console.log(map)
                    }
                    } options={{ float: "right" }} />
                    <RouteEditor />
                    <ZoomControl options={{ float: "right" }} />
                </Map>
            </YMaps>;
        </div>

    );
};

export default MyMap;