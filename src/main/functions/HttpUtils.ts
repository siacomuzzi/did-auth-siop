import { fetch } from 'cross-fetch';

import { AuthenticationResponseWithJWT, JWTPayload, SIOPErrors } from '../types';

export async function postWithBearerToken(url: string, body: JWTPayload, bearerToken: string): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!response || !response.status || (response.status !== 200 && response.status !== 201)) {
      throw new Error(`${SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText}, ${await response.text()}`);
    }
    return response;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}

export async function postAuthenticationResponse(url: string, body: AuthenticationResponseWithJWT): Promise<Response> {
  return postAuthenticationResponseJwt(url, body.jwt);
}

export async function postAuthenticationResponseJwt(url: string, idToken: string, vpToken?: string, state?: string): Promise<Response> {
  try {
    let body = `id_token=${idToken}`;
    if (vpToken) { body += `&vp_token=${vpToken}`; }
    if (state) { body += `&state=${state}`; }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    });
    if (!response || !response.status || response.status < 200 || response.status >= 400) {
      throw new Error(`${SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText}, ${await response.text()}`);
    }
    return response;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}

export async function getWithUrl(url: string): Promise<Response> {
  return fetch(url)
    .then((response: Response) => {
      if (response.status >= 400) {
        return Promise.reject(Error(`${SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText} URL: ${url}`));
      }
      return response.json();
    })
    .catch((e) => {
      return Promise.reject(Error(`${(e as Error).message}`));
    });
}
