export const getLangString = (field, defaultStr = '') => {
    if (!field) return defaultStr;
    if (typeof field === 'string') return field;

    if (field.en) {
        const enVal = field.en;
        if (typeof enVal === 'string') return enVal;
        return Object.values(enVal)[0] || defaultStr;
    }
    if (field.ta) {
        const taVal = field.ta;
        if (typeof taVal === 'string') return taVal;
        return Object.values(taVal)[0] || defaultStr;
    }

    const extract = Object.values(field)[0];
    return typeof extract === 'string' ? extract : defaultStr;
};

export const transformPost = (apiPost) => {
    console.log(apiPost, "API POST TRANSFORM")
    const attachments = apiPost.attachment || [];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
    const videoFile = attachments.find(url =>
        videoExtensions.some(ext => url.toLowerCase().endsWith(ext))
    );
    const imageFiles = attachments.filter(url =>
        !videoExtensions.some(ext => url.toLowerCase().endsWith(ext)) &&
        !url.toLowerCase().endsWith('.pdf')
    );

    let type = 'text';
    if (videoFile) {
        type = 'video';
    } else if (imageFiles.length > 0) {
        type = 'image';
    }

    return {
        id: apiPost._id,
        _id: apiPost._id,
        type,
        username: apiPost.createdusername || 'User',
        location: apiPost.listofdomain?.[0] || 'Location',
        attachment: apiPost.attachment,
        images: imageFiles,
        video: videoFile,
        titleObj: apiPost.title,
        captionObj: apiPost.description,
        titleEn: getLangString(apiPost.title?.en, 'Post Title'),
        titleTa: getLangString(apiPost.title?.ta, 'Post Title'),
        captionUser: apiPost.createdusername || 'user',
        captionEn: getLangString(apiPost.description?.en, ''),
        captionTa: getLangString(apiPost.description?.ta, ''),
        time: new Date(apiPost.createdtimestamp).toLocaleDateString(),
        enquirycount: apiPost.enquirycount || 0,
        // Call-to-action details
        calltoaction: apiPost.calltoaction,
        calltoactiontype: apiPost.calltoactiontype,
        whatsappnumber: apiPost.whatsappnumber,
        whatsappmessage: apiPost.whatsappmessage,
        callnumber: apiPost.callnumber,
        calltoactionexternallinkurl: apiPost.calltoactionexternallinkurl,
        createduserid: apiPost.createduserid,
    };
};