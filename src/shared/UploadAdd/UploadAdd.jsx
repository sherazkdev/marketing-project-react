import { useContext, useState } from "react";
import { Upload, MapPin, Phone, Images, X } from "lucide-react";
import { useForm } from "react-hook-form";
import TitleInput from "./components/TitleInput/TitleInput";
import DescriptionInput from "./components/DescriptionInput/DescriptionInput";
import HashtagsInput from "./components/HashtagInput/HashtagInput";


// Auth Provider
import {AuthContext} from "../../contexts/AuthProvider";
import Loader from "../../utils/Loader/Loader";
import useCloudinary from "../../hooks/useCloudinary";
import usePostAdd from "../../hooks/usePostAdd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostYourAd({category,subCategory}) {

    const [images, setImages] = useState([]);
    const [coverImageIndex, setCoverImageIndex] = useState(0);
    const [loading,setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const {setValue,register,setError,watch,handleSubmit,formState:{errors}} = useForm({defaultValues:{
        title:"",
        description:"",
        location:"",
        price:"",
        hashtags:[]
    }});

    const hashtags = watch("hashtags");
    const title = watch("title");
    const description = watch("description");

    // Cloudinary 
    const {Data,HandlePostNewAdd} = usePostAdd();
    const {HandleUploadFile} = useCloudinary();

    // Auth
    const {user} = useContext(AuthContext);

    // Image Upload to add image state
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImgs = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
        const updatedImages = [...images, ...newImgs].slice(0, 12);
        setImages(updatedImages);
        if(images.length === 0 && newImgs.length > 0) {
            setCoverImageIndex(0);
        }
    };

    // Delete image
    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        if(coverImageIndex === index && newImages.length > 0) {
            setCoverImageIndex(0);
        } else if(coverImageIndex > index) {
            setCoverImageIndex(coverImageIndex - 1);
        }
    };

    // Set cover image
    const handleSetCoverImage = (index) => {
        setCoverImageIndex(index);
    };

    // HandleonSubmit form data
    const HandleOnSubmit = async (data) => {
        if(images.length === 0) {
            setSubmitError("Please upload at least one image");
            return;
        }

        try {
            setSubmitError(null);
            setLoading(true);
            
            const uploadPromises = images.map(fileObj => {
                const formData = new FormData();
                formData.append("file", fileObj?.file);
                formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
                return HandleUploadFile(formData);
            });

            const results = await Promise.all(uploadPromises);
            const uploadedImages = results.map(r => { 
                return { 
                    mediaUrl:r?.secure_url || r?.url, 
                    filename:r?.original_filename + (r?.format ? `.${r.format}` : ''), 
                    mediaType:r?.resource_type?.toUpperCase() || "IMAGE"
                };
            });

            // Set cover image based on selected index
            const coverImageUrl = uploadedImages[coverImageIndex]?.mediaUrl;
            const mediaWithoutCover = uploadedImages.filter((_, idx) => idx !== coverImageIndex);

            // Post add Payload
            const postAddPayload = {
                coverImage: coverImageUrl,
                media: mediaWithoutCover,
                title: data.title,
                description: data.description,
                hashtags: data.hashtags || [],
                price: data.price,
                location: data.location,
                category: category.category,
                subCategory: subCategory
            };

            /** Upload to db */
            const uploadPost = await HandlePostNewAdd(postAddPayload);
            
            if(uploadPost) {
                navigate("/myadds");
            } else {
                setSubmitError(Data.AddError || "Failed to post ad. Please try again.");
            }
        } catch (e) {
            setSubmitError(e?.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    useEffect( () => {
        if(Data.Add !== null){
            setLoading(false);
            if(Data.AddError) {
                setSubmitError(Data.AddError);
            }
        }
    },[Data.Add, Data.AddError])

    return (
        <>
            {loading && (<Loader />)}
            <div className='w-full h-full flex justify-center items-start'>
                <div id="center-section" className='max-w-[1280px] w-full'>
                    <div className="flex flex-col ">
                        
                        <div id="topHeader">
                            
                            {/* top header */}
                            <div className='w-full flex justify-center items-center !py-4 !px-8'>
                                <h1 className='text-[#002f34] text-[32px] font-semibold'>Post your ad</h1>
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
                                        <p className="text-sm font-medium">{category?.category}</p>
                                        <p className="text-xs text-gray-500">{subCategory}</p>
                                    </div>
                                    </div>
                                </div>

                                {/* IMAGE UPLOAD */}
                                <div className="!mb-8">
                                    <h2 className="text-base font-semibold text-gray-700">Upload Images</h2>
                                    <div className="grid grid-cols-6 gap-4 !mt-5">
                                    {/* Add Button */}
                                    {images.length < 12 && (
                                        <label className="w-full h-20 border flex justify-center items-center rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 !p-2">
                                            <Upload size={24} />
                                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    )}

                                    {/* Image previews */}
                                    {images.map((img, idx) => (
                                        <div key={idx} className="w-full h-20 border rounded-md overflow-hidden relative group">
                                            <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                                            {idx === coverImageIndex && (
                                                <div className="text-white absolute text-xs bg-[rgba(0,0,0,0.6)] bottom-0 text-center w-full !p-1">
                                                    Cover Image
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full !p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetCoverImage(idx)}
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
                                    </div>
                                    {submitError && (
                                        <p className="text-xs text-red-500 !mt-2">{submitError}</p>
                                    )}
                                    <p className="text-xs text-gray-500 !mt-3">
                                        For the cover picture we recommend using landscape mode. Click on an image to set it as cover.
                                    </p>
                                </div>

                                {/* TITLE */}
                                <TitleInput onChange={ (val) => setValue("title",val)} />


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
                                    <input className="w-full border rounded-md !mt-3 !p-3 text-sm" placeholder="Your Name" value={user?.fullname} />

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
                                    disabled={loading || images.length === 0}
                                >
                                    {loading ? "Posting..." : "Post now"}
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
