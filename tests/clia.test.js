const clia = require('../lib')

describe('clia', function () {

  it('ensure we have an active config by default, and it includes some of the default config', function () {
    expect(clia.config).toHaveProperty('active')
    expect(clia.config.active).toHaveProperty('logger')
    expect(clia.config.active.logger.level).toEqual('info')
  })

  it('ensure the logger is set to a winston logger', function () {
    expect(clia.logger).toHaveProperty('info')
  })

})
