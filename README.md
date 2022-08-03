# Blog

Personal blog

## TODOs

TODO: Support Drafts
TODO: Find wiki notes to promote to blog posts
TODO: First blog post
TODO: Edit `whoami` page
TODO: Style home page
TODO: Style articles
TODO: Deploy to interwebs

## Building

```sh
# Building
$ npm run build
$ npm run build:dev # build for dev (w/ drafts)
$ npm run debug     # build with DEBUG logs

# Clean
$ npm run clean
```

## Development

```sh
$ npm run serve
$ npm run serve:dev # serve for dev (w/ drafts)
```

## Structure

- `posts/*.md`:     Individual blog posts. Posts that start with `_` are drafts
- `base.njk`:       Base template. Contains headers and footers.
- `post.njk`:       Post template. Has post heading. Extends `base.njk`
- `tags.njk`:       Page displaying all tags
- `tag.njk`:        Template for specific tag

## Creating New Posts




