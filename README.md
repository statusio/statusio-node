# Status.io API

## Installation

Module can be installed with command `npm install statusio`

## Quick start

```
var StatusIOApi = require('statusioapi').StatusIOApi;

var api = new StatusIOApi('fe95676e-421f-4e55-94e3-aa7c9b291828', 'xDaJahiIQcnyuTXBBKT9+dTnTF0WW5Qn9sXwg+Tb4tSsbY+hj4Y41Ty/5nqEaLgMr/PukhDwwjWwIqsyeH7q2Q==')

api.status.summary('568acbf61ce86b532e000488', function(error, data){
    if(error) {
        console.error(data);
    } else {
        console.log(data);
    }
});
```

If you have plan to do multiple calls against one status page you could be interested in `setStatusPage` method. It allows to skip `statuspage_id` parameters in your requests

```
var StatusIOApi = require('statusioapi').StatusIOApi;

var api = new StatusIOApi('fe95676e-421f-4e55-94e3-aa7c9b291828', 'xDaJahiIQcnyuTXBBKT9+dTnTF0WW5Qn9sXwg+Tb4tSsbY+hj4Y41Ty/5nqEaLgMr/PukhDwwjWwIqsyeH7q2Q==')
api.setStatusPage('568acbf61ce86b532e000488');

api.status.summary(function(error, data){
    if(error) {
        console.error(data);
    } else {
        console.log(data);
    }
});
```

`statuspage_id` will be added to all objects where it is required and doesn't set

```
var StatusIOApi = require('statusioapi').StatusIOApi;

var api = new StatusIOApi('fe95676e-421f-4e55-94e3-aa7c9b291828', 'xDaJahiIQcnyuTXBBKT9+dTnTF0WW5Qn9sXwg+Tb4tSsbY+hj4Y41Ty/5nqEaLgMr/PukhDwwjWwIqsyeH7q2Q==')
api.setStatusPage('568acbf61ce86b532e000488');

api.subscribers.add({
    'statuspage_id': '568acbf61ce86b532e000488',
    'method': 'email',
    'address': 'email@domain.com',
    'silent': '1'
});

// IS EQUAL TO

api.subscribers.add({
    'method': 'email',
    'address': 'email@domain.com',
    'silent': '1'
});
```

`callback` function takes two arguments - `error` and `data`. In case if `error` is `true` `data` contains error message. In other cases `data` contains `result` field content. `callback` functions are optional.

## Supported API Methods List

Actual version of API documentation available at [http://docs.statusio.apiary.io/](http://docs.statusio.apiary.io/).

### Components

- api.components.list (statusPageId, callback)
- api.components.statusUpdate (status, callback)

### Incidents

- api.incidents.list (statusPageId, callback)
- api.incidents.message (statusPageId, messageId, callback)
- api.incidents.create (incident, callback)
- api.incidents.update (incident, callback)
- api.incidents.resolve (incident, callback)
- api.incidents.delete (incident, callback)

### Maintenance

- api.maintenance.list (statusPageId, callback)
- api.maintenance.message (statusPageId, messageId, callback)
- api.maintenance.schedule (maintenance, callback)
- api.maintenance.start (maintenance, callback)
- api.maintenance.update (maintenance, callback)
- api.maintenance.finish (maintenance, callback)
- api.maintenance.delete (maintenance, callback)

### Metrics

- api.metrics.update (metric, callback)

### Status

- api.status.summary (statusPageId, callback)

### Subscribers

- api.subscribers.list (statusPageId, callback)
- api.subscribers.add (subscriber, callback)
- api.subscribers.update (subscriber, callback)
- api.subscribers.remove (statusPageId, subscriberId, callback)

If there is new method which is not implemented in this library yet you can directly call it like

```javascript
api.request('get', 'new/get_method', {}, function(error, data){
    if(error) {
        console.error(data);
    } else {
        console.log(data);
    }
});

api.request('post', 'new/post_method', {'data': 'test'}, function(error, data){
    if(error) {
        console.error(data);
    } else {
        console.log(data);
    }
});
```