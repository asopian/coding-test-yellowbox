import { HttpResponse, delay, http } from 'msw';
import { API_BEARER_TOKEN } from '../../constants';

/*
 * Mock external deviceOnlineStatus API
 * with device online status is determined by deviceId:
 *
 * - if equal to 13, authentication error
 * - if divisible by 5, network error / device offline (false)
 * - else device is online (true)
 */
const getDeviceOnlineStatusResolver = async ({ request, params }: any) => {
    const auth = request.headers.get('Authorization');
    const isAuthorized = auth === `Bearer ${API_BEARER_TOKEN}`;
    const { deviceId } = params;

    // Assuming the API allows a maximum of 5 concurrent requests
    // and each request takes a random amount of time between 1 and 3 seconds to complete.
    await delay(Math.floor(Math.random() * 2000) + 1000);

    if (!isAuthorized || deviceId === '13') {
        return new HttpResponse(null, { status: 401 });
    }

    if (deviceId % 5 === 0) {
        return HttpResponse.error();
    }

    return HttpResponse.text('true');
};

export const handlers = [
    http.get(
        'https://api.example.com/deviceOnlineStatus/:deviceId',
        getDeviceOnlineStatusResolver,
    ),
];
