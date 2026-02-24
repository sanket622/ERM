
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRequests } from '../../../redux/myrequest/MyRequestSlice';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';


const MyRequest = () => {

    const { enqueueSnackbar } = useSnackbar();

    const { list: ticketsData, loading } = useSelector((state) => state.myRequest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyRequests(enqueueSnackbar));
    }, [dispatch, enqueueSnackbar]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-700';
            case 'RESOLVED': return 'bg-emerald-100 text-emerald-700';
            case 'IN_PROGRESS': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen p-6">
            <p className='text-3xl font-semibold mb-10'>My Requests</p>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ticketsData.map((ticket) => (
                        <div key={ticket.id} className="bg-gray-50 rounded-xl shadow-md border-0 p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 group">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 4h10a2 2 0 012 2v14l-4-4H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 capitalize">{ticket.title}</h3>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-gray-600 leading-relaxed text-base">{ticket.description}</p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                                </svg>
                                <span>Created {formatDate(ticket.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyRequest;