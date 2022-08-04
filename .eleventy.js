const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");


module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(inclusiveLangPlugin);

  // Filters
  eleventyConfig.addFilter("filteredTags", filteredTags)
  eleventyConfig.addFilter("allTags", allTags)
  eleventyConfig.addFilter("postDate", postDate);
  eleventyConfig.addFilter("htmlDate", htmlDate);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}

/*
 * Tags
 */

// Returns all unique tags for collection of posts
function allTags(posts) {
  const allTags = new Set();
  for (const p of posts) {
    (p.data.tags || []).forEach(t => allTags.add(t));
  }
  return Array.from(allTags);
}

// Returns a set of tags where non-user-facing tags are filtered
function filteredTags(tags) {
  const filtered = ["all", "posts", "todo"];
  return (tags || []).filter(tag => filtered.indexOf(tag) === -1);
}

// Given date, returns display date for post
function postDate(jsDate) {
  return DateTime.fromJSDate(jsDate, {zone: 'utc'}).toFormat("yyyy LLL dd");
}

// Given date, returns HTML date format
function htmlDate(jsDate) {
  return DateTime.fromJSDate(jsDate, {zone: 'utc'}).toFormat('yyyy-LL-dd');
}
