import SEOHead from "@/components/MetaTagsHead/SEOHead";
import ConfirmPasswordForm from "@/components/auth/signup/ConfirmPasswordForm";

export default function ConfirmPasswordPage() {
  return (
    <>
      <SEOHead title="Confirm Password" />
      <div className="bg-background flex min-h-[60vh] md:min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ConfirmPasswordForm  />
        </div>
      </div>
    </>
  );
}
