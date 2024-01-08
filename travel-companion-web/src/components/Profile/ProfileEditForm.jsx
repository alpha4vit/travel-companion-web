import React, {useEffect, useState} from 'react';
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { UserService } from '../../api/UserService';
import { PostService } from '../../api/PostService';
import { ImageService } from '../../api/ImageService';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputFileUpload from '../UI/input/InputFileUpload';
import {Stack} from "@mui/joy";
import TransitionAlert from "../UI/Alert/TransitionAlert";

const ProfileEditForm = ({ user, setVisible, avatar, setAvatar, setUser }) => {

    const [edited, setEdited] = useState({...user});
    // const [isImageUploaded, setImageUploaded] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('Загруженный файл');

    const [usernameIncorrect, setUsernameIncorrect] = useState(false);
    const [emailIncorrect, setEmailIncorrect] = useState(false);
    const [phonenumberIncorrect, setPhonenumberIncorrect] = useState(false);
    const [bioIncorrect, setBioIncorrect] = useState(false);
    const [avatarIncorrect, setAvatarIncorrect] = useState(false);

    const [errorUsernameMessage, setErrorUsernameMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [errorPhonenumberMessage, setErrorPhonenumberMessage] = useState("");
    const [errorBioMessage, setErrorBioMessage] = useState("");
    const [errorAvatarMessage, setErrorAvatarMessage] = useState("");

    const editUser = async () => {
        await UserService.updateUser(edited,
            () => {
                localStorage.setItem('authenticatedUser', JSON.stringify(edited));
                setUser(edited);
                setVisible(false);
                setUsernameIncorrect(false);
                setEmailIncorrect(false);
                setBioIncorrect(false);
                setPhonenumberIncorrect(false);
            },
            handleUsernameError,
            handlerEmailError,
            handlePhonenumberError,
            handleBioError);
    };

    const loadImage = async (file) => {
            await ImageService.loadImage(file, user, (response) => {
                setEdited({...edited, avatar: response});
                localStorage.setItem('authenticatedUser', JSON.stringify({...edited, avatar: response}));
                setUser({...edited, avatar: response});
            }, handleAvatarError);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFileName(selectedFile.name)
            setAvatar(selectedFile);
            loadImage(selectedFile);
        }
        else {
            setSelectedFileName("Загруженный файл")
            setAvatar("");
        }
        setAvatarIncorrect(false);
    };

    const handleUsernameError = (message, value) => {
        setUsernameIncorrect(value);
        setErrorUsernameMessage(message);
    }

    const handlerEmailError = (message, value) => {
        setEmailIncorrect(value);
        setErrorEmailMessage(message);
    }

    const handlePhonenumberError = (message, value) => {
        setPhonenumberIncorrect(value);
        setErrorPhonenumberMessage(message);
    }

    const handleBioError = (message, value) => {
        setBioIncorrect(value)
        setErrorBioMessage(message);
    }

    const handleAvatarError = (message, value) => {
        setAvatarIncorrect(value)
        setErrorAvatarMessage(message);
        setAvatar("");
        setSelectedFileName("Название файла");
    }


    return (
        <div>
            <form>
                <Box mb={2}>
                    <TextField
                        error={usernameIncorrect}
                        fullWidth
                        id="username"
                        onChange={(e) => {
                            setEdited({...edited, username: e.target.value});
                            setUsernameIncorrect(false);
                        }}
                        value={edited.username}
                        label="Имя пользователя"
                        variant="outlined"
                    />
                    <TransitionAlert message={errorUsernameMessage} open={usernameIncorrect} setOpen={setUsernameIncorrect}  />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="email"
                        onChange={(e) => {
                            setEdited({...edited, email: e.target.value});
                            setEmailIncorrect(false)
                        }}
                        value={edited.email}
                        label="Электронная почта"
                        variant="outlined"
                    />
                    <TransitionAlert message={errorEmailMessage} open={emailIncorrect} setOpen={setEmailIncorrect}  />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="phone_number"
                        onChange={(e) => {
                            setEdited({...edited, phone_number: e.target.value})
                            setPhonenumberIncorrect(false)
                        }}
                        value={edited.phone_number}
                        label="Номер телефона"
                        variant="outlined"
                    />
                    <TransitionAlert message={errorPhonenumberMessage} open={phonenumberIncorrect} setOpen={setPhonenumberIncorrect}  />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="bio"
                        onChange={(e) => {
                            setEdited({...edited, bio: e.target.value})
                            setBioIncorrect(false)
                        }}
                        value={edited.bio}
                        label="Биография"
                        variant="outlined"
                    />
                    <TransitionAlert message={errorBioMessage} open={bioIncorrect} setOpen={setBioIncorrect}  />
                </Box>
                <Box mb={2}>
                    <form>
                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                            <InputFileUpload callback={(e) => handleFileChange(e)} text="Загрузить аватар" />
                            <p style={{marginTop:6}}>{selectedFileName}</p>
                        </Stack>
                    </form>
                    <TransitionAlert message={errorAvatarMessage} open={avatarIncorrect} setOpen={setAvatarIncorrect}  />
                </Box>


                <Button fullWidth variant="contained" type="button" onClick={editUser}>
                    Сохранить изменения
                </Button>
            </form>
        </div>
    );
};

export default ProfileEditForm;
