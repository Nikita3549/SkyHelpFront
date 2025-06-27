import AuthForm, { FormTypes } from '../components/AuthForm';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import React, { useState } from 'react';

export default function Login() {
  const [showElements, setShowElements] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-md max-md:max-w-full ml-7 mr-7 mb-40"
      >
        <div className="glass rounded-2xl p-6 w-full md:p-8 shadow-xl">
          <div className="flex w-full flex-col space-y-5">
            {showElements && (
              <h3 className="text-xl font-medium text-gray-800">Login</h3>
            )}
            <AuthForm
              formType={FormTypes.LOGIN}
              setShowElements={setShowElements}
            />
            <div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline mx-auto">
              <Link to={'/forgot'}>Forgot password</Link>
            </div>
            {showElements && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-gray-500">
                  Don't Have an Account?{' '}
                </span>
                <Link
                  to={'/register'}
                  className="p-0 h-auto text-blue-500 hover:text-blue-700 hover:bg-transparent font-medium text-sm flex items-center gap-1 group"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Replace plane icons in yellow circles with blue circles */}
        <motion.div
          className="absolute -bottom-6 -right-6"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <div className="bg-[#D3E4FD] rounded-full p-2 shadow-md">
            <Plane size={26} strokeWidth={2} className="text-gray-800" />
          </div>
        </motion.div>

        <motion.div
          className="absolute -top-4 -left-4"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          }}
        >
          <div className="bg-[#D3E4FD] rounded-full p-2 shadow-sm">
            <Plane
              size={20}
              strokeWidth={2}
              className="text-gray-800 rotate-180"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
