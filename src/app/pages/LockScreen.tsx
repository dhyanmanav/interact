import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Terminal, Lock } from 'lucide-react';

export function LockScreen() {
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

    if (password === '000000') {
      // Check if test already taken
      const testTaken = localStorage.getItem('test_completed');
      if (testTaken) {
        toast.error('You have already completed the test');
        setLoading(false);
        return;
      }

      toast.success('Access granted');
      navigate('/test');
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
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-25"></div>

        <div className="relative bg-slate-950 border border-cyan-500/30 rounded-lg p-8 shadow-2xl">
          {/* Header */}
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
              <Lock className="w-4 h-4" />
              Enter password to start test
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter password"
                disabled={loading}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-md shadow-lg shadow-cyan-500/30 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'VERIFYING...' : 'START TEST'}
            </Button>
          </form>

          {/* View Results Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/results-lock')}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              View Results →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
