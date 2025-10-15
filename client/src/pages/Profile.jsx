import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.id; // auth context'te id olsun
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!userId) return;
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/users/${userId}`);
                setProfile(res.data);
                setUsername(res.data.username || '');
                if (res.data.img) {
                    setPreview(`/upload/${res.data.img}`);
                }
            } catch (err) {
                console.error("fetchProfile", err);
            }
        };
        fetchProfile();
    }, [userId]);

    // avatar edit button -> trigger file input
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(f);
    };

    const handleUpload = async () => {
        if (!file) return alert("Choose image");
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await api.post('/upload', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const filename = res.data;

            const updated = await api.put(`/users/${userId}`, { img: filename });
            setProfile(updated.data);
            setFile(null);
            setMessage('Avatar uploaded successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err);
        }
    };

    // delete avatar
    const handleDelete = async () => {
        if (!confirm("Delete avatar?")) return;
        try {
            await api.delete(`/users/${userId}/avatar`);
            setProfile((p) => ({ ...p, img: null }));
            setPreview(null);
            setMessage('Avatar deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err);
        }
    };

    // update username
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/users/${userId}`, { username });
            setProfile(res.data);
            setMessage('Profile uploaded successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="profile">
            <div className="photo">
                {(preview || profile?.img) && (
                    <img
                        src={
                            preview
                                ? preview
                                : `/upload/${profile?.img}`
                        }
                        alt="avatar"
                    />
                )}
                <button className="avatar-edit" onClick={handleEditClick} aria-label="Change avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 7h3l2-2h6l2 2h3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

            </div>
            <div className="avatar-actions">
                <button onClick={handleDelete} disabled={!profile?.img && !preview}>Delete Photo</button>
                {message && <div className="toast">{message}</div>}
                <button onClick={handleUpload} disabled={!file}>Upload Photo</button>

            </div>

            <div className="username">
                <form onSubmit={handleSave}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    <button type="submit">Save</button>

                </form>


            </div>
        </div>
    );
};

export default Profile;
