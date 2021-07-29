/* tslint:disable */
import {
  expectType,
  expectError as expectTypeError,
  expectAssignable,
} from 'tsd';
import mixin from '../src';
import {
  Positionable,
  Walkable,
  Jumpable,
  Loggable,
  Greetable,
} from './mixin.fixture';
import { MixinInstance } from '../src/index';

type WalkableInstance = MixinInstance<typeof Walkable>;
type JumpableInstance = MixinInstance<typeof Jumpable>;
type LoggableInstance = MixinInstance<typeof Loggable>;

describe('mixin types', () => {
  class Person extends mixin(Positionable, Walkable, Jumpable) {}
  class LoggablePerson extends mixin(Person, Loggable) {}
  let person: Person;
  let loggablePerson: LoggablePerson;

  beforeEach(() => {
    person = new Person();
    loggablePerson = new LoggablePerson();
  });

  it('is of correct type', () => {
    expectType<Person>(person);
  });

  it('is assignable to Base', () => {
    expectAssignable<Positionable>(person);
  });

  it('is assignable to all mixed in types', () => {
    expectAssignable<WalkableInstance>(person);
    expectAssignable<JumpableInstance>(person);
  });

  it('can do nested mixins', () => {
    class NestedLoggablePerson extends mixin(
      mixin(Positionable, Loggable),
      Walkable,
      Jumpable
    ) {}
    const nested = new NestedLoggablePerson();
    expectType<NestedLoggablePerson>(nested);
    expectAssignable<Positionable>(nested);
    expectAssignable<LoggableInstance>(nested);
    expectAssignable<WalkableInstance>(nested);
    expectAssignable<JumpableInstance>(nested);
  });

  it('can mixin standalone classes', () => {
    expectAssignable<Person>(loggablePerson);
    expectAssignable<LoggableInstance>(loggablePerson);
  });

  it('does not allow incompatible classes', () => {
    // @ts-expect-error Greetable uses properties not in Positionable
    expectTypeError(mixin(Positionable, Greetable));
  });
});
