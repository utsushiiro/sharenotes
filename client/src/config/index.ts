import { Config } from "./types";
import { config as devConfig } from "./config.dev";
import { config as testConfig } from "./config.test";
import { config as prodConfig } from "./config.prod";

// CONFIG_TYPE is configured by webpack.DefinePlugin
declare const CONFIG_TYPE: "dev" | "test" | "prod";

export let config: Config;
if (CONFIG_TYPE === "dev") {
  config = devConfig;
} else if (CONFIG_TYPE === "test") {
  config = testConfig;
} else if (CONFIG_TYPE === "prod") {
  config = prodConfig;
}
