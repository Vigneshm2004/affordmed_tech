import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-3">
                    <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white">
                        <svg className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                </td>
                <td className="px-4 py-3 font-medium text-blue-400 whitespace-nowrap"><a href={row.shortUrl} target="_blank" rel="noreferrer">{row.shortUrl}</a></td>
                <td className="px-4 py-3 text-gray-300 truncate max-w-xs">{row.longUrl}</td>
                <td className="px-4 py-3 text-center">{row.clicks}</td>
                <td className="px-4 py-3">{new Date(row.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">{new Date(row.expiresAt).toLocaleString()}</td>
            </tr>
            {open && (
                <tr className="bg-gray-800">
                    <td colSpan="6" className="p-0">
                        <div className="p-4 bg-gray-900">
                            <h3 className="font-bold text-lg mb-2 text-white">Click Details</h3>
                            {row.clickDetails.length > 0 ? (
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2">Timestamp</th>
                                            <th className="px-4 py-2">Source</th>
                                            <th className="px-4 py-2">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {row.clickDetails.map((d, i) => (
                                            <tr key={i} className="border-b border-gray-700">
                                                <td className="px-4 py-2">{new Date(d.timestamp).toLocaleString()}</td>
                                                <td className="px-4 py-2">{d.source}</td>
                                                <td className="px-4 py-2">{d.location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (<p className="text-gray-400">No clicks recorded yet.</p>)}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

const StatisticsPage = () => {
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.getStatistics()
            .then(data => setStats(data))
            .catch(() => setError('Failed to load statistics.'))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div className="flex justify-center mt-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
    }

    if (error) {
        return <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">URL Statistics</h1>
            <div className="relative overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                        <tr>
                            <th className="px-4 py-3 w-12"></th>
                            <th className="px-4 py-3">Short URL</th>
                            <th className="px-4 py-3">Original URL</th>
                            <th className="px-4 py-3 text-center">Clicks</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3">Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.length > 0 ? (
                            stats.map((row) => <Row key={row.id} row={row} />)
                        ) : (
                            <tr><td colSpan="6" className="text-center py-8 text-gray-500 bg-gray-800">No shortened URLs found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticsPage;