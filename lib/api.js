var Components, Incidents, Maintenance, Metrics, Status, StatusIOApi, Subscribers, r,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

r = require('request');

Components = (function() {
  function Components(api) {
    this.api = api;
    this.statusUpdate = bind(this.statusUpdate, this);
    this.list = bind(this.list, this);
  }

  Components.prototype.list = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "component/list/" + statusPageId, {}, callback);
  };

  Components.prototype.statusUpdate = function(status, callback) {
    if (status.statuspage_id == null) {
      status.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "component/status/update", status, callback);
  };

  return Components;

})();

Incidents = (function() {
  function Incidents(api) {
    this.api = api;
    this["delete"] = bind(this["delete"], this);
    this.resolve = bind(this.resolve, this);
    this.update = bind(this.update, this);
    this.create = bind(this.create, this);
    this.message = bind(this.message, this);
    this.list = bind(this.list, this);
  }

  Incidents.prototype.list = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "incident/list/" + statusPageId, {}, callback);
  };

  Incidents.prototype.listbyid = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "incidents/" + statusPageId, {}, callback);
  };

  Incidents.prototype.message = function(statusPageId, messageId, callback) {
    if (callback == null) {
      callback = messageId;
      messageId = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "incident/message/" + statusPageId + "/" + messageId, {}, callback);
  };
  
  Incidents.prototype.getsingle = function(statusPageId, incidentId, callback) {
    if (callback == null) {
      callback = incidentId;
      incidentId = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "incident/" + statusPageId + "/" + incidentId, {}, callback);
  };  

  Incidents.prototype.create = function(incident, callback) {
    if (incident.statuspage_id == null) {
      incident.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "incident/create", incident, callback);
  };

  Incidents.prototype.update = function(incident, callback) {
    if (incident.statuspage_id == null) {
      incident.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "incident/update", incident, callback);
  };

  Incidents.prototype.resolve = function(incident, callback) {
    if (incident.statuspage_id == null) {
      incident.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "incident/resolve", incident, callback);
  };

  Incidents.prototype["delete"] = function(incident, callback) {
    if (incident.statuspage_id == null) {
      incident.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "incident/delete", incident, callback);
  };

  return Incidents;

})();

Maintenance = (function() {
  function Maintenance(api) {
    this.api = api;
    this["delete"] = bind(this["delete"], this);
    this.finish = bind(this.finish, this);
    this.update = bind(this.update, this);
    this.start = bind(this.start, this);
    this.schedule = bind(this.schedule, this);
    this.message = bind(this.message, this);
    this.list = bind(this.list, this);
  }

  Maintenance.prototype.list = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "maintenance/list/" + statusPageId, {}, callback);
  };

  Maintenance.prototype.listbyid = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "maintenances/" + statusPageId, {}, callback);
  };

  Maintenance.prototype.message = function(statusPageId, messageId, callback) {
    if (callback == null) {
      callback = messageId;
      messageId = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "maintenance/message/" + statusPageId + "/" + messageId, {}, callback);
  };

  Maintenance.prototype.getsingle = function(statusPageId, maintenanceId, callback) {
    if (callback == null) {
      callback = maintenanceId;
      maintenanceId = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "maintenance/" + statusPageId + "/" + maintenanceId, {}, callback);
  };

  Maintenance.prototype.schedule = function(maintenance, callback) {
    if (maintenance.statuspage_id == null) {
      maintenance.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "maintenance/schedule", maintenance, callback);
  };

  Maintenance.prototype.start = function(maintenance, callback) {
    if (maintenance.statuspage_id == null) {
      maintenance.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "maintenance/start", maintenance, callback);
  };

  Maintenance.prototype.update = function(maintenance, callback) {
    if (maintenance.statuspage_id == null) {
      maintenance.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "maintenance/update", maintenance, callback);
  };

  Maintenance.prototype.finish = function(maintenance, callback) {
    if (maintenance.statuspage_id == null) {
      maintenance.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "maintenance/finish", maintenance, callback);
  };

  Maintenance.prototype["delete"] = function(maintenance, callback) {
    if (maintenance.statuspage_id == null) {
      maintenance.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "maintenance/delete", maintenance, callback);
  };

  return Maintenance;

})();

