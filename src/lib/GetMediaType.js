import {MediaType} from './MediaType';
import {properRace} from './ProperRace';

const ext = {
    image: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'],
    video: ['mp4', 'mkv', 'webm', 'avi', 'mov'],
    audio: ['mp3', 'wav', 'flac', 'ogg']
};

export const getMediaTypeByExt = async url => {
    try{
        const {pathname} = new URL(url);
        const file_ext = pathname.substring(pathname.lastIndexOf(".") + 1);

        if(ext.image.indexOf(file_ext) >= 0) return MediaType.image;
        if(ext.video.indexOf(file_ext) >= 0) return MediaType.video;
        if(ext.audio.indexOf(file_ext) >= 0) return MediaType.audio;

        return MediaType.link;
    }
    catch(e){
        return MediaType.link;
    }
};

export const getMediaTypeByMeta = async url => {
    const image = checkIfImage(url);
    const video = checkIfVideo(url);
    const audio = checkIfAudio(url);
    return await properRace([image, video, audio]);
};

const checkIfImage = url => new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onabort = reject;
    img.onload = () => resolve(MediaType.image);
    img.src = url;
});

const checkIfVideo = url => new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onerror = reject;
    video.onabort = reject;
    video.oncanplay = async () => {
        if(await getMediaTypeByExt(url) === MediaType.audio){
            resolve(MediaType.audio);
        }
        else{
            resolve(MediaType.video);
        }
    };
    video.src = url;
});

const checkIfAudio = url => new Promise((resolve, reject) => {
    const audio = document.createElement('audio');
    audio.onerror = reject;
    audio.onabort = reject;
    audio.oncanplay = async () => {
        if(await getMediaTypeByExt(url) === MediaType.video){
            resolve(MediaType.video);
        }
        else{
            resolve(MediaType.audio);
        }
    };
    audio.src = url;
});