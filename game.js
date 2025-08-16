// 游戏状态
const gameState = {
    score: 0,
    requiredScore: 7,
    isPlaying: true,
    hearts: [],
    animationFrameId: null
};

// DOM 元素
const heartsContainer = document.getElementById('hearts-container');
const progressContainer = document.getElementById('progress-container');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const starsContainer = document.getElementById('stars');
const musicToggleBtn = document.getElementById('music-toggle');
const musicNextBtn = document.getElementById('music-next');
const volumeSlider = document.getElementById('volume-slider');
const bgMusic = document.getElementById('bg-music');
const musicTitle = document.getElementById('music-title');
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loadingDetails = document.getElementById('loading-details');
const imageProgress = document.getElementById('image-progress');
const musicProgress = document.getElementById('music-progress');
const skipLoadingBtn = document.getElementById('skip-loading');

// 音乐控制状态
let isMusicPlaying = false;
let currentMusicIndex = 0;
let hasShownMusicTip = false;

// 资源加载状态
let loadedImages = 0;
let loadedMusic = 0;
let totalImages = 7;
let totalMusic = 4;
let isAllResourcesLoaded = false;

// 音乐列表
const musicList = [
    {id: 'bg-music', title: 'Love paradise', element: null},
    {id: 'romantic-music-1', title: 'Little temper', element: null},
    {id: 'romantic-music-2', title: 'A thousand miles', element: null},
    {id: 'romantic-music-3', title: 'Serenade In C,Op.48', element: null}
];

// 图片文件列表
const imageFiles = ['album/1.jpg', 'album/2.jpg', 'album/3.jpg', 'album/4.jpg', 'album/5.jpg', 'album/6.jpg', 'album/7.jpg'];

// 预加载图片
function preloadImages() {
    console.log('开始预加载图片...');
    const promises = imageFiles.map((imageFile, index) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            // 设置超时
            const timeout = setTimeout(() => {
                console.warn(`图片加载超时: ${imageFile}`);
                loadedImages++;
                updateLoadingProgress();
                resolve(null);
            }, 10000); // 10秒超时

            img.onload = () => {
                clearTimeout(timeout);
                console.log(`图片加载成功: ${imageFile}`);
                loadedImages++;
                updateLoadingProgress();
                resolve(img);
            };
            img.onerror = () => {
                clearTimeout(timeout);
                console.warn(`图片加载失败: ${imageFile}`);
                loadedImages++;
                updateLoadingProgress();
                resolve(null); // 即使失败也继续
            };
            img.src = imageFile;
        });
    });
    return Promise.all(promises);
}

// 预加载音乐
function preloadMusic() {
    console.log('开始预加载音乐...');
    const promises = musicList.map((music, index) => {
        return new Promise((resolve, reject) => {
            const audio = document.getElementById(music.id);
            if (audio) {
                // 设置超时
                const timeout = setTimeout(() => {
                    console.warn(`音乐加载超时: ${music.title}`);
                    loadedMusic++;
                    updateLoadingProgress();
                    resolve(null);
                }, 15000); // 15秒超时

                // 监听音乐加载事件
                const handleCanPlay = () => {
                    clearTimeout(timeout);
                    console.log(`音乐加载成功: ${music.title}`);
                    loadedMusic++;
                    updateLoadingProgress();
                    audio.removeEventListener('canplaythrough', handleCanPlay);
                    audio.removeEventListener('error', handleError);
                    audio.removeEventListener('loadeddata', handleLoadedData);
                    resolve(audio);
                };

                const handleError = () => {
                    clearTimeout(timeout);
                    console.warn(`音乐加载失败: ${music.title}`);
                    loadedMusic++;
                    updateLoadingProgress();
                    audio.removeEventListener('canplaythrough', handleCanPlay);
                    audio.removeEventListener('error', handleError);
                    audio.removeEventListener('loadeddata', handleLoadedData);
                    resolve(null); // 即使失败也继续
                };

                const handleLoadedData = () => {
                    clearTimeout(timeout);
                    console.log(`音乐数据加载成功: ${music.title}`);
                    loadedMusic++;
                    updateLoadingProgress();
                    audio.removeEventListener('canplaythrough', handleCanPlay);
                    audio.removeEventListener('error', handleError);
                    audio.removeEventListener('loadeddata', handleLoadedData);
                    resolve(audio);
                };

                audio.addEventListener('canplaythrough', handleCanPlay);
                audio.addEventListener('error', handleError);
                audio.addEventListener('loadeddata', handleLoadedData);

                // 尝试加载音乐
                try {
                    audio.load();
                } catch (e) {
                    console.warn(`音乐加载出错: ${music.title}`, e);
                    clearTimeout(timeout);
                    loadedMusic++;
                    updateLoadingProgress();
                    resolve(null);
                }
            } else {
                console.warn(`找不到音乐元素: ${music.id}`);
                loadedMusic++;
                updateLoadingProgress();
                resolve(null);
            }
        });
    });
    return Promise.all(promises);
}

