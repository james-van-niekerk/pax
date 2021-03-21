// rollup.config.js

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = false;  // !process.env.ROLLUP_WATCH;

export default [
    {
        input: 'src/main.mjs',
        output: {
            file: 'dist/server.js',
            format: 'es'
        }
    },
    {
        input: 'src/index.js',
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: 'dist/public/build/bundle.js',
        },
        plugins: [
            svelte({
                compilerOptions: {
                    // enable run-time checks when not in production
                    dev: !production
                },
                // Tell the svelte plugin where our svelte files are located
                include: 'src/**/*.svelte',
                // we'll extract any component CSS out into
                // a separate file - better for performance
                css: css => {
                    css.write('dist/public/build/bundle.css');
                }
            }),
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css({ output: 'bundle.css' }),
            resolve({
                browser: true,
                dedupe: ['svelte']
            }),
            commonjs(),


            // In dev mode, call `npm run start` once
            // the bundle has been generated
            !production && serve(),

            !production && livereload('dist/public'),

            // If we're building for production (npm run build
            // instead of npm run dev), minify
            production && terser()

        ],
        watch: {
            clearScreen: false
        }

    },
];

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}