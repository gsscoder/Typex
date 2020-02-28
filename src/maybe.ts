// Discriminator for Maybe.
enum Tag { Nothing, Just }


/**
 * Models a `Maybe` when in empty state.
 */
export interface Nothing {
    readonly _tag: Tag.Nothing
}

/**
 * Models a `Maybe` when contains a value.
 */
export interface Just<T> {
    readonly _tag: Tag.Just
    readonly value: T
}

/**
 * The `Maybe` type models an optional value. A value of type `Maybe` either contains
 * a value (represented as `Just`), or it is empty (represented as `Nothing`).
 */
export type Maybe<T> = Nothing | Just<T>

//#region Value Case Constructors
/**
 * Builds the empty case of `Maybe`.
 */
export const nothing: Maybe<never> = { _tag: Tag.Nothing }

/**
 * Builds the empty case of `Maybe`.
 */
export function just<T>(value: T): Maybe<T> {
    return { _tag: Tag.Just, value: value }
}
//#endregion

//#region Monad
export function bind<T, U>(maybe: Maybe<T>, onJust : (v: T) => Maybe<U>) : Maybe<U> {
    return isJust(maybe) ? onJust(maybe.value) : nothing
}

export function fromValue<T>(value: T) : Maybe<T> {
    return value === undefined || value === null ? nothing : just(value)
}
//#endregion

//#region  Functor
export function map<T, U>(maybe: Maybe<T>, onJust : (v: T) => U) : Maybe<U> {
    return isJust(maybe) ? just(onJust(maybe.value)) : nothing
}
//#endregion

/**
 * Returns `true` if it is in form of `Nothing`.
 */
export function isNothing<T>(maybe: Maybe<T>): maybe is Nothing {
    return maybe._tag === Tag.Nothing
}

/**
 * Returns `true` if it is in form of `Just`.ß
 */
export function isJust<T>(maybe: Maybe<T>): maybe is Just<T> {
    return maybe._tag === Tag.Just
}

/**
 * Extracts the element out of <c>Just</c> and returns a default value or `defaultValue`
 * if it is in form of `Nothing`. 
 */
export function fromJust<T>(maybe: Maybe<T>, defaultValue : T = undefined) : T{
    return isJust(maybe) ? maybe.value : defaultValue
}

/**
 * Lazy version of `fromJust`. Extracts the element out of `Just` and returns
 * a default value returned by `defaultValuw` function if it is in form of `Nothing`.
 */
export function fromJustLazy<T>(maybe: Maybe<T>, defaultValue : () => T) : T {
    return isJust(maybe) ? maybe.value : defaultValue()
}

export function fromJustOrFail<T>(maybe: Maybe<T>, error: Error = null) : T {
    if (isJust(maybe)) return maybe.value
    throw error === null ? new Error('The value is empty.') : error
}

export function toArray<T>(maybe: Maybe<T>) : T[] {
    return isJust(maybe) ? [maybe.value] : []
}

export function catMaybes<T>(maybes: Maybe<T>[]) : T[] {
    let result : T[] = []
    for (let maybe of maybes) {
        if (isJust(maybe)) result.push(maybe.value)
    }
    return result
}

export function mapMaybes<T, U>(values : T[], onValue : (v : T) => Maybe<U>) : U[] {
    let result : U[] = []
    for (let value of values) {
        let maybe = onValue(value)
        if (isJust(maybe)) result.push(maybe.value)
    }
    return result
}