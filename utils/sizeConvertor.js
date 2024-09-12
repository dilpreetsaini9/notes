function bytesToKilobytes(bytes) {
  return bytes / 1024;
}

function bytesToMegabytes(bytes) {
  return bytes / (1024 * 1024);
}

function bytesToGigabytes(bytes) {
  return bytes / (1024 * 1024 * 1024);
}

function convertSize(bytes = 0) {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${bytesToKilobytes(bytes).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${bytesToMegabytes(bytes).toFixed(2)} MB`;
  } else {
    return `${bytesToGigabytes(bytes).toFixed(2)} GB`;
  }
}

export { convertSize };
