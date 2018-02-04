import rewire from 'rewire'
import {assert} from 'chai'
import sinon from 'sinon'

const nu = rewire('../../../src/checkers/nu/nu.js')

describe('nu', function () {
  describe('api', function () {
    let requestStub
    let configStub
    let transformResultsStub

    beforeEach(() => {
      requestStub = sinon.stub().resolves('{}')
      configStub = {
        get: sinon.stub().returns('http://validator/url')
      }
      transformResultsStub = sinon.stub().returns({})

      nu.__set__('request', requestStub)
      nu.__set__('config', configStub)
      nu.__set__('transformResults', transformResultsStub)
    })

    afterEach(() => {
      nu.__ResetDependency__('request')
      nu.__ResetDependency__('config')
    })

    it('exports a function', function (done) {
      assert.isFunction(nu)
      done()
      // nu().then((value) => {
      //   assert.isObject(value)
      //   done()
      // })
    })

    it('calls request with URL and form data', function (done) {
      let file = new File([''], 'file.html')
      nu(file).then(() => {
        assert.isTrue(requestStub.called)
        assert.isTrue(requestStub.calledWith(
          'http://validator/url',
          'POST'
        ))
        done()
      })
    })
  })

  // describe('transformResults', function () {
  //   let transformResults = nu.__get__('transformResults')

  //   it('is a function', function () {
  //     assert.isFunction(transformResults)
  //   })

  //   it('returns results', function () {
  //     assert(transformResults({}), {})
  //   })
  // })
})
