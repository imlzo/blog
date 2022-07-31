const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/css");

  // postDate filter - Date for posts
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
