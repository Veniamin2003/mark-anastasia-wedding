// Попробуйте этот модифицированный код:
export const Fscreen = () => {
    const preview = document.getElementById('videoPreview');
    const isMobile = window.innerWidth < 768;

    // Выбираем нужное видео в зависимости от экрана
    const video = isMobile
        ? document.getElementById('video-mb')
        : document.getElementById('video-ds');

    if (!video || !preview) return;

    const hidePreview = () => {
        preview.classList.add('isHidden');
        video.classList.add('isVisible');
    };

    // 1. Если видео уже играет (например, вернулись на вкладку или загрузилось из кэша)
    if (video.readyState >= 3 && !video.paused) {
        hidePreview();
    }

    // 2. Ждем событие начала проигрывания (самый надежный способ для iOS)
    video.addEventListener('playing', hidePreview, { once: true });

    // 3. Резервный запуск для случаев, когда автоплей притормаживает
    video.play().catch(() => {
        console.warn("Autoplay blocked by system (likely Low Power Mode)");
    });
};


// export const Fscreen = () => {
//     try {
//         const video = document.getElementById('myVideo');
//         const preview = document.getElementById('videoPreview');
//
//         if (!video || !preview) return;
//
//         // Важно для iOS: загрузить видео перед воспроизведением
//         video.load();
//
//         const hidePreview = () => {
//             preview.classList.add('isHidden');
//             video.classList.add('isVisible');
//
//             // На iOS требуется пользовательское взаимодействие
//             // Попробуйте запускать не сразу
//             setTimeout(() => {
//                 video.play().catch(error => {
//                     console.log('Play failed:', error);
//                     // Автовоспроизведение может быть заблокировано
//                     video.setAttribute('autoplay', '');
//                 });
//             }, 100);
//         };
//
//         // Попробуйте разные события для iOS
//         const playVideo = () => {
//             if (video.readyState >= 4) { // HAVE_ENOUGH_DATA
//                 hidePreview();
//             }
//         };
//
//         video.addEventListener('loadeddata', playVideo);
//         video.addEventListener('canplay', playVideo);
//
//         setTimeout(playVideo, 2000);
//     } catch (e) {
//         console.error(e);
//     }
// };

// export const Fscreen = () => {
//     try {
//         const video = document.getElementById('myVideo');
//         const preview = document.getElementById('videoPreview');
//
//         if (!video || !preview) return;
//
//         const hidePreview = () => {
//             preview.classList.add('isHidden');
//             video.classList.add('isVisible');
//
//             video.play().catch(() => {});
//         };
//
//         video.addEventListener('canplaythrough', hidePreview, { once: true });
//
//         setTimeout(() => {
//             if (video.readyState >= 3) {
//                 hidePreview();
//             }
//         }, 3000);
//     } catch (e) {
//         console.error(e);
//     }
// }