// 更新加载进度
function updateLoadingProgress() {
    const totalProgress = ((loadedImages + loadedMusic) / (totalImages + totalMusic)) * 100;

    console.log(`更新进度: 图片 ${loadedImages}/${totalImages}, 音乐 ${loadedMusic}/${totalMusic}, 总计 ${Math.round(totalProgress)}%`);

    // 更新进度条
    progressBar.style.width = `${totalProgress}%`;
    progressText.textContent = `${Math.round(totalProgress)}%`;

    // 更新详细进度
    imageProgress.textContent = `${loadedImages}/${totalImages}`;
    musicProgress.textContent = `${loadedMusic}/${totalMusic}`;

    // 检查是否所有资源都加载完成
    if (loadedImages >= totalImages && loadedMusic >= totalMusic && !isAllResourcesLoaded) {
        console.log('所有资源加载完成，准备显示完成界面');
        isAllResourcesLoaded = true;
        showLoadingComplete();
    }
}

// 显示加载完成提示
function showLoadingComplete() {
    console.log('显示加载完成提示');
    const progressText = document.getElementById('progress-text');
    progressText.textContent = '100%';
    progressText.nextElementSibling.textContent = '加载完成！';

    // 添加完成动画
    const heart = document.querySelector('.loading-heart');
    heart.style.animation = 'loadingHeartbeat 0.5s ease-in-out 3';

    setTimeout(() => {
        hideLoadingScreen();
    }, 1500); // 延迟1.5秒让用户看到完成状态
}

// 隐藏加载界面
function hideLoadingScreen() {
    console.log('隐藏加载界面，开始游戏');
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transform = 'scale(0.95)';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        // 开始游戏
        initGame();
    }, 300);
}

// 显示音乐提示
function showMusicTip() {
    if (hasShownMusicTip) return;

    const tip = document.createElement('div');
    tip.className = 'fixed top-32 right-20 z-50 bg-gradient-to-r from-love-pink to-love-purple text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm animate-bounce';
    tip.innerHTML = '🎵 点击播放浪漫背景音乐 🎵';
    tip.style.animation = 'bounce 2s infinite';

    document.body.appendChild(tip);

    // 3秒后自动隐藏提示
    setTimeout(() => {
        tip.style.opacity = '0';
        tip.style.transform = 'translateY(-20px)';
        setTimeout(() => tip.remove(), 300);
    }, 3000);

    hasShownMusicTip = true;
}

// 初始化音乐控制
function initMusicControls() {
    // 初始化音乐列表
    musicList.forEach((music, index) => {
        music.element = document.getElementById(music.id);
        music.element.volume = volumeSlider.value / 100;

        // 添加音乐播放状态监听器
        music.element.addEventListener('play', () => {
            if (index === currentMusicIndex) {
                musicToggleBtn.innerHTML = '<i class="fa fa-pause"></i>';
                musicToggleBtn.classList.add('playing');
                document.querySelector('.music-player').classList.add('playing');
                isMusicPlaying = true;
            }
        });

        music.element.addEventListener('pause', () => {
            if (index === currentMusicIndex) {
                musicToggleBtn.innerHTML = '<i class="fa fa-play"></i>';
                musicToggleBtn.classList.remove('playing');
                document.querySelector('.music-player').classList.remove('playing');
                isMusicPlaying = false;
            }
        });

        music.element.addEventListener('ended', () => {
            if (index === currentMusicIndex && isMusicPlaying) {
                // 音乐播放结束后自动切换到下一首
                nextMusic();
            }
        });
    });

    musicToggleBtn.addEventListener('click', toggleMusic);
    musicNextBtn.addEventListener('click', nextMusic);
    volumeSlider.addEventListener('input', updateVolume);

    toggleMusic();
    // 设置初始音量
    updateVolume();

    // 自动播放音乐（需要用户交互）
    document.addEventListener('click', function () {
        if (isMusicPlaying && musicList[currentMusicIndex].element.paused) {
            musicList[currentMusicIndex].element.play().catch(e => console.log('自动播放失败:', e));
        }
    }, {once: true});

    updateMusicIcon();
    updateMusicTitle();
}

