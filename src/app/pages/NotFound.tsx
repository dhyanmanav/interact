import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Terminal } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      <div className="relative text-center">
        <div className="flex justify-center mb-6">
          <Terminal className="w-20 h-20 text-cyan-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-cyan-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        
        <Button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
