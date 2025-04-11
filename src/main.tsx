
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");
if (rootElement) {
  // Apply inline styles to HTML and body through JavaScript
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
  document.documentElement.style.width = '100%';
  document.documentElement.style.maxWidth = '100%';
  document.documentElement.style.margin = '0';
  document.documentElement.style.padding = '0';
  document.body.style.overflow = 'auto';
  document.body.style.overflowX = 'hidden';
  document.body.style.width = '100%';
  document.body.style.maxWidth = '100vw';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  
  createRoot(rootElement).render(<App />);
}
