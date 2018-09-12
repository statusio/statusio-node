# Node.js Status.io

Node.js package for [Status.io](https://status.io)


## Installation

```
$ npm install statusio
```


## Usage

```javascript
var StatusIOApi = require('statusio').StatusIOApi;

var api = new StatusIOApi('<api_id>', '<api_key>')

api.status.summary('<statuspage_id>', function(error, data) {
    if (error) {
        console.error(data);
    } else {
        console.log(data);
    }
});
```


The `callback` function takes two arguments - `error` and `data`. If `error` is `true` then `data` will contain the error message. In other cases `data` contains the `result` content. The `callback` functions are optional.

## Supported Methods

View the full API documentation at: http://developers.status.io/

### Components

- api.components.list (statusPageId, callback)
- api.components.statusUpdate (status, callback)

### Incidents

- api.incidents.list (statusPageId, callback)
- api.incidents.listbyid (statusPageId, callback)
- api.incidents.message (statusPageId, messageId, callback)
- api.incidents.create (incident, callback)
- api.incidents.update (incident, callback)
- api.incidents.resolve (incident, callback)
- api.incidents.delete (incident, callback)

### Maintenance

- api.maintenance.list (statusPageId, callback)
- api.maintenance.listbyid (statusPageId, callback)
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

### Unsupported Methods

If there is a new method which is not implemented in this library yet, you can call it directly:

```javascript
api.request('get', 'new/get_method', {}, function(error, data) {
    if (error) {
        console.error(data);
    } else {
        console.log(data);
    }
});

api.request('post', 'new/post_method', {'data': 'test'}, function(error, data) {
    if (error) {
        console.error(data);
    } else {
        console.log(data);
    }
});
```