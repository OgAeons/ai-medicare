import React from "react";

const UserProfile = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center ml-[250px] w-[20rem] h-[28rem] space-y-6"> {/* Increase the width */}
            <img
                className="w-25 h-20 rounded-full mb-4"
                src="https://via.placeholder.com/80"
                alt="Profile"
            />
            <h3 className="text-lg font-bold text-center mb-1">Shreya Sinde</h3>
            <p className="text-blue-600 text-center mb-4">7009-156-4588</p>
            <div className="space-y-2 text-center">
                <p className="text-gray-600">
                    Age: <span className="font-medium">23</span>
                </p>
                <p className="text-gray-600">
                    Blood Group: <span className="font-medium">O+</span>
                </p>
                <p className="text-gray-600">
                    Height: <span className="font-medium">1.78 m</span>
                </p>
                <p className="text-gray-600">
                    Weight: <span className="font-medium">50 kg</span>
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
