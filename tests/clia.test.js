import clia, { config, logger } from '../lib'

describe('clia', () => {

  it('ensure imported clia is of type Clia', () => {
    expect(typeof clia).toBe('object')
  })

  it('ensure we have an active config by default, and it includes some of the default config', () => {
    expect(config).toHaveProperty('active')
    expect(config.active).toHaveProperty('logger')
    expect(config.active.logger.level).toEqual('info')
  })

  it('ensure the logger is set to a winston logger', () => {
    expect(logger).toHaveProperty('info')
  })

})
