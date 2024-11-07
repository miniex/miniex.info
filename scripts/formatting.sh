#!/bin/bash

pnpx prettier --ignore-path ./.prettierignore --write --config ./.prettierrc './**/*.(js|ts|tsx|json|scss)'
