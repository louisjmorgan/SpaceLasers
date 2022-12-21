const plugins = ['module:@react-three/babel'];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: false,
        targets: '> 5%, not dead, not ie 11, not op_mini all',
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic', modules: false }],
  ],
  plugins,
};
