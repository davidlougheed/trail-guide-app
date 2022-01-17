// These are sloppy patterns, allowing invalid domains.
// It is fine though; we're not allowing untrusted data into the app.

// TODO: Validate hostname with capture group
export const ASSET_URI_PATTERN =
    /^https?:\/\/([a-zA-Z0-9.\-_:]{1,127})\/api\/v1\/assets\/([a-zA-Z0-9\-]{1,36})\/bytes\/?$/;

// TODO: Validate hostname with capture group
export const MODAL_URI_PATTERN =
    /^https?:\/\/([a-zA-Z0-9.\-_:]{1,127})\/api\/v1\/modals\/([a-zA-Z0-9\-]{1,36})\/?$/;

/**
 * Extracts an asset ID (if present) from an asset bytes URI.
 * @param {string} uri
 */
export const getDataFromAssetURI = uri => {
    const match = uri.match(ASSET_URI_PATTERN);
    if (match === null) return null;
    return match[2];  // Capture group: asset ID
};

/**
 * Extracts a modal ID (if present) from a modal detail URI.
 * @param {string} uri
 */
export const getDataFromModalURI = uri => {
    const match = uri.match(MODAL_URI_PATTERN);
    if (match === null) return null;
    return match[2];  // Capture group: modal ID
};
