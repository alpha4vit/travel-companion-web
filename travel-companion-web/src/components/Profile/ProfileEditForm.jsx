import React, { useState } from 'react';
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { UserService } from '../../api/UserService';
import { PostService } from '../../api/PostService';
import { ImageService } from '../../api/ImageService';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputFileUpload from '../UI/input/InputFileUpload';
import {Stack} from "@mui/joy";

const ProfileEditForm = ({ user, setVisible, avatar, setAvatar, setUser }) => {
    const [edited, setEdited] = useState({ ...user });
    const [isImageDownloaded, setImageDownloaded] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('Загруженный файл');

    const editUser = async () => {
        await UserService.updateUser(edited);
        if (isImageDownloaded) {
            const response = await ImageService.loadImage(avatar, user);
            setEdited({ ...edited, avatar: response });
            localStorage.setItem('authenticatedUser', JSON.stringify({ ...edited, avatar: response }));
            setUser({ ...edited, avatar: response });
        } else {
            localStorage.setItem('authenticatedUser', JSON.stringify(edited));
            setUser(edited);
        }
        setVisible(false);
        setImageDownloaded(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFileName(selectedFile.name)
            setAvatar(selectedFile);
            setImageDownloaded(true);
        }
        else {
            setSelectedFileName("Загруженный файл")
            setAvatar("");
            setImageDownloaded(false);
        }
    };

    return (
        <div>
            <form>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="username"
                        onChange={(e) => setEdited({ ...edited, username: e.target.value })}
                        value={edited.username}
                        label="Имя пользователя"
                        variant="outlined"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="email"
                        onChange={(e) => setEdited({ ...edited, email: e.target.value })}
                        value={edited.email}
                        label="Электронная почта"
                        variant="outlined"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="phone_number"
                        onChange={(e) => setEdited({ ...edited, phone_number: e.target.value })}
                        value={edited.phone_number}
                        label="Номер телефона"
                        variant="outlined"
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="bio"
                        onChange={(e) => setEdited({ ...edited, bio: e.target.value })}
                        value={edited.bio}
                        label="Биография"
                        variant="outlined"
                    />
                </Box>
                <Box mb={2}>
                    <form>
                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                            <InputFileUpload callback={(e) => handleFileChange(e)} text="Загрузить аватар" />
                            <p style={{marginTop:6}}>{selectedFileName}</p>
                        </Stack>

                    </form>
                </Box>


                <Button fullWidth variant="contained" type="button" onClick={editUser}>
                    Сохранить изменения
                </Button>
            </form>
        </div>
    );
};

export default ProfileEditForm;
