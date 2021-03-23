import { lazy } from 'react'


export const DesktopPages = {
    demoPage: lazy(() => import('../pages/demo')),
    homepage: lazy(() => import('../pages/homepage')),
    sellerHomePage: lazy(() => import('./seller')),
    shoppingCartPage: lazy(() => import('../components/shoppingCart')),
    paymentMessagePage: lazy(() => import('./paymentMessage')),
}