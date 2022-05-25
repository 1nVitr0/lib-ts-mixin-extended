type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

export type MixinConstructor<T = {}> = new (...args: any[]) => T;

export type MixinFunction<
  T extends MixinConstructor = MixinConstructor,
  R extends T = T & MixinConstructor
> = (Base: T) => R;

export type MixinReturnValue<
  T extends MixinConstructor,
  M extends MixinFunction<T, any>[]
> = UnionToIntersection<
  | T
  | {
      [K in keyof M]: M[K] extends MixinFunction<any, infer U> ? U : never;
    }[number]
>;

export type MixinInstance<F extends MixinFunction<any>> =
  F extends MixinFunction<MixinConstructor<any>, infer R>
    ? InstanceType<R>
    : never;

export default function mixin<
  T extends MixinConstructor,
  M extends MixinFunction<T, any>[]
>(Base: T, ...mixins: M): MixinReturnValue<T, M> {
  return mixins.reduce(
    (mix, applyMixin) => applyMixin(mix),
    Base
  ) as MixinReturnValue<T, M>;
}
