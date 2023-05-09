export const resourceNameGenerator = (stage: string, prefix?: string) => {
  return (name: string) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
};

const a = true;
console.log(a);