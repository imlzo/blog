# Blog

Personal blog

## TODOs

TODO: Tag links within articles
TODO: Syntax highlighting in code blocks
TODO: Style home page
TODO: Style articles
TODO: Edit `whoami` page
TODO: Deploy to interwebs

## Building

```sh
# Building
$ npm run build
$ npm run debug     # build with DEBUG logs

# Clean
$ npm run clean
```

## Development

```sh
$ npm run serve
```

## Structure

- `posts/*.md`:     Individual blog posts
- `base.njk`:       Base template. Contains headers and footers.
- `post.njk`:       Post template. Has post heading. Extends `base.njk`
- `tags.njk`:       Page displaying all tags
- `tag.njk`:        Template for specific tag

