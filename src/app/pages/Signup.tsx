import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Terminal, Key } from 'lucide-react';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? '/admin' : '/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !accessCode) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = signup(email, password, accessCode);
    
    if (result.success) {
      setShowSuccess(true);
      toast.success(result.message);
      setEmail('');
      setPassword('');
      setAccessCode('');
    } else {
      toast.error(result.message);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur-lg opacity-25"></div>
          
          <div className="relative bg-slate-950 border border-green-500/30 rounded-lg p-8 shadow-2xl text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <Terminal className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Registration Successful
              </h2>
              <p className="text-gray-300 mb-4">
                Credentials generated. Use them to login.
              </p>
            </div>
            
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold py-6"
            >
              PROCEED TO LOGIN
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-25"></div>
        
        <div className="relative bg-slate-950 border border-cyan-500/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              INTERACT 2026
            </h1>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
              DEBUG THE BUG
            </h2>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Key className="w-4 h-4" />
              Register for the competition
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyan-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                placeholder="participant@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyan-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-cyan-300">
                Access Code <span className="text-red-400">*</span>
              </Label>
              <Input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="bg-slate-900 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                placeholder="Enter event access code"
              />
              <p className="text-xs text-gray-500">
                Access code provided by event organizers
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-md shadow-lg shadow-cyan-500/30 transition-all"
            >
              REGISTER
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already registered?{' '}
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
