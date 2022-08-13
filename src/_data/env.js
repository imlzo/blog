/**
 * env.js - Environment data
 */
const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = "prod";
const PROD_DEV = "dev";

const isProd = environment === PROD_ENV;
const isDev = environment === PROD_DEV;

module.exports = {
  environment,
  isProd,
  isDev,
};
