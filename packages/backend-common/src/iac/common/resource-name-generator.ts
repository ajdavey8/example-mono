export const resourceNameGenerator = (stage: string, prefix?: string) => {
  return (name: string) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
};

export const randomfuction = () => {
const b = true;
console.log(b);
}