Metrics = (function() {
  function Metrics(api) {
    this.api = api;
    this.update = bind(this.update, this);
  }

  Metrics.prototype.update = function(metric, callback) {
    if (metric.statuspage_id == null) {
      metric.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "metric/update", metric, callback);
  };

  return Metrics;

})();

Status = (function() {
  function Status(api) {
    this.api = api;
    this.summary = bind(this.summary, this);
  }

  Status.prototype.summary = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "status/summary/" + statusPageId, {}, callback);
  };

  return Status;

})();

Subscribers = (function() {
  function Subscribers(api) {
    this.api = api;
    this.remove = bind(this.remove, this);
    this.update = bind(this.update, this);
    this.add = bind(this.add, this);
    this.list = bind(this.list, this);
  }

  Subscribers.prototype.list = function(statusPageId, callback) {
    if (callback == null) {
      callback = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("get", "subscriber/list/" + statusPageId, {}, callback);
  };

  Subscribers.prototype.add = function(subscriber, callback) {
    if (subscriber.statuspage_id == null) {
      subscriber.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("post", "subscriber/add", subscriber, (function(_this) {
      return function(err, res, raw) {
        if (err) {
          return callback(err, res);
        } else {
          return callback(err, raw.subscriber_id);
        }
      };
    })(this));
  };

  Subscribers.prototype.update = function(subscriber, callback) {
    if (subscriber.statuspage_id == null) {
      subscriber.statuspage_id = this.api.statusPageId;
    }
    return this.api.request("patch", "subscriber/update", subscriber, callback);
  };

  Subscribers.prototype.remove = function(statusPageId, subscriberId, callback) {
    if (callback == null) {
      callback = subscriberId;
      subscriberId = statusPageId;
      statusPageId = this.api.statusPageId;
    }
    return this.api.request("delete", "subscriber/remove/" + statusPageId + "/" + subscriberId, {}, callback);
  };

  return Subscribers;

})();

StatusIOApi = (function() {
  function StatusIOApi(apiId, apiKey, version, host) {
    this.apiId = apiId;
    this.apiKey = apiKey;
    this.version = version != null ? version : 2;
    this.host = host != null ? host : 'https://api.status.io';
    this.setStatusPage = bind(this.setStatusPage, this);
    this.request = bind(this.request, this);
    this.r = r.defaults({
      headers: {
        'x-api-id': this.apiId,
        'x-api-key': this.apiKey
      }
    });
    this.baseUrl = this.host + "/v" + this.version + "/";
    this.components = new Components(this);
    this.incidents = new Incidents(this);
    this.maintenance = new Maintenance(this);
    this.metrics = new Metrics(this);
    this.status = new Status(this);
    this.subscribers = new Subscribers(this);
  }

  StatusIOApi.prototype.request = function(method, resource, payload, callback) {
    if (payload == null) {
      payload = {};
    }
    if (method === 'delete') {
      method = 'del';
    }
    if (method === 'get') {
      request_dict = {url: this.baseUrl + resource}
    } else {
      request_dict = {url: this.baseUrl + resource, json: payload}
    }
    return this.r[method](request_dict, (function(_this) {
      return function(e, r, b) {
        if (e != null) {
          if (typeof callback === 'function') {
            return callback(true, e, b);
          }
        } else {
          if (r.statusCode === 200) {
            if (typeof b === 'string') {
              b = JSON.parse(b);
            }
            if (b.status.error === 'no') {
              if (typeof callback === 'function') {
                return callback(false, b.result, b);
              }
            } else {
              if (typeof callback === 'function') {
                return callback(true, b.status.message, b);
              }
            }
          } else {
            if (typeof callback === 'function') {
              return callback(true, b, b);
            }
          }
        }
      };
    })(this));
  };

  StatusIOApi.prototype.setStatusPage = function(statusPageId) {
    return this.statusPageId = statusPageId;
  };

  return StatusIOApi;

})();

exports.StatusIOApi = StatusIOApi;
