import useUniqId from './useUniqId'

describe('get useUniqId', () => {
  it('get string uniq id', () => {
    const generate = useUniqId()
    const isString = typeof generate === 'string'

    expect(isString).toBe(true)
    expect(generate).toHaveLength(16)
  })
})
