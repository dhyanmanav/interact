import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Terminal, Lock, ArrowLeft } from 'lucide-react';

export function ResultsLockScreen() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter password');
      return;
    }

    setLoading(true);

    if (password === '111111') {
      toast.success('Access granted');
      navigate('/results');
    } else {
      toast.error('Invalid password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-25"></div>

        <div className="relative bg-slate-950 border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              RESULTS PANEL
            </h1>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              DEBUG THE BUG
            </h2>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Admin access required
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-300">
                Admin Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20"
                placeholder="Enter admin password"
                disabled={loading}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-md shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'VERIFYING...' : 'VIEW RESULTS'}
            </Button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
