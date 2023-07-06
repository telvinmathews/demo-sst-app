/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
export default function onError(error) {
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
}
