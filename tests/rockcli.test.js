const rcli = require('../lib')

describe('rockcli', function () {

  it('ensure we have an active config by default, and it includes some of the default config', function () {
    expect(rcli.config).toHaveProperty('active')
    expect(rcli.config.active).toHaveProperty('logger')
    expect(rcli.config.active.logger.level).toEqual('info')
  })

  it('ensure the logger is set to a winston logger', function () {
    expect(rcli.logger).toHaveProperty('info')
  })

})
