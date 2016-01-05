{assert} = require 'chai'
{expect} = require 'chai'
{StatusIOApi} = require './api.coffee'

API_ID = ''
API_KEY = ''

RIGHT_STATUSPAGE_ID = '568acbf61ce86b532e000488'
RIGHT_COMPONENTS = ['568acbf61ce86b532e000498']
RIGHT_CONTAINERS = ['568acbf61ce86b532e000497']

WRONG_STATUSPAGE_ID = '999999999999999999999999'
WRONG_COMPONENTS = ['999999999999999999999999']
WRONG_CONTAINERS = ['999999999999999999999999']

describe 'components', () =>
	api = new StatusIOApi API_ID, API_KEY

	it 'components.list without callback', (done) =>
		api.setStatusPage RIGHT_STATUSPAGE_ID
		api.components.list()
		done()

	it 'components.list right STATUSPAGE_ID', (done) =>
		api.setStatusPage RIGHT_STATUSPAGE_ID
		api.components.list (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'components.list wrong STATUSPAGE_ID', (done) =>
		api.setStatusPage WRONG_STATUSPAGE_ID
		api.components.list (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'components.statusUpdate wrong request', (done) =>
		api.setStatusPage RIGHT_STATUSPAGE_ID
		api.components.statusUpdate 
			components: RIGHT_COMPONENTS
			details: "Test Message"
			current_status: 200
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

describe 'incidents', () =>
	api = new StatusIOApi API_ID, API_KEY
	api.setStatusPage RIGHT_STATUSPAGE_ID
	message_id = ''
	incident_id = ''
	
	it 'incidents.create right request', (done) =>
		api.incidents.create 
			components: RIGHT_COMPONENTS
			containers: RIGHT_CONTAINERS
			incident_name: "AUTOTEST"
			incident_details: "AUTOTEST"
			current_status: 300
			current_state: 100
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
		, (err, res) => 
			expect(err).to.equal(false)
			#assert.ok err, false
			incident_id = res
			done()

	it 'incidents.create wrong request', (done) =>
		api.incidents.create 
			components: RIGHT_COMPONENTS
			containers: RIGHT_CONTAINERS
			incident_name: "AUTOTEST"
			incident_details: "AUTOTEST"
			current_status: 300
			current_state: 100
			notify_email: "0"
			notify_sms: "0"
		, (err, res) => 
			expect(err).to.not.equal(false)
			done()

	it 'incidents.list right STATUSPAGE_ID', (done) =>
		api.incidents.list (err, res) => 
			expect(err).to.equal(false)
			message_id = res.active_incidents[0].messages[0]._id
			done()

	it 'incidents.list wrong STATUSPAGE_ID', (done) =>
		api.setStatusPage WRONG_STATUSPAGE_ID
		api.incidents.list (err, res) => 
			expect(err).to.not.equal(false)
			api.setStatusPage RIGHT_STATUSPAGE_ID
			done()

	it 'incidents.message right MESSAGE_ID', (done) =>
		api.setStatusPage RIGHT_STATUSPAGE_ID
		api.incidents.message message_id, (err, res) => 
			expect(err).to.equal(false)
			done()

	it 'incidents.message wrong MESSAGE_ID', (done) =>
		api.incidents.message message_id + 'asdsa', (err, res) => 
			expect(err).to.not.equal(false)
			done()

	it 'incidents.update right incident_id', (done) =>
		api.incidents.update 
			incident_id: incident_id
			incident_details: 'AUTOTEST UPDATE'
			current_status: 300
			current_state: 100
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'incidents.update wrong incident_id', (done) =>
		api.incidents.update 
			incident_id: incident_id + 'sadsad'
			incident_details: 'AUTOTEST UPDATE'
			current_status: 300
			current_state: 100
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'incidents.resolve right incident_id', (done) =>
		api.incidents.resolve 
			incident_id: incident_id
			incident_details: 'AUTOTEST RESOLVED'
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'incidents.resolve wrong incident_id', (done) =>
		api.incidents.resolve 
			incident_id: incident_id + 'asdasd'
			incident_details: 'AUTOTEST RESOLVED'
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()
	
	it 'incidents.delete right incident_id', (done) =>
		api.incidents.delete
			incident_id: incident_id
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	# ALWAYS RETURNS ERROR BY TIMEOUT
	#it 'incidents.delete wrong incident_id', (done) =>
	#	api.incidents.delete
	#		incident_id: incident_id + 'asdsad'
	#	, (err, res) =>
	#		expect(err).to.not.equal(false)
	#		done()


describe 'maintenance', () =>
	api = new StatusIOApi API_ID, API_KEY
	api.setStatusPage RIGHT_STATUSPAGE_ID
	maintenance_id = ''
	message_id = ''

	it 'maintenance.schedule right request', (done) =>
		api.maintenance.schedule
			components: RIGHT_COMPONENTS
			containers: RIGHT_CONTAINERS
			all_infrastructure_affected: "0"
			automation: "0"
			maintenance_name: "AUTOTEST"
			maintenance_details: "AUTOTEST DETAILS"
			date_planned_start: "01/01/2018"
			time_planned_start: "00:00"
			date_planned_end: "01/01/2018"
			time_planned_end: "06:00"
			maintenance_notify_now: "0"
			maintenance_notify_72_hr: "0"
			maintenance_notify_24_hr: "0"
			maintenance_notify_1_hr: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.schedule wrong request', (done) =>
		api.maintenance.schedule
			components: RIGHT_COMPONENTS
			containers: RIGHT_CONTAINERS
			all_infrastructure_affected: "0"
			automation: "0"
			maintenance_name: "AUTOTEST"
			maintenance_details: "AUTOTEST DETAILS"
			date_planned_start: "01/01/2018"
			time_planned_start: "00:00"
			date_planned_end: "01/01/2018"
			maintenance_notify_now: "0"
			maintenance_notify_72_hr: "0"
			maintenance_notify_24_hr: "0"
			maintenance_notify_1_hr: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'maintenance.list right statuspage_id', (done) =>
		api.maintenance.list (err, res) =>
			expect(err).to.equal(false)
			maintenance_id = res.upcoming_maintenances[0]._id
			message_id = res.upcoming_maintenances[0].messages[0]._id
			done()

	it 'maintenance.list wrong statuspage_id', (done) =>
		api.setStatusPage WRONG_STATUSPAGE_ID
		api.maintenance.list (err, res) =>
			api.setStatusPage RIGHT_STATUSPAGE_ID
			expect(err).to.not.equal(false)
			done()

	it 'maintenance.message right message_id', (done) =>
		api.maintenance.message message_id, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.message wrong message_id', (done) =>
		api.maintenance.message message_id + 'asd', (err, res) =>
			expect(err).to.not.equal(false)
			done()

	
	it 'maintenance.start right maintenance_id', (done) =>
		api.maintenance.start
			maintenance_id: maintenance_id
			maintenance_details: "Starting maint"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.start wrong maintenance_id', (done) =>
		api.maintenance.start
			maintenance_id: maintenance_id + "sadsad"
			maintenance_details: "Starting maint"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'maintenance.update right maintenance_id', (done) =>
		api.maintenance.update
			maintenance_id: maintenance_id
			maintenance_details: "Starting maint upd"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.update wrong maintenance_id', (done) =>
		api.maintenance.update
			maintenance_id: maintenance_id + "asdsad"
			maintenance_details: "Starting maint upd"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'maintenance.finish right maintenance_id', (done) =>
		api.maintenance.finish
			maintenance_id: maintenance_id
			maintenance_details: "Starting maint fin"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.finish wrong maintenance_id', (done) =>
		api.maintenance.finish
			maintenance_id: maintenance_id + "asdsad"
			maintenance_details: "Starting maint fin"
			notify_email: "0"
			notify_sms: "0"
			notify_webhook: "0"
			social: "0"
			irc: "0"
			hipchat: "0"
			slack: "0"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'maintenance.delete right maintenance_id', (done) =>
		api.maintenance.delete
			maintenance_id: maintenance_id
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'maintenance.delete wrong maintenance_id', (done) =>
		api.maintenance.delete
			maintenance_id: maintenance_id + "asdsad"
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

describe 'status', () =>
	api = new StatusIOApi API_ID, API_KEY
	api.setStatusPage RIGHT_STATUSPAGE_ID

	it 'status.summary right statuspage_id', (done) =>
		api.status.summary (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'status.summary wrong statuspage_id', (done) =>
		api.setStatusPage WRONG_STATUSPAGE_ID
		api.status.summary (err, res) =>
			api.setStatusPage RIGHT_STATUSPAGE_ID
			expect(err).to.not.equal(false)
			done()

describe 'subscribers', () => 
	api = new StatusIOApi API_ID, API_KEY
	api.setStatusPage RIGHT_STATUSPAGE_ID
	subscriber_id = ''

	it 'subscribers.add right request', (done) =>
		api.subscribers.add
			method: 'email'
			address: 'unrarme@yandex.ru'
			silent: '1'
		, (err, res) =>
			subscriber_id = res
			expect(err).to.equal(false)
			done()

	it 'subscribers.add wrong request', (done) =>
		api.subscribers.add
			address: 'unrarme@yandex.ru'
			silent: '1'
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'subscribers.list right statuspage_id', (done) =>
		api.subscribers.list (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'subscribers.list wrong statuspage_id', (done) =>
		api.setStatusPage WRONG_STATUSPAGE_ID
		api.subscribers.list (err, res) =>
			api.setStatusPage RIGHT_STATUSPAGE_ID
			expect(err).to.not.equal(false)
			done()

	it 'subscribers.update right subscriber_id', (done) =>
		api.subscribers.update
			subscriber_id: subscriber_id
			address: 'unrarme1@yandex.ru'
		, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'subscribers.update wrong subscriber_id', (done) =>
		api.subscribers.update
			subscriber_id: subscriber_id + 'asdsad'
			address: 'unrarme1@yandex.ru'
		, (err, res) =>
			expect(err).to.not.equal(false)
			done()

	it 'subscribers.remove right subscriber_id', (done) =>
		api.subscribers.remove subscriber_id, (err, res) =>
			expect(err).to.equal(false)
			done()

	it 'subscribers.remove wrong subscriber_id', (done) =>
		api.subscribers.remove subscriber_id + 'sad', (err, res) =>
			expect(err).to.not.equal(false)
			done()