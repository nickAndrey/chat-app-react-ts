import { Chat } from '@/views/chat';
import { Login } from '@/views/login';
import { SignUp } from '@/views/sign-up';
import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: RouteGuard,
    children: [
      {
        index: true,
        Component: Chat,
      },
      {
        path: ':roomId?',
        Component: Chat,
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'sign-up', Component: SignUp },
    ],
  },
]);
