let moduleRoot = '../es6';
if (process.env.TEST_RELEASE) {
  moduleRoot = '../dist';
}

const tunnels = require(moduleRoot);

describe('tunnels', () => {
  it('works', async () => {
    const result = await tunnels();
    result.should.be.equal(42);
  });
});

