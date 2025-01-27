import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from "@/routers";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import '@/mocks/browser'
import '@/styles/reset.scss'
import './index.css'


gsap.registerPlugin(useGSAP, ScrollToPlugin);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
