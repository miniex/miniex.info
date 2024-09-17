#!/bin/bash

bunx prettier --ignore-path ./.prettierignore --write --config ./.prettierrc './**/*.(js|ts|tsx|json|scss)'
