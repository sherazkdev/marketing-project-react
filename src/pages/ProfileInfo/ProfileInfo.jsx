import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ShieldCheck, ShieldHalf, Trash2 } from "lucide-react";
import { AuthContext } from "../../contexts/AuthProvider";
import { UpdateUserFullname, UpdateUserAvatar, UpdateUserUsername, CheckUniqueUsername } from "../../api/instance";
import useCloudinary from "../../hooks/useCloudinary";
import DefualtGroupAvatar from "../../assets/images/iconProfilePicture_noinline.6327fd8895807f09fafb0ad1e3d99b83.svg";
import Loader from "../../utils/Loader/Loader";

export default function ProfileInfo() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { HandleUploadFile } = useCloudinary();
  
  const [profilePic, setProfilePic] = useState(user?.avatar || DefualtGroupAvatar);
  const [name, setName] = useState(user?.fullname || "");
  const [username, setUsername] = useState(user?.username || "");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    if(user) {
      setName(user.fullname || "");
      setUsername(user.username || "");
      setProfilePic(user.avatar || DefualtGroupAvatar);
    }
  }, [user]);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
      
      const result = await HandleUploadFile(formData);
      const imageUrl = result?.secure_url || result?.url;
      
      if(imageUrl) {
        setProfilePic(imageUrl);
        const response = await UpdateUserAvatar({ avatar: imageUrl });
        
        if(response.data?.statusCode === 200 && response.data?.success) {
          setUser({...user, avatar: imageUrl});
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("Failed to update avatar");
        }
      }
    } catch (e) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const validateUsername = (value) => {
    if(!value || value.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError(null);
    return true;
  };

  const handleUsernameBlur = async (value) => {
    const trimmed = value.trim().toLowerCase();
    if(!validateUsername(trimmed)) return;
    if(trimmed === (user?.username || "")) {
      setUsernameError(null);
      return;
    }
    try {
      setCheckingUsername(true);
      const response = await CheckUniqueUsername({ username: trimmed });
      const isTaken = response.data?.data === true;
      if(isTaken) {
        setUsernameError("Username is already taken");
      } else {
        setUsernameError(null);
      }
    } catch (err) {
      setUsernameError(err?.response?.data?.message || "Unable to check username");
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedUsername = username.trim().toLowerCase();

    if(trimmedName.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if(!validateUsername(trimmedUsername) || usernameError) {
      setError(usernameError || "Please fix username issues");
      return;
    }

    const requests = [];
    if(trimmedName !== user?.fullname) {
      requests.push(UpdateUserFullname({ fullname: trimmedName }));
    }
    if(trimmedUsername !== (user?.username || "")) {
      requests.push(UpdateUserUsername({ username: trimmedUsername }));
    }

    if(requests.length === 0) {
      navigate("/profile");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await Promise.all(requests);
      setUser({
        ...user,
        fullname: trimmedName,
        username: trimmedUsername
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/profile");
      }, 1500);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteMessage(null);
    const confirmed = window.confirm("Deleting your account will remove all ads and profile data. This action cannot be undone. Continue?");
    if(!confirmed) return;
    setDeleteMessage("Account deletion is currently handled by support. Please contact sherazk.dev@gmail.com with your registered email to proceed.");
  };

  const verificationBadge = user?.isVerified ? (
    <span className="inline-flex items-center gap-1 px-3! py-1! rounded-full bg-green-50 text-green-700 text-xs font-semibold">
      <ShieldCheck size={14} /> Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-3! py-1! rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">
      <ShieldHalf size={14} /> Not verified
    </span>
  );

  return (
    <>
      {loading && <Loader />}
      <div className='w-full h-full flex justify-center items-start bg-[#f8f9fb] px-4 sm:px-6 py-6'>
        <div id="center-section" className='max-w-[1280px] w-full'>
          <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-[0_12px_24px_rgba(0,0,0,0.06)] p-5 sm:p-8 border border-olx_border_gray_light">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className='text-[#002f34] text-2xl sm:text-[32px] font-semibold'>Edit profile</h1>
              <span className="text-xs text-gray-500">Keep your profile up to date</span>
            </div>

            {error && (
              <div className="w-full bg-red-50 border border-red-200 text-red-700 p-3! rounded-[4px] text-sm mb-4">
                {error}
              </div>
            )}

            {(success || deleteMessage) && (
              <div className="space-y-2 mb-4">
                {success && (
                  <div className="w-full bg-green-50 border border-green-200 text-green-700 p-3! rounded-[4px] text-sm">
                    Profile updated successfully!
                  </div>
                )}
                {deleteMessage && (
                  <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 p-3! rounded-[4px] text-sm">
                    {deleteMessage}
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Profile Photo */}
              <section className="flex flex-col gap-4 border border-olx_border_gray_light rounded-lg p-4">
                <h2 className="text-lg font-semibold text-[#002f34]">Profile photo</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-olx_border_gray">
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-sm">
                    <label className="bg-[#002f34] text-white px-4! py-2! rounded-[4px] cursor-pointer hover:bg-[#01383e] transition-all flex items-center gap-2 text-sm w-max">
                      <Upload size={18} /> Upload photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} disabled={loading} />
                    </label>
                    <p className="text-xs text-gray-500">
                      JPG, JPEG, PNG · Min width 400px · Max 1024px
                    </p>
                  </div>
                </div>
              </section>

              {/* Account info */}
              <section className="border border-olx_border_gray_light rounded-lg p-4 space-y-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-[#002f34]">Account information</h2>
                  <p className="text-sm text-gray-500">Tell buyers who you are. Your profile builds trust.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold text-gray-700">Full name*</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-olx_border_gray rounded-md p-3! text-sm"
                      placeholder="Enter your full name"
                      required
                      minLength={3}
                      maxLength={30}
                    />
                    <p className="text-xs text-gray-500">{name.length}/30</p>
                  </div>

                  {/* Username */}
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold text-gray-700">Username*</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError(null);
                      }}
                      onBlur={(e) => handleUsernameBlur(e.target.value)}
                      className={`w-full border rounded-md p-3! text-sm ${usernameError ? "border-red-400" : "border-olx_border_gray"}`}
                      placeholder="olx-username"
                      required
                    />
                    <div className="flex items-center gap-2 text-xs">
                      {checkingUsername && <span className="text-gray-500">Checking availability...</span>}
                      {usernameError && <span className="text-red-500">{usernameError}</span>}
                      {!usernameError && !checkingUsername && username && (
                        <span className="text-green-600">Looks good!</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-dashed border-olx_border_gray_light rounded-lg p-4 bg-[#fdfdfd]">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase text-gray-500">Email</span>
                    <span className="text-sm font-medium text-[#002f34]">{user?.email || "Not available"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase text-gray-500">Verification</span>
                    {verificationBadge}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase text-gray-500">Member since</span>
                    <span className="text-sm font-medium text-[#002f34]">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Delete account */}
              <section className="border border-red-200 rounded-lg p-4 bg-red-50/60">
                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-[#b42318] flex items-center gap-2">
                    <Trash2 size={18} /> Delete account
                  </h2>
                  <p className="text-sm text-[#7a271a]">
                    Deleting your account removes your ads, messages, and saved searches. If you're sure, click the button below and we'll guide you through the final step.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="mt-4 bg-[#b42318] text-white py-3! px-6! rounded-md hover:bg-[#912114] transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete my account
                </button>
              </section>

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading || !name || name.trim().length < 3 || !username || usernameError}
                  className="bg-[#002f34] text-white py-3! px-6! rounded-md hover:bg-[#01383e] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto text-center"
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="border border-[#002f34] text-[#002f34] py-3! px-6! rounded-md hover:bg-gray-50 transition-all w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
