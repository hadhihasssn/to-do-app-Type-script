import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Modal from './profileEditModal';
import { editMainProfileSection } from '../../api/commonApi';
import { MyContext, Context } from '../../context/myContext';
import { uploadProfilePhoto } from '../../api/client.Api';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const profileTalentDetailsFirst: React.FC<{ datas: {}, onUpdate: () => void }> = ({ datas, onUpdate }) => {

    const basicData: any = useContext(MyContext);
    const [details, setDetails] = useState<any>(null);
    const [sp_Message, setMessage] = useState<Boolean>(false);
    const IMG = `http://localhost:3000/images/${details?.Profile?.profile_Dp}`;
    const truncatedDescription = details?.Profile?.Description?.slice(0, 200); // Display only first 200 characters
    const remainingDescription = details?.Profile?.Description?.slice(10); // Display remaining characters
    const [image, setImage] = useState<any>(null);

    const [formData, setData] = useState({
        first_name: "",
        last_name: "",
        description: "",
        title: "",
    })
    useEffect(() => {
        setDetails(datas);
        setData({
            first_name: datas?.First_name || "add you first name",
            last_name: datas?.Last_name || "add you last  name",
            description: datas?.Profile?.Description || "add you profile description",
            title: datas?.Profile?.Title || "add you profile title ",
        })
    }, [datas]);
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    function uploadPhoto(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            let img: any = e.target.files[0];
            const data = new FormData();
            data.append('image', img);
            uploadProfilePhoto(data, basicData?.role)
                .then((res: any) => {
                    onUpdate()
                    let timerInterval: string | number | NodeJS.Timeout | undefined;
                    Swal.fire({
                        title: "Your profile photo uploading!",
                        // html: "I will close in <b></b> milliseconds.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer: any = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer!.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                    })
                }).catch((error: any) => {
                    console.log(error);
                    // Show SweetAlert with error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while uploading the photo.',
                    });
                });
        }
    }
    console.log(details)
    const changeHandle: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        console.log(formData)
    }
    const handleSubmit: (e: React.FormEvent) => void = (e) => {
        e.preventDefault()
        editMainProfileSection(formData, basicData?.role)
            .then((res) => {
                onUpdate()
                setMessage(true)
                setTimeout(() => {
                    setMessage(false)
                }, 3000);
            }).catch((error) => {
                console.log(error)
            })
    }

    const dateString = details?.createdAt;
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;



    console.log(formData, details)
    return <div className="w-[48rem] m-5 flex  rounded-xl  h-[20rem] shadow-xl  border bg-white">
        <div className=" xl:w-[13rem] m-5  sm:w[10rem] md:[14rem] ">
            <div>
                <img className="border border-black rounded-xl" src={IMG} alt="" />
            </div>
            <div className="m-2 w-[18rem] mt-2">
                <p className="font-sans font-normal text-sm">from : {details?.Country}</p>
                {/* <AccessTimeRoundedIcon fontSize="inherit" /> */}
                {/* <span className="font-sans font-normal text-xs ml-2" >It's currently 4:45 PM here</span><br /> */}
                <EditCalendarRoundedIcon fontSize="inherit" />
                <span className="font-sans font-normal text-xs ml-2">Joined {formattedDate ? formattedDate : "Joined September 1, 2013"}</span>
            </div>
        </div>
        <div className=" w-full ">
            <div className="flex justify-between ">
                <div className="mt-4">
                    <p className="text-2xl font-sans font-bold">{details?.First_name}</p>
                    <p className=" font-sans font-medium opacity-45">{details?.Profile?.Title}</p>
                </div>
                <div className="m-6">
                    <button className="w-[8rem] font-sans font-medium rounded-full h-8 border border-red-500 text-red-500 " onClick={openModal}>Edit Profle</button>
                </div>
            </div>

            {/* profile main section edit modal  */}

            <Modal isOpen={isOpen} onClose={closeModal}>
                {sp_Message ? <Alert severity="success">Profile Updated .</Alert> : null}

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center flex-col m-10">
                        <div className="w-20 h-20 bg-blue-200 rounded-full">
                            <img className="rounded-full h-20 w-20" src={image ? URL.createObjectURL(image) : IMG} alt="Selected" />
                        </div>
                        <div>
                            <label className="flex flex-col items-center mt-5 w-[10rem] bg-white red-blue-500 rounded-md shadow-md tracking-wide uppercase border-red-blue-500 cursor-pointer hover:bg-red-500 hover:text-white">
                                <span className="mt-1 text-xs leading-normal" >Upload photo</span>
                                <input type="file" accept="image/*" onChange={uploadPhoto} name='profile_dp' className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mr-5">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                            <input onChange={changeHandle} type="text" value={formData.first_name} name="first_name" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" ></input>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                            <input onChange={changeHandle} type="text" value={formData?.last_name} name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profileTitle" className="block mb-2 text-sm font-medium text-gray-900">Profile Title</label>
                        <input onChange={changeHandle} type="text" name="title" value={formData?.title} id="profileTitle" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="profileDescription" className="block mb-2 text-sm font-medium text-gray-900">Profile Description</label>
                        <textarea rows={5} onChange={changeHandle} name="description" value={formData?.description} id="profileDescription" placeholder="Write profile description..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-red-500 w-[10rem] h-[2rem] text-white border rounded-xl">Edit</button>
                    </div>
                </form>
            </Modal>

            {/* end the modal */}


            <div className="mt-2 mr-5 flex justify-between">
                <div>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />
                    </Stack>
                    <p className="text-gray-500 font-sans font-normal text-sm">4/5 (12 Reviews)</p>
                </div>
                <div className="border-r border-solid  border-gray-500 h-8 "></div>
                <div>
                    <CurrencyRupeeTwoToneIcon fontSize="inherit" color="error" />
                    <span className="text-gray-500 font-sans font-normal text-sm">Total earnings- 0K  Rs</span>
                </div><div className="border-r border-solid border-gray-500 h-8"></div>
                <div>
                    <VerifiedTwoToneIcon fontSize="inherit" color="primary" />
                    <span className="text-gray-500 font-sans ml-1 font-normal text-sm">0 projects completed</span>
                </div>
            </div>
            <div className="mr-3 mt-4">
                <p className="text-gray-700 font-sans font-normal text-sm">
                    {showMore ? details?.Profile?.Description : `${truncatedDescription}...`}
                    <span
                        className="text-red-500 font-bold cursor-pointer"
                        onClick={toggleShowMore}
                    >
                        {showMore ? 'Show less' : 'Show more'}
                    </span>
                </p>
            </div>
        </div>
    </div>;

}



export default profileTalentDetailsFirst;
