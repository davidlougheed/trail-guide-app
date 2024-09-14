// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

// These are sloppy patterns, allowing invalid domains.
// It is fine though; we're not allowing untrusted data into the app.

import {localDataProvider} from "./dataSources";
const {BASE_URL, APP_BASE_URL} = localDataProvider.config.data;

export const ASSET_URI_PATTERN =
    /^(https?:\/\/[a-zA-Z\d.\-_:]{1,127})\/api\/v1\/assets\/([a-zA-Z\d\-]{1,36})\/bytes\/?$/;

export const MODAL_URI_PATTERN =
    /^(https?:\/\/[a-zA-Z\d.\-_:\/]{1,127})\/modals\/([a-zA-Z\d\-]{1,36})\/?$/;

export const PAGE_URI_PATTERN =
    /^(https?:\/\/[a-zA-Z\d.\-_:\/]{1,127})\/pages\/([a-zA-Z\d\-]{1,36})\/?$/;

export const STATION_URI_PATTERN =
    /^(https?:\/\/[a-zA-Z\d.\-_:\/]{1,127})\/stations\/([a-zA-Z\d\-]{1,36})\/?$/;

/**
 * Extracts an asset ID (if present) from an asset bytes URI.
 * @param {string} uri
 * @return string | null
 */
export const getDataFromAssetURI = uri => {
    const match = uri.match(ASSET_URI_PATTERN);
    if (match === null || match[1] !== BASE_URL) return null;
    return match[2];  // Capture group: asset ID
};

/**
 * Extracts a modal ID (if present) from a modal detail URI.
 * @param {string} uri
 * @return string | null
 */
export const getDataFromModalURI = uri => {
    const match = uri.match(MODAL_URI_PATTERN);
    if (match === null || match[1] !== APP_BASE_URL) return null;
    return match[2];  // Capture group: modal ID
};

/**
 * Extracts a page ID (if present) from a page detail URI.
 * @param {string} uri
 * @return string | null
 */
export const getDataFromPageURI = uri => {
    const match = uri.match(PAGE_URI_PATTERN);
    if (match === null || match[1] !== APP_BASE_URL) return null;
    return match[2];  // Capture group: modal ID
};

/**
 * Extracts a station ID (if present) from a station URI.
 * @param {string} uri
 */
export const getDataFromStationURI = uri => {
    const match = uri.match(STATION_URI_PATTERN);
    if (match === null || match[1] !== APP_BASE_URL) return null;
    return match[2];  // Capture group: modal ID
};

/**
 * Extracts a base URI and file name from a local asset URI for rendering in a web view.
 * @param {string} uri
 * @return {[string,string]}
 */
export const getBaseUrlAndFileFromURI = uri => [
    uri.substring(7, uri.lastIndexOf("/") + 1),
    uri.substring(uri.lastIndexOf("/") + 1, uri.length),
];

