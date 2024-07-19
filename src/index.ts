import { NUMBERS_OF_DEVICES } from './constants';
import { getDevicesOnlineStatus } from './fetch-pq';
import { server } from './mocks/node';

server.events.on('request:start', ({ request }) => {
    console.log('---------- Outgoing:', request.method, request.url);
});

server.listen();

const deviceIds = Array.from({ length: NUMBERS_OF_DEVICES }, (_, i) => i + 1);

getDevicesOnlineStatus([...deviceIds]).then((result) => {
    console.log('Devices status: ', JSON.stringify(result, null, 2));
});
