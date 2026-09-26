const accountTrigger = document.getElementById('accountTrigger');
        const account = { username: accountTrigger.dataset.username, avatarSrc: accountTrigger.dataset.avatar };
        const avatarImg = document.getElementById('avatarImg');
        const displayName = document.getElementById('displayName');
        const displayUsername = document.getElementById('displayUsername');
        const modalAvatarImg = document.getElementById('modalAvatarImg');
        const modalAvatarContainer = document.getElementById('modalAvatarContainer');
        const avatarFileInput = document.getElementById('avatarFileInput');
        const accountModal = document.getElementById('accountModal');
        updateDisplay();
        document.getElementById('accountTrigger').addEventListener('click', openModal);
        document.getElementById('closeModal').addEventListener('click', closeModal);
        accountModal.addEventListener('click', function(e) {
            if (e.target === accountModal) closeModal();
        });
        modalAvatarContainer.addEventListener('click', function() {
            avatarFileInput.click();
        });
        avatarFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                avatarFileInput.value = '';
                return;
            }

            // 读取为Data URL
            const reader = new FileReader();
            reader.onload = function(ev) {
                const dataURL = ev.target.result;
                modalAvatarImg.src = dataURL;  // 弹窗预览
            };
            reader.readAsDataURL(file);
        });

        function openModal() {
            accountModal.style.display = 'flex';
        }

        function closeModal() {
            accountModal.style.display = 'none';
        }

        function updateDisplay() {
            avatarImg.src = account.avatarSrc;
            modalAvatarImg.src = account.avatarSrc;
            displayName.textContent = account.username;
            displayUsername.textContent = account.username;
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && accountModal.style.display === 'flex') {
                closeModal();
            }
        });
