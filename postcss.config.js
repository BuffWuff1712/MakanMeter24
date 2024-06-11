module.exports = async () => {
    const asyncPlugin = await require('postcss-advanced-variables')(); // Example of an async plugin
  
    return {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        asyncPlugin,
      ],
    };
  };
  