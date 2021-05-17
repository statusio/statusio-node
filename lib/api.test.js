var API_ID, API_KEY, RIGHT_COMPONENT, RIGHT_COMPONENT_CONTAINER_COMBOS, RIGHT_CONTAINER, RIGHT_STATUSPAGE_ID, StatusIOApi, WRONG_COMPONENTS, WRONG_COMPONENT_CONTAINER_COMBOS, WRONG_CONTAINERS, WRONG_STATUSPAGE_ID, assert, expect;

assert = require('chai').assert;

expect = require('chai').expect;

StatusIOApi = require('./api.js').StatusIOApi;

API_ID = '';

API_KEY = '';

RIGHT_STATUSPAGE_ID = '568d8a3e3cada8c2490000dd';

RIGHT_COMPONENT = '568d8a3e3cada8c2490000ed';

RIGHT_CONTAINER = '568d8a3e3cada8c2490000ec';

RIGHT_COMPONENT_CONTAINER_COMBOS = ['568d8a3e3cada8c2490000ed-568d8a3e3cada8c2490000ec'];

WRONG_STATUSPAGE_ID = '999999999999999999999999';

WRONG_COMPONENTS = ['999999999999999999999999'];

WRONG_CONTAINERS = ['999999999999999999999999'];

WRONG_COMPONENT_CONTAINER_COMBOS = ['999999999999999999999999-999999999999999999999999'];

