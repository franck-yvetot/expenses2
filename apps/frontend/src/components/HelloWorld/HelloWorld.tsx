import { useState, useEffect } from 'react';
import { fetchHello } from '../../services/api';
import { HelloResponse } from 'shared-types';

export const HelloWorld = () => {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchHello();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          {data?.message}
        </h1>
        <p className="text-center text-gray-600">
          Timestamp: {data?.timestamp && new Date(data.timestamp).toLocaleString()}
        </p>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Frontend: React + Vite + Tailwind CSS</p>
          <p>Backend: NestJS + TypeORM + PostgreSQL</p>
        </div>
      </div>
    </div>
  );
};