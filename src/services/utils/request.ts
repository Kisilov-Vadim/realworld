import {ResponseValue} from '../types';

type RequestParams<Body> = {
  url: string;
  method?: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
  body?: Body;
};

const request = async <Response = unknown, Body = unknown>({
  url,
  body,
  method = 'GET',
}: RequestParams<Body>): Promise<ResponseValue<Response>> => {
  const params = {
    method,
    body: body && JSON.stringify(body),
  };

  try {
    const response = await fetch(url, params);
    const value = await response.json();

    return {value};
  } catch (error) {
    console.error(error);

    return {error} as ResponseValue<Response>;
  }
};

export default request;
