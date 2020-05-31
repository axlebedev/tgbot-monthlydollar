#!/bin/bash

while (true) do
   npx babel-node index.js
   exitcode=$?
   echo "exit code of command is $exitcode"
done
