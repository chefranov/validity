const td = require('testdouble')
const request = require('superagent')
const samConfig = require('./superagent.stubs')
const stubBrowser = require('./browser.stubs')

describe('validity', () => {
  let validate
  let browserStubs
  let superagentMock

  beforeEach(() => {
    superagentMock = require('superagent-mock')(request, samConfig)
  })

  afterEach(() => {
    td.reset()
    superagentMock.unset()
  })

  it('valid document', async () => {
    browserStubs = stubBrowser({tabId: 1, tabUrl: 'https://valid/document'})
    validate = require('../../src/app')

    await validate()

    td.verify(browserStubs.tabs.executeScript(1, {
      code: ''
    }))
  })

  it('invalid document', async () => {
    browserStubs = stubBrowser({tabId: 1, tabUrl: 'https://invalid/document'})
    validate = require('../../src/app')

    await validate()

    td.verify(browserStubs.tabs.executeScript(1, {
      code: 'console.error("Element “title” must not be empty. (line 5)")'
    }))
  })
})