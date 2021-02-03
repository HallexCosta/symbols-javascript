const { deepStrictEqual, throws } = require('assert')
const Heroes = require('./heroes')
const heroes = new Heroes()

;
(async () => {
  
  heroes.add('Hállex', 'Costa')
  heroes.add('Violet', 'Evergarden')

  // console.log('heroes', heroes)
  // console.log('heroes.toString()', heroes.toString())
  // console.log('heroes * 1', heroes * 1)
  // console.log('[...heroes]', [...heroes])

  deepStrictEqual(heroes.toString(), '\nHállex Costa\nViolet Evergarden')
  deepStrictEqual(String(heroes), '\nHállex Costa\nViolet Evergarden')
  throws(() => heroes * 1, { name: 'TypeError', message: 'Invalid conversion!'})

  const expectedItems = [
    { firstName: 'Hállex', lastName: 'Costa' },
    { firstName: 'Violet', lastName: 'Evergarden' }
  ]

  // .iterator
  deepStrictEqual([...heroes], expectedItems)
  deepStrictEqual(Array.from(heroes), expectedItems)

  { 
    const items = []
    for (const item of heroes) { items.push(item) }
    deepStrictEqual(items, expectedItems)
    // console.log(items)
  }

  // .asyncIterator
  {
    const items = []
    for await (const hero of heroes) { items.push(hero) }
    const expectedKeys = ['id', 'firstName', 'lastName']

    deepStrictEqual(items.filter(({ id }) => id > 0).length, 2)
    deepStrictEqual(Object.keys(items[0]), expectedKeys)
  }
})()
