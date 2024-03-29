import React, {memo, useRef, useState} from 'react';
import { Map, YMaps, ZoomControl, Button } from "@pbe/react-yandex-maps";

const mapState = { center: [53.489453, 29.341762], zoom: 7 };

const MyMap = ({ width, height, callback, route}) => {
    const [ymaps, setYmaps] = useState(null);
    const routePanelRef = useRef(null);

    const getRoute = ref => {
        if (ymaps) {
            const routePanel = new ymaps.control.RoutePanel({
                options: {
                    size: 'small',
                    maxWidth: [30, 400, 600],
                    float: 'right',
                    routePanelMaxMapArea: 600,
                    preventDragUpdate: false,
                }
            });

            routePanel.routePanel.options.set('types', { auto: true, pedestrian: true,  masstransit:true});
            if (route.departure) {
                routePanel.routePanel.state.set({
                    type: 'driving',
                    fromEnabled: true,
                    from: [route.departure.longitude, route.departure.latitude],
                    to: [route.destination.longitude, route.destination.latitude],
                    toEnabled: true,
                });
            }

            ref.controls.add(routePanel);
            routePanelRef.current = routePanel;
        }
    };

    const getCurrentRoute = () => {
        if (routePanelRef.current) {
            const routePanel = routePanelRef.current;
            const route = routePanel.routePanel.getRoute();
            const wayPoints = route.getWayPoints();
            const destination = getPointInfo(wayPoints.get(0));
            const departure = getPointInfo(wayPoints.get(wayPoints.getLength() - 1));
            return {departure: departure, destination: destination}
        }
    };

    const getPointInfo = point => {
        const coordinates = point.geometry.getCoordinates();
        const address = point.properties.get("name");
        return { text:address, longitude:coordinates?coordinates[0]:null, latitude:coordinates?coordinates[1]:null};
    };

    const handleSaveRoute = () => {
        const route = getCurrentRoute();
        callback(route);
    }

    return (
        <div style={{ marginTop: '100px' }} className="App">
            <YMaps query={{ apikey: 'd2233e5f-264a-47d7-9fb4-7882b1a56c6c', suggest_apikey: '2f7a2e8c-1916-4656-ba2f-d79a198a1ad2' }}>
                <Map
                    modules={["multiRouter.MultiRoute", "control.RouteButton", "control.RoutePanel"]}
                    onLoad={ymaps => setYmaps(ymaps)}
                    state={mapState}
                    instanceRef={ref => ref && getRoute(ref)}
                    width={width}
                    height={height}
                >
                    <ZoomControl />
                    <Button
                        options={{ float: 'right', floatIndex: 100, position: { top: '180px', right: '20px' }, autoSizeMode: 'auto',
                            maxWidth: '200px' }}
                        data={{ content: "Сохранить маршрут!" }}
                        onClick={handleSaveRoute}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MyMap;
