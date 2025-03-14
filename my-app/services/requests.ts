import superagentPromise from 'superagent-promise';
import _superagent, {
  ResponseError,
  SuperAgentRequest,
  Response,
} from 'superagent';


export const API_URI = 'http://localhost:3000/api';

const superagent = superagentPromise(_superagent, global.Promise);


const requests = {
  get: (url: string, handler: (err:Body, res:Body) => void ) =>
    superagent
      .get(`${API_URI}${url}`)
      .end((err:Body, res:Body) => handler(err, res))
};

export default requests;
