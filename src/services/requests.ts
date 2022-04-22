import superagentPromise from 'superagent-promise';
import _superagent, {
  ResponseError,
  SuperAgentRequest,
  Response,
} from 'superagent';

import {AuthStore, UserStore} from '../store';

export const API_URI = 'https://api.realworld.io/api';

const superagent = superagentPromise(_superagent, global.Promise);

const handleErrors = (err: ResponseError) => {
  if (err && err.response && err.response.status === 401) {
    AuthStore.logout();
  }

  return err;
};

const responseBody = (res: Response) => res.body;

const tokenPlugin = (req: SuperAgentRequest) => {
  const token = UserStore.user?.token;

  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: (url: string) =>
    superagent
      .del(`${API_URI}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: (url: string) =>
    superagent
      .get(`${API_URI}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: <Body>(url: string, body: Body) =>
    superagent
      .put(`${API_URI}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: <Body>(url: string, body: Body) =>
    superagent
      .post(`${API_URI}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

export default requests;
