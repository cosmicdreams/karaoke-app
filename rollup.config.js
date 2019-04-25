import createDefaultConfig from '@open-wc/building-rollup/modern-config';

export default createDefaultConfig({
    input: './src/index.html',
    // the directory to output files into, defaults to 'dist'. optional
    outputDir: './public',
});
