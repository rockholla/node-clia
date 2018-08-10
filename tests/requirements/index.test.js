import { Requirements } from '../../lib/requirements'

describe('requirements/index', () => {

  it('single executable requirement check should succeed', () => {
    const requirements = new Requirements()
    expect(requirements.check({
      enabled: true,
      executables: [
        {
          name: 'node',
          version: {
            required: '>=8',
            command: 'node --version',
            replace: '[a-zA-Z\\s]+'
          },
          help: ''
        }
      ]
    })).toEqual(true)
  })

  it('single executable requirement check should succeed without a semantic version requirement', () => {
    const requirements = new Requirements()
    expect(requirements.check({
      enabled: true,
      executables: [
        {
          name: 'node',
          version: {
            required: '',
            command: 'node --version',
            replace: '[a-zA-Z\\s]+'
          },
          help: ''
        }
      ]
    })).toEqual(true)
  })

  it('single executable requirement check should throw an error for a binary that does not exist', () => {
    const requirements = new Requirements()
    expect(() => {
      requirements.check({
        enabled: true,
        executables: [
          {
            name: 'doesntexist',
            version: {
              required: '>=1',
              command: 'doesntexist --version',
              replace: '[a-zA-Z\\s]+'
            },
            help: ''
          }
        ]
      })
    }).toThrow()
  })

  it('single executable requirement check should throw an error for a binary that does not exist and without a version requirement', () => {
    const requirements = new Requirements()
    expect(() => {
      requirements.check({
        enabled: true,
        executables: [
          {
            name: 'doesntexist',
            version: {
              required: '>=1',
              command: 'doesntexist --version',
              replace: '[a-zA-Z\\s]+'
            },
            help: ''
          }
        ]
      })
    }).toThrow()
  })

})
