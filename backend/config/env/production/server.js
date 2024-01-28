module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  url: env("RENDER_EXTERNAL_URL"),
  port: env.int('PORT', 1337),
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});