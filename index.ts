import {registerRootComponent} from 'expo';
import {ReadableStream} from 'web-streams-polyfill';

import App from './src/app';

if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any;
}

registerRootComponent(App);
