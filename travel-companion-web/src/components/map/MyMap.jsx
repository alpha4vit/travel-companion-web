import React, { useRef, useState } from 'react';
import { Map, RouteButton, YMaps, ZoomControl } from "@pbe/react-yandex-maps";

const mapState = { center: [53.489453, 29.341762], zoom: 7 };

const MyMap = () => {
    const [ymaps, setYmaps] = useState(null);
    const routes = useRef(null);

    const getRoute = ref => {
        if (ymaps) {
            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: [[53.489453, 29.341762], [53.902735, 27.555696]],
                    params: {
                        results: 2
                    }
                },
                {
                    boundsAutoApply: true,
                    routeActiveStrokeWidth: 6,
                    routeActiveStrokeColor: "#fa6600"
                }
            );

            routes.current = multiRoute;
            ref.geoObjects.add(multiRoute);

            // Устанавливаем targetPoint для RouteButton
            const routePanel = new ymaps.control.RoutePanel({
                options: {
                    size: 'small',
                    maxWidth: [30, 400, 600],
                    float: 'right',
                    routePanelMaxMapArea: 600,
                    preventDragUpdate: false,
                }
            });

            routePanel.routePanel.options.set('types', { masstransit: true, pedestrian: true });

            routePanel.routePanel.state.set({
                type: 'masstransit',
                fromEnabled: true,
                from: [53.489453, 29.341762],
                to: [53.902735, 27.555696],
                toEnabled: true,
            });


            ref.controls.add(routePanel);
        }
    };

    return (
        <div style={{ marginTop: '100px' }} className="App">
            <YMaps query={{ apikey: 'd2233e5f-264a-47d7-9fb4-7882b1a56c6c', suggest_apikey: '2f7a2e8c-1916-4656-ba2f-d79a198a1ad2' }}>
                <Map
                    modules={["multiRouter.MultiRoute", "control.RouteButton", "control.RoutePanel"]}
                    onLoad={ymaps => setYmaps(ymaps)}
                    state={mapState}
                    instanceRef={ref => ref && getRoute(ref)}
                    width='1000px'
                    height='500px'
                >
                    <ZoomControl />
                </Map>
            </YMaps>
        </div>
    );
};

export default MyMap;
