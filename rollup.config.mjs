import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'RomanNumeralsConverter',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    css(),
    typescript({
      tsconfig: './tsconfig.json',
      tslib: require.resolve('tslib'),
      declaration: true,
      declarationDir: './dist/types',
      rootDir: './src',
    }),
  ],
};
