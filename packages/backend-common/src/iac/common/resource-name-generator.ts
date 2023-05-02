export const resourceNameGenerator = (stage: string, prefix?: string) => {
  return (name: string) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
};
