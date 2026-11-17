
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Progreso
 * 
 */
export type Progreso = $Result.DefaultSelection<Prisma.$ProgresoPayload>
/**
 * Model ProgresoParcial
 * REQ-006: actividad a medias (ronda, puntos y vidas) para retomarla al volver a entrar con la misma cuenta.
 * Se borra al completar la actividad o al reiniciarla.
 */
export type ProgresoParcial = $Result.DefaultSelection<Prisma.$ProgresoParcialPayload>
/**
 * Model Nivel
 * REQ-011: contenido de las misiones. Un nivel agrupa actividades; cada actividad elige un juego por clave.
 */
export type Nivel = $Result.DefaultSelection<Prisma.$NivelPayload>
/**
 * Model Actividad
 * 
 */
export type Actividad = $Result.DefaultSelection<Prisma.$ActividadPayload>
/**
 * Model RecuperacionPassword
 * REQ-010: enlace de un solo uso para restablecer la contraseña. Se guarda el hash, no el enlace.
 */
export type RecuperacionPassword = $Result.DefaultSelection<Prisma.$RecuperacionPasswordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Rol: {
  estudiante: 'estudiante',
  admin: 'admin'
};

export type Rol = (typeof Rol)[keyof typeof Rol]

}

export type Rol = $Enums.Rol

