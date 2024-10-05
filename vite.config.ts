import { defineConfig, loadEnv } from 'vite';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react-swc';
const cherryPickedKeys = ['API_BASE_URL'];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv: { [key: string]: string } = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      'process.env': processEnv,
    },
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js',
    },
  };
});
