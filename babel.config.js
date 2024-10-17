module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@utility': './src/utility',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