export const Rol: typeof $Enums.Rol

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progreso`: Exposes CRUD operations for the **Progreso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Progresos
    * const progresos = await prisma.progreso.findMany()
    * ```
    */
  get progreso(): Prisma.ProgresoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progresoParcial`: Exposes CRUD operations for the **ProgresoParcial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgresoParcials
    * const progresoParcials = await prisma.progresoParcial.findMany()
    * ```
    */
  get progresoParcial(): Prisma.ProgresoParcialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nivel`: Exposes CRUD operations for the **Nivel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nivels
    * const nivels = await prisma.nivel.findMany()
    * ```
    */
  get nivel(): Prisma.NivelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actividad`: Exposes CRUD operations for the **Actividad** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Actividads
    * const actividads = await prisma.actividad.findMany()
    * ```
    */
  get actividad(): Prisma.ActividadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recuperacionPassword`: Exposes CRUD operations for the **RecuperacionPassword** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecuperacionPasswords
    * const recuperacionPasswords = await prisma.recuperacionPassword.findMany()
    * ```
    */
  get recuperacionPassword(): Prisma.RecuperacionPasswordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Progreso: 'Progreso',
    ProgresoParcial: 'ProgresoParcial',
    Nivel: 'Nivel',
    Actividad: 'Actividad',
    RecuperacionPassword: 'RecuperacionPassword'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "progreso" | "progresoParcial" | "nivel" | "actividad" | "recuperacionPassword"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Progreso: {
        payload: Prisma.$ProgresoPayload<ExtArgs>
        fields: Prisma.ProgresoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgresoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgresoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          findFirst: {
            args: Prisma.ProgresoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgresoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          findMany: {
            args: Prisma.ProgresoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>[]
          }
          create: {
            args: Prisma.ProgresoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          createMany: {
            args: Prisma.ProgresoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgresoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>[]
          }
          delete: {
            args: Prisma.ProgresoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          update: {
            args: Prisma.ProgresoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          deleteMany: {
            args: Prisma.ProgresoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgresoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgresoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>[]
          }
          upsert: {
            args: Prisma.ProgresoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoPayload>
          }
          aggregate: {
            args: Prisma.ProgresoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgreso>
          }
          groupBy: {
            args: Prisma.ProgresoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgresoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgresoCountArgs<ExtArgs>
            result: $Utils.Optional<ProgresoCountAggregateOutputType> | number
          }
        }
      }
      ProgresoParcial: {
        payload: Prisma.$ProgresoParcialPayload<ExtArgs>
        fields: Prisma.ProgresoParcialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgresoParcialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgresoParcialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          findFirst: {
            args: Prisma.ProgresoParcialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgresoParcialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          findMany: {
            args: Prisma.ProgresoParcialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>[]
          }
          create: {
            args: Prisma.ProgresoParcialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          createMany: {
            args: Prisma.ProgresoParcialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgresoParcialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>[]
          }
          delete: {
            args: Prisma.ProgresoParcialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          update: {
            args: Prisma.ProgresoParcialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          deleteMany: {
            args: Prisma.ProgresoParcialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgresoParcialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgresoParcialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>[]
          }
          upsert: {
            args: Prisma.ProgresoParcialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgresoParcialPayload>
          }
          aggregate: {
            args: Prisma.ProgresoParcialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgresoParcial>
          }
          groupBy: {
            args: Prisma.ProgresoParcialGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgresoParcialGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgresoParcialCountArgs<ExtArgs>
            result: $Utils.Optional<ProgresoParcialCountAggregateOutputType> | number
          }
        }
      }
      Nivel: {
        payload: Prisma.$NivelPayload<ExtArgs>
        fields: Prisma.NivelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NivelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NivelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          findFirst: {
            args: Prisma.NivelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NivelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          findMany: {
            args: Prisma.NivelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>[]
          }
          create: {
            args: Prisma.NivelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          createMany: {
            args: Prisma.NivelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NivelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>[]
          }
          delete: {
            args: Prisma.NivelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          update: {
            args: Prisma.NivelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          deleteMany: {
            args: Prisma.NivelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NivelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NivelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>[]
          }
          upsert: {
            args: Prisma.NivelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NivelPayload>
          }
          aggregate: {
            args: Prisma.NivelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNivel>
          }
          groupBy: {
            args: Prisma.NivelGroupByArgs<ExtArgs>
            result: $Utils.Optional<NivelGroupByOutputType>[]
          }
          count: {
            args: Prisma.NivelCountArgs<ExtArgs>
            result: $Utils.Optional<NivelCountAggregateOutputType> | number
          }
        }
      }
      Actividad: {
        payload: Prisma.$ActividadPayload<ExtArgs>
        fields: Prisma.ActividadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActividadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActividadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          findFirst: {
            args: Prisma.ActividadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActividadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          findMany: {
            args: Prisma.ActividadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          create: {
            args: Prisma.ActividadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          createMany: {
            args: Prisma.ActividadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActividadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          delete: {
            args: Prisma.ActividadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          update: {
            args: Prisma.ActividadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          deleteMany: {
            args: Prisma.ActividadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActividadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActividadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>[]
          }
          upsert: {
            args: Prisma.ActividadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActividadPayload>
          }
          aggregate: {
            args: Prisma.ActividadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActividad>
          }
          groupBy: {
            args: Prisma.ActividadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActividadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActividadCountArgs<ExtArgs>
            result: $Utils.Optional<ActividadCountAggregateOutputType> | number
          }
        }
      }
      RecuperacionPassword: {
        payload: Prisma.$RecuperacionPasswordPayload<ExtArgs>
        fields: Prisma.RecuperacionPasswordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecuperacionPasswordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecuperacionPasswordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          findFirst: {
            args: Prisma.RecuperacionPasswordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecuperacionPasswordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          findMany: {
            args: Prisma.RecuperacionPasswordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>[]
          }
          create: {
            args: Prisma.RecuperacionPasswordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          createMany: {
            args: Prisma.RecuperacionPasswordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecuperacionPasswordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>[]
          }
          delete: {
            args: Prisma.RecuperacionPasswordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          update: {
            args: Prisma.RecuperacionPasswordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          deleteMany: {
            args: Prisma.RecuperacionPasswordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecuperacionPasswordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecuperacionPasswordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>[]
          }
          upsert: {
            args: Prisma.RecuperacionPasswordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecuperacionPasswordPayload>
          }
          aggregate: {
            args: Prisma.RecuperacionPasswordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecuperacionPassword>
          }
          groupBy: {
            args: Prisma.RecuperacionPasswordGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecuperacionPasswordGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecuperacionPasswordCountArgs<ExtArgs>
            result: $Utils.Optional<RecuperacionPasswordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    progreso?: ProgresoOmit
    progresoParcial?: ProgresoParcialOmit
    nivel?: NivelOmit
    actividad?: ActividadOmit
    recuperacionPassword?: RecuperacionPasswordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    progreso: number
    parciales: number
    recuperaciones: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progreso?: boolean | UsuarioCountOutputTypeCountProgresoArgs
    parciales?: boolean | UsuarioCountOutputTypeCountParcialesArgs
    recuperaciones?: boolean | UsuarioCountOutputTypeCountRecuperacionesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountProgresoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountParcialesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoParcialWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountRecuperacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecuperacionPasswordWhereInput
  }


  /**
   * Count Type NivelCountOutputType
   */

  export type NivelCountOutputType = {
    actividades: number
  }

  export type NivelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actividades?: boolean | NivelCountOutputTypeCountActividadesArgs
  }

  // Custom InputTypes
  /**
   * NivelCountOutputType without action
   */
  export type NivelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NivelCountOutputType
     */
    select?: NivelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NivelCountOutputType without action
   */
  export type NivelCountOutputTypeCountActividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActividadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
    neuronas: number | null
    maxNeuronas: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
    neuronas: number | null
    maxNeuronas: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    rol: $Enums.Rol | null
    modoPruebas: boolean | null
    visibleEnRanking: boolean | null
    creadoEn: Date | null
    terminosVersion: string | null
    terminosAceptadosEn: Date | null
    neuronas: number | null
    maxNeuronas: number | null
    ultimaRecarga: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    rol: $Enums.Rol | null
    modoPruebas: boolean | null
    visibleEnRanking: boolean | null
    creadoEn: Date | null
    terminosVersion: string | null
    terminosAceptadosEn: Date | null
    neuronas: number | null
    maxNeuronas: number | null
    ultimaRecarga: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    rol: number
    modoPruebas: number
    visibleEnRanking: number
    creadoEn: number
    terminosVersion: number
    terminosAceptadosEn: number
    neuronas: number
    maxNeuronas: number
    ultimaRecarga: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
    neuronas?: true
    maxNeuronas?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
    neuronas?: true
    maxNeuronas?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    modoPruebas?: true
    visibleEnRanking?: true
    creadoEn?: true
    terminosVersion?: true
    terminosAceptadosEn?: true
    neuronas?: true
    maxNeuronas?: true
    ultimaRecarga?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    modoPruebas?: true
    visibleEnRanking?: true
    creadoEn?: true
    terminosVersion?: true
    terminosAceptadosEn?: true
    neuronas?: true
    maxNeuronas?: true
    ultimaRecarga?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    rol?: true
    modoPruebas?: true
    visibleEnRanking?: true
    creadoEn?: true
    terminosVersion?: true
    terminosAceptadosEn?: true
    neuronas?: true
    maxNeuronas?: true
    ultimaRecarga?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    rol: $Enums.Rol
    modoPruebas: boolean
    visibleEnRanking: boolean
    creadoEn: Date
    terminosVersion: string | null
    terminosAceptadosEn: Date | null
    neuronas: number
    maxNeuronas: number
    ultimaRecarga: Date | null
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: boolean
    terminosVersion?: boolean
    terminosAceptadosEn?: boolean
    neuronas?: boolean
    maxNeuronas?: boolean
    ultimaRecarga?: boolean
    progreso?: boolean | Usuario$progresoArgs<ExtArgs>
    parciales?: boolean | Usuario$parcialesArgs<ExtArgs>
    recuperaciones?: boolean | Usuario$recuperacionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: boolean
    terminosVersion?: boolean
    terminosAceptadosEn?: boolean
    neuronas?: boolean
    maxNeuronas?: boolean
    ultimaRecarga?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: boolean
    terminosVersion?: boolean
    terminosAceptadosEn?: boolean
    neuronas?: boolean
    maxNeuronas?: boolean
    ultimaRecarga?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: boolean
    terminosVersion?: boolean
    terminosAceptadosEn?: boolean
    neuronas?: boolean
    maxNeuronas?: boolean
    ultimaRecarga?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "rol" | "modoPruebas" | "visibleEnRanking" | "creadoEn" | "terminosVersion" | "terminosAceptadosEn" | "neuronas" | "maxNeuronas" | "ultimaRecarga", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progreso?: boolean | Usuario$progresoArgs<ExtArgs>
    parciales?: boolean | Usuario$parcialesArgs<ExtArgs>
    recuperaciones?: boolean | Usuario$recuperacionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      progreso: Prisma.$ProgresoPayload<ExtArgs>[]
      parciales: Prisma.$ProgresoParcialPayload<ExtArgs>[]
      recuperaciones: Prisma.$RecuperacionPasswordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      /**
       * Nombre de usuario: con él se inicia sesión y es el alias público en ranking y comunidad. En minúsculas, único.
       */
      username: string
      /**
       * Correo: solo para recuperar el acceso (REQ-010). No se muestra a otros usuarios.
       */
      email: string
      /**
       * Hash scrypt ("scrypt$..."); nunca la contraseña en texto.
       */
      password: string
      rol: $Enums.Rol
      /**
       * Cuenta de pruebas: ve todo el contenido desbloqueado sin ser admin. No da acceso al panel de administración.
       */
      modoPruebas: boolean
      /**
       * REQ-008: el estudiante puede excluirse del ranking. Por defecto aparece, con su alias.
       */
      visibleEnRanking: boolean
      creadoEn: Date
      /**
       * REQ-021: versión de los términos que aceptó al registrarse y cuándo. Nulos en cuentas anteriores.
       */
      terminosVersion: string | null
      terminosAceptadosEn: Date | null
      neuronas: number
      maxNeuronas: number
      ultimaRecarga: Date | null
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    progreso<T extends Usuario$progresoArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$progresoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parciales<T extends Usuario$parcialesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$parcialesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recuperaciones<T extends Usuario$recuperacionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$recuperacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly username: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'Rol'>
    readonly modoPruebas: FieldRef<"Usuario", 'Boolean'>
    readonly visibleEnRanking: FieldRef<"Usuario", 'Boolean'>
    readonly creadoEn: FieldRef<"Usuario", 'DateTime'>
    readonly terminosVersion: FieldRef<"Usuario", 'String'>
    readonly terminosAceptadosEn: FieldRef<"Usuario", 'DateTime'>
    readonly neuronas: FieldRef<"Usuario", 'Int'>
    readonly maxNeuronas: FieldRef<"Usuario", 'Int'>
    readonly ultimaRecarga: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.progreso
   */
  export type Usuario$progresoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    where?: ProgresoWhereInput
    orderBy?: ProgresoOrderByWithRelationInput | ProgresoOrderByWithRelationInput[]
    cursor?: ProgresoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgresoScalarFieldEnum | ProgresoScalarFieldEnum[]
  }

  /**
   * Usuario.parciales
   */
  export type Usuario$parcialesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    where?: ProgresoParcialWhereInput
    orderBy?: ProgresoParcialOrderByWithRelationInput | ProgresoParcialOrderByWithRelationInput[]
    cursor?: ProgresoParcialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgresoParcialScalarFieldEnum | ProgresoParcialScalarFieldEnum[]
  }

  /**
   * Usuario.recuperaciones
   */
  export type Usuario$recuperacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    where?: RecuperacionPasswordWhereInput
    orderBy?: RecuperacionPasswordOrderByWithRelationInput | RecuperacionPasswordOrderByWithRelationInput[]
    cursor?: RecuperacionPasswordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecuperacionPasswordScalarFieldEnum | RecuperacionPasswordScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Progreso
   */

  export type AggregateProgreso = {
    _count: ProgresoCountAggregateOutputType | null
    _avg: ProgresoAvgAggregateOutputType | null
    _sum: ProgresoSumAggregateOutputType | null
    _min: ProgresoMinAggregateOutputType | null
    _max: ProgresoMaxAggregateOutputType | null
  }

  export type ProgresoAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    score: number | null
    tiempo: number | null
  }

  export type ProgresoSumAggregateOutputType = {
    id: number | null
    userId: number | null
    score: number | null
    tiempo: number | null
  }

  export type ProgresoMinAggregateOutputType = {
    id: number | null
    userId: number | null
    seccion: string | null
    nivel: string | null
    actividad: string | null
    completado: boolean | null
    score: number | null
    tiempo: number | null
    fecha: Date | null
  }

  export type ProgresoMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    seccion: string | null
    nivel: string | null
    actividad: string | null
    completado: boolean | null
    score: number | null
    tiempo: number | null
    fecha: Date | null
  }

  export type ProgresoCountAggregateOutputType = {
    id: number
    userId: number
    seccion: number
    nivel: number
    actividad: number
    completado: number
    score: number
    tiempo: number
    fecha: number
    _all: number
  }


  export type ProgresoAvgAggregateInputType = {
    id?: true
    userId?: true
    score?: true
    tiempo?: true
  }

  export type ProgresoSumAggregateInputType = {
    id?: true
    userId?: true
    score?: true
    tiempo?: true
  }

  export type ProgresoMinAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    completado?: true
    score?: true
    tiempo?: true
    fecha?: true
  }

  export type ProgresoMaxAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    completado?: true
    score?: true
    tiempo?: true
    fecha?: true
  }

  export type ProgresoCountAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    completado?: true
    score?: true
    tiempo?: true
    fecha?: true
    _all?: true
  }

  export type ProgresoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progreso to aggregate.
     */
    where?: ProgresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresos to fetch.
     */
    orderBy?: ProgresoOrderByWithRelationInput | ProgresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Progresos
    **/
    _count?: true | ProgresoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgresoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgresoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgresoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgresoMaxAggregateInputType
  }

  export type GetProgresoAggregateType<T extends ProgresoAggregateArgs> = {
        [P in keyof T & keyof AggregateProgreso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgreso[P]>
      : GetScalarType<T[P], AggregateProgreso[P]>
  }




  export type ProgresoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoWhereInput
    orderBy?: ProgresoOrderByWithAggregationInput | ProgresoOrderByWithAggregationInput[]
    by: ProgresoScalarFieldEnum[] | ProgresoScalarFieldEnum
    having?: ProgresoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgresoCountAggregateInputType | true
    _avg?: ProgresoAvgAggregateInputType
    _sum?: ProgresoSumAggregateInputType
    _min?: ProgresoMinAggregateInputType
    _max?: ProgresoMaxAggregateInputType
  }

  export type ProgresoGroupByOutputType = {
    id: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha: Date
    _count: ProgresoCountAggregateOutputType | null
    _avg: ProgresoAvgAggregateOutputType | null
    _sum: ProgresoSumAggregateOutputType | null
    _min: ProgresoMinAggregateOutputType | null
    _max: ProgresoMaxAggregateOutputType | null
  }

  type GetProgresoGroupByPayload<T extends ProgresoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgresoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgresoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgresoGroupByOutputType[P]>
            : GetScalarType<T[P], ProgresoGroupByOutputType[P]>
        }
      >
    >


  export type ProgresoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    completado?: boolean
    score?: boolean
    tiempo?: boolean
    fecha?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progreso"]>

  export type ProgresoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    completado?: boolean
    score?: boolean
    tiempo?: boolean
    fecha?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progreso"]>

  export type ProgresoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    completado?: boolean
    score?: boolean
    tiempo?: boolean
    fecha?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progreso"]>

  export type ProgresoSelectScalar = {
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    completado?: boolean
    score?: boolean
    tiempo?: boolean
    fecha?: boolean
  }

  export type ProgresoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "seccion" | "nivel" | "actividad" | "completado" | "score" | "tiempo" | "fecha", ExtArgs["result"]["progreso"]>
  export type ProgresoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProgresoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProgresoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ProgresoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Progreso"
    objects: {
      user: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      seccion: string
      nivel: string
      actividad: string
      completado: boolean
      score: number
      tiempo: number
      fecha: Date
    }, ExtArgs["result"]["progreso"]>
    composites: {}
  }

  type ProgresoGetPayload<S extends boolean | null | undefined | ProgresoDefaultArgs> = $Result.GetResult<Prisma.$ProgresoPayload, S>

  type ProgresoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgresoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgresoCountAggregateInputType | true
    }

  export interface ProgresoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Progreso'], meta: { name: 'Progreso' } }
    /**
     * Find zero or one Progreso that matches the filter.
     * @param {ProgresoFindUniqueArgs} args - Arguments to find a Progreso
     * @example
     * // Get one Progreso
     * const progreso = await prisma.progreso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgresoFindUniqueArgs>(args: SelectSubset<T, ProgresoFindUniqueArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Progreso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgresoFindUniqueOrThrowArgs} args - Arguments to find a Progreso
     * @example
     * // Get one Progreso
     * const progreso = await prisma.progreso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgresoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgresoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progreso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoFindFirstArgs} args - Arguments to find a Progreso
     * @example
     * // Get one Progreso
     * const progreso = await prisma.progreso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgresoFindFirstArgs>(args?: SelectSubset<T, ProgresoFindFirstArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progreso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoFindFirstOrThrowArgs} args - Arguments to find a Progreso
     * @example
     * // Get one Progreso
     * const progreso = await prisma.progreso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgresoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgresoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Progresos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Progresos
     * const progresos = await prisma.progreso.findMany()
     * 
     * // Get first 10 Progresos
     * const progresos = await prisma.progreso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progresoWithIdOnly = await prisma.progreso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgresoFindManyArgs>(args?: SelectSubset<T, ProgresoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Progreso.
     * @param {ProgresoCreateArgs} args - Arguments to create a Progreso.
     * @example
     * // Create one Progreso
     * const Progreso = await prisma.progreso.create({
     *   data: {
     *     // ... data to create a Progreso
     *   }
     * })
     * 
     */
    create<T extends ProgresoCreateArgs>(args: SelectSubset<T, ProgresoCreateArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Progresos.
     * @param {ProgresoCreateManyArgs} args - Arguments to create many Progresos.
     * @example
     * // Create many Progresos
     * const progreso = await prisma.progreso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgresoCreateManyArgs>(args?: SelectSubset<T, ProgresoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Progresos and returns the data saved in the database.
     * @param {ProgresoCreateManyAndReturnArgs} args - Arguments to create many Progresos.
     * @example
     * // Create many Progresos
     * const progreso = await prisma.progreso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Progresos and only return the `id`
     * const progresoWithIdOnly = await prisma.progreso.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgresoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgresoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Progreso.
     * @param {ProgresoDeleteArgs} args - Arguments to delete one Progreso.
     * @example
     * // Delete one Progreso
     * const Progreso = await prisma.progreso.delete({
     *   where: {
     *     // ... filter to delete one Progreso
     *   }
     * })
     * 
     */
    delete<T extends ProgresoDeleteArgs>(args: SelectSubset<T, ProgresoDeleteArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Progreso.
     * @param {ProgresoUpdateArgs} args - Arguments to update one Progreso.
     * @example
     * // Update one Progreso
     * const progreso = await prisma.progreso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgresoUpdateArgs>(args: SelectSubset<T, ProgresoUpdateArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Progresos.
     * @param {ProgresoDeleteManyArgs} args - Arguments to filter Progresos to delete.
     * @example
     * // Delete a few Progresos
     * const { count } = await prisma.progreso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgresoDeleteManyArgs>(args?: SelectSubset<T, ProgresoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Progresos
     * const progreso = await prisma.progreso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgresoUpdateManyArgs>(args: SelectSubset<T, ProgresoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresos and returns the data updated in the database.
     * @param {ProgresoUpdateManyAndReturnArgs} args - Arguments to update many Progresos.
     * @example
     * // Update many Progresos
     * const progreso = await prisma.progreso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Progresos and only return the `id`
     * const progresoWithIdOnly = await prisma.progreso.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgresoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgresoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Progreso.
     * @param {ProgresoUpsertArgs} args - Arguments to update or create a Progreso.
     * @example
     * // Update or create a Progreso
     * const progreso = await prisma.progreso.upsert({
     *   create: {
     *     // ... data to create a Progreso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Progreso we want to update
     *   }
     * })
     */
    upsert<T extends ProgresoUpsertArgs>(args: SelectSubset<T, ProgresoUpsertArgs<ExtArgs>>): Prisma__ProgresoClient<$Result.GetResult<Prisma.$ProgresoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Progresos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoCountArgs} args - Arguments to filter Progresos to count.
     * @example
     * // Count the number of Progresos
     * const count = await prisma.progreso.count({
     *   where: {
     *     // ... the filter for the Progresos we want to count
     *   }
     * })
    **/
    count<T extends ProgresoCountArgs>(
      args?: Subset<T, ProgresoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgresoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Progreso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgresoAggregateArgs>(args: Subset<T, ProgresoAggregateArgs>): Prisma.PrismaPromise<GetProgresoAggregateType<T>>

    /**
     * Group by Progreso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgresoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgresoGroupByArgs['orderBy'] }
        : { orderBy?: ProgresoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgresoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgresoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Progreso model
   */
  readonly fields: ProgresoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Progreso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgresoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Progreso model
   */
  interface ProgresoFieldRefs {
    readonly id: FieldRef<"Progreso", 'Int'>
    readonly userId: FieldRef<"Progreso", 'Int'>
    readonly seccion: FieldRef<"Progreso", 'String'>
    readonly nivel: FieldRef<"Progreso", 'String'>
    readonly actividad: FieldRef<"Progreso", 'String'>
    readonly completado: FieldRef<"Progreso", 'Boolean'>
    readonly score: FieldRef<"Progreso", 'Int'>
    readonly tiempo: FieldRef<"Progreso", 'Int'>
    readonly fecha: FieldRef<"Progreso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Progreso findUnique
   */
  export type ProgresoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter, which Progreso to fetch.
     */
    where: ProgresoWhereUniqueInput
  }

  /**
   * Progreso findUniqueOrThrow
   */
  export type ProgresoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter, which Progreso to fetch.
     */
    where: ProgresoWhereUniqueInput
  }

  /**
   * Progreso findFirst
   */
  export type ProgresoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter, which Progreso to fetch.
     */
    where?: ProgresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresos to fetch.
     */
    orderBy?: ProgresoOrderByWithRelationInput | ProgresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresos.
     */
    cursor?: ProgresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresos.
     */
    distinct?: ProgresoScalarFieldEnum | ProgresoScalarFieldEnum[]
  }

  /**
   * Progreso findFirstOrThrow
   */
  export type ProgresoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter, which Progreso to fetch.
     */
    where?: ProgresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresos to fetch.
     */
    orderBy?: ProgresoOrderByWithRelationInput | ProgresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresos.
     */
    cursor?: ProgresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresos.
     */
    distinct?: ProgresoScalarFieldEnum | ProgresoScalarFieldEnum[]
  }

  /**
   * Progreso findMany
   */
  export type ProgresoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter, which Progresos to fetch.
     */
    where?: ProgresoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresos to fetch.
     */
    orderBy?: ProgresoOrderByWithRelationInput | ProgresoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Progresos.
     */
    cursor?: ProgresoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresos.
     */
    skip?: number
    distinct?: ProgresoScalarFieldEnum | ProgresoScalarFieldEnum[]
  }

  /**
   * Progreso create
   */
  export type ProgresoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * The data needed to create a Progreso.
     */
    data: XOR<ProgresoCreateInput, ProgresoUncheckedCreateInput>
  }

  /**
   * Progreso createMany
   */
  export type ProgresoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Progresos.
     */
    data: ProgresoCreateManyInput | ProgresoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Progreso createManyAndReturn
   */
  export type ProgresoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * The data used to create many Progresos.
     */
    data: ProgresoCreateManyInput | ProgresoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progreso update
   */
  export type ProgresoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * The data needed to update a Progreso.
     */
    data: XOR<ProgresoUpdateInput, ProgresoUncheckedUpdateInput>
    /**
     * Choose, which Progreso to update.
     */
    where: ProgresoWhereUniqueInput
  }

  /**
   * Progreso updateMany
   */
  export type ProgresoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Progresos.
     */
    data: XOR<ProgresoUpdateManyMutationInput, ProgresoUncheckedUpdateManyInput>
    /**
     * Filter which Progresos to update
     */
    where?: ProgresoWhereInput
    /**
     * Limit how many Progresos to update.
     */
    limit?: number
  }

  /**
   * Progreso updateManyAndReturn
   */
  export type ProgresoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * The data used to update Progresos.
     */
    data: XOR<ProgresoUpdateManyMutationInput, ProgresoUncheckedUpdateManyInput>
    /**
     * Filter which Progresos to update
     */
    where?: ProgresoWhereInput
    /**
     * Limit how many Progresos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progreso upsert
   */
  export type ProgresoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * The filter to search for the Progreso to update in case it exists.
     */
    where: ProgresoWhereUniqueInput
    /**
     * In case the Progreso found by the `where` argument doesn't exist, create a new Progreso with this data.
     */
    create: XOR<ProgresoCreateInput, ProgresoUncheckedCreateInput>
    /**
     * In case the Progreso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgresoUpdateInput, ProgresoUncheckedUpdateInput>
  }

  /**
   * Progreso delete
   */
  export type ProgresoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
    /**
     * Filter which Progreso to delete.
     */
    where: ProgresoWhereUniqueInput
  }

  /**
   * Progreso deleteMany
   */
  export type ProgresoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progresos to delete
     */
    where?: ProgresoWhereInput
    /**
     * Limit how many Progresos to delete.
     */
    limit?: number
  }

  /**
   * Progreso without action
   */
  export type ProgresoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progreso
     */
    select?: ProgresoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progreso
     */
    omit?: ProgresoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoInclude<ExtArgs> | null
  }


  /**
   * Model ProgresoParcial
   */

  export type AggregateProgresoParcial = {
    _count: ProgresoParcialCountAggregateOutputType | null
    _avg: ProgresoParcialAvgAggregateOutputType | null
    _sum: ProgresoParcialSumAggregateOutputType | null
    _min: ProgresoParcialMinAggregateOutputType | null
    _max: ProgresoParcialMaxAggregateOutputType | null
  }

  export type ProgresoParcialAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    vidas: number | null
  }

  export type ProgresoParcialSumAggregateOutputType = {
    id: number | null
    userId: number | null
    vidas: number | null
  }

  export type ProgresoParcialMinAggregateOutputType = {
    id: number | null
    userId: number | null
    seccion: string | null
    nivel: string | null
    actividad: string | null
    vidas: number | null
    actualizado: Date | null
  }

  export type ProgresoParcialMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    seccion: string | null
    nivel: string | null
    actividad: string | null
    vidas: number | null
    actualizado: Date | null
  }

  export type ProgresoParcialCountAggregateOutputType = {
    id: number
    userId: number
    seccion: number
    nivel: number
    actividad: number
    estado: number
    vidas: number
    actualizado: number
    _all: number
  }


  export type ProgresoParcialAvgAggregateInputType = {
    id?: true
    userId?: true
    vidas?: true
  }

  export type ProgresoParcialSumAggregateInputType = {
    id?: true
    userId?: true
    vidas?: true
  }

  export type ProgresoParcialMinAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    vidas?: true
    actualizado?: true
  }

  export type ProgresoParcialMaxAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    vidas?: true
    actualizado?: true
  }

  export type ProgresoParcialCountAggregateInputType = {
    id?: true
    userId?: true
    seccion?: true
    nivel?: true
    actividad?: true
    estado?: true
    vidas?: true
    actualizado?: true
    _all?: true
  }

  export type ProgresoParcialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgresoParcial to aggregate.
     */
    where?: ProgresoParcialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoParcials to fetch.
     */
    orderBy?: ProgresoParcialOrderByWithRelationInput | ProgresoParcialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgresoParcialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoParcials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoParcials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgresoParcials
    **/
    _count?: true | ProgresoParcialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgresoParcialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgresoParcialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgresoParcialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgresoParcialMaxAggregateInputType
  }

  export type GetProgresoParcialAggregateType<T extends ProgresoParcialAggregateArgs> = {
        [P in keyof T & keyof AggregateProgresoParcial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgresoParcial[P]>
      : GetScalarType<T[P], AggregateProgresoParcial[P]>
  }




  export type ProgresoParcialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgresoParcialWhereInput
    orderBy?: ProgresoParcialOrderByWithAggregationInput | ProgresoParcialOrderByWithAggregationInput[]
    by: ProgresoParcialScalarFieldEnum[] | ProgresoParcialScalarFieldEnum
    having?: ProgresoParcialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgresoParcialCountAggregateInputType | true
    _avg?: ProgresoParcialAvgAggregateInputType
    _sum?: ProgresoParcialSumAggregateInputType
    _min?: ProgresoParcialMinAggregateInputType
    _max?: ProgresoParcialMaxAggregateInputType
  }

  export type ProgresoParcialGroupByOutputType = {
    id: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    estado: JsonValue
    vidas: number
    actualizado: Date
    _count: ProgresoParcialCountAggregateOutputType | null
    _avg: ProgresoParcialAvgAggregateOutputType | null
    _sum: ProgresoParcialSumAggregateOutputType | null
    _min: ProgresoParcialMinAggregateOutputType | null
    _max: ProgresoParcialMaxAggregateOutputType | null
  }

  type GetProgresoParcialGroupByPayload<T extends ProgresoParcialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgresoParcialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgresoParcialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgresoParcialGroupByOutputType[P]>
            : GetScalarType<T[P], ProgresoParcialGroupByOutputType[P]>
        }
      >
    >


  export type ProgresoParcialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    estado?: boolean
    vidas?: boolean
    actualizado?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoParcial"]>

  export type ProgresoParcialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    estado?: boolean
    vidas?: boolean
    actualizado?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoParcial"]>

  export type ProgresoParcialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    estado?: boolean
    vidas?: boolean
    actualizado?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progresoParcial"]>

  export type ProgresoParcialSelectScalar = {
    id?: boolean
    userId?: boolean
    seccion?: boolean
    nivel?: boolean
    actividad?: boolean
    estado?: boolean
    vidas?: boolean
    actualizado?: boolean
  }

  export type ProgresoParcialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "seccion" | "nivel" | "actividad" | "estado" | "vidas" | "actualizado", ExtArgs["result"]["progresoParcial"]>
  export type ProgresoParcialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProgresoParcialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProgresoParcialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ProgresoParcialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgresoParcial"
    objects: {
      user: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      seccion: string
      nivel: string
      actividad: string
      estado: Prisma.JsonValue
      vidas: number
      actualizado: Date
    }, ExtArgs["result"]["progresoParcial"]>
    composites: {}
  }

  type ProgresoParcialGetPayload<S extends boolean | null | undefined | ProgresoParcialDefaultArgs> = $Result.GetResult<Prisma.$ProgresoParcialPayload, S>

  type ProgresoParcialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgresoParcialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgresoParcialCountAggregateInputType | true
    }

  export interface ProgresoParcialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgresoParcial'], meta: { name: 'ProgresoParcial' } }
    /**
     * Find zero or one ProgresoParcial that matches the filter.
     * @param {ProgresoParcialFindUniqueArgs} args - Arguments to find a ProgresoParcial
     * @example
     * // Get one ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgresoParcialFindUniqueArgs>(args: SelectSubset<T, ProgresoParcialFindUniqueArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgresoParcial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgresoParcialFindUniqueOrThrowArgs} args - Arguments to find a ProgresoParcial
     * @example
     * // Get one ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgresoParcialFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgresoParcialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgresoParcial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialFindFirstArgs} args - Arguments to find a ProgresoParcial
     * @example
     * // Get one ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgresoParcialFindFirstArgs>(args?: SelectSubset<T, ProgresoParcialFindFirstArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgresoParcial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialFindFirstOrThrowArgs} args - Arguments to find a ProgresoParcial
     * @example
     * // Get one ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgresoParcialFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgresoParcialFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgresoParcials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgresoParcials
     * const progresoParcials = await prisma.progresoParcial.findMany()
     * 
     * // Get first 10 ProgresoParcials
     * const progresoParcials = await prisma.progresoParcial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progresoParcialWithIdOnly = await prisma.progresoParcial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgresoParcialFindManyArgs>(args?: SelectSubset<T, ProgresoParcialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgresoParcial.
     * @param {ProgresoParcialCreateArgs} args - Arguments to create a ProgresoParcial.
     * @example
     * // Create one ProgresoParcial
     * const ProgresoParcial = await prisma.progresoParcial.create({
     *   data: {
     *     // ... data to create a ProgresoParcial
     *   }
     * })
     * 
     */
    create<T extends ProgresoParcialCreateArgs>(args: SelectSubset<T, ProgresoParcialCreateArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgresoParcials.
     * @param {ProgresoParcialCreateManyArgs} args - Arguments to create many ProgresoParcials.
     * @example
     * // Create many ProgresoParcials
     * const progresoParcial = await prisma.progresoParcial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgresoParcialCreateManyArgs>(args?: SelectSubset<T, ProgresoParcialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgresoParcials and returns the data saved in the database.
     * @param {ProgresoParcialCreateManyAndReturnArgs} args - Arguments to create many ProgresoParcials.
     * @example
     * // Create many ProgresoParcials
     * const progresoParcial = await prisma.progresoParcial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgresoParcials and only return the `id`
     * const progresoParcialWithIdOnly = await prisma.progresoParcial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgresoParcialCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgresoParcialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgresoParcial.
     * @param {ProgresoParcialDeleteArgs} args - Arguments to delete one ProgresoParcial.
     * @example
     * // Delete one ProgresoParcial
     * const ProgresoParcial = await prisma.progresoParcial.delete({
     *   where: {
     *     // ... filter to delete one ProgresoParcial
     *   }
     * })
     * 
     */
    delete<T extends ProgresoParcialDeleteArgs>(args: SelectSubset<T, ProgresoParcialDeleteArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgresoParcial.
     * @param {ProgresoParcialUpdateArgs} args - Arguments to update one ProgresoParcial.
     * @example
     * // Update one ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgresoParcialUpdateArgs>(args: SelectSubset<T, ProgresoParcialUpdateArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgresoParcials.
     * @param {ProgresoParcialDeleteManyArgs} args - Arguments to filter ProgresoParcials to delete.
     * @example
     * // Delete a few ProgresoParcials
     * const { count } = await prisma.progresoParcial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgresoParcialDeleteManyArgs>(args?: SelectSubset<T, ProgresoParcialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgresoParcials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgresoParcials
     * const progresoParcial = await prisma.progresoParcial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgresoParcialUpdateManyArgs>(args: SelectSubset<T, ProgresoParcialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgresoParcials and returns the data updated in the database.
     * @param {ProgresoParcialUpdateManyAndReturnArgs} args - Arguments to update many ProgresoParcials.
     * @example
     * // Update many ProgresoParcials
     * const progresoParcial = await prisma.progresoParcial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgresoParcials and only return the `id`
     * const progresoParcialWithIdOnly = await prisma.progresoParcial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgresoParcialUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgresoParcialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgresoParcial.
     * @param {ProgresoParcialUpsertArgs} args - Arguments to update or create a ProgresoParcial.
     * @example
     * // Update or create a ProgresoParcial
     * const progresoParcial = await prisma.progresoParcial.upsert({
     *   create: {
     *     // ... data to create a ProgresoParcial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgresoParcial we want to update
     *   }
     * })
     */
    upsert<T extends ProgresoParcialUpsertArgs>(args: SelectSubset<T, ProgresoParcialUpsertArgs<ExtArgs>>): Prisma__ProgresoParcialClient<$Result.GetResult<Prisma.$ProgresoParcialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgresoParcials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialCountArgs} args - Arguments to filter ProgresoParcials to count.
     * @example
     * // Count the number of ProgresoParcials
     * const count = await prisma.progresoParcial.count({
     *   where: {
     *     // ... the filter for the ProgresoParcials we want to count
     *   }
     * })
    **/
    count<T extends ProgresoParcialCountArgs>(
      args?: Subset<T, ProgresoParcialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgresoParcialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgresoParcial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgresoParcialAggregateArgs>(args: Subset<T, ProgresoParcialAggregateArgs>): Prisma.PrismaPromise<GetProgresoParcialAggregateType<T>>

    /**
     * Group by ProgresoParcial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgresoParcialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgresoParcialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgresoParcialGroupByArgs['orderBy'] }
        : { orderBy?: ProgresoParcialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgresoParcialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgresoParcialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgresoParcial model
   */
  readonly fields: ProgresoParcialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgresoParcial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgresoParcialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgresoParcial model
   */
  interface ProgresoParcialFieldRefs {
    readonly id: FieldRef<"ProgresoParcial", 'Int'>
    readonly userId: FieldRef<"ProgresoParcial", 'Int'>
    readonly seccion: FieldRef<"ProgresoParcial", 'String'>
    readonly nivel: FieldRef<"ProgresoParcial", 'String'>
    readonly actividad: FieldRef<"ProgresoParcial", 'String'>
    readonly estado: FieldRef<"ProgresoParcial", 'Json'>
    readonly vidas: FieldRef<"ProgresoParcial", 'Int'>
    readonly actualizado: FieldRef<"ProgresoParcial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProgresoParcial findUnique
   */
  export type ProgresoParcialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoParcial to fetch.
     */
    where: ProgresoParcialWhereUniqueInput
  }

  /**
   * ProgresoParcial findUniqueOrThrow
   */
  export type ProgresoParcialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoParcial to fetch.
     */
    where: ProgresoParcialWhereUniqueInput
  }

  /**
   * ProgresoParcial findFirst
   */
  export type ProgresoParcialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoParcial to fetch.
     */
    where?: ProgresoParcialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoParcials to fetch.
     */
    orderBy?: ProgresoParcialOrderByWithRelationInput | ProgresoParcialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgresoParcials.
     */
    cursor?: ProgresoParcialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoParcials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoParcials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgresoParcials.
     */
    distinct?: ProgresoParcialScalarFieldEnum | ProgresoParcialScalarFieldEnum[]
  }

  /**
   * ProgresoParcial findFirstOrThrow
   */
  export type ProgresoParcialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoParcial to fetch.
     */
    where?: ProgresoParcialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoParcials to fetch.
     */
    orderBy?: ProgresoParcialOrderByWithRelationInput | ProgresoParcialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgresoParcials.
     */
    cursor?: ProgresoParcialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoParcials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoParcials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgresoParcials.
     */
    distinct?: ProgresoParcialScalarFieldEnum | ProgresoParcialScalarFieldEnum[]
  }

  /**
   * ProgresoParcial findMany
   */
  export type ProgresoParcialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter, which ProgresoParcials to fetch.
     */
    where?: ProgresoParcialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgresoParcials to fetch.
     */
    orderBy?: ProgresoParcialOrderByWithRelationInput | ProgresoParcialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgresoParcials.
     */
    cursor?: ProgresoParcialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgresoParcials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgresoParcials.
     */
    skip?: number
    distinct?: ProgresoParcialScalarFieldEnum | ProgresoParcialScalarFieldEnum[]
  }

  /**
   * ProgresoParcial create
   */
  export type ProgresoParcialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgresoParcial.
     */
    data: XOR<ProgresoParcialCreateInput, ProgresoParcialUncheckedCreateInput>
  }

  /**
   * ProgresoParcial createMany
   */
  export type ProgresoParcialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgresoParcials.
     */
    data: ProgresoParcialCreateManyInput | ProgresoParcialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgresoParcial createManyAndReturn
   */
  export type ProgresoParcialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * The data used to create many ProgresoParcials.
     */
    data: ProgresoParcialCreateManyInput | ProgresoParcialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgresoParcial update
   */
  export type ProgresoParcialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgresoParcial.
     */
    data: XOR<ProgresoParcialUpdateInput, ProgresoParcialUncheckedUpdateInput>
    /**
     * Choose, which ProgresoParcial to update.
     */
    where: ProgresoParcialWhereUniqueInput
  }

  /**
   * ProgresoParcial updateMany
   */
  export type ProgresoParcialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgresoParcials.
     */
    data: XOR<ProgresoParcialUpdateManyMutationInput, ProgresoParcialUncheckedUpdateManyInput>
    /**
     * Filter which ProgresoParcials to update
     */
    where?: ProgresoParcialWhereInput
    /**
     * Limit how many ProgresoParcials to update.
     */
    limit?: number
  }

  /**
   * ProgresoParcial updateManyAndReturn
   */
  export type ProgresoParcialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * The data used to update ProgresoParcials.
     */
    data: XOR<ProgresoParcialUpdateManyMutationInput, ProgresoParcialUncheckedUpdateManyInput>
    /**
     * Filter which ProgresoParcials to update
     */
    where?: ProgresoParcialWhereInput
    /**
     * Limit how many ProgresoParcials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgresoParcial upsert
   */
  export type ProgresoParcialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgresoParcial to update in case it exists.
     */
    where: ProgresoParcialWhereUniqueInput
    /**
     * In case the ProgresoParcial found by the `where` argument doesn't exist, create a new ProgresoParcial with this data.
     */
    create: XOR<ProgresoParcialCreateInput, ProgresoParcialUncheckedCreateInput>
    /**
     * In case the ProgresoParcial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgresoParcialUpdateInput, ProgresoParcialUncheckedUpdateInput>
  }

  /**
   * ProgresoParcial delete
   */
  export type ProgresoParcialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
    /**
     * Filter which ProgresoParcial to delete.
     */
    where: ProgresoParcialWhereUniqueInput
  }

  /**
   * ProgresoParcial deleteMany
   */
  export type ProgresoParcialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgresoParcials to delete
     */
    where?: ProgresoParcialWhereInput
    /**
     * Limit how many ProgresoParcials to delete.
     */
    limit?: number
  }

  /**
   * ProgresoParcial without action
   */
  export type ProgresoParcialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgresoParcial
     */
    select?: ProgresoParcialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgresoParcial
     */
    omit?: ProgresoParcialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgresoParcialInclude<ExtArgs> | null
  }


  /**
   * Model Nivel
   */

  export type AggregateNivel = {
    _count: NivelCountAggregateOutputType | null
    _avg: NivelAvgAggregateOutputType | null
    _sum: NivelSumAggregateOutputType | null
    _min: NivelMinAggregateOutputType | null
    _max: NivelMaxAggregateOutputType | null
  }

  export type NivelAvgAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type NivelSumAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type NivelMinAggregateOutputType = {
    id: number | null
    seccion: string | null
    clave: string | null
    titulo: string | null
    texto: string | null
    objetivo: string | null
    orden: number | null
  }

  export type NivelMaxAggregateOutputType = {
    id: number | null
    seccion: string | null
    clave: string | null
    titulo: string | null
    texto: string | null
    objetivo: string | null
    orden: number | null
  }

  export type NivelCountAggregateOutputType = {
    id: number
    seccion: number
    clave: number
    titulo: number
    texto: number
    objetivo: number
    orden: number
    _all: number
  }


  export type NivelAvgAggregateInputType = {
    id?: true
    orden?: true
  }

  export type NivelSumAggregateInputType = {
    id?: true
    orden?: true
  }

  export type NivelMinAggregateInputType = {
    id?: true
    seccion?: true
    clave?: true
    titulo?: true
    texto?: true
    objetivo?: true
    orden?: true
  }

  export type NivelMaxAggregateInputType = {
    id?: true
    seccion?: true
    clave?: true
    titulo?: true
    texto?: true
    objetivo?: true
    orden?: true
  }

  export type NivelCountAggregateInputType = {
    id?: true
    seccion?: true
    clave?: true
    titulo?: true
    texto?: true
    objetivo?: true
    orden?: true
    _all?: true
  }

  export type NivelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nivel to aggregate.
     */
    where?: NivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nivels to fetch.
     */
    orderBy?: NivelOrderByWithRelationInput | NivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Nivels
    **/
    _count?: true | NivelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NivelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NivelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NivelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NivelMaxAggregateInputType
  }

  export type GetNivelAggregateType<T extends NivelAggregateArgs> = {
        [P in keyof T & keyof AggregateNivel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNivel[P]>
      : GetScalarType<T[P], AggregateNivel[P]>
  }




  export type NivelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NivelWhereInput
    orderBy?: NivelOrderByWithAggregationInput | NivelOrderByWithAggregationInput[]
    by: NivelScalarFieldEnum[] | NivelScalarFieldEnum
    having?: NivelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NivelCountAggregateInputType | true
    _avg?: NivelAvgAggregateInputType
    _sum?: NivelSumAggregateInputType
    _min?: NivelMinAggregateInputType
    _max?: NivelMaxAggregateInputType
  }

  export type NivelGroupByOutputType = {
    id: number
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
    _count: NivelCountAggregateOutputType | null
    _avg: NivelAvgAggregateOutputType | null
    _sum: NivelSumAggregateOutputType | null
    _min: NivelMinAggregateOutputType | null
    _max: NivelMaxAggregateOutputType | null
  }

  type GetNivelGroupByPayload<T extends NivelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NivelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NivelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NivelGroupByOutputType[P]>
            : GetScalarType<T[P], NivelGroupByOutputType[P]>
        }
      >
    >


  export type NivelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seccion?: boolean
    clave?: boolean
    titulo?: boolean
    texto?: boolean
    objetivo?: boolean
    orden?: boolean
    actividades?: boolean | Nivel$actividadesArgs<ExtArgs>
    _count?: boolean | NivelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nivel"]>

  export type NivelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seccion?: boolean
    clave?: boolean
    titulo?: boolean
    texto?: boolean
    objetivo?: boolean
    orden?: boolean
  }, ExtArgs["result"]["nivel"]>

  export type NivelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seccion?: boolean
    clave?: boolean
    titulo?: boolean
    texto?: boolean
    objetivo?: boolean
    orden?: boolean
  }, ExtArgs["result"]["nivel"]>

  export type NivelSelectScalar = {
    id?: boolean
    seccion?: boolean
    clave?: boolean
    titulo?: boolean
    texto?: boolean
    objetivo?: boolean
    orden?: boolean
  }

  export type NivelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "seccion" | "clave" | "titulo" | "texto" | "objetivo" | "orden", ExtArgs["result"]["nivel"]>
  export type NivelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actividades?: boolean | Nivel$actividadesArgs<ExtArgs>
    _count?: boolean | NivelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NivelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NivelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NivelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Nivel"
    objects: {
      actividades: Prisma.$ActividadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      seccion: string
      /**
       * Identificador en la URL ("1", "2"...).
       */
      clave: string
      titulo: string
      texto: string
      objetivo: string
      orden: number
    }, ExtArgs["result"]["nivel"]>
    composites: {}
  }

  type NivelGetPayload<S extends boolean | null | undefined | NivelDefaultArgs> = $Result.GetResult<Prisma.$NivelPayload, S>

  type NivelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NivelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NivelCountAggregateInputType | true
    }

  export interface NivelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Nivel'], meta: { name: 'Nivel' } }
    /**
     * Find zero or one Nivel that matches the filter.
     * @param {NivelFindUniqueArgs} args - Arguments to find a Nivel
     * @example
     * // Get one Nivel
     * const nivel = await prisma.nivel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NivelFindUniqueArgs>(args: SelectSubset<T, NivelFindUniqueArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nivel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NivelFindUniqueOrThrowArgs} args - Arguments to find a Nivel
     * @example
     * // Get one Nivel
     * const nivel = await prisma.nivel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NivelFindUniqueOrThrowArgs>(args: SelectSubset<T, NivelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nivel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelFindFirstArgs} args - Arguments to find a Nivel
     * @example
     * // Get one Nivel
     * const nivel = await prisma.nivel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NivelFindFirstArgs>(args?: SelectSubset<T, NivelFindFirstArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nivel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelFindFirstOrThrowArgs} args - Arguments to find a Nivel
     * @example
     * // Get one Nivel
     * const nivel = await prisma.nivel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NivelFindFirstOrThrowArgs>(args?: SelectSubset<T, NivelFindFirstOrThrowArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nivels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nivels
     * const nivels = await prisma.nivel.findMany()
     * 
     * // Get first 10 Nivels
     * const nivels = await prisma.nivel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nivelWithIdOnly = await prisma.nivel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NivelFindManyArgs>(args?: SelectSubset<T, NivelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nivel.
     * @param {NivelCreateArgs} args - Arguments to create a Nivel.
     * @example
     * // Create one Nivel
     * const Nivel = await prisma.nivel.create({
     *   data: {
     *     // ... data to create a Nivel
     *   }
     * })
     * 
     */
    create<T extends NivelCreateArgs>(args: SelectSubset<T, NivelCreateArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nivels.
     * @param {NivelCreateManyArgs} args - Arguments to create many Nivels.
     * @example
     * // Create many Nivels
     * const nivel = await prisma.nivel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NivelCreateManyArgs>(args?: SelectSubset<T, NivelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Nivels and returns the data saved in the database.
     * @param {NivelCreateManyAndReturnArgs} args - Arguments to create many Nivels.
     * @example
     * // Create many Nivels
     * const nivel = await prisma.nivel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Nivels and only return the `id`
     * const nivelWithIdOnly = await prisma.nivel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NivelCreateManyAndReturnArgs>(args?: SelectSubset<T, NivelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Nivel.
     * @param {NivelDeleteArgs} args - Arguments to delete one Nivel.
     * @example
     * // Delete one Nivel
     * const Nivel = await prisma.nivel.delete({
     *   where: {
     *     // ... filter to delete one Nivel
     *   }
     * })
     * 
     */
    delete<T extends NivelDeleteArgs>(args: SelectSubset<T, NivelDeleteArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nivel.
     * @param {NivelUpdateArgs} args - Arguments to update one Nivel.
     * @example
     * // Update one Nivel
     * const nivel = await prisma.nivel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NivelUpdateArgs>(args: SelectSubset<T, NivelUpdateArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nivels.
     * @param {NivelDeleteManyArgs} args - Arguments to filter Nivels to delete.
     * @example
     * // Delete a few Nivels
     * const { count } = await prisma.nivel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NivelDeleteManyArgs>(args?: SelectSubset<T, NivelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nivels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nivels
     * const nivel = await prisma.nivel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NivelUpdateManyArgs>(args: SelectSubset<T, NivelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nivels and returns the data updated in the database.
     * @param {NivelUpdateManyAndReturnArgs} args - Arguments to update many Nivels.
     * @example
     * // Update many Nivels
     * const nivel = await prisma.nivel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Nivels and only return the `id`
     * const nivelWithIdOnly = await prisma.nivel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NivelUpdateManyAndReturnArgs>(args: SelectSubset<T, NivelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Nivel.
     * @param {NivelUpsertArgs} args - Arguments to update or create a Nivel.
     * @example
     * // Update or create a Nivel
     * const nivel = await prisma.nivel.upsert({
     *   create: {
     *     // ... data to create a Nivel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nivel we want to update
     *   }
     * })
     */
    upsert<T extends NivelUpsertArgs>(args: SelectSubset<T, NivelUpsertArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nivels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelCountArgs} args - Arguments to filter Nivels to count.
     * @example
     * // Count the number of Nivels
     * const count = await prisma.nivel.count({
     *   where: {
     *     // ... the filter for the Nivels we want to count
     *   }
     * })
    **/
    count<T extends NivelCountArgs>(
      args?: Subset<T, NivelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NivelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nivel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NivelAggregateArgs>(args: Subset<T, NivelAggregateArgs>): Prisma.PrismaPromise<GetNivelAggregateType<T>>

    /**
     * Group by Nivel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NivelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NivelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NivelGroupByArgs['orderBy'] }
        : { orderBy?: NivelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NivelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNivelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Nivel model
   */
  readonly fields: NivelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Nivel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NivelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actividades<T extends Nivel$actividadesArgs<ExtArgs> = {}>(args?: Subset<T, Nivel$actividadesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Nivel model
   */
  interface NivelFieldRefs {
    readonly id: FieldRef<"Nivel", 'Int'>
    readonly seccion: FieldRef<"Nivel", 'String'>
    readonly clave: FieldRef<"Nivel", 'String'>
    readonly titulo: FieldRef<"Nivel", 'String'>
    readonly texto: FieldRef<"Nivel", 'String'>
    readonly objetivo: FieldRef<"Nivel", 'String'>
    readonly orden: FieldRef<"Nivel", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Nivel findUnique
   */
  export type NivelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter, which Nivel to fetch.
     */
    where: NivelWhereUniqueInput
  }

  /**
   * Nivel findUniqueOrThrow
   */
  export type NivelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter, which Nivel to fetch.
     */
    where: NivelWhereUniqueInput
  }

  /**
   * Nivel findFirst
   */
  export type NivelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter, which Nivel to fetch.
     */
    where?: NivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nivels to fetch.
     */
    orderBy?: NivelOrderByWithRelationInput | NivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nivels.
     */
    cursor?: NivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nivels.
     */
    distinct?: NivelScalarFieldEnum | NivelScalarFieldEnum[]
  }

  /**
   * Nivel findFirstOrThrow
   */
  export type NivelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter, which Nivel to fetch.
     */
    where?: NivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nivels to fetch.
     */
    orderBy?: NivelOrderByWithRelationInput | NivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nivels.
     */
    cursor?: NivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nivels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nivels.
     */
    distinct?: NivelScalarFieldEnum | NivelScalarFieldEnum[]
  }

  /**
   * Nivel findMany
   */
  export type NivelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter, which Nivels to fetch.
     */
    where?: NivelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nivels to fetch.
     */
    orderBy?: NivelOrderByWithRelationInput | NivelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Nivels.
     */
    cursor?: NivelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nivels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nivels.
     */
    skip?: number
    distinct?: NivelScalarFieldEnum | NivelScalarFieldEnum[]
  }

  /**
   * Nivel create
   */
  export type NivelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * The data needed to create a Nivel.
     */
    data: XOR<NivelCreateInput, NivelUncheckedCreateInput>
  }

  /**
   * Nivel createMany
   */
  export type NivelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Nivels.
     */
    data: NivelCreateManyInput | NivelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Nivel createManyAndReturn
   */
  export type NivelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * The data used to create many Nivels.
     */
    data: NivelCreateManyInput | NivelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Nivel update
   */
  export type NivelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * The data needed to update a Nivel.
     */
    data: XOR<NivelUpdateInput, NivelUncheckedUpdateInput>
    /**
     * Choose, which Nivel to update.
     */
    where: NivelWhereUniqueInput
  }

  /**
   * Nivel updateMany
   */
  export type NivelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Nivels.
     */
    data: XOR<NivelUpdateManyMutationInput, NivelUncheckedUpdateManyInput>
    /**
     * Filter which Nivels to update
     */
    where?: NivelWhereInput
    /**
     * Limit how many Nivels to update.
     */
    limit?: number
  }

  /**
   * Nivel updateManyAndReturn
   */
  export type NivelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * The data used to update Nivels.
     */
    data: XOR<NivelUpdateManyMutationInput, NivelUncheckedUpdateManyInput>
    /**
     * Filter which Nivels to update
     */
    where?: NivelWhereInput
    /**
     * Limit how many Nivels to update.
     */
    limit?: number
  }

  /**
   * Nivel upsert
   */
  export type NivelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * The filter to search for the Nivel to update in case it exists.
     */
    where: NivelWhereUniqueInput
    /**
     * In case the Nivel found by the `where` argument doesn't exist, create a new Nivel with this data.
     */
    create: XOR<NivelCreateInput, NivelUncheckedCreateInput>
    /**
     * In case the Nivel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NivelUpdateInput, NivelUncheckedUpdateInput>
  }

  /**
   * Nivel delete
   */
  export type NivelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
    /**
     * Filter which Nivel to delete.
     */
    where: NivelWhereUniqueInput
  }

  /**
   * Nivel deleteMany
   */
  export type NivelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nivels to delete
     */
    where?: NivelWhereInput
    /**
     * Limit how many Nivels to delete.
     */
    limit?: number
  }

  /**
   * Nivel.actividades
   */
  export type Nivel$actividadesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    where?: ActividadWhereInput
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    cursor?: ActividadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Nivel without action
   */
  export type NivelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nivel
     */
    select?: NivelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Nivel
     */
    omit?: NivelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NivelInclude<ExtArgs> | null
  }


  /**
   * Model Actividad
   */

  export type AggregateActividad = {
    _count: ActividadCountAggregateOutputType | null
    _avg: ActividadAvgAggregateOutputType | null
    _sum: ActividadSumAggregateOutputType | null
    _min: ActividadMinAggregateOutputType | null
    _max: ActividadMaxAggregateOutputType | null
  }

  export type ActividadAvgAggregateOutputType = {
    id: number | null
    nivelId: number | null
    minutos: number | null
    orden: number | null
  }

  export type ActividadSumAggregateOutputType = {
    id: number | null
    nivelId: number | null
    minutos: number | null
    orden: number | null
  }

  export type ActividadMinAggregateOutputType = {
    id: number | null
    nivelId: number | null
    clave: string | null
    titulo: string | null
    descripcion: string | null
    objetivo: string | null
    minutos: number | null
    juego: string | null
    orden: number | null
  }

  export type ActividadMaxAggregateOutputType = {
    id: number | null
    nivelId: number | null
    clave: string | null
    titulo: string | null
    descripcion: string | null
    objetivo: string | null
    minutos: number | null
    juego: string | null
    orden: number | null
  }

  export type ActividadCountAggregateOutputType = {
    id: number
    nivelId: number
    clave: number
    titulo: number
    descripcion: number
    objetivo: number
    minutos: number
    juego: number
    reglas: number
    ejemplo: number
    orden: number
    _all: number
  }


  export type ActividadAvgAggregateInputType = {
    id?: true
    nivelId?: true
    minutos?: true
    orden?: true
  }

  export type ActividadSumAggregateInputType = {
    id?: true
    nivelId?: true
    minutos?: true
    orden?: true
  }

  export type ActividadMinAggregateInputType = {
    id?: true
    nivelId?: true
    clave?: true
    titulo?: true
    descripcion?: true
    objetivo?: true
    minutos?: true
    juego?: true
    orden?: true
  }

  export type ActividadMaxAggregateInputType = {
    id?: true
    nivelId?: true
    clave?: true
    titulo?: true
    descripcion?: true
    objetivo?: true
    minutos?: true
    juego?: true
    orden?: true
  }

  export type ActividadCountAggregateInputType = {
    id?: true
    nivelId?: true
    clave?: true
    titulo?: true
    descripcion?: true
    objetivo?: true
    minutos?: true
    juego?: true
    reglas?: true
    ejemplo?: true
    orden?: true
    _all?: true
  }

  export type ActividadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Actividad to aggregate.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Actividads
    **/
    _count?: true | ActividadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActividadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActividadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActividadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActividadMaxAggregateInputType
  }

  export type GetActividadAggregateType<T extends ActividadAggregateArgs> = {
        [P in keyof T & keyof AggregateActividad]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActividad[P]>
      : GetScalarType<T[P], AggregateActividad[P]>
  }




  export type ActividadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActividadWhereInput
    orderBy?: ActividadOrderByWithAggregationInput | ActividadOrderByWithAggregationInput[]
    by: ActividadScalarFieldEnum[] | ActividadScalarFieldEnum
    having?: ActividadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActividadCountAggregateInputType | true
    _avg?: ActividadAvgAggregateInputType
    _sum?: ActividadSumAggregateInputType
    _min?: ActividadMinAggregateInputType
    _max?: ActividadMaxAggregateInputType
  }

  export type ActividadGroupByOutputType = {
    id: number
    nivelId: number
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonValue
    ejemplo: JsonValue
    orden: number
    _count: ActividadCountAggregateOutputType | null
    _avg: ActividadAvgAggregateOutputType | null
    _sum: ActividadSumAggregateOutputType | null
    _min: ActividadMinAggregateOutputType | null
    _max: ActividadMaxAggregateOutputType | null
  }

  type GetActividadGroupByPayload<T extends ActividadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActividadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActividadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActividadGroupByOutputType[P]>
            : GetScalarType<T[P], ActividadGroupByOutputType[P]>
        }
      >
    >


  export type ActividadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nivelId?: boolean
    clave?: boolean
    titulo?: boolean
    descripcion?: boolean
    objetivo?: boolean
    minutos?: boolean
    juego?: boolean
    reglas?: boolean
    ejemplo?: boolean
    orden?: boolean
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nivelId?: boolean
    clave?: boolean
    titulo?: boolean
    descripcion?: boolean
    objetivo?: boolean
    minutos?: boolean
    juego?: boolean
    reglas?: boolean
    ejemplo?: boolean
    orden?: boolean
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nivelId?: boolean
    clave?: boolean
    titulo?: boolean
    descripcion?: boolean
    objetivo?: boolean
    minutos?: boolean
    juego?: boolean
    reglas?: boolean
    ejemplo?: boolean
    orden?: boolean
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actividad"]>

  export type ActividadSelectScalar = {
    id?: boolean
    nivelId?: boolean
    clave?: boolean
    titulo?: boolean
    descripcion?: boolean
    objetivo?: boolean
    minutos?: boolean
    juego?: boolean
    reglas?: boolean
    ejemplo?: boolean
    orden?: boolean
  }

  export type ActividadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nivelId" | "clave" | "titulo" | "descripcion" | "objetivo" | "minutos" | "juego" | "reglas" | "ejemplo" | "orden", ExtArgs["result"]["actividad"]>
  export type ActividadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }
  export type ActividadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }
  export type ActividadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nivel?: boolean | NivelDefaultArgs<ExtArgs>
  }

  export type $ActividadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Actividad"
    objects: {
      nivel: Prisma.$NivelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nivelId: number
      clave: string
      titulo: string
      descripcion: string
      objetivo: string
      minutos: number
      /**
       * Clave del juego: reconocer | intruso | completa.
       */
      juego: string
      /**
       * string[] con las reglas y el ejemplo resuelto. Se validan con lib/contenido-schema.ts.
       */
      reglas: Prisma.JsonValue
      ejemplo: Prisma.JsonValue
      orden: number
    }, ExtArgs["result"]["actividad"]>
    composites: {}
  }

  type ActividadGetPayload<S extends boolean | null | undefined | ActividadDefaultArgs> = $Result.GetResult<Prisma.$ActividadPayload, S>

  type ActividadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActividadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActividadCountAggregateInputType | true
    }

  export interface ActividadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Actividad'], meta: { name: 'Actividad' } }
    /**
     * Find zero or one Actividad that matches the filter.
     * @param {ActividadFindUniqueArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActividadFindUniqueArgs>(args: SelectSubset<T, ActividadFindUniqueArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Actividad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActividadFindUniqueOrThrowArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActividadFindUniqueOrThrowArgs>(args: SelectSubset<T, ActividadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Actividad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindFirstArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActividadFindFirstArgs>(args?: SelectSubset<T, ActividadFindFirstArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Actividad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindFirstOrThrowArgs} args - Arguments to find a Actividad
     * @example
     * // Get one Actividad
     * const actividad = await prisma.actividad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActividadFindFirstOrThrowArgs>(args?: SelectSubset<T, ActividadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Actividads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Actividads
     * const actividads = await prisma.actividad.findMany()
     * 
     * // Get first 10 Actividads
     * const actividads = await prisma.actividad.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actividadWithIdOnly = await prisma.actividad.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActividadFindManyArgs>(args?: SelectSubset<T, ActividadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Actividad.
     * @param {ActividadCreateArgs} args - Arguments to create a Actividad.
     * @example
     * // Create one Actividad
     * const Actividad = await prisma.actividad.create({
     *   data: {
     *     // ... data to create a Actividad
     *   }
     * })
     * 
     */
    create<T extends ActividadCreateArgs>(args: SelectSubset<T, ActividadCreateArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Actividads.
     * @param {ActividadCreateManyArgs} args - Arguments to create many Actividads.
     * @example
     * // Create many Actividads
     * const actividad = await prisma.actividad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActividadCreateManyArgs>(args?: SelectSubset<T, ActividadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Actividads and returns the data saved in the database.
     * @param {ActividadCreateManyAndReturnArgs} args - Arguments to create many Actividads.
     * @example
     * // Create many Actividads
     * const actividad = await prisma.actividad.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Actividads and only return the `id`
     * const actividadWithIdOnly = await prisma.actividad.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActividadCreateManyAndReturnArgs>(args?: SelectSubset<T, ActividadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Actividad.
     * @param {ActividadDeleteArgs} args - Arguments to delete one Actividad.
     * @example
     * // Delete one Actividad
     * const Actividad = await prisma.actividad.delete({
     *   where: {
     *     // ... filter to delete one Actividad
     *   }
     * })
     * 
     */
    delete<T extends ActividadDeleteArgs>(args: SelectSubset<T, ActividadDeleteArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Actividad.
     * @param {ActividadUpdateArgs} args - Arguments to update one Actividad.
     * @example
     * // Update one Actividad
     * const actividad = await prisma.actividad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActividadUpdateArgs>(args: SelectSubset<T, ActividadUpdateArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Actividads.
     * @param {ActividadDeleteManyArgs} args - Arguments to filter Actividads to delete.
     * @example
     * // Delete a few Actividads
     * const { count } = await prisma.actividad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActividadDeleteManyArgs>(args?: SelectSubset<T, ActividadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Actividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Actividads
     * const actividad = await prisma.actividad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActividadUpdateManyArgs>(args: SelectSubset<T, ActividadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Actividads and returns the data updated in the database.
     * @param {ActividadUpdateManyAndReturnArgs} args - Arguments to update many Actividads.
     * @example
     * // Update many Actividads
     * const actividad = await prisma.actividad.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Actividads and only return the `id`
     * const actividadWithIdOnly = await prisma.actividad.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActividadUpdateManyAndReturnArgs>(args: SelectSubset<T, ActividadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Actividad.
     * @param {ActividadUpsertArgs} args - Arguments to update or create a Actividad.
     * @example
     * // Update or create a Actividad
     * const actividad = await prisma.actividad.upsert({
     *   create: {
     *     // ... data to create a Actividad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Actividad we want to update
     *   }
     * })
     */
    upsert<T extends ActividadUpsertArgs>(args: SelectSubset<T, ActividadUpsertArgs<ExtArgs>>): Prisma__ActividadClient<$Result.GetResult<Prisma.$ActividadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Actividads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadCountArgs} args - Arguments to filter Actividads to count.
     * @example
     * // Count the number of Actividads
     * const count = await prisma.actividad.count({
     *   where: {
     *     // ... the filter for the Actividads we want to count
     *   }
     * })
    **/
    count<T extends ActividadCountArgs>(
      args?: Subset<T, ActividadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActividadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Actividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActividadAggregateArgs>(args: Subset<T, ActividadAggregateArgs>): Prisma.PrismaPromise<GetActividadAggregateType<T>>

    /**
     * Group by Actividad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActividadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActividadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActividadGroupByArgs['orderBy'] }
        : { orderBy?: ActividadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActividadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActividadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Actividad model
   */
  readonly fields: ActividadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Actividad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActividadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nivel<T extends NivelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NivelDefaultArgs<ExtArgs>>): Prisma__NivelClient<$Result.GetResult<Prisma.$NivelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Actividad model
   */
  interface ActividadFieldRefs {
    readonly id: FieldRef<"Actividad", 'Int'>
    readonly nivelId: FieldRef<"Actividad", 'Int'>
    readonly clave: FieldRef<"Actividad", 'String'>
    readonly titulo: FieldRef<"Actividad", 'String'>
    readonly descripcion: FieldRef<"Actividad", 'String'>
    readonly objetivo: FieldRef<"Actividad", 'String'>
    readonly minutos: FieldRef<"Actividad", 'Int'>
    readonly juego: FieldRef<"Actividad", 'String'>
    readonly reglas: FieldRef<"Actividad", 'Json'>
    readonly ejemplo: FieldRef<"Actividad", 'Json'>
    readonly orden: FieldRef<"Actividad", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Actividad findUnique
   */
  export type ActividadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad findUniqueOrThrow
   */
  export type ActividadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad findFirst
   */
  export type ActividadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Actividads.
     */
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad findFirstOrThrow
   */
  export type ActividadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividad to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Actividads.
     */
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad findMany
   */
  export type ActividadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter, which Actividads to fetch.
     */
    where?: ActividadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Actividads to fetch.
     */
    orderBy?: ActividadOrderByWithRelationInput | ActividadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Actividads.
     */
    cursor?: ActividadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Actividads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Actividads.
     */
    skip?: number
    distinct?: ActividadScalarFieldEnum | ActividadScalarFieldEnum[]
  }

  /**
   * Actividad create
   */
  export type ActividadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The data needed to create a Actividad.
     */
    data: XOR<ActividadCreateInput, ActividadUncheckedCreateInput>
  }

  /**
   * Actividad createMany
   */
  export type ActividadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Actividads.
     */
    data: ActividadCreateManyInput | ActividadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Actividad createManyAndReturn
   */
  export type ActividadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * The data used to create many Actividads.
     */
    data: ActividadCreateManyInput | ActividadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Actividad update
   */
  export type ActividadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The data needed to update a Actividad.
     */
    data: XOR<ActividadUpdateInput, ActividadUncheckedUpdateInput>
    /**
     * Choose, which Actividad to update.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad updateMany
   */
  export type ActividadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Actividads.
     */
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyInput>
    /**
     * Filter which Actividads to update
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to update.
     */
    limit?: number
  }

  /**
   * Actividad updateManyAndReturn
   */
  export type ActividadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * The data used to update Actividads.
     */
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyInput>
    /**
     * Filter which Actividads to update
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Actividad upsert
   */
  export type ActividadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * The filter to search for the Actividad to update in case it exists.
     */
    where: ActividadWhereUniqueInput
    /**
     * In case the Actividad found by the `where` argument doesn't exist, create a new Actividad with this data.
     */
    create: XOR<ActividadCreateInput, ActividadUncheckedCreateInput>
    /**
     * In case the Actividad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActividadUpdateInput, ActividadUncheckedUpdateInput>
  }

  /**
   * Actividad delete
   */
  export type ActividadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
    /**
     * Filter which Actividad to delete.
     */
    where: ActividadWhereUniqueInput
  }

  /**
   * Actividad deleteMany
   */
  export type ActividadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Actividads to delete
     */
    where?: ActividadWhereInput
    /**
     * Limit how many Actividads to delete.
     */
    limit?: number
  }

  /**
   * Actividad without action
   */
  export type ActividadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Actividad
     */
    select?: ActividadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Actividad
     */
    omit?: ActividadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActividadInclude<ExtArgs> | null
  }


  /**
   * Model RecuperacionPassword
   */

  export type AggregateRecuperacionPassword = {
    _count: RecuperacionPasswordCountAggregateOutputType | null
    _avg: RecuperacionPasswordAvgAggregateOutputType | null
    _sum: RecuperacionPasswordSumAggregateOutputType | null
    _min: RecuperacionPasswordMinAggregateOutputType | null
    _max: RecuperacionPasswordMaxAggregateOutputType | null
  }

  export type RecuperacionPasswordAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RecuperacionPasswordSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RecuperacionPasswordMinAggregateOutputType = {
    id: number | null
    userId: number | null
    tokenHash: string | null
    expiraEn: Date | null
    usadoEn: Date | null
    creadoEn: Date | null
  }

  export type RecuperacionPasswordMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    tokenHash: string | null
    expiraEn: Date | null
    usadoEn: Date | null
    creadoEn: Date | null
  }

  export type RecuperacionPasswordCountAggregateOutputType = {
    id: number
    userId: number
    tokenHash: number
    expiraEn: number
    usadoEn: number
    creadoEn: number
    _all: number
  }


  export type RecuperacionPasswordAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RecuperacionPasswordSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RecuperacionPasswordMinAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiraEn?: true
    usadoEn?: true
    creadoEn?: true
  }

  export type RecuperacionPasswordMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiraEn?: true
    usadoEn?: true
    creadoEn?: true
  }

  export type RecuperacionPasswordCountAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiraEn?: true
    usadoEn?: true
    creadoEn?: true
    _all?: true
  }

  export type RecuperacionPasswordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecuperacionPassword to aggregate.
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecuperacionPasswords to fetch.
     */
    orderBy?: RecuperacionPasswordOrderByWithRelationInput | RecuperacionPasswordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecuperacionPasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecuperacionPasswords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecuperacionPasswords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecuperacionPasswords
    **/
    _count?: true | RecuperacionPasswordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecuperacionPasswordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecuperacionPasswordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecuperacionPasswordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecuperacionPasswordMaxAggregateInputType
  }

  export type GetRecuperacionPasswordAggregateType<T extends RecuperacionPasswordAggregateArgs> = {
        [P in keyof T & keyof AggregateRecuperacionPassword]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecuperacionPassword[P]>
      : GetScalarType<T[P], AggregateRecuperacionPassword[P]>
  }




  export type RecuperacionPasswordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecuperacionPasswordWhereInput
    orderBy?: RecuperacionPasswordOrderByWithAggregationInput | RecuperacionPasswordOrderByWithAggregationInput[]
    by: RecuperacionPasswordScalarFieldEnum[] | RecuperacionPasswordScalarFieldEnum
    having?: RecuperacionPasswordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecuperacionPasswordCountAggregateInputType | true
    _avg?: RecuperacionPasswordAvgAggregateInputType
    _sum?: RecuperacionPasswordSumAggregateInputType
    _min?: RecuperacionPasswordMinAggregateInputType
    _max?: RecuperacionPasswordMaxAggregateInputType
  }

  export type RecuperacionPasswordGroupByOutputType = {
    id: number
    userId: number
    tokenHash: string
    expiraEn: Date
    usadoEn: Date | null
    creadoEn: Date
    _count: RecuperacionPasswordCountAggregateOutputType | null
    _avg: RecuperacionPasswordAvgAggregateOutputType | null
    _sum: RecuperacionPasswordSumAggregateOutputType | null
    _min: RecuperacionPasswordMinAggregateOutputType | null
    _max: RecuperacionPasswordMaxAggregateOutputType | null
  }

  type GetRecuperacionPasswordGroupByPayload<T extends RecuperacionPasswordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecuperacionPasswordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecuperacionPasswordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecuperacionPasswordGroupByOutputType[P]>
            : GetScalarType<T[P], RecuperacionPasswordGroupByOutputType[P]>
        }
      >
    >


  export type RecuperacionPasswordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiraEn?: boolean
    usadoEn?: boolean
    creadoEn?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recuperacionPassword"]>

  export type RecuperacionPasswordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiraEn?: boolean
    usadoEn?: boolean
    creadoEn?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recuperacionPassword"]>

  export type RecuperacionPasswordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiraEn?: boolean
    usadoEn?: boolean
    creadoEn?: boolean
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recuperacionPassword"]>

  export type RecuperacionPasswordSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiraEn?: boolean
    usadoEn?: boolean
    creadoEn?: boolean
  }

  export type RecuperacionPasswordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tokenHash" | "expiraEn" | "usadoEn" | "creadoEn", ExtArgs["result"]["recuperacionPassword"]>
  export type RecuperacionPasswordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type RecuperacionPasswordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type RecuperacionPasswordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $RecuperacionPasswordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecuperacionPassword"
    objects: {
      user: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      tokenHash: string
      expiraEn: Date
      usadoEn: Date | null
      creadoEn: Date
    }, ExtArgs["result"]["recuperacionPassword"]>
    composites: {}
  }

  type RecuperacionPasswordGetPayload<S extends boolean | null | undefined | RecuperacionPasswordDefaultArgs> = $Result.GetResult<Prisma.$RecuperacionPasswordPayload, S>

  type RecuperacionPasswordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecuperacionPasswordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecuperacionPasswordCountAggregateInputType | true
    }

  export interface RecuperacionPasswordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecuperacionPassword'], meta: { name: 'RecuperacionPassword' } }
    /**
     * Find zero or one RecuperacionPassword that matches the filter.
     * @param {RecuperacionPasswordFindUniqueArgs} args - Arguments to find a RecuperacionPassword
     * @example
     * // Get one RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecuperacionPasswordFindUniqueArgs>(args: SelectSubset<T, RecuperacionPasswordFindUniqueArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecuperacionPassword that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecuperacionPasswordFindUniqueOrThrowArgs} args - Arguments to find a RecuperacionPassword
     * @example
     * // Get one RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecuperacionPasswordFindUniqueOrThrowArgs>(args: SelectSubset<T, RecuperacionPasswordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecuperacionPassword that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordFindFirstArgs} args - Arguments to find a RecuperacionPassword
     * @example
     * // Get one RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecuperacionPasswordFindFirstArgs>(args?: SelectSubset<T, RecuperacionPasswordFindFirstArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecuperacionPassword that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordFindFirstOrThrowArgs} args - Arguments to find a RecuperacionPassword
     * @example
     * // Get one RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecuperacionPasswordFindFirstOrThrowArgs>(args?: SelectSubset<T, RecuperacionPasswordFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecuperacionPasswords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecuperacionPasswords
     * const recuperacionPasswords = await prisma.recuperacionPassword.findMany()
     * 
     * // Get first 10 RecuperacionPasswords
     * const recuperacionPasswords = await prisma.recuperacionPassword.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recuperacionPasswordWithIdOnly = await prisma.recuperacionPassword.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecuperacionPasswordFindManyArgs>(args?: SelectSubset<T, RecuperacionPasswordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecuperacionPassword.
     * @param {RecuperacionPasswordCreateArgs} args - Arguments to create a RecuperacionPassword.
     * @example
     * // Create one RecuperacionPassword
     * const RecuperacionPassword = await prisma.recuperacionPassword.create({
     *   data: {
     *     // ... data to create a RecuperacionPassword
     *   }
     * })
     * 
     */
    create<T extends RecuperacionPasswordCreateArgs>(args: SelectSubset<T, RecuperacionPasswordCreateArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecuperacionPasswords.
     * @param {RecuperacionPasswordCreateManyArgs} args - Arguments to create many RecuperacionPasswords.
     * @example
     * // Create many RecuperacionPasswords
     * const recuperacionPassword = await prisma.recuperacionPassword.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecuperacionPasswordCreateManyArgs>(args?: SelectSubset<T, RecuperacionPasswordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecuperacionPasswords and returns the data saved in the database.
     * @param {RecuperacionPasswordCreateManyAndReturnArgs} args - Arguments to create many RecuperacionPasswords.
     * @example
     * // Create many RecuperacionPasswords
     * const recuperacionPassword = await prisma.recuperacionPassword.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecuperacionPasswords and only return the `id`
     * const recuperacionPasswordWithIdOnly = await prisma.recuperacionPassword.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecuperacionPasswordCreateManyAndReturnArgs>(args?: SelectSubset<T, RecuperacionPasswordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecuperacionPassword.
     * @param {RecuperacionPasswordDeleteArgs} args - Arguments to delete one RecuperacionPassword.
     * @example
     * // Delete one RecuperacionPassword
     * const RecuperacionPassword = await prisma.recuperacionPassword.delete({
     *   where: {
     *     // ... filter to delete one RecuperacionPassword
     *   }
     * })
     * 
     */
    delete<T extends RecuperacionPasswordDeleteArgs>(args: SelectSubset<T, RecuperacionPasswordDeleteArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecuperacionPassword.
     * @param {RecuperacionPasswordUpdateArgs} args - Arguments to update one RecuperacionPassword.
     * @example
     * // Update one RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecuperacionPasswordUpdateArgs>(args: SelectSubset<T, RecuperacionPasswordUpdateArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecuperacionPasswords.
     * @param {RecuperacionPasswordDeleteManyArgs} args - Arguments to filter RecuperacionPasswords to delete.
     * @example
     * // Delete a few RecuperacionPasswords
     * const { count } = await prisma.recuperacionPassword.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecuperacionPasswordDeleteManyArgs>(args?: SelectSubset<T, RecuperacionPasswordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecuperacionPasswords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecuperacionPasswords
     * const recuperacionPassword = await prisma.recuperacionPassword.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecuperacionPasswordUpdateManyArgs>(args: SelectSubset<T, RecuperacionPasswordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecuperacionPasswords and returns the data updated in the database.
     * @param {RecuperacionPasswordUpdateManyAndReturnArgs} args - Arguments to update many RecuperacionPasswords.
     * @example
     * // Update many RecuperacionPasswords
     * const recuperacionPassword = await prisma.recuperacionPassword.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecuperacionPasswords and only return the `id`
     * const recuperacionPasswordWithIdOnly = await prisma.recuperacionPassword.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecuperacionPasswordUpdateManyAndReturnArgs>(args: SelectSubset<T, RecuperacionPasswordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecuperacionPassword.
     * @param {RecuperacionPasswordUpsertArgs} args - Arguments to update or create a RecuperacionPassword.
     * @example
     * // Update or create a RecuperacionPassword
     * const recuperacionPassword = await prisma.recuperacionPassword.upsert({
     *   create: {
     *     // ... data to create a RecuperacionPassword
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecuperacionPassword we want to update
     *   }
     * })
     */
    upsert<T extends RecuperacionPasswordUpsertArgs>(args: SelectSubset<T, RecuperacionPasswordUpsertArgs<ExtArgs>>): Prisma__RecuperacionPasswordClient<$Result.GetResult<Prisma.$RecuperacionPasswordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecuperacionPasswords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordCountArgs} args - Arguments to filter RecuperacionPasswords to count.
     * @example
     * // Count the number of RecuperacionPasswords
     * const count = await prisma.recuperacionPassword.count({
     *   where: {
     *     // ... the filter for the RecuperacionPasswords we want to count
     *   }
     * })
    **/
    count<T extends RecuperacionPasswordCountArgs>(
      args?: Subset<T, RecuperacionPasswordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecuperacionPasswordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecuperacionPassword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecuperacionPasswordAggregateArgs>(args: Subset<T, RecuperacionPasswordAggregateArgs>): Prisma.PrismaPromise<GetRecuperacionPasswordAggregateType<T>>

    /**
     * Group by RecuperacionPassword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecuperacionPasswordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecuperacionPasswordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecuperacionPasswordGroupByArgs['orderBy'] }
        : { orderBy?: RecuperacionPasswordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecuperacionPasswordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecuperacionPasswordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecuperacionPassword model
   */
  readonly fields: RecuperacionPasswordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecuperacionPassword.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecuperacionPasswordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecuperacionPassword model
   */
  interface RecuperacionPasswordFieldRefs {
    readonly id: FieldRef<"RecuperacionPassword", 'Int'>
    readonly userId: FieldRef<"RecuperacionPassword", 'Int'>
    readonly tokenHash: FieldRef<"RecuperacionPassword", 'String'>
    readonly expiraEn: FieldRef<"RecuperacionPassword", 'DateTime'>
    readonly usadoEn: FieldRef<"RecuperacionPassword", 'DateTime'>
    readonly creadoEn: FieldRef<"RecuperacionPassword", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecuperacionPassword findUnique
   */
  export type RecuperacionPasswordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter, which RecuperacionPassword to fetch.
     */
    where: RecuperacionPasswordWhereUniqueInput
  }

  /**
   * RecuperacionPassword findUniqueOrThrow
   */
  export type RecuperacionPasswordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter, which RecuperacionPassword to fetch.
     */
    where: RecuperacionPasswordWhereUniqueInput
  }

  /**
   * RecuperacionPassword findFirst
   */
  export type RecuperacionPasswordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter, which RecuperacionPassword to fetch.
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecuperacionPasswords to fetch.
     */
    orderBy?: RecuperacionPasswordOrderByWithRelationInput | RecuperacionPasswordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecuperacionPasswords.
     */
    cursor?: RecuperacionPasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecuperacionPasswords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecuperacionPasswords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecuperacionPasswords.
     */
    distinct?: RecuperacionPasswordScalarFieldEnum | RecuperacionPasswordScalarFieldEnum[]
  }

  /**
   * RecuperacionPassword findFirstOrThrow
   */
  export type RecuperacionPasswordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter, which RecuperacionPassword to fetch.
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecuperacionPasswords to fetch.
     */
    orderBy?: RecuperacionPasswordOrderByWithRelationInput | RecuperacionPasswordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecuperacionPasswords.
     */
    cursor?: RecuperacionPasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecuperacionPasswords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecuperacionPasswords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecuperacionPasswords.
     */
    distinct?: RecuperacionPasswordScalarFieldEnum | RecuperacionPasswordScalarFieldEnum[]
  }

  /**
   * RecuperacionPassword findMany
   */
  export type RecuperacionPasswordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter, which RecuperacionPasswords to fetch.
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecuperacionPasswords to fetch.
     */
    orderBy?: RecuperacionPasswordOrderByWithRelationInput | RecuperacionPasswordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecuperacionPasswords.
     */
    cursor?: RecuperacionPasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecuperacionPasswords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecuperacionPasswords.
     */
    skip?: number
    distinct?: RecuperacionPasswordScalarFieldEnum | RecuperacionPasswordScalarFieldEnum[]
  }

  /**
   * RecuperacionPassword create
   */
  export type RecuperacionPasswordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * The data needed to create a RecuperacionPassword.
     */
    data: XOR<RecuperacionPasswordCreateInput, RecuperacionPasswordUncheckedCreateInput>
  }

  /**
   * RecuperacionPassword createMany
   */
  export type RecuperacionPasswordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecuperacionPasswords.
     */
    data: RecuperacionPasswordCreateManyInput | RecuperacionPasswordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecuperacionPassword createManyAndReturn
   */
  export type RecuperacionPasswordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * The data used to create many RecuperacionPasswords.
     */
    data: RecuperacionPasswordCreateManyInput | RecuperacionPasswordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecuperacionPassword update
   */
  export type RecuperacionPasswordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * The data needed to update a RecuperacionPassword.
     */
    data: XOR<RecuperacionPasswordUpdateInput, RecuperacionPasswordUncheckedUpdateInput>
    /**
     * Choose, which RecuperacionPassword to update.
     */
    where: RecuperacionPasswordWhereUniqueInput
  }

  /**
   * RecuperacionPassword updateMany
   */
  export type RecuperacionPasswordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecuperacionPasswords.
     */
    data: XOR<RecuperacionPasswordUpdateManyMutationInput, RecuperacionPasswordUncheckedUpdateManyInput>
    /**
     * Filter which RecuperacionPasswords to update
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * Limit how many RecuperacionPasswords to update.
     */
    limit?: number
  }

  /**
   * RecuperacionPassword updateManyAndReturn
   */
  export type RecuperacionPasswordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * The data used to update RecuperacionPasswords.
     */
    data: XOR<RecuperacionPasswordUpdateManyMutationInput, RecuperacionPasswordUncheckedUpdateManyInput>
    /**
     * Filter which RecuperacionPasswords to update
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * Limit how many RecuperacionPasswords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecuperacionPassword upsert
   */
  export type RecuperacionPasswordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * The filter to search for the RecuperacionPassword to update in case it exists.
     */
    where: RecuperacionPasswordWhereUniqueInput
    /**
     * In case the RecuperacionPassword found by the `where` argument doesn't exist, create a new RecuperacionPassword with this data.
     */
    create: XOR<RecuperacionPasswordCreateInput, RecuperacionPasswordUncheckedCreateInput>
    /**
     * In case the RecuperacionPassword was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecuperacionPasswordUpdateInput, RecuperacionPasswordUncheckedUpdateInput>
  }

  /**
   * RecuperacionPassword delete
   */
  export type RecuperacionPasswordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
    /**
     * Filter which RecuperacionPassword to delete.
     */
    where: RecuperacionPasswordWhereUniqueInput
  }

  /**
   * RecuperacionPassword deleteMany
   */
  export type RecuperacionPasswordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecuperacionPasswords to delete
     */
    where?: RecuperacionPasswordWhereInput
    /**
     * Limit how many RecuperacionPasswords to delete.
     */
    limit?: number
  }

  /**
   * RecuperacionPassword without action
   */
  export type RecuperacionPasswordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecuperacionPassword
     */
    select?: RecuperacionPasswordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecuperacionPassword
     */
    omit?: RecuperacionPasswordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecuperacionPasswordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    rol: 'rol',
    modoPruebas: 'modoPruebas',
    visibleEnRanking: 'visibleEnRanking',
    creadoEn: 'creadoEn',
    terminosVersion: 'terminosVersion',
    terminosAceptadosEn: 'terminosAceptadosEn',
    neuronas: 'neuronas',
    maxNeuronas: 'maxNeuronas',
    ultimaRecarga: 'ultimaRecarga'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ProgresoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    seccion: 'seccion',
    nivel: 'nivel',
    actividad: 'actividad',
    completado: 'completado',
    score: 'score',
    tiempo: 'tiempo',
    fecha: 'fecha'
  };

  export type ProgresoScalarFieldEnum = (typeof ProgresoScalarFieldEnum)[keyof typeof ProgresoScalarFieldEnum]


  export const ProgresoParcialScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    seccion: 'seccion',
    nivel: 'nivel',
    actividad: 'actividad',
    estado: 'estado',
    vidas: 'vidas',
    actualizado: 'actualizado'
  };

  export type ProgresoParcialScalarFieldEnum = (typeof ProgresoParcialScalarFieldEnum)[keyof typeof ProgresoParcialScalarFieldEnum]


  export const NivelScalarFieldEnum: {
    id: 'id',
    seccion: 'seccion',
    clave: 'clave',
    titulo: 'titulo',
    texto: 'texto',
    objetivo: 'objetivo',
    orden: 'orden'
  };

  export type NivelScalarFieldEnum = (typeof NivelScalarFieldEnum)[keyof typeof NivelScalarFieldEnum]


  export const ActividadScalarFieldEnum: {
    id: 'id',
    nivelId: 'nivelId',
    clave: 'clave',
    titulo: 'titulo',
    descripcion: 'descripcion',
    objetivo: 'objetivo',
    minutos: 'minutos',
    juego: 'juego',
    reglas: 'reglas',
    ejemplo: 'ejemplo',
    orden: 'orden'
  };

  export type ActividadScalarFieldEnum = (typeof ActividadScalarFieldEnum)[keyof typeof ActividadScalarFieldEnum]


  export const RecuperacionPasswordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiraEn: 'expiraEn',
    usadoEn: 'usadoEn',
    creadoEn: 'creadoEn'
  };

  export type RecuperacionPasswordScalarFieldEnum = (typeof RecuperacionPasswordScalarFieldEnum)[keyof typeof RecuperacionPasswordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Rol'
   */
  export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>
    


  /**
   * Reference to a field of type 'Rol[]'
   */
  export type ListEnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    username?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    modoPruebas?: BoolFilter<"Usuario"> | boolean
    visibleEnRanking?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    terminosVersion?: StringNullableFilter<"Usuario"> | string | null
    terminosAceptadosEn?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    neuronas?: IntFilter<"Usuario"> | number
    maxNeuronas?: IntFilter<"Usuario"> | number
    ultimaRecarga?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    progreso?: ProgresoListRelationFilter
    parciales?: ProgresoParcialListRelationFilter
    recuperaciones?: RecuperacionPasswordListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    modoPruebas?: SortOrder
    visibleEnRanking?: SortOrder
    creadoEn?: SortOrder
    terminosVersion?: SortOrderInput | SortOrder
    terminosAceptadosEn?: SortOrderInput | SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
    ultimaRecarga?: SortOrderInput | SortOrder
    progreso?: ProgresoOrderByRelationAggregateInput
    parciales?: ProgresoParcialOrderByRelationAggregateInput
    recuperaciones?: RecuperacionPasswordOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    password?: StringFilter<"Usuario"> | string
    rol?: EnumRolFilter<"Usuario"> | $Enums.Rol
    modoPruebas?: BoolFilter<"Usuario"> | boolean
    visibleEnRanking?: BoolFilter<"Usuario"> | boolean
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    terminosVersion?: StringNullableFilter<"Usuario"> | string | null
    terminosAceptadosEn?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    neuronas?: IntFilter<"Usuario"> | number
    maxNeuronas?: IntFilter<"Usuario"> | number
    ultimaRecarga?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    progreso?: ProgresoListRelationFilter
    parciales?: ProgresoParcialListRelationFilter
    recuperaciones?: RecuperacionPasswordListRelationFilter
  }, "id" | "username" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    modoPruebas?: SortOrder
    visibleEnRanking?: SortOrder
    creadoEn?: SortOrder
    terminosVersion?: SortOrderInput | SortOrder
    terminosAceptadosEn?: SortOrderInput | SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
    ultimaRecarga?: SortOrderInput | SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    username?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: EnumRolWithAggregatesFilter<"Usuario"> | $Enums.Rol
    modoPruebas?: BoolWithAggregatesFilter<"Usuario"> | boolean
    visibleEnRanking?: BoolWithAggregatesFilter<"Usuario"> | boolean
    creadoEn?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    terminosVersion?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    terminosAceptadosEn?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    neuronas?: IntWithAggregatesFilter<"Usuario"> | number
    maxNeuronas?: IntWithAggregatesFilter<"Usuario"> | number
    ultimaRecarga?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
  }

  export type ProgresoWhereInput = {
    AND?: ProgresoWhereInput | ProgresoWhereInput[]
    OR?: ProgresoWhereInput[]
    NOT?: ProgresoWhereInput | ProgresoWhereInput[]
    id?: IntFilter<"Progreso"> | number
    userId?: IntFilter<"Progreso"> | number
    seccion?: StringFilter<"Progreso"> | string
    nivel?: StringFilter<"Progreso"> | string
    actividad?: StringFilter<"Progreso"> | string
    completado?: BoolFilter<"Progreso"> | boolean
    score?: IntFilter<"Progreso"> | number
    tiempo?: IntFilter<"Progreso"> | number
    fecha?: DateTimeFilter<"Progreso"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type ProgresoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    completado?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
    fecha?: SortOrder
    user?: UsuarioOrderByWithRelationInput
  }

  export type ProgresoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_seccion_nivel_actividad?: ProgresoUserId_seccion_nivel_actividadCompoundUniqueInput
    AND?: ProgresoWhereInput | ProgresoWhereInput[]
    OR?: ProgresoWhereInput[]
    NOT?: ProgresoWhereInput | ProgresoWhereInput[]
    userId?: IntFilter<"Progreso"> | number
    seccion?: StringFilter<"Progreso"> | string
    nivel?: StringFilter<"Progreso"> | string
    actividad?: StringFilter<"Progreso"> | string
    completado?: BoolFilter<"Progreso"> | boolean
    score?: IntFilter<"Progreso"> | number
    tiempo?: IntFilter<"Progreso"> | number
    fecha?: DateTimeFilter<"Progreso"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "userId_seccion_nivel_actividad">

  export type ProgresoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    completado?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
    fecha?: SortOrder
    _count?: ProgresoCountOrderByAggregateInput
    _avg?: ProgresoAvgOrderByAggregateInput
    _max?: ProgresoMaxOrderByAggregateInput
    _min?: ProgresoMinOrderByAggregateInput
    _sum?: ProgresoSumOrderByAggregateInput
  }

  export type ProgresoScalarWhereWithAggregatesInput = {
    AND?: ProgresoScalarWhereWithAggregatesInput | ProgresoScalarWhereWithAggregatesInput[]
    OR?: ProgresoScalarWhereWithAggregatesInput[]
    NOT?: ProgresoScalarWhereWithAggregatesInput | ProgresoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Progreso"> | number
    userId?: IntWithAggregatesFilter<"Progreso"> | number
    seccion?: StringWithAggregatesFilter<"Progreso"> | string
    nivel?: StringWithAggregatesFilter<"Progreso"> | string
    actividad?: StringWithAggregatesFilter<"Progreso"> | string
    completado?: BoolWithAggregatesFilter<"Progreso"> | boolean
    score?: IntWithAggregatesFilter<"Progreso"> | number
    tiempo?: IntWithAggregatesFilter<"Progreso"> | number
    fecha?: DateTimeWithAggregatesFilter<"Progreso"> | Date | string
  }

  export type ProgresoParcialWhereInput = {
    AND?: ProgresoParcialWhereInput | ProgresoParcialWhereInput[]
    OR?: ProgresoParcialWhereInput[]
    NOT?: ProgresoParcialWhereInput | ProgresoParcialWhereInput[]
    id?: IntFilter<"ProgresoParcial"> | number
    userId?: IntFilter<"ProgresoParcial"> | number
    seccion?: StringFilter<"ProgresoParcial"> | string
    nivel?: StringFilter<"ProgresoParcial"> | string
    actividad?: StringFilter<"ProgresoParcial"> | string
    estado?: JsonFilter<"ProgresoParcial">
    vidas?: IntFilter<"ProgresoParcial"> | number
    actualizado?: DateTimeFilter<"ProgresoParcial"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type ProgresoParcialOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    estado?: SortOrder
    vidas?: SortOrder
    actualizado?: SortOrder
    user?: UsuarioOrderByWithRelationInput
  }

  export type ProgresoParcialWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_seccion_nivel_actividad?: ProgresoParcialUserId_seccion_nivel_actividadCompoundUniqueInput
    AND?: ProgresoParcialWhereInput | ProgresoParcialWhereInput[]
    OR?: ProgresoParcialWhereInput[]
    NOT?: ProgresoParcialWhereInput | ProgresoParcialWhereInput[]
    userId?: IntFilter<"ProgresoParcial"> | number
    seccion?: StringFilter<"ProgresoParcial"> | string
    nivel?: StringFilter<"ProgresoParcial"> | string
    actividad?: StringFilter<"ProgresoParcial"> | string
    estado?: JsonFilter<"ProgresoParcial">
    vidas?: IntFilter<"ProgresoParcial"> | number
    actualizado?: DateTimeFilter<"ProgresoParcial"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "userId_seccion_nivel_actividad">

  export type ProgresoParcialOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    estado?: SortOrder
    vidas?: SortOrder
    actualizado?: SortOrder
    _count?: ProgresoParcialCountOrderByAggregateInput
    _avg?: ProgresoParcialAvgOrderByAggregateInput
    _max?: ProgresoParcialMaxOrderByAggregateInput
    _min?: ProgresoParcialMinOrderByAggregateInput
    _sum?: ProgresoParcialSumOrderByAggregateInput
  }

  export type ProgresoParcialScalarWhereWithAggregatesInput = {
    AND?: ProgresoParcialScalarWhereWithAggregatesInput | ProgresoParcialScalarWhereWithAggregatesInput[]
    OR?: ProgresoParcialScalarWhereWithAggregatesInput[]
    NOT?: ProgresoParcialScalarWhereWithAggregatesInput | ProgresoParcialScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProgresoParcial"> | number
    userId?: IntWithAggregatesFilter<"ProgresoParcial"> | number
    seccion?: StringWithAggregatesFilter<"ProgresoParcial"> | string
    nivel?: StringWithAggregatesFilter<"ProgresoParcial"> | string
    actividad?: StringWithAggregatesFilter<"ProgresoParcial"> | string
    estado?: JsonWithAggregatesFilter<"ProgresoParcial">
    vidas?: IntWithAggregatesFilter<"ProgresoParcial"> | number
    actualizado?: DateTimeWithAggregatesFilter<"ProgresoParcial"> | Date | string
  }

  export type NivelWhereInput = {
    AND?: NivelWhereInput | NivelWhereInput[]
    OR?: NivelWhereInput[]
    NOT?: NivelWhereInput | NivelWhereInput[]
    id?: IntFilter<"Nivel"> | number
    seccion?: StringFilter<"Nivel"> | string
    clave?: StringFilter<"Nivel"> | string
    titulo?: StringFilter<"Nivel"> | string
    texto?: StringFilter<"Nivel"> | string
    objetivo?: StringFilter<"Nivel"> | string
    orden?: IntFilter<"Nivel"> | number
    actividades?: ActividadListRelationFilter
  }

  export type NivelOrderByWithRelationInput = {
    id?: SortOrder
    seccion?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    texto?: SortOrder
    objetivo?: SortOrder
    orden?: SortOrder
    actividades?: ActividadOrderByRelationAggregateInput
  }

  export type NivelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    seccion_clave?: NivelSeccionClaveCompoundUniqueInput
    AND?: NivelWhereInput | NivelWhereInput[]
    OR?: NivelWhereInput[]
    NOT?: NivelWhereInput | NivelWhereInput[]
    seccion?: StringFilter<"Nivel"> | string
    clave?: StringFilter<"Nivel"> | string
    titulo?: StringFilter<"Nivel"> | string
    texto?: StringFilter<"Nivel"> | string
    objetivo?: StringFilter<"Nivel"> | string
    orden?: IntFilter<"Nivel"> | number
    actividades?: ActividadListRelationFilter
  }, "id" | "seccion_clave">

  export type NivelOrderByWithAggregationInput = {
    id?: SortOrder
    seccion?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    texto?: SortOrder
    objetivo?: SortOrder
    orden?: SortOrder
    _count?: NivelCountOrderByAggregateInput
    _avg?: NivelAvgOrderByAggregateInput
    _max?: NivelMaxOrderByAggregateInput
    _min?: NivelMinOrderByAggregateInput
    _sum?: NivelSumOrderByAggregateInput
  }

  export type NivelScalarWhereWithAggregatesInput = {
    AND?: NivelScalarWhereWithAggregatesInput | NivelScalarWhereWithAggregatesInput[]
    OR?: NivelScalarWhereWithAggregatesInput[]
    NOT?: NivelScalarWhereWithAggregatesInput | NivelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Nivel"> | number
    seccion?: StringWithAggregatesFilter<"Nivel"> | string
    clave?: StringWithAggregatesFilter<"Nivel"> | string
    titulo?: StringWithAggregatesFilter<"Nivel"> | string
    texto?: StringWithAggregatesFilter<"Nivel"> | string
    objetivo?: StringWithAggregatesFilter<"Nivel"> | string
    orden?: IntWithAggregatesFilter<"Nivel"> | number
  }

  export type ActividadWhereInput = {
    AND?: ActividadWhereInput | ActividadWhereInput[]
    OR?: ActividadWhereInput[]
    NOT?: ActividadWhereInput | ActividadWhereInput[]
    id?: IntFilter<"Actividad"> | number
    nivelId?: IntFilter<"Actividad"> | number
    clave?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    descripcion?: StringFilter<"Actividad"> | string
    objetivo?: StringFilter<"Actividad"> | string
    minutos?: IntFilter<"Actividad"> | number
    juego?: StringFilter<"Actividad"> | string
    reglas?: JsonFilter<"Actividad">
    ejemplo?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
    nivel?: XOR<NivelScalarRelationFilter, NivelWhereInput>
  }

  export type ActividadOrderByWithRelationInput = {
    id?: SortOrder
    nivelId?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    objetivo?: SortOrder
    minutos?: SortOrder
    juego?: SortOrder
    reglas?: SortOrder
    ejemplo?: SortOrder
    orden?: SortOrder
    nivel?: NivelOrderByWithRelationInput
  }

  export type ActividadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nivelId_clave?: ActividadNivelIdClaveCompoundUniqueInput
    AND?: ActividadWhereInput | ActividadWhereInput[]
    OR?: ActividadWhereInput[]
    NOT?: ActividadWhereInput | ActividadWhereInput[]
    nivelId?: IntFilter<"Actividad"> | number
    clave?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    descripcion?: StringFilter<"Actividad"> | string
    objetivo?: StringFilter<"Actividad"> | string
    minutos?: IntFilter<"Actividad"> | number
    juego?: StringFilter<"Actividad"> | string
    reglas?: JsonFilter<"Actividad">
    ejemplo?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
    nivel?: XOR<NivelScalarRelationFilter, NivelWhereInput>
  }, "id" | "nivelId_clave">

  export type ActividadOrderByWithAggregationInput = {
    id?: SortOrder
    nivelId?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    objetivo?: SortOrder
    minutos?: SortOrder
    juego?: SortOrder
    reglas?: SortOrder
    ejemplo?: SortOrder
    orden?: SortOrder
    _count?: ActividadCountOrderByAggregateInput
    _avg?: ActividadAvgOrderByAggregateInput
    _max?: ActividadMaxOrderByAggregateInput
    _min?: ActividadMinOrderByAggregateInput
    _sum?: ActividadSumOrderByAggregateInput
  }

  export type ActividadScalarWhereWithAggregatesInput = {
    AND?: ActividadScalarWhereWithAggregatesInput | ActividadScalarWhereWithAggregatesInput[]
    OR?: ActividadScalarWhereWithAggregatesInput[]
    NOT?: ActividadScalarWhereWithAggregatesInput | ActividadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Actividad"> | number
    nivelId?: IntWithAggregatesFilter<"Actividad"> | number
    clave?: StringWithAggregatesFilter<"Actividad"> | string
    titulo?: StringWithAggregatesFilter<"Actividad"> | string
    descripcion?: StringWithAggregatesFilter<"Actividad"> | string
    objetivo?: StringWithAggregatesFilter<"Actividad"> | string
    minutos?: IntWithAggregatesFilter<"Actividad"> | number
    juego?: StringWithAggregatesFilter<"Actividad"> | string
    reglas?: JsonWithAggregatesFilter<"Actividad">
    ejemplo?: JsonWithAggregatesFilter<"Actividad">
    orden?: IntWithAggregatesFilter<"Actividad"> | number
  }

  export type RecuperacionPasswordWhereInput = {
    AND?: RecuperacionPasswordWhereInput | RecuperacionPasswordWhereInput[]
    OR?: RecuperacionPasswordWhereInput[]
    NOT?: RecuperacionPasswordWhereInput | RecuperacionPasswordWhereInput[]
    id?: IntFilter<"RecuperacionPassword"> | number
    userId?: IntFilter<"RecuperacionPassword"> | number
    tokenHash?: StringFilter<"RecuperacionPassword"> | string
    expiraEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
    usadoEn?: DateTimeNullableFilter<"RecuperacionPassword"> | Date | string | null
    creadoEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type RecuperacionPasswordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiraEn?: SortOrder
    usadoEn?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    user?: UsuarioOrderByWithRelationInput
  }

  export type RecuperacionPasswordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tokenHash?: string
    AND?: RecuperacionPasswordWhereInput | RecuperacionPasswordWhereInput[]
    OR?: RecuperacionPasswordWhereInput[]
    NOT?: RecuperacionPasswordWhereInput | RecuperacionPasswordWhereInput[]
    userId?: IntFilter<"RecuperacionPassword"> | number
    expiraEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
    usadoEn?: DateTimeNullableFilter<"RecuperacionPassword"> | Date | string | null
    creadoEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
    user?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "tokenHash">

  export type RecuperacionPasswordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiraEn?: SortOrder
    usadoEn?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    _count?: RecuperacionPasswordCountOrderByAggregateInput
    _avg?: RecuperacionPasswordAvgOrderByAggregateInput
    _max?: RecuperacionPasswordMaxOrderByAggregateInput
    _min?: RecuperacionPasswordMinOrderByAggregateInput
    _sum?: RecuperacionPasswordSumOrderByAggregateInput
  }

  export type RecuperacionPasswordScalarWhereWithAggregatesInput = {
    AND?: RecuperacionPasswordScalarWhereWithAggregatesInput | RecuperacionPasswordScalarWhereWithAggregatesInput[]
    OR?: RecuperacionPasswordScalarWhereWithAggregatesInput[]
    NOT?: RecuperacionPasswordScalarWhereWithAggregatesInput | RecuperacionPasswordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RecuperacionPassword"> | number
    userId?: IntWithAggregatesFilter<"RecuperacionPassword"> | number
    tokenHash?: StringWithAggregatesFilter<"RecuperacionPassword"> | string
    expiraEn?: DateTimeWithAggregatesFilter<"RecuperacionPassword"> | Date | string
    usadoEn?: DateTimeNullableWithAggregatesFilter<"RecuperacionPassword"> | Date | string | null
    creadoEn?: DateTimeWithAggregatesFilter<"RecuperacionPassword"> | Date | string
  }

  export type UsuarioCreateInput = {
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoCreateNestedManyWithoutUserInput
    parciales?: ProgresoParcialCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoUncheckedCreateNestedManyWithoutUserInput
    parciales?: ProgresoParcialUncheckedCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUpdateManyWithoutUserNestedInput
    parciales?: ProgresoParcialUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUncheckedUpdateManyWithoutUserNestedInput
    parciales?: ProgresoParcialUncheckedUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
  }

  export type UsuarioUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProgresoCreateInput = {
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
    user: UsuarioCreateNestedOneWithoutProgresoInput
  }

  export type ProgresoUncheckedCreateInput = {
    id?: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
  }

  export type ProgresoUpdateInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsuarioUpdateOneRequiredWithoutProgresoNestedInput
  }

  export type ProgresoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoCreateManyInput = {
    id?: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
  }

  export type ProgresoUpdateManyMutationInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialCreateInput = {
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
    user: UsuarioCreateNestedOneWithoutParcialesInput
  }

  export type ProgresoParcialUncheckedCreateInput = {
    id?: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
  }

  export type ProgresoParcialUpdateInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsuarioUpdateOneRequiredWithoutParcialesNestedInput
  }

  export type ProgresoParcialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialCreateManyInput = {
    id?: number
    userId: number
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
  }

  export type ProgresoParcialUpdateManyMutationInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NivelCreateInput = {
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
    actividades?: ActividadCreateNestedManyWithoutNivelInput
  }

  export type NivelUncheckedCreateInput = {
    id?: number
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
    actividades?: ActividadUncheckedCreateNestedManyWithoutNivelInput
  }

  export type NivelUpdateInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    actividades?: ActividadUpdateManyWithoutNivelNestedInput
  }

  export type NivelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    actividades?: ActividadUncheckedUpdateManyWithoutNivelNestedInput
  }

  export type NivelCreateManyInput = {
    id?: number
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
  }

  export type NivelUpdateManyMutationInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type NivelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type ActividadCreateInput = {
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
    nivel: NivelCreateNestedOneWithoutActividadesInput
  }

  export type ActividadUncheckedCreateInput = {
    id?: number
    nivelId: number
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
  }

  export type ActividadUpdateInput = {
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
    nivel?: NivelUpdateOneRequiredWithoutActividadesNestedInput
  }

  export type ActividadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nivelId?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type ActividadCreateManyInput = {
    id?: number
    nivelId: number
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
  }

  export type ActividadUpdateManyMutationInput = {
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type ActividadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nivelId?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type RecuperacionPasswordCreateInput = {
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
    user: UsuarioCreateNestedOneWithoutRecuperacionesInput
  }

  export type RecuperacionPasswordUncheckedCreateInput = {
    id?: number
    userId: number
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
  }

  export type RecuperacionPasswordUpdateInput = {
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsuarioUpdateOneRequiredWithoutRecuperacionesNestedInput
  }

  export type RecuperacionPasswordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecuperacionPasswordCreateManyInput = {
    id?: number
    userId: number
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
  }

  export type RecuperacionPasswordUpdateManyMutationInput = {
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecuperacionPasswordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProgresoListRelationFilter = {
    every?: ProgresoWhereInput
    some?: ProgresoWhereInput
    none?: ProgresoWhereInput
  }

  export type ProgresoParcialListRelationFilter = {
    every?: ProgresoParcialWhereInput
    some?: ProgresoParcialWhereInput
    none?: ProgresoParcialWhereInput
  }

  export type RecuperacionPasswordListRelationFilter = {
    every?: RecuperacionPasswordWhereInput
    some?: RecuperacionPasswordWhereInput
    none?: RecuperacionPasswordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProgresoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgresoParcialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecuperacionPasswordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    modoPruebas?: SortOrder
    visibleEnRanking?: SortOrder
    creadoEn?: SortOrder
    terminosVersion?: SortOrder
    terminosAceptadosEn?: SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
    ultimaRecarga?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    modoPruebas?: SortOrder
    visibleEnRanking?: SortOrder
    creadoEn?: SortOrder
    terminosVersion?: SortOrder
    terminosAceptadosEn?: SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
    ultimaRecarga?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    modoPruebas?: SortOrder
    visibleEnRanking?: SortOrder
    creadoEn?: SortOrder
    terminosVersion?: SortOrder
    terminosAceptadosEn?: SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
    ultimaRecarga?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
    neuronas?: SortOrder
    maxNeuronas?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type ProgresoUserId_seccion_nivel_actividadCompoundUniqueInput = {
    userId: number
    seccion: string
    nivel: string
    actividad: string
  }

  export type ProgresoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    completado?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
    fecha?: SortOrder
  }

  export type ProgresoAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
  }

  export type ProgresoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    completado?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
    fecha?: SortOrder
  }

  export type ProgresoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    completado?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
    fecha?: SortOrder
  }

  export type ProgresoSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    tiempo?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProgresoParcialUserId_seccion_nivel_actividadCompoundUniqueInput = {
    userId: number
    seccion: string
    nivel: string
    actividad: string
  }

  export type ProgresoParcialCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    estado?: SortOrder
    vidas?: SortOrder
    actualizado?: SortOrder
  }

  export type ProgresoParcialAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vidas?: SortOrder
  }

  export type ProgresoParcialMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    vidas?: SortOrder
    actualizado?: SortOrder
  }

  export type ProgresoParcialMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    seccion?: SortOrder
    nivel?: SortOrder
    actividad?: SortOrder
    vidas?: SortOrder
    actualizado?: SortOrder
  }

  export type ProgresoParcialSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    vidas?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ActividadListRelationFilter = {
    every?: ActividadWhereInput
    some?: ActividadWhereInput
    none?: ActividadWhereInput
  }

  export type ActividadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NivelSeccionClaveCompoundUniqueInput = {
    seccion: string
    clave: string
  }

  export type NivelCountOrderByAggregateInput = {
    id?: SortOrder
    seccion?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    texto?: SortOrder
    objetivo?: SortOrder
    orden?: SortOrder
  }

  export type NivelAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type NivelMaxOrderByAggregateInput = {
    id?: SortOrder
    seccion?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    texto?: SortOrder
    objetivo?: SortOrder
    orden?: SortOrder
  }

  export type NivelMinOrderByAggregateInput = {
    id?: SortOrder
    seccion?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    texto?: SortOrder
    objetivo?: SortOrder
    orden?: SortOrder
  }

  export type NivelSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type NivelScalarRelationFilter = {
    is?: NivelWhereInput
    isNot?: NivelWhereInput
  }

  export type ActividadNivelIdClaveCompoundUniqueInput = {
    nivelId: number
    clave: string
  }

  export type ActividadCountOrderByAggregateInput = {
    id?: SortOrder
    nivelId?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    objetivo?: SortOrder
    minutos?: SortOrder
    juego?: SortOrder
    reglas?: SortOrder
    ejemplo?: SortOrder
    orden?: SortOrder
  }

  export type ActividadAvgOrderByAggregateInput = {
    id?: SortOrder
    nivelId?: SortOrder
    minutos?: SortOrder
    orden?: SortOrder
  }

  export type ActividadMaxOrderByAggregateInput = {
    id?: SortOrder
    nivelId?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    objetivo?: SortOrder
    minutos?: SortOrder
    juego?: SortOrder
    orden?: SortOrder
  }

  export type ActividadMinOrderByAggregateInput = {
    id?: SortOrder
    nivelId?: SortOrder
    clave?: SortOrder
    titulo?: SortOrder
    descripcion?: SortOrder
    objetivo?: SortOrder
    minutos?: SortOrder
    juego?: SortOrder
    orden?: SortOrder
  }

  export type ActividadSumOrderByAggregateInput = {
    id?: SortOrder
    nivelId?: SortOrder
    minutos?: SortOrder
    orden?: SortOrder
  }

  export type RecuperacionPasswordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiraEn?: SortOrder
    usadoEn?: SortOrder
    creadoEn?: SortOrder
  }

  export type RecuperacionPasswordAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type RecuperacionPasswordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiraEn?: SortOrder
    usadoEn?: SortOrder
    creadoEn?: SortOrder
  }

  export type RecuperacionPasswordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiraEn?: SortOrder
    usadoEn?: SortOrder
    creadoEn?: SortOrder
  }

  export type RecuperacionPasswordSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ProgresoCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput> | ProgresoCreateWithoutUserInput[] | ProgresoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoCreateOrConnectWithoutUserInput | ProgresoCreateOrConnectWithoutUserInput[]
    createMany?: ProgresoCreateManyUserInputEnvelope
    connect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
  }

  export type ProgresoParcialCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput> | ProgresoParcialCreateWithoutUserInput[] | ProgresoParcialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoParcialCreateOrConnectWithoutUserInput | ProgresoParcialCreateOrConnectWithoutUserInput[]
    createMany?: ProgresoParcialCreateManyUserInputEnvelope
    connect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
  }

  export type RecuperacionPasswordCreateNestedManyWithoutUserInput = {
    create?: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput> | RecuperacionPasswordCreateWithoutUserInput[] | RecuperacionPasswordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecuperacionPasswordCreateOrConnectWithoutUserInput | RecuperacionPasswordCreateOrConnectWithoutUserInput[]
    createMany?: RecuperacionPasswordCreateManyUserInputEnvelope
    connect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
  }

  export type ProgresoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput> | ProgresoCreateWithoutUserInput[] | ProgresoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoCreateOrConnectWithoutUserInput | ProgresoCreateOrConnectWithoutUserInput[]
    createMany?: ProgresoCreateManyUserInputEnvelope
    connect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
  }

  export type ProgresoParcialUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput> | ProgresoParcialCreateWithoutUserInput[] | ProgresoParcialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoParcialCreateOrConnectWithoutUserInput | ProgresoParcialCreateOrConnectWithoutUserInput[]
    createMany?: ProgresoParcialCreateManyUserInputEnvelope
    connect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
  }

  export type RecuperacionPasswordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput> | RecuperacionPasswordCreateWithoutUserInput[] | RecuperacionPasswordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecuperacionPasswordCreateOrConnectWithoutUserInput | RecuperacionPasswordCreateOrConnectWithoutUserInput[]
    createMany?: RecuperacionPasswordCreateManyUserInputEnvelope
    connect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRolFieldUpdateOperationsInput = {
    set?: $Enums.Rol
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProgresoUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput> | ProgresoCreateWithoutUserInput[] | ProgresoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoCreateOrConnectWithoutUserInput | ProgresoCreateOrConnectWithoutUserInput[]
    upsert?: ProgresoUpsertWithWhereUniqueWithoutUserInput | ProgresoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgresoCreateManyUserInputEnvelope
    set?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    disconnect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    delete?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    connect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    update?: ProgresoUpdateWithWhereUniqueWithoutUserInput | ProgresoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgresoUpdateManyWithWhereWithoutUserInput | ProgresoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgresoScalarWhereInput | ProgresoScalarWhereInput[]
  }

  export type ProgresoParcialUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput> | ProgresoParcialCreateWithoutUserInput[] | ProgresoParcialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoParcialCreateOrConnectWithoutUserInput | ProgresoParcialCreateOrConnectWithoutUserInput[]
    upsert?: ProgresoParcialUpsertWithWhereUniqueWithoutUserInput | ProgresoParcialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgresoParcialCreateManyUserInputEnvelope
    set?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    disconnect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    delete?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    connect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    update?: ProgresoParcialUpdateWithWhereUniqueWithoutUserInput | ProgresoParcialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgresoParcialUpdateManyWithWhereWithoutUserInput | ProgresoParcialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgresoParcialScalarWhereInput | ProgresoParcialScalarWhereInput[]
  }

  export type RecuperacionPasswordUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput> | RecuperacionPasswordCreateWithoutUserInput[] | RecuperacionPasswordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecuperacionPasswordCreateOrConnectWithoutUserInput | RecuperacionPasswordCreateOrConnectWithoutUserInput[]
    upsert?: RecuperacionPasswordUpsertWithWhereUniqueWithoutUserInput | RecuperacionPasswordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecuperacionPasswordCreateManyUserInputEnvelope
    set?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    disconnect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    delete?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    connect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    update?: RecuperacionPasswordUpdateWithWhereUniqueWithoutUserInput | RecuperacionPasswordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecuperacionPasswordUpdateManyWithWhereWithoutUserInput | RecuperacionPasswordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecuperacionPasswordScalarWhereInput | RecuperacionPasswordScalarWhereInput[]
  }

  export type ProgresoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput> | ProgresoCreateWithoutUserInput[] | ProgresoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoCreateOrConnectWithoutUserInput | ProgresoCreateOrConnectWithoutUserInput[]
    upsert?: ProgresoUpsertWithWhereUniqueWithoutUserInput | ProgresoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgresoCreateManyUserInputEnvelope
    set?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    disconnect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    delete?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    connect?: ProgresoWhereUniqueInput | ProgresoWhereUniqueInput[]
    update?: ProgresoUpdateWithWhereUniqueWithoutUserInput | ProgresoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgresoUpdateManyWithWhereWithoutUserInput | ProgresoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgresoScalarWhereInput | ProgresoScalarWhereInput[]
  }

  export type ProgresoParcialUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput> | ProgresoParcialCreateWithoutUserInput[] | ProgresoParcialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgresoParcialCreateOrConnectWithoutUserInput | ProgresoParcialCreateOrConnectWithoutUserInput[]
    upsert?: ProgresoParcialUpsertWithWhereUniqueWithoutUserInput | ProgresoParcialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgresoParcialCreateManyUserInputEnvelope
    set?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    disconnect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    delete?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    connect?: ProgresoParcialWhereUniqueInput | ProgresoParcialWhereUniqueInput[]
    update?: ProgresoParcialUpdateWithWhereUniqueWithoutUserInput | ProgresoParcialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgresoParcialUpdateManyWithWhereWithoutUserInput | ProgresoParcialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgresoParcialScalarWhereInput | ProgresoParcialScalarWhereInput[]
  }

  export type RecuperacionPasswordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput> | RecuperacionPasswordCreateWithoutUserInput[] | RecuperacionPasswordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecuperacionPasswordCreateOrConnectWithoutUserInput | RecuperacionPasswordCreateOrConnectWithoutUserInput[]
    upsert?: RecuperacionPasswordUpsertWithWhereUniqueWithoutUserInput | RecuperacionPasswordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecuperacionPasswordCreateManyUserInputEnvelope
    set?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    disconnect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    delete?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    connect?: RecuperacionPasswordWhereUniqueInput | RecuperacionPasswordWhereUniqueInput[]
    update?: RecuperacionPasswordUpdateWithWhereUniqueWithoutUserInput | RecuperacionPasswordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecuperacionPasswordUpdateManyWithWhereWithoutUserInput | RecuperacionPasswordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecuperacionPasswordScalarWhereInput | RecuperacionPasswordScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutProgresoInput = {
    create?: XOR<UsuarioCreateWithoutProgresoInput, UsuarioUncheckedCreateWithoutProgresoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProgresoInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutProgresoNestedInput = {
    create?: XOR<UsuarioCreateWithoutProgresoInput, UsuarioUncheckedCreateWithoutProgresoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProgresoInput
    upsert?: UsuarioUpsertWithoutProgresoInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutProgresoInput, UsuarioUpdateWithoutProgresoInput>, UsuarioUncheckedUpdateWithoutProgresoInput>
  }

  export type UsuarioCreateNestedOneWithoutParcialesInput = {
    create?: XOR<UsuarioCreateWithoutParcialesInput, UsuarioUncheckedCreateWithoutParcialesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutParcialesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutParcialesNestedInput = {
    create?: XOR<UsuarioCreateWithoutParcialesInput, UsuarioUncheckedCreateWithoutParcialesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutParcialesInput
    upsert?: UsuarioUpsertWithoutParcialesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutParcialesInput, UsuarioUpdateWithoutParcialesInput>, UsuarioUncheckedUpdateWithoutParcialesInput>
  }

  export type ActividadCreateNestedManyWithoutNivelInput = {
    create?: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput> | ActividadCreateWithoutNivelInput[] | ActividadUncheckedCreateWithoutNivelInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutNivelInput | ActividadCreateOrConnectWithoutNivelInput[]
    createMany?: ActividadCreateManyNivelInputEnvelope
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
  }

  export type ActividadUncheckedCreateNestedManyWithoutNivelInput = {
    create?: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput> | ActividadCreateWithoutNivelInput[] | ActividadUncheckedCreateWithoutNivelInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutNivelInput | ActividadCreateOrConnectWithoutNivelInput[]
    createMany?: ActividadCreateManyNivelInputEnvelope
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
  }

  export type ActividadUpdateManyWithoutNivelNestedInput = {
    create?: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput> | ActividadCreateWithoutNivelInput[] | ActividadUncheckedCreateWithoutNivelInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutNivelInput | ActividadCreateOrConnectWithoutNivelInput[]
    upsert?: ActividadUpsertWithWhereUniqueWithoutNivelInput | ActividadUpsertWithWhereUniqueWithoutNivelInput[]
    createMany?: ActividadCreateManyNivelInputEnvelope
    set?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    disconnect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    delete?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    update?: ActividadUpdateWithWhereUniqueWithoutNivelInput | ActividadUpdateWithWhereUniqueWithoutNivelInput[]
    updateMany?: ActividadUpdateManyWithWhereWithoutNivelInput | ActividadUpdateManyWithWhereWithoutNivelInput[]
    deleteMany?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
  }

  export type ActividadUncheckedUpdateManyWithoutNivelNestedInput = {
    create?: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput> | ActividadCreateWithoutNivelInput[] | ActividadUncheckedCreateWithoutNivelInput[]
    connectOrCreate?: ActividadCreateOrConnectWithoutNivelInput | ActividadCreateOrConnectWithoutNivelInput[]
    upsert?: ActividadUpsertWithWhereUniqueWithoutNivelInput | ActividadUpsertWithWhereUniqueWithoutNivelInput[]
    createMany?: ActividadCreateManyNivelInputEnvelope
    set?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    disconnect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    delete?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    connect?: ActividadWhereUniqueInput | ActividadWhereUniqueInput[]
    update?: ActividadUpdateWithWhereUniqueWithoutNivelInput | ActividadUpdateWithWhereUniqueWithoutNivelInput[]
    updateMany?: ActividadUpdateManyWithWhereWithoutNivelInput | ActividadUpdateManyWithWhereWithoutNivelInput[]
    deleteMany?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
  }

  export type NivelCreateNestedOneWithoutActividadesInput = {
    create?: XOR<NivelCreateWithoutActividadesInput, NivelUncheckedCreateWithoutActividadesInput>
    connectOrCreate?: NivelCreateOrConnectWithoutActividadesInput
    connect?: NivelWhereUniqueInput
  }

  export type NivelUpdateOneRequiredWithoutActividadesNestedInput = {
    create?: XOR<NivelCreateWithoutActividadesInput, NivelUncheckedCreateWithoutActividadesInput>
    connectOrCreate?: NivelCreateOrConnectWithoutActividadesInput
    upsert?: NivelUpsertWithoutActividadesInput
    connect?: NivelWhereUniqueInput
    update?: XOR<XOR<NivelUpdateToOneWithWhereWithoutActividadesInput, NivelUpdateWithoutActividadesInput>, NivelUncheckedUpdateWithoutActividadesInput>
  }

  export type UsuarioCreateNestedOneWithoutRecuperacionesInput = {
    create?: XOR<UsuarioCreateWithoutRecuperacionesInput, UsuarioUncheckedCreateWithoutRecuperacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutRecuperacionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutRecuperacionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutRecuperacionesInput, UsuarioUncheckedCreateWithoutRecuperacionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutRecuperacionesInput
    upsert?: UsuarioUpsertWithoutRecuperacionesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutRecuperacionesInput, UsuarioUpdateWithoutRecuperacionesInput>, UsuarioUncheckedUpdateWithoutRecuperacionesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProgresoCreateWithoutUserInput = {
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
  }

  export type ProgresoUncheckedCreateWithoutUserInput = {
    id?: number
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
  }

  export type ProgresoCreateOrConnectWithoutUserInput = {
    where: ProgresoWhereUniqueInput
    create: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput>
  }

  export type ProgresoCreateManyUserInputEnvelope = {
    data: ProgresoCreateManyUserInput | ProgresoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgresoParcialCreateWithoutUserInput = {
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
  }

  export type ProgresoParcialUncheckedCreateWithoutUserInput = {
    id?: number
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
  }

  export type ProgresoParcialCreateOrConnectWithoutUserInput = {
    where: ProgresoParcialWhereUniqueInput
    create: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput>
  }

  export type ProgresoParcialCreateManyUserInputEnvelope = {
    data: ProgresoParcialCreateManyUserInput | ProgresoParcialCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecuperacionPasswordCreateWithoutUserInput = {
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
  }

  export type RecuperacionPasswordUncheckedCreateWithoutUserInput = {
    id?: number
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
  }

  export type RecuperacionPasswordCreateOrConnectWithoutUserInput = {
    where: RecuperacionPasswordWhereUniqueInput
    create: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput>
  }

  export type RecuperacionPasswordCreateManyUserInputEnvelope = {
    data: RecuperacionPasswordCreateManyUserInput | RecuperacionPasswordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgresoUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgresoWhereUniqueInput
    update: XOR<ProgresoUpdateWithoutUserInput, ProgresoUncheckedUpdateWithoutUserInput>
    create: XOR<ProgresoCreateWithoutUserInput, ProgresoUncheckedCreateWithoutUserInput>
  }

  export type ProgresoUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgresoWhereUniqueInput
    data: XOR<ProgresoUpdateWithoutUserInput, ProgresoUncheckedUpdateWithoutUserInput>
  }

  export type ProgresoUpdateManyWithWhereWithoutUserInput = {
    where: ProgresoScalarWhereInput
    data: XOR<ProgresoUpdateManyMutationInput, ProgresoUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgresoScalarWhereInput = {
    AND?: ProgresoScalarWhereInput | ProgresoScalarWhereInput[]
    OR?: ProgresoScalarWhereInput[]
    NOT?: ProgresoScalarWhereInput | ProgresoScalarWhereInput[]
    id?: IntFilter<"Progreso"> | number
    userId?: IntFilter<"Progreso"> | number
    seccion?: StringFilter<"Progreso"> | string
    nivel?: StringFilter<"Progreso"> | string
    actividad?: StringFilter<"Progreso"> | string
    completado?: BoolFilter<"Progreso"> | boolean
    score?: IntFilter<"Progreso"> | number
    tiempo?: IntFilter<"Progreso"> | number
    fecha?: DateTimeFilter<"Progreso"> | Date | string
  }

  export type ProgresoParcialUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgresoParcialWhereUniqueInput
    update: XOR<ProgresoParcialUpdateWithoutUserInput, ProgresoParcialUncheckedUpdateWithoutUserInput>
    create: XOR<ProgresoParcialCreateWithoutUserInput, ProgresoParcialUncheckedCreateWithoutUserInput>
  }

  export type ProgresoParcialUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgresoParcialWhereUniqueInput
    data: XOR<ProgresoParcialUpdateWithoutUserInput, ProgresoParcialUncheckedUpdateWithoutUserInput>
  }

  export type ProgresoParcialUpdateManyWithWhereWithoutUserInput = {
    where: ProgresoParcialScalarWhereInput
    data: XOR<ProgresoParcialUpdateManyMutationInput, ProgresoParcialUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgresoParcialScalarWhereInput = {
    AND?: ProgresoParcialScalarWhereInput | ProgresoParcialScalarWhereInput[]
    OR?: ProgresoParcialScalarWhereInput[]
    NOT?: ProgresoParcialScalarWhereInput | ProgresoParcialScalarWhereInput[]
    id?: IntFilter<"ProgresoParcial"> | number
    userId?: IntFilter<"ProgresoParcial"> | number
    seccion?: StringFilter<"ProgresoParcial"> | string
    nivel?: StringFilter<"ProgresoParcial"> | string
    actividad?: StringFilter<"ProgresoParcial"> | string
    estado?: JsonFilter<"ProgresoParcial">
    vidas?: IntFilter<"ProgresoParcial"> | number
    actualizado?: DateTimeFilter<"ProgresoParcial"> | Date | string
  }

  export type RecuperacionPasswordUpsertWithWhereUniqueWithoutUserInput = {
    where: RecuperacionPasswordWhereUniqueInput
    update: XOR<RecuperacionPasswordUpdateWithoutUserInput, RecuperacionPasswordUncheckedUpdateWithoutUserInput>
    create: XOR<RecuperacionPasswordCreateWithoutUserInput, RecuperacionPasswordUncheckedCreateWithoutUserInput>
  }

  export type RecuperacionPasswordUpdateWithWhereUniqueWithoutUserInput = {
    where: RecuperacionPasswordWhereUniqueInput
    data: XOR<RecuperacionPasswordUpdateWithoutUserInput, RecuperacionPasswordUncheckedUpdateWithoutUserInput>
  }

  export type RecuperacionPasswordUpdateManyWithWhereWithoutUserInput = {
    where: RecuperacionPasswordScalarWhereInput
    data: XOR<RecuperacionPasswordUpdateManyMutationInput, RecuperacionPasswordUncheckedUpdateManyWithoutUserInput>
  }

  export type RecuperacionPasswordScalarWhereInput = {
    AND?: RecuperacionPasswordScalarWhereInput | RecuperacionPasswordScalarWhereInput[]
    OR?: RecuperacionPasswordScalarWhereInput[]
    NOT?: RecuperacionPasswordScalarWhereInput | RecuperacionPasswordScalarWhereInput[]
    id?: IntFilter<"RecuperacionPassword"> | number
    userId?: IntFilter<"RecuperacionPassword"> | number
    tokenHash?: StringFilter<"RecuperacionPassword"> | string
    expiraEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
    usadoEn?: DateTimeNullableFilter<"RecuperacionPassword"> | Date | string | null
    creadoEn?: DateTimeFilter<"RecuperacionPassword"> | Date | string
  }

  export type UsuarioCreateWithoutProgresoInput = {
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    parciales?: ProgresoParcialCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateWithoutProgresoInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    parciales?: ProgresoParcialUncheckedCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioCreateOrConnectWithoutProgresoInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutProgresoInput, UsuarioUncheckedCreateWithoutProgresoInput>
  }

  export type UsuarioUpsertWithoutProgresoInput = {
    update: XOR<UsuarioUpdateWithoutProgresoInput, UsuarioUncheckedUpdateWithoutProgresoInput>
    create: XOR<UsuarioCreateWithoutProgresoInput, UsuarioUncheckedCreateWithoutProgresoInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutProgresoInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutProgresoInput, UsuarioUncheckedUpdateWithoutProgresoInput>
  }

  export type UsuarioUpdateWithoutProgresoInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parciales?: ProgresoParcialUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutProgresoInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parciales?: ProgresoParcialUncheckedUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsuarioCreateWithoutParcialesInput = {
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateWithoutParcialesInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoUncheckedCreateNestedManyWithoutUserInput
    recuperaciones?: RecuperacionPasswordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioCreateOrConnectWithoutParcialesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutParcialesInput, UsuarioUncheckedCreateWithoutParcialesInput>
  }

  export type UsuarioUpsertWithoutParcialesInput = {
    update: XOR<UsuarioUpdateWithoutParcialesInput, UsuarioUncheckedUpdateWithoutParcialesInput>
    create: XOR<UsuarioCreateWithoutParcialesInput, UsuarioUncheckedCreateWithoutParcialesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutParcialesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutParcialesInput, UsuarioUncheckedUpdateWithoutParcialesInput>
  }

  export type UsuarioUpdateWithoutParcialesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutParcialesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUncheckedUpdateManyWithoutUserNestedInput
    recuperaciones?: RecuperacionPasswordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActividadCreateWithoutNivelInput = {
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
  }

  export type ActividadUncheckedCreateWithoutNivelInput = {
    id?: number
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
  }

  export type ActividadCreateOrConnectWithoutNivelInput = {
    where: ActividadWhereUniqueInput
    create: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput>
  }

  export type ActividadCreateManyNivelInputEnvelope = {
    data: ActividadCreateManyNivelInput | ActividadCreateManyNivelInput[]
    skipDuplicates?: boolean
  }

  export type ActividadUpsertWithWhereUniqueWithoutNivelInput = {
    where: ActividadWhereUniqueInput
    update: XOR<ActividadUpdateWithoutNivelInput, ActividadUncheckedUpdateWithoutNivelInput>
    create: XOR<ActividadCreateWithoutNivelInput, ActividadUncheckedCreateWithoutNivelInput>
  }

  export type ActividadUpdateWithWhereUniqueWithoutNivelInput = {
    where: ActividadWhereUniqueInput
    data: XOR<ActividadUpdateWithoutNivelInput, ActividadUncheckedUpdateWithoutNivelInput>
  }

  export type ActividadUpdateManyWithWhereWithoutNivelInput = {
    where: ActividadScalarWhereInput
    data: XOR<ActividadUpdateManyMutationInput, ActividadUncheckedUpdateManyWithoutNivelInput>
  }

  export type ActividadScalarWhereInput = {
    AND?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
    OR?: ActividadScalarWhereInput[]
    NOT?: ActividadScalarWhereInput | ActividadScalarWhereInput[]
    id?: IntFilter<"Actividad"> | number
    nivelId?: IntFilter<"Actividad"> | number
    clave?: StringFilter<"Actividad"> | string
    titulo?: StringFilter<"Actividad"> | string
    descripcion?: StringFilter<"Actividad"> | string
    objetivo?: StringFilter<"Actividad"> | string
    minutos?: IntFilter<"Actividad"> | number
    juego?: StringFilter<"Actividad"> | string
    reglas?: JsonFilter<"Actividad">
    ejemplo?: JsonFilter<"Actividad">
    orden?: IntFilter<"Actividad"> | number
  }

  export type NivelCreateWithoutActividadesInput = {
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
  }

  export type NivelUncheckedCreateWithoutActividadesInput = {
    id?: number
    seccion: string
    clave: string
    titulo: string
    texto: string
    objetivo: string
    orden: number
  }

  export type NivelCreateOrConnectWithoutActividadesInput = {
    where: NivelWhereUniqueInput
    create: XOR<NivelCreateWithoutActividadesInput, NivelUncheckedCreateWithoutActividadesInput>
  }

  export type NivelUpsertWithoutActividadesInput = {
    update: XOR<NivelUpdateWithoutActividadesInput, NivelUncheckedUpdateWithoutActividadesInput>
    create: XOR<NivelCreateWithoutActividadesInput, NivelUncheckedCreateWithoutActividadesInput>
    where?: NivelWhereInput
  }

  export type NivelUpdateToOneWithWhereWithoutActividadesInput = {
    where?: NivelWhereInput
    data: XOR<NivelUpdateWithoutActividadesInput, NivelUncheckedUpdateWithoutActividadesInput>
  }

  export type NivelUpdateWithoutActividadesInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type NivelUncheckedUpdateWithoutActividadesInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    texto?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type UsuarioCreateWithoutRecuperacionesInput = {
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoCreateNestedManyWithoutUserInput
    parciales?: ProgresoParcialCreateNestedManyWithoutUserInput
  }

  export type UsuarioUncheckedCreateWithoutRecuperacionesInput = {
    id?: number
    username: string
    email: string
    password: string
    rol?: $Enums.Rol
    modoPruebas?: boolean
    visibleEnRanking?: boolean
    creadoEn?: Date | string
    terminosVersion?: string | null
    terminosAceptadosEn?: Date | string | null
    neuronas?: number
    maxNeuronas?: number
    ultimaRecarga?: Date | string | null
    progreso?: ProgresoUncheckedCreateNestedManyWithoutUserInput
    parciales?: ProgresoParcialUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsuarioCreateOrConnectWithoutRecuperacionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutRecuperacionesInput, UsuarioUncheckedCreateWithoutRecuperacionesInput>
  }

  export type UsuarioUpsertWithoutRecuperacionesInput = {
    update: XOR<UsuarioUpdateWithoutRecuperacionesInput, UsuarioUncheckedUpdateWithoutRecuperacionesInput>
    create: XOR<UsuarioCreateWithoutRecuperacionesInput, UsuarioUncheckedCreateWithoutRecuperacionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutRecuperacionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutRecuperacionesInput, UsuarioUncheckedUpdateWithoutRecuperacionesInput>
  }

  export type UsuarioUpdateWithoutRecuperacionesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUpdateManyWithoutUserNestedInput
    parciales?: ProgresoParcialUpdateManyWithoutUserNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutRecuperacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    modoPruebas?: BoolFieldUpdateOperationsInput | boolean
    visibleEnRanking?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    terminosVersion?: NullableStringFieldUpdateOperationsInput | string | null
    terminosAceptadosEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    neuronas?: IntFieldUpdateOperationsInput | number
    maxNeuronas?: IntFieldUpdateOperationsInput | number
    ultimaRecarga?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    progreso?: ProgresoUncheckedUpdateManyWithoutUserNestedInput
    parciales?: ProgresoParcialUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProgresoCreateManyUserInput = {
    id?: number
    seccion: string
    nivel: string
    actividad: string
    completado: boolean
    score: number
    tiempo: number
    fecha?: Date | string
  }

  export type ProgresoParcialCreateManyUserInput = {
    id?: number
    seccion: string
    nivel: string
    actividad: string
    estado: JsonNullValueInput | InputJsonValue
    vidas: number
    actualizado?: Date | string
  }

  export type RecuperacionPasswordCreateManyUserInput = {
    id?: number
    tokenHash: string
    expiraEn: Date | string
    usadoEn?: Date | string | null
    creadoEn?: Date | string
  }

  export type ProgresoUpdateWithoutUserInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    completado?: BoolFieldUpdateOperationsInput | boolean
    score?: IntFieldUpdateOperationsInput | number
    tiempo?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialUpdateWithoutUserInput = {
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgresoParcialUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    seccion?: StringFieldUpdateOperationsInput | string
    nivel?: StringFieldUpdateOperationsInput | string
    actividad?: StringFieldUpdateOperationsInput | string
    estado?: JsonNullValueInput | InputJsonValue
    vidas?: IntFieldUpdateOperationsInput | number
    actualizado?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecuperacionPasswordUpdateWithoutUserInput = {
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecuperacionPasswordUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecuperacionPasswordUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiraEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActividadCreateManyNivelInput = {
    id?: number
    clave: string
    titulo: string
    descripcion: string
    objetivo: string
    minutos: number
    juego: string
    reglas: JsonNullValueInput | InputJsonValue
    ejemplo: JsonNullValueInput | InputJsonValue
    orden: number
  }

  export type ActividadUpdateWithoutNivelInput = {
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type ActividadUncheckedUpdateWithoutNivelInput = {
    id?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type ActividadUncheckedUpdateManyWithoutNivelInput = {
    id?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    objetivo?: StringFieldUpdateOperationsInput | string
    minutos?: IntFieldUpdateOperationsInput | number
    juego?: StringFieldUpdateOperationsInput | string
    reglas?: JsonNullValueInput | InputJsonValue
    ejemplo?: JsonNullValueInput | InputJsonValue
    orden?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}