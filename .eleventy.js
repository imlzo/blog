const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");
const path = require("node:path");
const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(PostCSSPlugin);

  // Filters
  eleventyConfig.addFilter("filteredTags", filteredTags);
  eleventyConfig.addFilter("allTags", allTags);
  eleventyConfig.addFilter("postDateShort", postDateShort);
  eleventyConfig.addFilter("postDateLong", postDateLong);
  eleventyConfig.addFilter("htmlDate", htmlDate);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/css");

  // Markdown
  eleventyConfig.setLibrary("md", markdownLibrary());

  // Collections
  eleventyConfig.addCollection("postsByYear", postsByYear);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};

/*
 * Tags
 */

// Returns all unique tags for collection of posts
function allTags(posts) {
  const allTags = new Set();
  for (const p of posts) {
    (p.data.tags || []).forEach((t) => allTags.add(t));
  }
  return Array.from(allTags);
}

// Returns a set of tags where non-user-facing tags are filtered
function filteredTags(tags) {
  const filtered = ["all", "posts", "todo"];
  return (tags || []).filter((tag) => filtered.indexOf(tag) === -1);
}

// Given date, returns display date for post
function postDateShort(jsDate) {
  return DateTime.fromJSDate(jsDate, { zone: "utc" }).toFormat("LLL dd");
}

// Given date, returns display date for post
function postDateLong(jsDate) {
  return DateTime.fromJSDate(jsDate, { zone: "utc" }).toFormat("LLL dd yyyy");
}

// Given date, returns HTML date format
function htmlDate(jsDate) {
  return DateTime.fromJSDate(jsDate, { zone: "utc" }).toFormat("yyyy-LL-dd");
}

/*
 * Markdown
 */

/**
 * Creates and return markdown renderer
 */
function markdownLibrary() {
  let markdownLib = markdownIt({
    html: true,
  });
  markdownLib.renderer.rules.image = markdownImage;
  return markdownLib;
}

/**
 * Custom renderer for markdown images
 * https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/
 */
function markdownImage(tokens, idx, _options, _env, _self) {
  const token = tokens[idx];
  const imgSrc = "src/" + token.attrGet("src");
  const imgAlt = token.content;

  let widths = [400, 800, 1280];
  const imgOpts = {
    widths: [...widths, null],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    filenameFormat: (hash, src, width, format, _) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}-${hash}.${format}`;
    },
  };

  // Generate image
  Image(imgSrc, imgOpts);

  // Generate HTML
  const metadata = Image.statsSync(imgSrc, imgOpts);
  const innerHtml = Image.generateHTML(metadata, {
    title: imgAlt,
    alt: imgAlt,
    loading: "lazy",
    decoding: "async",
    sizes: "100vw",
  });

  // Find URL from last jpeg img
  const jpegImgs = metadata["jpeg"];
  const url = jpegImgs[jpegImgs.length - 1].url;
  return `<a href="${url}">${innerHtml}</a>`;
}

/**
 * Collections
 */

// Group posts into collections of [year, postsForYear]
function postsByYear(collection) {
  const posts = collection.getFilteredByTag("posts").reverse();
  const years = posts.map((post) => post.date.getFullYear());
  const uniqueYears = [...new Set(years)];
  return uniqueYears.reduce((prev, year) => {
    const filteredPosts = posts.filter(
      (post) => post.date.getFullYear() === year
    );
    return [...prev, [year, filteredPosts]];
  }, []);
}
