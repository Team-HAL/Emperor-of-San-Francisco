let ioServer = require('socket.io').listen(5000);
require('./../server/gameLogic.js')(ioServer);
const ioClient = require('socket.io-client');
const socketURL = 'http://localhost:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true,
};

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe('Server', () => {
	let socket1, socket2, socket3, socket4;

	describe('Game Logic', () => {
		afterEach(done => {
			ioServer.close();
			ioServer = require('socket.io').listen(5000);
			require('./../server/gameLogic.js')(ioServer);
			done();
		});

		// Line 12 components/player_actions
		const dataGenerator = (dmg, otherPlayers, currentUser) => {
			assert.typeOf(dmg, 'number');
			assert.typeOf(otherPlayers, 'array');
			should.exist(otherPlayers.length);
			assert.typeOf(currentUser, 'number');
			return { damage: dmg, otherPlayers, currentUser };
		};

		describe('attackAll should return correct damaged health points', () => {
			it('damage of 1 to two players from player 1', done => {
				socket1 = ioClient.connect(socketURL, options);
				socket2 = ioClient.connect(socketURL, options);
				socket1.emit('attackAll', dataGenerator(1, [1], 0));

				socket1.on('updateHP', data => {
					assert.typeOf(data, 'array');
				  expect(data[0]).to.equal(10);
				  expect(data[1]).to.equal(9);
				  expect(data[2]).to.equal(10);
				  expect(data[3]).to.equal(10);
				  done();
				});
		  });

			it('damage of 3 to four players from player 3', done => {
				socket1 = ioClient.connect(socketURL, options);
				socket2 = ioClient.connect(socketURL, options);
				socket3 = ioClient.connect(socketURL, options);
				socket4 = ioClient.connect(socketURL, options);

				socket1.emit('attackAll', dataGenerator(3, [0, 1, 3], 2));

				socket1.on('updateHP', data => {
					expect(data).to.be.an('array');
					expect(data).to.have.length(4);
				  expect(data[0]).to.equal(7);
				  expect(data[1]).to.equal(6);
				  expect(data[2]).to.equal(10);
				  expect(data[3]).to.equal(7);
				  done();
				});
		 	});
		});

		// describe('attackOne should return correct damaged health points', () => {
		// 	it('damage of 3 to player 3 from player 1', done => {
		// 		done();
		// 	});

		// 	it('damage of 2 to player 4 from player 1', done => {
		// 		done();
		// 	});
		// });

		describe('increaseVP should return correct increased victory points', () => {
			it('increase victory points of player 3 to 6', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 22 components/player_actions
				const num = 6;
				num.should.be.a('number');
				socket3.emit('increaseVP', num);

				setTimeout(() => {
					socket1.on('updateVP', data => {
			      expect(data).to.be.an('array');
			      expect(data).to.have.length(4);
			      expect(data[0]).to.equal(0);
					  expect(data[1]).to.equal(0);
					  expect(data[2]).to.equal(6);
					  expect(data[3]).to.equal(0);
			      done();
			    });
				}, 10);
			});

			it('increase victory points of player 1 to 3', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 22 components/player_actions
				const num = 3;
				num.should.be.a('number');
				socket1.emit('increaseVP', num);

				socket3.on('updateVP', data => {
		      expect(data).to.be.an('array');
		      expect(data).to.have.length(4);
		      expect(data[0]).to.equal(3);
				  expect(data[1]).to.equal(0);
				  expect(data[2]).to.equal(6);
				  expect(data[3]).to.equal(0);
		      done();
		    });
			});
		});

		describe('leaveTokyo should emit stayOrLeave and updateEmperor', () => {
			it('should get a false in stayOrLeave', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 17 components/emperor_view
				const num = 3;
				num.should.be.a('number');
				socket2.emit('leaveTokyo', num);


				socket2.on('stayOrLeave', data => {
					expect(data).to.equal(false);
				  done();
				});
			});

			it('should update emperor with a number', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 17 components/emperor_view
				const num = 3;
				num.should.be.a('number');
				socket3.emit('leaveTokyo', num);

				socket4.on('updateEmperor', data => {
					expect(data).to.be.a('number');
					expect(data).not.equal(num);
				  done();
				});
			});
		});

		describe('endTurn should emit updates', () => {
			it('should update victory points', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 26 components/player_actions
				const data = {};
				[1, 2, 3, 2, 3, 3].forEach((item) => {
		      if (item > 6) {
		        item = item - 6;
		      }

		      if (data[item]) {
		        data[item]++;
		      } else {
		        data[item] = 1;
		      }
		    });

		    data.should.be.an('object');
				socket4.emit('endTurn', data);

				setTimeout(() => {
					socket4.on('updateVP', data => {
						expect(data).to.be.an('array');
			      expect(data).to.have.length(4);
			      expect(data[0]).to.equal(3);
					  expect(data[1]).to.equal(0);
					  expect(data[2]).to.equal(6);
					  expect(data[3]).to.equal(3);
					  done();
					});
				}, 2);
			});

			it('should update current turn', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 26 components/player_actions
				const data = {};
				[3, 2, 2, 2, 2, 3].forEach((item) => {
		      if (item > 6) {
		        item = item - 6;
		      }

		      if (data[item]) {
		        data[item]++;
		      } else {
		        data[item] = 1;
		      }
		    });

		    data.should.be.an('object');
				socket2.emit('endTurn', data);

				socket2.on('updateTurn', data => {
					expect(data).to.be.a('number');
		      expect(data).to.equal(2);
				  done();
				});
				// VP after = [3, 3, 6, 3]
			});

			it('should update energy', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 26 components/player_actions
				const data = {};
				[3, 4, 5, 5, 2, 6].forEach((item) => {
		      if (item > 6) {
		        item = item - 6; 
		      }

		      if (data[item]) {
		        data[item]++;
		      } else {
		        data[item] = 1;
		      }
		    });

		    data.should.be.an('object');
				
				socket1.emit('endTurn', data);
				setTimeout(() => {
					socket1.on('updateEnergy', data => {
						expect(data).to.be.an('array');
						expect(data).to.have.length(4);
					  expect(data[0]).to.equal(2);
					  expect(data[1]).to.equal(0);
					  expect(data[2]).to.equal(0);
					  expect(data[3]).to.equal(0);
						done();
					});
				}, 1);
			});

			xit('should update health points', done => {
				socket1 = ioClient(socketURL, options);
				socket2 = ioClient(socketURL, options);
				socket3 = ioClient(socketURL, options);
				socket4 = ioClient(socketURL, options);

				// Line 26 components/player_actions
				const data = {};
				[3, 4, 4, 2, 6, 3].forEach((item) => {
		      if (item > 6) {
		        item = item - 6;
		      }

		      if (data[item]) {
		        data[item]++;
		      } else {
		        data[item] = 1;
		      }
		    });

		    data.should.be.an('object');
				socket2.emit('endTurn', data);

				socket2.on('updateHP', data => {
					expect(data).to.be.an('array');
					expect(data).to.have.length(4);
				  expect(data[0]).to.equal(7);
				  expect(data[1]).to.equal(6);
				  expect(data[2]).to.equal(10);
				  expect(data[3]).to.equal(7);
				  done();
				});
			});
		});
	});
});
