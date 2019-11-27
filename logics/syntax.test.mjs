import { plParse } from './syntax.mjs'
import { strict as assert } from 'assert'

assert.deepEqual(plParse('A'), 'ERROR')
assert.deepEqual(plParse('(A'), 'ERROR')
assert.deepEqual(plParse('A)'), 'ERROR')
assert.deepEqual(plParse('(A)', ['B']), 'UNDEFINED')
assert.deepEqual(plParse('(A)', ['A']), 'A')
assert.deepEqual(plParse('(A)'), 'A')
assert.deepEqual(plParse('(T)'), true)
assert.deepEqual(plParse('(F)'), false)
assert.deepEqual(plParse('((A))'), 'A')
assert.deepEqual(plParse('(((A)))'), 'A')
assert.deepEqual(plParse('~(A)'), 'ERROR')
assert.deepEqual(plParse('(~A)'), 'ERROR')
assert.deepEqual(plParse('(~(A))'), ['~', 'A'])
assert.deepEqual(plParse('((A)&(B))'), ['&', 'A', 'B'])
assert.deepEqual(plParse('((A)|(B))'), ['|', 'A', 'B'])
assert.deepEqual(plParse('((A)>(B))'), ['>', 'A', 'B'])
assert.deepEqual(plParse('((A)=(B))'), ['=', 'A', 'B'])
assert.deepEqual(plParse('((~(A))&(B))'), ['&', ['~', 'A'], 'B'])
assert.deepEqual(plParse('((A)&(~(B)))'), ['&', 'A', ['~', 'B']])
assert.deepEqual(plParse('(((A)|(B))&(~(C)))'), ['&', ['|', 'A', 'B'], ['~', 'C']])
assert.deepEqual(plParse('(((A)|(B)&(~(C)))'), 'ERROR')
assert.deepEqual(plParse('((A)|(B))&(~(C)))'), 'ERROR')
assert.deepEqual(plParse('(((A)|(B)))&(~(C)))'), 'ERROR')
assert.deepEqual(plParse('(((A)|(B))&(~(C))))'), 'ERROR')
