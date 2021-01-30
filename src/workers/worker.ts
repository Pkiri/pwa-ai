// import { ApplicationInsights } from '@microsoft/applicationinsights-web'
// import { ApplicationInsights } from '@microsoft/applicationinsights-web-basic'
import type { ITelemetryItem } from '@microsoft/applicationinsights-core-js'
// import { XMLHttpRequestPolyfill } from './xmlHttpRequestPolyfill'

importScripts('/dist/workers/xmlHttpRequestPolyfill.js');
declare var XMLHttpRequestPolyfill: any;
self['XMLHttpRequest'] = XMLHttpRequestPolyfill;

importScripts('https://az416426.vo.msecnd.net/next/aib.2.min.js');

declare var Microsoft: any;


// This file must have worker types, but not DOM types.
// The global should be that of a service worker.

// This fixes `self`'s type.
declare var self: ServiceWorkerGlobalScope;

export { };

console.log(self.clients);

const instrumentationKey = 'YOUR_APPLICATIONINSIGHTS_KEY';

var appInsights = new Microsoft.ApplicationInsights.ApplicationInsights({ 
  instrumentationKey: instrumentationKey, 
  loggingLevelConsole: 2 ,
  loggingLevelTelemetry: 2
});

function sendAiEvent(data: ITelemetryItem) {
  const url = 'https://dc.services.visualstudio.com/v2/track';
  fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify([
      data
    ])
  })
    .catch(function (error) {
      console.log("Error while sending log data");
      console.log(error);
    });
}

function getAiRequestData(url: string, response: Response): ITelemetryItem {
  return {
    time: (new Date()).toISOString(),
    iKey: instrumentationKey,
    name:
      'Microsoft.ApplicationInsights.' + instrumentationKey + '.Event',
    // tags: {
    //   'ai.user.id': 'l6Tey',
    //   'ai.session.id': 'TL+Ry',
    //   'ai.device.id': 'browser',
    //   'ai.device.type': 'Browser',
    //   'ai.operation.id': 'HUfNE',
    //   SampleRate: '100',
    //   // eslint-disable-next-line no-script-url
    //   'ai.internal.sdkVersion': 'javascript:2.0.0-rc4'
    // },
    data: {
      baseType: 'EventData',
      baseData: {
        ver: 2,
        name: 'Url: ' + url,
        properties: {},
        measurements: {},
        success: response.ok,
      }
    },
    baseType: 'EventData',
      baseData: {
        ver: 2,
        name: 'Url: ' + url,
        properties: {},
        measurements: {},
        success: response.ok,
      }
  }
}

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Installed service worker');
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Activated service worker');
});

self.addEventListener('fetch', (event: FetchEvent) => {
  console.log(event.request);
  event.respondWith(fetch(event.request).then((response) => {
    const data = getAiRequestData(event.request.url, response);
    // sendAiEvent(data);
    appInsights.track(data);
    appInsights.flush();
    console.log('test');
    return response;
  }).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }));
});

// const appInsights = new ApplicationInsights({ config: {
//   instrumentationKey: instrumentationKey
//   /* ...Other Configuration Options... */
// } });
// appInsights.loadAppInsights();
// appInsights.trackPageView();