describe('components', (function(_this) {
  return function() {
    var api;
    api = new StatusIOApi(API_ID, API_KEY);
    it('components.list without callback', function(done) {
      api.setStatusPage(RIGHT_STATUSPAGE_ID);
      api.components.list();
      return done();
    });
    it('components.list right STATUSPAGE_ID', function(done) {
      api.setStatusPage(RIGHT_STATUSPAGE_ID);
      return api.components.list(function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('components.list wrong STATUSPAGE_ID', function(done) {
      api.setStatusPage(WRONG_STATUSPAGE_ID);
      return api.components.list(function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    return it('components.statusUpdate wrong request', function(done) {
      api.setStatusPage(RIGHT_STATUSPAGE_ID);
      return api.components.statusUpdate({
        components: RIGHT_COMPONENT,
        details: "Test Message",
        current_status: 200
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
  };
})(this));

describe('incidents', (function(_this) {
  return function() {
    var api, incident_id, message_id;
    api = new StatusIOApi(API_ID, API_KEY);
    api.setStatusPage(RIGHT_STATUSPAGE_ID);
    message_id = '';
    incident_id = '';
    it('incidents.create right request', function(done) {
      return api.incidents.create({
        infrastructure_affected: RIGHT_COMPONENT_CONTAINER_COMBOS,
        incident_name: "AUTOTEST",
        incident_details: "AUTOTEST",
        message_subject: "AUTOTEST",
        current_status: 300,
        current_state: 100,
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        incident_id = res;
        return done();
      });
    });
    it('incidents.create wrong request', function(done) {
      return api.incidents.create({
        infrastructure_affected: RIGHT_COMPONENT_CONTAINER_COMBOS,
        incident_name: "AUTOTEST",
        incident_details: "AUTOTEST",
        message_subject: "AUTOTEST",
        current_status: 300,
        current_state: 100,
        notify_email: "0",
        notify_sms: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('incidents.list right STATUSPAGE_ID', function(done) {
      return api.incidents.list(function(err, res) {
        expect(err).to.equal(false);
        message_id = res.active_incidents[0].messages[0]._id;
        return done();
      });
    });
    it('incidents.list wrong STATUSPAGE_ID', function(done) {
      api.setStatusPage(WRONG_STATUSPAGE_ID);
      return api.incidents.list(function(err, res) {
        expect(err).to.not.equal(false);
        api.setStatusPage(RIGHT_STATUSPAGE_ID);
        return done();
      });
    });
    it('incidents.message right MESSAGE_ID', function(done) {
      api.setStatusPage(RIGHT_STATUSPAGE_ID);
      return api.incidents.message(message_id, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('incidents.message wrong MESSAGE_ID', function(done) {
      return api.incidents.message(message_id + 'asdsa', function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('incidents.update right incident_id', function(done) {
      return api.incidents.update({
        incident_id: incident_id,
        incident_details: 'AUTOTEST UPDATE',
        message_subject: 'AUTOTEST UPDATE',
        current_status: 300,
        current_state: 100,
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('incidents.update wrong incident_id', function(done) {
      return api.incidents.update({
        incident_id: incident_id + 'sadsad',
        incident_details: 'AUTOTEST UPDATE',
        message_subject: 'AUTOTEST UPDATE',
        current_status: 300,
        current_state: 100,
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('incidents.resolve right incident_id', function(done) {
      return api.incidents.resolve({
        incident_id: incident_id,
        incident_details: 'AUTOTEST RESOLVED',
        message_subject: 'AUTOTEST RESOLVED',
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('incidents.resolve wrong incident_id', function(done) {
      return api.incidents.resolve({
        incident_id: incident_id + 'asdasd',
        incident_details: 'AUTOTEST RESOLVED',
        message_subject: 'AUTOTEST RESOLVED',
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('incidents.delete right incident_id', function(done) {
      return api.incidents["delete"]({
        incident_id: incident_id
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    return it('incidents.delete wrong incident_id', function(done) {
      return api.incidents["delete"]({
        incident_id: incident_id + "asdsad"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
  };
})(this));

describe('maintenance', (function(_this) {
  return function() {
    var api, maintenance_id, message_id;
    api = new StatusIOApi(API_ID, API_KEY);
    api.setStatusPage(RIGHT_STATUSPAGE_ID);
    maintenance_id = '';
    message_id = '';
    it('maintenance.schedule right request', function(done) {
      return api.maintenance.schedule({
        all_infrastructure_affected: "0",
        infrastructure_affected: RIGHT_COMPONENT_CONTAINER_COMBOS,
        automation: "0",
        maintenance_name: "AUTOTEST",
        maintenance_details: "AUTOTEST DETAILS",
        message_subject: "AUTOTEST",
        date_planned_start: "01/01/2018",
        time_planned_start: "00:00",
        date_planned_end: "01/01/2018",
        time_planned_end: "06:00",
        maintenance_notify_now: "0",
        maintenance_notify_72_hr: "0",
        maintenance_notify_24_hr: "0",
        maintenance_notify_1_hr: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('maintenance.schedule wrong request', function(done) {
      return api.maintenance.schedule({
        all_infrastructure_affected: "0",
        infrastructure_affected: RIGHT_COMPONENT_CONTAINER_COMBOS,
        automation: "0",
        maintenance_name: "AUTOTEST",
        maintenance_details: "AUTOTEST DETAILS",
        message_subject: "AUTOTEST",
        date_planned_start: "01/01/2018",
        time_planned_start: "00:00",
        date_planned_end: "01/01/2018",
        maintenance_notify_now: "0",
        maintenance_notify_72_hr: "0",
        maintenance_notify_24_hr: "0",
        maintenance_notify_1_hr: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.list right statuspage_id', function(done) {
      return api.maintenance.list(function(err, res) {
        expect(err).to.equal(false);
        maintenance_id = res.upcoming_maintenances[0]._id;
        message_id = res.upcoming_maintenances[0].messages[0]._id;
        return done();
      });
    });
    it('maintenance.list wrong statuspage_id', function(done) {
      api.setStatusPage(WRONG_STATUSPAGE_ID);
      return api.maintenance.list(function(err, res) {
        api.setStatusPage(RIGHT_STATUSPAGE_ID);
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.message right message_id', function(done) {
      return api.maintenance.message(message_id, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('maintenance.message wrong message_id', function(done) {
      return api.maintenance.message(message_id + 'asd', function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.start right maintenance_id', function(done) {
      return api.maintenance.start({
        maintenance_id: maintenance_id,
        maintenance_details: "Starting maint",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('maintenance.start wrong maintenance_id', function(done) {
      return api.maintenance.start({
        maintenance_id: maintenance_id + "sadsad",
        maintenance_details: "Starting maint",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.update right maintenance_id', function(done) {
      return api.maintenance.update({
        maintenance_id: maintenance_id,
        maintenance_details: "Starting maint upd",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('maintenance.update wrong maintenance_id', function(done) {
      return api.maintenance.update({
        maintenance_id: maintenance_id + "asdsad",
        maintenance_details: "Starting maint upd",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.finish right maintenance_id', function(done) {
      return api.maintenance.finish({
        maintenance_id: maintenance_id,
        maintenance_details: "Starting maint fin",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('maintenance.finish wrong maintenance_id', function(done) {
      return api.maintenance.finish({
        maintenance_id: maintenance_id + "asdsad",
        maintenance_details: "Starting maint fin",
        message_subject: "AUTOTEST",
        notify_email: "0",
        notify_sms: "0",
        notify_webhook: "0",
        social: "0",
        irc: "0",
        hipchat: "0",
        msteams: "0",
        slack: "0"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('maintenance.delete right maintenance_id', function(done) {
      return api.maintenance["delete"]({
        maintenance_id: maintenance_id
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    return it('maintenance.delete wrong maintenance_id', function(done) {
      return api.maintenance["delete"]({
        maintenance_id: maintenance_id + "asdsad"
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
  };
})(this));

describe('status', (function(_this) {
  return function() {
    var api;
    api = new StatusIOApi(API_ID, API_KEY);
    api.setStatusPage(RIGHT_STATUSPAGE_ID);
    it('status.summary right statuspage_id', function(done) {
      return api.status.summary(function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    return it('status.summary wrong statuspage_id', function(done) {
      api.setStatusPage(WRONG_STATUSPAGE_ID);
      return api.status.summary(function(err, res) {
        api.setStatusPage(RIGHT_STATUSPAGE_ID);
        expect(err).to.not.equal(false);
        return done();
      });
    });
  };
})(this));

describe('subscribers', (function(_this) {
  return function() {
    var api, subscriber_id;
    api = new StatusIOApi(API_ID, API_KEY);
    api.setStatusPage(RIGHT_STATUSPAGE_ID);
    subscriber_id = '';
    it('subscribers.add right request', function(done) {
      return api.subscribers.add({
        method: 'email',
        address: 'test@example.com',
        silent: '1'
      }, function(err, res) {
        subscriber_id = res;
        expect(err).to.equal(false);
        return done();
      });
    });
    it('subscribers.add wrong request', function(done) {
      return api.subscribers.add({
        address: 'test@example.com',
        silent: '1'
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('subscribers.list right statuspage_id', function(done) {
      return api.subscribers.list(function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('subscribers.list wrong statuspage_id', function(done) {
      api.setStatusPage(WRONG_STATUSPAGE_ID);
      return api.subscribers.list(function(err, res) {
        api.setStatusPage(RIGHT_STATUSPAGE_ID);
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('subscribers.update right subscriber_id', function(done) {
      return api.subscribers.update({
        subscriber_id: subscriber_id,
        address: 'test1@example.com'
      }, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    it('subscribers.update wrong subscriber_id', function(done) {
      return api.subscribers.update({
        subscriber_id: subscriber_id + 'asdsad',
        address: 'test1@example.com'
      }, function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
    it('subscribers.remove right subscriber_id', function(done) {
      return api.subscribers.remove(subscriber_id, function(err, res) {
        expect(err).to.equal(false);
        return done();
      });
    });
    return it('subscribers.remove wrong subscriber_id', function(done) {
      return api.subscribers.remove(subscriber_id + 'sad', function(err, res) {
        expect(err).to.not.equal(false);
        return done();
      });
    });
  };
})(this));
