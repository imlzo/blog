# Blog

imlzo's personal blog

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

- `posts/*.md`: Individual blog posts.
- `readme.md`: README for website. Distinct from this README.md.
- `base.njk`: Base template. Contains headers and footers.
- `post.njk`: Post template. Has post heading. Extends `base.njk`
- `tags.njk`: Page displaying all tags
- `tag.njk`: Template for specific tag

## Creating Posts

Create new draft posts via `./bin/blog_new`.

```sh
$ ./bin/blog_new "Title of post"
```

Delete the `draft: true` front matter to publish in production.

Edit existing drafts via `./bin/blog_edit`.

There are some conveniences to check spelling and grammar:

```sh
$ npm run check
$ npm run spellcheck
$ npm run grammarcheck
```
