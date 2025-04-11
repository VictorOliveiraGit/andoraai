
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "sonner";

// Add a listener to ensure proper viewport settings
document.documentElement.style.overflow = 'hidden';
document.documentElement.style.overflowX = 'hidden';
document.documentElement.style.width = '100vw';
document.documentElement.style.maxWidth = '100vw';
document.documentElement.style.position = 'relative';

document.body.style.overflow = 'auto';
document.body.style.overflowX = 'hidden';
document.body.style.width = '100vw';
document.body.style.maxWidth = '100vw';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.position = 'relative';
document.body.style.boxSizing = 'border-box';

// Prevent horizontal scroll
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';
});

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <Toaster position="top-center" richColors closeButton />
    <App />
  </>
);
