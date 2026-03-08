import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { X, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EventForm = ({ event, onClose }) => {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Format date string for datetime-local input
    const formatDateTimeForInput = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        // Required format: YYYY-MM-DDThh:mm
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        title: event?.title || '',
        description: event?.description || '',
        date: formatDateTimeForInput(event?.date) || '',
        location: event?.location || '',
        meeting_link: event?.meeting_link || '',
        image_url: event?.image_url || ''
    });

    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            // Create a temporary object URL for preview
            setFormData({ ...formData, image_url: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const uploadImageAndGetUrl = async () => {
        if (!imageFile) return formData.image_url; // Return existing if no new image selected

        setUploadingImage(true);
        try {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('event-images')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from('event-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
            throw error;
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Upload new image if exists
            let finalImageUrl = formData.image_url;
            if (imageFile) {
                finalImageUrl = await uploadImageAndGetUrl();
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                date: new Date(formData.date).toISOString(), // ensure standard ISO format
                location: formData.location,
                meeting_link: formData.meeting_link,
                image_url: finalImageUrl,
            };

            // 2. Save or Update Record
            if (event?.id) {
                const { error } = await supabase
                    .from('events')
                    .update(payload)
                    .eq('id', event.id);
                if (error) throw error;
                toast.success('Event updated successfully');
            } else {
                const { error } = await supabase
                    .from('events')
                    .insert([payload]);
                if (error) throw error;
                toast.success('Event created successfully');
            }

            onClose();
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-800 font-Playfair">
                    {event ? t('editEvent') : t('addEvent')}
                </h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('eventImage')}</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition relative group cursor-pointer overflow-hidden">
                        {(formData.image_url && typeof formData.image_url === 'string') ? (
                            <>
                                <img src={formData.image_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition" />
                                <div className="relative flex flex-col items-center">
                                    <Upload className="mx-auto h-12 w-12 text-blue-600 drop-shadow-md" />
                                    <p className="mt-2 flex text-sm text-slate-800 font-medium bg-white/80 px-3 py-1 rounded">Change Image</p>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                <div className="flex text-sm text-slate-600">
                                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        Upload a file
                                    </span>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        )}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('eventTitle')} *</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('eventDate')} *</label>
                        <input
                            required
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('eventDescription')}</label>
                    <textarea
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('eventLocation')}</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Beirut, Lebanon"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('eventLink')}</label>
                        <input
                            type="url"
                            value={formData.meeting_link}
                            onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. https://zoom.us/j/..."
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white shadow-[0_-10px_15px_-3px_rgba(255,255,255,1)]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {(loading || uploadingImage) && <Loader2 size={16} className="animate-spin" />}
                        {t('saveEvent')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
