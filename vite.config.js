/* eslint-disable max-len */
import glob from 'glob';
import {resolve, relative, extname, basename} from 'path';
import {defineConfig} from 'vite';

const root = resolve(__dirname, 'pages');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

const input = Object.fromEntries(glob.sync('pages/**/*.html').map((file) => {
  const filePath = resolve(root, relative('pages', file));
  let fileEntry;

  if (basename(file) !== 'index.html') {
    fileEntry = basename(file).substring(0, basename(file).length - extname(file).length);
  } else {
    fileEntry = relative('pages', file.slice(0, file.length -basename(file).length));
    // If fileEntry is an empty string, then it's the main page
    fileEntry = fileEntry === '' ? 'main' : fileEntry;
  }

  return [fileEntry, filePath];
}));

export default defineConfig({
  root,
  publicDir,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        // Removing hash from output files
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    target: 'esnext',
  },
});
