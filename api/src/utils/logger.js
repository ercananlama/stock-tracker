import moment from "moment";

const levels = {
  ERROR: "ERROR",
  WARNING: "WARN",
  INFO: "INFO",
  TRACE: "TRACE",
};

export function logError(message, err, clientRequestId) {
  log(clientRequestId, levels.ERROR, message, err);
}

export function logWarning(message, clientRequestId) {
  log(clientRequestId, levels.WARNING, message);
}

export function logInfo(message, data, clientRequestId) {
  log(clientRequestId, levels.INFO, message, data);
}

export function logTrace(message, data, clientRequestId) {
  log(clientRequestId, levels.TRACE, message, data);
}

function log(clientRequestId, level, message, data) {
  let logObject = {
    time: moment().format(),
    level,
    message,
  };

  if (clientRequestId) {
    logObject.clientRequestId = clientRequestId;
  }

  if (data) {
    logObject.data = data;
  }

  const logObjectStr = JSON.stringify(logObject);

  switch (level) {
    case levels.ERROR:
      console.error(logObjectStr);
      break;
    case levels.INFO:
      console.info(logObjectStr);
      break;
    case levels.TRACE:
      console.trace(logObjectStr);
      break;
    case levels.WARNING:
      console.warn(logObjectStr);
      break;
    default:
      throw new Error(`Unsupported log level ${level}`);
  }
}
