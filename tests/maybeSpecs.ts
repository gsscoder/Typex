import * as maybe from '../src/maybe'
import { expect  } from 'chai'

describe('maybe specs', () => {
    it('should build just', () => {
        let value = Math.random()
        let outcome = maybe.just(value)
        expect(maybe.fromJust(outcome)).to.be.equal(value);
    })
    it('should return proper maybe', () => {
        let value = Math.random()
        const theories = [
            [null, maybe.nothing],
            [undefined, maybe.nothing],
            [value, maybe.just(value)]
        ]
        theories.forEach(([value, expected]) => {
            let outcome = maybe.fromValue(value)
            expect(outcome).to.be.deep.equal(expected)
        })
    })
    it('should bind a value', () => {
        let value = Math.random()
        let outcome = maybe.bind(maybe.just(value), n => maybe.just(n / 2))
        expect(outcome).to.be.deep.equal(maybe.just(value / 2))
    })
    it('should unwrap a value in case of just', () => {
        let value = Math.random()
        let sut = maybe.just(value)
        let outcome = maybe.fromJust(sut)
        expect(outcome).to.be.equal(value)
    })
    it('should lazily return from a function in case of nothing', () => {
        let value = Math.random()
        let outcome = maybe.fromJustLazy(maybe.nothing, () => value)
        expect(outcome).to.be.equal(value)
    })
    it('should return just values from an array', () => {
        let maybes = [maybe.nothing, maybe.just(0), maybe.nothing, maybe.just(1)]
        let outcome = maybe.catMaybes(maybes)
        expect(outcome).to.be.deep.equal([0, 1])
    })
    it('should throw out just values from an array', () => {
        let readInt:(v: string) => maybe.Maybe<number>;
        readInt = function(value: string) :  maybe.Maybe<number> {
            let result = Number(value)
            return isNaN(result) ? maybe.nothing : maybe.just(result)
        }
        var values = ["0", "a", "1", "b0", "2", "c"]
        var outcome = maybe.mapMaybes(values, readInt)
        expect(outcome).to.be.deep.equal([0, 1, 2])
    })
})