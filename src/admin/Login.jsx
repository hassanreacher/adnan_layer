import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/admin" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const { error } = await login(email, password);
        setIsLoading(false);

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">

                <div className="p-8 md:p-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-Playfair mb-2 tracking-wide">
                            Welcome Back
                        </h2>
                        <p className="text-slate-300 text-sm md:text-base">
                            Sign in to manage your portfolio
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border-l-4 border-red-500 text-red-200 p-4 mb-6 rounded-r-lg" role="alert">
                            <p className="font-medium text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${isLoading
                                    ? 'bg-blue-600/50 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25 active:scale-[0.98]'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Signing In...</span>
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
