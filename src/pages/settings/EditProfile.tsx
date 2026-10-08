import SEOHead from "@/components/MetaTagsHead/SEOHead";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import NameUpdateForm from "@/components/profile/NameUpdateForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useGetUserInfoQuery,
  useUploadProfileMutation,
} from "@/features/hooks/profile.queries";
import { getCroppedImg } from "@/utils/getCroppedImg";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRef, type ChangeEvent, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMG_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ASPECT_RATIO = 1; // 1:1 square for circular avatars

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 80,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const EditProfilePage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cropper states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { data, isLoading: isUserLoading, refetch } = useGetUserInfoQuery();
  const { mutateAsync: uploadProfile, isPending: isUploading } =
    useUploadProfileMutation();

  const userInfo = data?.userInfo;
  const image = userInfo?.image ?? null;
  const fullName = userInfo?.fullName;
  const firstName = userInfo?.firstName ?? "";
  const lastName = userInfo?.lastName ?? "";
  const email = userInfo?.email ?? "";

  const initialName = `${firstName.charAt(0) ?? ""}${lastName.charAt(0) ?? ""}`;

  const imageOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!ALLOWED_IMG_TYPES.includes(selectedFile.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP formats are allowed.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 10MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setRawImageSrc(reader.result?.toString() || "");
      setCropModalOpen(true);
    });
    reader.readAsDataURL(selectedFile);

    // Reset input so re-selecting same file triggers onChange
    e.target.value = "";
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO));
  };

  const handleApplyCrop = async () => {
    if (!imgRef.current || !completedCrop) {
      toast.error("Please select a crop area.");
      return;
    }

    try {
      const croppedFile = await getCroppedImg(
        imgRef.current,
        completedCrop,
        "avatar.webp"
      );

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setFile(croppedFile);
      setPreview(URL.createObjectURL(croppedFile));
      setCropModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop the image.");
    }
  };

  const avatarUploadHandler = async () => {
    if (!file) {
      toast.warning("Please select your avatar first.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    await uploadProfile(formData, {
      onSuccess: (res) => {
        setFile(null);
        setPreview(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        refetch();
        toast.success(res.message || "Avatar uploaded successfully");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message);
          return;
        }
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <SEOHead title="Edit Profile" />
      <div className="my-8 flex-1 px-2 lg:p-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Profile
              </CardTitle>
              <CardDescription className="mb-3 text-xs">
                You can upload own avatar and edit your information.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div>
                <Avatar className="relative size-12">
                  {isUserLoading ? (
                    <Loader2 className="absolute top-2 left-2 size-8 animate-spin rounded-full text-gray-300 dark:text-gray-600" />
                  ) : (
                    <>
                      {preview ? (
                        <AvatarImage src={preview} alt={fullName ?? ""} />
                      ) : (
                        <AvatarImage
                          src={image?.image_url ?? ""}
                          alt={fullName ?? ""}
                        />
                      )}
                      <AvatarFallback>{initialName}</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={imageOnChangeHandler}
                  ref={inputRef}
                  className="hidden"
                />
                <Button
                  onClick={() => inputRef.current?.click()}
                  variant="outline"
                  size="sm"
                  className="mt-2 w-24 cursor-pointer rounded-md p-1 duration-150 active:ring-1 active:ring-gray-400"
                >
                  Choose File
                </Button>
              </div>
              <Button
                onClick={avatarUploadHandler}
                disabled={isUploading || !file}
                className="mb-9 cursor-pointer duration-150 active:ring-1 active:ring-gray-400 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="size-5 animate-spin text-white" />
                    <span className="animate-pulse">Uploading...</span>
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <EmailUpdateForm email={email as string} />
            <NameUpdateForm firstName={firstName} lastName={lastName} />
          </div>
        </div>
      </div>

      {/* Cropper Modal */}
      <Dialog open={cropModalOpen} onOpenChange={setCropModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Crop Profile Photo</DialogTitle>
            <DialogDescription>
              Drag and scale the circle to choose your crop area.
            </DialogDescription>
          </DialogHeader>

          <div className="flex max-h-[60vh] items-center justify-center overflow-auto p-2">
            {Boolean(rawImageSrc) && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT_RATIO}
                // circularCrop
                className="touch-none select-none" // Prevents gesture conflicts
              >
                <img
                  ref={imgRef}
                  alt="Crop preview"
                  src={rawImageSrc}
                  onLoad={onImageLoad}
                  draggable={false} // Stops native drag ghosting
                  className="max-h-[50vh] max-w-full object-contain"
                />
              </ReactCrop>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              onClick={() => setCropModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleApplyCrop} disabled={!completedCrop}>
              Apply Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfilePage;
