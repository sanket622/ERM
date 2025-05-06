import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from './Navbar';
import Footer from './Footer';
import img from './3.png'

const FAQSection = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const faqItems = [
        {
            id: 1,
            question: 'What is Earn+ and how does it work for employers?',
            answer: 'Earn+ is a financial wellness platform by Loan2Grow that offers products like Earned Wage Access (EWA) and other financial services for employees or gig workers. As an employer, you can easily manage employee contracts, define financial product offerings, and track income data to provide employees with financial flexibility.'
        },
        {
            id: 2,
            question: 'How do I register my company on the EMS platform?',
            answer: 'Our customer associate team is here for your assistance, they will initiate the process of employer creation. Post that you can register your company details through a simple self-service process on the EMS landing page. Just provide basic company information, such as industry type and contract options. Reach the helpdesk contact as below for more! '
        },
        {
            id: 3,
            question: 'What types of employee contracts can I choose from?',
            answer: (
                <div>
                    <p className="mb-2">There are three contract types available:</p>
                    <p className="mb-1">• Fixed Monthly Contracts: Employees receive a fixed salary with deductions like taxes or provident fund.</p>
                    <p className="mb-1">• Fixed & Variable Monthly Contracts: Employees receive a fixed base salary plus performance-based variable pay.</p>
                    <p className="mb-1">• Fully Variable (Gig) Contracts: Employees earn based on completed transactions (e.g., ride-hailing or delivery services).</p>
                </div>
            )
        },
        {
            id: 4,
            question: 'Can I add employees manually or in bulk?',
            answer: 'Yes, you can add employees individually or upload them in bulk. The system allows you to enter data manually or integrate with your existing HR system for automatic data syncing. '
        },
        {
            id: 5,
            question: 'How does Earned Wage Access (EWA) work for employees?',
            answer: 'EWA allows employees to access a portion of their earned wages before payday. As an employer, you can define the amount of income available for withdrawal, along with the terms and conditions. The system automatically tracks accrued income and supports real-time data syncing. '
        },
        {
            id: 6,
            question: 'What kind of financial products can I offer to my employees?',
            answer: (
                <div>
                    <p className="mb-2">Through Earn+, you can offer products like: </p>
                    <p className="mb-1">• Earned Wage Access (EWA)</p>
                    <p className="mb-1">• Loans: Customizable loan products with interest rates and terms </p>
                    <p className="mb-1">• Other Financial Products: Savings and investment offerings (coming soon) </p>
                </div>
            )
        },
        {
            id: 7,
            question: 'Can I control who has access to the system and make updates?',
            answer: 'Yes, EMS provides secure access control. Only authorized users, such as admins and HR personnel, can manage employee data. All actions within the platform are logged for security and accountability. '
        },
        {
            id: 8,
            question: 'What happens if I don\'t have a payroll system?',
            answer: 'No worries! If you don’t have an integrated payroll system, you can manually enter income data into the EMS platform, ensuring that everything stays up to date for your employees. '
        },
        {
            id: 9,
            question: 'How does the system track employee income?',
            answer: 'The system syncs income data either automatically through payroll integration or manually if needed. For gig workers, daily income data is captured twice a day. For salaried employees, attendance and leave data are used to estimate income if daily data isn’t available. '
        },
        {
            id: 10,
            question: 'How do I ensure data security and prevent unauthorized changes?',
            answer: 'The EMS platform ensures data security by offering role based access control. Only designated users (e.g., HR, admin) can edit or update sensitive information. All changes are logged, allowing you to track and recover data when needed. '
        },
        {
            id: 11,
            question: 'How can I get help if I have questions or issues?',
            answer: (
                <div>
                    <p className="mb-2">Our dedicated support team is always here to assist you. You can reach out via: </p>
                    <p className="mb-1">• Live Chat: Instant support through our chat feature. </p>
                    <p className="mb-1">• Email: Contact us at reachus@l2gfincap.in or +917388729386 </p>
                   
                </div>
            )
        },
        {
            id: 12,
            question: 'How do I get started with Earn+ for my workforce?',
            answer: 'Simply log in to the EMS portal to start exploring the available features. Register your company, set up employee contracts, define the financial products, and begin managing your workforce’s financial wellbeing. '
        },
        {
            id: 13,
            question: 'What kind of reports and analytics are available?',
            answer: 'EMS provides detailed analytics on EWA usage, employee participation, and overall financial health, allowing you to make informed decisions and optimize your workforce management strategies. If you have any further questions or need assistance, please don’t hesitate to contact our support team. We’re here to help! '
        }
    ];

    const toggleItem = (id) => {
        setExpandedItems(prev => {
            const isExpanding = !prev[id];

            if (isExpanding) {
                setTimeout(() => {
                    const el = document.getElementById(`faq-${id}`);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }

            return {
                ...prev,
                [id]: isExpanding
            };
        });
    };

    return (
        <>
            <Navbar />
            <div className="bg-white">

                {/* Header Section */}
                <section
                    className="relative h-[535px] pb-16 px-4 text-white rounded-bl-[300px]"
                    style={{
                        width: '100%',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: 20,
                    }}
                >
                    <div className="relative flex flex-col justify-center items-center text-center h-full">
                        <h3 className="text-[40px] font-bold">Frequently Asked Questions</h3>
                        <p className="text-[24px] mt-6">
                            Find answers to common questions about using the platform
                        </p>
                    </div>
                </section>

                <div className="w-full mx-auto px-4 md:px-10 md:py-10">
                    {/* FAQ Items */}
                    <div className="space-y-4 ">
                        {faqItems.map((item) => (
                            <div
                                key={item.id}
                                id={`faq-${item.id}`}
                                className="border border-gray-200 rounded-md overflow-hidden shadow-md"
                            >
                                <button
                                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <span className="font-medium text-left">{item.question}</span>
                                    <ExpandMoreIcon
                                        className={`text-gray-500 transform transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-180' : ''
                                            }`}
                                        style={{ width: '24px', height: '24px' }}
                                    />
                                </button>

                                {/* Collapsible Content */}
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedItems[item.id]
                                        ? 'max-h-screen p-4 border-t border-gray-200 bg-gray-50'
                                        : 'max-h-0 p-0'
                                        }`}
                                >
                                    {expandedItems[item.id] && (
                                        <p className="text-gray-700 break-words">{item.answer}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FAQSection;
