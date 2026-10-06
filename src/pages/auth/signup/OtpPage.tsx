import SEOHead from "@/components/MetaTagsHead/SEOHead";
import InputOTPForm from "@/components/auth/signup/InputOTPForm";

export default function OtpPage() {
  return (
    <>
      <SEOHead title="OTP" />
      <div className="bg-background flex min-h-[60vh] md:min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <InputOTPForm />
        </div>
      </div>
    </>
  );
}
