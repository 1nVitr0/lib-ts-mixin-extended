import mixin from '../src';
import { Positionable, Walkable, Jumpable, Loggable } from './mixin.fixture';

describe('mixin', () => {
  class Person extends mixin(Positionable, Walkable, Jumpable) {}
  let person: Person;

  beforeEach(() => {
    person = new Person();
  });

  it('includes mixed in methods', () => {
    expect(person.setPosition).toBeDefined();
    expect(person.forward).toBeDefined();
    expect(person.backward).toBeDefined();
    expect(person.jump).toBeDefined();
  });

  it('executes mixed in methods', () => {
    person.setPosition(1, 1);
    expect(person.x).toBe(1);
    expect(person.y).toBe(1);

    person.forward();
    expect(person.x).toBe(2);
    expect(person.y).toBe(1);

    person.backward();
    expect(person.x).toBe(1);
    expect(person.y).toBe(1);

    person.jump();
    expect(person.x).toBe(1);
    expect(person.y).toBe(2);
  });

  it('can extend empty classes', () => {
    class EmptyExtended extends mixin(class {}, Loggable) {}
    const loggable = new EmptyExtended();
    expect(loggable.log).toBeDefined();
  });
});
