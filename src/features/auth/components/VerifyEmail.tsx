"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import VerificationInput from '@/components/VerificationIput'
import { useAuthCheck } from '../hooks/uesAuthCheck'
import VerificationSkeleton from '../skeleton/VerifyInputSkeleton';


const VerifyEmail = () => {
  const router = useRouter();
  const { isLoading, loadingUI, user } = useAuthCheck({
    LoadingComponent: VerificationSkeleton,
    requireAuth: false,
    redirectPath: "/auth/verify-email",
  });

  useEffect(() => {
    if (user?.isVerified && user?.starter?.completed) {
      router.push('/home/education');
    }

    if (
      user &&
      user?.isVerified && // Ensure the user is not verified
      !user?.starter.onboard1 &&
      !user?.starter.onboard2 &&
      !user?.starter.onboard3 &&
      !user?.starter.completed
    ) {
      router.push("/onboarding");
    }
  }, [user, router]);


  if (isLoading) return loadingUI;
  if (user?.isVerified) return null;

  return (
    <div>
      <VerificationInput
        redirect='/onboarding'
        btnTitle='verify email'
        title='Verify your email'
        api='/api/auth/verify-email'
      />
    </div>
  );
};

export default VerifyEmail;
