import { API_BASE_URL, API_BEARER_TOKEN, BATCH_SIZE } from './constants';
import { groupBy } from './utils';

// An authorised GET request to a hypothetical API endpoint
// https://api.example.com/deviceOnlineStatus/{deviceId} returns true or false, indicating whether
// the requested device is online.
//
// E.g. response body .text = 'true' => device is online
//
// You may use the browser fetch API:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

/**
 * Gets the online statuses of the passed devices
 * @param deviceIds Array of device IDs to check the online status of
 */
export async function getDevicesOnlineStatus(deviceIds: number[]) {
    // TODO: Implement this function assuming that the example.com/deviceOnlineStatus API endpoint
    // allows a maximum of 5 concurrent requests
    //
    // Assume:
    // - Individual requests take a random amount of time between 1 and 3 seconds to complete
    // - Simultaneous requests will not delay or slow each other
    //
    // Make reasonable assumptions if there are any other factors you believe are relevant
    //
    // Choose a sensible return type that allows the caller to easily look up the online status
    // (true of false) of a device by its ID

    // ============================== Solution ==============================

    // Group deviceIds into batches of 5
    const batches = groupBy(deviceIds, (id, index) =>
        String(Math.trunc(index / BATCH_SIZE)),
    );

    let accumulator: any[] = [];
    for (let batch of Object.values(batches)) {
        let batchResult = await fetchMultipleDeviceStatus(batch);
        accumulator.push(batchResult);
    }

    // Flatten the batchResults and convert it to an object,
    // with deviceId as key and online status as value.
    return accumulator
        .flat(1)
        .reduce((acc: Record<number, string>, item: any) => {
            acc[item.deviceId] = item.status;
            return acc;
        }, {});
}

const fetchSingleDeviceStatus = (deviceId: number) => {
    return fetch(`${API_BASE_URL}/${deviceId}`, {
        headers: {
            Authorization: `Bearer ${API_BEARER_TOKEN}`,
        },
    })
        .then((response) => {
            if (response.status !== 200 && !response.ok) {
                return { deviceId, status: false };
            }

            return response.text().then((text) => {
                return {
                    deviceId,
                    status: text === 'true',
                };
            });
        })
        .catch((error) => {
            return { deviceId, status: false };
        });
};

const fetchMultipleDeviceStatus = (deviceIds: number[]) => {
    return Promise.all(deviceIds.map((id) => fetchSingleDeviceStatus(id)));
};
