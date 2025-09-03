document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const dom = {
        // Navegação
        pages: document.querySelectorAll('.page'),
        navBtns: document.querySelectorAll('.nav-btn'),
        menuBtn: document.getElementById('menuBtn'),
        dropdownMenu: document.getElementById('dropdownMenu'),
        desktopMenuLinks: document.querySelectorAll('.dropdown-menu a'),
        
        // Overlays e modais
        loginOverlay: document.getElementById('loginOverlay'),
        visitorOverlay: document.getElementById('visitorOverlay'),
        loginModal: document.getElementById('loginModal'),
        registerModal: document.getElementById('registerModal'),
        editProfileModal: document.getElementById('editProfileModal'),
        
        // Botões de fechamento
        closeLogin: document.getElementById('closeLogin'),
        closeRegister: document.getElementById('closeRegister'),
        closeEditProfile: document.getElementById('closeEditProfile'),
        
        // Formulários de autenticação
        userLoginForm: document.getElementById('userLoginForm'),
        userRegisterForm: document.getElementById('userRegisterForm'),
        editProfileForm: document.getElementById('editProfileForm'),
        
        // Botões de login/registro
        emailLoginInitial: document.getElementById('emailLoginInitial'),
        showRegisterInitial: document.getElementById('showRegisterInitial'),
        showRegister: document.getElementById('showRegister'),
        showLogin: document.getElementById('showLogin'),
        visitorLogin: document.getElementById('visitorLogin'),
        loginFromVisitor: document.getElementById('loginFromVisitor'),
        
        // Conteúdo principal
        mainContent: document.getElementById('mainContent'),
        feedContent: document.getElementById('feed-content'),
        
        // Countdown
        nextServiceInfo: document.getElementById('next-service-info'),
        countdownDays: document.getElementById('countdown-days'),
        countdownHours: document.getElementById('countdown-hours'),
        countdownMinutes: document.getElementById('countdown-minutes'),
        countdownSeconds: document.getElementById('countdown-seconds'),
        
        // Pedidos de oração
        prayerRequestForm: document.getElementById('prayerRequestForm'),
        prayerRequestsList: document.getElementById('prayer-requests-list'),
        
        // Células
        cellsContent: document.getElementById('cells-content'),
        cellReportForm: document.getElementById('cellReportForm'),
        
        // Perfil
        profileName: document.getElementById('profileName'),
        profileRole: document.getElementById('profileRole'),
        prayerCount: document.getElementById('prayerCount'),
        cellCount: document.getElementById('cellCount'),
        eventsCount: document.getElementById('eventsCount'),
        editProfileBtn: document.getElementById('editProfileBtn'),
        shareAppBtn: document.getElementById('shareAppBtn'),
        changeAvatarBtn: document.getElementById('changeAvatarBtn'),
        logoutProfileBtn: document.getElementById('logoutProfileBtn'),
        
        // Campos de edição de perfil
        editName: document.getElementById('editName'),
        editEmail: document.getElementById('editEmail'),
        editPassword: document.getElementById('editPassword'),
        editRole: document.getElementById('editRole'),
        editCell: document.getElementById('editCell'),
        
        // Analytics (admin)
        adminAnalyticsSection: document.getElementById('adminAnalyticsSection'),
        totalUsers: document.getElementById('totalUsers'),
        totalLeaders: document.getElementById('totalLeaders'),
        totalPrayers: document.getElementById('totalPrayers'),
        lastLoginsList: document.getElementById('lastLoginsList'),
        
        // Admin
        adminBtn: document.getElementById('adminBtn'),
        adminPanel: document.getElementById('adminPanel'),
        closeAdmin: document.getElementById('closeAdmin'),
        postForm: document.getElementById('postForm'),
        cellForm: document.getElementById('cellForm'),
        adminCellsList: document.getElementById('admin-cells-list'),
        adminUsersList: document.getElementById('admin-users-list'),
        
        // Outros
        themeToggle: document.getElementById('themeToggle'),
        logoutBtn: document.getElementById('logoutBtn'),
        notification: document.getElementById('notification'),
        
        // Bíblia
        bibleBook: document.getElementById('bibleBook'),
        bibleChapter: document.getElementById('bibleChapter'),
        loadBibleChapter: document.getElementById('loadBibleChapter'),
        bibleContent: document.getElementById('bible-content')
    };

    // Dados da aplicação
    const appData = {
        posts: [],
        prayerRequests: [],
        adminCode: 'IMJA2025',
        churchAvatar: 'logo_igreja.jpeg',
        users: [],
        currentUser: null,
        cells: [
            {
                id: 'cell1',
                name: 'Célula Marracuene Centro',
                location: 'Marracuene Centro',
                leaders: ['João Silva', 'Maria Santos'],
                members: ['Ana Costa', 'Pedro Oliveira', 'Sofia Mendes']
            },
            {
                id: 'cell2',
                name: 'Célula Matalane',
                location: 'Matalane',
                leaders: ['Carlos Pereira'],
                members: ['Luisa Fernandes', 'Miguel Torres']
            },
            {
                id: 'cell3',
                name: 'Célula Faftine',
                location: 'Faftine',
                leaders: ['Isabel Rodrigues'],
                members: ['António Gomes', 'Beatriz Lima']
            }
        ],
        reactions: {},
        isVisitor: false
    };

    // Inicialização
    async function init() {
        setupEventListeners();
        loadDataFromLocalStorage();
        renderFeed();
        updateCountdown();
        setInterval(updateCountdown, 1000);
        checkAuthState();
        renderCells();
        updateCellOptions();
        AOS.init();
        
        // Carregar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        dom.themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Mostrar overlay de login inicial
        dom.loginOverlay.style.display = 'flex';
        
        // Adicionar posts iniciais se não existirem
        if (appData.posts.length === 0) {
            addInitialPosts();
        }
    }

    // Carregar dados do localStorage
    function loadDataFromLocalStorage() {
        appData.posts = JSON.parse(localStorage.getItem('posts')) || [];
        appData.prayerRequests = JSON.parse(localStorage.getItem('prayerRequests')) || [];
        appData.users = JSON.parse(localStorage.getItem('users')) || [];
    }
    
    // Salvar dados no localStorage
    function saveDataToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(appData.posts));
        localStorage.setItem('prayerRequests', JSON.stringify(appData.prayerRequests));
        localStorage.setItem('users', JSON.stringify(appData.users));
    }

    // Adicionar posts iniciais
    function addInitialPosts() {
        const initialPosts = [
            {
                id: 'post1',
                title: 'Bem-vindos ao Ministério dos Justos Aperfeiçoados',
                content: 'Porque há um só Deus e um só mediador entre Deus e os homens: Jesus Cristo, homem. (1 Timóteo 2:5)',
                type: 'text',
                date: new Date().toISOString(),
                likes: 15,
                comments: []
            },
            {
                id: 'post2',
                title: 'Culto Dominical',
                content: 'Junte-se a nós todos os domingos às 8h para o culto dominical. Venha adorar ao Senhor conosco!',
                type: 'text',
                date: new Date(Date.now() - 86400000).toISOString(),
                likes: 8,
                comments: []
            },
            {
                id: 'post3',
                title: 'Intercessão',
                content: 'Todas as sextas-feiras às 17h temos o momento de intercessão. Venha orar conosco pela igreja e pela nação.',
                type: 'text',
                date: new Date(Date.now() - 172800000).toISOString(),
                likes: 12,
                comments: []
            }
        ];
        
        appData.posts = initialPosts;
        saveDataToLocalStorage();
    }

    // Navegação
    function navigateTo(pageId) {
        if (!appData.currentUser && !appData.isVisitor && pageId !== 'home-page') {
            showNotification('Faça login para acessar esta página', 'warning');
            dom.loginOverlay.style.display = 'flex';
            return;
        }
        
        dom.pages.forEach(page => page.classList.remove('active'));
        dom.navBtns.forEach(btn => btn.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        // Ativar botão correspondente na navegação mobile
        document.querySelector(`.nav-btn[data-page="${pageId}"]`)?.classList.add('active');
        
        // Se for a página de células, verificar se o usuário é líder
        if (pageId === 'cells-page' && appData.currentUser) {
            checkCellLeaderStatus();
        }
        
        // Se for a página de perfil, carregar os dados
        if (pageId === 'profile-page') {
            loadProfileData();
        }
    }

    // Feed de posts
    function renderFeed() {
        dom.feedContent.innerHTML = '';
        appData.posts.forEach((post, index) => {
            const postEl = document.createElement('div');
            postEl.className = 'post';
            postEl.setAttribute('data-aos', 'fade-up');
            
            let contentHtml = '';
            if (post.type === 'image') {
                contentHtml = `<img src="${post.content}" style="width:100%; margin-top:1rem; border-radius:8px;" alt="${post.title}">`;
            } else if (post.type === 'video') {
                contentHtml = `
                    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-top:1rem; border-radius:8px;">
                        <video controls style="position:absolute; top:0; left:0; width:100%; height:100%;">
                            <source src="${post.content}" type="video/mp4">
                            Seu navegador não suporta vídeos HTML5.
                        </video>
                    </div>
                `;
            } else if (post.type === 'youtube') {
                const youtubeId = extractYouTubeId(post.content);
                if (youtubeId) {
                    contentHtml = `
                        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-top:1rem; border-radius:8px;">
                            <iframe src="https://www.youtube.com/embed/${youtubeId}" 
                                    style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen></iframe>
                        </div>
                    `;
                } else {
                    contentHtml = `<p style="color:var(--error-color);">Link do YouTube inválido</p>`;
                }
            } else {
                contentHtml = `<p style="margin-top:1rem;">${post.content}</p>`;
            }
            
            postEl.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar">
                        <img src="${appData.churchAvatar}" alt="Igreja">
                    </div>
                    <div>
                        <div style="font-weight:600;">Ministério dos Justos Aperfeiçoados</div>
                        <div style="font-size:0.7rem; color:var(--text-secondary);">${new Date(post.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    ${contentHtml}
                </div>
                <div class="post-actions">
                    <button class="post-action like-btn" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i> ${post.likes || 0}
                    </button>
                    <button class="post-action">
                        <i class="fas fa-comment"></i> ${post.comments ? post.comments.length : 0}
                    </button>
                    <button class="post-action">
                        <i class="fas fa-share"></i> Compartilhar
                    </button>
                </div>
            `;
            
            dom.feedContent.appendChild(postEl);
        });
        
        // Adicionar event listeners para likes
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!appData.currentUser) {
                    showNotification('Faça login para curtir posts', 'warning');
                    return;
                }
                
                const postId = btn.dataset.postId;
                const post = appData.posts.find(p => p.id === postId);
                if (post) {
                    post.likes = (post.likes || 0) + 1;
                    btn.innerHTML = `<i class="fas fa-heart"></i> ${post.likes}`;
                    btn.classList.add('liked');
                    saveDataToLocalStorage();
                }
            });
        });
    }

    // Extrair ID do YouTube
    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Contador para o próximo culto
    function updateCountdown() {
        const now = new Date();
        let nextService = new Date();
        
        // Verificar qual é o próximo culto
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        
        // Cultos:
        // - Domingo 8h
        // - Terça/Quinta 18h
        // - Sexta 17h (intercessão)
        
        // Se for domingo antes das 8h, próximo culto é hoje às 8h
        if (currentDay === 0 && currentHour < 8) {
            nextService.setHours(8, 0, 0, 0);
            dom.nextServiceInfo.textContent = 'Próximo Culto: Hoje às 8h (Domingo)';
        } 
        // Se for terça antes das 18h, próximo culto é hoje às 18h
        else if (currentDay === 2 && currentHour < 18) {
            nextService.setHours(18, 0, 0, 0);
            dom.nextServiceInfo.textContent = 'Próximo Culto: Hoje às 18h (Terça)';
        }
        // Se for quinta antes das 18h, próximo culto é hoje às 18h
        else if (currentDay === 4 && currentHour < 18) {
            nextService.setHours(18, 0, 0, 0);
            dom.nextServiceInfo.textContent = 'Próximo Culto: Hoje às 18h (Quinta)';
        }
        // Se for sexta antes das 17h, próximo culto é hoje às 17h (intercessão)
        else if (currentDay === 5 && currentHour < 17) {
            nextService.setHours(17, 0, 0, 0);
            dom.nextServiceInfo.textContent = 'Próxima Intercessão: Hoje às 17h (Sexta)';
        }
        // Caso contrário, encontrar o próximo culto
        else {
            // Dias até o próximo culto (0 = Domingo, 1 = Segunda, etc.)
            let daysToAdd = 0;
            
            // Se for sexta depois das 17h ou sábado, próximo culto é domingo
            if (currentDay === 5 && currentHour >= 17 || currentDay === 6) {
                daysToAdd = (7 - currentDay) % 7; // Domingo
                nextService.setDate(now.getDate() + daysToAdd);
                nextService.setHours(8, 0, 0, 0);
                dom.nextServiceInfo.textContent = `Próximo Culto: Domingo às 8h`;
            }
            // Se for domingo depois das 8h ou segunda, próximo culto é terça
            else if ((currentDay === 0 && currentHour >= 8) || currentDay === 1) {
                daysToAdd = 2 - currentDay; // Terça
                nextService.setDate(now.getDate() + daysToAdd);
                nextService.setHours(18, 0, 0, 0);
                dom.nextServiceInfo.textContent = `Próximo Culto: Terça às 18h`;
            }
            // Se for terça depois das 18h ou quarta, próximo culto é quinta
            else if ((currentDay === 2 && currentHour >= 18) || currentDay === 3) {
                daysToAdd = 4 - currentDay; // Quinta
                nextService.setDate(now.getDate() + daysToAdd);
                nextService.setHours(18, 0, 0, 0);
                dom.nextServiceInfo.textContent = `Próximo Culto: Quinta às 18h`;
            }
            // Se for quinta depois das 18h, próximo culto é sexta (intercessão)
            else if (currentDay === 4 && currentHour >= 18) {
                daysToAdd = 5 - currentDay; // Sexta
                nextService.setDate(now.getDate() + daysToAdd);
                nextService.setHours(17, 0, 0, 0);
                dom.nextServiceInfo.textContent = `Próxima Intercessão: Sexta às 17h`;
            }
        }
        
        const diff = nextService - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        dom.countdownDays.textContent = `${days}d`;
        dom.countdownHours.textContent = `${hours}h`;
        dom.countdownMinutes.textContent = `${minutes}m`;
        dom.countdownSeconds.textContent = `${seconds}s`;
    }

    // Autenticação do usuário
    function checkAuthState() {
        const savedUser = localStorage.getItem('currentUser');
        const isVisitor = localStorage.getItem('isVisitor') === 'true';
        
        if (savedUser) {
            appData.currentUser = JSON.parse(savedUser);
            appData.isVisitor = false;
            showNotification(`Bem-vindo de volta, ${appData.currentUser.name}!`, 'success');
            dom.loginOverlay.style.display = 'none';
            dom.visitorOverlay.style.display = 'none';
            dom.mainContent.classList.remove('content-blocked');
            
            // Verificar se é o administrador
            if (appData.currentUser.email === "ministerio.554411@gmail.com") {
                dom.adminBtn.style.display = 'flex';
            } else {
                dom.adminBtn.style.display = 'none';
            }
        } else if (isVisitor) {
            appData.isVisitor = true;
            dom.loginOverlay.style.display = 'none';
            dom.visitorOverlay.style.display = 'flex';
            dom.mainContent.classList.remove('content-blocked');
        } else {
            appData.isVisitor = false;
            dom.loginOverlay.style.display = 'flex';
            dom.mainContent.classList.add('content-blocked');
            dom.adminBtn.style.display = 'none';
        }
    }
    
    function setupUserAuth() {
        dom.closeLogin.addEventListener('click', () => {
            dom.loginModal.style.display = 'none';
        });
        
        dom.closeRegister.addEventListener('click', () => {
            dom.registerModal.style.display = 'none';
        });
        
        dom.showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            dom.loginModal.style.display = 'none';
            dom.registerModal.style.display = 'block';
        });
        
        dom.showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            dom.registerModal.style.display = 'none';
            dom.loginModal.style.display = 'block';
        });
        
        // Login com email/senha
        dom.userLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Verificar se é o administrador
            if (email === "ministerio.554411@gmail.com" && password === "imjachurch") {
                const adminUser = {
                    id: 'admin',
                    name: 'Administrador',
                    email: email,
                    role: 'admin',
                    cellId: null,
                    lastLogin: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };
                
                appData.currentUser = adminUser;
                localStorage.setItem('currentUser', JSON.stringify(adminUser));
                dom.loginModal.style.display = 'none';
                dom.loginOverlay.style.display = 'none';
                showNotification('Login administrativo bem-sucedido', 'success');
                checkAuthState();
                return;
            }
            
            // Verificar usuários normais
            const user = appData.users.find(u => u.email === email && u.password === password);
            if (user) {
                appData.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                dom.loginModal.style.display = 'none';
                dom.loginOverlay.style.display = 'none';
                showNotification('Login bem-sucedido', 'success');
                checkAuthState();
            } else {
                showNotification('Email ou senha incorretos', 'error');
            }
        });
        
        // Registro com email/senha
        dom.userRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const name = document.getElementById('registerName').value;
            const cellId = document.getElementById('registerCell').value;
            const role = document.getElementById('registerRole').value;
            
            // Verificar se email já existe
            if (appData.users.some(u => u.email === email)) {
                showNotification('Este email já está registrado', 'error');
                return;
            }
            
            const newUser = {
                id: 'user_' + Date.now(),
                name,
                email,
                password, // Em uma aplicação real, isso deve ser criptografado
                role,
                cellId: cellId || null,
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };
            
            appData.users.push(newUser);
            saveDataToLocalStorage();
            
            appData.currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            dom.registerModal.style.display = 'none';
            dom.loginOverlay.style.display = 'none';
            showNotification('Registro concluído com sucesso!', 'success');
            checkAuthState();
        });
        
        // Login inicial com email
        dom.emailLoginInitial.addEventListener('click', () => {
            dom.loginOverlay.style.display = 'none';
            dom.loginModal.style.display = 'block';
        });
        
        // Mostrar registro inicial
        dom.showRegisterInitial.addEventListener('click', (e) => {
            e.preventDefault();
            dom.loginOverlay.style.display = 'none';
            dom.registerModal.style.display = 'block';
        });
        
        // Entrar como visitante
        dom.visitorLogin.addEventListener('click', () => {
            appData.isVisitor = true;
            localStorage.setItem('isVisitor', 'true');
            dom.loginOverlay.style.display = 'none';
            dom.visitorOverlay.style.display = 'flex';
            dom.mainContent.classList.remove('content-blocked');
            showNotification('Modo visitante ativado. Faça login para acessar todas as funcionalidades.', 'warning');
        });
        
        // Fazer login a partir do modo visitante
        dom.loginFromVisitor.addEventListener('click', () => {
            dom.visitorOverlay.style.display = 'none';
            dom.loginOverlay.style.display = 'flex';
        });
    }
    
    function logout() {
        appData.currentUser = null;
        appData.isVisitor = false;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isVisitor');
        showNotification('Você saiu da sua conta', 'warning');
        dom.loginOverlay.style.display = 'flex';
        dom.mainContent.classList.add('content-blocked');
        dom.adminBtn.style.display = 'none';
    }

    // Células/Grupos Familiares
    function renderCells() {
        dom.cellsContent.innerHTML = '';
        
        appData.cells.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'cell-card';
            cellEl.innerHTML = `
                <h3><i class="fas fa-home"></i> ${cell.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${cell.location}</p>
                <div class="cell-leaders">
                    <span class="leader-badge"><i class="fas fa-user-tie"></i> ${cell.leaders ? cell.leaders.join(', ') : 'Nenhum líder'}</span>
                </div>
                <p><i class="fas fa-users"></i> ${cell.members ? cell.members.length : 0} membros</p>
            `;
            
            dom.cellsContent.appendChild(cellEl);
        });
    }

    function updateCellOptions() {
        const cellSelects = [document.getElementById('registerCell'), document.getElementById('editCell')];
        
        cellSelects.forEach(select => {
            if (select) {
                // Limpar opções existentes (exceto a primeira)
                while (select.children.length > 1) {
                    select.removeChild(select.lastChild);
                }
                
                // Adicionar células
                appData.cells.forEach(cell => {
                    const option = document.createElement('option');
                    option.value = cell.id;
                    option.textContent = cell.name;
                    select.appendChild(option);
                });
            }
        });
    }

    function checkCellLeaderStatus() {
        const cellLeaderSection = document.querySelector('.cell-leader-section');
        if (appData.currentUser && appData.currentUser.role === 'leader') {
            cellLeaderSection.style.display = 'block';
        } else {
            cellLeaderSection.style.display = 'none';
        }
    }

    // Pedidos de oração
    function setupPrayerRequests() {
        dom.prayerRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!appData.currentUser) {
                showNotification('Faça login primeiro', 'warning');
                if (appData.isVisitor) {
                    dom.visitorOverlay.style.display = 'flex';
                } else {
                    dom.loginOverlay.style.display = 'flex';
                }
                return;
            }
            
            const request = {
                name: document.getElementById('prayerName').value,
                request: document.getElementById('prayerRequest').value,
                date: new Date().toISOString(),
                userId: appData.currentUser.id
            };
            
            savePrayerRequest(request);
        });
        
        loadPrayerRequests();
    }

    function savePrayerRequest(request) {
        appData.prayerRequests.unshift(request);
        saveDataToLocalStorage();
        showNotification('Pedido de oração enviado', 'success');
        dom.prayerRequestForm.reset();
        loadPrayerRequests();
    }

    function loadPrayerRequests() {
        dom.prayerRequestsList.innerHTML = '';
        appData.prayerRequests.slice(0, 5).forEach(req => {
            const reqEl = document.createElement('div');
            reqEl.style.padding = '1rem';
            reqEl.style.marginBottom = '1rem';
            reqEl.style.backgroundColor = 'var(--background-primary)';
            reqEl.style.borderRadius = '8px';
            reqEl.innerHTML = `
                <div style="font-weight:bold;">${req.name}</div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">${new Date(req.date).toLocaleString()}</div>
                <p>${req.request}</p>
            `;
            dom.prayerRequestsList.appendChild(reqEl);
        });
    }

    // Perfil do usuário
    function loadProfileData() {
        if (!appData.currentUser) {
            dom.profileName.textContent = 'Visitante';
            dom.profileRole.textContent = 'Convidado';
            return;
        }
        
        dom.profileName.textContent = appData.currentUser.name;
        dom.profileRole.textContent = appData.currentUser.role === 'leader' ? 'Líder de Célula' : 'Membro';
        
        // Contar pedidos de oração do usuário
        const userPrayers = appData.prayerRequests.filter(p => p.userId === appData.currentUser.id);
        dom.prayerCount.textContent = userPrayers.length;
        
        // Contar participação em células
        if (appData.currentUser.cellId) {
            dom.cellCount.textContent = '1';
        } else {
            dom.cellCount.textContent = '0';
        }
        
        // Contar eventos (simulado)
        dom.eventsCount.textContent = Math.floor(Math.random() * 10);
        
        // Mostrar seção de analytics se for admin
        if (appData.currentUser.email === "ministerio.554411@gmail.com") {
            dom.adminAnalyticsSection.style.display = 'block';
            loadAnalyticsData();
        } else {
            dom.adminAnalyticsSection.style.display = 'none';
        }
        
        // Preencher formulário de edição
        if (appData.currentUser) {
            dom.editName.value = appData.currentUser.name;
            dom.editEmail.value = appData.currentUser.email;
            dom.editRole.value = appData.currentUser.role;
            
            if (appData.currentUser.cellId) {
                dom.editCell.value = appData.currentUser.cellId;
            }
        }
    }
    
    function loadAnalyticsData() {
        // Total de usuários
        dom.totalUsers.textContent = appData.users.length;
        
        // Contar líderes
        const leaders = appData.users.filter(u => u.role === 'leader').length;
        dom.totalLeaders.textContent = leaders;
        
        // Últimos logins
        const users = [...appData.users];
        
        // Ordenar por último login
        users.sort((a, b) => new Date(b.lastLogin || b.createdAt) - new Date(a.lastLogin || a.createdAt));
        
        // Mostrar os 5 mais recentes
        dom.lastLoginsList.innerHTML = '';
        users.slice(0, 5).forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            userEl.innerHTML = `
                <div class="user-avatar">
                    <img src="${appData.churchAvatar}" alt="${user.name}">
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${new Date(user.lastLogin || user.createdAt).toLocaleString()}</p>
                </div>
            `;
            dom.lastLoginsList.appendChild(userEl);
        });
        
        // Total de pedidos de oração
        dom.totalPrayers.textContent = appData.prayerRequests.length;
    }
    
    function setupProfileActions() {
        // Editar perfil
        dom.editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!appData.currentUser) {
                showNotification('Faça login para editar seu perfil', 'warning');
                return;
            }
            dom.editProfileModal.style.display = 'block';
        });
        
        // Fechar modal de edição
        dom.closeEditProfile.addEventListener('click', () => {
            dom.editProfileModal.style.display = 'none';
        });
        
        // Salvar alterações do perfil
        dom.editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userIndex = appData.users.findIndex(u => u.id === appData.currentUser.id);
            if (userIndex === -1) {
                showNotification('Usuário não encontrado', 'error');
                return;
            }
            
            const updates = {
                name: dom.editName.value,
                email: dom.editEmail.value
            };
            
            // Atualizar célula se foi alterada
            if (dom.editCell.value !== appData.currentUser.cellId) {
                updates.cellId = dom.editCell.value || null;
            }
            
            // Atualizar dados locais
            appData.users[userIndex] = {
                ...appData.users[userIndex],
                ...updates
            };
            
            appData.currentUser = appData.users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(appData.currentUser));
            
            saveDataToLocalStorage();
            showNotification('Perfil atualizado com sucesso', 'success');
            dom.editProfileModal.style.display = 'none';
            loadProfileData();
            
            // Atualizar senha se foi fornecida
            if (dom.editPassword.value) {
                appData.users[userIndex].password = dom.editPassword.value;
                saveDataToLocalStorage();
                showNotification('Senha atualizada com sucesso', 'success');
                dom.editPassword.value = '';
            }
        });
        
        // Compartilhar app
        dom.shareAppBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (navigator.share) {
                navigator.share({
                    title: 'Ministério dos Justos Aperfeiçoados',
                    text: 'Baixe o app do Ministério dos Justos Aperfeiçoados',
                    url: window.location.href
                }).catch(error => {
                    console.error('Erro ao compartilhar:', error);
                });
            } else {
                showNotification('Copiado para a área de transferência', 'success');
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
        });
        
        // Alterar foto (simulado)
        dom.changeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Funcionalidade em desenvolvimento', 'warning');
        });
        
        // Sair do perfil
        dom.logoutProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Bíblia
    function setupBible() {
        dom.loadBibleChapter.addEventListener('click', () => {
            const book = dom.bibleBook.value;
            const chapter = dom.bibleChapter.value;
            
            if (!book || !chapter) {
                showNotification('Selecione um livro e capítulo', 'warning');
                return;
            }
            
            loadBibleChapter(book, chapter);
        });
    }

    function loadBibleChapter(book, chapter) {
        // Simulação de carregamento da Bíblia
        dom.bibleContent.innerHTML = '<p>Carregando...</p>';
        
        setTimeout(() => {
            const sampleVerses = {
                genesis: {
                    1: "No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas..."
                },
                john: {
                    3: "E havia entre os fariseus um homem, chamado Nicodemos, príncipe dos judeus. Este foi ter de noite com Jesus, e disse-lhe: Rabi, bem sabemos que és Mestre, vindo de Deus; porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele..."
                }
            };
            
            const content = sampleVerses[book] && sampleVerses[book][chapter] 
                ? sampleVerses[book][chapter] 
                : 'Capítulo não disponível. Esta é uma versão de demonstração.';
            
            dom.bibleContent.innerHTML = `<h4>${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}</h4><p>${content}</p>`;
        }, 1000);
    }

    // Painel administrativo
    function setupAdminPanel() {
        // Mostrar painel admin
        dom.adminBtn.addEventListener('click', () => {
            dom.adminPanel.style.display = 'block';
            loadAdminData();
        });
        
        // Fechar painel admin
        dom.closeAdmin.addEventListener('click', () => {
            dom.adminPanel.style.display = 'none';
        });
        
        // Tabs do admin
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
            });
        });
        
        // Formulário de posts
        dom.postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const post = {
                id: 'post_' + Date.now(),
                title: document.getElementById('postTitle').value,
                content: document.getElementById('postContent').value,
                type: document.getElementById('postType').value,
                date: new Date().toISOString(),
                likes: 0,
                comments: []
            };
            
            savePost(post);
        });
        
        // Formulário de células
        dom.cellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cell = {
                id: 'cell_' + Date.now(),
                name: document.getElementById('cellName').value,
                location: document.getElementById('cellLocation').value,
                leaders: document.getElementById('cellLeaders').value.split(',').map(l => l.trim()),
                members: []
            };
            
            appData.cells.push(cell);
            saveDataToLocalStorage();
            showNotification('Célula criada com sucesso', 'success');
            dom.cellForm.reset();
            renderCells();
            updateCellOptions();
            loadAdminData();
        });
    }

    function savePost(post) {
        appData.posts.unshift(post); // Adiciona no início do array
        saveDataToLocalStorage();
        showNotification('Post publicado com sucesso', 'success');
        dom.postForm.reset();
        dom.adminPanel.style.display = 'none';
        renderFeed();
    }

    function loadAdminData() {
        // Carregar lista de células para admin
        dom.adminCellsList.innerHTML = '';
        appData.cells.forEach(cell => {
            const cellEl = document.createElement('div');
            cellEl.className = 'cell-item';
            cellEl.innerHTML = `
                <h4>${cell.name}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${cell.location}</p>
                <p><strong>Líderes:</strong> ${cell.leaders ? cell.leaders.join(', ') : 'Nenhum'}</p>
                <p><strong>Membros:</strong> ${cell.members ? cell.members.length : 0}</p>
            `;
            dom.adminCellsList.appendChild(cellEl);
        });
        
        // Carregar lista de usuários para admin
        dom.adminUsersList.innerHTML = '';
        appData.users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            userEl.innerHTML = `
                <div class="user-avatar">
                    <img src="${appData.churchAvatar}" alt="${user.name}">
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                    <p>Papel: ${user.role === 'leader' ? 'Líder' : 'Membro'}</p>
                    <p>Registrado: ${new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            `;
            dom.adminUsersList.appendChild(userEl);
        });
    }

    // Relatórios de células
    function setupCellReports() {
        dom.cellReportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!appData.currentUser || appData.currentUser.role !== 'leader') {
                showNotification('Apenas líderes podem enviar relatórios', 'error');
                return;
            }
            
            const report = {
                cellId: appData.currentUser.cellId,
                leaderName: appData.currentUser.name,
                attendance: document.getElementById('reportAttendance').value,
                visitors: document.getElementById('reportVisitors').value,
                notes: document.getElementById('reportNotes').value,
                date: new Date().toISOString()
            };
            
            // Salvar relatório (simulado)
            showNotification('Relatório enviado com sucesso', 'success');
            dom.cellReportForm.reset();
        });
    }

    // Utilitários
    function showNotification(message, type = '') {
        dom.notification.textContent = message;
        dom.notification.className = 'notification';
        if (type) dom.notification.classList.add(type);
        dom.notification.classList.add('show');
        setTimeout(() => {
            dom.notification.classList.remove('show');
        }, 3000);
    }

    // Event listeners
    function setupEventListeners() {
        // Navegação mobile
        dom.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(btn.dataset.page);
            });
        });
        
        // Navegação desktop
        dom.menuBtn.addEventListener('click', () => {
            dom.dropdownMenu.style.display = dom.dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.desktop-menu')) {
                dom.dropdownMenu.style.display = 'none';
            }
        });
        
        // Links do menu desktop
        dom.desktopMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.id === 'logoutBtn') {
                    logout();
                } else {
                    navigateTo(link.dataset.page);
                }
                dom.dropdownMenu.style.display = 'none';
            });
        });
        
        // Botão de tema
        dom.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            dom.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
        
        // Botão de logout
        dom.logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
        
        setupAdminPanel();
        setupPrayerRequests();
        setupUserAuth();
        setupCellReports();
        setupProfileActions();
        setupBible();
    }

    // Iniciar aplicação
    init();
});

