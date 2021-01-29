# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

## Changes needed before start
To build the typescript files, we need --build argument when calling tsc. --build argument does not work with --noemit argument. @snowpack/plugin-typescript automatically adds --noemit argument. For now removed it in the @snowpack/plugin-typescript/plugin.js.

Add your application insights application key in file src\workers\worker.ts. Replace YOUR_APPLICATIONINSIGHTS_KEY with the instrumantation key of your application insights instance. 

## Typing issue
ITelemetryItem defines tags as "Tags & Tags[]", but the api only accepts objects. Seems like typing is wrong. For now in the request we do not use tags property.

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