// 切换音乐播放状态
function toggleMusic() {
    const currentMusic = musicList[currentMusicIndex].element;
    const musicPlayer = document.querySelector('.music-player');

    if (isMusicPlaying) {
        currentMusic.pause();
        musicToggleBtn.innerHTML = '<i class="fa fa-play"></i>';
        musicToggleBtn.classList.remove('playing');
        musicPlayer.classList.remove('playing');
    } else {
        currentMusic.play().catch(e => console.log('播放失败:', e));
        musicToggleBtn.innerHTML = '<i class="fa fa-pause"></i>';
        musicToggleBtn.classList.add('playing');
        musicPlayer.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
}

// 切换到下一首音乐
function nextMusic() {
    // 停止当前音乐
    const currentMusic = musicList[currentMusicIndex].element;
    currentMusic.pause();
    currentMusic.currentTime = 0;

    // 切换到下一首
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;

    // 如果正在播放，自动播放新音乐
    if (isMusicPlaying) {
        const newMusic = musicList[currentMusicIndex].element;
        newMusic.play().catch(e => console.log('播放失败:', e));
    }

    updateMusicTitle();
}

// 更新音量
function updateVolume() {
    const volume = volumeSlider.value / 100;

    // 更新所有音乐的音量
    musicList.forEach(music => {
        if (music.element) {
            music.element.volume = volume;
        }
    });

    updateVolumeIcon(volume);
}

// 更新音量图标
function updateVolumeIcon(volume = null) {
    if (volume === null) {
        volume = musicList[currentMusicIndex].element.volume;
    }

    const volumeIcon = document.querySelector('.volume-control i');
    if (volume > 0.5) {
        volumeIcon.className = 'fa fa-volume-up text-love-pink text-sm';
    } else if (volume > 0) {
        volumeIcon.className = 'fa fa-volume-down text-love-pink text-sm';
    } else {
        volumeIcon.className = 'fa fa-volume-off text-love-pink text-sm';
    }
}

// 更新音乐图标
function updateMusicIcon() {
    const musicPlayer = document.querySelector('.music-player');

    if (isMusicPlaying) {
        musicToggleBtn.innerHTML = '<i class="fa fa-pause"></i>';
        musicToggleBtn.classList.add('playing');
        musicPlayer.classList.add('playing');
    } else {
        musicToggleBtn.innerHTML = '<i class="fa fa-play"></i>';
        musicToggleBtn.classList.remove('playing');
        musicPlayer.classList.remove('playing');
    }
}

// 更新音乐标题
function updateMusicTitle() {
    musicTitle.textContent = musicList[currentMusicIndex].title;
}

// 初始化进度指示器
function initProgressIndicators() {
    progressContainer.innerHTML = '';
    for (let i = 0; i < gameState.requiredScore; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'w-4 h-4 rounded-full border-2 border-love-pink/50';
        indicator.id = `indicator-${i}`;
        progressContainer.appendChild(indicator);
    }
}

// 创建随机星星背景
function createStars() {
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.8 + 0.2;
        const delay = Math.random() * 5;

        star.className = 'absolute rounded-full bg-white animate-pulse';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.opacity = opacity;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

// 创建爱心元素
function createHeart() {
    if (!gameState.isPlaying) return;

    const heart = document.createElement('div');
    const size = Math.random() * 30 + 20; // 20-50px
    const left = Math.random() * (heartsContainer.offsetWidth - size);
    const color = ['text-love-pink', 'text-love-red', 'text-love-purple', 'text-love-blue'][Math.floor(Math.random() * 4)];

    heart.className = `heart ${color} glow`;
    heart.innerHTML = '<i class="fa fa-heart"></i>';
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}px`;
    heart.style.top = `-${size}px`;

    // 随机动画持续时间和旋转
    const duration = Math.random() * 4 + 3; // 3-7秒
    const rotation = Math.random() * 40 - 20; // -20到20度

    heart.dataset.speed = (Math.random() * 2 + 1).toString(); // 1-3的速度因子
    heart.dataset.rotation = rotation.toString();

    // 添加点击事件
    heart.addEventListener('click', () => handleHeartClick(heart));

    heartsContainer.appendChild(heart);

    // 存储爱心数据
    gameState.hearts.push({
        element: heart,
        y: -size,
        rotation: rotation,
        speed: parseFloat(heart.dataset.speed)
    });
}

// 7种祝福语
const blessings = [
    "你最美",
    "长长久久",
    "共同进步",
    "想你哦",
    "最棒的",
    "一起加油",
    "幸福快乐"
];

// 处理爱心点击
function handleHeartClick(heartElement) {
    if (!gameState.isPlaying) return;

    // 播放tap.mp3
    try {
        const audio = new Audio('music/tap.mp3');
        audio.volume = 0.5; // 设置音量为50%
        audio.play().catch(error => {
            console.log('音频播放失败:', error);
        });
    } catch (error) {
        console.log('音频创建失败:', error);
    }

    // 找到对应的爱心数据并移除
    const index = gameState.hearts.findIndex(h => h.element === heartElement);
    if (index !== -1) {
        gameState.hearts.splice(index, 1);
    }

    // 获取点击位置
    const rect = heartElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 创建烟花效果
    createFirework(x, y, heartElement.classList.contains('text-love-pink') ? '#FF6B8B' :
        heartElement.classList.contains('text-love-red') ? '#FF3366' :
            heartElement.classList.contains('text-love-purple') ? '#C955E8' : '#6A8FFF');

    // 随机显示祝福语
    showRandomBlessing(x, y);

    // 移除爱心元素
    heartElement.remove();

    // 更新分数
    gameState.score++;
    updateGameProgress();

    // 检查是否达到目标
    if (gameState.score >= gameState.requiredScore) {
        endGame();
    }
}

// 祝福语不重复随机选择
let usedBlessings = [];

// 显示随机祝福语
function showRandomBlessing(x, y) {
    let blessing;

    // 如果所有祝福语都用过了，重新开始
    if (usedBlessings.length >= blessings.length) {
        usedBlessings = [];
    }

    // 从未使用的祝福语中随机选择
    const availableBlessings = blessings.filter(b => !usedBlessings.includes(b));
    blessing = availableBlessings[Math.floor(Math.random() * availableBlessings.length)];

    // 标记为已使用
    usedBlessings.push(blessing);

    // 创建祝福语元素
    const blessingElement = document.createElement('div');
    blessingElement.className = 'fixed z-50 pointer-events-none text-center';
    blessingElement.style.left = `${x}px`;
    blessingElement.style.top = `${y}px`;
    blessingElement.style.transform = 'translate(-50%, -50%)';

    // 设置祝福语样式
    blessingElement.innerHTML = `
                <div class="bg-gradient-to-r from-love-pink to-love-purple text-white px-4 py-2 rounded-full shadow-lg font-romantic text-lg font-bold">
                    ${blessing}
                </div>
            `;

    document.body.appendChild(blessingElement);

    // 添加动画效果
    blessingElement.style.animation = 'blessingFloat 2s ease-out forwards';

    // 2秒后移除元素
    setTimeout(() => {
        blessingElement.remove();
    }, 2000);
}

// 创建烟花效果
function createFirework(x, y, color) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    document.body.appendChild(firework);

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // 随机粒子大小
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 随机颜色，基于爱心颜色的变体
        particle.style.backgroundColor = color;

        // 随机方向和距离
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = Math.random() * 60 + 30;

        // 计算终点位置
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        // 设置初始位置
        particle.style.transform = 'translate(0, 0)';

        firework.appendChild(particle);

        // 动画效果
        setTimeout(() => {
            particle.style.transition = 'all 0.6s cubic-bezier(0.1, 0.8, 0.9, 1)';
            particle.style.transform = `translate(${endX}px, ${endY}px)`;
            particle.style.opacity = '0';
        }, 10);
    }

    // 清理烟花元素
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// 更新游戏进度指示器
function updateGameProgress() {
    for (let i = 0; i < gameState.requiredScore; i++) {
        const indicator = document.getElementById(`indicator-${i}`);
        if (i < gameState.score) {
            indicator.className = 'w-4 h-4 rounded-full bg-love-pink';
        } else {
            indicator.className = 'w-4 h-4 rounded-full border-2 border-love-pink/50';
        }
    }
}

// 动画循环 - 让爱心下落
function animateHearts() {
    const containerHeight = heartsContainer.offsetHeight;

    // 更新每个爱心的位置
    gameState.hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        heart.rotation += 0.5 * (heart.speed - 1); // 旋转速度基于下落速度

        heart.element.style.top = `${heart.y}px`;
        heart.element.style.transform = `rotate(${heart.rotation}deg)`;

        // 移除超出容器的爱心
        if (heart.y > containerHeight + 50) {
            heart.element.remove();
            gameState.hearts.splice(index, 1);
        }
    });

    // 继续动画循环
    gameState.animationFrameId = requestAnimationFrame(animateHearts);
}

// 生成新爱心的间隔函数
function spawnHearts() {
    if (gameState.isPlaying) {
        createHeart();
        // 随机间隔生成新爱心
        setTimeout(spawnHearts, Math.random() * 1000 + 500);
    }
}

// 结束游戏并显示祝福
function endGame() {
    gameState.isPlaying = false;

    // 停止所有动画
    if (gameState.animationFrameId) {
        cancelAnimationFrame(gameState.animationFrameId);
    }

    // 移除所有剩余爱心
    gameState.hearts.forEach(heart => {
        heart.element.remove();
    });
    gameState.hearts = [];

    // 显示祝福信息
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.pointerEvents = 'auto';
        // 让信息卡片有弹出效果
        const messageCard = message.querySelector('div');
        setTimeout(() => {
            messageCard.classList.add('scale-100');
            messageCard.classList.remove('scale-95');
            // 启动图片轮播
            startImageCarousel();
            // 启动美轮美奂的背景效果
            startBeautifulBackground();
        }, 100);
    }, 1000);
}

// 图片轮播功能
let currentImageIndex = 0;
let carouselInterval = null;

function startImageCarousel() {
    const messageBg = document.querySelector('.message-bg');
    const dots = document.querySelectorAll('.carousel-dot');

    // 清除之前的定时器
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }

    // 设置定时器，每2秒切换一次图片
    carouselInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageFiles.length;
        updateCarouselImage(currentImageIndex);
    }, 2000);

    // 初始化第一张图片
    updateCarouselImage(0);
}

function updateCarouselImage(index) {
    const messageBg = document.querySelector('.message-bg');
    const dots = document.querySelectorAll('.carousel-dot');

    // 更新背景图片
    messageBg.style.backgroundImage = `url('${imageFiles[index]}')`;

    // 更新指示器状态
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentImageIndex = index;
}

// 为轮播指示器添加点击事件
function initCarouselControls() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // 清除自动轮播
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }

            // 切换到指定图片
            updateCarouselImage(index);

            // 重新开始自动轮播
            setTimeout(() => {
                startImageCarousel();
            }, 2000);
        });
    });
}

// 美轮美奂的背景效果
let beautifulBackgroundInterval = null;

function startBeautifulBackground() {
    // 清除之前的定时器
    if (beautifulBackgroundInterval) {
        clearInterval(beautifulBackgroundInterval);
    }

    // 创建浮动粒子
    createFloatingParticles();

    // 每3秒创建新的粒子
    beautifulBackgroundInterval = setInterval(createFloatingParticles, 3000);
}

function createFloatingParticles() {
    const messageContainer = document.getElementById('message');
    const particleCount = Math.floor(Math.random() * 5) + 3; // 3-7个粒子

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';

        // 随机位置
        const left = Math.random() * 100;
        const delay = Math.random() * 8;

        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;

        messageContainer.appendChild(particle);

        // 8秒后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
}

function stopBeautifulBackground() {
    if (beautifulBackgroundInterval) {
        clearInterval(beautifulBackgroundInterval);
        beautifulBackgroundInterval = null;
    }

    // 移除所有浮动粒子
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => particle.remove());
}

// 重新开始游戏
function restartGame() {
    // 重置游戏状态
    gameState.score = 0;
    gameState.isPlaying = true;

    // 隐藏祝福信息
    message.style.opacity = '0';
    message.style.pointerEvents = 'none';
    const messageCard = message.querySelector('div');
    messageCard.classList.remove('scale-100');
    messageCard.classList.add('scale-95');

    // 停止轮播
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }

    // 停止美轮美奂背景效果
    stopBeautifulBackground();

    // 重置进度指示器
    updateGameProgress();

    // 重新开始动画
    animateHearts();
    spawnHearts();
}

// 显示音乐提示
function showMusicTip() {
    if (hasShownMusicTip) return;

    const tip = document.createElement('div');
    tip.className = 'fixed top-32 right-40 z-50 bg-gradient-to-r from-love-pink to-love-purple text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm animate-bounce';
    tip.innerHTML = '🎵 点击播放浪漫背景音乐 🎵';
    tip.style.animation = 'bounce 2s infinite';

    document.body.appendChild(tip);

    // 3秒后自动隐藏提示
    setTimeout(() => {
        tip.style.opacity = '0';
        tip.style.transform = 'translateY(-100px)';
        setTimeout(() => tip.remove(), 300);
    }, 3000);

    hasShownMusicTip = true;
}

// 初始化游戏
function initGame() {
    initProgressIndicators();
    createStars();
    updateGameProgress();
    showMusicTip();

    // 开始动画和生成爱心
    animateHearts();
    spawnHearts();

    // 绑定重新开始按钮事件
    restartBtn.addEventListener('click', restartGame);

    // 初始化轮播控制
    initCarouselControls();

    // 初始化音乐控制
    initMusicControls();

    // 显示音乐提示
    showMusicTip();

    // 窗口大小变化时重新计算位置
    window.addEventListener('resize', () => {
        // 清除现有爱心
        gameState.hearts.forEach(heart => {
            heart.element.remove();
        });
        gameState.hearts = [];
    });
}

// 启动游戏
window.addEventListener('load', () => {
    // 绑定跳过加载按钮
    skipLoadingBtn.addEventListener('click', () => {
        console.log('用户手动跳过加载');
        if (!isAllResourcesLoaded) {
            // 强制设置所有资源为已加载
            loadedImages = totalImages;
            loadedMusic = totalMusic;
            updateLoadingProgress();
            isAllResourcesLoaded = true;
            showLoadingComplete();
        }
    });

    // 开始加载资源
    console.log('开始加载资源...');

    // 设置全局加载超时（30秒）
    const loadingTimeout = setTimeout(() => {
        console.warn('加载超时，强制显示界面');
        if (!isAllResourcesLoaded) {
            isAllResourcesLoaded = true;
            showLoadingComplete();
        }
    }, 30000);

    // 设置强制完成定时器（10秒后强制完成）
    const forceCompleteTimeout = setTimeout(() => {
        console.warn('强制完成加载');
        if (!isAllResourcesLoaded) {
            // 强制设置所有资源为已加载
            loadedImages = totalImages;
            loadedMusic = totalMusic;
            updateLoadingProgress();
            isAllResourcesLoaded = true;
            showLoadingComplete();
        }
    }, 10000);

    // 并行加载图片和音乐
    Promise.all([
        preloadImages(),
        preloadMusic()
    ]).then(([images, music]) => {
        // 清除超时定时器
        clearTimeout(loadingTimeout);
        clearTimeout(forceCompleteTimeout);

        console.log('所有资源加载完成');
        console.log('图片加载:', images.filter(img => img !== null).length, '/', totalImages);
        console.log('音乐加载:', music.filter(audio => audio !== null).length, '/', totalMusic);

        // 资源加载完成，界面会自动显示
        console.log('资源加载完成，等待界面显示');
    }).catch(error => {
        // 清除超时定时器
        clearTimeout(loadingTimeout);
        clearTimeout(forceCompleteTimeout);

        console.error('资源加载出错:', error);
        // 出错时也显示界面
        setTimeout(() => {
            if (!isAllResourcesLoaded) {
                isAllResourcesLoaded = true;
                showLoadingComplete();
            }
        }, 2000);
    });
});