import { SocketIO, Server } from 'mock-socket';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();


describe("attackAll function", () => {
	it("should return ", () => {

		// assert.typeOf(foo, 'string'); // without optional message
		// assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
		// assert.equal(foo, 'bar', 'foo equal `bar`');
		// assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
		// assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

		expect().is.empty;
		// expect().to.be.a("function");
		expect(3).to.equal(3);
		// expect(foo).to.have.length(3);
  //   expect(beverages).to.have.property('tea').with.length(3);

  //   foo.should.be.a('string');
		// foo.should.equal('bar');
		// foo.should.have.length(3);
		// beverages.should.have.property('tea').with.length(3);
		// should.not.exist(err);
  // 	should.exist(doc);
	});

	it("attackOne Test", () => {

		expect().is.not.empty;
	});
});


describe('attackOne function', function() {
  it('should return ', done => {
    const mockServer = new Server('http://localhost:8001');
    mockServer.on('connection', server => {
      mockServer.emit('', data);
    });

    window.io = SocketIO;

  });

  it("attackOne Test", () => {

		expect().is.not.empty;
	});
});