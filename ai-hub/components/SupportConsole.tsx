// SupportConsole.tsx
import React from "react";

interface SupportConsoleProps {
    onClose: () => void;
}

const SupportConsole: React.FC<SupportConsoleProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-250 h-200 overflow-auto">
                <h1><b>Frequently Asked Questions</b></h1>
                <p>Q: How many generations can I make on a free account?</p>
                <p>A: On a free account you are only able to make 5 free generations. If you would like more generations, you can upgrade your account to a paid version.</p>
                <br/>
                <p>Q: How do I use AI Hub?</p>
                <p>A: You can select one of the generation options from the dashboard or the menu on the left. If you would like to make music generation, you can select the</p> 
                <p>music generation option and enter a prompt for the AI to create. For example entering 90s hip hop would create a 90s hip hop beat.</p>
                <br/>
                <p>Q: How can I submit feedback?</p>
                <p>A: Feedback can be submitted to our email: Feedback@AIHub.com</p>
                <button
                    onClick={onClose}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                >
                    Close
                </button>
                <div className="footer text-muted-foreground">
                    © [Developed by ASD Group 10] [2023]
                </div>
            </div>
        </div>
    );
};

export default SupportConsole;
