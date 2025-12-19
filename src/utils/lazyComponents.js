import { lazy } from 'react'

// Lazy load components untuk optimasi performa
export const About = lazy(() => import('../components/About'))
export const Experience = lazy(() => import('../components/Experience'))
export const Projects = lazy(() => import('../components/Projects'))
export const Education = lazy(() => import('../components/Education'))
export const Skills = lazy(() => import('../components/Skills'))
export const Contact = lazy(() => import('../components/Contact'))
