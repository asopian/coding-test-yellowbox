const API_BASE_URL = 'https://api.example.com/deviceOnlineStatus'
const API_BEARER_TOKEN = `eyJ0eXAiOiJKadsCJhbGciOiJIy45wNiJ9.eyJpc3MiOiJ5ZWx...`

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
}
