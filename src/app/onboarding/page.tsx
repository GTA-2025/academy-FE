'use client'
import React, { useState, JSX, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axiosInstance from '@/services/api';
import { toaster } from '@/config/config';
import { useAuthCheck } from '@/features/auth/hooks/uesAuthCheck';
import OnboardingFormSkeleton from './components/OnboardingSkeleton';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import  Cookie from  "js-cookie"

type Step = 1 | 2 | 3 | 4;

interface FormData {
  username: string;
  phoneNumber: string;
  country: string;
  profilePicture: File | null;
  skippedSteps: Set<Step>;
}

interface Errors {
  username?: string;
  phoneNumber?: string;
  country?: string;
}

const OnboardingForm = () => {


  //check auth
  const { isLoading, loadingUI, user } = useAuthCheck({
    LoadingComponent: OnboardingFormSkeleton,
    requireAuth: false,
  });


  const router = useRouter()

  useEffect(() => {
    if (user?.starter.completed) return router.replace("/home/education")
  }, [router, user])





  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phoneNumber: '',
    country: '',
    profilePicture: null,
    skippedSteps: new Set(),
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validateStep = (currentStep: Step): boolean => {
    if (formData.skippedSteps.has(currentStep)) return true;

    const newErrors: Errors = {};
    switch (currentStep) {
      case 1:
        if (!formData.username) {
          newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        }
        break;
      case 2:
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        break;
      case 3:
        if (!formData.country) {
          newErrors.country = 'Country is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (): Promise<void> => {
    if (validateStep(step)) {
      await submitStepData(step);
      setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
    }
  };

  const handleBack = (): void => {
    setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
  };

  const handleSkipStep = async (): Promise<void> => {
    setFormData((prev) => ({
      ...prev,
      skippedSteps: new Set([...prev.skippedSteps, step]),
    }));

    // Make the API call for the skipped step
    let response;
    const token = Cookie.get("token");
    // console.log("this is the token:",token)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      switch (step) {
        case 1:
          response = await axiosInstance.post('/api/onboard/skip-onboard-one', config);
          break;
        case 2:
          response = await axiosInstance.post('/api/onboard/skip-onboard-two', config);
          break;
        case 3:
          response = await axiosInstance.post('/api/onboard/skip-onboard-three', config);
          break;
        case 4:
          console.log("this the token:" ,token)
          response = await axiosInstance.post('/api/onboard/skip-all', config);
          console.log(response)
          break;
        default:
          throw new Error('Invalid step');
      }
      console.log(`Step ${step} data submitted:`, response?.data);
    } catch (error: any) {
      console.log(`Error submitting step ${step}:`, error.response?.data || error.message);
    }

    // Move to the next step
    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const submitStepData = async (currentStep: Step): Promise<void> => {
    setLoading(true);

    try {
      let response;
      const token = Cookie.get("token");
      // console.log("this is the token:",token)
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      switch (currentStep) {
        case 1:
          response = await axiosInstance.post('/api/onboard/username', { username: formData.username },config);
          toaster.toastS(response?.data?.message);
          break;
        case 2:
          response = await axiosInstance.post('/api/onboard/phone', { phoneNumber: formData.phoneNumber },config);
          toaster.toastS(response?.data?.message);
          break;
        case 3:
          response = await axiosInstance.post('/api/onboard/country', { country: formData.country },config);
          toaster.toastS(response?.data?.message);
          break;
        case 4:
          if (formData.profilePicture) {
            const payload = new FormData();
            payload.append('profilePicture', formData?.profilePicture || {});
            response = await axiosInstance.post('/api/onboard/profile-picture', payload, {
              headers: {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data' },
            });
            toaster.toastS(response?.data?.message);
            if (response?.data) {
              router.push("/home/education")
            }
          }
          break;
        default:
          throw new Error('Invalid step');
      }
      console.log(`Step ${currentStep} data submitted:`, response?.data);
    } catch (error: any) {
      console.log(`Error submitting step ${currentStep}:`, error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const renderStep = (): JSX.Element | null => {
    const inputClasses =
      'w-full p-2 border bg-white dark:bg-[#0A0A0A] rounded-lg outline-none focus:ring-1 focus:ring-blue-500';

    switch (step) {
      case 1: if (!user?.starter?.onboard1) {
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose your username</h2>
            <div>
              <div className='flex items-center'>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className={inputClasses}
                />
                <div className=' border-l  -ml-10 px-1 '>.gta</div>
              </div>
              {errors.username && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.username}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )
      }
      case 2: if (!user?.starter?.onboard2) {
        return (
          <div className="space-y-4  ">
            <h2 className="text-2xl font-bold">Add your phone number</h2>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={inputClasses}
              />
              {errors.phoneNumber && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.phoneNumber}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        );
      }
      case 3: if (!user?.starter?.onboard3) {
        return (
          < div className="space-y-4" >
            <h2 className="text-2xl font-bold">Select your country</h2>
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={inputClasses}
              >

                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
              {errors.country && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.country}</AlertDescription>
                </Alert>
              )}
            </div>
          </div >
        );
      }
      case 4: if (!user?.starter?.completed) {
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Add a profile picture</h2>
            <div className="flex  flex-col items-center space-y-4">
              <div className="!w-[50px] !h-[50px] rounded-full flex items-center justify-center">
                {formData.profilePicture ? (
                  <Image
                    width={50}
                    height={50}
                    objectFit="cover"
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Camera size={40} className="text-gray-400" />
                )}
              </div>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Upload className="mr-2" size={20} />
                Choose Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };
  if (isLoading) return loadingUI;



  if (!user?.starter?.completed) {
    return (

      <div className="min-h-screen  bg-white dark:bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="w-full max-w-md border rounded-md shawdow-lg bg-white dark:bg-[#0A0A0A] rounded-xl shadow-lg p-6 space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <form className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Back
                </button>
              )}

              <div className="ml-auto flex gap-2">
                {step <= 4 && (
                  <button
                    type="button"
                    onClick={handleSkipStep}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Skip
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className={`inline-flex items-center px-4 py-2 ${loading
                    ? 'bg-gray-400'
                    : step < 4
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-green-500 hover:bg-green-600'
                    } text-white rounded-lg`}
                  disabled={loading}
                >
                  {step < 4 ? 'Next' : 'Complete'}
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default OnboardingForm;