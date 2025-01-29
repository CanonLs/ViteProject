import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from "@/routers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import '@/mocks/browser'
import '@/styles/reset.scss'

if (import.meta.env.MODE === 'development' && import.meta.env.VITE_CONSOLE == "true") new (await import('vconsole')).default();
console.log(`${import.meta.env.VITE_MODEL_NAME}--路由模式:${import.meta.env.VITE_ROUTER_TYPE}`);

gsap.registerPlugin(useGSAP, ScrollToPlugin);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
