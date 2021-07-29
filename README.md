[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm-version](https://img.shields.io/npm/v/ts-mixin-extended?logo=npm)](https://www.npmjs.com/package/ts-mixin-extended)

# ts-mixin-extended

Extended `mixin` function for TypeScript.
Offers support for chaining `mixins` extending a common base class or exposing methods not depending on one.

Since TypeScript 2.2 Mix-in classes are supported, but still somewhat unwieldy.
This packages aims to simplify chainning mixins while still offering all the Typings support and most of the flexibility of native ts:

```typescript
// Default approach
class Dog extends Domesticated(Barking(PackHunting(Carnivore(FourLegged(Animal))))) {}

// Using the extended mixin function
class Dog extends mixin(Animal, FourLegged, Carnivore, PackHunting, Barking, Domesticated) {}
```

- [ts-mixin-extended](#ts-mixin-extended)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

# Features

- comprehensible chaining of mixins
- strong typechecking for mixins with a common base class

# Usage

The package exposes one, and only one, function: `mixin`.
It accepts one base class and, all of them standalone or extending the base class:

```typescript
import mixin, { MixinConstructor } from '../src';

class Positionable {
  public constructor(public x = 0, public y = 0) {}
  public setPosition(x: number, y: number) { this.x = x; this.y = y; }
}

function Walkable<TBase extends MixinConstructor<Positionable>>(Base: TBase) {
  return class Walkable extends Base {
    public forward() { this.x++; }
    public backward() { this.x--; }
  };
}

function Jumpable<TBase extends MixinConstructor<Positionable>>(Base: TBase) {
  return class Jumpable extends Base {
    public jump() { this.y++; }
  };
}

// Person now has the attributes `x` and `y` and the methods:
//   `setPosition`, `forward`, `backward` and `jump`
class Person extends mixin(Positionable, Walkable, Jumpable) {}
```

For mixins not extending a common base class, an empty anonymous class can be given:

```typescript
export function Loggable(Base: MixinConstructor) {
  return class Loggable extends Base {
    public log(message: string) { throw new Error(404); }
  };
}
export function Screamable(Base: MixinConstructor) {
  return class Screamable extends Base {
    public scream(message: string) { console.log(message.slice(0, 140).toUpperCase()); }
  };
}

class TheInternet extends mixin(class {}, Loggable, Screamable) {}
```

# License

[MIT](https://github.com/1nVitr0/lib-ts-mixin-extended/blob/main/LICENSE)