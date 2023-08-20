#!/usr/bin/env ts-node

import { exec } from "child_process";
exec("echo 'Hello World!'");
exec(`echo 'Hello args' > ${process.argv[2]}`);
