module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.addNunjucksFilter("makeFirstUpperCase", function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  });

  eleventyConfig.addNunjucksFilter("makeBetterNames", function (value) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
    const words = value.split(/(?=[A-Z])/);
    return words.join(" ");
  });

  eleventyConfig.addNunjucksFilter("addOpacity", function (value) {
    return value + "25";
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
