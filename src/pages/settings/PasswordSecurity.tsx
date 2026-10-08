import SEOHead from "@/components/MetaTagsHead/SEOHead";
import PasswordUpdateForm from "@/components/profile/PasswordUpdateForm";

export default function PasswordSecurity() {
  return (
    <>
      <SEOHead title="Password" />
      <div className="my-8 flex-1 px-2 lg:p-8">
        {/* <h1 className="mb-2 text-lg font-bold sm:text-xl">
          Password and security
        </h1>
        <p className="sm:text-md mb-6 text-sm text-gray-400 lg:mb-8">
          Manage your password and security settings to keep your account safe.
        </p> */}

        {/* Change Password Section */}
        <div className="mb-6 rounded-xl border p-4 lg:mb-6 lg:p-6">
          <h2 className="mb-2 text-lg font-semibold">Change password</h2>
          <p className="sm:text-md mb-6 text-sm text-gray-400">
            Update your password to keep your account secure. Make sure it's
            strong and unique.
          </p>
          <PasswordUpdateForm  />
        </div>
      </div>
    </>
  );
}

{
  /* Main Content */
}
