r = require 'request'

class Components
	constructor: (@api) ->

	list: (statusPageId, callback) =>
		if !callback?
			callback = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "component/list/#{statusPageId}", {}, callback

	statusUpdate: (status, callback) =>
		status.statuspage_id = @api.statusPageId if !status.statuspage_id?
		@api.request "post", "component/status/update", status, callback

class Incidents
	constructor: (@api) ->

	list: (statusPageId, callback) =>
		if !callback?
			callback = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "incident/list/#{statusPageId}", {}, callback

	message: (statusPageId, messageId, callback) =>
		if !callback?
			callback = messageId
			messageId = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "incident/message/#{statusPageId}/#{messageId}", {}, callback

	create: (incident, callback) =>
		incident.statuspage_id = @api.statusPageId if !incident.statuspage_id?
		@api.request "post", "incident/create", incident, callback

	update: (incident, callback) =>
		incident.statuspage_id = @api.statusPageId if !incident.statuspage_id?
		@api.request "post", "incident/update", incident, callback

	resolve: (incident, callback) =>
		incident.statuspage_id = @api.statusPageId if !incident.statuspage_id?
		@api.request "post", "incident/resolve", incident, callback

	delete: (incident, callback) =>
		incident.statuspage_id = @api.statusPageId if !incident.statuspage_id?
		@api.request "post", "incident/delete", incident, callback

class Maintenance
	constructor: (@api) ->

	list: (statusPageId, callback) =>
		if !callback?
			callback = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "maintenance/list/#{statusPageId}", {}, callback

	message: (statusPageId, messageId, callback) =>
		if !callback?
			callback = messageId
			messageId = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "maintenance/message/#{statusPageId}/#{messageId}", {}, callback

	schedule: (maintenance, callback) =>
		maintenance.statuspage_id = @api.statusPageId if !maintenance.statuspage_id?
		@api.request "post", "maintenance/schedule", maintenance, callback

	start: (maintenance, callback) =>
		maintenance.statuspage_id = @api.statusPageId if !maintenance.statuspage_id?
		@api.request "post", "maintenance/start", maintenance, callback

	update: (maintenance, callback) =>
		maintenance.statuspage_id = @api.statusPageId if !maintenance.statuspage_id?
		@api.request "post", "maintenance/update", maintenance, callback

	finish: (maintenance, callback) =>
		maintenance.statuspage_id = @api.statusPageId if !maintenance.statuspage_id?
		@api.request "post", "maintenance/finish", maintenance, callback

	delete: (maintenance, callback) =>
		maintenance.statuspage_id = @api.statusPageId if !maintenance.statuspage_id?
		@api.request "post", "maintenance/delete", maintenance, callback

class Metrics
	constructor: (@api) ->

	update: (metric, callback) =>
		metric.statuspage_id = @api.statusPageId if !metric.statuspage_id?
		@api.request "post", "metric/update", metric, callback

class Status
	constructor: (@api) ->

	summary: (statusPageId, callback) =>
		if !callback?
			callback = statusPageId
			statusPageId = @api.statusPageId
		@api.request "get", "status/summary/#{statusPageId}", {}, callback

class Subscribers
	constructor: (@api) ->

	list: (statusPageId, callback) =>
		if !callback?
			callback = statusPageId
			statusPageId = @api.statusPageId

		@api.request "get", "subscriber/list/#{statusPageId}", {}, callback

	add: (subscriber, callback) =>
		subscriber.statuspage_id = @api.statusPageId if !subscriber.statuspage_id?
		@api.request "post", "subscriber/add", subscriber, (err, res, raw) =>
			if err
				callback err, res
			else
				callback err, raw.subscriber_id

	update: (subscriber, callback) =>
		subscriber.statuspage_id = @api.statusPageId if !subscriber.statuspage_id?
		@api.request "patch", "subscriber/update", subscriber, callback

	remove: (statusPageId, subscriberId, callback) => 
		if !callback?
			callback = subscriberId
			subscriberId = statusPageId
			statusPageId = @api.statusPageId

		@api.request "delete", "subscriber/remove/#{statusPageId}/#{subscriberId}", {}, callback

#process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

class StatusIOApi
	constructor: (@apiId, @apiKey, @version = 2, @host = 'https://api.status.io') ->
		@r = r.defaults
			headers:
				'x-api-id': @apiId
				'x-api-key': @apiKey
			#proxy: 'http://127.0.0.1:8888'
		@baseUrl = "#{@host}/v#{@version}/"

		@components = new Components @
		@incidents =  new Incidents @
		@maintenance = new Maintenance @
		@metrics = new Metrics @
		@status = new Status @
		@subscribers = new Subscribers @

	request: (method, resource, payload = {}, callback) =>
		method = 'del' if method == 'delete'

		@r[method]
			url: @baseUrl + resource
			json: payload
		, (e, r, b) =>
			if e?
				callback true, e, b if typeof(callback) == 'function'
			else
				if r.statusCode == 200
					b = JSON.parse(b) if typeof(b) == 'string'

					if b.status.error == 'no'
						callback false, b.result, b if typeof(callback) == 'function'
					else
						callback true, b.status.message, b if typeof(callback) == 'function'
				else
					callback true, b, b if typeof(callback) == 'function'

	setStatusPage: (statusPageId) =>
		@statusPageId = statusPageId

exports.StatusIOApi = StatusIOApi