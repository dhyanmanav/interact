import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { AlertTriangle, Play, LogOut, Terminal } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hasStartedTest, setHasStartedTest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.isAdmin) {
      navigate('/');
      return;
    }

    const checkTestStatus = () => {
      // Check if user has already completed/submitted the test
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      const hasSubmitted = submissions.some((s: any) => s.username === user.username);

      if (hasSubmitted) {
        // User already took the test, redirect to success page
        navigate('/success', { replace: true });
        return;
      }

      // Check if test is marked as completed in localStorage
      const testState = localStorage.getItem(`test_${user.username}`);
      if (testState) {
        const parsed = JSON.parse(testState);
        if (parsed.status === 'completed') {
          navigate('/success', { replace: true });
          return;
        }
        if (parsed.status === 'in_progress') {
          setHasStartedTest(true);
        }
      }

      setLoading(false);
    };

    checkTestStatus();
  }, [user, navigate]);

  const handleStartTest = () => {
    if (!user) return;

    // Double-check they haven't submitted
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const hasSubmitted = submissions.some((s: any) => s.username === user.username);

    if (hasSubmitted) {
      navigate('/success', { replace: true });
      return;
    }

    // Initialize test state
    localStorage.setItem(`test_${user.username}`, JSON.stringify({
      status: 'in_progress',
      startTime: Date.now(),
      currentQuestion: 0,
      answers: [],
    }));

    navigate('/test');
  };

  const handleContinueTest = () => {
    navigate('/test');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-cyan-500/30 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  INTERACT 2026
                </h1>
                <p className="text-sm text-gray-400">DEBUG THE BUG</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-300 hidden sm:block">{user.username}</p>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-20"></div>

            <div className="relative bg-slate-950 border border-cyan-500/30 rounded-lg p-8 md:p-12 shadow-2xl">
              {/* Warning banner */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 font-semibold mb-1">IMPORTANT WARNING</p>
                    <p className="text-yellow-200/80 text-sm">
                      Leaving the test page will result in automatic submission.
                      Ensure you have a stable internet connection before starting.
                      <strong className="block mt-1 text-yellow-300">You can only take this test ONCE!</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-cyan-300 mb-6">Competition Instructions</h2>

                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">01.</span>
                    <p>You will be presented with <strong className="text-white">50 coding questions</strong> containing bugs.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">02.</span>
                    <p>Each question is worth <strong className="text-white">2 points</strong> (Total: 100 points).</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">03.</span>
                    <p>You must identify and select the <strong className="text-white">correct fix</strong> from multiple options.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">04.</span>
                    <p>The test is <strong className="text-white">timed</strong>. Your completion time will be recorded.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">05.</span>
                    <p><strong className="text-red-400">DO NOT switch tabs, minimize window, or navigate away</strong> - this will auto-submit your test.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">06.</span>
                    <p>Once submitted, you <strong className="text-white">cannot re-enter</strong> the test.</p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-mono font-bold">07.</span>
                    <p className="text-red-400 font-semibold">You can take this test <strong>ONLY ONCE</strong> - make it count!</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {hasStartedTest ? (
                  <Button
                    onClick={handleContinueTest}
                    className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold py-6 text-lg shadow-lg shadow-green-500/30"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    CONTINUE TEST
                  </Button>
                ) : (
                  <Button
                    onClick={handleStartTest}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 text-lg shadow-lg shadow-cyan-500/30"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    START TEST
                  </Button>
                )}
              </div>

              {/* Footer note */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-gray-500 text-sm text-center">
                  Once you click "Start Test", the timer will begin immediately. Good luck!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
