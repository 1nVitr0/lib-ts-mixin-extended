import { MixinConstructor } from '../src';

export class Positionable {
  public x: number;
  public y: number;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Nameable {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }
}

export function Walkable<TBase extends MixinConstructor<Positionable>>(
  Base: TBase
) {
  return class Walkable extends Base {
    public forward() {
      this.x++;
    }
    public backward() {
      this.x--;
    }
  };
}

export function Jumpable<TBase extends MixinConstructor<Positionable>>(
  Base: TBase
) {
  return class Jumpable extends Base {
    public jump() {
      this.y++;
    }
  };
}

export function Loggable<TBase extends MixinConstructor>(Base: TBase) {
  return class Loggable extends Base {
    public log(data: string) {
      console.log(data);
    }
  };
}

export function Greetable<TBase extends MixinConstructor<Nameable>>(
  Base: TBase
) {
  return class Greetable extends Base {
    public sayHello() {
      console.log(`Hello ${this.name}!`);
    }
  };
}
