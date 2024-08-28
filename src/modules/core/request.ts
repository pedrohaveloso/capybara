type RequestResult = Readonly<["ok", Response] | ["error", string]>;

export const request = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<RequestResult> =>
  fetch(input, init)
    .then((result) => ["ok", result] as const)
    .catch((error) => ["error", error] as const);
