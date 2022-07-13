export type RemoveIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as object extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
};
