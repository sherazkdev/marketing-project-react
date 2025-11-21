import { useContext, useState, useEffect } from "react";
import { Upload, MapPin, Phone, Images, X } from "lucide-react";
import { useForm } from "react-hook-form";
import TitleInput from "../UploadAdd/components/TitleInput/TitleInput";
import DescriptionInput from "../UploadAdd/components/DescriptionInput/DescriptionInput";
import HashtagsInput from "../UploadAdd/components/HashtagInput/HashtagInput";

// Auth Provider
import {AuthContext} from "../../contexts/AuthProvider";
import Loader from "../../utils/Loader/Loader";
import useCloudinary from "../../hooks/useCloudinary";
import useUpdateAdd from "../../hooks/useUpdateAdd";
import { useNavigate, useLocation } from "react-router-dom";
import { GetSingleAddById } from "../../api/instance";

export default function EditAdd() {

    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [coverImageIndex, setCoverImageIndex] = useState(0);
    const [loading,setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [addId, setAddId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const {setValue,register,setError,watch,handleSubmit,formState:{errors}} = useForm({defaultValues:{
        title:"",
        description:"",
        location:"",
        price:"",
        hashtags:[],
        category:"",
        subCategory:""
    }});

    const hashtags = watch("hashtags");
    const title = watch("title");
    const description = watch("description");
    const categoryValue = watch("category");
    const subCategoryValue = watch("subCategory");

    // Cloudinary 
    const {Data: UpdateData,HandleUpdateAdd} = useUpdateAdd();
    const {HandleUploadFile} = useCloudinary();

    // Auth
    const {user} = useContext(AuthContext);

    // Get add ID from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        if(id) {
            setAddId(id);
            fetchAddData(id);
        }
    }, [location.search]);

    // Fetch existing add data
    const fetchAddData = async (id) => {
        try {
            setLoading(true);
            const response = await GetSingleAddById({id});
            if(response.data?.statusCode === 200 && response.data?.success) {
                const add = response.data.data;
                setValue("title", add.title || "");
                setValue("description", add.description || "");
                setValue("price", add.price?.toString() || "");
                setValue("hashtags", add.hashtags || []);
                setValue("location", add.location || "");
                setValue("category", add.category || "");
                setValue("subCategory", add.subCategory || "");
                
                // Set existing images
                const allImages = [];
                if(add.coverImage) {
                    allImages.push({
                        url: add.coverImage,
                        isExisting: true,
                        isCover: true,
                        filename: add.coverImageFilename || "cover.jpg",
                        mediaType: "IMAGE"
                    });
                }
                if(add.media && Array.isArray(add.media)) {
                    add.media.forEach(media => {
                        allImages.push({
                            url: media.mediaUrl,
                            isExisting: true,
                            isCover: false,
                            filename: media.filename,
                            mediaType: media.mediaType
                        });
                    });
                }
                setExistingImages(allImages);
                setCoverImageIndex(0);
            }
        } catch (e) {
            setSubmitError("Failed to load ad data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const total = existingImages.length + images.length;
        if(total > 0 && coverImageIndex >= total) {
            setCoverImageIndex(0);
        }
    },[existingImages.length, images.length, coverImageIndex]);

    // Image Upload to add image state
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImgs = files.map((file) => ({ file, url: URL.createObjectURL(file), isExisting: false }));
        const updatedImages = [...images, ...newImgs].slice(0, 12);
        setImages(updatedImages);
    };

    // Delete image
    const handleDeleteImage = (index, isExisting) => {
        if(isExisting) {
            setExistingImages((prev) => {
                const newExisting = prev.filter((_, i) => i !== index);
                setCoverImageIndex((prevCover) => {
                    if(prevCover === index) return 0;
                    if(prevCover > index) return prevCover - 1;
                    return prevCover;
                });
                return newExisting;
            });
        } else {
            setImages((prev) => {
                const newImages = prev.filter((_, i) => i !== index);
                setCoverImageIndex((prevCover) => {
                    const globalIndex = existingImages.length + index;
                    if(prevCover === globalIndex) return 0;
                    if(prevCover > globalIndex) return prevCover - 1;
                    return prevCover;
                });
                return newImages;
            });
        }
    };

    // Set cover image
    const handleSetCoverImage = (index, isExisting) => {
        if(isExisting) {
            setCoverImageIndex(index);
        } else {
            const totalExisting = existingImages.length;
            setCoverImageIndex(totalExisting + index);
        }
    };

    // HandleonSubmit form data
    const HandleOnSubmit = async (data) => {
        const totalImages = existingImages.length + images.length;
        if(totalImages === 0) {
            setSubmitError("Please keep at least one image");
            return;
        }
        
        try {
            setSubmitError(null);
            setLoading(true);
            
            // Upload new images
            const uploadPromises = images.map(fileObj => {
                const formData = new FormData();
                formData.append("file", fileObj?.file);
                formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
                return HandleUploadFile(formData);
            });

            const uploadedResults = images.length > 0 ? await Promise.all(uploadPromises) : [];
            const uploadedImages = uploadedResults.map(r => { 
                return { 
                    mediaUrl:r?.secure_url || r?.url, 
                    filename:r?.original_filename + (r?.format ? `.${r.format}` : ''), 
                    mediaType:r?.resource_type?.toUpperCase() || "IMAGE"
                };
            });

            // Combine existing and new images
            const existingMediaEntries = existingImages.map(img => ({
                mediaUrl: img.url,
                filename: img.filename || "",
                mediaType: img.mediaType || "IMAGE"
            }));

            const combinedMedia = [...existingMediaEntries, ...uploadedImages];

            const safeCoverIndex = coverImageIndex >= combinedMedia.length ? 0 : coverImageIndex;
            const coverMedia = combinedMedia[safeCoverIndex];
            const coverImageUrl = coverMedia?.mediaUrl || coverMedia?.url || existingImages[0]?.url || uploadedImages[0]?.mediaUrl;

            const mediaWithoutCover = combinedMedia
                .filter((_, idx) => idx !== safeCoverIndex)
                .map((img, idx) => ({
                    mediaUrl: img.mediaUrl || img.url,
                    filename: img.filename || `image_${idx}.jpg`,
                    mediaType: img.mediaType || "IMAGE"
                }));

            // Update add Payload
            const updateAddPayload = {
                _id: addId,
                coverImage: coverImageUrl,
                media: mediaWithoutCover,
                title: data.title,
                location:data?.location,
                description: data.description,
                hashtags: data.hashtags || [],
                price: data.price,
                category: data.category || "",
                subCategory: data.subCategory || ""
            };

            /** Update in db */
            const updateResult = await HandleUpdateAdd(updateAddPayload);
            
            if(updateResult) {
                navigate("/myadds");
            } else {
                setSubmitError(UpdateData.UpdateError || "Failed to update ad. Please try again.");
            }
        } catch (e) {
            setSubmitError(e?.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    useEffect( () => {
        if(UpdateData.UpdatedAdd !== null){
            setLoading(false);
            if(UpdateData.UpdateError) {
                setSubmitError(UpdateData.UpdateError);
            }
        }
    },[UpdateData.UpdatedAdd, UpdateData.UpdateError])

    if(loading && !addId) {
        return <Loader />;
    }

    return (
        <>
            {loading && (<Loader />)}
            <div className='w-full h-full flex justify-center items-start'>
                <div id="center-section" className='max-w-[1280px] w-full'>
                    <div className="flex flex-col ">
                        
                        <div id="topHeader">
                            
                            {/* top header */}
                            <div className='w-full flex justify-center items-center !py-4 !px-8'>
                                <h1 className='text-[#002f34] text-[32px] font-semibold'>Edit your ad</h1>
                            </div>

                        </div>
                        
                        <form onSubmit={handleSubmit(HandleOnSubmit)}>
                            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                                {/* LEFT SIDE */}
                                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md !p-8">
                                {/* CATEGORY */}
                                <div className="!mb-8 border-b !pb-6">
                                    <h2 className="text-base font-semibold text-gray-700">Category</h2>
                                <div className="flex items-center gap-4 !mt-4 bg-[#f8f8f8] !p-4 rounded-md max-w-xs">
                                    <Images size={24} />
                                    <div>
                                        <p className="text-sm font-medium">{categoryValue || "Category not set"}</p>
                                        <p className="text-xs text-gray-500">{subCategoryValue || "Subcategory"}</p>
                                    </div>
                                    </div>
                                    <input type="hidden" {...register("category")} />
                                    <input type="hidden" {...register("subCategory")} />
                                </div>

                                {/* IMAGE UPLOAD */}
                                <div className="!mb-8">
                                    <h2 className="text-base font-semibold text-gray-700">Images</h2>
                                    <div className="grid grid-cols-6 gap-4 !mt-5">
                                    {/* Add Button */}
                                    {(existingImages.length + images.length) < 12 && (
                                        <label className="w-full h-20 border flex justify-center items-center rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 !p-2">
                                            <Upload size={24} />
                                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    )}

                                    {/* Existing Image previews */}
                                    {existingImages.map((img, idx) => (
                                        <div key={`existing-${idx}`} className="w-full h-20 border rounded-md overflow-hidden relative group">
                                            <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                                            {idx === coverImageIndex && (
                                                <div className="text-white absolute text-xs bg-[rgba(0,0,0,0.6)] bottom-0 text-center w-full !p-1">
                                                    Cover Image
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(idx, true)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full !p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetCoverImage(idx, true)}
                                                className="absolute inset-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-20 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                            >
                                                {idx !== coverImageIndex && (
                                                    <span className="text-white text-xs bg-[rgba(0,0,0,0.6)] !px-2 !py-1 rounded">
                                                        Set as cover
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    ))}

                                    {/* New Image previews */}
                                    {images.map((img, idx) => (
                                        <div key={`new-${idx}`} className="w-full h-20 border rounded-md overflow-hidden relative group">
                                            <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                                            {(existingImages.length + idx) === coverImageIndex && (
                                                <div className="text-white absolute text-xs bg-[rgba(0,0,0,0.6)] bottom-0 text-center w-full !p-1">
                                                    Cover Image
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(idx, false)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full !p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetCoverImage(idx, false)}
                                                className="absolute inset-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-20 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                            >
                                                {(existingImages.length + idx) !== coverImageIndex && (
                                                    <span className="text-white text-xs bg-[rgba(0,0,0,0.6)] !px-2 !py-1 rounded">
                                                        Set as cover
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                    </div>
                                    {submitError && (
                                        <p className="text-xs text-red-500 !mt-2">{submitError}</p>
                                    )}
                                    <p className="text-xs text-gray-500 !mt-3">
                                        Click on an image to set it as cover.
                                    </p>
                                </div>

                                {/* TITLE */}
                                <TitleInput onChange={ (val) => setValue("title",val)} value={title}/>

                                {/* Description */}
                                <DescriptionInput onChange={ (val) => setValue("description",val)} title={title} value={description}/>

                                {/* HASHTAGS */}
                                <div className="mb-8">
                                    <p className="text-base font-semibold">Hashtags*</p>

                                    <HashtagsInput
                                        hashtags={hashtags}
                                        title={title}
                                        onChange={(val) => setValue("hashtags", val)}
                                    />
                                </div>

                                {/* LOCATION */}
                                <div className="!mb-8">
                                    <p className="text-base font-semibold">Location*</p>
                                    <div className="flex items-center border rounded-md !mt-3 !p-3 text-sm bg-white">
                                        <MapPin size={20} className="!mr-3" />
                                        <input placeholder="Select Location" className="w-full outline-none" {...register("location",{required:true})} />
                                    </div>
                                </div>

                                {/* PRICE */}
                                <div className="!mb-8">
                                    <p className="text-base font-semibold">Price*</p>
                                    <div className="flex items-center border rounded-md !mt-3 !p-3 text-sm bg-white">
                                        <span className="!mr-3">Rs</span>
                                        <input type="number" placeholder="Enter Price" className="w-full outline-none"  {...register("price",{required:true})}/>
                                    </div>
                                </div>

                                {/* NAME & PHONE */}
                                <div className="!mb-8">
                                    <p className="text-base font-semibold">Name*</p>
                                    <input className="w-full border rounded-md !mt-3 !p-3 text-sm" placeholder="Your Name" value={user?.fullname || ""} readOnly />

                                    <div className="flex items-center justify-between !mt-5">
                                    <div>
                                        <p className="text-base font-semibold">Your phone number</p>
                                        <p className="text-sm text-gray-600 flex items-center gap-2 !mt-2">
                                        <Phone size={18} /> +923259302678
                                        </p>
                                    </div>

                                    <label className="cursor-pointer">
                                        <input type="checkbox" className="hidden peer" />
                                        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 relative transition-all">
                                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:left-6 transition-all" />
                                        </div>
                                    </label>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <button 
                                    className="w-full bg-[#002f34] text-white !py-3 rounded-md mt-5 hover:bg-[#01383e] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed" 
                                    type="submit"
                                    disabled={loading || (existingImages.length + images.length) === 0}
                                >
                                    {loading ? "Updating..." : "Update ad"}
                                </button>
                                {errors.title && (
                                    <p className="text-xs text-red-500 !mt-2">Title is required</p>
                                )}
                                {errors.description && (
                                    <p className="text-xs text-red-500 !mt-2">Description is required</p>
                                )}
                                {errors.price && (
                                    <p className="text-xs text-red-500 !mt-2">Price is required</p>
                                )}
                                {errors.location && (
                                    <p className="text-xs text-red-500 !mt-2">Location is required</p>
                                )}

                            </div>

                            {/* RIGHT HELP SECTION */}
                            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md !p-8 h-fit">
                                <h2 className="text-base font-semibold text-gray-700 !mb-4">Need help getting started?</h2>
                                <ul className="text-sm leading-6 text-gray-600 space-y-3">
                                    <li className="underline cursor-pointer">
                                    Tips for improving your ad & your chances of selling
                                    </li>
                                    <li className="underline cursor-pointer">
                                    All you need to know about Posting Ads
                                    </li>
                                </ul>
                            </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

