# Typex

This repository aims to be a **TypeScript** port of [CSharpx](https://github.com/gsscoder/csharpx), a functional programming library for **C#**.

I've started it both as a learning experience and for use in production projects.

## Maybe type

For now this is the only type implemented. It is an option type, like **Haskell** `Data.Maybe`.

```ts
import * as maybe from 'maybe'

let maybes = [maybe.nothing, maybe.just(0), maybe.nothing, maybe.just(1)]
let outcome = maybe.catMaybes(maybes)
// outcome: [0, 1]
```

See [tests](https://github.com/gsscoder/Typex/blob/master/tests/maybeSpecs.ts) as documentation.