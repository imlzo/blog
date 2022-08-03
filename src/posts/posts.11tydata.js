
function isDraft(data) {
	return data.draft === true;
}

function hideDrafts() {
  return process.env.ELEVENTY_ENV === 'production'
}

module.exports = function() {
	return {
		eleventyComputed: {
			eleventyExcludeFromCollections: function(data) {
				if(isDraft(data) && hideDrafts()) {
          return true;  // Exclude drafts from collections
				}
        return data.eleventyExcludeFromCollections;
			},
			permalink: function(data) {
				if(isDraft(data) && hideDrafts()) {
					return false; // Don't build drafts
				}
        return data.permalink;
			}
		}
	}
}

