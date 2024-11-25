import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);
const CheckInManagerPage = lazy(() => import('@/pages/checkin-manager'));
const RevenuePage = lazy(() => import('@/pages/revenue'));
const DepotPage = lazy(() => import('@/pages/depot'));
const ReportPage = lazy(() => import('@/pages/report'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/:id/',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'report',
          element: <ReportPage />
        },
        {
          path: 'depot',
          element: <DepotPage />
        },
        {
          path: 'collector',
          element: <CheckInManagerPage />
        },
        {
          path: 'revenue',
          element: <RevenuePage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
