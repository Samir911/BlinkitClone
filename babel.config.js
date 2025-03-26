module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
         '@icons': 'react-native-vector-icons',
        },
      },
    ],
  ],
};
