function assertIsDefined<T>(
  key: string,
  value: T
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${key} to be defined, but received ${value}`);
  }
}

export function validateEnv<T>(env: T): T {
  Object.entries(env).forEach(([key, value]) => assertIsDefined(key, value));
  return env;
}
