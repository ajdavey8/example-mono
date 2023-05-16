import { resourceNameGenerator } from "@andrew-org-test/backend-common";
import { resourceNameGenerator as test } from "@shieldpay/common";

console.log('Hello from test!', resourceNameGenerator('test'));
console.log('Hello from test!', test('222'));
