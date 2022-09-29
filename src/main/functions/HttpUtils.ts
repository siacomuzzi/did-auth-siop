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
  return postAuthenticationResponseJwt(url, body.jwt, '', '');
}

export async function postAuthenticationResponseJwt(url: string, id_token: string, vp_token: string, state: string): Promise<Response> {
  try {
    const body = new URLSearchParams();
    body.append('state', state);
    body.append('id_token', id_token);
    body.append('vp_token', vp_token);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: body.toString(),
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
