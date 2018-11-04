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

  it('test regex scenarios', () => {
    const versionOutput = 'Terraform v0.11.10\n\nThere\'s a newer version of Terraform available'
    const replace = '(Terraform\\sv|\\n.*)'
    expect(versionOutput.replace(new RegExp(replace, 'g'), '').trim()).toEqual('0.11.10')
  })

  it('test version number massaging', () => {
    expect('10.07.0'.replace(/(\.|^)0+([0-9]+)/g, '$1$2')).toEqual('10.7.0')
    expect('08.7.0'.replace(/(\.|^)0+([0-9]+)/g, '$1$2')).toEqual('8.7.0')
    expect('08.007.000001'.replace(/(\.|^)0+([0-9]+)/g, '$1$2')).toEqual('8.7.1')
  })

})
