
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "sonner";

// Add a listener to ensure proper viewport settings but preserve scrolling
document.documentElement.style.overflowX = 'hidden';
document.documentElement.style.width = '100%';
document.documentElement.style.maxWidth = '100%';
document.documentElement.style.position = 'relative';

document.body.style.overflowX = 'hidden';
document.body.style.overflowY = 'auto';
document.body.style.width = '100%';
document.body.style.maxWidth = '100%';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.position = 'relative';
document.body.style.boxSizing = 'border-box';

// Prevent horizontal scroll but allow vertical scroll
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.overflowX = 'hidden';
  document.documentElement.style.overflowY = 'auto';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'auto';
});

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <Toaster position="top-center" richColors closeButton />
    <App />
  </>
);
