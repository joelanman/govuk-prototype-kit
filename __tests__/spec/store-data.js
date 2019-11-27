/* eslint-env jest */
const utils = require('../../lib/utils.js')

describe('storeData', () => {
  it('should add key value pair into session data', async () => {
    let sessionData = {}

    const inputData = {
      'first-name': 'Joe'
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'first-name': 'Joe'
    })
  })

  it('should ignore input data where the name starts with _', async () => {
    let sessionData = {}

    const inputData = {
      '_temp-key': 'ABC'
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({})
  })

  it('should remove _unchecked value from an array of selected checkboxes', async () => {
    let sessionData = {}

    const inputData = {
      'vehicle-features': [
        'Heated seats',
        'GPS',
        'Radio',
        '_unchecked'
      ]
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'vehicle-features': [
        'Heated seats',
        'GPS',
        'Radio'
      ]
    })
  })

  it('should remove checkbox values if only _unchecked is sent', async () => {
    let sessionData = {
      'vehicle-features': [
        'Heated seats',
        'GPS',
        'Radio'
      ]
    }

    const inputData = {
      'vehicle-features': [
        '_unchecked'
      ]
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'vehicle-features': []
    })
  })

  it('should add an object into session data', async () => {
    let sessionData = {}

    const inputData = {
      'claimant': {
        'first-name': 'Joe'
      }
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'claimant': {
        'first-name': 'Joe'
      }
    })
  })

  it('should update a key value pair in session data', async () => {
    let sessionData = {
      'first-name': 'Joe'
    }

    const inputData = {
      'first-name': 'Hanna'
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'first-name': 'Hanna'
    })
  })

  it('should update an object in session data', async () => {
    let sessionData = {
      'claimant': {
        'first-name': 'Joe'
      }
    }

    const inputData = {
      'claimant': {
        'first-name': 'Hanna'
      }
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'claimant': {
        'first-name': 'Hanna'
      }
    })
  })

  it('should append to an object in session data', async () => {
    let sessionData = {
      'claimant': {
        'first-name': 'Joe'
      }
    }

    const inputData = {
      'claimant': {
        'status': 'Pending'
      }
    }

    utils.storeData(inputData, sessionData)

    expect(sessionData).toEqual({
      'claimant': {
        'first-name': 'Joe',
        'status': 'Pending'
      }
    })
  })

})
