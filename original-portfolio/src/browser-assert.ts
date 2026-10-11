// Browser equivalent for the two Node assert operations used by the upstream code.
export function fail(message = "Assertion failed"): never {
  throw new Error(message);
}

export default function assert(value: unknown): asserts value {
  if (!value) fail();
}
