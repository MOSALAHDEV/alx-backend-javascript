import { expect } from 'chai';
import sinon from 'sinon';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();

    sinon.stub(queue, 'create').callsFake(() => {
      const job = {
        id: Math.floor(Math.random() * 1000),
        on: () => {},
        save: function (cb) {
          if (cb) cb(null);
        }
      };
      return job;
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '1234567890', message: 'Test message 1' },
      { phoneNumber: '0987654321', message: 'Test message 2' }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.create.calledTwice).to.be.true;
    expect(queue.create.firstCall.args[0]).to.equal('push_notification_code_3');
    expect(queue.create.firstCall.args[1]).to.deep.equal(jobs[0]);
    expect(queue.create.secondCall.args[1]).to.deep.equal(jobs[1]);
  });
});

