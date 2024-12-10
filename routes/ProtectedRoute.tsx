import { Navigate } from 'react-router-dom';
import helpers from '@/helpers/index';
import { useToast } from '@/components/ui/use-toast';

function ProtectedRoute({ children }) {
  const isAuthenticated = () => !!helpers.cookie_get('AT');
  const { toast } = useToast();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    toast({
      title: 'Vui lòng đăng nhập',
      description: 'Bạn cần đăng nhập để truy cập chức năng này',
      variant: 'destructive',
      duration: 2000
    });
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
